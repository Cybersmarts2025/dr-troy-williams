import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Comprehensive page content for indexing
const PAGE_CONTENT: Record<string, { title: string; content: string }> = {
  '/': {
    title: 'Home - Dr. Troy Williams, PhD',
    content: `Dr. Troy Williams, PhD, is The Proactive AI PI - a cybersecurity engineer, artificial intelligence scientist, and licensed private investigator. He specializes in synthetic identity fraud detection and prevention. Dr. Williams is the creator of four trademarked defense systems: PatriotProof™ (fortress-level identity defense), FraudDNA™ (behavioral pattern analysis), AISF™ (Autonomous Intelligence Security Framework), and PPP™ (Proactive Prevention Platform). He is the inventor listed on international patent application PCT/US25/43982 for synthetic identity detection methodology. His mission is Protecting America Through Technology™. Based in Tennessee, he leads CyberSmarts AI LLC and Information Systems Inc.`
  },
  '/about': {
    title: 'About Dr. Troy Williams',
    content: `Dr. Troy Williams, PhD, represents a unique convergence of three critical disciplines: cybersecurity engineering, artificial intelligence science, and licensed private investigation. Known professionally as The Proactive AI PI, Williams has dedicated his career to identifying and neutralizing synthetic identity fraud—one of the fastest-growing and least understood threats to American financial infrastructure. Through doctoral-level research in artificial intelligence and cybersecurity, Williams brings both academic rigor and real-world investigative experience. His independent research has been featured on SSRN and ResearchGate, achieving a Research Interest Score of 8.0.`
  },
  '/master-bio': {
    title: 'Master Biography',
    content: `Master Biography of Dr. Troy Williams, PhD - comprehensive timeline from 1993 to 2027. Career milestones include: 1993 - Career beginning in investigations, 2015-2023 - Advanced degrees and certifications, 2024 - Patent filing PCT/US25/43982, 2025 - Launch of trademarked systems PatriotProof™, FraudDNA™, AISF™, PPP™. Currently developing prototype for financial fraud detection including PatriotProof™, CyberSmarts, LegalSmarts, and ReAIM platforms. His research and publications are independently developed and published. Specialized training includes prompt engineering under Dr. Jules White at Vanderbilt University and financial fraud investigation through SBI Seminars.`
  },
  '/credentials': {
    title: 'Credentials & Education',
    content: `Dr. Troy Williams holds doctoral-level research credentials in Artificial Intelligence and Information Technology. Additional credentials include: Master's in IT Management, Bachelor's in Cybersecurity & Information Assurance, Tennessee Licensed Private Investigator. Training from Vanderbilt University (prompt engineering under Dr. Jules White) and SBI Seminars (financial fraud and courtroom ethics). His research and publications are independently developed and published. ResearchGate metrics: Score 8.0, 755+ reads.`
  },
  '/timeline': {
    title: 'Career Timeline',
    content: `Career timeline of Dr. Troy Williams spanning 32+ years of investigative experience. Key milestones: 1993 - Career foundation, 2015-2023 - Advanced education and certifications, 2024 - International patent application PCT/US25/43982 filed, 2025 - Launch of four trademarked defense systems forming the first unified synthetic identity prevention architecture in the United States. Ongoing prototype development for financial fraud detection platforms.`
  },
  '/research-footprint': {
    title: 'Research Footprint',
    content: `Research publications and academic profiles of Dr. Troy Williams. Featured on SSRN and ResearchGate with Research Interest Score of 8.0 and 755+ reads. Research focuses on synthetic identity fraud detection, AI security frameworks, and proactive prevention methodologies. His research and publications are independently developed and published. International patent application PCT/US25/43982 covers synthetic identity detection methodology.`
  },
  '/technology-stack': {
    title: 'Technology Stack',
    content: `Dr. Troy Williams' technology stack includes four trademarked defense systems: PatriotProof™ - fortress-level national identity and fraud defense, FraudDNA™ - pattern analysis engine for synthetic identity detection, AISF™ - Autonomous Intelligence Security Framework for real-time security, PPP™ - Proactive Prevention Platform. Additional platforms include ScamAtlas™ for national fraud visualization. These systems integrate to form the first unified synthetic identity prevention architecture in the United States.`
  },
  '/national-mission': {
    title: 'National Mission',
    content: `Dr. Troy Williams' national mission: Protecting America Through Technology™. Mission pillars include defending against synthetic identity fraud, developing domestic technology independence, and building sovereign AI security systems. His work addresses the threat of identity engineering using fragmented data across 200+ unregulated systems. The mission roadmap spans from 1993 foundational work to 2027 prototype completion.`
  },
  '/books': {
    title: 'Books & Publications',
    content: `Books and publications by Dr. Troy Williams covering artificial intelligence, cybersecurity, and digital investigation methodologies. Topics include synthetic identity fraud, proactive prevention, AI security frameworks, and digital investigation methods. Available on Amazon Author page. Essential reading for technology professionals, policymakers, and security specialists.`
  },
  '/press': {
    title: 'Press & Media',
    content: `Press coverage and media features of Dr. Troy Williams, PhD. Available for interviews on synthetic identity fraud, AI security, cybersecurity threats, and fraud prevention. Media inquiries welcome for podcasts, keynotes, panel discussions, and expert commentary on national security technology topics.`
  },
  '/press-kit': {
    title: 'Press Kit',
    content: `Press kit for Dr. Troy Williams, PhD - The Proactive AI PI. Includes official headshot, bio snippets (short, medium, extended), speaking topics, and downloadable assets. Official profiles: Amazon Author Page, LinkedIn, ResearchGate, YouTube Channel. Interview topics include synthetic identity fraud, AI security frameworks, automotive cybersecurity, and national technology sovereignty.`
  },
  '/validation': {
    title: 'Validation & Verification',
    content: `Validation and verification archive for Dr. Troy Williams' credentials, research, and professional standing. Includes patent verification (PCT/US25/43982), research metrics, professional licenses, and independent verification sources.`
  },
  '/blog': {
    title: 'Blog',
    content: `Blog featuring articles on cybersecurity, AI security, synthetic identity fraud trends, fraud prevention strategies, and national security technology topics. Written by Dr. Troy Williams, PhD.`
  },
  '/ai-tools': {
    title: 'AI-Powered Tools',
    content: `AI-powered tools including intelligent Q&A assistant for cybersecurity questions, research analysis assistant, and consultation guidance. Powered by advanced AI models trained on Dr. Troy Williams' expertise in synthetic identity fraud, cybersecurity, and AI security.`
  },
  '/certifications': {
    title: 'Certifications',
    content: `Professional certifications and credentials held by Dr. Troy Williams including cybersecurity certifications, fraud investigation credentials, and Tennessee Private Investigator license. Ongoing professional development in AI security and fraud prevention.`
  },
  '/cybersecurity': {
    title: 'Cybersecurity Services',
    content: `Cybersecurity services offered by Dr. Troy Williams including security assessments, vulnerability testing, compliance audits (NIST, ISO 27001, PCI-DSS, HIPAA), incident response, BEC prevention, and security architecture reviews.`
  },
  '/auto-security': {
    title: 'Automotive Cybersecurity',
    content: `Automotive cybersecurity consulting services covering vehicle security assessments, CAN bus security, connected car threat modeling, autonomous vehicle security, and regulatory compliance with UN R155 and ISO 21434 standards.`
  },
  '/ip': {
    title: 'Intellectual Property Protection',
    content: `Intellectual property protection services including trade secret security, data loss prevention (DLP), insider threat programs, digital forensics, and security for R&D environments.`
  },
  '/synthetic-identity-defense': {
    title: 'Synthetic Identity Defense',
    content: `Synthetic Identity Defense Service - high-authority institutional offering for banks and government agencies. Core message: synthetic identity is not identity theft but identity engineering using fragmented data across 200+ unregulated systems. Service integrates four trademarked systems: PatriotProof™, FraudDNA™, AISF™, PPP™. Deliverables include ecosystem investigation, synthetic human detection, fragment analysis, financial aging detection, social graph discovery, document entropy analysis, and quantum-era risk forecasting.`
  },
  '/stolen-nation': {
    title: 'Stolen Nation Briefings',
    content: `Stolen Nation briefings - intelligence reports on synthetic identity fraud, financial crimes, and threats to American digital infrastructure. Professional national security tone. Authored by Dr. Troy Williams, PhD. Tagline: Protecting America Through Technology™.`
  },
  '/aisf': {
    title: 'AISF - Autonomous Intelligence Security Framework',
    content: `AISF™ - Autonomous Intelligence Security Framework. Trademarked system by Dr. Troy Williams for real-time AI-driven security monitoring and threat detection. Part of the unified synthetic identity prevention architecture.`
  },
  '/ppp': {
    title: 'PPP - Proactive Prevention Platform',
    content: `PPP™ - Proactive Prevention Platform. Trademarked system by Dr. Troy Williams for proactive threat identification and neutralization before attacks materialize. Integrates with PatriotProof™, FraudDNA™, and AISF™.`
  },
  '/scam-atlas': {
    title: 'ScamAtlas',
    content: `ScamAtlas™ - National visualization platform for fraud tracking and mapping. Developed by Dr. Troy Williams to provide geographic and temporal analysis of fraud patterns across the United States.`
  },
  '/job-ready-360': {
    title: 'Job Ready 360',
    content: `Job Ready 360™ - Career acceleration system for WGU alumni by Dr. Troy Williams. Eight sequential stages: Target Your Role, Reverse Resume, Portfolio and Proof, Professional Presence, Interview Mastery, Employer Research, Follow Up System, Career Operating System. Emphasizes value-driven positioning, employer alignment, and proof-based credentialing.`
  },
  '/mentorship': {
    title: 'Mentorship Program',
    content: `Professional mentorship program by Dr. Troy Williams for cybersecurity professionals and career changers. Guidance on career development, technical skills, and industry best practices. Module-based curriculum with instructor feedback.`
  },
  '/consultation': {
    title: 'Consultation Services',
    content: `Consultation services with Dr. Troy Williams covering cybersecurity assessments, fraud prevention strategy, AI security implementation, synthetic identity defense, and expert advisory services for organizations.`
  },
  '/appointments': {
    title: 'Book Appointment',
    content: `Book an appointment with Dr. Troy Williams for consultations, speaking engagements, expert witness services, or security assessments. Multiple appointment types available.`
  },
  '/contact': {
    title: 'Contact',
    content: `Contact Dr. Troy Williams for cybersecurity consultations, speaking engagements, expert witness services, media inquiries, or to schedule a consultation. Based in Tennessee.`
  },
  '/resources': {
    title: 'Resources',
    content: `Resource library with downloadable materials on cybersecurity, AI security, fraud prevention, and related topics from Dr. Troy Williams.`
  },
  '/webinars': {
    title: 'Webinars',
    content: `Webinars and online events hosted by Dr. Troy Williams on cybersecurity, AI security, synthetic identity fraud, and professional development topics.`
  },
};

