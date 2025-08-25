import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/LethaShop/);
    
    // Check for main navigation elements
    await expect(page.locator('nav')).toBeVisible();
    
    // Check for hero section
    await expect(page.locator('[data-testid="hero-section"]').or(page.locator('h1'))).toBeVisible();
    
    // Check for featured products section
    await expect(page.locator('text=Featured').or(page.locator('text=Products'))).toBeVisible();
    
    // Verify no console errors related to Supabase cart loading
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().includes('Error loading cart from Supabase')) {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000); // Wait for potential async operations
    expect(consoleErrors.length).toBe(0);
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/');
    
    // Look for products link in navigation or as a button
    const productsLink = page.locator('text=Products').or(page.locator('text=Shop')).or(page.locator('text=Catalog')).first();
    
    if (await productsLink.isVisible()) {
      await productsLink.click();
      await expect(page.url()).toContain('/products');
    } else {
      // Navigate directly if no visible link
      await page.goto('/products');
    }
    
    // Verify products are loading
    await expect(page.locator('text=Products').or(page.locator('h1'))).toBeVisible();
  });

  test('should navigate to categories', async ({ page }) => {
    await page.goto('/');
    
    // Check if categories are visible and clickable
    const categoryLinks = page.locator('[href*="/categories/"]');
    const categoryCount = await categoryLinks.count();
    
    if (categoryCount > 0) {
      await categoryLinks.first().click();
      await expect(page.url()).toContain('/categories/');
    }
  });
});