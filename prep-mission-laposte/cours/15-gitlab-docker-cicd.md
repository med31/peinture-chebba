# 15 — Git, GitLab CI/CD et Docker

## Git, en 2 minutes

**Git** enregistre l’histoire du code. **GitLab** (imposé par l’offre) héberge le dépôt, les **Merge Requests** (MR = proposition de fusion, l’équivalent des Pull Requests GitHub), et la **CI**.

Flux usuel :

1. branche `feat/panier-remise` ;
2. commits petits et clairs (`feat: remise 10 % dès 50 €`) ;
3. MR + revue (toi tu **revues les juniors**) ;
4. la CI doit être verte ;
5. merge dans la branche principale.

Tu ne pousses pas sur `main` en direct.

## CI/CD

- **CI** (Continuous Integration) : à chaque push, une machine **installe, linte, teste, build**. Si rouge, on ne merge pas.
- **CD** (Continuous Delivery / Deployment) : ensuite on **déploie** (recette, préprod, prod), souvent via **Docker**.

Sans CI, « ça marche sur ma machine » n’est pas une preuve.

## GitLab CI : le fichier `.gitlab-ci.yml`

GitLab lit ce YAML à la racine. Un **job** = une recette.

```yaml
stages: [test, build]

test:
  stage: test
  image: node:22
  script:
    - npm ci
    - npm test
    - npm run lint

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths: [dist/]
```

Vocabulaire :

- **`image`** : l’environnement (ici Node 22, comme un PC jetable).
- **`npm ci`** : install **reproductible** depuis `package-lock.json`. En CI, **préférer `ci` à `install`** (plus strict, plus stable).
- **`script`** : les commandes.
- **`artifacts`** : fichiers à garder (le build) pour le job suivant ou le déploiement.
- **`cache`** : `node_modules` pour aller plus vite (optionnel).

Tu n’écris pas 200 lignes le jour J. Tu dois **lire** un YAML et dire ce qu’il fait.

## Docker

**Docker** met l’app dans une **boîte** (image) qui tourne pareil partout.

Analogie : au lieu d’installer Node « à la main » sur le serveur (version différente, oubli), tu livres une **image** : « voici le programme + exactement ce qu’il lui faut ».

Idée **multi-stage** (à citer) :

1. une étape **build** avec Node, compilateurs, `npm ci`, `npm run build` ;
2. une étape **finale** toute petite : nginx (fichiers statiques) **ou** Node pour Nuxt SSR (`node .output/server/index.mjs`).

La prod n’embarque pas les `devDependencies` ni le code source TS. Image plus petite = plus sûre, plus rapide.

Tu n’as pas à écrire un Dockerfile parfait au coding game. À l’oral : « build dans CI, image Docker, déploiement recette puis prod ».

## Environnements

- **dev** : ta machine, `npm run dev`, mock API ;
- **recette / staging** : comme la prod, pour la QA et le métier ;
- **prod** : les clients.

Les URL d’API changent via les variables d’environnement (`VITE_` / runtime Nuxt), pas en dur dans le code.

Chapitre 16 : le filet **avant** même les tests : le style du code.
