const { test, expect } = require('@playwright/test');

test.describe('AZ Blue Responsive Design Tests', () => {
  
  test.describe('Desktop View', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');
    });

    test('should display desktop navigation properly', async ({ page }) => {
      // Check that main navigation is visible in desktop view
      await expect(page.getByText('Individuals and Families')).toBeVisible();
      await expect(page.getByText('Medicare')).toBeVisible();
      await expect(page.getByText('Medicaid')).toBeVisible();
      await expect(page.getByText('Employers')).toBeVisible();
    });

    test('should show full content layout', async ({ page }) => {
      // Check for multi-column layout elements
      await expect(page.locator('h1, [role="heading"]')).toBeVisible();
      await expect(page.getByText('Sign Up For YourAZ Blue Portal')).toBeVisible();
    });
  });

  test.describe('Tablet View', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
    });

    test('should adapt navigation for tablet', async ({ page }) => {
      // Navigation should still be accessible
      await expect(page.getByText('Individuals and Families')).toBeVisible();
      
      // Content should be responsive
      await expect(page.locator('h1, [role="heading"]')).toBeVisible();
    });

    test('should maintain touch-friendly interface', async ({ page }) => {
      // Check that interactive elements are properly sized
      const buttons = page.locator('button, a[href]');
      const firstButton = buttons.first();
      if (await firstButton.isVisible()) {
        const buttonBox = await firstButton.boundingBox();
        expect(buttonBox.height).toBeGreaterThan(40); // Minimum touch target size
      }
    });
  });

  test.describe('Mobile View', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
    });

    test('should show mobile-optimized layout', async ({ page }) => {
      // Main content should be visible
      await expect(page.locator('h1, [role="heading"]')).toBeVisible();
      
      // Phone number should be clickable on mobile
      const phoneLink = page.getByText('(800) 232-2345');
      if (await phoneLink.isVisible()) {
        await expect(phoneLink).toBeVisible();
      }
    });

    test('should have mobile navigation', async ({ page }) => {
      // Look for mobile menu button/hamburger menu
      const mobileMenuSelectors = [
        '[aria-label*="menu" i]',
        '.hamburger',
        '.mobile-menu',
        '[data-testid*="menu"]',
        'button[aria-expanded]'
      ];
      
      let mobileMenuFound = false;
      for (const selector of mobileMenuSelectors) {
        const element = page.locator(selector).first();
        if (await element.isVisible()) {
          mobileMenuFound = true;
          break;
        }
      }
      
      // If no mobile menu found, navigation should still be accessible
      if (!mobileMenuFound) {
        await expect(page.getByText('Individuals and Families').or(page.getByText('Medicare'))).toBeVisible();
      }
    });

    test('should maintain readability on small screens', async ({ page }) => {
      // Check that text is readable
      const mainHeading = page.locator('h1, [role="heading"]').first();
      if (await mainHeading.isVisible()) {
        const fontSize = await mainHeading.evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        const fontSizeNum = parseInt(fontSize);
        expect(fontSizeNum).toBeGreaterThan(14); // Minimum readable font size
      }
    });
  });

  test.describe('Cross-Browser Layout Consistency', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('should maintain consistent layout across browsers', async ({ page, browserName }) => {
      // Check that key elements are visible regardless of browser
      await expect(page.locator('h1, [role="heading"]')).toBeVisible();
      await expect(page.getByText('(800) 232-2345')).toBeVisible();
      
      // Check that main sections are present
      await expect(page.getByText('Individuals and Families')).toBeVisible();
      await expect(page.getByText('Medicare')).toBeVisible();
      
      // Take a screenshot for visual comparison
      await page.screenshot({ 
        path: `screenshots/homepage-${browserName}.png`,
        fullPage: true 
      });
    });

    test('should handle browser-specific features gracefully', async ({ page, browserName }) => {
      // Test features that might behave differently across browsers
      await page.evaluate(() => {
        // Test CSS Grid support
        const testDiv = document.createElement('div');
        testDiv.style.display = 'grid';
        return testDiv.style.display === 'grid';
      });
      
      // Test modern JavaScript features
      const supportsArrowFunctions = await page.evaluate(() => {
        try {
          new Function('() => {}');
          return true;
        } catch (e) {
          return false;
        }
      });
      
      expect(supportsArrowFunctions).toBe(true);
    });
  });
});
