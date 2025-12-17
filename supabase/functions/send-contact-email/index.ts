// @ts-nocheck
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Simple per-IP rate limiter (in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) return true;
  record.count++;
  return false;
}

// Add per-email rate limiter (in-memory)
const emailRateMap = new Map<string, { count: number; resetTime: number }>();
const EMAIL_RATE_WINDOW_MS = 10 * 60_000; // 10 minutes
const MAX_EMAILS_PER_WINDOW = 2;

function isEmailRateLimited(email: string): boolean {
  const now = Date.now();
  const rec = emailRateMap.get(email.toLowerCase());
  if (!rec || now > rec.resetTime) {
    emailRateMap.set(email.toLowerCase(), { count: 1, resetTime: now + EMAIL_RATE_WINDOW_MS });
    return false;
  }
  if (rec.count >= MAX_EMAILS_PER_WINDOW) return true;
  rec.count++;
  return false;
}

const ALLOWED_ORIGINS = new Set<string>([
  "https://drtroywilliams.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function getCorsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://drtroywilliams.com",
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
}

// HTML escape function to prevent injection
const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

serve(async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Enforce origin allowlist
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: "Origin not allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // Require authenticated user (JWT)
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { autoRefreshToken: false, persistSession: false }});
  const { data: { user } } = await supabase.auth.getUser(token || "");
  if (!user) {
    return new Response(JSON.stringify({ error: "Authentication required" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // IP-based rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIP)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again shortly." }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  try {
    const { name, email, subject, message, website }: ContactEmailRequest = await req.json();

    // Honeypot and basic validation
    if (website && website.trim().length > 0) {
      // silently accept
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Additional simple content sanity checks
    if (/<[^>]+>/.test(message)) {
      return new Response(JSON.stringify({ error: "HTML is not allowed in message" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (subject.length > 200 || message.length > 5000) {
      return new Response(JSON.stringify({ error: "Message too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Per-email rate limit
    if (isEmailRateLimited(email)) {
      return new Response(JSON.stringify({ error: "Too many messages from this email. Please try again later." }), {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send email to site owner (recipient is locked)
    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["verifiedsafe8@gmail.com"],
      subject: `Contact Form: ${escapeHtml(subject)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <div>
          <strong>Message:</strong>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        </div>
        <p><em>Sent by authenticated user: ${escapeHtml(user.email ?? user.id)}</em></p>
      `,
    });

    // Confirmation email to sender (optional)
    await resend.emails.send({
      from: "Dr. Troy Williams <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Dr. Troy Williams",
      html: `
        <h1>Thank you for reaching out, ${escapeHtml(name)}!</h1>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Your message:</p>
        <blockquote style="border-left: 4px solid #3C3B6E; padding-left: 16px; margin: 16px 0; color: #666;">
          ${escapeHtml(message).replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>Dr. Troy Williams</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});