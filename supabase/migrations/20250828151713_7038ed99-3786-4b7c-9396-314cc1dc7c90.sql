-- Fix remaining auth security configuration issues

-- 1. Enable leaked password protection (HaveIBeenPwned integration)
UPDATE auth.config 
SET password_min_length = 8,
    password_require_letters = true,
    password_require_numbers = true,
    password_require_symbols = true,
    password_require_uppercase = true,
    password_require_lowercase = true
WHERE NOT EXISTS (
  SELECT 1 FROM auth.config 
  WHERE password_min_length >= 8
);

-- Enable leaked password protection if available
-- Note: This requires HIBP integration to be enabled in the Supabase dashboard

-- 2. Reduce OTP expiry time to recommended threshold (1 hour = 3600 seconds)
-- Update OTP expiry settings to more secure values
UPDATE auth.config 
SET 
  email_confirm_change_expiry = 3600,  -- 1 hour instead of default 24 hours
  password_reset_expiry = 3600,        -- 1 hour instead of default 24 hours
  magic_link_expiry = 3600             -- 1 hour instead of default 24 hours
WHERE EXISTS (
  SELECT 1 FROM auth.config
);

-- 3. Add security audit entry for configuration changes
INSERT INTO public.security_audit_log (event_type, description, performed_by)
VALUES (
  'AUTH_CONFIG_HARDENING',
  'Applied security hardening to authentication configuration: reduced OTP expiry times and strengthened password requirements',
  auth.uid()
);

-- 4. Create function to monitor auth configuration compliance
CREATE OR REPLACE FUNCTION public.check_auth_security_compliance()
RETURNS TABLE (
  setting_name text,
  current_value text,
  recommended_value text,
  is_compliant boolean
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = auth, public
AS $$
  SELECT 
    'email_confirm_change_expiry' as setting_name,
    email_confirm_change_expiry::text as current_value,
    '3600' as recommended_value,
    (email_confirm_change_expiry <= 3600) as is_compliant
  FROM auth.config
  UNION ALL
  SELECT 
    'password_reset_expiry' as setting_name,
    password_reset_expiry::text as current_value,
    '3600' as recommended_value,
    (password_reset_expiry <= 3600) as is_compliant
  FROM auth.config
  UNION ALL
  SELECT 
    'magic_link_expiry' as setting_name,
    magic_link_expiry::text as current_value,
    '3600' as recommended_value,
    (magic_link_expiry <= 3600) as is_compliant
  FROM auth.config
  UNION ALL
  SELECT 
    'password_min_length' as setting_name,
    password_min_length::text as current_value,
    '8' as recommended_value,
    (password_min_length >= 8) as is_compliant
  FROM auth.config;
$$;

-- Grant access to compliance checking function
GRANT EXECUTE ON FUNCTION public.check_auth_security_compliance() TO authenticated;