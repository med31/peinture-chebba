# 04 — Composition API : le cœur du coding game

La **Composition API**, c’est la façon Vue 3 d’organiser la logique **par fonction**, dans `<script setup>`, au lieu de cases `data` / `methods` / `computed` de l’Options API.

Pourquoi ils l’aiment : tu regroupes « tout ce qui concerne le panier » au même endroit, tu **réutilises** cette logique dans un **composable** (`useProducts`, `useCart`), et TypeScript s’y retrouve.

## `ref` : une boîte dont Vue surveille le contenu

```ts
import { ref } from "vue";

const count = ref(0);
count.value += 1; // en script, TOUJOURS .value
```

Dans le **template**, Vue **déballe** tout seul : tu écris `{{ count }}`, pas `{{ count.value }}`.

Analogie : `ref` est une **boîte**. Vue surveille la boîte. Si tu sors l’objet de la boîte (`const n = count` puis tu n’utilises plus `count`), Vue ne voit plus les changements. D’où le piège **destructuration** avec Pinia (chapitre 6).

`ref` marche pour : un nombre, une string, un booléen, un tableau, un objet.

## `reactive` : un objet déjà « magique »

```ts
import { reactive } from "vue";

const form = reactive({ email: "", name: "" });
form.email = "a@b.c"; // pas de .value
```

Règle simple le jour J :

- primitive (`0`, `""`, `true`) → **`ref`** ;
- formulaire à 3 champs → **`reactive`** ou un `ref({ ... })` ;
- **en cas de doute, `ref` partout**.

Piège : `const { email } = form` **casse** la réactivité (tu as copié la string, plus l’objet magique). Utiliser `toRefs(form)` si tu dois destructurer.

## `computed` : une valeur **dérivée**, toujours à jour

```ts
const totalCents = computed(() => qty.value * priceCents.value);
```

Tu **ne stockes pas** le total à la main. Tu le **décris**. Vue le recalcule quand `qty` ou `priceCents` change, et **seulement** à ce moment (cache).

Règle : **pas d’effet de bord** dans un `computed` (pas de `fetch`, pas de `console.log` métier, pas de `array.push`). Un computed est une **formule**, comme dans Excel.

C’est **la** bonne place pour : filtre de catalogue, total panier, `isValid` d’un formulaire, libellé « 2 articles ».

## `watch` et `watchEffect` : réagir à un changement

```ts
watch(query, (next, prev) => {
  // lancer une recherche API, avec debounce
});
```

- `watch` : tu **choisis** la source. Ne s’exécute **pas** tout de suite (sauf `{ immediate: true }`).
- `watchEffect` : Vue **devine** les dépendances en exécutant la fonction **immédiatement**, puis à chaque fois qu’une dépendance change.

Pour un filtre **local** (tableau déjà en mémoire) : **`computed`**, pas `watch`.
Pour appeler une API quand la recherche change : **`watch`** + debounce.

## Les props

```ts
const props = defineProps<{
  product: Product;
  compact?: boolean; // optionnel
}>();
```

`?` = le parent peut ne pas l’envoyer. En template tu utilises `product` directement (unwrap). En script : `props.product`.

Les props sont **en lecture seule**.

## Les événements (`emit`)

```ts
const emit = defineEmits<{
  add: [product: Product];
}>();

emit("add", props.product);
```

Le parent écrit `@add="cart.add"` (ou `@add="onAdd"`). C’est le **contrat** : l’enfant dit « add », il n’importe pas le store s’il peut l’éviter. Un composant **bête** (carte) est plus testable et plus Storybook-friendly.

## `v-model` sur un composant

`v-model` sur un `<input>` natif = la valeur **et** les frappes.

Sur **ton** composant, ça veut dire par convention :

- le parent passe `modelValue` ;
- l’enfant émet `update:modelValue`.

Vue 3.4+ : `const model = defineModel<string>()`. Dans le kit, `ProductFilters` utilise `v-model:query` (un **v-model nommé**) : le parent écrit `v-model:query="query"`, l’enfant émet `update:query`.

## Cycle de vie

Un composant **naît**, s’**affiche**, se **met à jour**, **meurt**.

| Hook | Quand | Usage typique |
|---|---|---|
| `onMounted` | le HTML du composant est dans la page | `fetch` en SPA, mesurer un élément |
| `onUnmounted` | le composant disparaît | `clearTimeout`, enlever un listener |
| `onUpdated` | après un re-render | rare ; souvent un `watch` suffit |

En **Nuxt SSR**, `onMounted` **ne tourne que dans le navigateur**, pas sur le serveur. D’où : ne pas mettre le fetch SEO uniquement dans `onMounted` (chapitre 5).

## Un composable : `useQuelqueChose`

Un **composable** est une fonction qui **utilise** `ref` / `computed` et les **retourne**. Convention : préfixe `use`.

```ts
export function useProducts() {
  const query = ref("");
  const filtered = computed(() => /* ... */);
  return { query, filtered };
}
```

Dans deux pages, tu réutilises la même logique. C’est **mieux** qu’un mixin Vue 2 (illisibles, collisions de noms).

Dans le kit : `src/composables/useProducts.ts` charge le catalogue, filtre, trie.

## Options API en 30 secondes (si le test est vieux)

```js
export default {
  props: ["links"],
  data() {
    return { images: [...this.links] };
  },
  computed: {
    count() { return this.images.length; },
  },
  methods: {
    remove(i) { this.images.splice(i, 1); },
  },
  mounted() {},
};
```

Équivalences : `data` ≈ `ref`, `computed` = `computed`, `methods` = `function`, `mounted` = `onMounted`.

Chapitre 5 : Nuxt pose ce moteur Vue **sur un serveur**, pour le SEO.
