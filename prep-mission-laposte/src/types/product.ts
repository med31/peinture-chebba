export type ProductCategory = "colis" | "affranchissement" | "emballage" | "boutique";

export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: ProductCategory;
  imageAlt: string;
  stock: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  colis: "Colis",
  affranchissement: "Affranchissement",
  emballage: "Emballage",
  boutique: "Boutique",
};
