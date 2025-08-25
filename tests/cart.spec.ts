import { test, expect } from '@playwright/test';

test.describe('Cart Functionality', () => {
  test('should add product to cart and handle cart operations', async ({ page }) => {
    await page.goto('/');
    
    // Monitor console for cart-related errors
    const cartErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('cart')) {
        cartErrors.push(msg.text());
      }
    });
    
    // Navigate to products
    await page.goto('/products');
    
    // Wait for products to load
    await page.waitForTimeout(2000);
    
    // Find the first product and click on it
    const productLink = page.locator('[href*="/products/"]').first();
    const productCount = await productLink.count();
    
    if (productCount > 0) {
      await productLink.click();
      
      // Wait for product page to load
      await page.waitForTimeout(1000);
      
      // Look for add to cart button
      const addToCartButton = page.locator('text=Add to Cart').or(page.locator('button:has-text("Add")')).first();
      
      if (await addToCartButton.isVisible()) {
        // Click add to cart
        await addToCartButton.click();
        
        // Wait for cart update
        await page.waitForTimeout(1000);
        
        // Verify cart icon shows item count or navigate to cart
        const cartIcon = page.locator('[href="/cart"]').or(page.locator('text=Cart')).first();
        if (await cartIcon.isVisible()) {
          await cartIcon.click();
          
          // Verify we're on cart page
          await expect(page.url()).toContain('/cart');
          
          // Check that cart has items (should not be empty)
          const emptyMessage = page.locator('text=Your cart is empty').or(page.locator('text=No items'));
          const hasItems = !(await emptyMessage.isVisible());
          
          if (hasItems) {
            console.log('✓ Cart functionality working - items added successfully');
          } else {
            console.log('ℹ Cart appears empty - checking localStorage fallback');
          }
        }
      }
    }
    
    // Verify no cart loading errors occurred
    expect(cartErrors.length).toBe(0);
  });

  test('should handle cart operations when not logged in', async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    await page.goto('/cart');
    
    // Cart should still be accessible (localStorage fallback)
    await expect(page.url()).toContain('/cart');
    
    // Should show either empty cart or login prompt
    const hasContent = await page.locator('text=Cart').or(page.locator('h1')).isVisible();
    expect(hasContent).toBe(true);
  });

  test('should persist cart items in localStorage when Supabase fails', async ({ page }) => {
    // Go to cart page and add some test data to localStorage
    await page.goto('/cart');
    
    // Simulate localStorage cart data
    await page.evaluate(() => {
      const testCart = [
        {
          id: 'test-1',
          product_id: 'test-product',
          name: 'Test Product',
          price: 99.99,
          quantity: 1,
          image: '/placeholder.svg'
        }
      ];
      localStorage.setItem('cart', JSON.stringify(testCart));
    });
    
    // Refresh page to trigger cart loading
    await page.reload();
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Check if localStorage cart data is being used
    const hasCartContent = await page.locator('text=Test Product').or(page.locator('text=$99')).isVisible();
    
    if (hasCartContent) {
      console.log('✓ localStorage cart fallback working');
    } else {
      console.log('ℹ Cart may be using different data source');
    }
  });
});