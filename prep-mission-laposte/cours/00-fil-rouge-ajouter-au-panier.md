# Fil rouge — un clic « Ajouter au panier », de bout en bout

Relis ça **après** les chapitres 2 à 6. C’est la même histoire vue par toutes les couches. Si tu sais la raconter, tu sais l’oral **et** le coding game.

## 1. Le designer (Figma / Frontify)

La carte a un bouton primaire noir, un état disabled, un prix en gras. Les tokens viennent du DS. Toi tu ne choisis pas un bleu « plus moderne ».

## 2. Le HTML (composant `ProductCard`)

Un vrai `<button type="button">`. Label accessible. Classe BEM `product-card__cta`. `:disabled` si stock 0.

## 3. Vue (réactivité)

Le clic fait `emit('add', product)`. Pas de `document.querySelector`. Le parent écoute `@add`.

## 4. Le parent (`CatalogView`)

Il connaît le **métier de la page** : `cart.add(product)`. Il ne calcule pas le CSS.

## 5. Pinia (`useCartStore`)

`items` est la vérité. `add` refuse la rupture, incrémente si le SKU existe déjà. `count` et `totalCents` sont des **computed** : le badge du header **bouge tout seul**.

## 6. TypeScript

`product: Product` : tu ne peux pas `add({ nom: "colis" })` par erreur. `priceCents` est un `number`.

## 7. L’API (en vrai, pas dans le kit)

Souvent `POST /api/cart/items`. Réponse 200 ou **409 stock**. Le store se **resynchronise**. Ici on simule en mémoire pour le test chrono.

## 8. Micro-services

Le BFF parle au service stock + panier. Le navigateur n’appelle pas trois hosts.

## 9. Accessibilité

Le badge `aria-live` annonce « 2 ». Le focus reste sur le bouton. On n’a pas sauté de page sans prévenir.

## 10. Test

Un test store : « deux add du même produit → quantity 2 ». Un futur Cypress : le badge se voit. TDD = on a d’abord écrit cette phrase, ensuite le `if (existing)`.

## 11. CI

Push → GitLab `npm test` → vert → revue → Docker recette.

## 12. Perf / SEO

Ce clic n’a **pas** besoin de SSR. En revanche la **carte visible** au premier affichage du catalogue, oui : HTML serveur Nuxt, image pas trop lourde, pas de CLS.

Quand tu codes le jour J, tu rejoues mentalement les étapes **3-5-6-9**. Le reste, tu l’**orales**.
