# Solutions (réservé aux parents 🤫)

> Ne publiez pas ce dossier `parents/` si les enfants ont accès au dépôt.
> Le site n'affiche que l'**indice 1** de chaque jour ; les indices 2 et 3 (plus révélateurs) sont réservés aux parents, ci-dessous.

**Récompense semaine 1** : cachette « DANS LE FRIGO » (une surprise). À modifier dans `tools/generate.mjs` (REWARDS), puis `node tools/generate.mjs`.

| Jour | Titre | Réponse |
|---|---|---|
| 1 | Le message des lutins | **LUTIN** |
| 2 | Le code de César | **rudolph** ou **rudolphe** |
| 3 | La hotte déborde | **45** |
| 4 | Les traces du pirate | **67** |
| 5 | Le coffre du pirate | **0111** |
| 6 | Les couleurs du pirate | **cheminee** ou **lacheminee** |
| 7 | Le coffre-fort de la semaine | **etoile** ou **letoile** |

## Jour 1 — Le message des lutins

- Indice 1 : Il y a 40 octets : à la main, c'est très long. Le labo Python lit les octets un par un dans une boucle : il te manque seulement deux morceaux.
- Indice 2 : Trou 1 : le binaire s'écrit avec deux chiffres (0 et 1), donc c'est la base… 2. Trou 2 : ord() va de la lettre vers le nombre ; la fonction inverse, qui va du nombre vers la lettre, s'appelle chr().
- Indice 3 : Remplace le premier ___ par 2 et le second par chr, puis clique sur Exécuter. Le programme affiche la phrase du pirate : cherche le nom du dossier.

## Jour 2 — Le code de César

- Indice 1 : Le pirate a décalé toutes les lettres du même nombre de crans, mais tu ne sais pas lequel : l'ordinateur va tous les essayer. Dans la fonction, il manque l'endroit où l'on utilise l'entrée « decalage ».
- Indice 2 : Pour reculer de « decalage » crans, on soustrait le paramètre de la fonction. Dans la ligne avec le trou, il faut écrire le nom de ce paramètre.
- Indice 3 : Remplace ___ par decalage, puis exécute. Parmi les 25 lignes, une seule est lisible. Elle te demande le nom d'un animal célèbre : celui du Père Noël qui a le nez rouge.

## Jour 3 — La hotte déborde

- Indice 1 : Avance ligne par ligne en notant la valeur de « cadeaux » après chaque ligne. Commence par 12 × 7.
- Indice 2 : Après la 4ᵉ ligne, cadeaux vaut 75. Ensuite 75 // 5, puis défauts = ce nombre % 4.
- Indice 3 : cadeaux = 15, donc défauts = 15 % 4 = 3. La dernière ligne ajoute 3 × 10 à 15.

## Jour 4 — Les traces du pirate

- Indice 1 : Le journal est bien trop long pour être lu à la main : une boucle <code>for</code> le parcourt ligne par ligne. Chaque ligne est coupée en trois morceaux (heure, compte, résultat). Il te manque les deux valeurs à comparer : ce sont des textes, donc entre guillemets.
- Indice 2 : Trou 1 : <code>"pere_noel"</code> (le nom exact du compte). Trou 2 : <code>"SUCCES"</code> (en majuscules, comme dans le fichier).
- Indice 3 : Le résultat est un nombre entre 40 et 80. Si ton programme affiche un nombre très différent, vérifie l'orthographe des deux textes entre guillemets.

## Jour 5 — Le coffre du pirate

- Indice 1 : Commence par les règles qui t'imposent le plus de choses. La règle 1 te dit : soit A est levé et B baissé, soit l'inverse. Étudie ces deux cas séparément.
- Indice 2 : Cas « A levé » : la règle 3 force D à 0, puis la règle 2 force C à 0 (car si C était levé, D devrait l'être). Combien d'interrupteurs sont alors levés ? La règle 6 est-elle respectée ?
- Indice 3 : Le cas « A levé » est impossible. Donc A = 0 et B = 1. Ensuite la règle 5 force C, puis la règle 2 force D. Combinaison : 0, 1, 1, 1.

## Jour 6 — Les couleurs du pirate

- Indice 1 : Le labo ne contient que 2 couleurs : recopie les autres depuis l'énoncé. Chaque couleur contient 3 nombres de 2 chiffres hexadécimaux, donc 3 lettres : la boucle interne doit les lire un par un, en sautant de 2 caractères à chaque fois.
- Indice 2 : Trou 1 : on avance de 2 en 2. Trou 2 : l'hexadécimal, c'est « base 16 » (comme « base 2 » pour le binaire au jour 1).
- Indice 3 : Remplace le premier ___ par 2 et le second par 16, puis exécute. Le programme affiche une phrase : il te demande l'endroit par où il est passé.

## Jour 7 — Le coffre-fort de la semaine

- Indice 1 : Deux étapes enchaînées : d'abord transformer l'hexadécimal en texte (c'est le travail de <code>hex_vers_texte</code>), puis casser le César sur ce texte (la fonction <code>dechiffrer</code>, déjà écrite).
- Indice 2 : Trou 1 : l'hexadécimal, c'est la base 16. Trou 2 : <code>range(1, 26)</code> va de 1 à 25. Trou 3 : un appel à la fonction : <code>dechiffrer(texte, essai)</code>.
- Indice 3 : Lance le programme : 25 lignes s'affichent, une seule est une vraie phrase. La clé est cachée dans une partie du sapin qui brille en haut.
