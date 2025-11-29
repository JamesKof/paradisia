-- Create a sanitized view for public review display
-- This excludes user_id and booking_id to prevent customer identification

CREATE OR REPLACE VIEW public.public_reviews AS
SELECT 
  id,
  rating,
  comment,
  created_at
FROM public.reviews;

-- Grant access to the view for anonymous and authenticated users
GRANT SELECT ON public.public_reviews TO anon;
GRANT SELECT ON public.public_reviews TO authenticated;

-- Update the reviews table SELECT policy to be owner-only for the raw table
-- First drop the existing permissive policy
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;

-- Create a new policy that only allows users to view their own reviews
CREATE POLICY "Users can view their own reviews" 
ON public.reviews 
FOR SELECT 
USING (auth.uid() = user_id);