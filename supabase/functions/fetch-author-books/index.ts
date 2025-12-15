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

    // Scrape the author page
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown', 'html', 'links'],
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

    // Extract books from the scraped data
    const books = extractBooksFromAuthorPage(firecrawlData.data);
    
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

function extractBooksFromAuthorPage(scrapedData: any) {
  const { markdown, html, links } = scrapedData;
  const books: any[] = [];
  
  console.log('Extracting books from author page');
  
  // Find book product links (Amazon book URLs contain /dp/)
  const bookLinks = (links || []).filter((link: string) => 
    link.includes('/dp/') && link.includes('amazon.com')
  );

  // Extract unique ASINs
  const seenAsins = new Set<string>();
  
  for (const link of bookLinks) {
    const asinMatch = link.match(/\/dp\/([A-Z0-9]{10})/);
    if (asinMatch && !seenAsins.has(asinMatch[1])) {
      seenAsins.add(asinMatch[1]);
      
      // Try to extract title from markdown near the ASIN
      let title = extractTitleForAsin(markdown, asinMatch[1]) || `Book ${seenAsins.size}`;
      
      books.push({
        asin: asinMatch[1],
        amazonUrl: `https://www.amazon.com/dp/${asinMatch[1]}`,
        title: title,
        // Amazon book cover URL pattern
        coverUrl: `https://m.media-amazon.com/images/I/${asinMatch[1]}.jpg`,
      });
    }
  }

  // Also try to parse book info from HTML/markdown patterns
  const bookPatterns = [
    // Match book titles with ASIN references
    /\[([^\]]+)\]\(https?:\/\/[^)]*\/dp\/([A-Z0-9]{10})[^)]*\)/g,
    // Match image references that might be book covers
    /!\[([^\]]*)\]\(https?:\/\/[^)]*images[^)]+\)/g,
  ];

  for (const pattern of bookPatterns) {
    let match;
    while ((match = pattern.exec(markdown)) !== null) {
      if (match[2] && !seenAsins.has(match[2])) {
        seenAsins.add(match[2]);
        books.push({
          asin: match[2],
          amazonUrl: `https://www.amazon.com/dp/${match[2]}`,
          title: match[1] || `Book`,
          coverUrl: `https://m.media-amazon.com/images/I/${match[2]}.jpg`,
        });
      }
    }
  }

  // Parse HTML for more reliable book extraction
  if (html) {
    const imgMatches = html.matchAll(/src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+)"/g);
    const titleMatches = html.matchAll(/alt="([^"]+)"/g);
    
    // Extract image URLs that look like book covers
    for (const match of imgMatches) {
      const imgUrl = match[1];
      // Amazon book covers often have specific patterns
      if (imgUrl.includes('SY') || imgUrl.includes('SX')) {
        // Check if we already have this book
        const existingBook = books.find(b => imgUrl.includes(b.asin));
        if (existingBook) {
          existingBook.coverUrl = imgUrl;
        }
      }
    }
  }

  return books;
}

function extractTitleForAsin(markdown: string, asin: string): string | null {
  // Look for title near ASIN reference in markdown
  const patterns = [
    new RegExp(`\\[([^\\]]+)\\][^)]*${asin}`, 'i'),
    new RegExp(`#\\s*([^\\n]+)[^]*${asin}`, 'i'),
    new RegExp(`\\*\\*([^*]+)\\*\\*[^]*${asin}`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = markdown.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return null;
}
