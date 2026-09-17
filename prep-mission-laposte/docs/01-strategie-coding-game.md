# 01 — Stratégie pour réussir le coding game

> Avant ce document : lis le **cours** (`cours/README.md`). Ici on parle **tactique de test**, pas des bases.


## 1. À quoi ça ressemble vraiment

Pour une mission **Vue.js / Nuxt e-commerce La Poste**, le « coding game » est en général **CodinGame for Work** (parfois CoderPad / TestDome / un take-home). Trois briques reviennent :

### A. QCM (15–25 min)
Vue 3, JS/TS, parfois CSS, parfois Nuxt. Questions piège :
- `ref` vs `reactive`, destructuration qui casse la réactivité
- `computed` vs `watch` vs `watchEffect`
- `v-model` sur un composant enfant
- hydration SSR / `useFetch` vs `onMounted` + `fetch`
- `key` dans un `v-for`

### B. Puzzle JS (10–25 min) — style CodinGame
Lecture stdin / fonction à implémenter. Les classiques :
- **Temperatures** : plus proche de 0, positif en cas d’égalité, `[] → 0`
- **Horse-Racing Duals** : écart min après tri
- **MIME Type** : map extension → type, casse, pas d’extension
- Calcul de panier / remise / groupBy

Règle d’or : **lire TOUS les cas de test avant d’écrire**. Le dernier cas casse presque toujours (tableau vide, égalité, `0` déjà présent).

### C. Mini-app Vue (30–60 min) — c’est ça qui recrute
Un énoncé du type :

> Afficher une liste (produits / colis / utilisateurs) depuis une API ou un tableau. Filtrer. Ajouter au panier / favoris. Gérer les états. Parfois un formulaire.

C’est **exactement** le mini-projet de ce kit (catalogue + panier + checkout).

## 2. Barème invisible (ce qu’ils notent vraiment)

| Ils veulent voir | Ils pénalisent |
|---|---|
| MVP qui marche de bout en bout | Architecture over-engineered, rien n’est cliquable |
| Composition API + TS | Options API 2018, `any` partout |
| `computed` pour le dérivé | recopier la logique dans le template |
| états empty / loading / error | `undefined is not iterable` |
| labels, bouton disabled, focus | `<div @click>` sans clavier |
| BEM ou classes stables | CSS inline spaghetti |
| Pinia (ou un store propre) | props drill de 4 niveaux |
| tests s’ils sont fournis | ignorer les tests rouges |

Pour un profil **5 ans + encadrement**, on attend aussi :
- nommage clair
- petits composants
- un commentaire **pourquoi** (pas **quoi**) si un choix n’est pas évident
- tu n’installes pas 12 libs pour un filtre

## 3. Plan de bataille le jour J (60 minutes chrono)

**0–4 min — lire l’énoncé 2 fois, lister les AC**
Écris en commentaire en haut du fichier :

```ts
// AC: liste, filtre nom, add cart, qty, total, empty state
```

**4–8 min — squelette**
- types
- store ou `ref`
- composant liste + carte
- rien de joli encore

**8–35 min — happy path**
Faire passer les tests / le scénario principal. Ne pas styler.

**35–48 min — edge cases**
Stock 0, recherche vide, API en erreur, quantité max, remise.

**48–58 min — polish scorable**
- labels `for`/`id`
- `:key` stables (id, pas index)
- `disabled` + `aria-label`
- BEM sur 3 classes
- `formatPrice` en EUR

**58–60 min — relire**
Console errors, tests, fautes de nommage.

Si tu n’as que 30 min : **happy path + empty + types**. Pas de checkout.

## 4. Modèle mental à coller sur l’écran

```
API / mock  →  composable (loading, error, data)
                    ↓
              vue (filtre, tri)  via computed
                    ↓
              store Pinia (panier)  source de vérité
                    ↓
              composants bêtes (props + emit)
```

Interdit : fetcher dans 3 composants différents. Interdit : calculer le total dans le template avec 4 `v-if`.

## 5. Snippets à savoir taper les yeux fermés

### Composant + v-model
```vue
<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>
<template>
  <input :value="model" @input="model = ($event.target as HTMLInputElement).value" />
</template>
```

Ou Vue 3.4+ : `<input v-model="model" />` avec `defineModel`.

### Fetch propre (SPA coding game)
```ts
const loading = ref(true);
const error = ref<string | null>(null);
const items = ref<Product[]>([]);

onMounted(async () => {
  try {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("HTTP " + res.status);
    items.value = await res.json();
  } catch (e) {
    error.value = "Catalogue indisponible";
  } finally {
    loading.value = false;
  }
});
```

### Fetch Nuxt (si le test est Nuxt)
```ts
const { data, pending, error, refresh } = await useFetch<Product[]>("/api/products");
```
**Ne jamais** fetcher uniquement dans `onMounted` en Nuxt si tu veux du SSR / SEO.

### Filtre + tri
```ts
const filtered = computed(() =>
  items.value
    .filter((p) => p.name.toLowerCase().includes(q.value.toLowerCase()))
    .sort((a, b) => a.price - b.price),
);
```

## 6. Pièges qui font rater le test

1. **Destructurer un `reactive` / un store** sans `storeToRefs` → plus de réactivité.
2. **Muter une prop**. Toujours copier : `ref([...props.links])`.
3. **`:key="index"`** alors que la liste se réordonne / se filtre.
4. **Oublier `type="button"`** dans un formulaire → submit reload.
5. **Comparer des prix en `float`**. Travaille en **centimes** (`1990` pas `19.90`).
6. **`JSON.parse` sans try/catch**.
7. **Styliser pendant 20 min** avant que le filtre marche.
8. **Installer Vuex** sur un test Vue 3. C’est **Pinia**. Vuex = tu dois juste savoir le mapping (`state/getters/mutations/actions`).
9. **Ignorer l’accessibilité** alors que WCAG 2.1 est dans la fiche de poste. Un `label` et un `button` natif suffisent à marquer des points.
10. **Tricher avec une IA pendant un test proctorisé**. CodinGame / TestDome flaggent le copier-coller et le focus perdu. Tu dois arriver **autonome**.

## 7. Ce que tu t’entraînes à faire ici

- `npm test` : algos + galerie + user list + panier Pinia.
- `npm run dev` : coding game e-commerce complet.
- Relis les cheatsheets à voix haute : si tu hésites 5 secondes sur `useAsyncData` vs `useFetch`, tu n’es pas prêt pour le QCM.

## 8. Après le coding game

Le test technique n’est qu’un filtre. La mission se joue ensuite sur :
- design system (Frontify / Figma / Storybook)
- SSR / perf / SEO colis & boutique
- GitLab CI + Docker
- encadrement des confirmés

Prépare ça dans `06-entretien-oral.md`. Ne te présente pas comme « un codeur Vue ». Présente-toi comme **un front e-commerce qui livre de l’expérience client mesurable**.
