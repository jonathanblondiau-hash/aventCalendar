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
   "Il y a 40 octets : à la main, c'est très long. Le labo Python lit les octets un par un dans une boucle : il te manque seulement deux morceaux."
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
   "Le pirate a décalé toutes les lettres du même nombre de crans, mais tu ne sais pas lequel : l'ordinateur va tous les essayer. Dans la fonction, il manque l'endroit où l'on utilise l'entrée « decalage »."
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
   "code": "print(17 / 5)     # division normale\nprint(17 // 5)    # division entière : combien de fois 5 « rentre » dans 17 ?\nprint(17 % 5)     # modulo : ce qui reste après cette division\n\nreste = 23 ___ 4  # remplace ___ pour que reste vaille 3\nprint(reste)"
  },
  "hints": [
   "Avance ligne par ligne en notant la valeur de « cadeaux » après chaque ligne. Commence par 12 × 7."
  ],
  "explain": "<p><b>Réponse : 45.</b> Tu viens de faire ce que fait un ordinateur : exécuter des instructions <em>dans l'ordre</em>, en gardant en mémoire des variables.</p>\n<p>Le modulo <code>%</code> est partout : pour savoir si un nombre est pair (<code>n % 2 == 0</code>), pour faire tourner une horloge (<code>heure % 24</code>), et même… dans le chiffre de César que tu as utilisé hier !</p>\n<p><b>Le saviez-vous ?</b> Python porte le nom de la troupe comique des <em>Monty Python</em>, pas du serpent. Son créateur, Guido van Rossum, adorait leurs sketchs.</p>\n<p class=\"clue\">🕵️ <b>Piste n°3 :</b> le pirate fait disparaître 45 cadeaux. Il prépare quelque chose de bien plus gros… Demain, on commence à réparer !</p>",
  "h": [
   "4368fe93a6624296265e3dc44864485f4a236dd9709fd15c44375cad7b28e301"
  ]
 },
 {
  "day": 4,
  "title": "Les traces du pirate",
  "concept": "Boucles, conditions & analyse de fichier",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Le sabotage de la hotte nous a donné une idée : le serveur garde un <b>journal de connexions</b>. Chaque ligne dit <em>à quelle heure</em> et <em>quel compte</em> s'est connecté, et si ça a marché. Problème : ce journal fait <b>3000 lignes</b> rien que pour cette nuit ! Le vrai Père Noël dort entre 2 h et 5 h du matin. Si son compte se connecte à ce moment-là, ce n'est pas lui… »</p>",
  "puzzle": "<p>Le fichier <code>journal.txt</code> contient 3000 lignes, triées par heure. Chaque ligne a trois morceaux séparés par des espaces : l'<b>heure</b>, le <b>compte</b> et le <b>résultat</b> (<code>SUCCES</code> ou <code>ECHEC</code>). Voici les 6 premières lignes :</p>\n<pre class=\"code\">00:00:33 pere_noel_old SUCCES\n00:01:41 admin SUCCES\n00:01:45 pere_noel_2 SUCCES\n00:02:06 renne_gps SUCCES\n00:02:40 pere_noel SUCCES\n00:03:19 lutin_cuisine SUCCES\n…</pre>\n<p><b>Combien de connexions réussies (<code>SUCCES</code>) du compte exact « pere_noel » ont eu lieu entre 2 h 00 et 4 h 59 (inclus) ?</b></p>\n<p class=\"note\">Attention aux pièges : « pere_noel_2 » et « pere_noel_old » sont d'autres comptes. Le fichier est bien trop long pour être compté à la main : c'est un travail pour un programme.</p>",
  "python": {
   "open": true,
   "label": "Labo Python — l'analyseur de journal (2 trous à remplir)",
   "code": "# ===== Ne modifie pas ce bloc : il fabrique le gros fichier de journal (comme si on le lisait sur le disque) =====\ndef suivant(graine):\n    return (graine * 1103515245 + 12345) % 2147483648\n\ndef lire_journal():\n    comptes = [\"pere_noel\", \"pere_noel\", \"pixel\", \"mere_noel\", \"lutin_cuisine\",\n               \"renne_gps\", \"pere_noel_2\", \"pere_noel_old\", \"lutin_emballage\", \"admin\"]\n    lignes = []\n    graine = 12345\n    for i in range(3000):\n        graine = suivant(graine); h = (graine >> 16) % 24\n        graine = suivant(graine); m = (graine >> 16) % 60\n        graine = suivant(graine); s = (graine >> 16) % 60\n        graine = suivant(graine); compte = comptes[(graine >> 16) % len(comptes)]\n        graine = suivant(graine); statut = \"SUCCES\" if (graine >> 16) % 4 != 0 else \"ECHEC\"\n        lignes.append(f\"{h:02d}:{m:02d}:{s:02d} {compte} {statut}\")\n    lignes.sort()\n    return lignes\n# ==================================================================================================================\n\njournal = lire_journal()\nprint(len(journal), \"lignes dans le journal\")\nprint(\"Première ligne :\", journal[0])\n\ncompteur = 0\nfor ligne in journal:\n    heure_txt, compte, statut = ligne.split(\" \")   # on coupe la ligne en 3 morceaux\n    h = int(heure_txt[:2])                          # les 2 premiers caractères : \"02:41:07\" -> 2\n    if compte == ___ and statut == ___ and 2 <= h <= 4:   # trous : le nom du compte et le résultat, entre guillemets\n        compteur = compteur + 1\n\nprint(compteur)"
  },
  "hints": [
   "Le journal est bien trop long pour être lu à la main : une boucle <code>for</code> le parcourt ligne par ligne. Chaque ligne est coupée en trois morceaux (heure, compte, résultat). Il te manque les deux valeurs à comparer : ce sont des textes, donc entre guillemets."
  ],
  "explain": "<p><b>Réponse : 67 connexions suspectes.</b> Tu viens d'analyser un fichier de 3000 lignes en une fraction de seconde : une boucle, des <b>conditions</b> combinées avec <code>and</code>, un <b>compteur</b>, et du découpage de texte (<code>split</code>). C'est exactement le travail des analystes en cybersécurité, mais sur des millions de lignes !</p>\n<p><b>Le saviez-vous ?</b> « <code>==</code> » compare deux valeurs (« est-ce égal ? ») alors que « <code>=</code> » range une valeur dans une variable. Mélanger les deux est l'une des erreurs les plus fréquentes… même chez les pros !</p>\n<p class=\"clue\">🕵️ <b>Piste n°4 :</b> 67 connexions réussies en pleine nuit avec le compte du Père Noël, alors qu'il dormait. Le pirate connaît donc son mot de passe. Il l'a volé… ou deviné.</p>",
  "h": [
   "93b443f74a8a9867c7f1305e70f396e3519a9ae68dd31abf6d4ae86921346932"
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
   "Commence par les règles qui t'imposent le plus de choses. La règle 1 te dit : soit A est levé et B baissé, soit l'inverse. Étudie ces deux cas séparément."
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
  "puzzle": "<p>Chaque couleur s'écrit <code>#RRVVBB</code> : trois nombres hexadécimaux de 2 chiffres. Ici, chacun est le code ASCII d'une lettre (l'espace est 20 en hexadécimal, soit 32). Lis les couleurs dans l'ordre :</p>\n<pre class=\"code\">#504152  #204C41  #204348  #454D49  #4E4545</pre>\n<p><b>Par où le pirate est-il entré ?</b> (Le message se termine par le nom de l'endroit.)</p>\n<p class=\"note\">Dans le labo, la liste ne contient que les 2 premières couleurs : à toi de recopier les 3 autres !</p>",
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
   "code": "# Il n'y a ici que les 2 premières couleurs : recopie les 3 autres depuis l'énoncé, dans la liste (entre guillemets, séparées par des virgules)\ncouleurs = [\"#504152\", \"#204C41\"]\n\nmessage = \"\"\nfor couleur in couleurs:\n    for i in range(1, 7, ___):                      # trou 1 : on lit 2 caractères à la fois, donc on avance de ... en ...\n        canal = couleur[i:i + 2]                    # par ex. \"50\" (on saute le # du début)\n        message = message + chr(int(canal, ___))    # trou 2 : l'hexadécimal est en base ... ?\n\nprint(message)"
  },
  "hints": [
   "Le labo ne contient que 2 couleurs : recopie les autres depuis l'énoncé. Chaque couleur contient 3 nombres de 2 chiffres hexadécimaux, donc 3 lettres : la boucle interne doit les lire un par un, en sautant de 2 caractères à chaque fois."
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
   "Deux étapes enchaînées : d'abord transformer l'hexadécimal en texte (c'est le travail de <code>hex_vers_texte</code>), puis casser le César sur ce texte (la fonction <code>dechiffrer</code>, déjà écrite)."
  ],
  "key": {
   "n": 1,
   "value": "ETOILE"
  },
  "explain": "<p><b>Journal décodé :</b> « LA CLE EST CACHEE DANS L ETOILE DU SAPIN » (hexadécimal, puis César de décalage 11).</p>\n<p>Bravo, c'est le <b>boss de la semaine 1</b> : tu as enchaîné deux transformations (hexadécimal → texte → César), chacune dans sa propre <b>fonction</b>. C'est comme ça que les programmeurs construisent de grands programmes : en assemblant de petits morceaux qui font chacun une seule chose.</p>\n<div class=\"reward\">\n<h3>🔑 Clé n°1 obtenue : <span class=\"key\">ETOILE</span></h3>\n<p>Garde-la précieusement : elle servira pour le <b>grand décryptage final</b> du 24 décembre !</p>\n</div>\n<div class=\"reward\">\n<h3>🎁 Ta récompense de la semaine 1</h3>\n<p>Pixel a mis en sécurité une surprise pour vous deux, mais il a chiffré l'endroit avec le chiffre préféré du pirate (le <b>même décalage que celui du jour 2</b>) :</p>\n<pre class=\"code\">KHUZ SL MYPNV</pre>\n<p>Déchiffre-le avec le labo ci-dessous pour savoir où chercher !</p>\n</div>\n<p class=\"clue\">🕵️ <b>Piste n°7 :</b> le pirate a caché la clé dans l'étoile du sapin. Elle ouvre le premier verrou du système. La semaine prochaine, on répare avec du Python plus costaud !</p>",
  "after": {
   "python": {
    "open": true,
    "label": "Labo Python — où est cachée ta récompense ? (1 trou à remplir)",
    "code": "def dechiffrer(texte, decalage):\n    resultat = \"\"\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            numero = ord(lettre) - 65\n            nouveau = (numero - decalage) % 26\n            resultat = resultat + chr(nouveau + 65)\n    return resultat\n\nmessage = \"KHUZ SL MYPNV\"\ndecalage = ___        # le même décalage que le pirate au jour 2 !\nprint(dechiffrer(message, decalage))"
   }
  },
  "h": [
   "8ec5a07c0a0dc87e5121a83b636042bccca99b4d889d725609bdb6e77a0afc78",
   "3100bf6b4cbc1fbeaa02fcfc9c3d629430fd700f7c257cba46ddef3f16804e59"
  ]
 }
];
