# Kit de préparation — mission Vue.js / Nuxt La Poste (DT eCommerce)

Ce dossier te prépare **au coding game et à l’entretien** pour une prestation front Vue 3 / Nuxt sur les interfaces e-commerce de la DSI BGPN (Branche Grand Public et Numérique).

Tu n’as pas l’énoncé exact du test. Personne ne l’a. En revanche, pour ce type de mission (ESN + La Poste + Vue/Nuxt senior), le format est presque toujours le même. Ce kit couvre **exactement** ce qui fait la différence.

## Démarrer en 3 commandes

```bash
cd prep-mission-laposte
npm install
npm test          # les exercices type coding game
npm run dev       # mini boutique catalogue + panier + checkout
```

Ouvre `http://localhost:5173`, joue le parcours : filtrer, ajouter au panier, modifier une quantité, commander.

## Par où commencer (selon le temps)

| Temps dispo | Faire dans l’ordre |
|---|---|
| **2 heures** | [docs/01-strategie-coding-game.md](docs/01-strategie-coding-game.md) → [docs/02-cheatsheet-vue3.md](docs/02-cheatsheet-vue3.md) → `npm test` → relire Pinia dans [docs/03-cheatsheet-nuxt-pinia.md](docs/03-cheatsheet-nuxt-pinia.md) |
| **1 journée** | + mini-projet `npm run dev` + [docs/05-qcm.md](docs/05-qcm.md) + algos `closestToZero` |
| **3 jours** | + [docs/06-entretien-oral.md](docs/06-entretien-oral.md) + accessibilité / BEM / SSR + [docs/07-checklist-jour-j.md](docs/07-checklist-jour-j.md) |

## Contenu

1. **Stratégie du coding game** — formats CodinGame / TestDome, gestion du temps, pièges, barème.
2. **Cheatsheets à mémoriser** — Vue 3 Composition API, Nuxt 3, Pinia, TypeScript, SASS/BEM, WCAG, GitLab CI.
3. **QCM** — 40 questions collées à la fiche de poste.
4. **Entretien oral** — réponses prêtes (SSR, micro-front, DS, encadrement juniors).
5. **Code entraînable**
   - algos CodinGame (`src/algos/codingGame.ts`)
   - exercices Vue type TestDome (`src/exercices/`)
   - mini e-commerce Pinia (`src/views/`, `src/stores/cart.ts`)

## Ce que le recruteur va mesurer

- Tu codes **Vite / Vue 3 / `<script setup>` / TypeScript** sans hésiter.
- Tu gères un **état de panier** (Pinia), pas seulement un `ref` local.
- Tu gères **loading / vide / erreur / rupture de stock**.
- Tu respectes **BEM + labels + clavier** même sous pression.
- Tu connais **SSR Nuxt** (SEO e-commerce) même si le test est en Vue SPA.
- Tu parles **qualité** (tests, a11y, perf) comme un confirmé/lead, pas comme un exécutant.

Le coding game ne te demande pas de reconstruire laposte.fr. Il te demande de prouver, en 45–90 min, que tu peux livrer un front e-commerce propre.
