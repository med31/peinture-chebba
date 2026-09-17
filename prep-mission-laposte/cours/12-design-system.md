# 12 — Design system, Figma, Frontify, Invision, Storybook

L’offre demande une **grande sensibilité au respect du Design System** et la connaissance **Frontify / Figma / Invision**.

## C’est quoi un Design System (DS)

Un **design system**, ce n’est pas « une maquette jolie ». C’est le **langage commun** produit / design / dev :

- **tokens** : jaune La Poste, rayons 8 px, ombre, typo ;
- **composants** : bouton primaire, champ, carte, header ;
- **règles** : quand utiliser tel bouton, quels états (hover, disabled, error, loading) ;
- **accessibilité** : contrastes validés une fois, pas « au feeling ».

Sans DS, chaque équipe e-commerce invente un bouton. Le client a l’impression de changer de marque à chaque clic. Avec un DS, **Chronopost** et **boutique timbres** se sentent de la même maison.

**Ta job** : **implémenter** le DS, pas l’interpréter avec ton goût. Si la maquette dit 16 px, ce n’est pas 14 parce que « c’est plus aéré ».

## Figma

**Figma** est l’outil où les designers **dessinent** les écrans (frames desktop / mobile), et souvent les composants du DS (variants).

Toi tu :

1. ouvres la frame « Catalogue » ;
2. notes les **écarts** : état vide ? erreur API ? rupture ? focus clavier ? (souvent **absents** — tu les **remonte** au designer, c’est la sensibilité UX de l’offre) ;
3. codes en tokens, pas en « pipette sur le PNG ».

**Dev Mode** / inspect : spacing, couleurs, typos. Tu ne codes pas au pixel près les yeux fermés.

## Frontify

**Frontify** est une plateforme de **brand / DS documenté** : logos, couleurs officielles, règles d’usage, parfois les composants. Chez un grand groupe, c’est la **source de vérité marque**. Figma dessine le produit ; Frontify dit « ce jaune-là, ce logo-là ».

À l’oral : « je ne sors pas une couleur hors token Frontify / Figma ».

## Invision

**Invision** (souvent **InVision**) est un **ancien** outil de prototype cliquable (avant que Figma fasse le proto). Tu peux encore voir des liens Invision dans des specs. Aujourd’hui le flux vivant = **Figma + Storybook**. Tu cites Invision pour montrer que tu lis une spec legacy, tu ne le proposes pas en 2026.

## Storybook

**Storybook** est une **app à part** qui affiche tes composants **isolés**, sans le reste du site.

Pour un `ProductCard` tu crées des **stories** :

- `InStock` — bouton actif ;
- `OutOfStock` — disabled + texte rupture ;
- `LongTitle` — le titre ne casse pas la carte.

Intérêt :

- le designer **valide** le composant sans lancer tout Nuxt ;
- le junior **voit** les états ;
- les tests visuels / a11y addon tournent dessus ;
- la lib DS est **publiée** et versionnée (les micro-fronts la consomment).

Tu ne mets **pas** le métier panier dans le DS. Un bouton « Ajouter » du DS n’importe pas Pinia. La **page** catalogue câble le store.

## Collaboration designer / back (offre « fonctionnelle »)

- Designer : « il manque l’état 0 résultat ».
- Back : « le 409 stock, c’est quel JSON ? ».
- Toi : tu ne bloques pas deux semaines : tu livres un **état par défaut** accessible, tu crées le ticket d’écart DS.

Chapitre 13 : prouver que ça ne cassera pas demain.
