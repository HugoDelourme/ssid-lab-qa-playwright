import { test, expect } from '../../fixtures';
import { calculateExpectedSummary } from '../../utils/priceCalculator';
import { injectCartInStorage } from '../../utils/storageHelper';
import { PROMO_CODES } from '../../data/checkout';

test.afterEach(async ({ context }) => {
  await context.close();
});

test.describe('Cas 5 : Investigation mode dégradé (?bugs=true)', () => {
  test('BUG-01 [P1] : Price Off-by-One — Le total affiché surestime la somme réelle', async ({
    page,
    cartPage,
  }) => {
    test.fail(true, 'Anomalie connue (?bugs=true) : +0,01 € ajouté à chaque ligne du total');

    await injectCartInStorage(page, {
      state: {
        items: [
          { productId: 'book-playwright', quantity: 1 },
          { productId: 'sauce-bolt-shirt', quantity: 1, size: 'S' },
        ],
        appliedPromo: null,
      },
      version: 0,
    });

    await page.goto('./#/cart?bugs=true');

    await cartPage.applyPromoCode(PROMO_CODES.valid);

    const itemsInCart = [
      { unitPrice: 34.99, quantity: 1 },
      { unitPrice: 19.99, quantity: 1 },
    ];

    const expectedCart = calculateExpectedSummary(itemsInCart, 10, 0);

    const actualCart = await cartPage.getDisplayedSummary();

    expect(actualCart).toEqual(expectedCart);
  });

  test('BUG-02 [P1] : Invalid Form Accepted — Le formulaire de livraison accepte des champs vides', async ({
    page,
    checkoutPage,
  }) => {
    test.fail(
      true,
      'Anomalie connue (?bugs=true) : aucune validation sur le formulaire de livraison'
    );

    await injectCartInStorage(page, {
      state: {
        items: [
          { productId: 'book-playwright', quantity: 1 },
          { productId: 'sauce-bolt-shirt', quantity: 1, size: 'S' },
        ],
        appliedPromo: null,
      },
      version: 0,
    });

    await page.goto('./#/checkout/info?bugs=true');

    const urlBeforeSubmit = page.url();

    await checkoutPage.continueCheckout();

    await expect(page).toHaveURL(urlBeforeSubmit);
    await expect(checkoutPage.checkoutContinueButton).toBeVisible();
  });

  test('BUG-03 [P2] : Disappearing Button — Le bouton Ajouter au panier est invisible sur des produits en stock', async ({
    page,
  }) => {
    test.fail(
      true,
      'Anomalie connue (?bugs=true) : bouton Ajouter au panier masqué sur certaines cartes'
    );

    await page.goto('./#/catalog?bugs=true');

    const enabledAddButtons = page.locator('[data-testid^="add-to-cart-"]:not([disabled])');
    const buttons = await enabledAddButtons.all();

    expect(buttons.length).toBeGreaterThan(0);

    for (const button of buttons) {
      await expect(button).toBeVisible();
    }
  });

  test('BUG-04 [P2] : Reversed Sort — Le tri Prix croissant affiche les produits du plus cher au moins cher', async ({
    page,
    catalogPage,
  }) => {
    test.fail(true, 'Anomalie connue (?bugs=true) : le tri Prix croissant est inversé');

    await page.goto('./#/catalog?bugs=true');
    await expect(catalogPage.productGrid).toBeVisible();

    await catalogPage.orderByPriceAscClothingCategory();

    const actualPrices = await catalogPage.getAllPricesAcrossPages();

    expect(actualPrices.length).toBeGreaterThan(1);

    const expectedAsc = [...actualPrices].sort((a, b) => a - b);
    expect(actualPrices).toEqual(expectedAsc);
  });

  test('BUG-05 [P3] : Broken Images — Les images produit ne se chargent pas (naturalWidth === 0)', async ({
    page,
  }) => {
    test.fail(true, 'Anomalie connue (?bugs=true) : URLs d’images invalides dans le catalogue');

    await page.goto('./#/catalog?bugs=true');

    const productGrid = page.getByTestId('product-grid');
    await expect(productGrid.getByTestId(/^product-card-/).first()).toBeVisible();

    const productImages = productGrid.locator('img');
    const images = await productImages.all();

    expect(images.length).toBeGreaterThan(0);

    for (const [index, img] of images.entries()) {
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(
        naturalWidth,
        `L'image produit #${index + 1} est cassée (naturalWidth = 0)`
      ).toBeGreaterThan(0);
    }
  });
});
