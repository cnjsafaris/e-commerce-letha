-- Complete Admin Account Creation Script
-- This script creates both the auth user and profile with admin role

-- Step 1: First, you need to create the user account through Supabase Auth
-- This CANNOT be done via SQL - you must use one of these methods:
-- Option A: Supabase Dashboard > Authentication > Users > "Add user"
-- Option B: Sign up normally through your app
-- Option C: Use Supabase CLI or Admin API

-- Step 2: After the auth user is created, run this to set admin role
-- Check if user exists in auth.users (for verification only - you can't query this directly)
-- Instead, check if profile exists first

-- Check if the user profile exists
SELECT 'Checking if user profile exists...' as status;
SELECT id, email, role, created_at FROM public.profiles 
WHERE email = 'jabezmageto78@gmail.com';

-- If profile doesn't exist, create it manually (this is a fallback)
-- Note: Normally profiles are created automatically via trigger
DO $$
BEGIN
    -- Check if profile exists, if not insert it
    IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE email = 'jabezmageto78@gmail.com') THEN
        -- You'll need to get the actual user ID from Supabase Dashboard
        -- Replace 'ACTUAL_USER_ID_FROM_SUPABASE' with the real UUID
        INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
        VALUES (
            'ACTUAL_USER_ID_FROM_SUPABASE',  -- Replace with actual user ID
            'jabezmageto78@gmail.com',
            'Admin User',
            'admin',
            NOW(),
            NOW()
        );
        RAISE NOTICE 'Admin profile created manually';
    ELSE
        -- Update existing profile to admin
        UPDATE public.profiles 
        SET role = 'admin', updated_at = NOW()
        WHERE email = 'jabezmageto78@gmail.com';
        RAISE NOTICE 'Existing profile updated to admin';
    END IF;
END $$;

-- Verify the admin user was set up correctly
SELECT 'Final verification:' as status;
SELECT id, email, role, full_name, created_at FROM public.profiles 
WHERE email = 'jabezmageto78@gmail.com';

-- Check if there are any admin users
SELECT 'All admin users:' as status;
SELECT id, email, role, full_name FROM public.profiles 
WHERE role = 'admin';