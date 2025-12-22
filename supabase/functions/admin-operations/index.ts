import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

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

interface AdminOperationRequest {
  operation: 'promote_user' | 'revoke_admin';
  target_user_id: string;
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = cors(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Enforce origin allowlist
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // simple audit logger
    const logAudit = async (event_type: string, description: string, performed_by: string | null) => {
      try {
        await supabaseAdmin.from('security_audit_log').insert({
          event_type,
          description,
          performed_by: performed_by ? performed_by : null
        });
      } catch {
        // ignore logging errors
      }
    };

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      await logAudit('ADMIN_OP_UNAUTHORIZED', 'Missing Authorization header', null);
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the JWT token and get user
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError || !user) {
      await logAudit('ADMIN_OP_UNAUTHORIZED', `Invalid authentication: ${userError?.message ?? 'no user'}`, null);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if the requesting user is an admin
    const { data: adminCheck, error: adminError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()

    if (adminError || !adminCheck) {
      await logAudit('ADMIN_OP_FORBIDDEN', `Non-admin attempted admin operation`, user.id);
      return new Response(
        JSON.stringify({ error: 'Admin privileges required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const { operation, target_user_id }: AdminOperationRequest = await req.json()

    if (!operation || !target_user_id) {
      return new Response(
        JSON.stringify({ error: 'Missing operation or target_user_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prevent self-demotion
    if (operation === 'revoke_admin' && target_user_id === user.id) {
      return new Response(
        JSON.stringify({ error: 'Cannot revoke your own admin privileges' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let message

    switch (operation) {
      case 'promote_user': {
        // Check if user already has admin role
        const { data: existingRole } = await supabaseAdmin
          .from('user_roles')
          .select('role')
          .eq('user_id', target_user_id)
          .eq('role', 'admin')
          .single()

        if (existingRole) {
          await logAudit('ADMIN_OP_NOOP', `Promote skipped (already admin): ${target_user_id}`, user.id);
          return new Response(
            JSON.stringify({ success: true, message: 'User is already an admin' }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const { error: promoteError } = await supabaseAdmin
          .from('user_roles')
          .insert({
            user_id: target_user_id,
            role: 'admin'
          })

        if (promoteError) {
          await logAudit('ADMIN_OP_ERROR', `Promote failed: ${promoteError.message}`, user.id);
          return new Response(
            JSON.stringify({ error: 'Failed to promote user to admin' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        message = 'User promoted to admin successfully'
        await logAudit('ADMIN_OP_SUCCESS', `Promoted user to admin: ${target_user_id}`, user.id);
        break
      }

      case 'revoke_admin': {
        const { error: revokeError } = await supabaseAdmin
          .from('user_roles')
          .delete()
          .eq('user_id', target_user_id)
          .eq('role', 'admin')

        if (revokeError) {
          await logAudit('ADMIN_OP_ERROR', `Revoke failed: ${revokeError.message}`, user.id);
          return new Response(
            JSON.stringify({ error: 'Failed to revoke admin access' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        message = 'Admin access revoked successfully'
        await logAudit('ADMIN_OP_SUCCESS', `Revoked admin from user: ${target_user_id}`, user.id);
        break
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid operation' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    return new Response(
      JSON.stringify({ success: true, message }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...cors(null) } }
    )
  }
})