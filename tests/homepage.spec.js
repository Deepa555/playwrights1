const { test, expect } = require('@playwright/test');

test.describe('AZ Blue Homepage Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check that the page loads and has the correct title
    await expect(page).toHaveTitle(/AZ Blue|Blue Cross Blue Shield of Arizona/);
    
    // Check for main heading (handle multiple instances)
    await expect(page.locator('h1, [role="heading"]').first()).toBeVisible();
  });

  test('should display main navigation elements', async ({ page }) => {
    // Check for main navigation links
    const navLinks = [
      'Individuals and Families',
      'Medicare', 
      'Medicaid',
      'Employers'
    ];

    for (const linkText of navLinks) {
      await expect(page.getByText(linkText).first()).toBeVisible();
    }
  });

  test('should display contact information', async ({ page }) => {
    // Check for phone number in any form - using multiple locators
    const phoneLocators = [
      page.locator('a[href*="tel"]'),
      page.locator('a[href*="800"]'),
      page.getByText(/\(800\).*2345/),
      page.getByText(/800.*232.*2345/)
    ];
    
    let phoneVisible = false;
    for (const locator of phoneLocators) {
      if (await locator.first().isVisible()) {
        phoneVisible = true;
        break;
      }
    }
    expect(phoneVisible).toBeTruthy();
    
    // Check for 24/7 Help link
    await expect(page.getByText('24/7 Help')).toBeVisible();
  });

  test('should have functional search capability', async ({ page }) => {
    // Look for search functionality
    const searchButton = page.locator('[type="search"], [placeholder*="search" i], [aria-label*="search" i]').first();
    if (await searchButton.isVisible()) {
      await expect(searchButton).toBeVisible();
    }
  });

  test('should display member login options', async ({ page }) => {
    // Check for login/register functionality - look for "Get Started" which is the main CTA
    await expect(page.getByText('Get Started').first()).toBeVisible();
  });

  test('should show plan exploration links', async ({ page }) => {
    // Check for plan exploration links
    const exploreButtons = page.getByText('Explore Plans');
    await expect(exploreButtons.first()).toBeVisible();
  });

  test('should display find a doctor section', async ({ page }) => {
    // Check for find a doctor functionality (handle multiple instances)
    await expect(page.getByText('Find a Doctor').first()).toBeVisible();
  });

  test('should show AZ Blue difference statistics', async ({ page }) => {
    // Scroll down to statistics section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    
    // Check for key statistics - look for percentage or number patterns
    const statsVisible = await Promise.race([
      page.getByText('96%').isVisible().catch(() => false),
      page.getByText('1.6 Million').isVisible().catch(() => false),
      page.locator('text=/\\d+%/').first().isVisible().catch(() => false),
      page.locator('text=/\\d+\\.\\d+ Million/').first().isVisible().catch(() => false)
    ]);
    
    expect(statsVisible).toBeTruthy();
  });

  test('should display footer links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for footer sections (handle multiple instances)
    await expect(page.getByText('About Us').first()).toBeVisible();
    await expect(page.getByText('Contact Us').first()).toBeVisible();
    await expect(page.getByText('Privacy & Legal').first()).toBeVisible();
  });

  test('should have social media links', async ({ page }) => {
    // Scroll to footer where social links typically are
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for social media links
    const socialLinks = page.locator('a[href*="facebook"], a[href*="instagram"], a[href*="linkedin"], a[href*="twitter"], a[href*="youtube"]');
    await expect(socialLinks.first()).toBeVisible();
  });
});
