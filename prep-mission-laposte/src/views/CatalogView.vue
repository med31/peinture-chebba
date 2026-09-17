<script setup lang="ts">
/**
 * Page catalogue : assemble filtre + cartes, gère les 4 états (loading / erreur / vide / liste).
 * En Nuxt, fetchProducts() deviendrait un useFetch (cours 05). Ici SPA : onMounted.
 */
import { onMounted } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductFilters from "@/components/ProductFilters.vue";
import { useProducts } from "@/composables/useProducts";
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/product";

const { query, category, sort, loading, error, filtered, fetchProducts } = useProducts();
const cart = useCartStore();

onMounted(fetchProducts);

function addToCart(product: Product): void {
  cart.add(product);
}
</script>

<template>
  <section>
    <header class="catalog__intro">
      <h1>Catalogue e-commerce</h1>
      <p>
        Mini-projet type coding game : liste filtrable, états de chargement, panier Pinia,
        accessibilité et BEM.
      </p>
    </header>

    <ProductFilters v-model:query="query" v-model:category="category" v-model:sort="sort" />

    <p v-if="loading" role="status">Chargement du catalogue…</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <p v-else-if="filtered.length === 0" role="status">Aucun produit ne correspond à votre recherche.</p>
    <ul v-else class="catalog__grid">
      <li v-for="product in filtered" :key="product.id">
        <ProductCard :product="product" @add="addToCart" />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.catalog {
  &__intro {
    margin-bottom: 1.5rem;

    h1,
    p {
      margin-top: 0;
    }
  }

  &__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
}
</style>
