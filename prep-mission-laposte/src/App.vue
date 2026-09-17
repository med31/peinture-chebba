<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCartStore } from "@/stores/cart";

const cart = useCartStore();
const { count } = storeToRefs(cart);
</script>

<template>
  <div class="app-shell">
    <header class="app-shell__header">
      <RouterLink class="app-shell__brand" to="/" aria-label="Boutique La Poste, retour accueil">
        <span class="app-shell__logo" aria-hidden="true">LP</span>
        Boutique e-commerce
      </RouterLink>
      <nav class="app-shell__nav" aria-label="Navigation principale">
        <RouterLink to="/">Catalogue</RouterLink>
        <RouterLink to="/panier">
          Panier
          <span class="app-shell__badge" aria-live="polite">{{ count }}</span>
        </RouterLink>
      </nav>
    </header>
    <main class="app-shell__main" id="contenu-principal">
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-shell {
  min-height: 100vh;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #1a1a1a;
    color: #fff;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: 700;
    text-decoration: none;
  }

  &__logo {
    background: #ffc100;
    color: #1a1a1a;
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 6px;
    font-size: 0.85rem;
  }

  &__nav {
    display: flex;
    gap: 1.25rem;

    a {
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;

      &.router-link-active {
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  }

  &__badge {
    background: #ffc100;
    color: #1a1a1a;
    border-radius: 999px;
    min-width: 1.4rem;
    padding: 0 0.35rem;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 700;
  }

  &__main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1.5rem;
  }
}
</style>
