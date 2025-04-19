
import { serve } from "https://deno.land/std@0.204.0/http/server.ts";

async function fetchBookDetails(amazonUrl: string) {
  try {
    // Since direct scraping from Amazon might be blocked, let's extract what we can from the URL
    // and create a basic record with the amazonUrl itself
    
    // Extract ASIN (Amazon Standard Identification Number) if possible
    const asinMatch = amazonUrl.match(/\/([A-Z0-9]{10})(?:\/|\?|$)/);
    const asin = asinMatch ? asinMatch[1] : '';
    
    // Build a basic title from the URL
    const urlParts = amazonUrl.split('/');
    let title = "Book from Amazon";
    
    // Try to create a more descriptive title
    if (asin) {
      title = `Amazon Book (${asin})`;
    }
    
    return { 
      title, 
      description: "Added from Amazon URL. Details couldn't be automatically extracted.", 
      imageUrl: "", 
      author: "", 
      amazonUrl 
    };
  } catch (error) {
    console.error('Error in fetchBookDetails:', error);
    return { 
      title: "Book from Amazon", 
      description: "Added from Amazon URL", 
      imageUrl: "", 
      author: "", 
      amazonUrl 
    };
  }
}

serve(async (req) => {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { amazonUrl } = await req.json();
    
    if (!amazonUrl) {
      return new Response(
        JSON.stringify({ error: 'Amazon URL is required' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const bookDetails = await fetchBookDetails(amazonUrl);
    console.log('Successfully processed book details:', bookDetails);
    
    return new Response(
      JSON.stringify(bookDetails),
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch book details' }),
      { status: 500, headers: corsHeaders }
    );
  }
});
