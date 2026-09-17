<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "@/types/product";
import { CATEGORY_LABELS } from "@/types/product";
import { formatPriceEur } from "@/algos/codingGame";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  add: [product: Product];
}>();

const price = computed(() => formatPriceEur(props.product.priceCents));
const inStock = computed(() => props.product.stock > 0);
</script>

<template>
  <article class="product-card" :class="{ 'product-card--out': !inStock }">
    <div class="product-card__visual" aria-hidden="true">{{ product.name.charAt(0) }}</div>
    <div class="product-card__body">
      <p class="product-card__category">{{ CATEGORY_LABELS[product.category] }}</p>
      <h2 class="product-card__title">{{ product.name }}</h2>
      <p class="product-card__desc">{{ product.description }}</p>
      <p class="product-card__price">{{ price }}</p>
      <p v-if="!inStock" class="product-card__stock" role="status">Rupture de stock</p>
      <button
        class="product-card__cta"
        type="button"
        :disabled="!inStock"
        :aria-label="`Ajouter ${product.name} au panier`"
        @click="emit('add', product)"
      >
        Ajouter au panier
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(26, 26, 26, 0.08);
  overflow: hidden;
  min-height: 100%;

  &--out {
    opacity: 0.7;
  }

  &__visual {
    background: linear-gradient(135deg, #ffc100, #ffe27a);
    height: 120px;
    display: grid;
    place-items: center;
    font-size: 2.5rem;
    font-weight: 700;
  }

  &__body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    flex: 1;
  }

  &__category {
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 0.75rem;
    color: #5c5c5c;
  }

  &__title {
    margin: 0;
    font-size: 1.1rem;
  }

  &__desc,
  &__price,
  &__stock {
    margin: 0;
  }

  &__price {
    font-weight: 700;
    margin-top: auto;
  }

  &__stock {
    color: #b42318;
    font-size: 0.9rem;
  }

  &__cta {
    margin-top: 0.5rem;
    border: 0;
    background: #1a1a1a;
    color: #fff;
    border-radius: 8px;
    padding: 0.6rem 0.8rem;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      background: #9a9a9a;
    }

    &:focus-visible {
      outline: 3px solid #ffc100;
      outline-offset: 2px;
    }
  }
}
</style>
