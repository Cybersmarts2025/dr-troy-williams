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

    // Scrape the author page with HTML to get image URLs
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

    // Extract books from the HTML
    const books = extractBooksFromHtml(firecrawlData.data?.html || '');
    
    console.log(`Found ${books.length} unique books`);

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
  const seenTitles = new Set<string>();
  
  // Extract book cards/items with images and titles
  // Amazon author pages typically have product cards with images and ASIN links
  
  // Find all Amazon product image URLs (these have proper image IDs)
  const imagePattern = /src="(https:\/\/m\.media-amazon\.com\/images\/I\/[^"]+\.(jpg|png|gif)[^"]*)"/gi;
  const imageMatches = [...html.matchAll(imagePattern)];
  
  // Find all product links with ASINs
  const asinPattern = /href="[^"]*\/dp\/([A-Z0-9]{10})[^"]*"/gi;
  const asinMatches = [...html.matchAll(asinPattern)];
  
  // Find titles - look for alt text on images or nearby text
  const titlePattern = /alt="([^"]+)"/gi;
  const titleMatches = [...html.matchAll(titlePattern)];
  
  // Build a map of ASINs to their context (nearby images and titles)
  const asinContextMap = new Map<string, { images: string[], titles: string[] }>();
  
  for (const match of asinMatches) {
    const asin = match[1];
    if (!asinContextMap.has(asin)) {
      asinContextMap.set(asin, { images: [], titles: [] });
    }
  }
  
  // Extract images that look like book covers (contain size indicators)
  const bookCoverImages: string[] = [];
  for (const match of imageMatches) {
    const imgUrl = match[1];
    // Book cover images typically have specific size patterns
    if (imgUrl.includes('_SY') || imgUrl.includes('_SX') || imgUrl.includes('_AC_')) {
      bookCoverImages.push(imgUrl);
    }
  }
  
  // Extract meaningful titles from alt text
  const meaningfulTitles: string[] = [];
  for (const match of titleMatches) {
    let title = match[1].trim();
    // Remove "Image of" prefix
    if (title.toLowerCase().startsWith('image of ')) {
      title = title.substring(9);
    }
    // Filter out generic alt text
    if (title.length > 5 && 
        !title.toLowerCase().includes('star') && 
        !title.toLowerCase().includes('rating') &&
        !title.toLowerCase().includes('prime') &&
        !title.toLowerCase().includes('amazon') &&
        !title.toLowerCase().includes('image') &&
        !title.toLowerCase().startsWith('product') &&
        !title.toLowerCase().includes('kindle unlimited') &&
        !title.toLowerCase().includes('audible') &&
        title !== 'Paperback' &&
        title !== 'Hardcover' &&
        title !== 'Kindle Edition') {
      meaningfulTitles.push(title);
    }
  }
  
  // Match ASINs with their cover images and titles
  // Look for patterns like: image followed by ASIN link, or ASIN in image URL
  for (const [asin] of asinContextMap) {
    if (seenAsins.has(asin)) continue;
    
    // Find cover image for this ASIN
    let coverUrl = '';
    for (const img of bookCoverImages) {
      if (img.includes(asin)) {
        coverUrl = img;
        break;
      }
    }
    
    // If no direct match, try to find a cover near the ASIN reference
    if (!coverUrl && bookCoverImages.length > 0) {
      // Get position of ASIN in HTML
      const asinPos = html.indexOf(`/dp/${asin}`);
      if (asinPos > -1) {
        // Find closest image before or after
        let closestImg = '';
        let closestDist = Infinity;
        
        for (const img of bookCoverImages) {
          const imgPos = html.indexOf(img);
          const dist = Math.abs(imgPos - asinPos);
          if (dist < closestDist && dist < 2000) { // Within 2000 chars
            closestDist = dist;
            closestImg = img;
          }
        }
        coverUrl = closestImg;
      }
    }
    
    // Find title for this book
    let title = '';
    // Look for title near the ASIN
    const asinPos = html.indexOf(`/dp/${asin}`);
    if (asinPos > -1) {
      // Search for title in nearby content
      const nearbyHtml = html.slice(Math.max(0, asinPos - 1000), asinPos + 1000);
      
      // Look for alt text that might be the title
      const nearbyTitleMatch = nearbyHtml.match(/alt="([^"]{10,100})"/);
      if (nearbyTitleMatch) {
        let potentialTitle = nearbyTitleMatch[1].trim();
        // Clean up title
        if (potentialTitle.toLowerCase().startsWith('image of ')) {
          potentialTitle = potentialTitle.substring(9);
        }
        potentialTitle = potentialTitle.replace(/&amp;/g, '&');
        if (!['Paperback', 'Hardcover', 'Kindle Edition', 'Kindle Unlimited'].includes(potentialTitle) &&
            !potentialTitle.toLowerCase().includes('kindle unlimited')) {
          title = potentialTitle;
        }
      }
    }
    if (!title || seenTitles.has(title.toLowerCase())) continue;
    
    // Use Amazon's product image API as fallback
    if (!coverUrl) {
      coverUrl = `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
    }
    
    seenAsins.add(asin);
    seenTitles.add(title.toLowerCase());
    
    books.push({
      asin,
      amazonUrl: `https://www.amazon.com/dp/${asin}`,
      title,
      coverUrl,
    });
  }
  
  // Deduplicate by similar titles
  const uniqueBooks = books.filter((book, index) => {
    const normalizedTitle = book.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (let i = 0; i < index; i++) {
      const otherNormalized = books[i].title.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (normalizedTitle === otherNormalized || 
          normalizedTitle.includes(otherNormalized) || 
          otherNormalized.includes(normalizedTitle)) {
        return false;
      }
    }
    return true;
  });
  
  return uniqueBooks;
}
