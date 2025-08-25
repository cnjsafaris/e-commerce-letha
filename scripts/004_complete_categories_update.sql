-- Complete categories update with luxury and everyday leather products
-- Clear existing categories if needed (uncomment next line if you want to start fresh)
-- DELETE FROM public.categories;

-- Insert all High-End Luxury Leather Products Categories
INSERT INTO public.categories (name, slug, description, image_url) VALUES

-- 🏆 HIGH-END LUXURY LEATHER PRODUCTS (Fashion & Lifestyle)
('Designer Handbags & Clutches', 'designer-handbags-clutches', 'Premium designer handbags, clutches, and purses crafted with luxury materials targeting premium markets', '/placeholder.svg?height=400&width=600'),
('Luxury Wallets & Cardholders', 'luxury-wallets-cardholders', 'High-end wallets and cardholders with premium leather and exclusive designs for discerning customers', '/placeholder.svg?height=400&width=600'),
('Premium Belts & Custom Buckles', 'premium-belts-custom-buckles', 'Luxury belts with custom buckles and premium leather craftsmanship for fashion-forward clients', '/placeholder.svg?height=400&width=600'),
('Designer Leather Shoes', 'designer-leather-shoes', 'Premium leather loafers, heels, boots, and sandals crafted for luxury fashion markets', '/placeholder.svg?height=400&width=600'),
('Luxury Leather Apparel', 'luxury-leather-apparel', 'Designer jackets, trench coats, skirts, and pants in premium leather for high-end fashion', '/placeholder.svg?height=400&width=600'),
('Exclusive Leather Accessories', 'exclusive-leather-accessories', 'Luxury gloves, hats, watch straps and exclusive leather accessories for premium lifestyle', '/placeholder.svg?height=400&width=600'),

-- HIGH-END LUXURY (Luxury Travel & Office)
('Luxury Business Collection', 'luxury-business-collection', 'Premium briefcases, laptop bags, and document holders for executives and high-end professionals', '/placeholder.svg?height=400&width=600'),
('High-End Travel Luggage', 'high-end-travel-luggage', 'Luxury travel luggage and duffel bags with premium craftsmanship for discerning travelers', '/placeholder.svg?height=400&width=600'),
('Premium Leather Backpacks', 'premium-leather-backpacks', 'Luxury backpacks with premium detailing and exceptional quality for sophisticated customers', '/placeholder.svg?height=400&width=600'),
('Handcrafted Journals & Diaries', 'handcrafted-journals-diaries', 'Luxury journals and diaries with handcrafted leather covers for premium stationery market', '/placeholder.svg?height=400&width=600'),
('Luxury Gift Sets & Games', 'luxury-gift-sets-games', 'Premium leather chess boards, games, and exclusive gift sets for luxury gift market', '/placeholder.svg?height=400&width=600'),

-- HIGH-END LUXURY (Home & Décor)
('Designer Leather Furniture', 'designer-leather-furniture', 'Premium sofas, lounge chairs and luxury leather furniture for high-end interior design', '/placeholder.svg?height=400&width=600'),
('Handmade Leather Art & Rugs', 'handmade-leather-art-rugs', 'Artisan-crafted leather rugs, wall art and decorative pieces for luxury home décor', '/placeholder.svg?height=400&width=600'),
('Luxury Home Accessories', 'luxury-home-accessories', 'Premium cushions, bed headboards and luxury home leather goods for upscale living', '/placeholder.svg?height=400&width=600'),
('Leather Wine & Bar Collection', 'leather-wine-bar-collection', 'Luxury wine bottle holders, coasters and bar accessories for premium entertaining', '/placeholder.svg?height=400&width=600'),
('Premium Storage & Jewelry Boxes', 'premium-storage-jewelry-boxes', 'Luxury jewelry boxes, watch storage cases and premium organizers for high-end storage solutions', '/placeholder.svg?height=400&width=600'),

-- HIGH-END LUXURY (Exclusive & Collectibles)
('Limited Edition Collection', 'limited-edition-collection', 'Exclusive sneaker collaborations and limited edition leather items for collectors and luxury markets', '/placeholder.svg?height=400&width=600'),
('Equestrian Premium Collection', 'equestrian-premium-collection', 'Custom saddles and premium equestrian sports leather goods for luxury horse enthusiasts', '/placeholder.svg?height=400&width=600'),
('Collectors Hunting & Sports Gear', 'collectors-hunting-sports-gear', 'Premium holsters, hunting gear for collectors and sports enthusiasts seeking luxury items', '/placeholder.svg?height=400&width=600'),
('Bespoke Leather Fashion', 'bespoke-leather-fashion', 'Custom tailored jackets, pants and bespoke leather fashion for exclusive luxury clients', '/placeholder.svg?height=400&width=600'),

