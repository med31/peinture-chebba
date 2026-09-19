# Kit de préparation — mission Vue.js / Nuxt La Poste (DT eCommerce)

Ce dossier te prépare **au coding game et à l’entretien** pour une prestation front Vue 3 / Nuxt sur les interfaces e-commerce de la DSI BGPN.

## Par où commencer

**Si tu veux comprendre (sans internet)** — lis le cours, dans l’ordre :

→ **[cours/README.md](cours/README.md)**

Chaque notion de l’offre (Vue, Nuxt, Pinia, TypeScript, REST/GraphQL, micro-services, SASS/BEM, Figma/Storybook, tests, WCAG, GitLab/Docker, Agile, SEO) y est expliquée avec des exemples « boutique La Poste ». Le [glossaire](cours/20-glossaire.md) définit tous les sigles. Les [FAQ](cours/21-questions-frequentes.md) répondent aux blocages classiques (`.value`, `storeToRefs`, Vue vs Nuxt…).

**Ensuite**, tu mémorises et tu t’entraînes :

```bash
cd prep-mission-laposte
npm install
npm test          # 21 tests type coding game
npm run dev       # mini boutique http://localhost:5173
```

**Liseuse** : le livre PDF (cours + fiches jour J, 138 pages, format 6") est dans [`liseuse/Cours-Vue-Nuxt-La-Poste-liseuse.pdf`](liseuse/Cours-Vue-Nuxt-La-Poste-liseuse.pdf). Mode d’emploi : [`liseuse/README.md`](liseuse/README.md).

| Temps | Faire |
|---|---|
| **Comprendre** | [Cours](cours/README.md) + [fil rouge du clic panier](cours/00-fil-rouge-ajouter-au-panier.md) + [visite du code](cours/19-visite-guidee-du-code.md) |
| **2 heures avant le test** | [stratégie](docs/01-strategie-coding-game.md) + [cheatsheet Vue](docs/02-cheatsheet-vue3.md) + `npm test` + [snippets](docs/09-snippets-jour-j.md) |
| **1 journée** | + `npm run dev` + [QCM](docs/05-qcm.md) + [chrono](docs/08-entrainement-chrono.md) |
| **Veille** | [oral](docs/06-entretien-oral.md) + [checklist](docs/07-checklist-jour-j.md) |

## Contenu du dossier

| Dossier | Rôle |
|---|---|
| `cours/` | Explications complètes, comme un formateur |
| `docs/` | Fiches courtes à mémoriser, QCM, oral, jour J |
| `src/` | Mini e-commerce + algos + exercices Vue |
| `tests/` | Ce que le coding game vérifie |

Tu n’as pas l’énoncé exact du test. Le format ESN + La Poste + Vue/Nuxt senior est presque toujours : **QCM + algo JS + mini-app liste/panier**. Le cours t’explique le **pourquoi** ; le mini-projet t’entraîne au **comment**.
