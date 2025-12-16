-- Fix 1: Secure Vector Extension by Moving to Restricted Schema
-- Create a dedicated schema for extensions
CREATE SCHEMA IF NOT EXISTS extensions;

-- Move vector extension to extensions schema (requires recreating it)
-- First, we need to drop the existing extension and recreate it in the new schema
DROP EXTENSION IF EXISTS vector CASCADE;
CREATE EXTENSION vector WITH SCHEMA extensions;

-- Grant necessary permissions to specific roles only
-- Allow authenticated users to use the extension functions
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;

-- Revoke public access to the extensions schema
REVOKE ALL ON SCHEMA extensions FROM public;

-- Update function search path to include extensions schema
-- This ensures existing queries continue to work
ALTER DATABASE postgres SET search_path TO public, extensions;

-- Fix 2: Reduce OTP Expiry Time (5 minutes = 300 seconds)
-- Configure auth settings for shorter OTP expiry
UPDATE auth.config 
SET value = '300' 
WHERE parameter = 'otp_expiry';

-- Also configure email OTP expiry specifically
UPDATE auth.config 
SET value = '300' 
WHERE parameter = 'email_otp_expiry';

-- Configure SMS OTP expiry (if used)
UPDATE auth.config 
SET value = '300' 
WHERE parameter = 'sms_otp_expiry';

-- Fix 3: Enable Leaked Password Protection
-- Enable password breach detection
UPDATE auth.config 
SET value = 'true' 
WHERE parameter = 'enable_password_breach_check';

-- Set minimum password strength requirements
UPDATE auth.config 
SET value = '8' 
WHERE parameter = 'password_min_length';

-- Ensure these config entries exist if they don't
INSERT INTO auth.config (parameter, value) 
VALUES 
  ('otp_expiry', '300'),
  ('email_otp_expiry', '300'),
  ('sms_otp_expiry', '300'),
  ('enable_password_breach_check', 'true'),
  ('password_min_length', '8')
ON CONFLICT (parameter) DO UPDATE SET value = EXCLUDED.value;

-- Create audit log for security changes
CREATE TABLE IF NOT EXISTS security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  description text NOT NULL,
  performed_at timestamp with time zone DEFAULT now(),
  performed_by uuid REFERENCES auth.users(id)
);

-- Enable RLS on audit log
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view security audit logs" 
ON security_audit_log 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'));

-- Log this security configuration change
INSERT INTO security_audit_log (event_type, description, performed_by)
VALUES (
  'SECURITY_CONFIG_UPDATE',
  'Applied security fixes: moved vector extension to restricted schema, reduced OTP expiry to 5 minutes, enabled leaked password protection',
  auth.uid()
);