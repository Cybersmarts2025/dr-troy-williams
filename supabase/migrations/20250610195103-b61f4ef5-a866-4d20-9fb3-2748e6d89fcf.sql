
-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid()
);

-- Create comments table for blog posts
CREATE TABLE public.blog_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resources table for file uploads/downloads
CREATE TABLE public.resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  category TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT true,
  download_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events/speaking calendar table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL, -- 'speaking', 'conference', 'workshop', etc.
  location TEXT,
  is_virtual BOOLEAN NOT NULL DEFAULT false,
  virtual_link TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  is_public BOOLEAN NOT NULL DEFAULT true,
  registration_required BOOLEAN NOT NULL DEFAULT false,
  registration_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for newsletter subscribers (public can insert, admin can manage)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscribers 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can view active subscribers" 
  ON public.newsletter_subscribers 
  FOR SELECT 
  USING (is_active = true);

-- Add RLS policies for blog comments
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved comments" 
  ON public.blog_comments 
  FOR SELECT 
  USING (is_approved = true);

CREATE POLICY "Anyone can create comments" 
  ON public.blog_comments 
  FOR INSERT 
  WITH CHECK (true);

-- Add RLS policies for contact messages (admin only)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can view contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can create contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

-- Add RLS policies for resources
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public resources" 
  ON public.resources 
  FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Authenticated users can manage resources" 
  ON public.resources 
  FOR ALL 
  USING (auth.uid() IS NOT NULL);

-- Add RLS policies for events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public events" 
  ON public.events 
  FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Authenticated users can manage events" 
  ON public.events 
  FOR ALL 
  USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_blog_comments_post_id ON public.blog_comments(blog_post_id);
CREATE INDEX idx_blog_comments_approved ON public.blog_comments(is_approved);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at);
CREATE INDEX idx_resources_category ON public.resources(category);
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_events_public ON public.events(is_public);
