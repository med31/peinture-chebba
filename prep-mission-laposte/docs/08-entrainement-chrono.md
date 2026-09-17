# 08 — Entraînement chrono (simule le coding game)

Fais ça **sans ouvrir les solutions** (`src/` est la solution : pour t’entraîner, recode dans un fichier vierge).

## Session A — 20 min — algos

Dans un fichier vide, implémente et teste à la main :

1. `closestToZero([-5, 5, 2])` → `2` ; `[-5, 5]` → `5` ; `[]` → `0`
2. `minHorseGap([3, 10, 8])` → `2`
3. `cartTotalCents([{ unitPriceCents: 3000, quantity: 2 }])` → `5400`

Puis `npm test` et compare `src/algos/codingGame.ts`.

## Session B — 45 min — Vue e-commerce

Consigne (l’énoncé type) :

> Tu reçois une liste de produits e-commerce. Affiche-les en cartes. L’utilisateur peut rechercher par nom, filtrer par catégorie, trier par prix. Il peut ajouter au panier si le stock le permet. Le header affiche le nombre d’articles. Une page panier permet de changer les quantités. Remise 10 % dès 50 €. Accessibilité minimale (labels, boutons natifs). BEM.

Contraintes :
- Vue 3 `<script setup>` + TypeScript
- Pinia
- Pas de lib UI
- États : loading, vide, rupture

Compare ensuite avec `src/views/` et `src/stores/cart.ts`.

## Session C — 20 min — exercices « TestDome »

Recode sans copier :
- galerie d’images + bouton remove
- table d’utilisateurs + reset des inputs
- `LabeledInput` label lié à l’input

Les tests sont dans `tests/components.test.ts`.

## Session D — 25 min — QCM

`docs/05-qcm.md` sans scroller les réponses.

## Session E — 15 min — oral

Enregistre-toi au téléphone sur :
1. Pitch 60 s
2. Pourquoi Nuxt pour La Poste ?
3. Comment tu fais monter un junior ?

Si tu pites, relis `docs/06-entretien-oral.md` et recommence.
