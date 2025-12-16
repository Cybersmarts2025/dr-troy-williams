import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { authorUrl, forceRefresh } = await req.json();
    const url = authorUrl || 'https://www.amazon.com/author/troy-williams';
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // If not forcing refresh, return cached books
    if (!forceRefresh) {
      const { data: cachedBooks, error: cacheError } = await supabase
        .from('cached_amazon_books')
        .select('*')
        .eq('is_visible', true)
        .order('display_order', { ascending: true });
      
      if (!cacheError && cachedBooks && cachedBooks.length > 0) {
        console.log(`Returning ${cachedBooks.length} cached books`);
        return new Response(
          JSON.stringify({ 
            success: true, 
            books: cachedBooks.map(b => ({
              asin: b.asin,
              amazonUrl: b.amazon_url,
              title: b.title,
              coverUrl: b.cover_url,
            })),
            fromCache: true 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('Fetching fresh books from Amazon Author page');

    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not found');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log(`Scraping author page: ${url}`);

    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['html'],
        onlyMainContent: false,
      }),
    });

    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text();
      console.error('Firecrawl API error:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: `Firecrawl API error: ${firecrawlResponse.status}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: firecrawlResponse.status }
      );
    }

    const firecrawlData = await firecrawlResponse.json();
    console.log('Firecrawl response received');

    if (!firecrawlData.success) {
      return new Response(
        JSON.stringify({ success: false, error: firecrawlData.error || 'Failed to scrape page' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const books = extractBooksFromHtml(firecrawlData.data?.html || '');
    console.log(`Found ${books.length} books`);

    // Save to cache (upsert)
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const { error: upsertError } = await supabase
        .from('cached_amazon_books')
        .upsert({
          asin: book.asin,
          title: book.title,
          cover_url: book.coverUrl,
          amazon_url: book.amazonUrl,
          display_order: i,
          is_visible: true,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'asin' });
      
      if (upsertError) {
        console.error(`Error caching book ${book.asin}:`, upsertError);
      }
    }
    
    console.log('Books cached successfully');

    return new Response(
      JSON.stringify({ success: true, books, fromCache: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching author books:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

function extractBooksFromHtml(html: string) {
  const books: any[] = [];
  const seenAsins = new Set<string>();
  
  // Amazon's book faceouts use data-csa-c-item-id for ASIN
  const bookFaceoutPattern = /data-csa-c-item-id="([A-Z0-9]{10,})"[^>]*>[\s\S]*?aria-label="([^"]+)"/gi;
  
  let match;
  while ((match = bookFaceoutPattern.exec(html)) !== null) {
    const asin = match[1];
    let title = match[2].trim();
    
    if (seenAsins.has(asin)) continue;
    if (title.toLowerCase().includes('kindle unlimited')) continue;
    
    title = title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    
    const asinPos = html.indexOf(`data-csa-c-item-id="${asin}"`);
    let coverUrl = '';
    
    if (asinPos > -1) {
      const nearbyHtml = html.slice(asinPos, asinPos + 3000);
      const imageIdMatch = nearbyHtml.match(/coverimagephysicalid="([^"]+)"/i);
      if (imageIdMatch) {
        coverUrl = `https://m.media-amazon.com/images/I/${imageIdMatch[1]}._SY400_.jpg`;
      }
      if (!coverUrl) {
        const srcsetMatch = nearbyHtml.match(/srcset="[^"]*?(https:\/\/m\.media-amazon\.com\/images\/I\/[^_\s]+)[^"]*"/i);
        if (srcsetMatch) {
          coverUrl = `${srcsetMatch[1]}._SY400_.jpg`;
        }
      }
    }
    
    if (!coverUrl) {
      coverUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
    }
    
    seenAsins.add(asin);
    books.push({
      asin,
      amazonUrl: `https://www.amazon.com/dp/${asin}`,
      title,
      coverUrl,
    });
  }
  
  // Also try alternate pattern
  const altPattern = /href="[^"]*\/dp\/([A-Z0-9]{10})[^"]*"[^>]*aria-label="([^"]+)"/gi;
  while ((match = altPattern.exec(html)) !== null) {
    const asin = match[1];
    let title = match[2].trim();
    
    if (seenAsins.has(asin)) continue;
    if (title.toLowerCase().includes('kindle unlimited')) continue;
    
    title = title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    
    const asinPos = html.indexOf(`/dp/${asin}`);
    let coverUrl = '';
    
    if (asinPos > -1) {
      const nearbyHtml = html.slice(Math.max(0, asinPos - 2000), asinPos + 2000);
      const imageIdMatch = nearbyHtml.match(/coverimagephysicalid="([^"]+)"/i);
      if (imageIdMatch) {
        coverUrl = `https://m.media-amazon.com/images/I/${imageIdMatch[1]}._SY400_.jpg`;
      }
    }
    
    if (!coverUrl) {
      coverUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
    }
    
    seenAsins.add(asin);
    books.push({
      asin,
      amazonUrl: `https://www.amazon.com/dp/${asin}`,
      title,
      coverUrl,
    });
  }
  
  console.log('Extracted ASINs:', Array.from(seenAsins));
  return books;
}
