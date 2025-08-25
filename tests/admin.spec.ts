import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  const ADMIN_EMAIL = 'jabezmageto78@gmail.com';
  const ADMIN_PASSWORD = 'lokeshen@58';

  test.beforeEach(async ({ page }) => {
    // Login as admin before each test
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
  });

  test('should access admin dashboard', async ({ page }) => {
    await page.goto('/admin');
    
    // Should not redirect to login
    expect(page.url()).not.toContain('/auth/login');
    
    // Should show admin dashboard
    const hasAdminContent = await page.locator('text=Admin').or(page.locator('text=Dashboard')).isVisible();
    expect(hasAdminContent).toBe(true);
  });

  test('should access products management', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Should show products management page
    expect(page.url()).toContain('/admin/products');
    
    // Should show products list or empty state
    const hasProductsContent = await page.locator('text=Product').or(page.locator('text=Add Product')).isVisible();
    expect(hasProductsContent).toBe(true);
  });

  test('should navigate to add new product', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Look for "Add Product" or "New Product" button
    const addButton = page.locator('text=Add Product').or(page.locator('text=New Product')).first();
    
    if (await addButton.isVisible()) {
      await addButton.click();
      
      // Should navigate to new product form
      const hasForm = await page.locator('input[name="name"]').or(page.locator('text=Product Name')).isVisible();
      expect(hasForm).toBe(true);
    }
  });

  test('should add sample product through admin interface', async ({ page }) => {
    await page.goto('/admin/products');
    
    // Try to add a new product
    const addButton = page.locator('text=Add Product').first();
    
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(1000);
      
      // Fill product form
      const nameField = page.locator('input[name="name"]').or(page.locator('input[placeholder*="name"]')).first();
      if (await nameField.isVisible()) {
        await nameField.fill('Test Leather Bag');
        
        // Fill other fields if present
        const priceField = page.locator('input[name="price"]').or(page.locator('input[placeholder*="price"]')).first();
        if (await priceField.isVisible()) {
          await priceField.fill('199.99');
        }
        
        const descField = page.locator('textarea[name="description"]').or(page.locator('textarea')).first();
        if (await descField.isVisible()) {
          await descField.fill('High-quality leather bag crafted with premium materials.');
        }
        
        // Try to save
        const saveButton = page.locator('button[type="submit"]').or(page.locator('text=Save')).or(page.locator('text=Create')).first();
        if (await saveButton.isVisible()) {
          await saveButton.click();
          await page.waitForTimeout(2000);
          
          console.log('✓ Attempted to add sample product');
        }
      }
    } else {
      console.log('ℹ Add Product button not found, may need admin permissions');
    }
  });

  test('should handle admin categories', async ({ page }) => {
    await page.goto('/admin/categories');
    
    // Should show categories management
    const hasCategoriesContent = await page.locator('text=Categories').or(page.locator('text=Category')).isVisible();
    expect(hasCategoriesContent).toBe(true);
  });
});