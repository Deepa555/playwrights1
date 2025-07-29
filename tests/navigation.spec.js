const { test, expect } = require('@playwright/test');

test.describe('AZ Blue Navigation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Individuals and Families section', async ({ page }) => {
    // Click on Individuals and Families link
    await page.getByText('Individuals and Families').first().click();
    
    // Wait for navigation and check URL or content
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('individuals-and-families');
  });

  test('should navigate to Medicare section', async ({ page }) => {
    // Click on Medicare link
    await page.getByText('Medicare').first().click();
    
    // Wait for navigation and check URL or content
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('medicare');
  });

  test('should navigate to Medicaid section', async ({ page }) => {
    // Click on Medicaid link or "Check Eligibility"
    const medicaidLink = page.getByText('Check Eligibility').first();
    if (await medicaidLink.isVisible()) {
      await medicaidLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page.url()).toContain('health-choice');
    }
  });

  test('should navigate to Employers section', async ({ page }) => {
    // Click on Employers link
    await page.getByText('Employers').first().click();
    
    // Wait for navigation and check URL or content
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('employers');
  });

  test('should navigate to Find a Doctor page', async ({ page }) => {
    // Click on Find a Doctor link
    await page.getByText('Find a Doctor').first().click();
    
    // Wait for navigation and check URL or content
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('find-a-doctor');
  });

  test('should access member login portal', async ({ page }) => {
    // Click on login/register link
    const loginLink = page.getByText('Get Started').first();
    await loginLink.click();
    
    // Check if we're redirected to login portal
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('identity.azblue.com');
  });

  test('should navigate to About Us page', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Click on About Us link
    await page.getByText('About Us').first().click();
    
    // Wait for navigation and check URL
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('about-us');
  });

  test('should navigate to Contact Us page', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Click on Contact Us link
    await page.getByText('Contact Us').first().click();
    
    // Wait for navigation and check URL
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('contact-us');
  });

  test('should access FAQ page', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Click on FAQ link
    await page.getByText('Frequently Asked Questions').first().click();
    
    // Wait for navigation and check URL
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('frequently-asked-questions');
  });

  test('should navigate to News section', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Click on News link
    await page.getByText('News').first().click();
    
    // Wait for navigation and check URL
    await page.waitForLoadState('networkidle');
    await expect(page.url()).toContain('newsroom');
  });
});
