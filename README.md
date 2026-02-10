# playwright-ocr
Playground for using OCR in playwright tests

## Invoice Management System Demo

A React application demonstrating an invoice management system with seeded random data generation using @faker-js/faker. This app is designed for testing OCR capabilities in Playwright tests.

### Features

- **App Component**: Generates 5-10 random invoices on mount with seeded faker data (seed: 12345)
- **SummaryBar Component**: Displays headline statistics including:
  - Total invoice count
  - Total amount
  - Count per status (Paid, Pending, Overdue)
- **InvoiceTable Component**: Renders invoices in an HTML table with columns:
  - Invoice #
  - Customer
  - Amount
  - Date
  - Status (with color-coded badges)
- **InvoiceDetail Modal**: Clicking a row opens a modal with:
  - Larger text display of invoice details
  - Generated notes paragraph

### Data Generation

The app uses `@faker-js/faker` with a fixed seed (12345) for reproducible, deterministic data that remains random but consistent across test runs. This makes debugging OCR test failures easier while still exercising OCR against non-hardcoded content.

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### End-to-End Tests

The project uses [Playwright](https://playwright.dev/) for integration testing, including OCR-based tests powered by [Tesseract.js](https://github.com/naptha/tesseract.js).

#### Prerequisites

```bash
# Install dependencies (includes Playwright and Tesseract.js)
npm install

# Install Playwright browsers
npx playwright install chromium
```

#### Running tests

```bash
# Run all e2e tests (headless)
npm run test:e2e

# Run tests in interactive UI mode
npm run test:e2e:ui

# Run a specific test file
npx playwright test e2e/invoices.spec.ts
npx playwright test e2e/invoices-ocr.spec.ts

# Run tests in headed mode (see the browser)
npx playwright test --headed

# View the last test report
npx playwright show-report
```

#### Test structure

| File | Description |
|------|-------------|
| `e2e/invoices.spec.ts` | Standard integration tests — verifies UI rendering, table content, modal open/close |
| `e2e/invoices-ocr.spec.ts` | OCR-based tests — takes screenshots and extracts text using Tesseract.js |
| `e2e/ocr-helper.ts` | Shared OCR utility — wraps Tesseract.js worker lifecycle and text extraction |

#### How OCR tests work

1. Playwright captures a screenshot of a page or element via `page.screenshot()` / `locator.screenshot()`
2. The screenshot buffer is passed to Tesseract.js for text recognition
3. Extracted text is asserted against expected content

The Vite dev server starts automatically when tests run (configured in `playwright.config.ts`).

### Styling

The app uses plain CSS with high-contrast colors to maximize OCR accuracy. It includes both light and dark theme support.

---

## React + TypeScript + Vite

This project uses Vite for fast development and building.

