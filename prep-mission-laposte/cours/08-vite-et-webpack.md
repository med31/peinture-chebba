# 08 — Vite et Webpack : le bundler

## Le problème

Le navigateur ne comprend pas nativement, tel quel, un projet de 80 fichiers `.vue`, du TypeScript, du SASS, des `import`. Il faut **transformer** et **emballer**.

L’outil qui fait ça s’appelle un **bundler** (emballeur) :

- en **dev** : serveur local, rechargement rapide (`npm run dev`) ;
- en **prod** : fichiers minifiés, découpés, hashés (`npm run build` → dossier `dist/` ou `.output/`).

L’offre dit **Webpack ou Vite**. Les deux font le même métier, à des époques différentes.

## Webpack

**Webpack** a dominé 2016–2021 (Vue CLI, **Nuxt 2**). Il **assemble tout** même en dev : plus lent à démarrer sur un gros projet. Config souvent lourde (`webpack.config.js`).

Tu dois savoir : `loader` (un fichier `.vue` passe dans `vue-loader`, le `.scss` dans `sass-loader`), `plugin`, `code splitting` (couper le JS par page pour ne pas tout télécharger d’un coup).

## Vite (prononcer « vite », c’est voulu)

**Vite** est le défaut de **Vue 3** et **Nuxt 3**. En dev, il s’appuie sur les **modules ESM natifs** du navigateur : il ne bundle pas tout au démarrage, il transforme **à la demande**. D’où le « instantané ».

En production, Vite utilise **Rollup** (un autre emballeur, très bon pour les libs et le tree-shaking : enlever le code mort).

Fichier `vite.config.ts` du kit : plugin `vue()`, alias `@` → dossier `src`. Écrire `import x from "@/stores/cart"` au lieu de `../../../`.

## Variables d’environnement

Dans Vite, les variables exposées au front doivent commencer par `VITE_` :

```ts
import.meta.env.VITE_API_URL
```

**Jamais** un secret (clé privée, mot de passe) dans `VITE_*` : tout le JS part chez le client, n’importe qui le lit. Les secrets restent au **BFF / serveur**.

`process.env` est un réflexe Node / Webpack. Dans un coding game Vite, c’est `import.meta.env`.

## Ce que tu fais concrètement le jour J

Tu ne **configures** presque jamais Webpack. Tu dois :

- savoir **pourquoi** ça compile ;
- connaître `npm run dev` / `build` / `preview` ;
- dire « Nuxt 3 = Vite, Nuxt 2 = Webpack » ;
- ne pas installer Webpack dans un projet Vite « par habitude ».

Chapitre 9 : une fois le front lancé, il parle au back.
