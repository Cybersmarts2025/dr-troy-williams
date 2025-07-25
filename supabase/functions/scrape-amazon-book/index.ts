import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Amazon book scraping request');
    
    const { url } = await req.json();
    
    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not found in environment');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API key not configured' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log(`Scraping Amazon book URL: ${url}`);

    // Call Firecrawl API to scrape the book page
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown', 'html'],
        onlyMainContent: true,
        includeTags: ['title', 'meta'],
      }),
    });

    if (!firecrawlResponse.ok) {
      console.error(`Firecrawl API error: ${firecrawlResponse.status}`);
      const errorText = await firecrawlResponse.text();
      console.error('Firecrawl error response:', errorText);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Firecrawl API error: ${firecrawlResponse.status}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: firecrawlResponse.status 
        }
      );
    }

    const firecrawlData = await firecrawlResponse.json();
    console.log('Firecrawl response received, processing data...');

    if (!firecrawlData.success) {
      console.error('Firecrawl returned unsuccessful response:', firecrawlData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: firecrawlData.error || 'Failed to scrape page' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Extract book information from the scraped content
    const extractedData = extractBookData(firecrawlData.data, url);
    
    console.log('Book data extracted successfully:', extractedData.title);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: extractedData 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in scrape-amazon-book function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

function extractBookData(scrapedData: any, originalUrl: string) {
  const { markdown, metadata } = scrapedData;
  
  console.log('Extracting book data from scraped content');
  
  // Extract book information from Amazon page
  let title = metadata?.title || '';
  
  // Clean up the title
  title = title
    .replace(/\s*:\s*/g, ': ')
    .replace(/\s*\|\s*Amazon\.com.*$/, '')
    .replace(/^Amazon\.com:\s*/, '')
    .trim();

  const description = metadata?.description || '';
  const coverImage = metadata?.image || '';
  
  // Try to extract additional details from markdown content
  let author = '';
  let publisher = '';
  let publicationDate = '';
  
  // Look for author information in markdown - try multiple patterns
  const authorPatterns = [
    /(?:by|By)\s+([^(,\n]+?)(?:\s*\(|,|\n|$)/,
    /Author[:\s]+([^,\n]+)/i,
    /Written by[:\s]+([^,\n]+)/i
  ];
  
  for (const pattern of authorPatterns) {
    const match = markdown.match(pattern);
    if (match && match[1]) {
      author = match[1].trim();
      break;
    }
  }
  
  // Look for publication info
  const pubPatterns = [
    /Publisher[:\s]+([^;,\n]+)/i,
    /Published by[:\s]+([^;,\n]+)/i
  ];
  
  for (const pattern of pubPatterns) {
    const match = markdown.match(pattern);
    if (match && match[1]) {
      publisher = match[1].trim();
      break;
    }
  }
  
  // Look for publication date
  const datePatterns = [
    /Publication date[:\s]+([^;,\n]+)/i,
    /Published[:\s]+([^;,\n]+)/i,
    /Release date[:\s]+([^;,\n]+)/i
  ];
  
  for (const pattern of datePatterns) {
    const match = markdown.match(pattern);
    if (match && match[1]) {
      publicationDate = match[1].trim();
      break;
    }
  }

  // Extract ASIN from URL for more reliable Amazon linking
  const asinMatch = originalUrl.match(/\/dp\/([A-Z0-9]{10})/);
  const asin = asinMatch ? asinMatch[1] : '';

  const result = {
    title: title || 'Unknown Title',
    description: description || '',
    cover_url: coverImage || '',
    author: author || 'Unknown Author',
    publisher: publisher || '',
    publication_date: publicationDate || '',
    amazon_url: originalUrl,
    asin: asin,
    markdown_content: markdown || ''
  };

  console.log('Extracted book data:', result);
  return result;
}