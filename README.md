# 🎄 Le Calendrier de l'Avent de Pixel

Un calendrier de l'Avent pour deux ados curieux : 24 énigmes (programmation, cryptographie, IA, nouvelles technologies, OSINT fictif)
avec un fil rouge — réparer le serveur du Pôle Nord — et des récompenses chaque semaine (jours 7, 14, 21 et 24).

Site 100 % statique : aucun serveur, aucune base de données, aucune donnée envoyée nulle part.
La progression est sauvegardée dans le navigateur de l'appareil (un seul profil partagé).

## État actuel

| Jours | Statut |
|---|---|
| 1 — Binaire & ASCII | ✅ prêt |
| 2 — Chiffre de César | ✅ prêt |
| 3 — Variables en Python | ✅ prêt |
| 4 à 24 | 🛠️ à écrire (les portes affichent « Bientôt… ») |

## Tester avant décembre

Les portes s'ouvrent selon la date réelle (1er au 24 décembre). Pour tester :

- `index.html?jour=3` : simule le 3 décembre
- `index.html?tout` : débloque toutes les portes

## Mettre en ligne (GitHub Pages)

*Settings → Pages → Deploy from a branch → `main` / racine.* Le site sera sur `https://<compte>.github.io/<dépôt>/`.

⚠️ Le dossier `parents/` contient les solutions : si les enfants peuvent parcourir le dépôt, ne le publiez pas (ou supprimez-le).
Les réponses dans le site sont **hachées** (SHA-256) : on ne peut pas les lire en regardant le code source.

## Python dans le navigateur

Le « Labo Python » utilise [Pyodide](https://pyodide.org) (Python compilé en WebAssembly), chargé depuis un CDN la première fois
(~10 Mo, 10 à 20 secondes). Il faut donc une connexion internet. Le code est exécuté dans un Web Worker : une boucle infinie
est arrêtée au bout de 8 secondes sans figer la page.

## Ajouter ou modifier un jour

1. Éditer `tools/generate.mjs` (le contenu et la réponse en clair de chaque jour y sont définis).
2. `node tools/generate.mjs` → régénère `js/days.js` (réponses hachées) et `parents/SOLUTIONS.md`.

Outils interactifs disponibles pour un jour : `widget: { type: 'bits' | 'cesar' }` et `python: { label, code }`
(utiliser `___` pour les trous à remplir).

## Fichiers

```
index.html        page unique
css/style.css     thème
js/app.js         portes, dates, énigmes, progression
js/widgets.js     calculette binaire, roue de César, labo Python
js/pyrunner.js    exécution de Python (Pyodide + Web Worker)
js/sha256.js      vérification des réponses
js/days.js        GÉNÉRÉ — contenu des jours
tools/generate.mjs  source du contenu + générateur
parents/SOLUTIONS.md  GÉNÉRÉ — réponses et indices
```
