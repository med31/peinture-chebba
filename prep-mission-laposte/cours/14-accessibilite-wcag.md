# 14 — Accessibilité numérique (WCAG 2.1)

L’offre : « bonnes pratiques d’accessibilité », « WCAG 2.1 », « compatibilité multi-navigateurs ».

## Pourquoi (pas seulement « c’est la loi »)

Un client peut :

- naviguer **au clavier** (pas de souris) ;
- utiliser un **lecteur d’écran** (JAWS, NVDA, VoiceOver) qui lit le HTML ;
- mal voir les contrastes ;
- ne pas distinguer le rouge du vert.

**WCAG** (Web Content Accessibility Guidelines) 2.1, niveau **AA**, est le palier visé par beaucoup de sites publics / grands groupes en France (souvent croisé avec le **RGAA**, le référentiel français dérivé de WCAG).

Accessibilité ≠ « pour les handicapés seulement ». Un bon contraste aide **dehors au soleil**. Un vrai `<button>` aide **tout le monde**.

## Les 4 principes (POUR)

1. **Perceptible** — l’info n’est pas seulement une couleur ou une image sans texte.
2. **Utilisable** — clavier, assez de temps, pas de piège.
3. **Compréhensible** — labels clairs, erreurs explicites, langue `fr`.
4. **Robuste** — HTML valide, marche avec les aides techniques.

## Checklist coding game (2 minutes, gros points)

1. **Un `h1` par vue.** Les titres descendent (`h2` dans les cartes, pas un autre `h1`).
2. **Boutons et liens natifs.** `<button type="button">`, `<a href>`. Un `<div @click>` n’est pas dans la tabulation, n’a pas de rôle, casse le clavier.
3. **Chaque champ a un `<label for="id">`** lié au même `id` que l’input. Le placeholder **n’est pas** un label (il disparaît).
4. **Images** : `alt` utile (« Boîte colis format S ») ou `alt=""` si purement décoratif (sinon le lecteur lit le nom de fichier).
5. **Focus visible** : `outline` au clavier (`:focus-visible`). Ne pas `outline: none` sans remplacement.
6. **Contraste** : texte sombre sur fond clair / jaune. Gris pâle sur blanc = échec.
7. **Pas d’info par la couleur seule** : « Rupture de stock » **écrit**, pas seulement le bouton grisé.
8. **`role="status"`** pour « Chargement… » / « Aucun produit ». **`role="alert"`** pour une erreur de formulaire (annoncé tout de suite).
9. **Badge panier** : `aria-live="polite"` pour que le lecteur annonce « 2 » sans voler le focus.
10. **Formulaire** : erreurs **sous le champ** concerné, pas un toast illisible ; `novalidate` si tu gères toi-même, mais messages clairs.

## Clavier : le test de 20 secondes

Tab, Tab, Tab. Est-ce que j’atteins recherche, selects, chaque « Ajouter », le lien panier ? Enter active le bouton ? Pas de piège (focus coincé) ?

## ARIA, avec parcimonie

**ARIA** (Accessible Rich Internet Applications) = attributs `aria-*` pour **enrichir** quand le HTML natif ne suffit pas.

Règle : **un vrai bouton > un div avec `role="button"`**. ARIA ne répare pas un HTML pourri. Trop d’ARIA rend le site **plus** illisible.

## Multi-navigateurs

« Compatible » = Chrome, Firefox, Safari, Edge, **et mobile**. Pas de fonction JS trop récente sans que Vite transpile. Pas de hover-only sur tactile (un filtre doit marcher au tap). Tester Safari pour le flex/grid et les `100vh`.

Chapitre 15 : comment tout ça arrive sur un serveur sans copier les fichiers à la main.
