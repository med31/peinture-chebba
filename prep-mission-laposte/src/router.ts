import { createRouter, createWebHistory } from "vue-router";
import CatalogView from "@/views/CatalogView.vue";
import CartView from "@/views/CartView.vue";
import CheckoutView from "@/views/CheckoutView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "catalog", component: CatalogView },
    { path: "/panier", name: "cart", component: CartView },
    { path: "/commande", name: "checkout", component: CheckoutView },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
