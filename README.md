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

### Styling

The app uses plain CSS with high-contrast colors to maximize OCR accuracy. It includes both light and dark theme support.

---

## React + TypeScript + Vite

This project uses Vite for fast development and building.

