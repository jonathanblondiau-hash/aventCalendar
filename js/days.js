// FICHIER GÉNÉRÉ par tools/generate.mjs — ne pas modifier à la main.
window.DAYS = [
 {
  "day": 1,
  "title": "Le message des lutins",
  "concept": "Binaire, ASCII & premier programme",
  "device": "laptop",
  "minutes": 20,
  "story": "<p class=\"alert\">🚨 ALERTE CYBERATTAQUE — Pôle Nord, 1er décembre, 6 h 12</p>\n<p><b>Pixel, lutin informaticien :</b> « Ce matin, tous les écrans de l'atelier se sont éteints ! Quelqu'un est entré dans le serveur du Père Noël : la liste des enfants sages, la carte du traîneau… tout est verrouillé. Le pirate n'a laissé qu'une seule trace dans les journaux du système, écrite en <b>0</b> et en <b>1</b>, la seule langue que comprennent les ordinateurs. Il y a des dizaines d'octets, et je n'ai pas le temps de tout décoder à la main. Heureusement, tu as un ordinateur… »</p>",
  "puzzle": "<p>Chaque groupe de 8 chiffres (un <b>octet</b>) est un nombre écrit en <b>binaire</b>, et chaque nombre correspond à une lettre (table ASCII : A = 65, B = 66, C = 67…, l'espace = 32). Voici le message du pirate :</p>\n<pre class=\"code\">01001100 01000101 00100000 01010000 01001001 01010010 01000001 01010100 01000101 00100000 01010011 01000101 00100000 01000011 01000001 01000011 01001000 01000101 00100000 01000100 01000001 01001110 01010011 00100000 01001100 01000101 00100000 01000100 01001111 01010011 01010011 01001001 01000101 01010010 00100000 01001100 01010101 01010100 01001001 01001110</pre>\n<p>Il y a 40 octets. Décoder ça à la main, c'est possible… mais très long. <b>Dans quel dossier le pirate se cache-t-il ?</b></p>\n<p class=\"note\">Astuce de détective : apprends à l'ordinateur à le faire à ta place. Le labo Python ci-dessous contient déjà presque tout le programme.</p>",
  "widget": {
   "type": "bits",
   "label": "Calculette binaire — pour comprendre UN octet (elle donne le nombre, à toi de trouver la lettre)"
  },
  "python": {
   "open": true,
   "label": "Labo Python — le décodeur du pirate (2 trous à remplir)",
   "code": "# ord() transforme une lettre en nombre : ord(\"A\") donne 65\n# int(texte, base) transforme un texte écrit dans une base en nombre : int(\"101\", 10) donne 101\n\nmessage = (\"01001100 01000101 00100000 01010000 01001001 \"\n           \"01010010 01000001 01010100 01000101 00100000 \"\n           \"01010011 01000101 00100000 01000011 01000001 \"\n           \"01000011 01001000 01000101 00100000 01000100 \"\n           \"01000001 01001110 01010011 00100000 01001100 \"\n           \"01000101 00100000 01000100 01001111 01010011 \"\n           \"01010011 01001001 01000101 01010010 00100000 \"\n           \"01001100 01010101 01010100 01001001 01001110\")\n\nresultat = \"\"\nfor octet in message.split(\" \"):          # on traite les octets un par un\n    nombre = int(octet, ___)              # trou 1 : binaire = base ... ?\n    resultat = resultat + ___(nombre)     # trou 2 : la fonction qui fait le chemin inverse de ord()\n\nprint(resultat)"
  },
  "hints": [
   "Il y a 40 octets : à la main, c'est très long. Le labo Python lit les octets un par un dans une boucle : il te manque seulement deux morceaux.",
   "Trou 1 : le binaire s'écrit avec deux chiffres (0 et 1), donc c'est la base… 2. Trou 2 : ord() va de la lettre vers le nombre ; la fonction inverse, qui va du nombre vers la lettre, s'appelle chr().",
   "Remplace le premier ___ par 2 et le second par chr, puis clique sur Exécuter. Le programme affiche la phrase du pirate : cherche le nom du dossier."
  ],
  "explain": "<p><b>Message décodé :</b> « LE PIRATE SE CACHE DANS LE DOSSIER LUTIN ».</p>\n<p>Tu viens d'écrire ton premier <b>programme de forensique</b> : une <b>boucle</b> (<code>for</code>) qui répète la même opération sur chaque octet. Ton ordinateur stocke <em>tout</em> sous forme de nombres : les lettres, les images, la musique… Pour les lettres, il utilise un tableau de correspondance appelé <b>ASCII</b> (inventé dans les années 1960). Aujourd'hui, le standard <b>Unicode</b> va beaucoup plus loin : l'émoji 🎄 est le nombre 127 876 !</p>\n<p class=\"clue\">🕵️ <b>Piste n°1 :</b> le pirate se cache dans un dossier nommé « lutin ». Demain, on y entre.</p>",
  "h": [
   "c0bdcf278de59a5b05153a1374a4bc65bb5504679e152f27c02ee89c3887d181"
  ]
 },
 {
  "day": 2,
  "title": "Le code de César",
  "concept": "Cryptographie, fonctions & force brute",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Le dossier « lutin » existait bien ! Il contient un seul fichier : un message que le pirate envoie à un complice. Mais il l'a <b>chiffré</b>, comme le faisait déjà Jules César il y a 2 000 ans : chaque lettre est <b>décalée</b> dans l'alphabet. Le problème : on ne sait pas de combien de crans. »</p>",
  "puzzle": "<p>Le pirate a décalé toutes les lettres du même nombre de crans (le « décalage »), mais il ne l'a écrit nulle part. Voici son message :</p>\n<pre class=\"code\">SL TVA KL WHZZL LZA SL UVT KB YLUUL HB ULG YVBNL</pre>\n<p>Il n'y a que <b>25 décalages possibles</b>. Plutôt que de les tester un par un à la main, fais-les tester par l'ordinateur : une seule des 25 lignes affichées sera une vraie phrase.</p>\n<p><b>Quel est le mot de passe du pirate ?</b> <em>(Le message ne le donne pas directement : lis-le bien.)</em></p>",
  "python": {
   "open": true,
   "label": "Labo Python — le casseur de code (1 trou à remplir)",
   "code": "message = \"SL TVA KL WHZZL LZA SL UVT KB YLUUL HB ULG YVBNL\"\n\n# Une fonction = un petit programme réutilisable, avec un nom et des « entrées »\ndef dechiffrer(texte, decalage):\n    resultat = \"\"\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            numero = ord(lettre) - 65                  # A=0, B=1, ... Z=25\n            nouveau = (numero - ___) % 26              # trou : de combien de crans recule-t-on ?\n            resultat = resultat + chr(nouveau + 65)\n    return resultat\n\n# On essaie les 25 décalages possibles et on regarde lequel donne une vraie phrase\nfor essai in range(1, 26):\n    print(essai, dechiffrer(message, essai))"
  },
  "hints": [
   "Le pirate a décalé toutes les lettres du même nombre de crans, mais tu ne sais pas lequel : l'ordinateur va tous les essayer. Dans la fonction, il manque l'endroit où l'on utilise l'entrée « decalage ».",
   "Pour reculer de « decalage » crans, on soustrait le paramètre de la fonction. Dans la ligne avec le trou, il faut écrire le nom de ce paramètre.",
   "Remplace ___ par decalage, puis exécute. Parmi les 25 lignes, une seule est lisible. Elle te demande le nom d'un animal célèbre : celui du Père Noël qui a le nez rouge."
  ],
  "explain": "<p><b>Message déchiffré :</b> « LE MOT DE PASSE EST LE NOM DU RENNE AU NEZ ROUGE » (décalage de 7). Et le renne au nez rouge s'appelle <b>Rudolph</b> !</p>\n<p>Ce que tu viens de faire s'appelle une attaque par <b>force brute</b> : tester toutes les clés possibles. Avec seulement 25 clés, un ordinateur en vient à bout en une fraction de seconde. Les chiffres modernes (ceux qui protègent ta banque ou tes messages) ont des clés tellement grandes qu'il faudrait des milliards d'années pour toutes les essayer.</p>\n<p>Tu as aussi écrit… une <b>fonction</b> : un bloc de code qu'on nomme une fois et qu'on réutilise autant de fois qu'on veut (ici, 25 fois).</p>\n<p><b>Le saviez-vous ?</b> Au IXᵉ siècle, le savant arabe Al-Kindi a trouvé une méthode plus maligne : compter les lettres. Dans un texte français, le « E » est la lettre la plus fréquente. Si ton message chiffré a beaucoup de « H », il y a de bonnes chances que « H » représente « E » !</p>\n<p class=\"clue\">🕵️ <b>Piste n°2 :</b> le mot de passe du pirate est « rudolph ». Il va nous ouvrir le programme qu'il a lancé sur la hotte…</p>",
  "h": [
   "24c67be09a44907a033f91e931edb6062683759b8cc333b549b9dd15626370f1",
   "6160483fa175c69371f87a8ddd20105abec955b3a448d2377a869222e5b0fda8"
  ]
 },
 {
  "day": 3,
  "title": "La hotte déborde",
  "concept": "Variables & calculs en Python",
  "device": "laptop",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Grâce au mot de passe « rudolph », on a pu ouvrir le programme que le pirate a lancé sur la hotte du traîneau ! C'est un <b>script de sabotage</b>. Un bon enquêteur ne l'exécute jamais à l'aveugle : il le <b>lit</b> et il prévoit ce qu'il va faire. Combien de cadeaux ce script va-t-il faire disparaître ? »</p>",
  "puzzle": "<p>Voici un petit programme Python. Une <b>variable</b> est une boîte qui porte un nom et qui contient une valeur ; on peut la modifier au fil du programme.</p>\n<pre class=\"code\">lutins = 12\npar_lutin = 7\ncadeaux = lutins * par_lutin\ncadeaux = cadeaux - 9\ncadeaux = cadeaux // 5\ndefauts = cadeaux % 4\ncadeaux = cadeaux + defauts * 10\nprint(cadeaux)</pre>\n<p><b>Quel nombre ce programme affiche-t-il ?</b> C'est le nombre de cadeaux volés. Fais le calcul ligne par ligne, puis vérifie dans le labo si tu veux.</p>\n<p class=\"note\">Deux symboles nouveaux : <code>//</code> est la <b>division entière</b> (on garde seulement la partie entière du résultat) et <code>%</code> est le <b>modulo</b> (le reste de la division).</p>",
  "python": {
   "label": "Labo Python — comprends « // » et « % » avant de résoudre",
   "code": "print(17 / 5)     # division normale\nprint(17 // 5)    # division entière : combien de fois 5 « rentre » dans 17 ?\nprint(17 % 5)     # modulo : ce qui reste après cette division\n\nreste = 23 ___ 4  # remplace ___ pour que reste vaille 3\nprint(reste)\n\n# Ton tour : recopie ici le programme de l'énoncé et regarde ce qu'il affiche !"
  },
  "hints": [
   "Avance ligne par ligne en notant la valeur de « cadeaux » après chaque ligne. Commence par 12 × 7.",
   "Après la 4ᵉ ligne, cadeaux vaut 75. Ensuite 75 // 5, puis défauts = ce nombre % 4.",
   "cadeaux = 15, donc défauts = 15 % 4 = 3. La dernière ligne ajoute 3 × 10 à 15."
  ],
  "explain": "<p><b>Réponse : 45.</b> Tu viens de faire ce que fait un ordinateur : exécuter des instructions <em>dans l'ordre</em>, en gardant en mémoire des variables.</p>\n<p>Le modulo <code>%</code> est partout : pour savoir si un nombre est pair (<code>n % 2 == 0</code>), pour faire tourner une horloge (<code>heure % 24</code>), et même… dans le chiffre de César que tu as utilisé hier !</p>\n<p><b>Le saviez-vous ?</b> Python porte le nom de la troupe comique des <em>Monty Python</em>, pas du serpent. Son créateur, Guido van Rossum, adorait leurs sketchs.</p>\n<p class=\"clue\">🕵️ <b>Piste n°3 :</b> le pirate fait disparaître 45 cadeaux. Il prépare quelque chose de bien plus gros… Demain, on commence à réparer !</p>",
  "h": [
   "4368fe93a6624296265e3dc44864485f4a236dd9709fd15c44375cad7b28e301"
  ]
 },
 {
  "day": 4,
  "title": "Les traces du pirate",
  "concept": "Boucles, conditions & compteurs",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Le sabotage de la hotte nous a donné une idée : le serveur garde un <b>journal de connexions</b>. Chaque ligne dit <em>à quelle heure</em> et <em>quel compte</em> s'est connecté. Or le vrai Père Noël dort la nuit… Si quelqu'un utilise son compte « pere_noel » entre <b>2 h et 4 h du matin</b>, ce n'est pas lui ! »</p>",
  "puzzle": "<p>Voici le journal de la nuit (heure, compte) :</p>\n<pre class=\"code\">21:14  lutin_cuisine\n21:40  pere_noel\n22:03  renne_gps\n22:37  pixel\n23:05  mere_noel\n23:48  pere_noel_2\n00:12  pixel\n00:55  pere_noel\n01:08  renne_gps\n01:59  pere_noel\n02:00  pere_noel\n02:17  lutin_cuisine\n02:41  pere_noel\n02:42  pere_noel_2\n03:03  pere_noel\n03:19  pixel\n03:20  pere_noel\n03:47  pere_noel\n04:06  mere_noel\n04:32  pere_noel\n04:59  pere_noel\n05:00  pere_noel\n05:21  renne_gps\n05:44  pere_noel_2\n06:10  pixel\n06:45  pere_noel</pre>\n<p><b>Combien de fois le compte exact « pere_noel » s'est-il connecté entre 2 h 00 et 4 h 59 (inclus) ?</b></p>\n<p class=\"note\">Attention aux pièges : « pere_noel_2 » est un autre compte (celui d'un lutin), et les heures pile comptent. Tu peux compter à la main… ou apprendre à l'ordinateur à le faire.</p>",
  "python": {
   "open": true,
   "label": "Labo Python — le compteur de connexions suspectes (2 trous à remplir)",
   "code": "journal = [\n    (\"21:14\", \"lutin_cuisine\"),\n    (\"21:40\", \"pere_noel\"),\n    (\"22:03\", \"renne_gps\"),\n    (\"22:37\", \"pixel\"),\n    (\"23:05\", \"mere_noel\"),\n    (\"23:48\", \"pere_noel_2\"),\n    (\"00:12\", \"pixel\"),\n    (\"00:55\", \"pere_noel\"),\n    (\"01:08\", \"renne_gps\"),\n    (\"01:59\", \"pere_noel\"),\n    (\"02:00\", \"pere_noel\"),\n    (\"02:17\", \"lutin_cuisine\"),\n    (\"02:41\", \"pere_noel\"),\n    (\"02:42\", \"pere_noel_2\"),\n    (\"03:03\", \"pere_noel\"),\n    (\"03:19\", \"pixel\"),\n    (\"03:20\", \"pere_noel\"),\n    (\"03:47\", \"pere_noel\"),\n    (\"04:06\", \"mere_noel\"),\n    (\"04:32\", \"pere_noel\"),\n    (\"04:59\", \"pere_noel\"),\n    (\"05:00\", \"pere_noel\"),\n    (\"05:21\", \"renne_gps\"),\n    (\"05:44\", \"pere_noel_2\"),\n    (\"06:10\", \"pixel\"),\n    (\"06:45\", \"pere_noel\"),\n]\n\ncompteur = 0\nfor heure, compte in journal:\n    h = int(heure[:2])                         # les 2 premiers caractères : \"02:41\" -> 2\n    if compte == ___ and 2 <= h <= 4:          # trou 1 : le nom du compte, entre guillemets\n        compteur = ___                         # trou 2 : on ajoute 1 au compteur\n\nprint(compteur)"
  },
  "hints": [
   "Une boucle <code>for</code> lit les lignes du journal une par une. Le « compteur » est une variable qui part de 0 et grandit à chaque ligne qui répond aux critères.",
   "Trou 1 : le texte exact du compte, avec des guillemets : <code>\"pere_noel\"</code>. Trou 2 : on veut augmenter le compteur de 1, donc <code>compteur + 1</code>.",
   "Dans le journal, ne compte que les lignes « pere_noel » dont l'heure est 2, 3 ou 4. Il y en a plus de 5 et moins de 10."
  ],
  "explain": "<p><b>Réponse : 7 connexions suspectes.</b> Tu viens d'écrire un programme très classique : une boucle, une <b>condition</b> (<code>if</code>) qui combine deux tests avec <code>and</code>, et un <b>compteur</b>. C'est la base de l'analyse de données : les experts en cybersécurité font exactement ça sur des millions de lignes de journaux.</p>\n<p><b>Le saviez-vous ?</b> « <code>==</code> » compare deux valeurs (« est-ce égal ? ») alors que « <code>=</code> » range une valeur dans une variable. Mélanger les deux est l'une des erreurs les plus fréquentes… même chez les pros !</p>\n<p class=\"clue\">🕵️ <b>Piste n°4 :</b> 7 connexions en pleine nuit avec le compte du Père Noël, alors qu'il dormait. Le pirate connaît donc son mot de passe. Il l'a volé… ou deviné.</p>",
  "h": [
   "b132cc41439f6e781bced7a36cb06f11cb2944540217125b8ff808a5d46db0fe"
  ]
 },
 {
  "day": 5,
  "title": "Le coffre du pirate",
  "concept": "Logique booléenne (ET, OU, NON)",
  "device": "both",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Grâce au mot de passe volé, on a trouvé la planque du pirate : un <b>coffre</b> à 4 interrupteurs, A, B, C et D. Chacun est levé (1) ou baissé (0). À l'intérieur, sûrement des preuves ! Il n'y a qu'une seule combinaison qui respecte toutes les règles gravées sur la porte… »</p>",
  "puzzle": "<p>Le coffre s'ouvre uniquement si les <b>6 règles</b> sont toutes vraies :</p>\n<ol>\n<li>Exactement <b>un</b> des deux interrupteurs A et B est levé (ni les deux, ni aucun).</li>\n<li><b>Si</b> C est levé, <b>alors</b> D doit l'être aussi.</li>\n<li>A et D ne sont <b>jamais</b> levés en même temps.</li>\n<li>Au moins l'un des deux, A <b>ou</b> C, est levé.</li>\n<li><b>Si</b> B est levé, <b>alors</b> C doit l'être aussi.</li>\n<li>Au moins <b>deux</b> interrupteurs sont levés.</li>\n</ol>\n<p><b>Quelle est la combinaison ?</b> Réponds avec 4 chiffres dans l'ordre A, B, C, D (1 = levé, 0 = baissé).</p>",
  "widget": {
   "type": "switches",
   "label": "Le panneau du coffre — note ta combinaison (aucune aide : à toi de raisonner !)"
  },
  "python": {
   "label": "Labo Python (💻, facultatif) — laisser l'ordinateur tester les 16 combinaisons",
   "code": "for A in (0, 1):\n    for B in (0, 1):\n        for C in (0, 1):\n            for D in (0, 1):\n                regle1 = (A + B) == 1\n                regle2 = (C == 0) or (D == 1)       # \"si C alors D\"\n                regle3 = not (A == 1 and D == 1)\n                regle4 = ___                        # trou : \"A ou C est levé\"\n                regle5 = (B == 0) or (C == 1)\n                regle6 = (A + B + C + D) >= 2\n                if regle1 and regle2 and regle3 and regle4 and regle5 and regle6:\n                    print(A, B, C, D)"
  },
  "hints": [
   "Commence par les règles qui t'imposent le plus de choses. La règle 1 te dit : soit A est levé et B baissé, soit l'inverse. Étudie ces deux cas séparément.",
   "Cas « A levé » : la règle 3 force D à 0, puis la règle 2 force C à 0 (car si C était levé, D devrait l'être). Combien d'interrupteurs sont alors levés ? La règle 6 est-elle respectée ?",
   "Le cas « A levé » est impossible. Donc A = 0 et B = 1. Ensuite la règle 5 force C, puis la règle 2 force D. Combinaison : 0, 1, 1, 1."
  ],
  "explain": "<p><b>Combinaison : 0 · 1 · 1 · 1</b>. Tu viens de faire de la <b>logique booléenne</b>, le langage de base de tous les ordinateurs : <code>and</code> (ET), <code>or</code> (OU), <code>not</code> (NON). « Si C alors D » s'écrit <code>(not C) or D</code> : une règle qui n'est violée que si C est vrai et D faux.</p>\n<p><b>Le saviez-vous ?</b> Le processeur de ton téléphone contient des milliards de minuscules circuits (« portes logiques ») qui font exactement ça : ET, OU, NON. Tout le reste, les jeux, les vidéos, l'IA, est construit par-dessus.</p>\n<p class=\"clue\">🕵️ <b>Piste n°5 :</b> à l'intérieur du coffre, une feuille avec 5 carrés de couleur étranges et une inscription : « mon accès… ». Le reste est effacé. Ces couleurs cachent quelque chose !</p>",
  "h": [
   "123abc9e62d1a670e4a4c5c6d801e3597b290a77837e811cdf4e1e272a9e73e2"
  ]
 },
 {
  "day": 6,
  "title": "Les couleurs du pirate",
  "concept": "Hexadécimal & couleurs RVB",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Ces 5 carrés de couleur ne sont pas là pour décorer ! Sur un écran, une couleur est décrite par trois nombres (rouge, vert, bleu) écrits en <b>hexadécimal</b>, un système en base 16 qui utilise les chiffres 0 à 9 puis les lettres A à F. Le pirate y a caché des lettres : chaque nombre est le code ASCII d'une lettre, comme au jour 1. »</p>",
  "puzzle": "<p>Chaque couleur s'écrit <code>#RRVVBB</code> : trois nombres hexadécimaux de 2 chiffres. Ici, chacun est le code ASCII d'une lettre (l'espace est 20 en hexadécimal, soit 32). Lis les couleurs dans l'ordre :</p>\n<pre class=\"code\">#504152  #204C41  #204348  #454D49  #4E4545</pre>\n<p><b>Par où le pirate est-il entré ?</b> (Le message se termine par le nom de l'endroit.)</p>",
  "widget": {
   "type": "swatches",
   "colors": [
    "#504152",
    "#204C41",
    "#204348",
    "#454D49",
    "#4E4545"
   ],
   "label": "Les cinq carrés de couleur trouvés dans le coffre"
  },
  "python": {
   "open": true,
   "label": "Labo Python — le traducteur de couleurs (2 trous à remplir)",
   "code": "couleurs = [\"#504152\", \"#204C41\", \"#204348\", \"#454D49\", \"#4E4545\"]\n\nmessage = \"\"\nfor couleur in couleurs:\n    for i in range(1, 7, ___):                      # trou 1 : on lit 2 caractères à la fois, donc on avance de ... en ...\n        canal = couleur[i:i + 2]                    # par ex. \"50\" (on saute le # du début)\n        message = message + chr(int(canal, ___))    # trou 2 : l'hexadécimal est en base ... ?\n\nprint(message)"
  },
  "hints": [
   "Chaque couleur contient 3 nombres de 2 chiffres hexadécimaux, donc 3 lettres. La boucle interne doit les lire un par un : après le premier nombre, elle doit sauter de 2 caractères pour arriver au suivant.",
   "Trou 1 : on avance de 2 en 2. Trou 2 : l'hexadécimal, c'est « base 16 » (comme « base 2 » pour le binaire au jour 1).",
   "Remplace le premier ___ par 2 et le second par 16, puis exécute. Le programme affiche une phrase : il te demande l'endroit par où il est passé."
  ],
  "explain": "<p><b>Message décodé :</b> « PAR LA CHEMINEE ». Le pirate est entré par la <b>cheminée</b>… la cheminée-serveur, par où passent tous les câbles de l'atelier !</p>\n<p>Pourquoi l'hexadécimal ? Parce qu'un octet (8 bits) s'écrit toujours avec exactement 2 chiffres hexadécimaux (de 00 à FF), alors qu'il en faut 8 en binaire. C'est plus court et plus lisible : les programmeurs et les designers l'utilisent partout (couleurs, adresses mémoire…). Le rouge pur est <code>#FF0000</code> : 255 de rouge, 0 de vert, 0 de bleu.</p>\n<p><b>Le saviez-vous ?</b> Un écran affiche environ 16,7 millions de couleurs : 256 × 256 × 256. Ton cerveau n'en distingue qu'une partie !</p>\n<p class=\"clue\">🕵️ <b>Piste n°6 :</b> le pirate est entré par la cheminée-serveur. Il a laissé un dernier fichier, protégé à double tour. Demain, c'est le grand décryptage !</p>",
  "h": [
   "30f2662f2175ea06d50e23a1e2c8e7dab564f6c51d28603a820377775b9d1557",
   "02f4bc8632aed20746784aa7a76b14ee3d3f0cb3ef51433ba29384770e47b623"
  ]
 },
 {
  "day": 7,
  "title": "Le coffre-fort de la semaine",
  "concept": "Boss : hexadécimal + César + fonctions",
  "device": "laptop",
  "minutes": 25,
  "story": "<p><b>Pixel :</b> « On y est presque ! Dans la cheminée-serveur, un dernier fichier : le <b>journal secret</b> du pirate. Il l'a protégé en deux couches : d'abord il a décalé les lettres (son chiffre de César préféré, avec un décalage qu'on ne connaît pas), puis il a écrit le résultat en <b>hexadécimal</b>. Tout ce que tu as appris cette semaine va servir. Si tu le déchiffres, je pourrai réparer le premier système du Père Noël. »</p>",
  "puzzle": "<p>Voici le contenu du fichier : chaque paire de chiffres hexadécimaux est le code ASCII d'un caractère (jour 6), et le texte obtenu est chiffré avec un décalage de César (jour 2) de valeur inconnue.</p>\n<pre class=\"code\">574C204E575020504445204E4C4E5350\n50204F4C594420572050455A54575020\n4F4620444C415459</pre>\n<p><b>Où le pirate a-t-il caché la clé du système ?</b> (Un seul mot.)</p>\n<p class=\"note\">Cette fois, pas de mode d'emploi : les deux outils que tu connais sont déjà dans le labo, il te reste à les <b>enchaîner</b>.</p>",
  "python": {
   "open": true,
   "label": "Labo Python — la chaîne de décryptage (3 trous à remplir)",
   "code": "secret = (\"574C204E575020504445204E4C4E5350\"\n          \"50204F4C594420572050455A54575020\"\n          \"4F4620444C415459\")\n\n# Étape 1 : de l'hexadécimal vers le texte (comme au jour 6)\ndef hex_vers_texte(h):\n    texte = \"\"\n    for i in range(0, len(h), 2):\n        texte = texte + chr(int(h[i:i + 2], ___))     # trou 1\n    return texte\n\n# Étape 2 : le déchiffrement de César (comme au jour 2) — déjà écrit pour toi\ndef dechiffrer(texte, decalage):\n    resultat = \"\"\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            numero = ord(lettre) - 65\n            nouveau = (numero - decalage) % 26\n            resultat = resultat + chr(nouveau + 65)\n    return resultat\n\ntexte = hex_vers_texte(secret)\n\n# Étape 3 : on essaie tous les décalages\nfor essai in range(1, ___):                           # trou 2 : jusqu'à 25 inclus, donc on s'arrête avant...\n    print(essai, ___)                                 # trou 3 : le texte déchiffré avec ce décalage"
  },
  "hints": [
   "Deux étapes enchaînées : d'abord transformer l'hexadécimal en texte (c'est le travail de <code>hex_vers_texte</code>), puis casser le César sur ce texte (la fonction <code>dechiffrer</code>, déjà écrite).",
   "Trou 1 : l'hexadécimal, c'est la base 16. Trou 2 : <code>range(1, 26)</code> va de 1 à 25. Trou 3 : un appel à la fonction : <code>dechiffrer(texte, essai)</code>.",
   "Lance le programme : 25 lignes s'affichent, une seule est une vraie phrase. La clé est cachée dans une partie du sapin qui brille en haut."
  ],
  "key": {
   "n": 1,
   "value": "ETOILE"
  },
  "explain": "<p><b>Journal décodé :</b> « LA CLE EST CACHEE DANS L ETOILE DU SAPIN » (hexadécimal, puis César de décalage 11).</p>\n<p>Bravo, c'est le <b>boss de la semaine 1</b> : tu as enchaîné deux transformations (hexadécimal → texte → César), chacune dans sa propre <b>fonction</b>. C'est comme ça que les programmeurs construisent de grands programmes : en assemblant de petits morceaux qui font chacun une seule chose.</p>\n<div class=\"reward\">\n<h3>🔑 Clé n°1 obtenue : <span class=\"key\">ETOILE</span></h3>\n<p>Garde-la précieusement : elle servira pour le <b>grand décryptage final</b> du 24 décembre !</p>\n</div>\n<div class=\"reward\">\n<h3>🎁 Ta récompense de la semaine 1</h3>\n<p>Pixel a mis en sécurité une tablette de chocolat pour vous deux, mais il a chiffré l'endroit avec le chiffre préféré du pirate (le <b>même décalage que celui du jour 2</b>) :</p>\n<pre class=\"code\">ZVBZ SL ZHWPU</pre>\n<p>Déchiffre-le avec le labo ci-dessous pour savoir où chercher !</p>\n</div>\n<p class=\"clue\">🕵️ <b>Piste n°7 :</b> le pirate a caché la clé dans l'étoile du sapin. Elle ouvre le premier verrou du système. La semaine prochaine, on répare avec du Python plus costaud !</p>",
  "after": {
   "python": {
    "open": true,
    "label": "Labo Python — où est cachée ta récompense ? (1 trou à remplir)",
    "code": "def dechiffrer(texte, decalage):\n    resultat = \"\"\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            numero = ord(lettre) - 65\n            nouveau = (numero - decalage) % 26\n            resultat = resultat + chr(nouveau + 65)\n    return resultat\n\nmessage = \"ZVBZ SL ZHWPU\"\ndecalage = ___        # le même décalage que le pirate au jour 2 !\nprint(dechiffrer(message, decalage))"
   }
  },
  "h": [
   "8ec5a07c0a0dc87e5121a83b636042bccca99b4d889d725609bdb6e77a0afc78",
   "3100bf6b4cbc1fbeaa02fcfc9c3d629430fd700f7c257cba46ddef3f16804e59"
  ]
 }
];
