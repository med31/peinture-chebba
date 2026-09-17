# 11 — SASS et BEM

## CSS tout seul, le piège

En CSS global, `.title { font-size: 20px }` s’applique **à tous** les titres du site. Le titre du header casse le titre de la carte. À 40 pages, personne n’ose toucher.

Deux réponses dans l’offre : **SASS** (écrire le CSS plus confortablement) et **BEM** (nommer pour **isoler**).

## SASS (ou SCSS)

**SASS** (Syntactically Awesome Style Sheets) est un **préprocesseur** : tu écris un fichier `.scss`, l’outil (Vite le fait) le transforme en CSS normal.

Ce que tu utilises vraiment :

### Variables

```scss
$color-yellow: #ffc100;
$color-ink: #1a1a1a;
```

Une couleur La Poste **un seul endroit**. Le DS ira plus loin avec des **tokens** (`--color-brand`).

### Imbrication et `&`

```scss
.product-card {
  &__title { font-weight: 700; }
  &--out { opacity: 0.7; }
}
```

Ça compile vers :

```css
.product-card__title { font-weight: 700; }
.product-card--out { opacity: 0.7; }
```

Le `&` = le sélecteur parent. C’est **fait pour BEM**.

### Nesting trop profond

```scss
.page { .grid { .card { .title { } } } } /* à éviter */
```

Fragile, trop spécifique. Un block BEM plat est plus sain.

Dans Vue, on met souvent le SCSS en **`scoped`** : Vue ajoute un attribut unique pour que tes styles **ne fuient pas** vers les autres composants. BEM + scoped = ceinture et bretelles. L’offre demande BEM **quand même** (lisibilité, Storybook, DS).

## BEM — Block Element Modifier

Convention de **noms de classes** :

```
block__element--modifier
```

- **Block** : le composant (`product-card`, `app-shell`).
- **Element** : une pièce **à l’intérieur**, liée au block (`product-card__title`). Séparateur : **deux** underscores.
- **Modifier** : un **état** ou une variante (`product-card--out`, `product-card__cta--disabled`). Séparateur : **deux** tirets.

HTML :

```html
<article class="product-card product-card--out">
  <h2 class="product-card__title">Papier bulle</h2>
  <button class="product-card__cta" disabled>Ajouter au panier</button>
</article>
```

Règles d’or :

- pas de `.product-card .title` nu (le `title` n’est pas porté par le block) ;
- pas d’ID pour styler (`#panier`) ;
- un fichier / un composant ≈ un block ;
- on **n’enchaîne pas** `__` deux fois (`card__body__title` : non, `card__title` : oui).

Pourquoi les recruteurs aiment : un junior **lit** le HTML et sait où est le CSS. Le DS Figma nomme souvent les mêmes blocks.

## Responsive (rapide)

Le site doit marcher **mobile et desktop** (multi-navigateurs **et** multi-tailles). En CSS :

```scss
.catalog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
```

`auto-fill` + `minmax` : les cartes s’empilent toutes seules sur petit écran, sans media query obligatoire. Sinon `@media (min-width: 768px) { ... }`.

Chapitre 12 : d’où viennent les couleurs et les boutons « officiels ».
