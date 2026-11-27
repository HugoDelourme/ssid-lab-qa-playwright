import { test, expect } from '../../fixtures';

test.afterEach(async ({ context }) => {
  await context.close();
});

test('Cas 6 : Scénario nominal rejoué sur plusieurs comptes', async ({ page, loginPage }) => {
  await page.goto('./');
  await expect(loginPage.logoutButton).toBeVisible();
});
