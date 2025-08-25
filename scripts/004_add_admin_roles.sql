-- Add admin role to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin'));

-- Create admin policies for products (admins can manage all products)
CREATE POLICY "admins_manage_products" ON public.products FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Create admin policies for categories (admins can manage all categories)
CREATE POLICY "admins_manage_categories" ON public.categories FOR ALL 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Create admin policies for orders (admins can view all orders)
CREATE POLICY "admins_view_all_orders" ON public.orders FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "admins_update_orders" ON public.orders FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Create admin policies for profiles (admins can view all profiles)
CREATE POLICY "admins_view_all_profiles" ON public.profiles FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Create a default admin user (you can change this email to your own)
-- Note: This user will need to sign up normally first, then we'll update their role
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@example.com';
