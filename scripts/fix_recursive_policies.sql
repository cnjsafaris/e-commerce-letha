-- Fix recursive RLS policies

-- First, disable RLS temporarily to fix policies
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start clean
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "admin_all_access_profiles" ON public.profiles;

DROP POLICY IF EXISTS "products_select_active" ON public.products;
DROP POLICY IF EXISTS "admin_all_access_products" ON public.products;

DROP POLICY IF EXISTS "categories_select_all" ON public.categories;
DROP POLICY IF EXISTS "admin_all_access_categories" ON public.categories;

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create non-recursive policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create simple public read policy for products
CREATE POLICY "products_public_read" ON public.products 
  FOR SELECT 
  USING (active = true);

-- Create simple public read policy for categories
CREATE POLICY "categories_public_read" ON public.categories 
  FOR SELECT 
  USING (true);

-- Admin policies using role column directly (avoid recursive lookup)
CREATE POLICY "profiles_admin_manage" ON public.profiles 
  FOR ALL 
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "products_admin_manage" ON public.products 
  FOR ALL 
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );

CREATE POLICY "categories_admin_manage" ON public.categories 
  FOR ALL 
  USING (
    auth.uid() IN (
      SELECT id FROM public.profiles WHERE role = 'admin'
    )
  );