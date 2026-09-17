<script setup lang="ts">
import type { ProductCategory } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import type { SortKey } from "@/composables/useProducts";

defineProps<{
  query: string;
  category: ProductCategory | "all";
  sort: SortKey;
}>();

const emit = defineEmits<{
  "update:query": [value: string];
  "update:category": [value: ProductCategory | "all"];
  "update:sort": [value: SortKey];
}>();
</script>

<template>
  <form class="product-filters" @submit.prevent>
    <div class="product-filters__field">
      <label for="search">Rechercher</label>
      <input
        id="search"
        type="search"
        :value="query"
        placeholder="Colis, timbre, carton…"
        @input="emit('update:query', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="product-filters__field">
      <label for="category">Catégorie</label>
      <select
        id="category"
        :value="category"
        @change="emit('update:category', ($event.target as HTMLSelectElement).value as ProductCategory | 'all')"
      >
        <option value="all">Toutes</option>
        <option v-for="(label, key) in CATEGORY_LABELS" :key="key" :value="key">
          {{ label }}
        </option>
      </select>
    </div>
    <div class="product-filters__field">
      <label for="sort">Trier</label>
      <select
        id="sort"
        :value="sort"
        @change="emit('update:sort', ($event.target as HTMLSelectElement).value as SortKey)"
      >
        <option value="featured">Mis en avant</option>
        <option value="price-asc">Prix croissant</option>
        <option value="price-desc">Prix décroissant</option>
        <option value="name">Nom</option>
      </select>
    </div>
  </form>
</template>

<style scoped lang="scss">
.product-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    input,
    select {
      border: 1px solid #d4d0c8;
      border-radius: 8px;
      padding: 0.55rem 0.7rem;
      background: #fff;
    }
  }
}
</style>
