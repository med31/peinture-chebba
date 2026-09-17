# Snippets à recoller les yeux fermés (jour J)

## 1. Page liste + filtre (Vue 3)

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

interface Item {
  id: string;
  name: string;
  price: number;
}

const q = ref("");
const loading = ref(true);
const error = ref<string | null>(null);
const items = ref<Item[]>([]);

onMounted(async () => {
  try {
    const res = await fetch("/api/items");
    if (!res.ok) throw new Error("http");
    items.value = await res.json();
  } catch {
    error.value = "Impossible de charger les données.";
  } finally {
    loading.value = false;
  }
});

const filtered = computed(() => {
  const needle = q.value.trim().toLowerCase();
  return items.value.filter((item) => item.name.toLowerCase().includes(needle));
});
</script>

<template>
  <label for="q">Recherche</label>
  <input id="q" v-model.trim="q" type="search" />
  <p v-if="loading" role="status">Chargement…</p>
  <p v-else-if="error" role="alert">{{ error }}</p>
  <p v-else-if="filtered.length === 0" role="status">Aucun résultat.</p>
  <ul v-else>
    <li v-for="item in filtered" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
```

## 2. Store Pinia panier

```ts
export const useCartStore = defineStore("cart", () => {
  const lines = ref<{ id: string; qty: number; price: number }[]>([]);
  const count = computed(() => lines.value.reduce((s, l) => s + l.qty, 0));
  const total = computed(() => lines.value.reduce((s, l) => s + l.qty * l.price, 0));
  function add(id: string, price: number) {
    const line = lines.value.find((l) => l.id === id);
    if (line) line.qty += 1;
    else lines.value.push({ id, qty: 1, price });
  }
  return { lines, count, total, add };
});
```

## 3. Nuxt page produit

```vue
<script setup lang="ts">
const route = useRoute();
const { data: product, error, pending } = await useFetch(`/api/products/${route.params.id}`);
useSeoMeta({ title: () => product.value?.name ?? "Produit" });
</script>
```

## 4. closestToZero

```ts
function closestToZero(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((best, n) => {
    if (Math.abs(n) < Math.abs(best)) return n;
    if (Math.abs(n) === Math.abs(best)) return Math.max(best, n);
    return best;
  });
}
```

## 5. GitLab job minimal

```yaml
test:
  image: node:22
  script:
    - npm ci
    - npm test
    - npm run build
```
