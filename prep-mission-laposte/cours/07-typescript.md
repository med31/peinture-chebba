# 07 — TypeScript, pour de vrai

## Pourquoi l’offre exige TypeScript

JavaScript est **permissif** : tu peux faire `product.prix` alors que le champ s’appelle `priceCents`. Ça plante **chez le client**, pas dans l’éditeur.

**TypeScript** (TS) est du JavaScript + un **filet**. Tu décris la forme des données. L’éditeur hurle **pendant que tu codes**. Au build, `tsc` / `vue-tsc` **efface** les types : le navigateur reçoit du JS normal.

L’offre dit « maîtrise de TypeScript ». En coding game, ça veut dire : **interfaces**, pas de `any`, props typées.

## Les types dont tu as besoin

### Types primitifs

`string`, `number`, `boolean`, `null`, `undefined`.

En e-commerce : un prix est un **`number` en centimes** (`690` = 6,90 €), pas un `"6,90"` (les strings ne s’additionnent pas comme tu crois : `"1" + "2"` = `"12"`).

### `interface` : le contrat d’un objet

```ts
interface Product {
  id: string;
  name: string;
  priceCents: number;
  stock: number;
}
```

Tout objet `Product` **doit** avoir ces champs. Si l’API oublie `stock`, TypeScript te prévient **si** tu as typé la réponse.

### `type` union : un choix fermé

```ts
type ProductCategory = "colis" | "affranchissement" | "emballage" | "boutique";
```

Impossible d’écrire `"Colis"` par erreur (majuscule). Le `select` de filtre reste aligné.

`interface` vs `type` : pour un objet métier, `interface` est idiomatique. Pour une union ou un alias, `type`. Les deux passent au test.

### Tableaux et fonctions

```ts
function add(product: Product, qty: number = 1): boolean {
  if (product.stock < qty) return false;
  return true;
}

const list: Product[] = [];
```

`: boolean` après `)` = type de **retour**. Ça documente : `add` ne renvoie pas le panier, il dit succès / refus.

### Optionnel et `Pick`

```ts
compact?: boolean; // peut manquer
Pick<Product, "id" | "name">; // un sous-ensemble
```

## `any` vs `unknown` (QCM)

- **`any`** : « ferme le filet ». Plus aucune vérif. **Interdit** sauf debug de 30 secondes.
- **`unknown`** : « je ne sais pas encore ». Tu **dois** tester avant d’utiliser (`typeof`, `in`, type guard).

```ts
function isProduct(x: unknown): x is Product {
  return typeof x === "object" && x !== null && "id" in x && "priceCents" in x;
}
```

Utile après un `JSON.parse` (qui renvoie `any` en pratique : enveloppe-le).

## Génériques, version simple

Une fonction qui marche **pour plusieurs types**, sans tout casser :

```ts
function uniqueBy<T, K>(items: T[], keyFn: (item: T) => K): T[] {
  // T = le type des éléments, K = le type de la clé
}
```

Tu n’as pas besoin d’écrire des génériques complexes au coding game. Comprendre `<T>` = « à remplir plus tard » suffit.

## Dans Vue

```ts
defineProps<{ product: Product }>();
const items = ref<CartItem[]>([]);
```

`ref<CartItem[]>([])` : sans le `<CartItem[]>`, TypeScript croit que c’est `never[]` et refuse `push`.

## Ce que TypeScript ne fait pas

Il **n’empêche pas** une API de renvoyer un stock faux. Il empêche **toi** de te tromper de champ. La validation métier (email, adresse) reste **ton** code (voir checkout du kit).

Chapitre 8 : comment ce TS devient un site dans le navigateur.
