# 18 — Performances front et SEO e-commerce

L’offre : « optimiser SEO et temps de chargement », « applications performantes ».

## SEO, en une histoire

**SEO** = Search Engine Optimization. Google (et les autres) **lisent** ta page pour savoir si elle répond à « envoyer un colis pas cher ».

Ils lisent surtout :

- le **HTML** (titres, texte, liens) ;
- des balises (`title`, `meta description`, canonical, Open Graph) ;
- la **vitesse** et le **mobile** (oui, ça compte pour le ranking).

Si le HTML du catalogue n’existe qu’après 2 s de JavaScript (SPA nue), tu pars avec un handicap. D’où **Nuxt SSR** (chapitre 5).

Bon SEO fiche produit :

- un `h1` unique = le nom de l’offre ;
- une description unique (pas le même lorem partout) ;
- une URL stable `/produits/envoi-colis-s` ;
- `useSeoMeta` ;
- pas de contenu important **uniquement** dans un canvas / image.

Le SEO n’est **pas** « bourrer des mots-clés ». C’est **une page claire, rapide, unique**.

## Temps de chargement : les Core Web Vitals

Google a popularisé trois mesures **réelles** (pas un score Lighthouse vaniteux tout seul) :

| Sigle | Nom | En français | Levier e-commerce |
|---|---|---|---|
| **LCP** | Largest Contentful Paint | Quand le **gros** élément (souvent l’image / le titre) s’affiche | SSR, image dimensionnée, pas 2 Mo de JS avant |
| **INP** | Interaction to Next Paint | Délai entre un clic et la réaction | moins de JS lourd, pas de gros travail sur le thread au clic |
| **CLS** | Cumulative Layout Shift | La page qui **saute** (le bouton se décale, tu cliques ailleurs) | largeur/hauteur des images, pas de pub qui pousse, skeletons de la **même** taille |

Ancien sigle **FID** (First Input Delay) : remplacé par INP. Si le QCM dit FID, c’est la même famille.

**Lighthouse** (dans Chrome) simule. Le **RUM** (Real User Monitoring) mesure les vrais clients. À l’oral, tu vises les deux.

## Gestes concrets (ceux que tu peux faire au coding game)

- `computed` pour filtrer, pas 12 fois la même boucle dans le template ;
- `:key` stable ;
- images : `width` / `height` ou aspect-ratio, `loading="lazy"` **sauf** l’image LCP (la première carte héro, elle, **pas** lazy) ;
- pas de fetch à chaque frappe (`debounce`) ;
- pas d’installer une lib de 80 ko pour un toggle ;
- `v-if` sur un gros bloc rarement vu.

## Gestes Nuxt (oral)

- SSR du HTML above-the-fold ;
- `routeRules` / cache CDN ;
- `ClientOnly` pour le chat, le carousel lourd, la carte interactive ;
- payload : ne pas hydrater tout le site si une page est du contenu statique.

## Multi-navigateurs et perf

Un polyfill énorme pour IE11 : en 2026, en général **non** (sauf contrainte écrite). Cible : navigateurs modernes + Safari iOS (souvent le plus strict).

Chapitre 19 : on ouvre **ton** mini-projet et on relie chaque fichier à ce cours.
