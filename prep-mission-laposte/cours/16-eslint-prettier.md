# 16 — ESLint et Prettier

L’offre les cite pour « qualité et formatage ».

## Prettier — le formatage

**Prettier** réécrit le code **automatiquement** : quotes, point-virgules, retours à la ligne, longueur. Plus de guerre `tabs vs espaces` en revue.

Tu sauves, ça se formate. En CI, `prettier --check` refuse un fichier non formaté.

Ce n’est **pas** un détecteur de bugs. C’est un **accord visuel**.

## ESLint — les règles métier / qualité

**ESLint** analyse le code et **signale** :

- une variable jamais utilisée ;
- un `==` au lieu de `===` ;
- `v-for` sans `key` (plugin Vue) ;
- un `any` interdit (avec TypeScript) ;
- un composant d’un seul mot (`Gallery` → `ImageGallery`).

En revue, tu ne commentes plus « mets une clé sur le v-for » : **la CI l’a déjà dit**.

## Ensemble

Prettier formate. ESLint raisonne. Ils se marchent parfois sur les pieds : on désactive les règles ESLint de **style** au profit de Prettier (`eslint-config-prettier`).

## Le jour J

Si le projet a `npm run lint`, lance-le. Si tu n’as pas le temps de configurer : **reste cohérent** (2 espaces, simples quotes, toujours des `;` **ou** jamais). L’incohérence se voit plus que le choix.

Definition of Done d’une MR senior : lint vert, tests verts, a11y minimale, pas de `console.log` oublié.

Chapitre 17 : comment l’équipe s’organise autour de ces MR.
