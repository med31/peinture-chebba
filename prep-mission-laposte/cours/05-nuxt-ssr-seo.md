# 05 — Nuxt, SSR, routes et SEO

## Le problème que Nuxt résout

Avec une **SPA Vue** pure :

1. le serveur envoie une page HTML **presque vide** (`<div id="app"></div>`) ;
2. le navigateur télécharge un gros fichier JS ;
3. Vue se réveille et **construit** le catalogue ;
4. **seulement là**, l’utilisateur et Google voient « Envoi Colis S ».

Sur un site **grand public** (La Poste), c’est grave :

- le client 4G voit un blanc (mauvais **LCP**, chapitre 18) ;
- Google indexe mal (mauvais **SEO** — Search Engine Optimization, le fait d’être trouvable sur Google).

**Nuxt** est un **méta-framework** : Vue + un serveur + des conventions de dossiers. Il peut **rendre le HTML du catalogue sur le serveur** et l’envoyer **déjà rempli**. Ensuite le navigateur « hydrates » : il attache les clics (ajouter au panier) sans tout reconstruire.

## Quatre modes, en français

| Nom | Ce qui se passe | Exemple La Poste |
|---|---|---|
| **CSR** (Client-Side Rendering) | tout est peint par le JS dans le navigateur | espace connecté, étape paiement |
| **SSR** (Server-Side Rendering) | le serveur fabrique le HTML **à chaque requête**, puis hydrate | fiche produit, home |
| **SSG** (Static Site Generation) | le HTML est fabriqué **au build**, fichiers statiques | mentions légales |
| **ISR / SWR** | HTML en cache, régénéré de temps en temps | catalogue qui bouge peu |

Phrase d’entretien :

> Catalogue et fiches en SSR (SEO + LCP). Tunnel de commande souvent plus CSR, car privé, pas indexé, très interactif.

## L’arborescence (convention = moins de config)

```
pages/index.vue              → URL /
pages/panier.vue             → URL /panier
pages/produits/[id].vue      → URL /produits/lp-colis-s
layouts/default.vue          → le chrome (header, footer)
components/ProductCard.vue   → auto-importé, pas besoin d’import
composables/useCart.ts       → auto-importé
stores/cart.ts               → Pinia
middleware/auth.ts           → garde avant d’entrer dans une page
server/api/products.get.ts   → URL /api/products côté serveur Nuxt
nuxt.config.ts               → la config
```

Les **crochets** `[id]` = paramètre dynamique. Dans la page :

```ts
const route = useRoute();
const id = route.params.id; // "lp-colis-s"
```

Tu n’installes pas Vue Router à la main : Nuxt le câble.

## `useFetch` vs `useAsyncData` vs `$fetch`

C’est **la** question QCM Nuxt.

### `useFetch("/api/products")`

À utiliser **dans le setup d’une page / composant**, pour un GET simple. Nuxt :

- lance l’appel **déjà sur le serveur** (SSR) ;
- envoie le résultat dans la page (**payload**) ;
- **ne refait pas** le même appel au moment de l’hydration (pas de double fetch).

```ts
const { data, pending, error, refresh } = await useFetch("/api/products");
```

- `data` = les produits (ref) ;
- `pending` = chargement ;
- `error` = échec réseau / HTTP ;
- `refresh` = relancer.

### `useAsyncData("clé", () => ...)`

Quand tu dois **combiner** deux appels, transformer, ou donner une **clé de cache** unique (`product-${id}`).

### `$fetch`

Le couteau suisse, **partout** : dans un clic, dans un store, dans un handler.

```ts
async function appliquerCode(code: string) {
  await $fetch("/api/coupon", { method: "POST", body: { code } });
}
```

**Interdit** : `useFetch` à l’intérieur d’un `@click`. `useFetch` est un composable de **setup**, pas une fonction d’événement.

## Hydration mismatch (piège)

Le HTML du serveur doit **matcher** le premier rendu navigateur. Sinon Vue râle.

Causes classiques :

- `Date.now()`, `Math.random()` pendant le render ;
- lire `window` ou `localStorage` pendant le render SSR (ça n’existe pas sur le serveur) ;
- un `v-if` qui dépend du fuseau horaire.

Correct : `import.meta.client` / `<ClientOnly>` pour le morceau « widget carte », `localStorage` dans `onMounted`.

## SEO avec Nuxt

```ts
useSeoMeta({
  title: "Envoi Colis S — La Poste",
  description: "Colis jusqu'à 2 kg, suivi inclus.",
  ogTitle: "Envoi Colis S",
  ogImage: "https://…/colis-s.jpg",
});
```

- **title** / **description** : onglet + Google.
- **og:*** : Open Graph, l’aperçu quand on partage sur WhatsApp / LinkedIn.

`html lang="fr"` : obligatoire, accessibilité + SEO France.

## `routeRules` (idée à citer)

Dans `nuxt.config.ts` tu peux dire : home en cache 60 s, tunnel sans SSR.

```ts
routeRules: {
  "/": { swr: 60 },
  "/commande/**": { ssr: false },
}
```

Tu n’as pas à le recoder au coding game. Tu dois **savoir que ça existe**.

## Nuxt 2 vs Nuxt 3

L’offre dit « Nuxt.js » sans version. En 2026, une modernisation BGPN = **Nuxt 3** (Vue 3, Vite, Pinia). Du **Nuxt 2** (Vue 2, Webpack, Vuex) peut rester en legacy. À l’oral : « je suis Nuxt 3, je sais lire du Nuxt 2 ».

Notre mini-projet du kit est une **SPA Vite** (plus simple à lancer pour s’entraîner). Les **idées** SSR, tu les as dans ce chapitre et les QCM. Si le coding game est Nuxt, remplace `onMounted + fetch` par `useFetch`.

Chapitre 6 : où vit le panier.
