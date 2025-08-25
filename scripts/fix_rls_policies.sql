-- Fix RLS policies to resolve infinite recursion

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- Recreate profiles policies with proper conditions
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT 
  USING (id = auth.uid());

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT 
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE 
  USING (id = auth.uid()) 
  WITH CHECK (id = auth.uid());

-- Allow service role to bypass RLS for admin operations
CREATE POLICY "profiles_service_role_all" ON public.profiles 
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Fix products policies to allow public read without recursion
DROP POLICY IF EXISTS "products_select_active" ON public.products;
CREATE POLICY "products_select_active" ON public.products 
  FOR SELECT 
  USING (active = true);

-- Allow service role full access to products
CREATE POLICY "products_service_role_all" ON public.products 
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow admin users to manage products
CREATE POLICY "products_admin_all" ON public.products 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.email IN (
        SELECT email FROM public.admin_users WHERE is_admin = true
      )
    )
  );

-- Ensure categories are publicly readable
DROP POLICY IF EXISTS "categories_select_all" ON public.categories;
CREATE POLICY "categories_select_all" ON public.categories 
  FOR SELECT 
  USING (true);

-- Allow service role full access to categories
CREATE POLICY "categories_service_role_all" ON public.categories 
  FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow admin users to manage categories
CREATE POLICY "categories_admin_all" ON public.categories 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.email IN (
        SELECT email FROM public.admin_users WHERE is_admin = true
      )
    )
  );