// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ALLOWED_ORIGINS = new Set<string>([
  "https://drtroywilliams.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function cors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://drtroywilliams.com",
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// Simple per-IP rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const WINDOW = 60_000;
const MAX_REQ = 5;

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

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = cors(origin);

  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" }});
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }});
  }

  try {
    // Require authenticated user
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, supabaseKey, { auth: { autoRefreshToken: false, persistSession: false }});
    const { data: { user } } = await admin.auth.getUser(token || "");
    if (!user) {
      return new Response(JSON.stringify({ error: "Authentication required" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" }});
    }

    const { prompt, style = "" } = await req.json();
    
    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating image with prompt:", prompt);

    // Enhance the prompt for better cybersecurity/professional results
    const enhancedPrompt = `${prompt}. ${style}. Professional quality, ultra high resolution, modern, clean, sophisticated, corporate aesthetic, high-tech, cybersecurity theme, digital art style, professional lighting, sharp details, 4K quality.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: enhancedPrompt
          }
        ],
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded. Please try again in a moment.",
          retryAfter: 30 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "AI service quota exceeded. Please contact support.",
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received:", data);

    // Extract the generated image from the response
    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImage) {
      console.error("No image found in response:", JSON.stringify(data, null, 2));
      throw new Error("No image was generated. Please try a different prompt.");
    }

    console.log("Image generated successfully");

    return new Response(JSON.stringify({ 
      imageUrl: generatedImage,
      prompt: prompt,
      enhancedPrompt: enhancedPrompt
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in ai-image-generator function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});