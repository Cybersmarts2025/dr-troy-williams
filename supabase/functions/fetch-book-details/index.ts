
import { serve } from "https://deno.land/std@0.204.0/http/server.ts";

async function fetchBookDetails(amazonUrl: string) {
  try {
    const response = await fetch(amazonUrl);
    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<span id="productTitle"[^>]*>([^<]+)<\/span>/);
    const title = titleMatch ? titleMatch[1].trim() : "Book from Amazon";

    // Extract description
    const descriptionMatch = html.match(/<div id="bookDescription_feature_div"[^>]*>(.*?)<\/div>/s);
    let description = descriptionMatch ? 
      descriptionMatch[1]
        .replace(/<[^>]+>/g, '')
        .trim() : 
      "No description available";

    // Extract image URL
    const imageMatch = html.match(/<img id="imgBlkFront"[^>]*src="([^"]+)"/);
    const imageUrl = imageMatch ? imageMatch[1] : "";

    return { 
      title, 
      description, 
      imageUrl,
      amazonUrl 
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return { 
      title: "Book from Amazon", 
      description: "Failed to fetch book details", 
      imageUrl: "", 
      amazonUrl 
    };
  }
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { amazonUrl } = await req.json();
    
    if (!amazonUrl) {
      return new Response(
        JSON.stringify({ error: 'Amazon URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const bookDetails = await fetchBookDetails(amazonUrl);
    console.log('Successfully processed book details:', bookDetails);
    
    return new Response(
      JSON.stringify(bookDetails),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Server error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch book details' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
