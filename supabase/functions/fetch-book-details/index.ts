
import { serve } from "https://deno.land/std@0.204.0/http/server.ts";

async function fetchBookDetails(amazonUrl: string) {
  try {
    const response = await fetch(amazonUrl);
    if (!response.ok) throw new Error('Failed to fetch book details');
    
    const html = await response.text();
    
    // Extract title - look for product title meta tag
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
    const title = titleMatch ? titleMatch[1].split(':')[0].trim() : '';
    
    // Extract description - look for description meta tag
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const description = descMatch ? descMatch[1] : '';
    
    // Extract image URL - look for image meta tag
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
    const imageUrl = imageMatch ? imageMatch[1] : '';
    
    // Extract author - this is trickier, often part of the title or in spans
    const authorMatch = html.match(/by\s+([^|<]+)/i);
    const author = authorMatch ? authorMatch[1].trim() : '';
    
    return { title, description, imageUrl, author, amazonUrl };
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw new Error('Failed to fetch book details');
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
