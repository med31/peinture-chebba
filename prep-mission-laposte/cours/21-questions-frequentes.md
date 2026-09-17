# 21 — Questions fréquentes (celles qu’on pose dans sa tête)

## « Vue et Nuxt, c’est deux frameworks ? »

Non. **Vue** peint les composants. **Nuxt** est la **maison** autour : pages-fichiers, serveur, SEO, auto-import. React / Next.js, c’est le même rapport.

## « Pourquoi `.value` parfois et pas dans le HTML ? »

`ref` est une **boîte**. En JavaScript, tu ouvres la boîte (`count.value`). Dans le template, Vue l’ouvre pour toi (`{{ count }}`). Oublier `.value` en script = tu additionnes l’objet boîte, pas le nombre — résultat bizarre, pas d’erreur claire.

## « Pourquoi mon badge panier ne bouge pas ? »

Tu as écrit `const { count } = useCartStore()`. Tu as sorti le nombre de la boîte. Utilise `storeToRefs`. C’est **la** question QCM.

## « computed ou watch ? »

- Formule (total, liste filtrée, `isValid`) → **`computed`**.
- Action (appeler une API, écrire dans `localStorage`) → **`watch`**.

Si tu mets un `fetch` dans un `computed`, tu as mélangé les deux.

## « Pourquoi pas tout dans App.vue ? »

Parce qu’au bout de 3 jours personne ne retrouve le filtre. Un composant = une responsabilité. Le store = la vérité partagée. Les pages = l’assemblage.

## « On mute `items.value.push` : on n’avait pas dit immutable ? »

Vue 3 **autorise** de muter un `ref` tableau (`push`, `splice`) : la réactivité le voit. La règle « ne pas muter » concerne les **props** (la copie du parent). Le state Pinia, tu le mutes **dans le store**, pas depuis 4 composants au hasard.

## « Centimes, c’est pédant ? »

`0.1 + 0.2 === 0.3` est **faux** en JS (binaire des décimaux). Les banques et les boutiques comptent en **entiers**. Tu affiches ensuite avec `Intl`. Au coding game, ça évite un total `13.799999`.

## « SSR ça ralentit le serveur non ? »

Ça coûte du CPU serveur, oui. En échange le **client** voit le HTML tout de suite (LCP, SEO). On cache (CDN, SWR) pour ne pas recalculer 10 000 fois la home. Le tunnel loggé, lui, peut rester CSR.

## « GraphQL va remplacer REST ? »

Non, pas dans cette mission. Les deux vivent. REST simple pour des ressources. GraphQL pour des fiches riches. Le BFF peut même **traduire**.

## « Je dois tout connaître de Docker ? »

Non. Image = boîte. CI build l’image. Recette et prod lancent la même boîte. Multi-stage = on ne met pas les outils de compilation en prod. Point.

## « WCAG 2.1 AA vs RGAA ? »

WCAG = standard W3C international. RGAA = **mode d’emploi français** pour les services publics / beaucoup de grands comptes. Les règles se recoupent (contraste, clavier, alternatives). Dis « AA / RGAA, labels, clavier, pas d’info par la couleur seule ».

## « Storybook vs le site ? »

Storybook = laboratoire du bouton. Le site = le bouton **branché** au panier. On ne teste pas le paiement dans Storybook.

## « Options API, je l’oublie ? »

Non. Du legacy Vue 2 / tests CodinGame CDN. Tu dois **lire** `data` / `methods`. Tu **écris** en `<script setup>` dès que le projet est Vue 3.

## « Combien de temps pour être prêt ? »

Si tu codes déjà du Vue : **le cours 1 jour**, cheatsheets + QCM **une soirée**, mini-projet **une fois chrono**, oral **enregistré 15 min**. Si Vue est rouillé : fais le cours **dans l’ordre**, un chapitre = une pause, et recode `closestToZero` + le store panier **sans regarder**.

## « Je peux utiliser l’IA le jour J ? »

Si le test est **proctorisé** (webcam, plein écran), non. Tu dois arriver **autonome**. Ce cours est fait pour ça.

Retour au [sommaire](README.md).
