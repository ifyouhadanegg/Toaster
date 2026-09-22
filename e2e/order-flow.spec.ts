import { expect, test } from '@playwright/test';

test('completes the Toast hospitality flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Toast Hospitality Lab')).toBeVisible();
  await page.getByRole('button', { name: 'Grilled' }).click();
  await page.getByRole('button', { name: 'Get price' }).click();

  await expect(page.getByText('Price check')).toBeVisible();

  await page.getByRole('button', { name: 'Submit order' }).click();
  await expect(page.getByText(/Order ID:/)).toBeVisible();
  await expect(page.getByText('Order confirmed')).toBeVisible();
});