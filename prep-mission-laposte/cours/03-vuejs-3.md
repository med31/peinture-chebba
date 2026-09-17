# 03 — Vue.js 3, comme si on était au tableau

## L’idée en une phrase

**Vue** découpe l’écran en **composants**, et chaque composant a :

- un **template** (le HTML de ce morceau) ;
- un **script** (les données et les actions) ;
- éventuellement un **style** (le CSS de ce morceau).

Quand une **donnée réactive** change, Vue **re-rend tout seul** les endroits du template qui s’en servent. Tu ne fais plus `document.getElementById(...)`.

## Un composant, concrètement

Fichier `ProductCard.vue` (c’est le nôtre dans le kit) :

```vue
<script setup lang="ts">
defineProps<{ product: Product }>();
</script>

<template>
  <h2>{{ product.name }}</h2>
  <p>{{ product.priceCents }}</p>
</template>
```

Les `{{ }}` s’appellent l’**interpolation** : Vue y met la valeur, et **surveille** `product.name`. Si le nom change, le `<h2>` change.

`lang="ts"` = ce script est du TypeScript.

`<script setup>` = la façon **moderne Vue 3** d’écrire un composant (Composition API, chapitre 4). Plus court que l’ancienne **Options API** (`data()`, `methods: { }`).

## Pourquoi on découpe

Sans composants, une page « catalogue + filtres + panier » devient un fichier de 800 lignes. Avec des composants :

- `ProductFilters` = la barre recherche / catégorie / tri ;
- `ProductCard` = une carte ;
- `CatalogView` = la page qui assemble.

Chaque pièce a **une responsabilité**. En entretien : « je découpe par responsabilité, pas par taille de fichier ».

## Le flux des données (règle d’or Vue)

```
Parent  --props-->  Enfant
Parent  <--emit---  Enfant
```

- Le parent **donne** des données à l’enfant via des **props** (propriétés). L’enfant **n’a pas le droit de les modifier**. C’est à sens unique, comme un formulaire papier qu’on te passe : tu le lis, tu ne le ratures pas.
- L’enfant **prévient** le parent via un **événement** (`emit`) : « le user a cliqué Ajouter ». Le parent décide alors (`cart.add(product)`).

Si tu modifies une prop dans l’enfant, Vue te le reproche, et tu auras un bug au coding game (exercice galerie d’images : on **copie** la liste dans un `ref` local, puis on splice la copie).

## Les directives (attributs magiques de Vue)

Une **directive** commence par `v-`.

| Directive | Rôle | Exemple boutique |
|---|---|---|
| `v-if` / `v-else-if` / `v-else` | Afficher **ou détruire** un bloc | « Chargement… » puis la liste |
| `v-show` | Cacher en CSS (`display`), le HTML reste | un panneau d’aide |
| `v-for` | Répéter | une `<li>` par produit |
| `v-model` | Lier un champ à une variable (aller-retour) | la recherche |
| `v-bind` ou `:` | Lier un attribut HTML à du JS | `:src`, `:disabled` |
| `v-on` ou `@` | Écouter un événement | `@click="add"` |

Exemple qui combine :

```vue
<button type="button" :disabled="product.stock === 0" @click="emit('add', product)">
  Ajouter au panier
</button>
```

- `:disabled="..."` = si stock 0, le bouton est grisé (HTML natif, donc clavier-friendly).
- `@click` = au clic, on **émet** vers le parent.

## `v-if` vs `v-show` (question QCM)

- `v-if="false"` : le bloc **n’existe pas** dans le DOM. Coût à chaque fois qu’on le recrée.
- `v-show="false"` : le bloc existe, mais `display: none`. Plus cheap si on toggle souvent.

Pour un chargement de catalogue, `v-if` est naturel (on n’a pas encore les données). Pour un paragraphe « afficher / masquer l’aide », `v-show` suffit (exercice TestDome classique).

## `v-for` et la `key` (question QCM, bug fréquent)

```vue
<li v-for="product in filtered" :key="product.id">
```

La **`key`** est l’identité de la ligne. Vue s’en sert pour **réutiliser** le bon DOM. Si tu mets `:key="index"` (0, 1, 2…) et que tu filtres ou supprimes, Vue recycle la mauvaise carte : un champ quantité « saute » d’un produit à l’autre.

**Toujours un id métier stable**, jamais l’index, dès que la liste peut changer.

## Vue 2 vs Vue 3 (l’offre dit 3.x)

L’offre demande **Vue.js 3.x**. Différences utiles à l’oral :

| | Vue 2 | Vue 3 |
|---|---|---|
| API recommandée | Options API | Composition API + `<script setup>` |
| Réactivité tableaux | pièges (`Vue.set`) | Proxy : `push` marche |
| State | Vuex | **Pinia** (Vuex existe encore en legacy) |
| Bundler usuel | Webpack / Vue CLI | **Vite** |
| Fragments | un seul élément racine | plusieurs racines OK |

Si le coding game te donne un CDN Vue 2, tu retombes sur Options API. Sinon, tu codes en Vue 3.

## Ce que Vue ne fait pas tout seul

- **Les routes** (`/panier`, `/commande`) → Vue Router, ou **Nuxt** qui le fait pour toi.
- **Le SEO / HTML serveur** → **Nuxt SSR**.
- **Le panier partagé entre 6 pages** → **Pinia**.
- **Parler au back** → `fetch` / `$fetch` / Apollo GraphQL.

Vue = le moteur de l’UI. Le reste, ce sont les outils de l’offre.

Chapitre 4 : on ouvre le capot de la Composition API.
