# Solutions (réservé aux parents 🤫)

> Ne publiez pas ce dossier `parents/` si les enfants ont accès au dépôt.

| Jour | Titre | Réponse |
|---|---|---|
| 1 | Le message des lutins | **SAPIN** |
| 2 | Le code de César | **renne** |
| 3 | La hotte déborde | **45** |

## Jour 1 — Le message des lutins

- Indice 1 : Un octet se lit de droite à gauche : les positions valent 1, 2, 4, 8, 16, 32, 64 et 128. Ajoute les valeurs là où il y a un « 1 ».
- Indice 2 : Utilise la calculette : allume les bits du premier groupe. Tu dois obtenir un nombre entre 65 et 90, ce sont les lettres majuscules.
- Indice 3 : Le premier octet vaut 83. Dans l'alphabet, 65 = A, donc 83 = A + 18, c'est la 19ᵉ lettre : « S ». Continue avec les 4 autres !

## Jour 2 — Le code de César

- Indice 1 : Dans une phrase en français, il y a souvent le petit mot « LE ». Ici, que vaut « QJ » ? Quel décalage transforme QJ en LE ?
- Indice 2 : Avec la roue ou le curseur, essaie les décalages un par un jusqu'à ce qu'une phrase lisible apparaisse. Il n'y a que 25 possibilités !
- Indice 3 : Le décalage est 5. Le message se termine par le mot de passe, en un seul mot.

## Jour 3 — La hotte déborde

- Indice 1 : Avance ligne par ligne en notant la valeur de « cadeaux » après chaque ligne. Commence par 12 × 7.
- Indice 2 : Après la 4ᵉ ligne, cadeaux vaut 75. Ensuite 75 // 5, puis défauts = ce nombre % 4.
- Indice 3 : cadeaux = 15, donc défauts = 15 % 4 = 3. La dernière ligne ajoute 3 × 10 à 15.
