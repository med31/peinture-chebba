# 06 — Entretien oral : réponses prêtes (mission La Poste)

Le coding game filtre. L’oral décide. Parle **métier e-commerce + expérience client**, pas seulement de syntaxe Vue.

## Pitch de 60 secondes

> Je suis développeur front Vue 3 / Nuxt, TypeScript, plutôt e-commerce et parcours client. Je construis des interfaces SSR performantes, branchées REST/GraphQL, collées à un design system. Je soigne l’accessibilité WCAG 2.1, les Core Web Vitals et la maintenabilité (Pinia, tests, Storybook, GitLab CI). Sur ce type de mission BGPN, je vise des tunnels (envoi colis, boutique, affranchissement) clairs, rapides, et tenables dans la durée — y compris en faisant monter les juniors.

Adapte avec **tes** vrais projets (un chiffre : LCP, conversion, couverture de tests, nb de composants DS).

## « Présentez-vous sur un projet e-commerce »

Structure STAR :
- **Situation** : refonte front catalogue / tunnel.
- **Tâche** : Nuxt SSR, API panier, DS.
- **Action** : Pinia, `useFetch`, skeletons, a11y tunnel, tests Cypress checkout.
- **Résultat** : −X ms LCP, +Y % conversion, 0 régression tunnel.

Sans projet e-commerce : parle d’un **parcours critique** (formulaire, paiement, recherche).

## Architecture que tu proposes pour la DT eCommerce

```
[Nuxt 3 SSR] → [BFF / API Gateway] → micro-services
                                      catalogue
                                      stock
                                      panier / commande
                                      paiement
                                      tracking colis
[Design System Storybook] ← Figma / Frontify
[GitLab CI] test → build Docker → recette → prod
```

Points à citer :
- **Découpage par parcours** (pages Nuxt) pas par techno.
- Store Pinia **par domaine** (`cart`, `user`, `catalog`), pas un god-store.
- Feature flags pour les campagnes.
- Observabilité front : Sentry + RUM (LCP réel).
- Feature teams Agile / SAFe (la BGPN fonctionne souvent comme ça).

## SSR et SEO : la question piège

> Pourquoi Nuxt et pas une SPA Vue ?

Réponse :
> Les solutions e-commerce La Poste sont des portes d’entrée grand public (Google, campagnes, comparateurs). Sans SSR, le HTML initial est vide, le LCP et le SEO souffrent. Nuxt rend le catalogue côté serveur, hydrate ensuite l’interactivité (panier, filtres). Le tunnel loggé peut être moins SSR. On mesure LCP/INP/CLS, pas seulement un audit Lighthouse local.

## Pinia vs Vuex

> Vuex 4 existe encore, mais Pinia est l’officiel Vue 3 : DX, TS, pas de mutations, stores multiples, Devtools. Sur un legacy Vue 2 / Vuex, je mappe et je migre store par store.

## Design system

> Je ne « devine » pas les marges. Tokens Frontify/Figma → composants Storybook (BEM + SASS) → apps Nuxt. Si la maquette n’a pas l’état erreur, je le fais remonter au designer. C’est ça la sensibilité UX demandée, pas choisir une police.

## Accessibilité

Cite 3 trucs concrets du tunnel :
1. Order Tab : quantité → retirer → CTA.
2. Erreurs de formulaire au `role="alert"` + focus sur le 1er champ.
3. Prix et rupture **textuels**, pas seulement couleur.
4. `prefers-reduced-motion` sur les carrousels promo.

## Qualité / TDD / BDD

> TDD sur le domaine (panier, remise, stock). BDD Cypress sur le parcours « ajouter un colis M → panier → adresse ». La CI GitLab casse la MR si rouge. Revue de code : a11y, naming, pas de logique dans le template.

## Encadrement juniors (c’est dans l’offre)

Prépare 4 leviers :
- pairing 45 min sur un ticket réel (pas un kata hors sol)
- revue de MR pédagogique (1 point bloquant, 2 suggestions)
- dojo Storybook / a11y une fois par sprint
- definition of done écrite : tests, i18n, states, DS

Phrase :
> Un junior qui livre un composant DS testé et accessible me fait plus gagner qu’un senior qui code tout seul dans son coin.

## Agile

Daily, sprint 2 semaines, refinement avec métier + designer, démo du parcours (pas d’une MR technique), retros. Tu challenge les tickets trop gros (« fiche produit + reco + avis » = 3 tickets).

## Questions à **poser** (esprit d’ouverture, excellent relationnel)

1. Le DS est-il déjà en Storybook ou encore éclaté Figma ?
2. Nuxt 2 ou 3 ? Pinia ou Vuex legacy ?
3. BFF unique ou appels directs catalogue / ATG / SAP Commerce / API colis ?
4. Niveau WCAG contractuel (AA) et outillage (axe, RGAA) ?
5. Parcours prioritaire : boutique, envoi, suivi ?
6. Comment sont mesurés satisfaction client / Web Vitals ?
7. Attente d’encadrement : % de code vs % de revue ?

Ça te positionne **prestation senior**, pas exécutant.

## Questions pièges rapides

**« Vue 2 ou 3 ? »** Vue 3 + Composition API. Capable de maintenir du Vue 2 Options si socle legacy.

**« Webpack ou Vite ? »** Nuxt 3 / Vite. Webpack = Nuxt 2 / vieux CLI. Je sais configurer les deux.

**« Comment tu gères le stock concurrent ? »** Le front affiche le stock, mais la vérité est au POST commande (409). On resynchronise le panier, message clair, pas de double submit (bouton disabled + idempotency key si l’API le permet).

**« i18n ? »** `vue-i18n` / `@nuxtjs/i18n`, clés dans le DS, dates/prix `fr-FR`. Ne jamais concaténer des phrases.

**« Sécurité front ? »** XSS (`v-html` évité), cookies HttpOnly pour la session, CORS géré au BFF, pas de secret dans `VITE_*`.
