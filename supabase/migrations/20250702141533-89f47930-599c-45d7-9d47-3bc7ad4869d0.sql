-- Clean up overlapping RLS policies

-- Fix books table - remove duplicate policies
DROP POLICY IF EXISTS "Allow public read access" ON public.books;
DROP POLICY IF EXISTS "Allow public insert access" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can delete books they own" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can insert books" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can update books they own" ON public.books;
DROP POLICY IF EXISTS "Authenticated users can view books" ON public.books;

-- Keep only the user-specific policies for books
-- Users can view their own books - KEEP
-- Users can insert their own books - KEEP  
-- Users can update their own books - KEEP
-- Users can delete their own books - KEEP

-- Fix publication_embeddings table - remove conflicting policies
DROP POLICY IF EXISTS "Allow public read access to publication embeddings" ON public.publication_embeddings;

-- Keep authenticated user policies for publication_embeddings
-- Authenticated users can view publication_embeddings - KEEP
-- Authenticated users can insert publication_embeddings - KEEP
-- Authenticated users can update publication_embeddings - KEEP
-- Authenticated users can delete publication_embeddings - KEEP

-- Fix resources table - remove duplicate SELECT policies
DROP POLICY IF EXISTS "Anyone can view public resources" ON public.resources;

-- Keep the more specific policy: "Public can view public resources"
-- Keep: "Authenticated users can manage resources"

-- Add missing management policies for webinars table
CREATE POLICY "Authenticated users can manage webinars" ON public.webinars
FOR ALL USING (auth.uid() IS NOT NULL);

-- Ensure proper indexing for performance
CREATE INDEX IF NOT EXISTS idx_books_user_id ON public.books(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_user_id ON public.consultation_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_user_id ON public.webinar_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(is_approved);

-- Add update triggers for timestamp columns where missing
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for tables that need automatic updated_at updates
DROP TRIGGER IF EXISTS update_books_updated_at ON public.books;
CREATE TRIGGER update_books_updated_at
    BEFORE UPDATE ON public.books
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON public.appointments;
CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consultation_requests_updated_at ON public.consultation_requests;
CREATE TRIGGER update_consultation_requests_updated_at
    BEFORE UPDATE ON public.consultation_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_webinars_updated_at ON public.webinars;
CREATE TRIGGER update_webinars_updated_at
    BEFORE UPDATE ON public.webinars
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();