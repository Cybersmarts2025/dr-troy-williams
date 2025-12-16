-- Remove questionable testimonials, keeping only Dr. Matt Wyandt's verified testimonial
DELETE FROM public.testimonials 
WHERE id IN (
  'f96a74ac-3c31-4677-8e00-5c41282104fa', -- Robert Keller
  '90543a3b-c923-4b9f-b58c-fc2aa04d4060', -- Michelle Dawson
  '45043613-3b56-4098-a54f-a3249701e814', -- Sarah Chen
  'c2e6935f-0d26-4c89-a2e0-523dc844a1e8', -- David Kim
  '54328a9b-0e56-4501-9b09-83c1b820099b', -- Amanda Foster
  '2dd92050-cc1b-4c1d-a0da-e10f8be259b7', -- Colonel Michael Brooks
  'bba65dc3-5ec2-4acd-9685-0901215f8ead'  -- Lisa Rodriguez
);

-- Add verified testimonial from University of the Cumberlands
INSERT INTO public.testimonials (
  name, 
  title, 
  organization, 
  testimonial, 
  rating, 
  category, 
  email,
  is_approved
) VALUES (
  'Dr. Oludotun (Dot) Oni',
  'Professor and Ph.D. IT Program Director, Ph.D., CISSP, CISM',
  'University of the Cumberlands',
  'I am writing in support of Troy William''s application for a role in your organization. I am familiar with Troy''s academic journey as a doctoral candidate at the University of the Cumberlands, KY. Troy''s academic record indicates that he has the commitment, motivation, and persistence required to succeed at your organization. Academically, he is well-prepared to excel in the role due to the breadth and depth of the classes he undertook during his graduate degree programs. Troy is constantly challenging himself by delving into newer technologies, especially in the field of cybersecurity and project management. His familiarity with industry trends is demonstrated by the various projects he has completed. It is, therefore, my pleasure to recommend Troy Williams for a position at your organization. I have no doubt that he will be an asset to your company if given an opportunity.',
  5,
  'academic',
  'oludotun.oni@ucumberlands.edu',
  true
);

-- Add verified testimonial from SBI Seminars
INSERT INTO public.testimonials (
  name, 
  title, 
  organization, 
  testimonial, 
  rating, 
  category, 
  email,
  is_approved
) VALUES (
  'John E. Gormley, Jr.',
  'Director, CLE Provider',
  'SBI Seminars',
  'It is with great respect and appreciation that we acknowledge Dr. Troy Williams, PhD, for his longstanding professional affiliation with SBI Seminars, spanning more than 30 years. Dr. Williams has completed extensive training with our organization in fraud investigation, legal education, and private investigation practices. He now serves as a key contributor and expert trainer, equipping attorneys with practical, cutting-edge knowledge on the integration of Artificial Intelligence into modern legal practice. Dr. Williams is a trusted authority in the intersection of technology and law, and we are proud to work with him as he continues to bring clarity and innovation to this evolving space.',
  5,
  'training',
  'duijohn@aol.com',
  true
);