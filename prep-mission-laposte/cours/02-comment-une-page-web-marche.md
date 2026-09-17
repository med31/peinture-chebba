# 02 — Comment une page web marche (sans mystère)

Imagine le site « envoyer un colis ». Trois langages se partagent le travail, **dans le navigateur** (Chrome, Firefox, Safari, Edge).

## HTML — la structure

Le **HTML** (HyperText Markup Language) décrit **quoi** il y a sur la page, pas à quoi ça ressemble.

```html
<h1>Envoi Colis S</h1>
<p>6,90 €</p>
<button type="button">Ajouter au panier</button>
```

- `<h1>` = le titre principal (un seul par page, important pour l’accessibilité et Google).
- `<p>` = un paragraphe.
- `<button>` = un vrai bouton. **Pas un `<div>` cliquable** : le clavier et le lecteur d’écran savent que c’est un bouton.

Le navigateur lit ce texte et construit un arbre en mémoire : le **DOM** (Document Object Model). Chaque balise = un nœud. JavaScript pourra **lire et modifier** cet arbre (changer le prix, ajouter une ligne au panier).

## CSS — l’apparence

Le **CSS** (Cascading Style Sheets) dit **comment** ça s’affiche : couleurs, marges, grille.

```css
button {
  background: #1a1a1a;
  color: white;
}
```

Sans CSS, le site marche encore (on peut acheter), il est juste laid. Avec un mauvais CSS, le bouton « Commander » est illisible : là, **l’accessibilité** et le **design system** entrent en jeu (chapitres 11, 12, 14).

## JavaScript — le comportement

Le **JavaScript** (souvent abrégé **JS**) réagit aux clics, parle au serveur, met à jour le DOM.

```js
button.addEventListener("click", () => {
  panier.push(produit);
});
```

**TypeScript** (chapitre 7) n’est pas un autre langage magique : c’est du JavaScript **avec des types**, qui est ensuite **effacé** pour redevenir du JS que le navigateur comprend.

## Le voyage d’une page (très important pour Nuxt)

Quand tu tapes une URL :

1. Le navigateur demande une page au **serveur**.
2. Le serveur répond, souvent avec du HTML.
3. Le navigateur affiche, puis télécharge CSS et JS.
4. Le JS s’exécute : la page devient interactive.

Deux grandes familles :

### Site classique (plusieurs pages HTML)

Chaque clic « Catalogue » / « Panier » redemande une **nouvelle page** au serveur. Simple, bon pour le SEO, parfois lent (tout recharger).

### SPA — Single Page Application

**SPA** = une seule page HTML, et le JavaScript **change le contenu** sans recharger. Vue sans Nuxt, c’est souvent ça. Sensation d’app fluide. **Problème** : au premier chargement, Google et le client voient parfois une page **vide** le temps que le JS s’exécute. Mauvais pour le **SEO** et le **LCP** (chapitre 18). C’est **la raison d’être de Nuxt / SSR**.

## Front-end vs back-end vs API

- **Front-end** : ce qui tourne dans le navigateur (Vue, CSS). C’est **ton** métier ici.
- **Back-end** : ce qui tourne sur les serveurs La Poste (stock, prix, commande). Souvent d’autres équipes, **micro-services** (chapitre 10).
- **API** (Application Programming Interface) : le **contrat** entre les deux. Le front dit « donne-moi le produit `lp-colis-s` », le back répond en JSON.

```json
{ "id": "lp-colis-s", "name": "Envoi Colis S", "priceCents": 690 }
```

**JSON** (JavaScript Object Notation) = format texte d’objets, le plus courant pour les API web.

## Framework : pourquoi Vue et pas « du JS brut »

En JS brut, pour une boutique tu réécrirais à la main : « si le panier change, mets à jour le badge, le total, le bouton ». C’est **verbeux et fragile**.

Un **framework** (Vue, React, Angular) te donne :

- des **composants** (une carte produit réutilisable) ;
- la **réactivité** (tu changes `count`, le badge se met à jour tout seul) ;
- une structure d’équipe (tout le monde code pareil).

**Vue.js** est le framework choisi par cette DSI. **Nuxt** est le **cadre** autour de Vue pour les sites avec routes, SEO, serveur.

Passe au chapitre 3.
