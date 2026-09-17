# 05 — QCM d’entraînement (40 questions)

Fais-les **sans notes**, 25 minutes chrono. Les réponses sont en bas.

1. Quelle est la différence entre `ref` et `reactive` pour un compteur `0` ?
2. Que se passe-t-il si on destructure `const { items } = useCartStore()` dans `<script setup>` ?
3. `computed` vs `watch` : lequel pour `total = qty * price` ?
4. Pourquoi `:key="index"` est dangereux sur une liste filtrable ?
5. `v-if` vs `v-show` ?
6. Comment implémenter `v-model` sur un composant enfant (Vue 3) ?
7. Où fetcher des produits dans une **SPA Vite** vs dans **Nuxt SSR** ?
8. `useFetch` dans un `@click` : bon ou mauvais ? Alternative ?
9. Hydration mismatch : cause fréquente ?
10. Pinia vs Vuex : que deviennent les mutations ?
11. Centimes vs euros en JS : pourquoi ?
12. Comment garder la réactivité d’un `props.links` que l’on va modifier (galerie) ?
13. `watchEffect` s’exécute-t-il immédiatement ?
14. Nuxt : fichier pour la route `/produits/abc` ?
15. `middleware` Nuxt : `navigateTo` se fait où ?
16. `ssr: false` sur `/commande/**` : intérêt ?
17. Core Web Vitals principaux ?
18. Comment limiter le CLS des cartes produit ?
19. BEM : `product-card__title--big` est-il valide ?
20. WCAG : un prix indiqué seulement en rouge est-il suffisant ?
21. REST : quel code si stock insuffisant au POST panier ?
22. GraphQL : que faire si `data` ET `errors` sont présents ?
23. Vite en dev bundle-t-il toute l’app comme Webpack ?
24. `import.meta.env.VITE_API_URL` vs `process.env` dans Vite ?
25. Jest vs Cypress : qui teste le store Pinia ?
26. TDD : ordre des 3 étapes ?
27. `debounce` : à quoi sert-il sur un champ recherche API ?
28. `nextTick` : à quoi ça sert ?
29. `shallowRef` vs `ref` : idée ?
30. `defineExpose` : quand ?
31. GitLab : différence `npm ci` vs `npm install` en CI ?
32. Docker multi-stage : pourquoi ?
33. Storybook : que documente-t-on pour un bouton DS ?
34. `ClientOnly` Nuxt : exemple légitime ?
35. Accessibilité d’un badge panier qui change : attribut ?
36. `aria-label` vs texte visible du bouton « Ajouter » ?
37. SASS `&--disabled` génère quelle classe si le parent est `.btn` ?
38. TypeScript : `unknown` vs `any` ?
39. Pourquoi `JSON.parse` doit être dans un try/catch ?
40. Micro-service : le front Nuxt doit-il appeler 8 bases URL métier ?

---

## Réponses

1. Un nombre va dans un `ref`. `reactive(0)` n’a pas de sens (objet requis). Accès : `n.value`.
2. Perte de réactivité. Utiliser `storeToRefs(store)` pour `items`, et appeler `store.add()` directement.
3. `computed`. `watch` = effet de bord (log, fetch).
4. L’index change quand on filtre/supprime → état DOM recyclé (input, animations, bugs).
5. `v-if` démonte ; `v-show` cache en CSS.
6. Prop `modelValue` + emit `update:modelValue`, ou `defineModel()`.
7. SPA : `onMounted` + `fetch`. Nuxt : `useFetch` / `useAsyncData` (SSR).
8. Mauvais. `$fetch` / `fetch` dans l’handler.
9. HTML SSR ≠ HTML client : `window`, `Date.now()`, `Math.random()`, `localStorage` au render, `v-if` différent.
10. Elles disparaissent. On mute les `ref` dans les actions Pinia.
11. `0.1 + 0.2 !== 0.3`. Entiers (centimes) puis `Intl.NumberFormat`.
12. Copier : `const images = ref([...props.links])`. Ne pas splice la prop.
13. Oui, puis à chaque dépendance.
14. `pages/produits/[id].vue`.
15. Dans `defineNuxtRouteMiddleware((to) => { if (!auth) return navigateTo('/login') })`.
16. Tunnel authentifié, pas de SEO, moins d’hydratation serveur, APIs privées.
17. LCP, INP (ex-FID), CLS.
18. Largeur/hauteur images, skeletons de même taille, pas de pubs qui poussent le DOM.
19. Oui : block `product-card`, element `title`, modifier `big`. Parfois on préfère `product-card__title product-card__title--big`.
20. Non. Couleur seule interdite (WCAG 1.4.1). Ajouter « Rupture », icône + texte.
21. Souvent **409 Conflict** ou **422**. Gérer le message « stock insuffisant ».
22. Afficher les données partielles + logger/afficher les erreurs champ par champ.
23. Non. Vite sert des modules ESM natifs, compile à la demande.
24. Vite expose `import.meta.env.VITE_*`. `process.env` n’existe pas au browser sans polyfill.
25. Jest/Vitest. Cypress = parcours navigateur.
26. Red → Green → Refactor.
27. Éviter un HTTP à chaque keypress. 250–400 ms.
28. Attendre que le DOM soit à jour après une mutation réactive.
29. `shallowRef` : seule `.value` est profonde… non : la **valeur racine** est réactive, le nested ne l’est pas. Utile gros objets immuables.
30. Pour exposer une méthode de composant au parent via `ref` template. Rare. Préférer emit.
31. `npm ci` = install reproductible depuis lockfile, plus strict, plus rapide en CI.
32. Image finale petite (nginx/node) sans compilers ni devDependencies.
33. Variants (primary/secondary), tailles, disabled, loading, icône, a11y, dark si DS.
34. Widget carte, chat, player, tout ce qui casse l’hydratation.
35. `aria-live="polite"` (et éventuellement `aria-atomic="true"`).
36. Si le texte visible est déjà « Ajouter au panier », pas besoin d’aria-label. Si icône seule : `aria-label` obligatoire.
37. `.btn--disabled`.
38. `any` désactive le typage. `unknown` force un narrowing.
39. Payload API corrompu → exception, UI blanche sinon.
40. Non. BFF / API gateway. 1–2 bases URL max, tokens, CORS, agrégation.

**Score** : 32+/40 = prêt QCM. 24–31 = relire cheatsheets 02 et 03. < 24 = une journée de plus sur Nuxt/Pinia.