async function indexPage(
  supabase: any,
  openaiKey: string,
  url: string,
  title: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log(`Indexing: ${url}`);
    
    // Generate embedding
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: content.slice(0, 8000),
      }),
    });

    if (!embeddingResponse.ok) {
      const errorText = await embeddingResponse.text();
      console.error(`OpenAI error for ${url}:`, errorText);
      return { success: false, error: `OpenAI error: ${embeddingResponse.status}` };
    }

    const embeddingData = await embeddingResponse.json();
    const embedding = embeddingData.data[0].embedding;

    // Upsert to database
    const { error } = await supabase
      .from('website_content')
      .upsert({
        url: `https://drtroywilliams.com${url}`,
        title,
        content,
        embedding,
        indexed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'url'
      });

    if (error) {
      console.error(`Database error for ${url}:`, error);
      return { success: false, error: error.message };
    }

    console.log(`Successfully indexed: ${url}`);
    return { success: true };
  } catch (error) {
    console.error(`Error indexing ${url}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  console.log('=== Auto-Index Website Content Started ===');
  console.log(`Time: ${new Date().toISOString()}`);

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: { url: string; success: boolean; error?: string }[] = [];
    let successCount = 0;
    let errorCount = 0;

    // Index all pages
    for (const [url, pageData] of Object.entries(PAGE_CONTENT)) {
      const result = await indexPage(supabase, OPENAI_API_KEY, url, pageData.title, pageData.content);
      results.push({ url, ...result });
      
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const duration = Date.now() - startTime;
    console.log(`=== Auto-Index Complete ===`);
    console.log(`Success: ${successCount}, Errors: ${errorCount}, Duration: ${duration}ms`);

    return new Response(JSON.stringify({
      success: true,
      message: `Indexed ${successCount} pages successfully, ${errorCount} errors`,
      duration_ms: duration,
      results,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Auto-index error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
