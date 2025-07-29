# AZ Blue Website - Playwright Testing Suite

This project contains comprehensive end-to-end tests for the AZ Blue website (https://www.azblue.com/) using Playwright. The test suite covers multiple browsers and devices to ensure cross-browser compatibility and functionality.

## 🎯 Test Coverage

### Test Files:
- **homepage.spec.js** - Homepage functionality and content validation
- **navigation.spec.js** - Navigation links and user journey testing
- **responsive.spec.js** - Responsive design across different screen sizes
- **performance.spec.js** - Performance, accessibility, and Core Web Vitals
- **security.spec.js** - Security, form validation, and error handling

### Browsers Tested:
- ✅ **Chromium** (Desktop)
- ✅ **Firefox** (Desktop)  
- ✅ **WebKit/Safari** (Desktop)
- ✅ **Microsoft Edge** (Desktop)
- ✅ **Google Chrome** (Desktop)
- ✅ **Mobile Chrome** (Pixel 5)
- ✅ **Mobile Safari** (iPhone 12)

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
npm install

# Install browser binaries
npm run test:install
```

### Running Tests

```bash
# Run all tests across all browsers
npm test

# Run tests with visible browser (headed mode)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific browser tests
npm run test:chromium
npm run test:firefox  
npm run test:webkit

# Run mobile tests only
npm run test:mobile

# Run all desktop browsers
npm run test:all-browsers

# View test reports
npm run test:report
```

## 📊 Test Results

After running tests, you can view detailed reports:
- HTML Report: `npx playwright show-report`
- Screenshots: `test-results/` folder
- Videos: `test-results/` folder (on failures)
- Traces: `test-results/` folder (on retry)

## 🔧 Configuration

The test configuration is in `playwright.config.js`:
- **Base URL**: https://www.azblue.com
- **Timeouts**: 30 seconds default
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

## 📱 Device Testing

### Desktop Resolutions:
- 1280x720 (Standard desktop)

### Mobile Devices:
- Pixel 5 (Mobile Chrome)
- iPhone 12 (Mobile Safari)
- iPad (Tablet view)

## 🧪 Test Categories

### 1. Functional Tests
- Page loading and content validation
- Navigation functionality
- Form interactions
- Link verification

### 2. UI/UX Tests  
- Responsive design
- Cross-browser compatibility
- Mobile optimization
- Touch interface validation

### 3. Performance Tests
- Page load times
- Core Web Vitals (LCP, FID, CLS)
- Image optimization
- Network error handling

### 4. Security Tests
- HTTPS enforcement
- Form validation
- XSS prevention
- CSRF protection
- Error handling

### 5. Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- Alt text validation
- Semantic HTML structure

## 📈 Demo Script for Tomorrow

### Quick Demo Commands:
```bash
# 1. Show all available test scripts
npm run

# 2. Run a quick smoke test on all browsers
npm run test:all-browsers -- --grep "should load homepage successfully"

# 3. Run responsive tests to show mobile compatibility
npm run test:mobile

# 4. Run performance tests
npm run test -- performance.spec.js

# 5. Show detailed HTML report
npm run test:report
```

### Demo Flow:
1. **Overview** - Show project structure and test files
2. **Cross-Browser Testing** - Run same test on Chrome, Firefox, Safari
3. **Mobile Testing** - Show responsive design tests
4. **Performance Validation** - Show load time and Core Web Vitals tests
5. **Reports** - Display comprehensive HTML report with screenshots

## 📂 Project Structure

```
playwrights/
├── tests/
│   ├── homepage.spec.js      # Homepage functionality
│   ├── navigation.spec.js    # Navigation and links
│   ├── responsive.spec.js    # Responsive design
│   ├── performance.spec.js   # Performance & accessibility
│   └── security.spec.js      # Security & validation
├── test-results/             # Test artifacts
├── playwright-report/        # HTML reports
├── playwright.config.js      # Test configuration
├── package.json             # Project dependencies
└── README.md               # This file
```

## 🎪 Key Features Tested

### Homepage Elements:
- ✅ Main navigation (Individuals/Families, Medicare, Medicaid, Employers)
- ✅ Contact information (800) 232-2345
- ✅ Member login portal access
- ✅ Find a Doctor functionality
- ✅ Plan exploration links
- ✅ AZ Blue statistics and differentiators
- ✅ Footer links and social media

### Cross-Browser Compatibility:
- ✅ Layout consistency
- ✅ JavaScript functionality
- ✅ CSS rendering
- ✅ Form interactions
- ✅ Image loading

### Mobile Optimization:
- ✅ Touch-friendly interface
- ✅ Readable text sizes
- ✅ Proper viewport scaling
- ✅ Mobile navigation patterns

## 🚨 Common Issues & Solutions

### Browser Installation Issues:
```bash
# If browsers fail to install
npx playwright install --force
```

### Permission Issues on Windows:
```bash
# Run as administrator if needed
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Network Issues:
- Tests include network failure simulation
- Timeout configurations handle slow connections
- Retry logic for flaky network conditions

## 📞 Support

For questions or issues:
- Review test results in HTML report
- Check console output for detailed errors
- Verify browser installation with `npx playwright --version`

---

**Ready for Demo Tomorrow! 🎉**

This test suite provides comprehensive coverage of the AZ Blue website across all major browsers and devices, ensuring a consistent user experience for all visitors.
