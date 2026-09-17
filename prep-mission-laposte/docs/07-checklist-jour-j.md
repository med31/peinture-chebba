# 07 — Checklist jour J

## La veille

- [ ] Dors. Pas de nouvelle lib à 23 h.
- [ ] Relis **une fois** : `02-cheatsheet-vue3.md` + Pinia/useFetch.
- [ ] Refais de mémoire `closestToZero` et un `computed` filtre.
- [ ] `npm test` au vert sur ce kit.
- [ ] Vérifie matériel : casque, webcam si proctor, Chrome à jour, IDE du test (souvent VS Code embedded).
- [ ] Espace calme, notifications off, téléphone loin **si** test surveillé.

## 30 minutes avant

- [ ] Eau, full screen, second écran **seulement si autorisé**.
- [ ] Papier : AC, types `Product`, schéma store.
- [ ] Raccourcis : dupliquer ligne, multi-curseur, formatage.
- [ ] Tu n’ouvres pas ChatGPT si le règlement l’interdit.

## Pendant le QCM

- [ ] 30 s max par question, flag, reviens à la fin.
- [ ] Sur un doute Vue 2 vs 3, choisis **Vue 3** sauf si l’énoncé montre `this.$store`.

## Pendant le puzzle JS

- [ ] Lis l’exemple **et** les contraintes (`N = 0`, égalité, casse).
- [ ] Écris d’abord la signature + `if (empty) return 0`.
- [ ] 1 passe `O(n)` si possible. Pas de `O(n²)` gratuit.
- [ ] `console.error` de debug, **pas** sur stdout si le puzzle lit stdout.

## Pendant le mini-app Vue

Ordre non négociable :

1. Types + fake data
2. Affichage liste
3. Filtre
4. Panier / action
5. Empty / loading / disabled
6. Labels + `:key`
7. CSS BEM léger
8. S’il reste 10 min : tests ou formulaire

Phrase si tu n’as pas fini (commentaire README du take-home) :

> Fait : catalogue, filtre, panier, rupture de stock, a11y labels. Non fait : persistence localStorage, tests E2E Cypress, page produit. Prochaine étape : `useFetch` Nuxt + SEO `useSeoMeta`.

Ça montre un senior, pas quelqu’un noyé.

## Après l’envoi

Note 5 minutes : ce qui t’a ralenti. Tu auras un oral de debrief.

## Commandes de révisions express

```bash
cd prep-mission-laposte
npm test
npm run dev
```

Parcours manuel à faire **une fois** le matin du test :
1. Chercher « colis »
2. Trier prix croissant
3. Ajouter Colis S deux fois
4. Voir le badge
5. Modifier la quantité
6. Aller au checkout, valider avec un email faux → erreur
7. Email bon → retour catalogue, panier vide
