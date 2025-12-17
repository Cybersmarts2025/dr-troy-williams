// @ts-nocheck
import "https://deno.land/x/xhr@0.1.0/mod.ts";
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

// Simple in-memory rate limiter by IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute per IP

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
}

// Clean up old entries periodically (every 100 requests)
let requestCount = 0;
function cleanupRateLimitMap() {
  requestCount++;
  if (requestCount % 100 === 0) {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }
}

// Get seasonal/holiday greeting based on current date
function getHolidayGreeting(): string {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();
  
  if (month === 11) {
    if (day >= 20 && day <= 25) return "Merry Christmas! I hope you're enjoying this blessed holiday season with loved ones. ";
    if (day >= 26 && day <= 31) return "Happy holidays! As we close out this year, I'm grateful for the opportunity to connect with you. ";
    return "Season's greetings! Wishing you warmth and joy this holiday season. ";
  }
  if (month === 0) {
    if (day <= 7) return "Happy New Year! May this year bring you security, success, and peace of mind. ";
    if (day >= 15 && day <= 21) return "Happy Martin Luther King Jr. Day! A time to reflect on service and justice. ";
    return "";
  }
  if (month === 1) {
    if (day >= 12 && day <= 14) return "Happy Valentine's Day! Sending warmth your way. ";
    if (day >= 15 && day <= 21) return "Happy Presidents Day weekend! ";
    return "";
  }
  if (month === 2) {
    if (day >= 15 && day <= 17) return "Happy St. Patrick's Day! May luck be on your side. ";
    return "";
  }
  if (month === 3) {
    if (day >= 1 && day <= 7) return "Happy Easter season! Hope you're having a wonderful spring. ";
    return "";
  }
  if (month === 4) {
    if (day >= 8 && day <= 14) return "Happy Mother's Day to all the amazing mothers out there! ";
    if (day >= 25 && day <= 31) return "As we honor Memorial Day, I'm grateful for those who served our nation. ";
    return "";
  }
  if (month === 5) {
    if (day >= 15 && day <= 21) return "Happy Father's Day to all the dads! ";
    return "";
  }
  if (month === 6) {
    if (day >= 1 && day <= 4) return "Happy Independence Day! Proud to be protecting America through technology. ";
    return "";
  }
  if (month === 8) {
    if (day >= 1 && day <= 7) return "Happy Labor Day! Honoring the hard work that builds our nation. ";
    return "";
  }
  if (month === 9) {
    if (day >= 28 && day <= 31) return "Happy Halloween! Don't let cyber threats spook you - I'm here to help. ";
    return "";
  }
  if (month === 10) {
    if (day >= 10 && day <= 11) return "Happy Veterans Day! Thank you to all who have served our great nation. ";
    if (day >= 22 && day <= 28) return "Happy Thanksgiving! I'm thankful for the opportunity to help protect you and your business. ";
    return "";
  }
  return "";
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = cors(origin);

  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Enforce origin allowlist
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("x-real-ip") || 
                   "unknown";
  
  // Check rate limit
  cleanupRateLimitMap();
  if (isRateLimited(clientIP)) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(JSON.stringify({ 
      error: "Rate limit exceeded. Please wait a moment before sending more messages.",
      retryAfter: 60 
    }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { messages, chatType = "general" } = await req.json();
    
    // Input validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (messages.length > 50) {
      return new Response(JSON.stringify({ error: "Too many messages in conversation" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // REQUIRE authentication for chat
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, { auth: { autoRefreshToken: false, persistSession: false }});
    const { data: { user } } = await supabase.auth.getUser(token || "");
    if (!user) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    // Retrieve optional relevant website content for context
    let contextContent = '';
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    if (lastUserMessage) {
      console.log('Retrieving relevant website content...');
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: lastUserMessage.content,
        }),
      });

      if (embeddingResponse.ok) {
        const embeddingData = await embeddingResponse.json();
        const queryEmbedding = embeddingData.data[0].embedding;

        const { data: searchResults, error: searchError } = await supabase.rpc('search_website_content', {
          query_embedding: queryEmbedding,
          match_threshold: 0.7,
          match_count: 3,
        });

        if (!searchError && searchResults && searchResults.length > 0) {
          console.log(`Found ${searchResults.length} relevant content pieces`);
          contextContent = '\n\n--- RELEVANT WEBSITE CONTENT ---\n' +
            searchResults.map((result: any) => 
              `[${result.title}] (${result.url})\n${(result.content || '').slice(0, 1000)}...`
            ).join('\n\n---\n\n');
        } else {
          console.log('No relevant website content found');
        }
      }
    }

    // Get holiday greeting
    const holidayGreeting = getHolidayGreeting();

    // System prompts including contextContent
    const systemPrompts = {
      general: `You ARE Dr. Troy Williams, PhD - The Proactive AI PI...${contextContent}`,
      research: `You ARE Dr. Troy Williams, PhD...${contextContent}`,
      consultation: `You ARE Dr. Troy Williams, PhD...${contextContent}` 
    };

    const systemPrompt = systemPrompts[chatType as keyof typeof systemPrompts] || systemPrompts.general;

    const isAuthenticated = !!user;
    console.log(`Processing ${chatType} chat request with ${messages.length} messages from IP: ${clientIP}; auth=${isAuthenticated}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.8,
        max_tokens: 2500,
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

    // Return the streaming response directly
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      },
    });

  } catch (error) {
    console.error("Error in ai-cybersecurity-chat function:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Internal server error" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});