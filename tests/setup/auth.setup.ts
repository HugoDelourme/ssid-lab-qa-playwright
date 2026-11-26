import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { AUTH_FILES } from '../../playwright.config';
import { LoginPage } from '../../pages/LoginPage';

const PASSWORD = process.env.TEST_PASSWORD;
if (!PASSWORD) throw new Error('TEST_PASSWORD manquant dans .env');

fs.mkdirSync(path.dirname(Object.values(AUTH_FILES)[0]), { recursive: true });

for (const [username, authFilePath] of Object.entries(AUTH_FILES)) {
  setup(`Authentification pour ${username}`, async ({ page }) => {
    setup.setTimeout(60_000);
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, PASSWORD);
    await expect(loginPage.logoutButton).toBeVisible();

    await page.context().storageState({ path: authFilePath });
  });
}
