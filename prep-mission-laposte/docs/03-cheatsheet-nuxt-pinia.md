# 03 — Cheatsheet Nuxt 3, Pinia, API, SSR, perf, SEO

Cœur de la fiche de poste. Même si le coding game est une SPA Vite, **le QCM et l’oral** portent là-dessus.

## Arborescence Nuxt 3 à réciter

```
app.vue
nuxt.config.ts
pages/                 → file-based routing
  index.vue            → /
  produits/[id].vue    → /produits/:id
layouts/default.vue
components/            → auto-import
composables/useX.ts    → auto-import
stores/cart.ts         → Pinia
middleware/auth.ts
server/api/products.ts → /api/products
public/
```

Routes dynamiques : `pages/colis/[tracking].vue` → `const route = useRoute(); route.params.tracking`.

## SSR / CSR / SSG / ISR

| Mode | Quand | SEO | Exemple La Poste |
|---|---|---|---|
| **SSR** (`ssr: true`, défaut Nuxt) | HTML à chaque requête | excellent | fiche produit, home |
| **SSG** (`nuxt generate`) | HTML au build | excellent, moins frais | pages légales |
| **CSR** (`ssr: false`) | SPA | mauvais | espace connecté, tunnel |
| **ISR / SWR** (route rules) | cache + revalidate | bon | catalogue qui bouge |

Phrase à dire :
> Sur un site e-commerce, le catalogue et les fiches sont en SSR pour le SEO et le LCP. Le tunnel de commande peut rester plus client-side, authentifié, sans indexer les étapes panier.

## `useFetch` vs `useAsyncData` vs `$fetch`

```ts
// Cas standard composant / page : GET, dédupliqué, SSR-friendly
const { data, pending, error, refresh } = await useFetch("/api/products", {
  query: { q: search },
  watch: [search],
});

// Quand tu transforms / appelles plusieurs sources
const { data } = await useAsyncData("product-42", () => $fetch("/api/products/42"));

// Hors setup (event handler, store) : PAS de SSR auto
async function addCoupon(code: string) {
  return await $fetch("/api/coupon", { method: "POST", body: { code } });
}
```

Pièges :
- `useFetch` dans une fonction appelée au click = anti-pattern. Utiliser `$fetch`.
- Double fetch hydration : **ne pas** refaire le fetch dans `onMounted` si `useFetch` a déjà tourné au SSR.
- Clé `useAsyncData` unique par ressource (`product-${id}`).

## SEO Nuxt

```ts
useSeoMeta({
  title: product.value?.name ?? "Catalogue",
  description: product.value?.description,
  ogTitle: product.value?.name,
  ogImage: product.value?.image,
});

useHead({
  htmlAttrs: { lang: "fr" },
  link: [{ rel: "canonical", href: url }],
});
```

Core Web Vitals à citer : **LCP, INP, CLS**. Levier e-commerce :
- SSR du HTML au-dessus de la ligne de flottaison
- images dimensions fixes (pas de CLS)
- peu de JS au boot (Nuxt payloads, pas d’hydrate inutile → `ClientOnly` pour le chat, le carousel lourd)
- cache CDN / `routeRules`

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    "/": { swr: 60 },
    "/produits/**": { swr: 300 },
    "/commande/**": { ssr: false },
  },
});
```

## Pinia (à maîtriser)

```ts
export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
  function add(product: Product) { /* ... */ }
  return { items, count, add };
});
```

Dans un composant :

```ts
const cart = useCartStore();
const { count, items } = storeToRefs(cart); // état
cart.add(product);                          // actions : pas de storeToRefs
```

Persistance (souvent demandée à l’oral, rarement au test) : plugin `pinia-plugin-persistedstate` ou `localStorage` dans un `watch`, attention au SSR (`import.meta.client`).

## REST vs GraphQL

Fiche de poste : les deux.

**REST** (le plus probable dans le test) :
```ts
await $fetch("/api/products", { query: { category: "colis" } });
await $fetch("/api/cart/items", { method: "POST", body: { sku, qty } });
```
Codes : 200 liste, 201 create, 400 validation, 401/403, 404, 409 stock, 422, 500. Afficher un message métier, pas le stack.

**GraphQL** :
```graphql
query Products($q: String) {
  products(search: $q) {
    id
    name
    priceCents
    stock
  }
}
```
Avantage : pas de over-fetch sur une fiche produit riche. Inconvénient : cache, erreurs partielles (`errors[]` + `data`), N+1 côté BFF. Citer **BFF / API Gateway** dans une archi micro-services La Poste : le front ne parle pas à 12 micro-services, il parle à une API agrégée.

## Micro-services / micro-fronts (oral)

Phrase utile :
> Le métier e-commerce est découpé (catalogue, panier, paiement, suivi colis). Le front Nuxt consomme des APIs via un BFF. Sur la DT, on voit aussi des **micro-fronts** (Storybook + design system) pour partager les composants (header, tracking, tunnel) entre sites BGPN, sans dupliquer le DS.

Ne pas raconter Kubernetes. Parler **contrats d’API, versioning, feature flags, déploiements indépendants**.

## Vite vs Webpack

| | Vite | Webpack |
|---|---|---|
| Dev | ESM natif, ultra rapide | bundle complet |
| Prod | Rollup | Webpack |
| Nuxt 3 | **Vite par défaut** | Nuxt 2 = Webpack |

Savoir : `vite.config.ts`, alias `@`, `env` (`import.meta.env.VITE_*`), code splitting par route (Vue Router / Nuxt pages = auto).

## GitLab CI — snippet à connaître

```yaml
stages: [install, test, build]

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths: [node_modules/]

test:
  stage: test
  image: node:22
  script:
    - npm ci
    - npm run test
    - npm run lint

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths: [.output/]  # Nuxt
```

Docker : image Node pour le build, nginx ou node pour servir `.output/public` (SSG) ou `node .output/server/index.mjs` (SSR).

## Storybook

Un composant = une story. Le DS La Poste (Frontify / Figma) arrive dans Storybook : states (default, hover, disabled, error), a11y addon, pas de logique métier dans l’UI kit.

```ts
// ProductCard.stories.ts (idée)
export const InStock = { args: { product: mockInStock } };
export const OutOfStock = { args: { product: mockEmpty } };
```