-- 👕 EVERYDAY LEATHER PRODUCTS (Fashion & Accessories)
('Everyday Wallets & Cards', 'everyday-wallets-cards', 'Standard wallets and cardholders for daily use with quality craftsmanship and practical design', '/placeholder.svg?height=400&width=600'),
('Classic Belts Collection', 'classic-belts-collection', 'Casual and formal belts for everyday wear and professional use with reliable quality', '/placeholder.svg?height=400&width=600'),
('Comfortable Leather Shoes', 'comfortable-leather-shoes', 'Regular shoes and sandals designed for comfort and daily wear with practical styling', '/placeholder.svg?height=400&width=600'),
('Practical Handbags & Backpacks', 'practical-handbags-backpacks', 'Simple handbags and backpacks for everyday functionality and practical daily use', '/placeholder.svg?height=400&width=600'),
('Essential Leather Accessories', 'essential-leather-accessories', 'Key holders, keychains, phone cases and everyday essentials for practical daily needs', '/placeholder.svg?height=400&width=600'),
('Tech Leather Cases & Covers', 'tech-leather-cases-covers', 'Sunglass cases, AirPod covers and tech accessories for modern everyday technology protection', '/placeholder.svg?height=400&width=600'),

-- EVERYDAY (Work & Utility)
('Professional Work Gear', 'professional-work-gear', 'Work gloves, welding aprons and professional leather gear for trades and industrial use', '/placeholder.svg?height=400&width=600'),
('Tool Storage & Utility Belts', 'tool-storage-utility-belts', 'Tool belts, pouches and utility storage solutions for practical work applications', '/placeholder.svg?height=400&width=600'),
('Office Essentials & Desk Accessories', 'office-essentials-desk-accessories', 'Desk mats, organizers and office leather accessories for professional work environments', '/placeholder.svg?height=400&width=600'),
('Stationery & Writing Accessories', 'stationery-writing-accessories', 'Notebook covers, pen holders and stationery accessories for everyday writing needs', '/placeholder.svg?height=400&width=600'),

-- EVERYDAY (Home & Lifestyle)
('Home Organization & Storage', 'home-organization-storage', 'Coasters, placemats, trays and home organizational items for practical daily living', '/placeholder.svg?height=400&width=600'),
('Furniture Accents & Covers', 'furniture-accents-covers', 'Cushion covers, small furniture accents and home décor for everyday comfort and style', '/placeholder.svg?height=400&width=600'),
('Daily Use Organizers', 'daily-use-organizers', 'Remote control holders, organizers and storage solutions for daily convenience and organization', '/placeholder.svg?height=400&width=600'),

-- EVERYDAY (Transport & Outdoor)
('Automotive Leather Accessories', 'automotive-leather-accessories', 'Car seat covers, steering wheel covers for vehicle enhancement and comfort', '/placeholder.svg?height=400&width=600'),
('Motorcycle & Rider Accessories', 'motorcycle-rider-accessories', 'Motorcycle seats, saddle bags and rider accessories for practical transportation needs', '/placeholder.svg?height=400&width=600'),
('Bicycle & Cycling Accessories', 'bicycle-cycling-accessories', 'Bicycle handle grips and cycling leather accessories for bike enthusiasts', '/placeholder.svg?height=400&width=600'),
('Outdoor Activity & Sporting Gear', 'outdoor-activity-sporting-gear', 'Everyday hunting pouches, fishing gear and outdoor leather accessories for recreational activities', '/placeholder.svg?height=400&width=600')

ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- Add sample products for testing
INSERT INTO public.products (name, slug, description, price, compare_at_price, sku, inventory_quantity, category_id, images, featured, meta_title, meta_description) 
SELECT 
    'Premium Executive Briefcase',
    'premium-executive-briefcase',
    'Luxury leather briefcase with laptop compartment and premium craftsmanship for executives',
    899.00,
    1199.00,
    'LBC-001',
    15,
    c.id,
    ARRAY['/placeholder.svg?height=600&width=600'],
    true,
    'Premium Executive Briefcase - LethaShop',
    'Luxury leather briefcase for executives with premium materials and superior craftsmanship'
FROM public.categories c 
WHERE c.slug = 'luxury-business-collection'
LIMIT 1;

INSERT INTO public.products (name, slug, description, price, compare_at_price, sku, inventory_quantity, category_id, images, featured, meta_title, meta_description) 
SELECT 
    'Designer Handbag Collection',
    'designer-handbag-luxury',
    'Premium designer handbag crafted with finest Italian leather and gold-plated hardware',
    650.00,
    850.00,
    'DHC-001',
    8,
    c.id,
    ARRAY['/placeholder.svg?height=600&width=600'],
    true,
    'Designer Luxury Handbag - LethaShop',
    'Premium designer handbag with Italian leather for discerning fashion enthusiasts'
FROM public.categories c 
WHERE c.slug = 'designer-handbags-clutches'
LIMIT 1;

INSERT INTO public.products (name, slug, description, price, compare_at_price, sku, inventory_quantity, category_id, images, featured, meta_title, meta_description) 
SELECT 
    'Everyday Classic Wallet',
    'everyday-classic-wallet',
    'Practical leather wallet with multiple card slots and bill compartment for daily use',
    89.00,
    120.00,
    'ECW-001',
    25,
    c.id,
    ARRAY['/placeholder.svg?height=600&width=600'],
    false,
    'Classic Leather Wallet - LethaShop',
    'Practical everyday leather wallet with quality craftsmanship for daily use'
FROM public.categories c 
WHERE c.slug = 'everyday-wallets-cards'
LIMIT 1;