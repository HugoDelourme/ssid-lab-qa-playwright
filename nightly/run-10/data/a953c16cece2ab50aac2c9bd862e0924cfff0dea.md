# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bugs/degraded-mode.spec.ts >> Cas 5 : Investigation mode dégradé (?bugs=true) >> BUG-02 [P1] : Invalid Form Accepted — Le formulaire de livraison accepte des champs vides
- Location: tests/bugs/degraded-mode.spec.ts:44:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "https://ssid-testing-agency.github.io/Lab.qa/#/checkout/info?bugs=true"
Received: "https://ssid-testing-agency.github.io/Lab.qa/#/checkout/review"
Timeout:  10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    24 × locator resolved to <html lang="fr" class="light">…</html>
       - unexpected value "https://ssid-testing-agency.github.io/Lab.qa/#/checkout/review"

```

```yaml
- banner:
  - img "SSID Testing Agency"
  - link "> Lab.qa":
    - /url: "#/"
  - navigation "Navigation principale":
    - button "Passer en mode sombre"
    - link "Wishlist — 0 article":
      - /url: "#/wishlist"
    - link "Panier — 2 articles":
      - /url: "#/cart"
      - text: "2"
    - button "Se déconnecter"
  - search "Rechercher un produit":
    - combobox "Rechercher un produit"
    - button "Lancer la recherche"
- complementary:
  - link "Tous les produits":
    - /url: "#/catalog"
  - button "Catégorie" [expanded]
  - list:
    - listitem:
      - link "Vêtements":
        - /url: "#/catalog?category=clothing"
    - listitem:
      - link "Accessoires":
        - /url: "#/catalog?category=accessories"
    - listitem:
      - link "Électronique":
        - /url: "#/catalog?category=electronics"
    - listitem:
      - link "Livres":
        - /url: "#/catalog?category=books"
  - link "Wishlist":
    - /url: "#/wishlist"
  - link "Mon compte":
    - /url: "#/account"
  - link "QA Lab":
    - /url: "#/qa-lab"
  - link "À propos":
    - /url: "#/about"
  - paragraph: Newsletter
  - textbox "Adresse email pour la newsletter":
    - /placeholder: votre@email.com
  - button "S'inscrire"
  - button "Déconnexion"
  - button "Réinitialiser la session"
- main:
  - navigation "Fil d'Ariane":
    - link "Catalogue":
      - /url: "#/catalog"
    - link "Panier":
      - /url: "#/cart"
    - link "Livraison":
      - /url: "#/checkout/info"
    - text: Récapitulatif
  - navigation "Étapes de commande":
    - list:
      - listitem: ✓ Informations
      - listitem: 2 Récapitulatif
      - listitem: 3 Paiement
      - listitem: 4 Confirmation
  - heading "Récapitulatif de commande" [level=1]
  - paragraph
  - paragraph
  - paragraph: "Code postal :"
  - paragraph: "Livraison : Standard — 5–7 jours ouvrés"
  - text: Playwright Testing — Guide Pratique× 1 34,99 € T-Shirt Bolt× 1 24,99 € Sous-total 54,98 € dont TVA (20 %) 9,16 € Livraison (Standard) 3,99 € Total 58,97 €
  - button "Retour"
  - button "Confirmer la commande"
- contentinfo:
  - text: "> Lab.qa"
  - paragraph: Une boutique fictive proposée par SSID - Testing agency conçue pour la pratique des tests automatisés.
  - heading "SSID - Testing Agency" [level=3]
  - text: 47 rue de la Fourmisière 59242 Templeuve-en-Pévèle
  - heading "Liens" [level=3]
  - list:
    - listitem:
      - link "Site web SSID Testing Agency":
        - /url: https://www.ssid.fr
    - listitem:
      - 'link "Mail contact : fdubois@ssid.fr"':
        - /url: mailto:fdubois@ssid.fr
  - heading "Formations" [level=3]
  - list:
    - listitem:
      - link "Playwright augmenté par l'IA":
        - /url: https://www.ssid.fr/on-vous-forme/nouveau-playwright-augmentee-par-l-ia-niveau-avance/
    - listitem:
      - link "ISTQB CT GenAI — Spécialiste Testeur":
        - /url: https://www.ssid.fr/on-vous-forme/certification-istqb-ct-gen-ai-intelligence-artificielle/
    - listitem:
      - link "ISTQB Foundation":
        - /url: https://www.ssid.fr/on-vous-forme/certification-istqb-foundation/
  - text: © 2026 SSID Testing Agency Ceci n'est pas une vraie boutique.
