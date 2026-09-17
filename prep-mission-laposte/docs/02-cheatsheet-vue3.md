# 02 — Cheatsheet Vue 3 (à mémoriser)

Écris ces patterns de mémoire. C’est 80 % du coding game Vue.

## Script setup + TypeScript

```vue
<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ title: string; count?: number }>();
const emit = defineEmits<{ increment: [value: number]; }>();

const local = ref(props.count ?? 0);
const doubled = computed(() => local.value * 2);

function onClick() {
  local.value += 1;
  emit("increment", local.value);
}
</script>
```

- Props = descendantes, **immuables**.
- Events = remontent.
- `v-model` custom = `modelValue` + `update:modelValue` (ou `defineModel()`).

## ref vs reactive

| | `ref` | `reactive` |
|---|---|---|
| Primitive | **oui** (`ref(0)`) | non (il boxe un objet) |
| Objet / array | ok (`ref([])`) | ok |
| Accès | `.value` en script | direct |
| Template | auto-unwrap | auto-unwrap |
| Destructuration | `storeToRefs` / `toRefs` | **casse la réactivité** |

Règle simple le jour J : **`ref` partout**, `reactive` seulement pour un formulaire.

```ts
const form = reactive({ email: "", name: "" });
form.email = "a@b.c"; // OK
```

## Directives à connaître

```vue
<p v-if="loading">…</p>
<p v-else-if="error">…</p>
<ul v-else>
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</ul>
<img :src="url" :alt="item.name" />
<button @click="add(item)">Ajouter</button>
<input v-model.trim="q" />
<input v-model.number="qty" type="number" />
<p v-show="open">reste dans le DOM</p>
```

- `v-if` = montage / démontage.
- `v-show` = `display`. Pour un paragraphe toggle : `v-show` suffit (exercice TestDome).

## computed / watch / watchEffect

```ts
const total = computed(() => qty.value * price.value); // dérivé pur, synchrone

watch(q, (next, prev) => {
  // appel API, debounce
});

watchEffect(() => {
  console.log(cart.count); // s’exécute tout de suite + à chaque dep
});
```

QCM piège : **ne pas** mettre de side-effect dans `computed` (fetch, `push` dans un array).

## Cycle de vie (Composition API)

```ts
onBeforeMount(() => {});
onMounted(() => {});      // DOM prêt — fetch SPA ici
onBeforeUpdate(() => {});
onUpdated(() => {});
onBeforeUnmount(() => {});
onUnmounted(() => {});    // clearTimeout, removeEventListener
```

Nuxt : préfère `useAsyncData` / `callOnce` au `onMounted` pour le SEO.

## Composant enfant / parent

```vue
<!-- Parent -->
<ProductCard :product="p" @add="cart.add" />

<!-- Enfant -->
<script setup lang="ts">
defineProps<{ product: Product }>();
defineEmits<{ add: [product: Product] }>();
</script>
```

Provide / inject seulement si 3+ niveaux (theme, locale), pas pour un panier.

## Slots

```vue
<label :for="id"><slot /></label>
```

`LabeledInput` : le texte du label vient du slot, l’`id` de la prop. Relier `for` et `id` = point accessibilité gratuit.

## Formulaires

```vue
<form @submit.prevent="onSubmit" novalidate>
  <label for="email">Email</label>
  <input id="email" v-model.trim="email" type="email" autocomplete="email" />
  <p v-if="submitted && errors.email" role="alert">{{ errors.email }}</p>
  <button type="submit">Envoyer</button>
</form>
```

Toujours `@submit.prevent`. Toujours `type="button"` sur les boutons qui ne soumettent pas.

## Réactivité : pièges QCM

```ts
const state = reactive({ list: [1] });
state.list.push(2);          // OK Vue 3
state.list = [...state.list, 3]; // OK

const n = ref(0);
n.value++;                   // obligatoire en script

const { count } = store;     // PERDU la réactivité
const { count } = storeToRefs(store); // OK
```

Vue 3 n’a plus le piège Vue 2 `Vue.set`. Mais **destructurer un `ref` objet interne** sans `toRefs` reste un piège.

## Performance front (ils en parlent dans la fiche)

- `v-once` / `v-memo` rarement utiles en test.
- `:key` stable.
- `computed` pour filtres (pas recalculer dans le template 12 fois).
- images : `width`/`height`, `loading="lazy"` hors LCP.
- listes longues : pas de virtual scroll le jour J sauf si demandé.
- éviter les watchers qui refetch à chaque keypress → `debounce` 300 ms.

## Vuex (ils écrivent « Vueex » / Vuex dans l’offre)

Tu dois pouvoir le recaser en 20 secondes :

```
state     → données
getters   → computed
mutations → sync, seules à modifier le state (Vuex 3)
actions   → async, commit des mutations
modules   → namespaced
```

En Vue 3 + Nuxt 3 : **Pinia remplace Vuex**. Mapping mental : `state+getters` = `ref/computed` du store, `actions` = fonctions. Pas de mutations.

## Options API (si l’IDE du test est coincé en Vue 2)

```js
export default {
  props: ["links"],
  data() {
    return { images: [...this.links] };
  },
  methods: {
    remove(i) {
      this.images.splice(i, 1);
    },
  },
};
```

Si le coding game charge Vue via un CDN sans build : Options API + pas d’import. Entraîne-toi aux deux.

## Recette ImageGallery (exercice classique)

1. Copier la prop dans un `ref` local.
2. `v-for` + classe `.image`.
3. `@click` → `splice(index, 1)`.
4. Ne pas muter `props.links` directement.
