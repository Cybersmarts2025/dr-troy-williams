// @ts-nocheck
import { serve } from "https://deno.land/std@0.204.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const ALLOWED_ORIGINS = new Set<string>([
  'https://drtroywilliams.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);

function cors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'https://drtroywilliams.com',
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

const rateLimit = new Map<string, { count: number; resetTime: number }>();
const WINDOW = 60_000;
const MAX_REQ = 10;

function limited(ip: string) {
  const now = Date.now();
  const rec = rateLimit.get(ip);
  if (!rec || now > rec.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW });
    return false;
  }
  if (rec.count >= MAX_REQ) return true;
  rec.count++;
  return false;
}

function isAmazonUrl(u: string): boolean {
  try {
    const url = new URL(u);
    const host = url.hostname.toLowerCase();
    return host.endsWith('amazon.com') && /\/dp\/[A-Z0-9]{10}/i.test(url.pathname);
  } catch {
    return false;
  }
}

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
  const corsHeaders = cors(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const origin = req.headers.get('origin');
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Require authenticated user
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || '';
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { autoRefreshToken: false, persistSession: false }});
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Authentication required' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
    }

    const { amazonUrl } = await req.json();

    if (!amazonUrl || !isAmazonUrl(amazonUrl)) {
      return new Response(JSON.stringify({ error: 'Valid Amazon product URL required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }});
    }

    const bookDetails = await fetchBookDetails(amazonUrl);
    console.log('Successfully processed book details:', bookDetails);
    return new Response(JSON.stringify(bookDetails), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch book details' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});