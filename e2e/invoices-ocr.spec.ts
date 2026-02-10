import { test, expect } from '@playwright/test';
import {
  initOCR,
  teardownOCR,
  extractTextFromPage,
  extractTextFromLocator,
  extractWords,
} from './ocr-helper';

test.describe('Invoice OCR Tests', () => {
  test.beforeAll(async () => {
    await initOCR();
  });

  test.afterAll(async () => {
    await teardownOCR();
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should extract page header text from screenshot', async ({ page }) => {
    const header = page.locator('.app-header');
    const text = await extractTextFromLocator(header);
    expect(text).toContain('Invoice Management System');
  });

  test('should extract summary bar values via OCR', async ({ page }) => {
    const summaryBar = page.locator('.summary-bar');
    const text = await extractTextFromLocator(summaryBar);

    // Summary bar contains numeric values (counts and dollar amounts)
    // Labels may be too small for reliable OCR, but values should be readable
    expect(text).toMatch(/\d+/);
    expect(text).toContain('$');
  });

  test('should extract invoice table column headers via OCR', async ({ page }) => {
    const thead = page.locator('.invoice-table thead');
    const text = await extractTextFromLocator(thead);

    expect(text).toContain('Invoice');
    expect(text).toContain('Customer');
    expect(text).toContain('Amount');
    expect(text).toContain('Date');
    expect(text).toContain('Status');
  });

  test('should extract row data from invoice table via OCR', async ({ page }) => {
    const firstRow = page.locator('.invoice-row').first();
    const text = await extractTextFromLocator(firstRow);

    // The row should contain an invoice ID (4-digit number starting with 1)
    expect(text).toMatch(/10\d{2}/);
    // Should contain a dollar amount
    expect(text).toMatch(/\$/);
    // Should contain a status
    expect(text).toMatch(/Paid|Pending|Overdue/);
  });

  test('should extract modal content via OCR after clicking a row', async ({ page }) => {
    // Click the first invoice row to open the modal
    await page.locator('.invoice-row').first().click();
    await expect(page.locator('.modal-content')).toBeVisible();

    const modal = page.locator('.modal-content');
    const text = await extractTextFromLocator(modal);

    expect(text).toContain('Invoice Details');
    expect(text).toContain('Invoice');
    expect(text).toContain('Customer');
    expect(text).toContain('Amount');
    expect(text).toContain('Status');
    expect(text).toContain('Notes');
  });

  test('should extract text from full page screenshot', async ({ page }) => {
    const text = await extractTextFromPage(page);

    // Verify key content is captured from the full page
    expect(text).toContain('Invoice Management System');
    expect(text).toContain('Total Invoices');
  });

  test('should extract words with confidence scores', async ({ page }) => {
    const header = page.locator('.app-header');
    const screenshot = await header.screenshot();
    const words = await extractWords(screenshot);

    // Should have extracted individual words
    expect(words.length).toBeGreaterThan(0);

    // Each word should have a confidence score and bounding box
    for (const word of words) {
      expect(word.confidence).toBeGreaterThan(0);
      expect(word.text.length).toBeGreaterThan(0);
      expect(word.bbox).toBeDefined();
    }

    // Verify the recognized words form the expected header
    const fullText = words.map((w) => w.text).join(' ');
    expect(fullText).toContain('Invoice');
    expect(fullText).toContain('Management');
    expect(fullText).toContain('System');
  });

  test('should extract status badge text via OCR', async ({ page }) => {
    const badges = page.locator('.status-badge');
    const count = await badges.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const text = await extractTextFromLocator(badges.nth(i));
      const trimmed = text.trim();
      expect(['Paid', 'Pending', 'Overdue']).toContain(trimmed);
    }
  });
});
