-- Create admin user script
-- This script will set a specific user as admin after they have signed up normally

-- Update user role to admin (replace 'admin@example.com' with your actual email)
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'jabezmageto78@gmail.com';

-- Alternative: You can also set admin by user ID if you know it
-- UPDATE public.profiles 
-- SET role = 'admin' 
-- WHERE id = 'your-user-id-here';

-- Verify admin user was created
SELECT id, email, role FROM public.profiles WHERE role = 'admin';