import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";
import { useCartStore } from "@/stores/cart";

describe("useCartStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("refuse un produit en rupture", () => {
    const cart = useCartStore();
    const outOfStock = PRODUCTS.find((product) => product.stock === 0)!;
    expect(cart.add(outOfStock)).toBe(false);
    expect(cart.count).toBe(0);
  });

  it("augmente la quantité du même produit", () => {
    const cart = useCartStore();
    const product = PRODUCTS[0];
    cart.add(product);
    cart.add(product);
    expect(cart.items[0].quantity).toBe(2);
    expect(cart.count).toBe(2);
  });

  it("applique la remise à 50 €", () => {
    const cart = useCartStore();
    const expensive = PRODUCTS.find((product) => product.priceCents >= 1890)!;
    cart.add(expensive);
    cart.add(expensive);
    cart.add(expensive);
    expect(cart.hasDiscount).toBe(true);
    expect(cart.totalCents).toBe(Math.round(expensive.priceCents * 3 * 0.9));
  });
});
