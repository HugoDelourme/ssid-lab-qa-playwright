import { test } from '../../fixtures';
import { takeAndCompareScreenshot } from '../../utils/helper';

const PASSWORD = process.env.TEST_PASSWORD!;

test('Cas 1 : Connexion et déconnexion avec jean_dupont', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('jean_dupont', PASSWORD);

  await takeAndCompareScreenshot(loginPage.page, `homepage`);

  await loginPage.logout();
  await takeAndCompareScreenshot(loginPage.page, `login page`);
});

test('Cas 2 : Refus de connexion avec compte_banni', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('compte_banni', PASSWORD);

  await takeAndCompareScreenshot(loginPage.page, `login refused page`);
});
