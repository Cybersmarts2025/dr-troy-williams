-- Remove fake testimonial from database
DELETE FROM public.testimonials 
WHERE id = 'ed9ade96-dec1-4136-91b1-405840c8345d' 
AND name = 'James Harrison' 
AND organization = 'Senate Commerce Committee';