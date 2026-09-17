# 04 — TypeScript, SASS, BEM, accessibilité, tests, Figma

## TypeScript — le minimum scorable

```ts
interface Product {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
}

type Category = "colis" | "emballage";

function add(product: Product, qty: number = 1): boolean {
  if (product.stock < qty) return false;
  return true;
}

const payload: Pick<Product, "id" | "name"> = { id: "x", name: "y" };
```

Éviter `any`. Si l’API est inconnue : `unknown` + narrowing.

```ts
function isProduct(x: unknown): x is Product {
  return typeof x === "object" && x !== null && "id" in x && "priceCents" in x;
}
```

Génériques utiles : `groupBy<T, K>`, `uniqueBy<T, K>`.

## SASS

```scss
$color-ink: #1a1a1a;

.product-card {
  &__title { font-weight: 700; }
  &--out { opacity: 0.7; }

  @media (min-width: 768px) {
    flex-direction: row;
  }
}
```

Variables, nesting, `&`, mixins si tu as 10 secondes. Pas de sélecteurs à 6 niveaux (ça casse le DS).

## BEM — convention exigée par l’offre

```
block__element--modifier
```

```html
<article class="product-card product-card--out">
  <h2 class="product-card__title">…</h2>
  <button class="product-card__cta">…</button>
</article>
```

Règles :
- Un block = un composant.
- Pas de `.product-card .title` nu.
- Modifiers pour état : `--disabled`, `--selected`, `--error`.
- Pas d’IDs CSS.
- Le DS Figma nomme souvent déjà les blocks : **respecte les tokens** (couleur, spacing), ne « fais pas joli à l’œil ».

## Accessibilité WCAG 2.1 (niveau AA visé)

Checklist coding game (2 minutes de plus, gros points) :

1. Un seul `h1` par vue.
2. Images : `alt` informatif, `alt=""` si décoratif.
3. Chaque input a un `<label for="id">`.
4. Boutons natifs, liens natifs. Pas de `div @click`.
5. `:focus-visible { outline: 3px solid #ffc100; }`.
6. Contraste : texte sombre sur jaune La Poste, pas gris pâle.
7. `aria-live="polite"` sur le compteur panier.
8. `role="status"` empty/loading, `role="alert"` erreur.
9. Formulaires : erreurs liées au champ, pas un toast illisible.
10. Clavier : Tab atteint tout, Enter active le CTA.

Piège e-commerce : **ne pas** indiquer le stock / le prix seulement par la couleur.

## Frontify / Figma / Invision

À l’oral :
> Je ne code pas au pixel près « de tête ». Je pars des frames Figma, des tokens du DS (Frontify), et je challenge l’écart (état vide manquant, erreur API, mobile). Invision = ancien flux de proto ; aujourd’hui Figma + Storybook.

Questions à poser au designer (ça te classe lead) :
- État rupture / 0 résultat / skeleton ?
- Error 500 ?
- Focus order du tunnel ?
- Contenu du `alt` et du titre SEO ?

## Tests — TDD / BDD

Fiche de poste : « grande importance à la qualité : TDD, BDD ».

**TDD** : test rouge → code → vert → refactor. Sur un coding game, si Vitest/Jest est branché, **écris le test du filtre avant le CSS**.

**BDD** (Cypress / Gherkin) :
```
Étant donné un produit en stock
Quand j’ajoute au panier
Alors le badge affiche 1
Et le total TTC est à jour
```

Pyramide :
- **Jest/Vitest** : store, computed, formatPrice, composants isolés (`@vue/test-utils`).
- **Cypress / Playwright** : parcours critique (ajouter → panier → checkout).
- Pas de test E2E pour un getter de 3 lignes.

Exemple Vitest store : voir `tests/cart-store.test.ts`.

## ESLint / Prettier

Le test peut lancer `npm run lint`. Active dès le début :
- pas de `var`
- `const` par défaut
- quotes / trailing comma via Prettier
- `vue/multi-word-component-names`

Si tu n’as pas le temps de configurer : **reste cohérent** (2 spaces, simple quotes, pas de `;` ou toujours `;`).

## Git pendant un take-home

```
feat: catalogue filtrable
feat: panier Pinia + remise 10%
test: couverture store et ImageGallery
```

Pas un commit « wip » de 40 fichiers. Branches `feat/...`. MR GitLab : description, screenshots, AC cochées.
