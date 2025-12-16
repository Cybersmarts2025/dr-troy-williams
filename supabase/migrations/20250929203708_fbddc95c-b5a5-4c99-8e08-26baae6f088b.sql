-- Create mentorship system tables

-- Student enrollments table
CREATE TABLE public.mentorship_enrollments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  program_name text NOT NULL DEFAULT 'Cybersmarts.ai Mentorship: Intro Pack',
  enrolled_at timestamp with time zone NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'active',
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Module submissions table
CREATE TABLE public.module_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id uuid NOT NULL REFERENCES public.mentorship_enrollments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  module_number integer NOT NULL,
  module_name text NOT NULL,
  submission_content text,
  file_urls text[],
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'submitted',
  grade_status text NOT NULL DEFAULT 'pending',
  score integer,
  max_score integer NOT NULL DEFAULT 10,
  instructor_feedback text,
  reviewed_at timestamp with time zone,
  reviewed_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Student progress tracking
CREATE TABLE public.student_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id uuid NOT NULL REFERENCES public.mentorship_enrollments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  module_number integer NOT NULL,
  status text NOT NULL DEFAULT 'not_started',
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  time_spent_minutes integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(enrollment_id, module_number)
);

-- Create storage bucket for mentorship submissions
INSERT INTO storage.buckets (id, name, public) VALUES ('mentorship-submissions', 'mentorship-submissions', false);

-- Enable RLS on all tables
ALTER TABLE public.mentorship_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentorship_enrollments
CREATE POLICY "Users can view their own enrollments" 
ON public.mentorship_enrollments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments" 
ON public.mentorship_enrollments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments" 
ON public.mentorship_enrollments 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all enrollments" 
ON public.mentorship_enrollments 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for module_submissions
CREATE POLICY "Users can view their own submissions" 
ON public.module_submissions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own submissions" 
ON public.module_submissions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions" 
ON public.module_submissions 
FOR UPDATE 
USING (auth.uid() = user_id AND status = 'draft');

CREATE POLICY "Admins can view all submissions" 
ON public.module_submissions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all submissions" 
ON public.module_submissions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for student_progress
CREATE POLICY "Users can view their own progress" 
ON public.student_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.student_progress 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress" 
ON public.student_progress 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all progress" 
ON public.student_progress 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage policies for mentorship submissions
CREATE POLICY "Users can upload their own submission files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'mentorship-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own submission files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'mentorship-submissions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all submission files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'mentorship-submissions' AND has_role(auth.uid(), 'admin'::app_role));

-- Create function to update timestamps
CREATE TRIGGER update_mentorship_enrollments_updated_at
BEFORE UPDATE ON public.mentorship_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_module_submissions_updated_at
BEFORE UPDATE ON public.module_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at
BEFORE UPDATE ON public.student_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();