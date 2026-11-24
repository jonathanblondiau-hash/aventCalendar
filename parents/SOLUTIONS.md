# Solutions (réservé aux parents 🤫)

> Ne publiez pas ce dossier `parents/` si les enfants ont accès au dépôt.

| Jour | Titre | Réponse |
|---|---|---|
| 1 | Le message des lutins | **LUTIN** |
| 2 | Le code de César | **rudolph** ou **rudolphe** |
| 3 | La hotte déborde | **45** |

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
