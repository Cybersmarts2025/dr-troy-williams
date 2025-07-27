import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AdminOperationRequest {
  operation: 'promote_user' | 'revoke_admin';
  target_user_id: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the JWT token and get user
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    
    if (userError || !user) {
      console.error('Auth error:', userError)
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
      console.error('Admin check failed:', adminError)
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

    let result
    let message

    switch (operation) {
      case 'promote_user':
        // Check if user already has admin role
        const { data: existingRole } = await supabaseAdmin
          .from('user_roles')
          .select('role')
          .eq('user_id', target_user_id)
          .eq('role', 'admin')
          .single()

        if (existingRole) {
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
          console.error('Promote error:', promoteError)
          return new Response(
            JSON.stringify({ error: 'Failed to promote user to admin' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        message = 'User promoted to admin successfully'
        break

      case 'revoke_admin':
        const { error: revokeError } = await supabaseAdmin
          .from('user_roles')
          .delete()
          .eq('user_id', target_user_id)
          .eq('role', 'admin')

        if (revokeError) {
          console.error('Revoke error:', revokeError)
          return new Response(
            JSON.stringify({ error: 'Failed to revoke admin access' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        message = 'Admin access revoked successfully'
        break

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid operation' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    // Log the admin action for audit purposes
    console.log(`Admin ${user.id} performed ${operation} on user ${target_user_id}`)

    return new Response(
      JSON.stringify({ success: true, message }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})