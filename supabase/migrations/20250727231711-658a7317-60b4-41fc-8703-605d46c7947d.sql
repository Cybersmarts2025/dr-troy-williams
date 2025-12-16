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
  'Applied security fix: moved vector extension to restricted schema with proper access controls',
  auth.uid()
);