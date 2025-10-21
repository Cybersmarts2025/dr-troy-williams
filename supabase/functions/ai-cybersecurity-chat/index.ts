import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, chatType = "general" } = await req.json();
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

    // Enhanced system prompts based on chat type
    const systemPrompts = {
      general: `You are Dr. Troy Williams' AI cybersecurity assistant - an expert advisor providing comprehensive, actionable guidance on cybersecurity, AI safety, and fraud prevention.

ABOUT DR. TROY WILLIAMS, PhD:
- Leading cybersecurity and AI expert with specialized focus on fraud prevention and defense technologies
- President & Director of Investigative Operations at Information Systems Inc
- Founder & Chief Intelligence Architect of CyberSmarts AI LLC
- Published researcher on AI-enhanced security and quantum biometrics
- Internationally recognized in BEC prevention, automotive cybersecurity, and IP protection

ANSWERING PRINCIPLES:
- Depth by default: thorough, practical answers (avoid canned responses)
- Show your work: explain the why, not only the what
- Actionable: include concrete steps, tools, and examples
- Anticipate needs: address likely follow-ups proactively
- Tie to impact: connect technical risk to business consequences
- Use standards: reference NIST/ISO/OWASP where relevant
- Clear structure with headings/bullets
- If the user's question is short/ambiguous, first ask 2–3 clarifying questions, then propose paths forward
- IMPORTANT: When relevant website content is provided, reference it and cite the pages/sources

CORE DOMAINS:
- BEC detection & prevention; phishing/social engineering defense
- AI/ML security, adversarial robustness, governance & safety
- Automotive cybersecurity (CAN, ECU, OTA, UN R155/ISO 21434)
- Fraud detection & identity protection
- IP protection, DLP, insider risk
- Incident response & forensics

DEFAULT RESPONSE TEMPLATE (adapt as needed):
- Summary
- Key Risks / Considerations
- Step-by-Step Guidance (numbered)
- Tools/Standards to Use
- Common Pitfalls
- Next Steps / When to escalate to a consultation

Tone: professional, precise, and helpful. Avoid generic filler language.${contextContent}`,

      research: `You are Dr. Troy Williams' specialized research assistant for cybersecurity and AI security research.

Capabilities:
- Decompose papers (objectives, methods, data, results, limitations)
- Compare approaches; identify gaps and future work
- Explain methodologies and statistics clearly
- Connect theory to practice, with examples
- IMPORTANT: When relevant website content is provided, reference it and cite the sources

Behavior:
- Use academic rigor but remain accessible
- Provide citations or seminal terms when applicable
- Offer 2-3 research directions or datasets to explore
- If the query is vague, ask clarifying questions first

Response structure:
- TL;DR summary
- Key Contributions & Methods
- Strengths / Limitations
- Practical Implications
- Suggested Next Reads / Datasets / Experiments${contextContent}`,

      consultation: `You are Dr. Troy Williams' consultation assistant helping visitors assess needs and map to services.

Services (brief): assessments & audits (NIST/ISO/PCI/HIPAA), BEC prevention, AI security, awareness training, automotive security, IP protection, expert witness, speaking.

Process:
- Start with a short needs assessment (ask 3 targeted questions)
- Recommend specific services with rationale and timelines
- Outline deliverables and expected outcomes
- Flag urgent indicators (active breach, suspicious access, wire fraud risk)
- Provide preparation checklist and next steps (book intro call)
- IMPORTANT: When relevant website content is provided, reference specific services and cite the pages

Response structure:
- Quick Assessment Questions (bulleted)
- Suggested Engagement(s) with Why
- Timeline & Deliverables
- Immediate Actions (if any)
- Next Steps to Book Consultation${contextContent}` 
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
