#!/usr/bin/env node
/**
 * Assemble le cours + fiches jour J en un HTML livre, puis imprime un PDF liseuse.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "liseuse");

marked.setOptions({ gfm: true, breaks: false });

const slugify = (text) =>
  String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const PARTS = [
  {
    title: "Première partie — Le cours",
    files: [
      ["cours/01-le-projet-la-poste.md", "1. Le projet La Poste"],
      ["cours/02-comment-une-page-web-marche.md", "2. Comment une page web marche"],
      ["cours/03-vuejs-3.md", "3. Vue.js 3"],
      ["cours/04-composition-api.md", "4. Composition API"],
      ["cours/05-nuxt-ssr-seo.md", "5. Nuxt, SSR et SEO"],
      ["cours/06-pinia-et-vuex.md", "6. Pinia et Vuex"],
      ["cours/00-fil-rouge-ajouter-au-panier.md", "Fil rouge — Un clic « Ajouter au panier »"],
      ["cours/07-typescript.md", "7. TypeScript"],
      ["cours/08-vite-et-webpack.md", "8. Vite et Webpack"],
      ["cours/09-rest-et-graphql.md", "9. REST et GraphQL"],
      ["cours/10-microservices.md", "10. Micro-services"],
      ["cours/11-sass-et-bem.md", "11. SASS et BEM"],
      ["cours/12-design-system.md", "12. Design system"],
      ["cours/13-tests-tdd-bdd.md", "13. Tests, TDD et BDD"],
      ["cours/14-accessibilite-wcag.md", "14. Accessibilité WCAG"],
      ["cours/15-gitlab-docker-cicd.md", "15. GitLab, Docker, CI/CD"],
      ["cours/16-eslint-prettier.md", "16. ESLint et Prettier"],
      ["cours/17-agile-scrum.md", "17. Agile / Scrum"],
      ["cours/18-perf-et-seo.md", "18. Performances et SEO"],
      ["cours/19-visite-guidee-du-code.md", "19. Visite guidée du mini-projet"],
      ["cours/20-glossaire.md", "20. Glossaire"],
      ["cours/21-questions-frequentes.md", "21. Questions fréquentes"],
    ],
  },
  {
    title: "Deuxième partie — Fiches jour J",
    files: [
      ["docs/01-strategie-coding-game.md", "Stratégie du coding game"],
      ["docs/02-cheatsheet-vue3.md", "Cheatsheet Vue 3"],
      ["docs/03-cheatsheet-nuxt-pinia.md", "Cheatsheet Nuxt et Pinia"],
      ["docs/04-cheatsheet-ts-sass-bem-a11y.md", "Cheatsheet TypeScript, SASS, BEM, a11y"],
      ["docs/05-qcm.md", "QCM d’entraînement"],
      ["docs/06-entretien-oral.md", "Entretien oral"],
      ["docs/07-checklist-jour-j.md", "Checklist jour J"],
      ["docs/08-entrainement-chrono.md", "Entraînement chrono"],
      ["docs/09-snippets-jour-j.md", "Snippets à recoller"],
      ["docs/10-mapping-offre.md", "Mapping fiche de poste"],
    ],
  },
];

function stripFirstHeading(md) {
  return md.replace(/^# .+\n+/, "");
}

function rewriteLinks(md) {
  return md
    .replace(/\]\((?:\.\.\/)?cours\/([^)#]+)\.md\)/g, "](#ch-$1)")
    .replace(/\]\((?:\.\.\/)?docs\/([^)#]+)\.md\)/g, "](#ch-$1)")
    .replace(/\]\(([^)#]+)\.md\)/g, "](#ch-$1)");
}

function chapterHtml(relPath, title) {
  const raw = readFileSync(join(root, relPath), "utf8");
  const id = `ch-${relPath.split("/").pop().replace(/\.md$/, "")}`;
  const body = marked.parse(rewriteLinks(stripFirstHeading(raw)));
  return {
    id,
    title,
    html: `<section class="chapter" id="${id}"><h1>${title}</h1>${body}</section>`,
  };
}

const chapters = [];
let book = "";

for (const part of PARTS) {
  book += `<section class="part-title"><h1>${part.title}</h1></section>\n`;
  for (const [file, title] of part.files) {
    const chapter = chapterHtml(file, title);
    chapters.push(chapter);
    book += chapter.html + "\n";
  }
}

const toc = chapters
  .map((chapter) => `<li><a href="#${chapter.id}">${chapter.title}</a></li>`)
  .join("\n");

const css = readFileSync(join(outDir, "ereader.css"), "utf8");

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Cours Vue.js / Nuxt — mission e-commerce La Poste</title>
  <style>${css}</style>
</head>
<body>
  <section class="title-page">
    <h1>Cours Vue.js&nbsp;/ Nuxt</h1>
    <p class="subtitle">Mission e-commerce La&nbsp;Poste<br />DT eCommerce — DSI BGPN</p>
    <p class="meta">
      Préparation coding game et entretien<br />
      Livre format liseuse (texte noir, pages compactes)<br />
      À lire dans l’ordre, un chapitre à la fois
    </p>
  </section>

  <section class="front-matter note-liseuse">
    <h1>Comment lire ce livre</h1>
    <p>Ce livre rassemble tout le kit de préparation. Tu n’as pas besoin d’internet. Les exemples parlent d’une boutique La&nbsp;Poste (colis, timbres, cartons).</p>
    <p>Lis d’abord les chapitres 1 à 6, puis le fil rouge du clic «&nbsp;Ajouter au panier&nbsp;». Ensuite les chapitres 7 à 21. Les fiches de la deuxième partie se relisent la veille du test.</p>
    <p>Sur une liseuse, agrandis un peu la police du lecteur si le code te paraît petit. Les blocs de code passent à la ligne pour rester lisibles.</p>
    <p>Si un sigle bloque, va au glossaire (chapitre 20). Les questions du type «&nbsp;pourquoi .value&nbsp;?&nbsp;» sont au chapitre 21.</p>
  </section>

  <section class="front-matter toc">
    <h1>Sommaire</h1>
    <ol>
      ${toc}
    </ol>
  </section>

  ${book}
</body>
</html>
`;

mkdirSync(outDir, { recursive: true });
const htmlPath = join(outDir, "livre.html");
const pdfPath = join(outDir, "Cours-Vue-Nuxt-La-Poste-liseuse.pdf");
writeFileSync(htmlPath, html, "utf8");

const chrome = process.env.CHROME_PATH || "google-chrome";
const profile = mkdtempSync(join(tmpdir(), "liseuse-chrome-"));
try {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-background-networking",
      "--disable-sync",
      "--disable-extensions",
      "--disable-component-update",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profile}`,
      "--no-pdf-header-footer",
      "--hide-scrollbars",
      "--generate-pdf-document-outline",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "inherit", timeout: 45_000 },
  );
} catch (error) {
  const timedOut = error && typeof error === "object" && "code" in error && error.code === "ETIMEDOUT";
  const pdf = readFileSync(pdfPath);
  if (!timedOut || !pdf.subarray(0, 4).equals(Buffer.from("%PDF"))) {
    throw error;
  }
} finally {
  rmSync(profile, { recursive: true, force: true });
}

console.log(`PDF écrit : ${pdfPath}`);
