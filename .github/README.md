# GitHub Actions CI/CD for Playwright Tests

This repository includes comprehensive GitHub Actions workflows for automated testing of the AZ Blue website using Playwright.

## 🚀 Workflows

### 1. **Main Test Workflow** (`playwright-tests.yml`)
**Triggers:** Push to main/master/develop branches, Pull Requests
- Runs tests on multiple Node.js versions (18, 20)
- Executes tests on Ubuntu and Windows
- Includes security scanning
- Uploads test reports and artifacts

### 2. **Pull Request Tests** (`pr-tests.yml`)
**Triggers:** Pull Request events
- Quick feedback for PR changes
- Smoke tests for faster validation
- Automatic PR comments with test results
- Concurrency control to cancel outdated runs

### 3. **Scheduled Tests** (`scheduled-tests.yml`)
**Triggers:** Daily at 2 AM UTC, Manual dispatch
- Comprehensive daily health checks
- Full test suite execution
- Monitoring for website changes

## 📊 Test Reports

All workflows generate:
- **HTML Reports**: Visual test results with screenshots
- **JUnit XML**: For integration with other tools
- **JSON Results**: Machine-readable test data
- **Screenshots/Videos**: For failed tests

Reports are automatically uploaded as workflow artifacts and retained for:
- PR tests: 14 days
- Main branch tests: 30 days
- Scheduled tests: 7 days

## 🔧 Configuration

### Environment Variables
The workflows use these environment variables:
- `CI=true`: Enables CI-specific Playwright behavior
- Node.js versions: 18, 20 (configurable in matrix)

### Browser Configuration
- **Ubuntu**: All browsers (Chromium, Firefox, WebKit)
- **Windows**: All browsers (when pushed to main)
- **PR Tests**: Chromium only for speed

## 🚨 Notifications

### Success ✅
- Automatic success notifications in workflow summary
- PR comments with test statistics

### Failure ❌
- Failed workflow status
- Detailed error reports in artifacts
- PR comments indicating failures

## 🔐 Security Features

- **Dependency Auditing**: Checks for security vulnerabilities
- **Security Test Suite**: Runs dedicated security tests
- **Artifact Retention**: Automatic cleanup of old reports

## 📁 Artifact Structure

```
playwright-report-{environment}/
├── index.html          # Main test report
├── data/               # Test data
└── trace/              # Execution traces

test-results-{environment}/
├── {test-name}/
│   ├── test-failed-1.png
│   ├── video.webm
│   └── trace.zip
```

## 🛠️ Local Development

To run tests locally with the same configuration:

```bash
# Install dependencies
npm ci

# Install browsers
npx playwright install --with-deps

# Run all tests
npm test

# Run tests with headed browsers
npx playwright test --headed

# Run specific test file
npx playwright test tests/homepage.spec.js

# Generate report
npx playwright show-report
```

## 📈 Performance Monitoring

The workflows include:
- **Load Time Monitoring**: Page performance metrics
- **Core Web Vitals**: User experience indicators  
- **Resource Usage**: Image optimization checks
- **Accessibility**: Screen reader compatibility

## 🔄 Workflow Status

Check workflow status:
- Go to **Actions** tab in GitHub repository
- View recent runs and their status
- Download artifacts for detailed analysis

## 🚀 Getting Started

1. **Push code** to trigger tests automatically
2. **Create Pull Request** for PR-specific validation
3. **Check Actions tab** for workflow results
4. **Download artifacts** for detailed reports

## 📞 Troubleshooting

### Common Issues:
- **Browser Installation**: Ensure `--with-deps` flag is used
- **Timeout Issues**: Increase timeout in workflow if needed
- **Flaky Tests**: Review test-results artifacts for debugging

### Debugging:
- Enable debug logging: Add `DEBUG=pw:api` to env variables
- Use trace viewer: Download trace files from artifacts
- Check browser console: Security tests capture console errors

## 🔧 Customization

To modify the workflows:
1. Edit `.github/workflows/*.yml` files
2. Adjust matrix strategies for different environments
3. Modify notification settings
4. Update retention periods for artifacts

---

**Note**: These workflows are designed for the AZ Blue website testing. Adjust URLs and test expectations as needed for different environments.
