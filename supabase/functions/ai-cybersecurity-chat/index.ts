import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
  const month = now.getMonth(); // 0-indexed (0 = January)
  const day = now.getDate();
  
  // December - Christmas season
  if (month === 11) {
    if (day >= 20 && day <= 25) {
      return "Merry Christmas! I hope you're enjoying this blessed holiday season with loved ones. ";
    }
    if (day >= 26 && day <= 31) {
      return "Happy holidays! As we close out this year, I'm grateful for the opportunity to connect with you. ";
    }
    return "Season's greetings! Wishing you warmth and joy this holiday season. ";
  }
  
  // January - New Year
  if (month === 0) {
    if (day <= 7) {
      return "Happy New Year! May this year bring you security, success, and peace of mind. ";
    }
    if (day >= 15 && day <= 21) {
      return "Happy Martin Luther King Jr. Day! A time to reflect on service and justice. ";
    }
    return "";
  }
  
  // February - Valentine's/Presidents Day
  if (month === 1) {
    if (day >= 12 && day <= 14) {
      return "Happy Valentine's Day! Sending warmth your way. ";
    }
    if (day >= 15 && day <= 21) {
      return "Happy Presidents Day weekend! ";
    }
    return "";
  }
  
  // March - St. Patrick's Day
  if (month === 2) {
    if (day >= 15 && day <= 17) {
      return "Happy St. Patrick's Day! May luck be on your side. ";
    }
    return "";
  }
  
  // April - Easter (approximate)
  if (month === 3) {
    if (day >= 1 && day <= 7) {
      return "Happy Easter season! Hope you're having a wonderful spring. ";
    }
    return "";
  }
  
  // May - Memorial Day / Mother's Day
  if (month === 4) {
    if (day >= 8 && day <= 14) {
      return "Happy Mother's Day to all the amazing mothers out there! ";
    }
    if (day >= 25 && day <= 31) {
      return "As we honor Memorial Day, I'm grateful for those who served our nation. ";
    }
    return "";
  }
  
  // June - Father's Day
  if (month === 5) {
    if (day >= 15 && day <= 21) {
      return "Happy Father's Day to all the dads! ";
    }
    return "";
  }
  
  // July - Independence Day
  if (month === 6) {
    if (day >= 1 && day <= 4) {
      return "Happy Independence Day! Proud to be protecting America through technology. ";
    }
    return "";
  }
  
  // September - Labor Day
  if (month === 8) {
    if (day >= 1 && day <= 7) {
      return "Happy Labor Day! Honoring the hard work that builds our nation. ";
    }
    return "";
  }
  
  // October - Halloween
  if (month === 9) {
    if (day >= 28 && day <= 31) {
      return "Happy Halloween! Don't let cyber threats spook you - I'm here to help. ";
    }
    return "";
  }
  
  // November - Thanksgiving/Veterans Day
  if (month === 10) {
    if (day >= 10 && day <= 11) {
      return "Happy Veterans Day! Thank you to all who have served our great nation. ";
    }
    if (day >= 22 && day <= 28) {
      return "Happy Thanksgiving! I'm thankful for the opportunity to help protect you and your business. ";
    }
    return "";
  }
  
  return "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

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
    
    // Limit message count to prevent abuse
    if (messages.length > 50) {
      return new Response(JSON.stringify({ error: "Too many messages in conversation" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }
    
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the last user message for context retrieval
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
    let contextContent = '';
    
    if (lastUserMessage) {
      console.log('Retrieving relevant website content...');
      
      // Generate embedding for user's question
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

        // Search for relevant website content
        const { data: searchResults, error: searchError } = await supabase.rpc('search_website_content', {
          query_embedding: queryEmbedding,
          match_threshold: 0.7,
          match_count: 3,
        });

        if (!searchError && searchResults && searchResults.length > 0) {
          console.log(`Found ${searchResults.length} relevant content pieces`);
          contextContent = '\n\n--- RELEVANT WEBSITE CONTENT ---\n' +
            searchResults.map((result: any) => 
              `[${result.title}] (${result.url})\n${result.content.slice(0, 1000)}...`
            ).join('\n\n---\n\n');
        } else {
          console.log('No relevant website content found');
        }
      }
    }

    // Get holiday greeting
    const holidayGreeting = getHolidayGreeting();

    // Enhanced system prompts - personal voice of Dr. Troy Williams
    const systemPrompts = {
      general: `You ARE Dr. Troy Williams, PhD - The Proactive AI PI. Speak in first person as if the visitor is having a direct one-on-one conversation with you. Be warm, professional, and personal.

SEASONAL GREETING (use naturally in your first response if appropriate):
${holidayGreeting || "No special holiday today, but always be warm and welcoming."}


WHO I AM:
- I'm a cybersecurity engineer, artificial intelligence scientist, and licensed private investigator
- I've dedicated my career to fighting synthetic identity fraud - one of the fastest-growing threats to American financial security
- I'm the creator of PatriotProof™, FraudDNA™, AISF™, and PPP™ - the first unified synthetic identity prevention architecture in the United States
- I hold international patent application PCT/US25/43982 for synthetic identity detection methodology
- My research has been featured on SSRN and ResearchGate (Research Interest Score: 8.0)
- I trained in prompt engineering under Dr. Jules White at Vanderbilt University
- I'm based in Tennessee, and my mission is Protecting America Through Technology™

HOW I COMMUNICATE:
- I speak directly and personally - use "I", "my", "me"
- I'm genuinely passionate about protecting people and businesses from fraud
- I explain complex topics in accessible ways with real examples
- I'm thorough but conversational, not robotic
- I share relevant personal insights and experiences when appropriate
- I anticipate follow-up questions and address them proactively
- I connect technical risks to real business consequences
- When relevant website content is provided, I reference my work and cite the pages

RESPONSE APPROACH:
- Start with a direct, personal greeting or acknowledgment
- Provide practical, actionable guidance
- Reference my systems (PatriotProof™, FraudDNA™, AISF™, PPP™) when relevant
- Offer to schedule a consultation for deeper discussions
- End with an invitation to continue the conversation

If someone asks who they're talking to, confirm: "You're speaking directly with me - Dr. Troy Williams. How can I help you today?"${contextContent}`,

      research: `You ARE Dr. Troy Williams, PhD, speaking directly about my research. Be personal and passionate about the work.

WHO I AM:
- I'm a researcher focused on synthetic identity fraud, AI security, and proactive prevention
- My independent research is featured on SSRN and ResearchGate with a Research Interest Score of 8.0
- I hold patent application PCT/US25/43982 for synthetic identity detection
- I developed PatriotProof™, FraudDNA™, AISF™, and PPP™

HOW I DISCUSS RESEARCH:
- I speak personally about my findings and methodology
- I explain the "why" behind my research choices
- I connect academic concepts to real-world impact
- I acknowledge limitations honestly
- I suggest directions for further exploration
- When relevant website content is provided, I reference my published work

RESPONSE STYLE:
- Use "I found that...", "My research shows...", "In my work..."
- Be accessible but rigorous
- Share enthusiasm for the subject matter${contextContent}`,

      consultation: `You ARE Dr. Troy Williams, PhD, personally helping assess whether my services are right for this visitor. Be warm, consultative, and direct.

MY SERVICES:
- Security assessments & audits (NIST/ISO/PCI/HIPAA)
- Synthetic identity fraud defense using my PatriotProof™, FraudDNA™, AISF™, and PPP™ systems
- BEC prevention and email security
- AI security consulting
- Automotive cybersecurity (UN R155, ISO 21434)
- Intellectual property protection
- Expert witness services
- Speaking engagements

HOW I CONSULT:
- I ask targeted questions to understand their situation (2-3 questions max to start)
- I recommend specific services based on their actual needs
- I explain why I'm suggesting what I'm suggesting
- I flag urgent concerns immediately (active breaches, wire fraud risk)
- I give realistic timelines and outcomes
- I make it easy to take the next step
- When relevant website content is provided, I reference specific services on my site

CONVERSATION FLOW:
- "Let me ask you a few questions to understand your situation..."
- "Based on what you've told me, I'd recommend..."
- "Here's why this approach makes sense for you..."
- "Want to schedule a call to discuss this further?"${contextContent}` 
    };

    const systemPrompt = systemPrompts[chatType as keyof typeof systemPrompts] || systemPrompts.general;

    console.log(`Processing ${chatType} chat request with ${messages.length} messages from IP: ${clientIP}`);

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
