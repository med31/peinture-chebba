import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { CartItem, Product } from "@/types/product";
import { cartTotalCents } from "@/algos/codingGame";

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

  const totalCents = computed(() =>
    cartTotalCents(
      items.value.map((item) => ({
        unitPriceCents: item.product.priceCents,
        quantity: item.quantity,
      })),
    ),
  );

  const hasDiscount = computed(() => {
    const subtotal = items.value.reduce(
      (sum, item) => sum + item.product.priceCents * item.quantity,
      0,
    );
    return subtotal >= 5000;
  });

  function add(product: Product): boolean {
    if (product.stock <= 0) return false;
    const existing = items.value.find((item) => item.product.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) return false;
      existing.quantity += 1;
      return true;
    }
    items.value.push({ product, quantity: 1 });
    return true;
  }

  function setQuantity(productId: string, quantity: number): void {
    const item = items.value.find((entry) => entry.product.id === productId);
    if (!item) return;
    if (quantity <= 0) {
      remove(productId);
      return;
    }
    item.quantity = Math.min(quantity, item.product.stock);
  }

  function remove(productId: string): void {
    items.value = items.value.filter((item) => item.product.id !== productId);
  }

  function clear(): void {
    items.value = [];
  }

  return { items, count, totalCents, hasDiscount, add, setQuantity, remove, clear };
});
