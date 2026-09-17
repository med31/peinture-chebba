<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { formatPriceEur } from "@/algos/codingGame";

const cart = useCartStore();
const router = useRouter();
const { count, totalCents } = storeToRefs(cart);
const submitted = ref(false);

const form = reactive({
  email: "",
  name: "",
  address: "",
});

const errors = computed(() => {
  const next: Partial<Record<keyof typeof form, string>> = {};
  if (!form.name.trim()) next.name = "Le nom est obligatoire.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email invalide.";
  if (form.address.trim().length < 8) next.address = "Adresse trop courte.";
  return next;
});

const isValid = computed(() => Object.keys(errors.value).length === 0);

function submit(): void {
  submitted.value = true;
  if (!isValid.value || count.value === 0) return;
  cart.clear();
  void router.push({ name: "catalog" });
}
</script>

<template>
  <section>
    <h1>Commande</h1>
    <p v-if="count === 0" role="status">Votre panier est vide, impossible de commander.</p>
    <form v-else class="checkout" @submit.prevent="submit" novalidate>
      <p>Montant à payer : <strong>{{ formatPriceEur(totalCents) }}</strong></p>
      <div class="checkout__field">
        <label for="name">Nom complet</label>
        <input id="name" v-model.trim="form.name" autocomplete="name" required />
        <p v-if="submitted && errors.name" class="checkout__error" role="alert">{{ errors.name }}</p>
      </div>
      <div class="checkout__field">
        <label for="email">Email</label>
        <input id="email" v-model.trim="form.email" type="email" autocomplete="email" required />
        <p v-if="submitted && errors.email" class="checkout__error" role="alert">{{ errors.email }}</p>
      </div>
      <div class="checkout__field">
        <label for="address">Adresse</label>
        <textarea id="address" v-model.trim="form.address" autocomplete="street-address" required />
        <p v-if="submitted && errors.address" class="checkout__error" role="alert">{{ errors.address }}</p>
      </div>
      <button type="submit">Valider la commande</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.checkout {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  input,
  textarea {
    border: 1px solid #d4d0c8;
    border-radius: 8px;
    padding: 0.55rem 0.7rem;
  }

  &__error {
    color: #b42318;
    margin: 0;
    font-size: 0.9rem;
  }

  button {
    border: 0;
    background: #1a1a1a;
    color: #fff;
    border-radius: 8px;
    padding: 0.7rem 1rem;
    cursor: pointer;
  }
}
</style>
