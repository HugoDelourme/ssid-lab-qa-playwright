# Suite de tests E2E Playwright — Lab.qa (SSID)

Suite de tests automatisés de bout en bout développée avec **Playwright (TypeScript)** et **pnpm** pour l'application boutique **Lab.qa** (`https://ssid-testing-agency.github.io/Lab.qa/`).

---

## Prérequis & Installation

- **Node.js** `>= 20`
- **pnpm** `9.15.0` (imposé via `preinstall` et `packageManager`)

### 1. Installer les dépendances et les navigateurs

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps
```

### 2. Configurer les variables d'environnement

Copiez le fichier d'exemple `.env.example` en `.env` à la racine du projet et renseignez le mot de passe de test (aucun secret n'est versionné dans le dépôt) :

```bash
cp .env.example .env
```

```env
BASE_URL=https://ssid-testing-agency.github.io/Lab.qa/
TEST_PASSWORD=Baguette42!
```

---

## Lancer les tests et les vérifications qualité

### Exécution des tests

```bash
# Lancer l'ensemble de la suite (tous les projets)
pnpm exec playwright test

# Lancer uniquement la Quality Gate (auth + E2E Chromium)
pnpm exec playwright test --project=auth --project=e2e-chromium

# Lancer un projet spécifique
pnpm exec playwright test --project=e2e-firefox
pnpm exec playwright test --project=multi-jean_dupont --project=multi-client_chaos --project=multi-tortue_du_web
pnpm exec playwright test --project=bugs

# Ouvrir le rapport HTML local
pnpm exec playwright show-report
```

### Vérifications statiques (Qualité de code)

```bash
pnpm typecheck     # Vérification stricte TypeScript (tsc --noEmit)
pnpm lint          # ESLint + eslint-plugin-playwright
pnpm format:check  # Vérification du formatage Prettier
```

---

## Architecture du projet (Cas 6)

Le projet suit le pattern **Page Object Model (POM)** couplé à des **fixtures Playwright personnalisées** afin de garder les tests lisibles, modulaires et faciles à maintenir :

```text
├── .github/workflows/
│   └── playwright.yml            # Pipeline CI/CD (Quality Gate + Nightly)
├── data/
│   └── checkout.ts               # Jeux de données (cartes, codes promo, client)
├── fixtures/
│   └── index.ts                  # Fixtures personnalisées injectant les Page Objects
├── pages/
│   ├── LoginPage.ts              # Authentification & déconnexion
│   ├── CatalogPage.ts            # Catalogue, filtres, tri paginé & ajout panier
│   ├── CartPage.ts               # Gestion du panier, promo & calculs
│   └── CheckoutPage.ts           # Livraison, récapitulatif & paiement
├── screenshots/                  # Captures de référence (régression visuelle)
├── tests/
│   ├── setup/auth.setup.ts       # Authentification factorisée (storageState)
│   ├── auth/login.spec.ts        # Cas 1 & 2 (connexion, déconnexion, compte banni)
│   ├── e2e/
│   │   ├── checkout.spec.ts      # Cas 3 (parcours d'achat complet & calculs)
│   │   ├── catalog-sort.spec.ts  # Cas 4 (tri par prix multi-pages sans duplication)
│   │   └── fast-checkout.spec.ts # Cas 6 (injection d'état via localStorage)
│   ├── multi-account/
│   │   └── shared-scenario.spec.ts # Scénario rejoué sur 3 profils sans duplication
│   └── bugs/
│       └── degraded-mode.spec.ts   # Cas 5 (investigation ?bugs=true isolée)
├── utils/
│   ├── decorators.ts             # Décorateurs de traçabilité (steps)
│   ├── helper.ts                 # Helper de régression visuelle
│   ├── priceCalculator.ts        # Calculateur indépendant des montants TTC
│   └── storageHelper.ts          # Injection d'état dans le localStorage
└── playwright.config.ts          # Configuration centralisée (projets, navigateurs, retries)
```

### Choix techniques clés

- **Authentification factorisée (`storageState`) :** le projet `setup` (`tests/setup/auth.setup.ts`) authentifie une seule fois `jean_dupont`, `client_chaos` et `tortue_du_web` et sauvegarde leur état de session dans `playwright/.auth/`. Les projets dépendants réutilisent directement ces sessions sans repasser par la page de login.
- **Configuration centralisée :** `playwright.config.ts` centralise `baseURL`, les viewports Desktop (`1920x1080`), les navigateurs (`e2e-chromium`, `e2e-firefox`), les timeouts adaptés (ex. `60_000 ms` pour `multi-tortue_du_web`) et la politique de retries/traces.
- **Exécution multi-comptes sans duplication :** le scénario `tests/multi-account/shared-scenario.spec.ts` est écrit une seule fois et exécuté sur trois projets distincts (`multi-jean_dupont`, `multi-client_chaos`, `multi-tortue_du_web`), chacun injectant son propre `storageState`.
- **Vérification indépendante des montants (Cas 3) :** `utils/priceCalculator.ts` recalcule de manière indépendante le sous-total, la remise, la TVA (prix TTC), les frais de livraison et le total final pour valider les valeurs affichées dans le panier et le récapitulatif.

### Injection d'état sans passer par l'UI (`fast-checkout.spec.ts`)

Le test `tests/e2e/fast-checkout.spec.ts` prépare le panier directement dans le `localStorage` via `utils/storageHelper.ts` (`injectCartInStorage`) avant d'accéder à `#/cart`.

