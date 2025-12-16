-- Create a storage bucket for downloads
INSERT INTO storage.buckets (id, name, public) VALUES ('downloads', 'downloads', true);

-- Create policy for public downloads
CREATE POLICY "Public downloads access" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'downloads');

-- Create policy for admin uploads
CREATE POLICY "Admin can upload downloads" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'downloads' AND auth.jwt() ->> 'email' = 'verifiedsafe8@gmail.com');