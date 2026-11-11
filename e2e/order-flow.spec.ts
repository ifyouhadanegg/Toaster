import { expect, test } from '@playwright/test';

test('completes the Codename:PhewBar gifting flow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Codename:PhewBar' })).toBeVisible();
  await page.getByRole('link', { name: 'Explore the user experience' }).click();
  await expect(page).toHaveURL(/\/user$/);
  await page.getByRole('button', { name: 'Browse venues and gifts' }).click();
  await page.getByRole('button', { name: 'Choose venue' }).first().click();
  await page.getByRole('button', { name: 'Choose item' }).first().click();
  await page.getByRole('button', { name: 'Get price' }).click();

  await expect(page.getByText('Price check')).toBeVisible();

  await page.getByRole('button', { name: 'Buy & gift this beverage' }).click();
  await expect(page.getByText('Gift ready to share')).toBeVisible();
  await expect(page.getByText(/GIFT-/).first()).toBeVisible();
});

test('shares a celebration with friends and creates a gift for Lauren', async ({ page }) => {
  await page.goto('/user');
  await expect(page.getByLabel('Demo user')).toBeHidden();
  await page.getByText('Demo user: Lauren').click();
  await expect(page.getByLabel('Demo user').locator('option')).toHaveText(['Lauren', 'Alex', 'Jordan', 'Maya', 'Sam']);
  await page.getByRole('button', { name: "I'm Celebrating" }).click();
  await page.getByLabel('What are you celebrating?').fill('A new job!');
  await expect(page.getByRole('heading', { name: 'App-enabled locations in Pacific Beach' })).not.toBeVisible();
  await page.getByLabel('Where are you celebrating?').selectOption({ label: 'Pacific Beach, San Diego' });
  await expect(page.getByRole('heading', { name: 'App-enabled locations in Pacific Beach' })).toBeVisible();
  await expect(page.getByText('Daybreak Coffee Roasters')).toBeVisible();
  await expect(page.getByText('The Amber Anchor')).toBeVisible();
  await expect(page.getByText('Neon Alley Tavern')).toBeVisible();
  await page.getByRole('button', { name: 'Share celebration' }).click();
  await expect(page.getByText('A new job!')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'App-enabled locations in Pacific Beach' })).toBeVisible();
  await page.reload();
  await expect(page.getByText('A new job!')).toBeVisible();
  await page.getByText('Demo user: Lauren').click();

  for (const user of ['Alex', 'Jordan', 'Maya', 'Sam']) {
    await page.getByLabel('Demo user').selectOption({ label: user });
    await expect(page.getByText(`Demo user: ${user}`)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Lauren is celebrating!' })).toBeVisible();
    await expect(page.getByText('A new job!')).toBeVisible();
    await expect(page.getByText('Pacific Beach, San Diego', { exact: true })).toBeVisible();
  }

  await page.getByRole('button', { name: 'Choose a gift for Lauren' }).click();
  await expect(page.getByRole('heading', { name: 'Choose a gift for Lauren' })).toBeVisible();
  await expect(page.getByText('Daybreak Coffee Roasters')).toBeVisible();
  await page.getByRole('button', { name: 'Choose venue' }).first().click();
  await page.getByRole('button', { name: 'Choose item' }).first().click();
  await page.getByRole('button', { name: 'Get price' }).click();
  await page.getByRole('button', { name: 'Buy & gift this beverage' }).click();
  await expect(page.getByText('Gift ready to share')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Share via text' })).toBeVisible();

  await page.getByLabel('Demo user').selectOption({ label: 'Lauren' });
  await expect(page.getByText('Gift ready to share')).not.toBeVisible();
  await page.getByRole('button', { name: 'Edit celebration' }).click();
  await page.getByLabel('What are you celebrating?').fill('A promotion!');
  await page.getByRole('button', { name: 'Share celebration' }).click();
  await page.getByLabel('Demo user').selectOption({ label: 'Alex' });
  await expect(page.getByText('A promotion!')).toBeVisible();
  await expect(page.getByText('A new job!')).not.toBeVisible();
  await page.getByLabel('Demo user').selectOption({ label: 'Lauren' });
  await page.getByRole('button', { name: 'End celebration' }).click();
  await page.getByLabel('Demo user').selectOption({ label: 'Alex' });
  await expect(page.getByRole('heading', { name: 'Lauren is celebrating!' })).not.toBeVisible();
});

