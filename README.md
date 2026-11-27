## Investigation en mode dégradé (`?bugs=true`) — Cas 5

Les 5 anomalies identifiées ont été documentées dans un projet Playwright isolé (`tests/bugs/degraded-mode.spec.ts`, exécutable via `pnpm exec playwright test --project=bugs`). Chaque test utilise `test.fail()` afin de documenter le comportement attendu sans rendre illisible le résultat de la suite nominale.

### Classement des anomalies par ordre de priorité

| Priorité          | Anomalie                                            | Zone                 | Impact utilisateur & métier                                                                                                                                                    |
| ----------------- | --------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **P1 — Critique** | **Price Off-by-One** (`price-off-by-one`)           | Panier / Checkout    | **Impact financier et légal direct :** un centime supplémentaire est ajouté par ligne au total. Le client est surfacturé par rapport aux prix affichés.                        |
| **P1 — Critique** | **Invalid Form Accepted** (`invalid-form-accepted`) | Checkout — Livraison | **Commandes inexploitables :** le formulaire de livraison est validé même vide ou avec un code postal invalide, entraînant des colis impossibles à livrer et un surcoût SAV.   |
| **P2 — Majeure**  | **Disappearing Button** (`disappearing-button`)     | Catalogue            | **Perte directe de chiffre d'affaires :** le bouton « Ajouter au panier » est invisible sur certains produits pourtant en stock, empêchant leur achat.                         |
| **P2 — Majeure**  | **Reversed Sort** (`reversed-sort`)                 | Catalogue            | **Expérience utilisateur dégradée :** le tri « Prix croissant » affiche les articles les plus chers en premier, ce qui peut faire fuir les clients cherchant un premier prix.  |
| **P3 — Mineure**  | **Broken Images** (`broken-images`)                 | Catalogue            | **Dégradation visuelle et de confiance :** les visuels produits ne chargent pas (`naturalWidth === 0`), nuisant à l'image de marque sans bloquer techniquement l'acte d'achat. |

---

### Fiche d'anomalie complète (Anomalie la plus grave)

- **ID / Titre :** `BUG-01` — Surfacturation dans le récapitulatif panier/checkout (+0,01 € par ligne)
- **Sévérité / Priorité :** Critique / P1
- **Environnement :**
  - URL : `https://ssid-testing-agency.github.io/Lab.qa/?bugs=true`
  - Navigateur : Chromium Desktop (1920x1080)
  - Compte : `jean_dupont`
- **Prérequis :** Être connecté avec un compte valide et avoir le mode dégradé actif (`?bugs=true`).
- **Étapes de reproduction :**
  1. Accéder au catalogue : `#/catalog?bugs=true`.
  2. Ajouter au moins 2 produits distincts au panier (ex. avec des quantités différentes).
  3. Ouvrir le panier (`#/cart?bugs=true`).
  4. (Optionnel) Appliquer le code promo `TESTQA` (−10 %).
  5. Comparer la somme mathématique `(sous-total - remise + frais de livraison)` avec le grand total affiché.
- **Résultat obtenu :** Le grand total affiché est systématiquement supérieur à la somme réelle des lignes (+0,01 € ajouté par ligne de calcul), avec ou sans code promo.
- **Résultat attendu :** Le grand total affiché doit correspondre au centime près à `sous-total - remise + frais de livraison` (les prix étant TTC).
- **Impact :** Erreur de facturation directe envers le client final (risque juridique et perte de confiance). Bloque toute mise en production.
- **Preuve / Automatisation :** Reproduit automatiquement par le test `BUG-01` dans `tests/bugs/degraded-mode.spec.ts` (trace Playwright disponible en artefact CI).

## Intégration continue, observabilité et régression visuelle (Cas 7)

### Exécution automatique (GitHub Actions)

Le workflow `.github/workflows/playwright.yml` sépare deux niveaux d'exécution :

- **Quality Gate (`push` / `pull_request` sur `main`) :** exécute les vérifications statiques (`pnpm typecheck`, `pnpm lint`, `pnpm format:check`) puis les projets critiques (`auth` et `e2e-chromium`) pour un retour rapide.
- **Suite nocturne (`schedule` à 2h UTC ou déclenchement manuel) :** exécute l'ensemble des projets, incluant `e2e-firefox`, les profils multi-comptes (`client_chaos`, `tortue_du_web`) et le projet isolé `bugs`.

### Diagnostic des échecs (Observabilité)

- En CI, `retries` est fixé à `2` et `trace` à `'on-first-retry'` (`screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`).
- Le rapport HTML (`playwright-report/`) est systématiquement archivé en artefact GitHub Actions, et les traces/captures brutes (`test-results/`) sont conservées en cas d'échec pour inspection dans le Trace Viewer (`pnpm exec playwright show-trace`).

### Gestion des captures de référence entre le poste local et la CI

Les moteurs de rendu de polices et l'anti-aliasing diffèrent entre macOS/Windows (poste local) et Linux (`ubuntu-latest` en CI), ce qui provoque des faux positifs sur `toHaveScreenshot()`. Pour y remédier :

1. **Isolation par environnement :** `snapshotPathTemplate` inclut `{projectName}` et `{platform}` afin de séparer les captures Chromium/Firefox et macOS/Linux.
2. **Génération alignée sur la CI :** les captures de référence Linux versionnées dans le dépôt sont générées via l'image Docker officielle Playwright (`mcr.microsoft.com/playwright:v1.65.1-noble`), garantissant un rendu identique au runner GitHub Actions.
3. **Tolérance maîtrisée :** `maxDiffPixelRatio` est configuré pour absorber les micro-écarts de rendu sans masquer une vraie régression visuelle.

Update snapshots locally:

docker run --rm --ipc=host \
-v $(pwd):/work \
-v /work/node_modules \
-w /work \
-e TEST_PASSWORD=Baguette42! \
-e IGNORE_HTTPS_ERRORS=true \
mcr.microsoft.com/playwright:v1.65.1-noble \
bash -c "npm install -g pnpm@9.15.0 && pnpm install --frozen-lockfile --store-dir /tmp/.pnpm-store && pnpm exec playwright test --project=auth --project=e2e-chromium --project=e2e-firefox --update-snapshots"
