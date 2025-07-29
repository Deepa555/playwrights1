const { test, expect } = require('@playwright/test');

test.describe('AZ Blue Performance Tests', () => {
  
  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    // LCP should be under 2.5 seconds (2500ms)
    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500);
      console.log(`LCP: ${lcp}ms`);
    }
  });

  test('should load images efficiently', async ({ page }) => {
    await page.goto('/');
    
    // Check for broken images
    const images = await page.locator('img').all();
    
    for (const image of images) {
      if (await image.isVisible()) {
        const src = await image.getAttribute('src');
        if (src && !src.startsWith('data:')) {
          // Check if image loads successfully
          const naturalWidth = await image.evaluate(img => img.naturalWidth);
          expect(naturalWidth).toBeGreaterThan(0);
        }
      }
    }
  });

  test('should have minimal console errors', async ({ page }) => {
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have fewer than 5 console errors
    expect(consoleErrors.length).toBeLessThan(5);
    
    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }
  });

  test('should handle network failures gracefully', async ({ page }) => {
    // Block some resources to simulate network issues
    await page.route('**/*.{png,jpg,jpeg,gif,svg}', route => {
      if (Math.random() > 0.8) { // Block 20% of images
        route.abort();
      } else {
        route.continue();
      }
    });
    
    await page.goto('/');
    
    // Page should still be functional even with some failed resources
    await expect(page.locator('h1, [role="heading"]')).toBeVisible();
    await expect(page.getByText('(800) 232-2345')).toBeVisible();
  });

  test('should be accessible with screen readers', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading structure
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThan(0);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const image = images.nth(i);
        if (await image.isVisible()) {
          const alt = await image.getAttribute('alt');
          const ariaLabel = await image.getAttribute('aria-label');
          
          // Images should have alt text or aria-label (or be decorative)
          if (!alt && !ariaLabel) {
            const role = await image.getAttribute('role');
            expect(role).toBe('presentation'); // Decorative images should have role="presentation"
          }
        }
      }
    }
    
    // Check for proper form labels
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="search"], textarea');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      if (await input.isVisible()) {
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');
        const ariaLabelledBy = await input.getAttribute('aria-labelledby');
        
        if (id) {
          // Check for associated label
          const label = page.locator(`label[for="${id}"]`);
          const hasLabel = await label.count() > 0;
          
          // Input should have label, aria-label, or aria-labelledby
          expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
        }
      }
    }
  });

  test('should handle JavaScript disabled gracefully', async ({ page, context }) => {
    // Disable JavaScript
    await context.setJavaScriptEnabled(false);
    
    await page.goto('/');
    
    // Basic content should still be visible without JavaScript
    await expect(page.getByText('(800) 232-2345')).toBeVisible();
    await expect(page.getByText('Individuals and Families')).toBeVisible();
  });
});