test('shows every other demo user Alex’s celebration and lets Maya gift him', async ({ page }) => {
  await page.goto('/user');
  await page.getByText('Demo user: Lauren').click();
  await page.getByLabel('Demo user').selectOption({ label: 'Alex' });
  await page.getByRole('button', { name: "I'm Celebrating" }).click();
  await page.getByLabel('What are you celebrating?').fill('A birthday');
  await page.getByLabel('Where are you celebrating?').selectOption({ label: 'Pacific Beach, San Diego' });
  await page.getByRole('button', { name: 'Share celebration' }).click();
  await expect(page.getByRole('heading', { name: 'Alex is celebrating!' })).not.toBeVisible();
  for (const user of ['Lauren', 'Jordan', 'Maya', 'Sam']) {
    await page.getByLabel('Demo user').selectOption({ label: user });
    await expect(page.getByRole('heading', { name: 'Alex is celebrating!' })).toBeVisible();
    await expect(page.getByText('A birthday')).toBeVisible();
  }
  await page.getByLabel('Demo user').selectOption({ label: 'Maya' });
  await page.getByRole('button', { name: 'Choose a gift for Alex' }).click();
  await expect(page.getByRole('heading', { name: 'Choose a gift for Alex' })).toBeVisible();
  await page.getByRole('button', { name: 'Choose venue' }).first().click();
  await page.getByRole('button', { name: 'Choose item' }).first().click();
  await page.getByRole('button', { name: 'Get price' }).click();
  await page.getByRole('button', { name: 'Buy & gift this beverage' }).click();
  await expect(page.getByText('Gift ready to share')).toBeVisible();
});

test('collapses the persona switcher and supports keyboard use', async ({ page }) => {
  await page.goto('/user');
  const summary = page.locator('summary').filter({ hasText: 'Demo user:' });
  await expect(summary).toContainText('Lauren');
  await expect(page.getByLabel('Demo user')).toBeHidden();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Demo user')).toBeVisible();
  await page.getByLabel('Demo user').selectOption({ label: 'Alex' });
  await expect(summary).toContainText('Alex');
  await expect(page.getByRole('heading', { name: 'What are you celebrating, Alex?' })).toBeVisible();
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Demo user')).toBeHidden();
  await expect(summary).toContainText('Alex');
});

test('reports invalid saved celebration data', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('phewbar-demo-celebrations-v1', 'invalid'));
  await page.goto('/user');
  await expect(page.getByText(/Could not load saved celebrations/)).toBeVisible();
  await expect(page.getByRole('button', { name: "I'm Celebrating" })).toBeDisabled();
});

test('keeps earlier demo celebrations in the Pacific Beach area', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('phewbar-demo-celebrations-v1', JSON.stringify([
    { userId: 'lauren', message: 'A new job!', location: 'The beach' }
  ])));
  await page.goto('/user');
  await expect(page.getByText('A new job!')).toBeVisible();
  await expect(page.getByText('Pacific Beach, San Diego', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'App-enabled locations in Pacific Beach' })).toBeVisible();
  await page.getByRole('button', { name: 'Edit celebration' }).click();
  await expect(page.getByLabel('Where are you celebrating?')).toHaveValue('Pacific Beach, San Diego');
});

test('reports when app-enabled locations cannot be loaded', async ({ page }) => {
  await page.route('**/api/venues', (route) => route.fulfill({ status: 500, body: 'Unavailable' }));
  await page.goto('/user');
  await page.getByRole('button', { name: "I'm Celebrating" }).click();
  await page.getByLabel('Where are you celebrating?').selectOption({ label: 'Pacific Beach, San Diego' });
  await expect(page.getByRole('heading', { name: 'App-enabled locations in Pacific Beach' })).toBeVisible();
  await expect(page.locator('section').filter({ has: page.getByRole('heading', { name: 'App-enabled locations in Pacific Beach' }) }).getByText(/Unavailable|failed|error/i)).toBeVisible();
});

test('links to the merchant and admin placeholders', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'View merchant placeholder' }).click();
  await expect(page).toHaveURL(/\/merchant$/);
  await expect(page.getByRole('heading', { name: 'Merchant experience' })).toBeVisible();
  await expect(page.getByText('Coming soon')).toBeVisible();
  await page.getByRole('link', { name: 'Back to demo home' }).click();

  await page.getByRole('link', { name: 'View admin placeholder' }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole('heading', { name: 'PhewBar admin experience' })).toBeVisible();
  await expect(page.getByText('Coming soon')).toBeVisible();
  await page.getByRole('link', { name: 'Back to demo home' }).click();
  await expect(page.getByRole('heading', { name: 'Choose an experience' })).toBeVisible();
});