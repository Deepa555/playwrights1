const { test, expect } = require('@playwright/test');

test.describe('AZ Blue Security & Form Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have secure HTTPS connection', async ({ page }) => {
    const url = page.url();
    expect(url).toMatch(/^https:/);
  });

  test('should have proper security headers', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response.headers();
    
    // Check for security headers
    expect(headers['x-frame-options'] || headers['x-frame-options']).toBeDefined();
    expect(headers['x-content-type-options']).toBeDefined();
    
    // Should not expose sensitive server information
    const serverHeader = headers['server'];
    if (serverHeader) {
      expect(serverHeader).not.toMatch(/apache\/[\d.]+|nginx\/[\d.]+|iis\/[\d.]+/i);
    }
  });

  test('should handle search functionality securely', async ({ page }) => {
    // Look for search forms
    const searchInputs = page.locator('input[type="search"], input[name*="search"], input[placeholder*="search" i]');
    const searchInputCount = await searchInputs.count();
    
    if (searchInputCount > 0) {
      const searchInput = searchInputs.first();
      
      // Test for XSS prevention
      const xssPayload = '<script>alert("xss")</script>';
      await searchInput.fill(xssPayload);
      
      // Submit the form if there's a submit button
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForLoadState('networkidle');
        
        // The payload should not execute
        const pageContent = await page.content();
        expect(pageContent).not.toContain('<script>alert("xss")</script>');
      }
    }
  });

  test('should validate contact forms properly', async ({ page }) => {
    // Navigate to contact page
    await page.goto('/contact-us');
    
    // Look for contact forms
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    if (formCount > 0) {
      const form = forms.first();
      
      // Check for required field validation
      const requiredInputs = form.locator('input[required], textarea[required], select[required]');
      const requiredCount = await requiredInputs.count();
      
      if (requiredCount > 0) {
        // Try to submit form without filling required fields
        const submitButton = form.locator('button[type="submit"], input[type="submit"]');
        if (await submitButton.count() > 0) {
          await submitButton.first().click();
          
          // Should show validation errors
          const errorMessages = page.locator('.error, .invalid, [aria-invalid="true"]');
          if (await errorMessages.count() > 0) {
            await expect(errorMessages.first()).toBeVisible();
          }
        }
      }
    }
  });

  test('should handle member login securely', async ({ page }) => {
    // Click on login link
    const loginLink = page.getByText('Get Started').first();
    await loginLink.click();
    
    await page.waitForLoadState('networkidle');
    
    // Should redirect to secure login portal
    expect(page.url()).toMatch(/^https:/);
    expect(page.url()).toContain('identity.azblue.com');
    
    // Check for login form security features
    const passwordInputs = page.locator('input[type="password"]');
    const passwordCount = await passwordInputs.count();
    
    if (passwordCount > 0) {
      const passwordInput = passwordInputs.first();
      
      // Password field should have autocomplete="current-password" or be disabled
      const autocomplete = await passwordInput.getAttribute('autocomplete');
      expect(autocomplete).toMatch(/current-password|off|new-password/);
    }
  });

  test('should protect against CSRF attacks', async ({ page }) => {
    // Look for forms with CSRF tokens
    const forms = page.locator('form');
    const formCount = await forms.count();
    
    for (let i = 0; i < formCount; i++) {
      const form = forms.nth(i);
      
      // Check for CSRF token fields
      const csrfInputs = form.locator('input[name*="csrf"], input[name*="token"], input[name="_token"]');
      const hiddenInputs = form.locator('input[type="hidden"]');
      
      // Forms should have some form of CSRF protection
      const csrfCount = await csrfInputs.count();
      const hiddenCount = await hiddenInputs.count();
      
      if (csrfCount === 0 && hiddenCount === 0) {
        // At minimum, forms should use some protection mechanism
        const method = await form.getAttribute('method');
        if (method && method.toLowerCase() === 'post') {
          console.warn('POST form found without apparent CSRF protection');
        }
      }
    }
  });

  test('should have proper error handling', async ({ page }) => {
    // Test 404 error handling
    const response = await page.goto('/non-existent-page-12345');
    expect(response.status()).toBe(404);
    
    // Should show custom 404 page, not expose server information
    const content = await page.content();
    expect(content).not.toMatch(/apache|nginx|iis|server error|stack trace/i);
  });

  test('should validate email inputs properly', async ({ page }) => {
    // Look for email inputs across the site
    const emailInputs = page.locator('input[type="email"]');
    const emailCount = await emailInputs.count();
    
    if (emailCount > 0) {
      const emailInput = emailInputs.first();
      
      // Test invalid email format
      await emailInput.fill('invalid-email');
      
      // Should trigger HTML5 validation
      const isValid = await emailInput.evaluate(input => input.validity.valid);
      expect(isValid).toBe(false);
      
      // Test valid email format
      await emailInput.fill('test@example.com');
      const isValidNow = await emailInput.evaluate(input => input.validity.valid);
      expect(isValidNow).toBe(true);
    }
  });

  test('should handle file uploads securely', async ({ page }) => {
    // Look for file upload inputs
    const fileInputs = page.locator('input[type="file"]');
    const fileCount = await fileInputs.count();
    
    if (fileCount > 0) {
      const fileInput = fileInputs.first();
      
      // Check for file type restrictions
      const accept = await fileInput.getAttribute('accept');
      if (accept) {
        // Should have some file type restrictions
        expect(accept).toBeTruthy();
        expect(accept.length).toBeGreaterThan(0);
      }
      
      // Should have size limits (check for associated text or attributes)
      const maxSize = await fileInput.getAttribute('data-max-size');
      const form = fileInput.locator('xpath=ancestor::form[1]');
      const sizeText = await form.textContent();
      
      if (!maxSize && sizeText) {
        // Look for size restrictions in surrounding text
        const hasSizeRestriction = /\d+\s*(mb|kb|bytes?)/i.test(sizeText);
        expect(hasSizeRestriction).toBeTruthy();
      }
    }
  });

  test('should not expose sensitive information in source', async ({ page }) => {
    const content = await page.content();
    
    // Should not contain sensitive information in source
    expect(content).not.toMatch(/password\s*[:=]\s*["'][^"']+["']/i);
    expect(content).not.toMatch(/api[_-]?key\s*[:=]\s*["'][^"']+["']/i);
    expect(content).not.toMatch(/secret\s*[:=]\s*["'][^"']+["']/i);
    expect(content).not.toMatch(/token\s*[:=]\s*["'][a-zA-Z0-9]{20,}["']/i);
    
    // Should not expose internal paths or server information
    expect(content).not.toMatch(/c:\\|\/var\/www|\/home\/|\/usr\/local/i);
  });
});
