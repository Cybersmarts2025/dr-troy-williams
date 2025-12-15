import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching books from Amazon Author page');
    
    const { authorUrl } = await req.json();
    const url = authorUrl || 'https://www.amazon.com/author/troy-williams';

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

    return new Response(
      JSON.stringify({ success: true, books }),
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
  // Pattern: data-csa-c-item-id="ASIN" followed by aria-label="Title"
  const bookFaceoutPattern = /data-csa-c-item-id="([A-Z0-9]{10,})"[^>]*>[\s\S]*?aria-label="([^"]+)"/gi;
  
  let match;
  while ((match = bookFaceoutPattern.exec(html)) !== null) {
    const asin = match[1];
    let title = match[2].trim();
    
    // Skip if already seen
    if (seenAsins.has(asin)) continue;
    
    // Skip Kindle Unlimited entries
    if (title.toLowerCase().includes('kindle unlimited')) continue;
    
    // Clean up title
    title = title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    
    // Find the cover image for this ASIN
    // Look for coverimagephysicalid near this ASIN
    const asinPos = html.indexOf(`data-csa-c-item-id="${asin}"`);
    let coverUrl = '';
    
    if (asinPos > -1) {
      const nearbyHtml = html.slice(asinPos, asinPos + 3000);
      
      // Look for coverimagephysicalid attribute
      const imageIdMatch = nearbyHtml.match(/coverimagephysicalid="([^"]+)"/i);
      if (imageIdMatch) {
        const imageId = imageIdMatch[1];
        coverUrl = `https://m.media-amazon.com/images/I/${imageId}._SY400_.jpg`;
      }
      
      // Fallback: look for srcset with image URL
      if (!coverUrl) {
        const srcsetMatch = nearbyHtml.match(/srcset="[^"]*?(https:\/\/m\.media-amazon\.com\/images\/I\/[^_\s]+)[^"]*"/i);
        if (srcsetMatch) {
          coverUrl = `${srcsetMatch[1]}._SY400_.jpg`;
        }
      }
    }
    
    // Fallback to Amazon's product image API
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
  
  // Also try alternate pattern: href with /dp/ASIN and nearby aria-label
  const altPattern = /href="[^"]*\/dp\/([A-Z0-9]{10})[^"]*"[^>]*aria-label="([^"]+)"/gi;
  while ((match = altPattern.exec(html)) !== null) {
    const asin = match[1];
    let title = match[2].trim();
    
    if (seenAsins.has(asin)) continue;
    if (title.toLowerCase().includes('kindle unlimited')) continue;
    
    title = title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    
    // Find cover image
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
