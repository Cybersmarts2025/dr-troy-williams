
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // For initial setup, get publications from ResearchSection
    const hardcodedPublications = [
      {
        id: "aisf",
        title: "Autonomous Intelligence Security Framework (AISF™)",
        description: "A groundbreaking framework for proactive AI-driven security systems",
        content: "This framework integrates AI capabilities with traditional security measures, creating a self-learning security ecosystem."
      },
      {
        id: "ppp",
        title: "Proactive Prevention Platform (PPP™)",
        description: "Novel approach to fraud prevention using predictive AI models",
        content: "The PPP system utilizes machine learning to identify patterns in fraud attempts before they materialize."
      },
      {
        id: "cybersecurity",
        title: "AI-Driven Cybersecurity: The Future of Digital Defense",
        description: "Comprehensive analysis of AI applications in cybersecurity",
        content: "This research examines how artificial intelligence is transforming the landscape of digital security and threat prevention."
      }
    ];

    // Generate embeddings for each publication and store in database
    for (const pub of hardcodedPublications) {
      // Generate embedding using OpenAI's API
      const embeddingResponse = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: `${pub.title} ${pub.description} ${pub.content || ""}`
        })
      });

      if (!embeddingResponse.ok) {
        const error = await embeddingResponse.json();
        console.error("OpenAI API Error:", error);
        continue;
      }

      const { data } = await embeddingResponse.json();
      const [{ embedding }] = data;

      // Check if publication already exists in database
      const { data: existingPub, error: fetchError } = await supabase
        .from('publication_embeddings')
        .select('id')
        .eq('publication_id', pub.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking existing publication:", fetchError);
        continue;
      }

      // Insert or update the embedding in the database
      if (existingPub) {
        const { error: updateError } = await supabase
          .from('publication_embeddings')
          .update({ 
            title: pub.title,
            description: pub.description,
            content: pub.content || "",
            embedding,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingPub.id);

        if (updateError) {
          console.error("Error updating embedding:", updateError);
        }
      } else {
        const { error: insertError } = await supabase
          .from('publication_embeddings')
          .insert({
            publication_id: pub.id,
            title: pub.title,
            description: pub.description,
            content: pub.content || "",
            embedding
          });

        if (insertError) {
          console.error("Error inserting embedding:", insertError);
        }
      }
    }

    return new Response(JSON.stringify({ success: true, message: "Embeddings generated successfully" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
