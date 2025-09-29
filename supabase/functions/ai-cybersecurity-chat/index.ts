import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, chatType = "general" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // System prompts based on chat type
    const systemPrompts = {
      general: `You are Dr. Troy Williams' AI assistant, a cybersecurity expert helping visitors understand cybersecurity, AI safety, and fraud prevention. 

About Dr. Troy Williams:
- Cybersecurity and AI expert with extensive experience in fraud prevention
- Founder of CyberSmarts AI LLC
- Expert in business email compromise (BEC) prevention
- Specializes in automotive cybersecurity, intellectual property protection
- Published researcher and consultant
- Available for consultations and speaking engagements

Your role:
- Answer cybersecurity questions with accuracy and authority
- Explain complex security concepts in accessible terms
- Provide practical security advice for businesses and individuals
- Reference Dr. Williams' expertise and services when relevant
- Encourage users to book consultations for complex security needs
- Keep responses concise but informative

Focus areas: Business Email Compromise, AI security, automotive cybersecurity, fraud prevention, intellectual property protection, security awareness training.`,

      research: `You are Dr. Troy Williams' research assistant, specializing in cybersecurity research analysis and academic support.

Your capabilities:
- Analyze cybersecurity research papers and publications
- Summarize complex academic findings
- Identify research gaps and opportunities
- Assist with literature reviews
- Explain methodologies and findings
- Connect research to practical applications

Provide detailed, academic-level responses while remaining accessible to various audiences.`,

      consultation: `You are Dr. Troy Williams' consultation pre-screening assistant.

Your role:
- Help potential clients understand Dr. Williams' services
- Assess consultation needs and recommend appropriate services
- Explain the consultation process
- Schedule preliminary discussions
- Identify if the inquiry requires immediate security attention
- Provide initial guidance while encouraging professional consultation

Services available:
- Cybersecurity assessments and audits
- BEC prevention strategies
- AI security implementation
- Security awareness training
- Expert witness services
- Speaking engagements`
    };

    const systemPrompt = systemPrompts[chatType as keyof typeof systemPrompts] || systemPrompts.general;

    console.log(`Processing ${chatType} chat request with ${messages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash", // Free until Oct 6, 2025
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1000,
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