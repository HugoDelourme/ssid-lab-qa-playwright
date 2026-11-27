import { test, expect } from '../../fixtures';
import { takeAndCompareScreenshot } from '../../utils/helper';
import { injectCartInStorage } from '../../utils/storageHelper';

test.afterEach(async ({ context }) => {
  await context.close();
});

test('Cas 6 : Préparation du panier sans passer par l’UI', async ({ page }) => {
  await injectCartInStorage(page, {
    state: { items: [{ productId: 'sauce-backpack', quantity: 1 }], appliedPromo: null },
    version: 0,
  });
  await page.goto('./#/cart');
  await expect(page.getByTestId('cart-item-sauce-backpack')).toBeVisible();
  await takeAndCompareScreenshot(page, `cart with injected product`);
});
