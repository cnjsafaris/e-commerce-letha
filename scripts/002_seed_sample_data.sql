-- Insert sample categories
INSERT INTO public.categories (name, slug, description, image_url) VALUES
('Handbags', 'handbags', 'Premium leather handbags and purses', '/placeholder.svg?height=300&width=400'),
('Wallets', 'wallets', 'Handcrafted leather wallets and cardholders', '/placeholder.svg?height=300&width=400'),
('Belts', 'belts', 'Classic and contemporary leather belts', '/placeholder.svg?height=300&width=400'),
('Accessories', 'accessories', 'Leather accessories and small goods', '/placeholder.svg?height=300&width=400')
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for products
DO $$
DECLARE
    handbags_id UUID;
    wallets_id UUID;
    belts_id UUID;
    accessories_id UUID;
BEGIN
    SELECT id INTO handbags_id FROM public.categories WHERE slug = 'handbags';
    SELECT id INTO wallets_id FROM public.categories WHERE slug = 'wallets';
    SELECT id INTO belts_id FROM public.categories WHERE slug = 'belts';
    SELECT id INTO accessories_id FROM public.categories WHERE slug = 'accessories';

    -- Insert sample products
    INSERT INTO public.products (name, slug, description, price, compare_at_price, sku, inventory_quantity, category_id, images, featured, meta_title, meta_description) VALUES
    ('Classic Leather Tote', 'classic-leather-tote', 'A timeless leather tote bag crafted from premium full-grain leather. Perfect for work or weekend adventures.', 299.00, 399.00, 'CLT-001', 15, handbags_id, ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'], true, 'Classic Leather Tote - Premium Handbag', 'Shop our classic leather tote bag made from premium full-grain leather. Perfect for work and weekend use.'),
    
    ('Executive Briefcase', 'executive-briefcase', 'Professional leather briefcase with laptop compartment and organizational pockets. Handcrafted for the modern executive.', 449.00, 549.00, 'EB-001', 8, handbags_id, ARRAY['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'], true, 'Executive Leather Briefcase - Professional Bag', 'Premium executive briefcase with laptop compartment. Handcrafted leather for the modern professional.'),
    
    ('Vintage Crossbody Bag', 'vintage-crossbody-bag', 'Compact crossbody bag with vintage-inspired design. Features adjustable strap and secure zip closure.', 189.00, 229.00, 'VCB-001', 22, handbags_id, ARRAY['/placeholder.svg?height=600&width=600'], false, 'Vintage Leather Crossbody Bag', 'Stylish vintage crossbody bag with adjustable strap and secure closure.'),
    
    ('Minimalist Wallet', 'minimalist-wallet', 'Sleek minimalist wallet with RFID blocking technology. Holds 8 cards and cash in a slim profile.', 89.00, 119.00, 'MW-001', 35, wallets_id, ARRAY['/placeholder.svg?height=600&width=600'], true, 'Minimalist Leather Wallet - RFID Blocking', 'Slim minimalist wallet with RFID protection. Premium leather construction.'),
    
    ('Bi-fold Wallet', 'bi-fold-wallet', 'Traditional bi-fold wallet with multiple card slots and bill compartment. Made from vegetable-tanned leather.', 129.00, 159.00, 'BW-001', 28, wallets_id, ARRAY['/placeholder.svg?height=600&width=600'], false, 'Bi-fold Leather Wallet - Traditional Style', 'Classic bi-fold wallet made from vegetable-tanned leather with multiple compartments.'),
    
    ('Classic Dress Belt', 'classic-dress-belt', 'Elegant dress belt perfect for formal occasions. Features polished buckle and premium leather construction.', 149.00, 179.00, 'CDB-001', 18, belts_id, ARRAY['/placeholder.svg?height=600&width=600'], false, 'Classic Leather Dress Belt', 'Elegant dress belt with polished buckle. Perfect for formal occasions.'),
    
    ('Casual Brown Belt', 'casual-brown-belt', 'Versatile casual belt in rich brown leather. Perfect for everyday wear with jeans or chinos.', 99.00, 129.00, 'CBB-001', 25, belts_id, ARRAY['/placeholder.svg?height=600&width=600'], false, 'Casual Brown Leather Belt', 'Versatile casual belt in rich brown leather. Perfect for everyday wear.'),
    
    ('Leather Keychain', 'leather-keychain', 'Handcrafted leather keychain with solid brass hardware. A perfect small gift or personal accessory.', 29.00, 39.00, 'LK-001', 50, accessories_id, ARRAY['/placeholder.svg?height=600&width=600'], false, 'Leather Keychain - Handcrafted Accessory', 'Handcrafted leather keychain with solid brass hardware. Perfect gift or personal accessory.')
    ON CONFLICT (slug) DO NOTHING;
END $$;
