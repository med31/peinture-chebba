# 06 — L’état : Pinia et Vuex

## Le problème

Tu as un badge « Panier (2) » dans le **header**, une liste dans la page **catalogue**, un total dans la page **panier**. Ces trois endroits doivent **voir la même vérité**.

Si chaque composant a son propre `ref([])`, ils **ne se parlent pas**.

Solutions, de la plus petite à la plus large :

1. **Props / emit** — OK pour un parent et un enfant (carte → catalogue).
2. **Provide / inject** — OK pour un thème, une locale, pas pour un panier métier.
3. **Store Pinia** — **la** solution Vue 3 pour un état partagé : panier, user connecté, préférences.

Analogie : le store est le **cahier de caisse** du magasin. Personne ne compte dans sa tête dans un rayon différent.

## Pinia (à maîtriser)

**Pinia** est le gestionnaire d’état **officiel** de Vue 3. Un store = une fonction `defineStore`.

Deux styles existent. On utilise le **style setup** (identique à un composable) :

```ts
export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);           // state
  const count = computed(() => /* ... */);     // getter
  function add(product: Product) { /* ... */ } // action
  return { items, count, add };
});
```

Dans un composant :

```ts
const cart = useCartStore();
const { count, items } = storeToRefs(cart); // indispensable pour garder la réactivité
cart.add(product);                          // les fonctions : PAS dans storeToRefs
```

### Le piège n°1 de tout QCM Pinia / Vuex

```ts
const { count } = useCartStore(); // count n’est PLUS réactif
```

Tu as **sorti** le nombre de la boîte. Le header ne bougera plus.

Correct : `storeToRefs`.

### Règles d’un bon store panier

- Une **seule** source de vérité (`items`).
- `count` et `total` sont des **computed**, pas des variables que tu incréments à la main (tu les oublierais).
- `add` refuse le stock 0 (règle métier dans le store, pas dans trois boutons).
- On ne met **pas** le HTML dans le store. Le store ne connaît pas les couleurs.

Dans le kit : `src/stores/cart.ts` + tests `tests/cart-store.test.ts`.

## Vuex (l’offre écrit « Vuex » / « Vueex »)

**Vuex** est l’ancien store, standard de Vue 2. Tu dois pouvoir le **mapper** en 20 secondes, même si tu codes Pinia.

| Vuex | Rôle | Équivalent Pinia |
|---|---|---|
| `state` | les données | `ref` / `reactive` |
| `getters` | valeurs dérivées | `computed` |
| `mutations` | changements **synchrones**, les **seules** autorisées à écrire le state | *n’existe plus* : tu mutes dans l’action |
| `actions` | async (appel API), elles `commit` une mutation | fonctions du store |
| `modules` | découper (cart, user) | **plusieurs stores** (`useCartStore`, `useUserStore`) |

Pourquoi Pinia a gagné : plus simple, meilleur TypeScript, plus besoin de mutations, Devtools propres.

Phrase orale :

> Sur du legacy Vue 2, je lis Vuex. Sur du Vue 3 / Nuxt 3, je pose Pinia, un store par domaine, et je migre module par module si besoin.

## Où ne PAS mettre l’état

- Le résultat d’un **filtre de recherche** : souvent local à la page (`useProducts`), ce n’est pas global.
- Un `v-model` de champ : local.
- Le **catalogue entier** : parfois cache dans un store, souvent `useFetch` de page (surtout en SSR).

Question à se poser : « est-ce que **deux pages** ont besoin de la même donnée en même temps ? » Oui → store. Non → composable / `ref` local.

## Persister le panier (oral, rarement le test)

`localStorage` survit au F5. Attention au SSR : `localStorage` n’existe pas sur le serveur. Lire au `onMounted` ou `import.meta.client`. Plugin fréquent : `pinia-plugin-persistedstate`.

À La Poste, le vrai panier est souvent **côté serveur** (compte, multi-device). Le front affiche, le POST commande est la vérité (stock 409).

Chapitre 7 : donner un contrat à ces objets avec TypeScript.
