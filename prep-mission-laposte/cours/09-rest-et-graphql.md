# 09 — REST et GraphQL : parler au back

Le front **n’a pas** la base produits. Il **demande**. L’offre exige REST **et** GraphQL.

## REST, l’idée

**REST** (Representational State Transfer) = on manipule des **ressources** via des **URL** et des **verbes HTTP**.

| Verbe | Intention | Exemple |
|---|---|---|
| `GET` | lire, sans modifier | `GET /api/products` |
| `POST` | créer | `POST /api/cart/items` `{ sku, qty }` |
| `PUT` / `PATCH` | remplacer / modifier | changer la quantité |
| `DELETE` | supprimer | retirer une ligne |

Le serveur répond avec un **code HTTP** :

| Code | Sens | Ce que le front affiche |
|---|---|---|
| 200 | OK | la liste |
| 201 | créé | ligne ajoutée |
| 400 | requête mal formée | « données invalides » |
| 401 | pas connecté | rediriger login |
| 403 | connecté mais pas le droit | message métier |
| 404 | ressource inconnue | page produit introuvable |
| **409** | conflit (souvent **stock**) | « plus assez en stock » |
| 422 | validation métier | erreurs de champs |
| 500 | le serveur a cassé | « service indisponible », log Sentry |

Tu n’affiches **jamais** la stack trace. Tu affiches un français clair.

En JS :

```ts
const res = await fetch("/api/products");
if (!res.ok) throw new Error("HTTP " + res.status);
const products: Product[] = await res.json();
```

En Nuxt : `useFetch` / `$fetch` font le JSON pour toi et lèvent sur erreur.

## JSON

Le corps est presque toujours du **JSON** : `{ "id": "...", "priceCents": 690 }`. `JSON.parse` peut ** exploser** si le body n’est pas du JSON → `try/catch` (QCM).

## GraphQL, l’idée

**GraphQL** = une **seule URL** (souvent `/graphql`) et tu **décris** exactement les champs voulus.

```graphql
query Products($q: String) {
  products(search: $q) {
    id
    name
    priceCents
    stock
  }
}
```

Avantage : sur une fiche produit riche (avis, reco, dispo bureau), tu évites le **over-fetch** (télécharger 40 champs pour en afficher 4). Tu évites aussi 6 GET REST différents si le serveur est bien fait (**under-fetch**).

Inconvénients à citer :

- les erreurs peuvent être **partielles** : `data` **et** `errors[]` en même temps ;
- le cache est plus subtil qu’un GET REST ;
- sans BFF, le front peut déclencher un **N+1** (une requête par carte).

Tu n’as pas besoin d’écrire un serveur GraphQL au coding game. Tu dois **lire** une query et savoir `useQuery` / `$fetch('/graphql')`.

## REST vs GraphQL : phrase unique

> REST : une URL par ressource, simple, cache HTTP naturel. GraphQL : une URL, le front choisit les champs, idéal fiches riches. À La Poste, les deux coexistent ; le front parle à un BFF qui agrège.

## CORS, cookies, secrets (oral 30 s)

- **CORS** : le navigateur bloque un site `a.fr` qui appelle `api.b.fr` si le serveur n’autorise pas. Le **BFF** (même domaine) évite une partie du problème.
- Session : cookies **HttpOnly** (le JS ne les lit pas → moins de vol XSS).
- **XSS** : ne jamais injecter du HTML API avec `v-html` sans filtre.
- Pas de token secret dans le front.

Chapitre 10 : qui se cache derrière ces URL.
