import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";
import { useCartStore } from "@/stores/cart";
import ImageGallery from "@/exercices/ImageGallery.vue";
import UserList from "@/exercices/UserList.vue";
import LabeledInput from "@/exercices/LabeledInput.vue";
import ProductCard from "@/components/ProductCard.vue";

describe("ImageGallery", () => {
  it("supprime l'image cliquée", async () => {
    const wrapper = mount(ImageGallery, {
      props: { links: ["https://a.png", "https://b.png"] },
    });
    await wrapper.findAll(".remove")[0].trigger("click");
    expect(wrapper.findAll("img")).toHaveLength(1);
    expect(wrapper.find("img").attributes("src")).toBe("https://b.png");
  });
});

describe("UserList", () => {
  it("ajoute un utilisateur et vide les champs", async () => {
    const wrapper = mount(UserList);
    const inputs = wrapper.findAll("input");
    await inputs[0].setValue("Ann");
    await inputs[1].setValue("Franklin");
    await wrapper.find("button").trigger("click");
    const cells = wrapper.findAll("tbody td");
    expect(cells.map((cell) => cell.text())).toEqual(["1", "Ann", "Franklin"]);
    expect((inputs[0].element as HTMLInputElement).value).toBe("");
  });
});

describe("LabeledInput", () => {
  it("relie le label et l'input via l'id", () => {
    const wrapper = mount(LabeledInput, {
      props: { id: "username" },
      slots: { default: "Username: " },
    });
    expect(wrapper.find("label").attributes("for")).toBe("username");
    expect(wrapper.find("input").attributes("id")).toBe("username");
  });
});

describe("ProductCard + panier", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("ajoute un produit en stock", async () => {
    const product = PRODUCTS[0];
    const wrapper = mount(ProductCard, { props: { product } });
    const cart = useCartStore();
    await wrapper.find("button").trigger("click");
    wrapper.emitted("add")?.[0] && cart.add(product);
    expect(cart.count).toBe(1);
  });

  it("désactive le bouton en rupture", () => {
    const product = PRODUCTS.find((item) => item.stock === 0)!;
    const wrapper = mount(ProductCard, { props: { product } });
    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });
});
