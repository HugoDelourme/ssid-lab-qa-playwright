# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bugs/degraded-mode.spec.ts >> Cas 5 : Investigation mode dégradé (?bugs=true) >> BUG-05 [P3] : Broken Images — Les images produit ne se chargent pas (naturalWidth === 0)
- Location: tests/bugs/degraded-mode.spec.ts:113:3

# Error details

```
Error: L'image produit #1 est cassée (naturalWidth = 0)

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - alert [ref=e4]: ⚠ Bug mode actif — certaines fonctionnalités sont intentionnellement cassées pour l'entraînement QA
  - banner [ref=e5]:
    - generic [ref=e6]:
      - img "SSID Testing Agency" [ref=e8]
      - link "> Lab.qa" [ref=e9] [cursor=pointer]:
        - /url: "#/"
      - navigation "Navigation principale" [ref=e10]:
        - button "Passer en mode sombre" [ref=e11] [cursor=pointer]
        - link "Wishlist — 0 article" [ref=e14] [cursor=pointer]:
          - /url: "#/wishlist"
        - link "Panier — 0 article" [ref=e17] [cursor=pointer]:
          - /url: "#/cart"
        - button "Se déconnecter" [ref=e20] [cursor=pointer]
    - search "Rechercher un produit" [ref=e24]:
      - generic [ref=e25]:
        - combobox "Rechercher un produit" [ref=e26]
        - button "Lancer la recherche" [ref=e27] [cursor=pointer]
  - generic [ref=e30]:
    - complementary [ref=e31]:
      - generic [ref=e32]:
        - link "Tous les produits" [ref=e33] [cursor=pointer]:
          - /url: "#/catalog"
        - generic [ref=e36]:
          - button "Catégorie" [expanded] [ref=e37] [cursor=pointer]
          - list [ref=e44]:
            - listitem [ref=e45]:
              - link "Vêtements" [ref=e46] [cursor=pointer]:
                - /url: "#/catalog?category=clothing"
            - listitem [ref=e47]:
              - link "Accessoires" [ref=e48] [cursor=pointer]:
                - /url: "#/catalog?category=accessories"
            - listitem [ref=e49]:
              - link "Électronique" [ref=e50] [cursor=pointer]:
                - /url: "#/catalog?category=electronics"
            - listitem [ref=e51]:
              - link "Livres" [ref=e52] [cursor=pointer]:
                - /url: "#/catalog?category=books"
        - link "Wishlist" [ref=e54] [cursor=pointer]:
          - /url: "#/wishlist"
        - link "Mon compte" [ref=e57] [cursor=pointer]:
          - /url: "#/account"
        - link "QA Lab" [ref=e60] [cursor=pointer]:
          - /url: "#/qa-lab"
        - link "À propos" [ref=e63] [cursor=pointer]:
          - /url: "#/about"
        - generic [ref=e66]:
          - paragraph [ref=e67]: Newsletter
          - generic [ref=e68]:
            - textbox "Adresse email pour la newsletter" [ref=e69]:
              - /placeholder: votre@email.com
            - button "S'inscrire" [ref=e70] [cursor=pointer]
        - button "Déconnexion" [ref=e72]
        - button "Réinitialiser la session" [ref=e75]
    - main [ref=e78]:
      - generic [ref=e79]:
        - generic [ref=e80]:
          - heading "Tous les produits (18 produits — page 1/3)" [level=1] [ref=e81]:
            - text: Tous les produits
            - generic [ref=e82]: (18 produits — page 1/3)
          - combobox "Trier les produits" [ref=e84] [cursor=pointer]:
            - option "Sélection" [selected]
            - option "Nom A → Z"
            - option "Nom Z → A"
            - option "Prix croissant"
            - option "Prix décroissant"
        - generic [ref=e85]:
          - group "Filtrer par prix" [ref=e86]:
            - button "Tous les prix" [ref=e87] [cursor=pointer]
            - button "< 20 €" [ref=e88] [cursor=pointer]
            - button "20 – 50 €" [ref=e89] [cursor=pointer]
            - button "50 – 100 €" [ref=e90] [cursor=pointer]
            - button "> 100 €" [ref=e91] [cursor=pointer]
          - generic [ref=e92] [cursor=pointer]:
            - checkbox "En stock uniquement" [ref=e93]
            - text: En stock uniquement
        - generic [ref=e94]:
          - article [ref=e95]:
            - link [aria-hidden] [ref=e96] [cursor=pointer]:
              - /url: "#/product/book-playwright"
              - generic [ref=e98]: Nouveau
            - generic [ref=e99]:
              - generic [ref=e100]:
                - link "Playwright Testing — Guide Pratique" [ref=e101] [cursor=pointer]:
                  - /url: "#/product/book-playwright"
                - 'generic "Note : 4.5 sur 5, 138 avis" [ref=e102]':
                  - generic [ref=e115]: "4.5"
                  - generic [ref=e116]: (138)
              - generic [ref=e117]:
                - button "Diminuer la quantité" [ref=e118] [cursor=pointer]: −
                - generic [ref=e119]: "1"
                - button "Augmenter la quantité" [ref=e120] [cursor=pointer]: +
              - generic [ref=e121]:
                - generic [ref=e122]: 34,99 €
                - button "Ajouter Playwright Testing — Guide Pratique à la wishlist" [ref=e124] [cursor=pointer]
          - article [ref=e127]:
            - link [aria-hidden] [ref=e128] [cursor=pointer]:
              - /url: "#/product/book-ddd"
              - generic [ref=e130]: Nouveau
            - generic [ref=e131]:
              - generic [ref=e132]:
                - link "Domain-Driven Design — Eric Evans" [ref=e133] [cursor=pointer]:
                  - /url: "#/product/book-ddd"
                - 'generic "Note : 5 sur 5, 412 avis" [ref=e134]':
                  - generic [ref=e146]: "5.0"
                  - generic [ref=e147]: (412)
              - generic [ref=e148]:
                - button "Diminuer la quantité" [ref=e149] [cursor=pointer]: −
                - generic [ref=e150]: "1"
                - button "Augmenter la quantité" [ref=e151] [cursor=pointer]: +
              - generic [ref=e152]:
                - generic [ref=e153]: 54,99 €
                - generic [ref=e154]:
                  - button "Ajouter Domain-Driven Design — Eric Evans à la wishlist" [ref=e155] [cursor=pointer]
                  - button "Ajouter Domain-Driven Design — Eric Evans au panier" [ref=e158] [cursor=pointer]: Ajouter au panier
          - article [ref=e159]:
            - link [aria-hidden] [ref=e160] [cursor=pointer]:
              - /url: "#/product/book-devops"
              - generic [ref=e162]: Rupture de stock
            - generic [ref=e163]:
              - generic [ref=e164]:
                - link "The DevOps Handbook" [ref=e165] [cursor=pointer]:
                  - /url: "#/product/book-devops"
                - 'generic "Note : 4.5 sur 5, 634 avis" [ref=e166]':
                  - generic [ref=e179]: "4.5"
                  - generic [ref=e180]: (634)
              - generic [ref=e181]:
                - generic [ref=e182]: 44,99 €
                - generic [ref=e183]:
                  - button "Ajouter The DevOps Handbook à la wishlist" [ref=e184] [cursor=pointer]
                  - button "The DevOps Handbook — rupture de stock" [disabled] [ref=e187]: Rupture de stock
          - article [ref=e188]:
            - link [aria-hidden] [ref=e189] [cursor=pointer]:
              - /url: "#/product/book-agile"
              - generic [ref=e191]: Stock faible
            - generic [ref=e192]:
              - generic [ref=e193]:
                - link "Scrum — Jeff Sutherland" [ref=e194] [cursor=pointer]:
                  - /url: "#/product/book-agile"
                - 'generic "Note : 4 sur 5, 567 avis" [ref=e195]':
                  - generic [ref=e207]: "4.0"
                  - generic [ref=e208]: (567)
              - generic [ref=e209]:
                - button "Diminuer la quantité" [ref=e210] [cursor=pointer]: −
                - generic [ref=e211]: "1"
                - button "Augmenter la quantité" [ref=e212] [cursor=pointer]: +
              - generic [ref=e213]:
                - generic [ref=e214]: 29,99 €
                - generic [ref=e215]:
                  - button "Ajouter Scrum — Jeff Sutherland à la wishlist" [ref=e216] [cursor=pointer]
                  - button "Ajouter Scrum — Jeff Sutherland au panier" [ref=e219] [cursor=pointer]: Ajouter au panier
          - article [ref=e220]:
            - link [aria-hidden] [ref=e221] [cursor=pointer]:
              - /url: "#/product/book-tdd"
              - generic [ref=e223]: −10 %
            - generic [ref=e224]:
              - generic [ref=e225]:
                - link "Test-Driven Development — Kent Beck" [ref=e226] [cursor=pointer]:
                  - /url: "#/product/book-tdd"
                - 'generic "Note : 4.5 sur 5, 923 avis" [ref=e227]':
                  - generic [ref=e240]: "4.5"
                  - generic [ref=e241]: (923)
              - generic [ref=e242]:
                - button "Diminuer la quantité" [ref=e243] [cursor=pointer]: −
                - generic [ref=e244]: "1"
                - button "Augmenter la quantité" [ref=e245] [cursor=pointer]: +
              - generic [ref=e246]:
                - generic [ref=e247]:
                  - generic [ref=e248]: 34,19 €
                  - generic [ref=e249]: 37,99 €
                - generic [ref=e250]:
                  - button "Ajouter Test-Driven Development — Kent Beck à la wishlist" [ref=e251] [cursor=pointer]
                  - button "Ajouter Test-Driven Development — Kent Beck au panier" [ref=e254] [cursor=pointer]: Ajouter au panier
          - article [ref=e255]:
            - link [aria-hidden] [ref=e256] [cursor=pointer]:
              - /url: "#/product/book-clean-code"
            - generic [ref=e258]:
              - generic [ref=e259]:
                - link "Clean Code — Robert C. Martin" [ref=e260] [cursor=pointer]:
                  - /url: "#/product/book-clean-code"
                - 'generic "Note : 5 sur 5, 1842 avis" [ref=e261]':
                  - generic [ref=e273]: "5.0"
                  - generic [ref=e274]: (1 842)
              - generic [ref=e275]:
                - button "Diminuer la quantité" [ref=e276] [cursor=pointer]: −
                - generic [ref=e277]: "1"
                - button "Augmenter la quantité" [ref=e278] [cursor=pointer]: +
              - generic [ref=e279]:
                - generic [ref=e280]: 39,99 €
                - button "Ajouter Clean Code — Robert C. Martin à la wishlist" [ref=e282] [cursor=pointer]
        - navigation "Pagination" [ref=e285]:
          - button "Page précédente" [disabled] [ref=e286] [cursor=pointer]: ‹
          - button "Page 1" [ref=e287] [cursor=pointer]: "1"
          - button "Page 2" [ref=e288] [cursor=pointer]: "2"
          - button "Page 3" [ref=e289] [cursor=pointer]: "3"
          - button "Page suivante" [ref=e290] [cursor=pointer]: ›
  - contentinfo [ref=e291]:
    - generic [ref=e293]:
      - generic [ref=e294]:
        - generic [ref=e295]: "> Lab.qa"
        - paragraph [ref=e296]: Une boutique fictive proposée par SSID - Testing agency conçue pour la pratique des tests automatisés.
      - generic [ref=e297]:
        - heading "SSID - Testing Agency" [level=3] [ref=e298]
        - generic [ref=e299]:
          - generic [ref=e300]: 47 rue de la Fourmisière
          - generic [ref=e301]: 59242 Templeuve-en-Pévèle
      - generic [ref=e302]:
        - heading "Liens" [level=3] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - link "Site web SSID Testing Agency" [ref=e306] [cursor=pointer]:
              - /url: https://www.ssid.fr
          - listitem [ref=e307]:
            - 'link "Mail contact : fdubois@ssid.fr" [ref=e308] [cursor=pointer]':
              - /url: mailto:fdubois@ssid.fr
      - generic [ref=e309]:
        - heading "Formations" [level=3] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - link "Playwright augmenté par l'IA" [ref=e313] [cursor=pointer]:
              - /url: https://www.ssid.fr/on-vous-forme/nouveau-playwright-augmentee-par-l-ia-niveau-avance/
          - listitem [ref=e314]:
            - link "ISTQB CT GenAI — Spécialiste Testeur" [ref=e315] [cursor=pointer]:
              - /url: https://www.ssid.fr/on-vous-forme/certification-istqb-ct-gen-ai-intelligence-artificielle/
          - listitem [ref=e316]:
            - link "ISTQB Foundation" [ref=e317] [cursor=pointer]:
              - /url: https://www.ssid.fr/on-vous-forme/certification-istqb-foundation/
    - generic [ref=e318]:
      - generic [ref=e319]: © 2026 SSID Testing Agency
      - generic [ref=e320]: Ceci n'est pas une vraie boutique.
```

# Test source

```ts
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
  70  |     await expect(page).toHaveURL(urlBeforeSubmit);
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
> 133 |       ).toBeGreaterThan(0);
      |         ^ Error: L'image produit #1 est cassée (naturalWidth = 0)
  134 |     }
  135 |   });
  136 | });
  137 | 
```