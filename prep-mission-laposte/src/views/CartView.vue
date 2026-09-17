<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { formatPriceEur } from "@/algos/codingGame";

const cart = useCartStore();
const { items, totalCents, hasDiscount, count } = storeToRefs(cart);
</script>

<template>
  <section>
    <h1>Votre panier</h1>
    <p v-if="count === 0" role="status">
      Panier vide.
      <RouterLink to="/">Continuer vos achats</RouterLink>
    </p>
    <template v-else>
      <ul class="cart-list">
        <li v-for="item in items" :key="item.product.id" class="cart-list__item">
          <div>
            <h2>{{ item.product.name }}</h2>
            <p>{{ formatPriceEur(item.product.priceCents) }} / unité</p>
          </div>
          <div class="cart-list__actions">
            <label :for="`qty-${item.product.id}`">Quantité</label>
            <input
              :id="`qty-${item.product.id}`"
              type="number"
              min="0"
              :max="item.product.stock"
              :value="item.quantity"
              @change="cart.setQuantity(item.product.id, Number(($event.target as HTMLInputElement).value))"
            />
            <button type="button" @click="cart.remove(item.product.id)">Retirer</button>
          </div>
        </li>
      </ul>
      <p v-if="hasDiscount" class="cart-list__discount" role="status">Remise 10 % appliquée dès 50 €</p>
      <p class="cart-list__total"><strong>Total : {{ formatPriceEur(totalCents) }}</strong></p>
      <RouterLink class="cart-list__checkout" to="/commande">Passer commande</RouterLink>
    </template>
  </section>
</template>

<style scoped lang="scss">
.cart-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__item {
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      width: 4rem;
    }
  }

  &__total,
  &__discount {
    margin-top: 1rem;
  }

  &__discount {
    color: #067647;
  }

  &__checkout {
    display: inline-block;
    margin-top: 0.5rem;
    background: #1a1a1a;
    color: #fff;
    text-decoration: none;
    padding: 0.7rem 1rem;
    border-radius: 8px;
  }
}
</style>
