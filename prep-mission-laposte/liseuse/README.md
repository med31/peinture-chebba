# Livre liseuse

PDF : [`Cours-Vue-Nuxt-La-Poste-liseuse.pdf`](Cours-Vue-Nuxt-La-Poste-liseuse.pdf)

Format **5,5 × 7,5 pouces** (proche d’un écran 6"), texte noir sur fond blanc, code qui passe à la ligne, numéros de page. **138 pages**. Tout le cours + les fiches jour J (cheatsheets, QCM, oral, checklist).

## Copier sur la liseuse

### Kobo
1. Branche en USB.
2. Ouvre le dossier de la liseuse (souvent `KOBOeReader`).
3. Dépose le PDF dans le dossier des livres (racine ou `Books`).
4. Éjecte. Le livre apparaît dans Ma bibliothèque.

### Kindle
1. USB : dossier `documents`, puis éjecte.
2. Ou envoie le fichier à ton adresse *Send-to-Kindle* (PDF accepté).
3. Sur Kindle, tu peux agrandir un peu les marges / le contraste, pas le texte comme un EPUB.

### Calibre (optionnel)
Ajoute le PDF, convertis en EPUB si tu veux que le texte **reflue** (changement de police). Le PDF est déjà taillé pour ne pas être minuscule.

## Regénérer

```bash
cd prep-mission-laposte
npm install
npm run pdf
```
