-- Drop the existing restrictive policy for viewing books
DROP POLICY IF EXISTS "Users can view their own books" ON public.books;

-- Create a new policy that allows anyone to view books
CREATE POLICY "Anyone can view books" 
ON public.books 
FOR SELECT 
USING (true);