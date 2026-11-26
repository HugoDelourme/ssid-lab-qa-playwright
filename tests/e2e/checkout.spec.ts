import { test, expect } from '../../fixtures';
import { takeAndCompareScreenshot } from '../../utils/helper';
import { TEST_CARDS, PROMO_CODES, CUSTOMER_INFO } from '../../data/checkout';

test.afterEach(async ({ context }) => {
  await context.close();
});

test('Cas 3 : Parcours d’achat complet avec gestion d’erreur paiement', async ({
  page,
  catalogPage,
  cartPage,
  checkoutPage,
}) => {
  await test.step('1. Ajouter 3 produits de 3 catégories différentes (dont 1 en promo)', async () => {
    await page.goto('./');
    await takeAndCompareScreenshot(catalogPage.page, `homepage`);

    await catalogPage.addShirtToCart();
    await catalogPage.addBackpackToCart();
    await catalogPage.addHeadphoneToCart();

    await catalogPage.goToCart();
    await expect(page.getByRole('img', { name: 'Casque antibruit' })).toBeVisible();
    await takeAndCompareScreenshot(catalogPage.page, `3 items in cart`);

    await cartPage.continueShopping();
    await takeAndCompareScreenshot(catalogPage.page, `homepage`);

    await catalogPage.goToCart();
  });

  await test.step('2. Modifier quantités (passer à 3) et supprimer un produit', async () => {
    await cartPage.increaseBackpackQuantity(2);
    await cartPage.removeHeadphone();
    await takeAndCompareScreenshot(cartPage.page, `updated cart after modifications`);
  });

  await test.step('3. Appliquer TESTQA, choisir Express et vérifier les montants', async () => {
    await cartPage.applyPromoCode(PROMO_CODES.nonValid);
    await takeAndCompareScreenshot(cartPage.page, `applied non valid promo code`);

    await cartPage.applyPromoCode(PROMO_CODES.valid);
    await takeAndCompareScreenshot(cartPage.page, `applied valid promo code`);

    await cartPage.removePromoCode();
    await takeAndCompareScreenshot(cartPage.page, `updated cart after modifications`);

    await cartPage.applyPromoCode(PROMO_CODES.valid);

    await cartPage.goToCheckout();
    await takeAndCompareScreenshot(cartPage.page, `empty checkout page`);

    await checkoutPage.returnToCart();
    await takeAndCompareScreenshot(cartPage.page, `3 items in cart`);

    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInformation(
      CUSTOMER_INFO.fullName.split(' ')[0],
      CUSTOMER_INFO.fullName.split(' ')[1],
      CUSTOMER_INFO.email,
      CUSTOMER_INFO.postalCode
    );

    await checkoutPage.selectExpressShipping();
    await takeAndCompareScreenshot(checkoutPage.page, `checkout filled information page`);

    await checkoutPage.continueCheckout();
    await takeAndCompareScreenshot(checkoutPage.page, `recap checkout page`);

    await checkoutPage.returnToCheckout();
    await takeAndCompareScreenshot(checkoutPage.page, `checkout filled information page`);

    await checkoutPage.continueCheckout();

    await checkoutPage.finishCheckout();
    await takeAndCompareScreenshot(checkoutPage.page, `payment page`);

    await checkoutPage.returnToRecapCheckout();
    await takeAndCompareScreenshot(checkoutPage.page, `recap checkout page`);

    await checkoutPage.finishCheckout();
  });

  await test.step('4. Carte refusée puis carte acceptée', async () => {
    await checkoutPage.submitPayment();
    await takeAndCompareScreenshot(checkoutPage.page, `payment inputs not filled`);

    await checkoutPage.payWithCard(TEST_CARDS.refused, CUSTOMER_INFO.fullName);
    await expect(checkoutPage.paymentErrorDeclined).toBeVisible();
    await takeAndCompareScreenshot(checkoutPage.page, `payment error declined`);

    await checkoutPage.payWithCard(TEST_CARDS.accepted, CUSTOMER_INFO.fullName);
    await expect(checkoutPage.paymentAcceptedConfirmationTitle).toBeVisible();
    await takeAndCompareScreenshot(checkoutPage.page, `payment successful`);

    await checkoutPage.returnToCatalog();
    await takeAndCompareScreenshot(catalogPage.page, `homepage`);
  });
});