```

# Test source

```ts
  1   | import { test, expect } from '../../fixtures';
  2   | import { calculateExpectedSummary } from '../../utils/priceCalculator';
  3   | import { injectCartInStorage } from '../../utils/storageHelper';
  4   | import { PROMO_CODES } from '../../data/checkout';
  5   | 
  6   | test.afterEach(async ({ context }) => {
  7   |   await context.close();
  8   | });
  9   | 
  10  | test.describe('Cas 5 : Investigation mode dégradé (?bugs=true)', () => {
  11  |   test('BUG-01 [P1] : Price Off-by-One — Le total affiché surestime la somme réelle', async ({
  12  |     page,
  13  |     cartPage,
  14  |   }) => {
  15  |     test.fail(true, 'Anomalie connue (?bugs=true) : +0,01 € ajouté à chaque ligne du total');
  16  | 
  17  |     await injectCartInStorage(page, {
  18  |       state: {
  19  |         items: [
  20  |           { productId: 'book-playwright', quantity: 1 },
  21  |           { productId: 'sauce-bolt-shirt', quantity: 1, size: 'S' },
  22  |         ],
  23  |         appliedPromo: null,
  24  |       },
  25  |       version: 0,
  26  |     });
  27  | 
  28  |     await page.goto('./#/cart?bugs=true');
  29  | 
  30  |     await cartPage.applyPromoCode(PROMO_CODES.valid);
  31  | 
  32  |     const itemsInCart = [
  33  |       { unitPrice: 34.99, quantity: 1 },
  34  |       { unitPrice: 19.99, quantity: 1 },
  35  |     ];
  36  | 
  37  |     const expectedCart = calculateExpectedSummary(itemsInCart, 10, 0);
  38  | 
  39  |     const actualCart = await cartPage.getDisplayedSummary();
  40  | 
  41  |     expect(actualCart).toEqual(expectedCart);
  42  |   });
  43  | 
  44  |   test('BUG-02 [P1] : Invalid Form Accepted — Le formulaire de livraison accepte des champs vides', async ({
  45  |     page,
  46  |     checkoutPage,
  47  |   }) => {
  48  |     test.fail(
  49  |       true,
  50  |       'Anomalie connue (?bugs=true) : aucune validation sur le formulaire de livraison'
  51  |     );
  52  | 
  53  |     await injectCartInStorage(page, {
  54  |       state: {
  55  |         items: [
  56  |           { productId: 'book-playwright', quantity: 1 },
  57  |           { productId: 'sauce-bolt-shirt', quantity: 1, size: 'S' },
  58  |         ],
  59  |         appliedPromo: null,
  60  |       },
  61  |       version: 0,
  62  |     });
  63  | 
  64  |     await page.goto('./#/checkout/info?bugs=true');
  65  | 
  66  |     const urlBeforeSubmit = page.url();
  67  | 
  68  |     await checkoutPage.continueCheckout();
  69  | 
> 70  |     await expect(page).toHaveURL(urlBeforeSubmit);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  71  |     await expect(checkoutPage.checkoutContinueButton).toBeVisible();
  72  |   });
  73  | 
  74  |   test('BUG-03 [P2] : Disappearing Button — Le bouton Ajouter au panier est invisible sur des produits en stock', async ({
  75  |     page,
  76  |   }) => {
  77  |     test.fail(
  78  |       true,
  79  |       'Anomalie connue (?bugs=true) : bouton Ajouter au panier masqué sur certaines cartes'
  80  |     );
  81  | 
  82  |     await page.goto('./#/catalog?bugs=true');
  83  | 
  84  |     const enabledAddButtons = page.locator('[data-testid^="add-to-cart-"]:not([disabled])');
  85  |     const buttons = await enabledAddButtons.all();
  86  | 
  87  |     expect(buttons.length).toBeGreaterThan(0);
  88  | 
  89  |     for (const button of buttons) {
  90  |       await expect(button).toBeVisible();
  91  |     }
  92  |   });
  93  | 
  94  |   test('BUG-04 [P2] : Reversed Sort — Le tri Prix croissant affiche les produits du plus cher au moins cher', async ({
  95  |     page,
  96  |     catalogPage,
  97  |   }) => {
  98  |     test.fail(true, 'Anomalie connue (?bugs=true) : le tri Prix croissant est inversé');
  99  | 
  100 |     await page.goto('./#/catalog?bugs=true');
  101 |     await expect(catalogPage.productGrid).toBeVisible();
  102 | 
  103 |     await catalogPage.orderByPriceAscClothingCategory();
  104 | 
  105 |     const actualPrices = await catalogPage.getAllPricesAcrossPages();
  106 | 
  107 |     expect(actualPrices.length).toBeGreaterThan(1);
  108 | 
  109 |     const expectedAsc = [...actualPrices].sort((a, b) => a - b);
  110 |     expect(actualPrices).toEqual(expectedAsc);
  111 |   });
  112 | 
  113 |   test('BUG-05 [P3] : Broken Images — Les images produit ne se chargent pas (naturalWidth === 0)', async ({
  114 |     page,
  115 |   }) => {
  116 |     test.fail(true, 'Anomalie connue (?bugs=true) : URLs d’images invalides dans le catalogue');
  117 | 
  118 |     await page.goto('./#/catalog?bugs=true');
  119 | 
  120 |     const productGrid = page.getByTestId('product-grid');
  121 |     await expect(productGrid.getByTestId(/^product-card-/).first()).toBeVisible();
  122 | 
  123 |     const productImages = productGrid.locator('img');
  124 |     const images = await productImages.all();
  125 | 
  126 |     expect(images.length).toBeGreaterThan(0);
  127 | 
  128 |     for (const [index, img] of images.entries()) {
  129 |       const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
  130 |       expect(
  131 |         naturalWidth,
  132 |         `L'image produit #${index + 1} est cassée (naturalWidth = 0)`
  133 |       ).toBeGreaterThan(0);
  134 |     }
  135 |   });
  136 | });
  137 | 
```