- **Ce que ce raccourci couvre :** l'affichage du panier, la cohérence des lignes produits, les calculs de montants, l'application de codes promo et le tunnel de commande, le tout de manière rapide et déterministe (indépendant d'éventuelles anomalies du catalogue).
- **Ce qu'il ne couvre pas :** le parcours utilisateur sur le catalogue (navigation, recherche, filtres), le clic sur le bouton « Ajouter au panier », la mise à jour du badge compteur dans le header, ni la sérialisation réelle effectuée par l'application lors d'un ajout via l'interface. C'est pourquoi il complète le parcours E2E complet (`checkout.spec.ts`) sans le remplacer.

---

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

---

## Intégration continue, observabilité et régression visuelle (Cas 7)

### Exécution automatique (GitHub Actions)

Le workflow `.github/workflows/playwright.yml` sépare deux niveaux d'exécution :

- **Quality Gate (`push` / `pull_request` sur `main` / `master`) :** exécute les vérifications statiques (`pnpm typecheck`, `pnpm lint`, `pnpm format:check`) puis les projets critiques (`auth` et `e2e-chromium`) pour un retour rapide.
- **Suite nocturne (`schedule` à 2h UTC ou déclenchement manuel `workflow_dispatch`) :** exécute l'ensemble des projets, incluant `e2e-firefox`, les profils multi-comptes (`client_chaos`, `tortue_du_web`) et le projet isolé `bugs`.

### Diagnostic des échecs (Observabilité)

- En CI, `retries` est fixé à `2` et `trace` à `'on-first-retry'` (`screenshot: 'only-on-failure'`, `video: 'retain-on-failure'`).
- Le rapport HTML de chaque exécution est publié automatiquement sur **GitHub Pages** dans un sous-dossier dédié (`quality-gate/run-<n>/` ou `nightly/run-<n>/`) avec un lien cliquable directement dans le **Job Summary** GitHub Actions.
- En cas d'échec, les traces et captures brutes (`test-results/`) sont archivées en artefact pour inspection dans le Trace Viewer (`pnpm exec playwright show-trace`).

### Gestion des captures de référence entre le poste local et la CI

Les moteurs de rendu de polices et l'anti-aliasing diffèrent entre macOS/Windows (poste local) et Linux (`ubuntu-latest` en CI), ce qui provoque des faux positifs sur `toHaveScreenshot()`. Pour y remédier :

1. **Isolation par environnement :** `snapshotPathTemplate` inclut `{projectName}` et `{platform}` afin de séparer les captures Chromium/Firefox et macOS/Linux.
2. **Génération alignée sur la CI :** les captures de référence Linux versionnées dans le dépôt sont générées via l'image Docker officielle Playwright (`mcr.microsoft.com/playwright:v1.65.1-noble`), garantissant un rendu identique au runner GitHub Actions.
3. **Tolérance maîtrisée :** `maxDiffPixelRatio` est configuré pour absorber les micro-écarts de rendu sans masquer une vraie régression visuelle.

#### Mettre à jour les captures de référence Linux depuis le poste local

```bash
docker run --rm --ipc=host \
  -v $(pwd):/work \
  -v /work/node_modules \
  -w /work \
  -e TEST_PASSWORD=Baguette42! \
  -e IGNORE_HTTPS_ERRORS=true \
  mcr.microsoft.com/playwright:v1.65.1-noble \
  bash -c "npm install -g pnpm@9.15.0 && pnpm install --frozen-lockfile --store-dir /tmp/.pnpm-store && pnpm exec playwright test --project=auth --project=e2e-chromium --project=e2e-firefox --update-snapshots"
```

---

## Note de stratégie : Quality Gate PR vs Suite Nocturne

Si cette suite protégeait les déploiements d'un projet en production, le découpage viserait à équilibrer **vitesse de feedback** pour les développeurs et **exhaustivité de la couverture** :

- **Dans la Quality Gate d'une Pull Request (rapide, bloquante, < 3–5 min) :**
  - Les vérifications statiques (`typecheck`, `lint`, `format:check`) pour détecter immédiatement les erreurs de syntaxe ou de typage.
  - Les parcours critiques métier sur le navigateur majoritaire (**Chromium**) : authentification (`auth`), parcours d'achat et calculs (`checkout.spec.ts`), tri catalogue (`catalog-sort.spec.ts`) et tests rapides par injection d'état (`fast-checkout.spec.ts`).
  - _Pourquoi :_ une PR doit donner un verdict rapide et fiable sans bloquer l'équipe ni consommer excessivement de minutes CI.

- **Dans la suite nocturne (exhaustive, non bloquante sur le flux PR) :**
  - La couverture **cross-browser** (`e2e-firefox`, et WebKit si pertinent).
  - Les scénarios **multi-comptes à comportement dégradé ou lent** (`client_chaos`, `tortue_du_web` avec timeout étendu à 60 s).
  - Le suivi des anomalies connues (`bugs`) et les tests de régression visuelle étendus.
  - _Pourquoi :_ ces tests sont plus longs ou plus sensibles à la latence ; les exécuter la nuit permet de détecter les régressions spécifiques à un navigateur ou à un profil avant une mise en production, sans ralentir le cycle de développement quotidien.

---

## Usage de l'IA

Des assistants IA ont été utilisés de manière ponctuelle en appui sur ce projet, notamment pour :

- Structurer et affiner le workflow GitHub Actions (gestion des artefacts, publication GitHub Pages par run, gestion des captures Docker Linux vs macOS).
- Accélérer la rédaction de la documentation (fiches d'anomalies et structuration du README).
- Challenger certaines bonnes pratiques Playwright (gestion des `storageState`, paramétrisation des tests, tolérance de régression visuelle).

**Vérification des sorties :** chaque proposition générée a été relue, adaptée à l'architecture réelle du projet, validée par les outils statiques (`pnpm typecheck`, `pnpm lint`, `pnpm format:check`), et exécutée concrètement en local (macOS + Docker Linux) puis sur GitHub Actions afin de confirmer son bon fonctionnement.
