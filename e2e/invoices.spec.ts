import { test, expect } from '@playwright/test';

test.describe('Invoice Management System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the page header', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Invoice Management System' })).toBeVisible();
  });

  test('should render the summary bar with totals', async ({ page }) => {
    const summaryBar = page.locator('.summary-bar');
    await expect(summaryBar.getByText('Total Invoices')).toBeVisible();
    await expect(summaryBar.getByText('Total Amount')).toBeVisible();
    await expect(summaryBar.getByText('Paid')).toBeVisible();
    await expect(summaryBar.getByText('Pending')).toBeVisible();
    await expect(summaryBar.getByText('Overdue')).toBeVisible();
  });

  test('should render the invoice table with column headers', async ({ page }) => {
    const table = page.locator('.invoice-table');
    await expect(table).toBeVisible();

    await expect(table.getByRole('columnheader', { name: 'Invoice #' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Customer' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Amount' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(table.getByRole('columnheader', { name: 'Status' })).toBeVisible();
  });

  test('should display invoice rows in the table', async ({ page }) => {
    const rows = page.locator('.invoice-row');
    await expect(rows).toHaveCount(await rows.count());
    expect(await rows.count()).toBeGreaterThanOrEqual(5);
    expect(await rows.count()).toBeLessThanOrEqual(10);
  });

  test('should open invoice detail modal when clicking a row', async ({ page }) => {
    // Click the first invoice row
    const firstRow = page.locator('.invoice-row').first();
    await firstRow.click();

    // Modal should appear with invoice details
    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('heading', { name: 'Invoice Details' })).toBeVisible();
    await expect(modal.getByText('Invoice #:')).toBeVisible();
    await expect(modal.getByText('Customer:')).toBeVisible();
    await expect(modal.getByText('Amount:')).toBeVisible();
    await expect(modal.getByText('Notes')).toBeVisible();
  });

  test('should close the modal when clicking the close button', async ({ page }) => {
    // Open the modal
    await page.locator('.invoice-row').first().click();
    await expect(page.locator('.modal-content')).toBeVisible();

    // Close with the × button
    await page.locator('.modal-close').click();
    await expect(page.locator('.modal-content')).not.toBeVisible();
  });

  test('should close the modal when clicking the overlay', async ({ page }) => {
    // Open the modal
    await page.locator('.invoice-row').first().click();
    await expect(page.locator('.modal-content')).toBeVisible();

    // Close by clicking the overlay (outside the modal content)
    await page.locator('.modal-overlay').click({ position: { x: 10, y: 10 } });
    await expect(page.locator('.modal-content')).not.toBeVisible();
  });

  test('should show status badges with correct text', async ({ page }) => {
    const badges = page.locator('.status-badge');
    const count = await badges.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const text = await badges.nth(i).textContent();
      expect(['Paid', 'Pending', 'Overdue']).toContain(text);
    }
  });
});
