# 17 — Agile / Scrum (et un peu SAFe)

L’offre : « expérience projets Agile/Scrum », plus l’encadrement, plus le relationnel.

## L’idée

**Agile** = livrer **souvent** de la valeur, **ajuster** avec le métier, plutôt qu’un cahier des charges de 18 mois figé.

**Scrum** = un **cadre** d’équipe très répandu. Vocabulaire à utiliser correctement :

| Mot | Sens |
|---|---|
| **Sprint** | Une période courte (souvent 2 semaines) avec un but |
| **Backlog** | La liste des travaux, priorisée |
| **User story** | Un besoin formulé côté user : « En tant que client, je peux filtrer les colis, afin de trouver l’offre S » |
| **Critères d’acceptation** | Quand c’est « fini » (les AC du coding game) |
| **Daily** | 15 min : hier / aujourd’hui / blocage — pas un reporting de 40 min |
| **Refinement** | On découpe et on clarifie **avant** le sprint |
| **Revue / démo** | On **montre le parcours** au métier, pas une liste de MR |
| **Rétro** | Ce qu’on change dans **notre façon** de travailler |
| **Definition of Done** | Tests, a11y, DS, i18n, recette… le contrat qualité |

## SAFe

À l’échelle d’un groupe comme La Poste, on voit **SAFe** (Scaled Agile Framework) : plusieurs équipes Scrum **alignées** (PI Planning, trains). Tu n’as pas à réciter tout SAFe. Tu dis : « feature team front + back + PO + designer, sprints, démo du parcours client ».

## Découper (compétence lead)

« Fiche produit + reco + avis + SEO + tracking » = **pas** un ticket. Tu proposes :

1. fiche + API + états erreur ;
2. SEO `useSeoMeta` ;
3. bloc avis ;
4. reco.

Sinon le sprint glisse, la démo est vide.

## Encadrer un junior (c’est dans l’offre)

- **Pairing** 45 min sur le ticket réel, pas un kata hors sol.
- **Revue** : 1 point **bloquant**, 2 suggestions. Pas 40 nits de style (ESLint s’en charge).
- **DoD écrite** : « un composant DS a une story, un état disabled, un test, un nom BEM ».
- Tu **ne réécris pas** sa MR en silence : tu expliques, il corrige, il apprend.

## Relationnel

« Esprit d’ouverture » dans l’offre = tu **challenge** une maquette incomplète **sans** humilier, tu **demandes** le contrat d’API au back **tôt**, tu dis « je ne sais pas encore, je reviens demain » plutôt que d’inventer un stock côté front.

Questions que **tu** poses en entretien (ça te classe senior) : DS déjà en Storybook ? Nuxt 2 ou 3 ? BFF unique ? Niveau RGAA contractuel ? Quel parcours est prioritaire (envoi vs boutique) ?

Chapitre 18 : ce que « performant » et « SEO » veulent dire en chiffres.
