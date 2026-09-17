/**
 * Composable : logique du catalogue (chargement + filtre + tri) réutilisable.
 * Ce n’est PAS un store : une seule page s’en sert. Cours : 04-composition-api.md
 * `filtered` est un computed (formule), pas un watch.
 */
import { computed, ref } from "vue";
import { PRODUCTS } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export function useProducts() {
  const query = ref("");
  const category = ref<ProductCategory | "all">("all");
  const sort = ref<SortKey>("featured");
  const loading = ref(false);
  const error = ref<string | null>(null);
  const products = ref<Product[]>([]);

  async function fetchProducts(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      await new Promise((resolve) => setTimeout(resolve, 250));
      products.value = PRODUCTS;
    } catch {
      error.value = "Impossible de charger le catalogue.";
    } finally {
      loading.value = false;
    }
  }

  const filtered = computed(() => {
    const needle = query.value.trim().toLowerCase();
    const list = products.value.filter((product) => {
      const matchCategory = category.value === "all" || product.category === category.value;
      const matchQuery =
        needle.length === 0 ||
        product.name.toLowerCase().includes(needle) ||
        product.description.toLowerCase().includes(needle);
      return matchCategory && matchQuery;
    });

    return [...list].sort((a, b) => {
      if (sort.value === "price-asc") return a.priceCents - b.priceCents;
      if (sort.value === "price-desc") return b.priceCents - a.priceCents;
      if (sort.value === "name") return a.name.localeCompare(b.name, "fr");
      return Number(b.featured) - Number(a.featured);
    });
  });

  return { query, category, sort, loading, error, products, filtered, fetchProducts };
}
