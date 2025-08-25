-- Clear existing categories (optional - remove if you want to keep existing data)
-- DELETE FROM public.categories;

-- Insert High-End Luxury Leather Products Categories
INSERT INTO public.categories (name, slug, description, image_url) VALUES

-- Fashion & Lifestyle (High-End)
('Designer Handbags & Clutches', 'designer-handbags-clutches', 'Premium designer handbags, clutches, and purses crafted with luxury materials', '/placeholder.svg?height=400&width=600'),
('Luxury Wallets & Cardholders', 'luxury-wallets-cardholders', 'High-end wallets and cardholders with premium leather and exclusive designs', '/placeholder.svg?height=400&width=600'),
('Premium Belts & Custom Buckles', 'premium-belts-custom-buckles', 'Luxury belts with custom buckles and premium leather craftsmanship', '/placeholder.svg?height=400&width=600'),
('Designer Leather Shoes', 'designer-leather-shoes', 'Premium leather loafers, heels, boots, and sandals for the discerning customer', '/placeholder.svg?height=400&width=600'),
('Luxury Leather Apparel', 'luxury-leather-apparel', 'Designer jackets, trench coats, skirts, and pants in premium leather', '/placeholder.svg?height=400&width=600'),
('Exclusive Leather Accessories', 'exclusive-leather-accessories', 'Luxury gloves, hats, watch straps and exclusive leather accessories', '/placeholder.svg?height=400&width=600'),

-- Luxury Travel & Office
('Luxury Business Collection', 'luxury-business-collection', 'Premium briefcases, laptop bags, and document holders for executives', '/placeholder.svg?height=400&width=600'),
('High-End Travel Luggage', 'high-end-travel-luggage', 'Luxury travel luggage, duffel bags with premium craftsmanship', '/placeholder.svg?height=400&width=600'),
('Premium Leather Backpacks', 'premium-leather-backpacks', 'Luxury backpacks with premium detailing and exceptional quality', '/placeholder.svg?height=400&width=600'),
('Handcrafted Journals & Diaries', 'handcrafted-journals-diaries', 'Luxury journals and diaries with handcrafted leather covers', '/placeholder.svg?height=400&width=600'),
('Luxury Gift Sets', 'luxury-gift-sets', 'Leather chess boards, games, and exclusive gift sets', '/placeholder.svg?height=400&width=600'),

-- Home & Décor
('Designer Leather Furniture', 'designer-leather-furniture', 'Premium sofas, lounge chairs and luxury leather furniture', '/placeholder.svg?height=400&width=600'),
('Handmade Leather Art', 'handmade-leather-art', 'Artisan-crafted leather rugs, wall art and decorative pieces', '/placeholder.svg?height=400&width=600'),
('Luxury Home Accessories', 'luxury-home-accessories', 'Premium cushions, bed headboards and luxury home leather goods', '/placeholder.svg?height=400&width=600'),
('Leather Wine & Bar Collection', 'leather-wine-bar-collection', 'Luxury wine bottle holders, coasters and bar accessories', '/placeholder.svg?height=400&width=600'),
('Premium Storage Solutions', 'premium-storage-solutions', 'Luxury jewelry boxes, watch storage cases and premium organizers', '/placeholder.svg?height=400&width=600'),

-- Exclusive & Collectibles
('Limited Edition Collection', 'limited-edition-collection', 'Exclusive sneaker collaborations and limited edition leather items', '/placeholder.svg?height=400&width=600'),
('Equestrian Premium Collection', 'equestrian-premium-collection', 'Custom saddles and premium equestrian sports leather goods', '/placeholder.svg?height=400&width=600'),
('Collectors Hunting Gear', 'collectors-hunting-gear', 'Premium holsters, hunting gear for collectors and enthusiasts', '/placeholder.svg?height=400&width=600'),
('Bespoke Leather Fashion', 'bespoke-leather-fashion', 'Custom tailored jackets, pants and bespoke leather fashion', '/placeholder.svg?height=400&width=600'),

-- Everyday Leather Products Categories

-- Fashion & Accessories (Everyday)
('Everyday Wallets & Cards', 'everyday-wallets-cards', 'Standard wallets, cardholders for daily use with quality craftsmanship', '/placeholder.svg?height=400&width=600'),
('Classic Belts Collection', 'classic-belts-collection', 'Casual and formal belts for everyday wear and professional use', '/placeholder.svg?height=400&width=600'),
('Comfortable Leather Shoes', 'comfortable-leather-shoes', 'Regular shoes, sandals for comfort and daily wear', '/placeholder.svg?height=400&width=600'),
('Practical Handbags & Backpacks', 'practical-handbags-backpacks', 'Simple handbags, backpacks for everyday functionality', '/placeholder.svg?height=400&width=600'),
('Essential Leather Accessories', 'essential-leather-accessories', 'Key holders, keychains, phone cases and everyday essentials', '/placeholder.svg?height=400&width=600'),
('Tech Leather Cases', 'tech-leather-cases', 'Sunglass cases, AirPod covers and tech accessories', '/placeholder.svg?height=400&width=600'),

-- Work & Utility
('Professional Work Gear', 'professional-work-gear', 'Work gloves, welding aprons and professional leather gear', '/placeholder.svg?height=400&width=600'),
('Tool Storage Solutions', 'tool-storage-solutions', 'Tool belts, pouches and utility storage solutions', '/placeholder.svg?height=400&width=600'),
('Office Essentials', 'office-essentials', 'Desk mats, organizers and office leather accessories', '/placeholder.svg?height=400&width=600'),
('Stationery Leather Goods', 'stationery-leather-goods', 'Notebook covers, pen holders and stationery accessories', '/placeholder.svg?height=400&width=600'),

-- Home & Lifestyle (Everyday)
('Home Organization', 'home-organization', 'Coasters, placemats, trays and home organizational items', '/placeholder.svg?height=400&width=600'),
('Furniture Accents', 'furniture-accents', 'Cushion covers, small furniture accents and home décor', '/placeholder.svg?height=400&width=600'),
('Daily Use Organizers', 'daily-use-organizers', 'Remote control holders, organizers for daily convenience', '/placeholder.svg?height=400&width=600'),

-- Transport & Outdoor
('Automotive Leather', 'automotive-leather', 'Car seat covers, steering wheel covers for vehicle enhancement', '/placeholder.svg?height=400&width=600'),
('Motorcycle Accessories', 'motorcycle-accessories', 'Motorcycle seats, saddle bags and rider accessories', '/placeholder.svg?height=400&width=600'),
('Bicycle Leather Goods', 'bicycle-leather-goods', 'Bicycle handle grips and cycling leather accessories', '/placeholder.svg?height=400&width=600'),
('Outdoor Activity Gear', 'outdoor-activity-gear', 'Hunting pouches, fishing gear and outdoor leather accessories', '/placeholder.svg?height=400&width=600')

ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  updated_at = NOW();