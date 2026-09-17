# 19 — Visite guidée du mini-projet (le code du kit)

Tu as lu la théorie. Maintenant on ouvre les fichiers **dans l’ordre où le navigateur s’en sert**. Lance `npm run dev` à côté, clique, puis reviens au fichier.

## La porte d’entrée

`index.html` → charge `src/main.ts`.

`main.ts` fait trois choses :

1. `createApp(App)` — démarre Vue ;
2. `app.use(createPinia())` — le cahier de caisse du panier est disponible **partout** ;
3. `app.use(router)` — `/`, `/panier`, `/commande` ;
4. `app.mount("#app")` — Vue prend possession du `<div id="app">`.

Sans Pinia **avant** les composants, `useCartStore()` explose.

## Le chrome : `App.vue`

C’est le **layout** : header + `<RouterView />` (le trou où la page change).

Le badge lit `count` du store via `storeToRefs`. Clique « Ajouter » dans le catalogue : tu **ne** passes **pas** de props jusqu’au header. C’est **toute** la justification de Pinia (cours 06).

`aria-live="polite"` : le lecteur d’écran entend le nouveau nombre.

Classes `app-shell__header` : BEM (cours 11).

## Les routes : `router.ts`

Trois pages, noms `catalog` / `cart` / `checkout`. `scrollBehavior` ramène en haut : détail UX d’une SPA (sinon tu restes au milieu de la page précédente).

En **Nuxt**, ce fichier n’existerait pas : `pages/index.vue`, `pages/panier.vue`, etc.

## La page catalogue : `views/CatalogView.vue`

1. `useProducts()` — composable : query, filtres, `filtered`, `fetchProducts`.
2. `onMounted(fetchProducts)` — **SPA**. En Nuxt ce serait `useFetch`.
3. `v-if` loading / error / vide / liste : les **quatre états** qu’un senior affiche toujours.
4. `ProductFilters` en `v-model:query` etc. — l’état vit dans le parent/composable, le filtre est bête.
5. `v-for` + `:key="product.id"` — jamais l’index.
6. `@add="addToCart"` → `cart.add(product)`.

Lis-le à voix haute : « je charge, je filtre en computed, je délègue l’UI, le store tient le panier ». C’est la réponse d’archi du coding game.

## Le composable : `composables/useProducts.ts`

- `fetchProducts` simule une API (`setTimeout` 250 ms) pour que tu **voies** l’état loading. En vrai : `fetch` / `useFetch`.
- `filtered` est un **`computed`** qui enchaîne filtre texte + catégorie + tri. Changer `query` **recalcule**, pas besoin de `watch`.
- Le tri copie `[...list]` avant `sort` : `sort` mute le tableau ; on ne mute pas la source `products`.

## La carte : `components/ProductCard.vue`

Composant **bête** : props in, emit out. Il ne connaît pas Pinia. Avantage Storybook : tu montes une carte `stock: 0` sans tout le site.

- `computed` `inStock` et `price` : le template reste lisible.
- `:disabled="!inStock"` + texte « Rupture de stock » = WCAG (couleur **et** texte).
- `aria-label` sur le bouton avec le **nom** du produit : utile si un jour le bouton n’est plus qu’une icône. Ici le texte visible existe déjà ; le label redonde un peu, ce n’est pas grave.

## Les filtres : `components/ProductFilters.vue`

Chaque contrôle a un **`<label for>`**. Les `emit('update:query', ...)` sont le mécanisme des **v-model nommés**. Tu peux recoder ça au test les yeux fermés.

## Le store : `stores/cart.ts`

Relis en parallèle le cours 06.

- `add` : rupture → `false` ; même id → `quantity++` ; sinon push.
- `setQuantity` : `<= 0` → `remove` (l’input nombre du panier).
- `totalCents` passe par `cartTotalCents` (remise 10 % dès 50 €) : **la règle métier est testée sans Vue** dans `tests/algos.test.ts`. C’est du TDD sain : extraire la formule hors du composant.

## Panier et checkout

`CartView.vue` : liste, `formatPriceEur`, lien vers commande.

`CheckoutView.vue` :

- `reactive` formulaire ;
- `errors` en **computed** (formules, pas un tableau que tu oublies de vider) ;
- affichage des erreurs seulement après `submitted` (on ne crie pas tant que le user n’a pas tenté) ;
- `novalidate` : on gère le message, tout en gardant `required` pour le sémantique / autofill ;
- succès → `cart.clear()` + retour catalogue.

C’est un **mini tunnel**. En vrai La Poste : adresse, point relais, paiement, 409 stock, idempotence. Ici on entraîne la **forme**.

## Les types : `types/product.ts`

Le contrat. `CATEGORY_LABELS` : l’UI française d’un union TS. Une seule source pour le `<select>` et le libellé carte.

## Les algos : `algos/codingGame.ts`

Fonctions **pures** (même entrée → même sortie, pas de DOM). Le coding game puzzle JS, c’est ça. Lis `closestToZero` jusqu’à pouvoir le réécrire sur papier.

## Les exercices TestDome : `exercices/`

- `ImageGallery` : copie de prop + splice.
- `UserList` : push + reset des `v-model`.
- `LabeledInput` : slot + `for`/`id`.

Si le coding game n’est **pas** e-commerce, c’est **souvent** l’un de ces trois.

## Les tests : dossier `tests/`

Lance `npm test`. Lis un test **avant** le code qu’il couvre. C’est exactement TDD inversé pour apprendre : le test **raconte** le comportement.

## Ce qui n’est pas dans le mini-projet (volontairement)

Nuxt, GraphQL, Docker, Storybook, Cypress. Ce n’est pas un oubli : le coding game **tient** dans Vite + Vue + Pinia. Le **reste**, tu l’as dans les chapitres 5, 9, 12, 13, 15 pour le QCM et l’oral.

Quand un fichier du kit te paraît magique, reviens au chapitre du cours correspondant, puis relis le fichier. Deux passages valent mieux que dix tutos.
