# 13 — Tests, TDD et BDD

L’offre : « grande importance à la qualité du code : TDD, BDD » + **Jest** et **Cypress**.

## Pourquoi tester un front e-commerce

Un tunnel de commande cassé = **perte de CA** et de confiance. Un refactor du panier sans tests = tu découvres la régression **en prod**.

Les tests sont un **filet**, pas une religion. On teste ce qui **peut casser silencieusement** : remise, stock, filtre, validation.

## La pyramide (à dessiner)

```
        /\
       /E2E\      Cypress / Playwright — rares, chers, vrais parcours
      /------\
     /Composant\   Vue Test Utils — un bouton, une galerie
    /----------\
   /  Unitaire  \  fonctions, store Pinia — nombreux, rapides
  /--------------\
```

- **Beaucoup** de tests unitaires (Jest / Vitest).
- **Quelques** tests de composants.
- **Peu** de tests bout-en-bout (le parcours « ajouter → panier → payer »).

Si tu testes le `formatPrice` en Cypress, tu as perdu. Si tu ne testes le panier **que** à la main, tu as perdu aussi.

## Jest vs Vitest

**Jest** est cité dans l’offre : c’est le runner historique (Vue 2 / Webpack).

**Vitest** est l’équivalent **Vite / Vue 3** : même style `describe` / `it` / `expect`. Dans ce kit on utilise Vitest. À l’oral : « même idée que Jest, branché sur Vite ».

```ts
it("privilégie le positif en cas d'égalité", () => {
  expect(closestToZero([-5, 5])).toBe(5);
});
```

- `describe` = un tiroir ;
- `it` / `test` = un cas ;
- `expect(...).toBe(...)` = l’assertion.

## Vue Test Utils

On **monte** un composant sans navigateur visible (`jsdom` = faux DOM) :

```ts
const wrapper = mount(ImageGallery, { props: { links: ["a.png", "b.png"] } });
await wrapper.findAll(".remove")[0].trigger("click");
expect(wrapper.findAll("img")).toHaveLength(1);
```

Ça vérifie le **comportement**, pas la beauté.

## Cypress (et cousins Playwright)

**Cypress** ouvre un **vrai** navigateur, clique comme un humain :

```
Étant donné un catalogue
Quand j’ajoute Colis S
Alors le badge affiche 1
```

Lent, parfois flaky (attente réseau). On le réserve au **parcours critique**.

## TDD — Test Driven Development

Ordre **Red → Green → Refactor** :

1. **Red** : tu écris un test qui **échoue** (la remise 10 % n’existe pas encore).
2. **Green** : tu écris **le minimum** pour qu’il passe.
3. **Refactor** : tu nettoies, les tests restent verts.

Intérêt : tu codes **le comportement demandé**, pas un château. En coding game, si les tests sont fournis, **lis-les d’abord** : ce **sont** l’énoncé.

## BDD — Behavior Driven Development

On décrit le logiciel **en langage métier** (souvent Gherkin) :

```
Étant donné un produit en stock
Quand le client l’ajoute au panier
Alors le badge affiche 1
Et le total TTC est à jour
```

Les **Given / When / Then** deviennent des steps Cypress. Product owner et dev **partagent** l’exemple. Ce n’est pas « plus de tests », c’est **le même test, nommé comme un récit**.

## Quoi tester dans un panier (minimum senior)

- refus si stock 0 ;
- +1 si on ajoute deux fois le même SKU ;
- total et remise ;
- `setQuantity(0)` retire la ligne.

C’est exactement `tests/cart-store.test.ts`.

Chapitre 14 : un site qui marche aussi pour ceux qui ne voient pas le jaune.
