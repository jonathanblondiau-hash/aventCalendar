# 🎄 Le Calendrier de l'Avent de Pixel

Un calendrier de l'Avent pour deux ados curieux : 24 énigmes (programmation, cryptographie, IA, nouvelles technologies, OSINT fictif)
avec un fil rouge — réparer le serveur du Pôle Nord — et des récompenses chaque semaine (jours 7, 14, 21 et 24).

Site 100 % statique : aucun serveur, aucune base de données, aucune donnée envoyée nulle part.
La progression est sauvegardée dans le navigateur de l'appareil (un seul profil partagé).

## État actuel

| Jours | Statut |
|---|---|
| 1 — Binaire, ASCII & premier programme Python | ✅ prêt |
| 2 — César, fonctions & force brute | ✅ prêt |
| 3 — Variables en Python | ✅ prêt |
| 4 — Boucles, conditions & compteurs (journal de connexions) | ✅ prêt |
| 5 — Logique booléenne (coffre à 4 interrupteurs, 📱 possible) | ✅ prêt |
| 6 — Hexadécimal & couleurs | ✅ prêt |
| 7 — Boss de la semaine 1 + **clé n°1** + **récompense** | ✅ prêt |
| 8 à 24 | 🛠️ à écrire (les portes affichent « Bientôt… ») |

## Récompenses

Chaque semaine (jours 7, 14, 21, 24), l'énigme finale donne une **clé** (collectée dans le trousseau en haut de page, elle servira
au décryptage final) et une **récompense réelle** dont la cachette est chiffrée.
**À personnaliser par les parents :** `REWARDS` en haut de `tools/generate.mjs` (cachette en MAJUSCULES sans accents, puis
`node tools/generate.mjs`). Par défaut : « SOUS LE SAPIN ».

## Tester avant décembre

Les portes s'ouvrent selon la date réelle (1er au 24 décembre). Pour tester :

- `index.html?jour=3` : simule le 3 décembre
- `index.html?tout` : débloque toutes les portes

## Mise en ligne (déploiement automatique)

Chaque `push` sur `main` redéploie le site via `.github/workflows/pages.yml`.
**Réglage à faire une seule fois :** *Settings → Pages → Build and deployment → Source : GitHub Actions.*
Adresse : `https://<compte>.github.io/<dépôt>/`.

Seuls `index.html`, `css/` et `js/` sont publiés : le dossier `parents/` (solutions) et `tools/` restent dans le dépôt
mais ne sont **pas** accessibles sur le site. (Si le dépôt est public, ils restent lisibles sur GitHub.)
Les réponses dans le site sont **hachées** (SHA-256) : on ne peut pas les lire en regardant le code source.

## Python dans le navigateur

Le « Labo Python » utilise [Pyodide](https://pyodide.org) (Python compilé en WebAssembly), chargé depuis un CDN la première fois
(~10 Mo, 10 à 20 secondes). Il faut donc une connexion internet. Le code est exécuté dans un Web Worker : une boucle infinie
est arrêtée au bout de 8 secondes sans figer la page.

## Ajouter ou modifier un jour

1. Éditer `tools/generate.mjs` (le contenu et la réponse en clair de chaque jour y sont définis).
2. `node tools/generate.mjs` → régénère `js/days.js` (réponses hachées) et `parents/SOLUTIONS.md`.

Outils interactifs disponibles pour un jour : `widget: { type: 'bits' | 'cesar' | 'switches' | 'swatches' }`, `python: { label, code, open }`
(utiliser `___` pour les trous à remplir), `after: { python }` (affiché après résolution) et `key: { n, value }` (clé du trousseau).

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
