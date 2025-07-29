# AZ Blue Website - Playwright Testing Suite

Comprehensive end-to-end testing for the AZ Blue website across all major browsers and devices.

## 🎯 Overview

This project provides automated testing for https://www.azblue.com/ using Playwright, ensuring cross-browser compatibility and functionality across:

- **Desktop Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Devices**: iPhone, Android
- **Test Categories**: Functional, Performance, Security, Responsive

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install browser binaries
npx playwright install

# Run all tests
npm test

# Run with visible browsers (for demo)
npm run test:headed

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# View test report
npm run test:report
```

## 📊 Test Coverage

### Test Files:
- `homepage.spec.js` - Homepage functionality and content validation
- `navigation.spec.js` - Navigation links and user journey testing
- `responsive.spec.js` - Responsive design across different screen sizes
- `performance.spec.js` - Performance, accessibility, and Core Web Vitals
- `security.spec.js` - Security, form validation, and error handling

### Browsers Tested:
- ✅ Chromium (Desktop)
- ✅ Firefox (Desktop)  
- ✅ WebKit/Safari (Desktop)
- ✅ Microsoft Edge (Desktop)
- ✅ Google Chrome (Desktop)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 🎬 Live Demo

Run the live browser demo to see tests executing in real-time:

```bash
# Windows
live-demo.bat

# Cross-platform
node demo.js
```

## 📈 Key Features

- **Cross-browser compatibility testing**
- **Mobile responsiveness validation**
- **Performance benchmarking**
- **Security testing**
- **Automated reporting with screenshots**
- **CI/CD integration ready**

## 🔧 Configuration

Tests are configured in `playwright.config.js` with:
- Base URL: https://www.azblue.com
- Screenshots on failure
- Video recording on failure
- Trace collection for debugging

## 📱 Responsive Testing

Tests validate the website across multiple viewports:
- Desktop: 1280x720
- Mobile: iPhone 12, Pixel 5
- Tablet: iPad

## 🛡️ Security & Performance

- HTTPS enforcement validation
- Form validation testing
- XSS prevention checks
- Page load performance monitoring
- Core Web Vitals measurement

## � Reporting

Comprehensive test reports include:
- HTML reports with detailed results
- Screenshots of failures
- Video recordings of test runs
- Performance metrics
- Cross-browser comparison

---

**Ready for production testing across all browsers and devices!** 🚀
