import { expect, test } from '@playwright/test';

test('completes the Codename:PhewBar gifting flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Codename:PhewBar' })).toBeVisible();
  await page.getByRole('button', { name: 'Choose venue' }).first().click();
  await page.getByRole('button', { name: 'Choose item' }).first().click();
  await page.getByRole('button', { name: 'Get price' }).click();

  await expect(page.getByText('Price check')).toBeVisible();

  await page.getByRole('button', { name: 'Buy & gift this beverage' }).click();
  await expect(page.getByText('Gift ready to share')).toBeVisible();
  await expect(page.getByText(/GIFT-/).first()).toBeVisible();
});