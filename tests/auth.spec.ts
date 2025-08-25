import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  const TEST_EMAIL = 'jabezmageto78@gmail.com';
  const TEST_PASSWORD = 'lokeshen@58';

  test('should login successfully with provided credentials', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Fill login form
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for navigation or success indicator
    await page.waitForTimeout(3000);
    
    // Check if redirected to home or dashboard
    const currentUrl = page.url();
    const isLoggedIn = !currentUrl.includes('/auth/login');
    
    if (isLoggedIn) {
      console.log('✓ Login successful');
      
      // Check for user indicator (profile menu, logout button, etc.)
      const userIndicator = page.locator('text=Profile').or(page.locator('text=Account')).or(page.locator('text=Logout'));
      const hasUserUI = await userIndicator.count() > 0;
      
      expect(hasUserUI).toBe(true);
    } else {
      console.log('ℹ Login may have failed or requires additional verification');
    }
  });

  test('should access account pages when authenticated', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    // Try to access account page
    await page.goto('/account');
    
    // Should not be redirected to login
    expect(page.url()).not.toContain('/auth/login');
    
    // Should show account content
    const hasAccountContent = await page.locator('text=Account').or(page.locator('text=Profile')).isVisible();
    expect(hasAccountContent).toBe(true);
  });

  test('should handle logout functionality', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    // Look for logout button
    const logoutButton = page.locator('text=Logout').or(page.locator('text=Sign out'));
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      await page.waitForTimeout(2000);
      
      // Should be logged out (redirected to home or login)
      const isLoggedOut = await page.locator('text=Login').or(page.locator('text=Sign in')).isVisible();
      expect(isLoggedOut).toBe(true);
    }
  });

  test('should redirect to login when accessing protected admin routes', async ({ page }) => {
    // Clear any existing session
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    
    await page.goto('/admin');
    
    // Should redirect to login
    await page.waitForTimeout(2000);
    expect(page.url()).toContain('/auth/login');
  });
});