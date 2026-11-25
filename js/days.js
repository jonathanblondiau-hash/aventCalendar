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
  "story": "<p><b>Pixel :</b> « Ces 5 carrés de couleur ne sont pas là pour décorer ! Sur un écran, une couleur est décrite par trois nombres (rouge, vert, bleu) écrits en <b>hexadécimal</b>, un système en base 16 qui utilise les chiffres 0 à 9 puis les lettres A à F. Le pirate y a caché des lettres : chaque nombre est le code ASCII d'une lettre, comme au jour 1. Mais attention : quelqu'un a renversé du chocolat chaud sur la feuille ☕ et les codes des <b>deux dernières couleurs</b> sont effacés. Heureusement, les carrés eux-mêmes sont intacts : il suffit de savoir <em>lire</em> une couleur. »</p>",
  "puzzle": "<p>Chaque couleur s'écrit <code>#RRVVBB</code> : trois nombres hexadécimaux de 2 chiffres. Ici, chacun est le code ASCII d'une lettre (l'espace est 20 en hexadécimal, soit 32). Lis les couleurs dans l'ordre :</p>\n<pre class=\"code\">#504152  #204C41  #204348  #??????  #??????</pre>\n<p><b>Par où le pirate est-il entré ?</b> (Le message se termine par le nom de l'endroit.)</p>\n<p class=\"note\">Les deux derniers codes sont effacés : utilise la <b>pipette 🧪</b> sous les carrés de couleur, elle lit le code d'une couleur quand tu la touches. Dans le labo, la liste ne contient que les 2 premières couleurs : à toi d'ajouter les 3 autres !</p>",
  "widget": {
   "type": "swatches",
   "colors": [
    "#504152",
    "#204C41",
    "#204348",
    "#454D49",
    "#4E4545"
   ],
   "hidden": [
    3,
    4
   ],
   "label": "Les cinq carrés de couleur trouvés dans le coffre"
  },
  "python": {
   "open": true,
   "label": "Labo Python — le traducteur de couleurs (2 trous à remplir)",
   "code": "# Il n'y a ici que les 2 premières couleurs : ajoute les 3 autres dans la liste (la 3e est dans l'énoncé, les 2 dernières se lisent à la pipette). Entre guillemets, séparées par des virgules.\ncouleurs = [\"#504152\", \"#204C41\"]\n\nmessage = \"\"\nfor couleur in couleurs:\n    for i in range(1, 7, ___):                      # trou 1 : on lit 2 caractères à la fois, donc on avance de ... en ...\n        canal = couleur[i:i + 2]                    # par ex. \"50\" (on saute le # du début)\n        message = message + chr(int(canal, ___))    # trou 2 : l'hexadécimal est en base ... ?\n\nprint(message)"
  },
  "hints": [
   "Le labo ne contient que 2 couleurs : ajoute les autres (la 3ᵉ est écrite dans l'énoncé, les 2 dernières se lisent avec la pipette : touche chaque carré). Chaque couleur contient 3 nombres de 2 chiffres hexadécimaux, donc 3 lettres : la boucle interne doit les lire un par un, en sautant de 2 caractères à chaque fois."
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
 },
 {
  "day": 8,
  "title": "La liste du Père Noël",
  "concept": "Dictionnaires & compteurs",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Bonne nouvelle : on a restauré une sauvegarde de la <b>liste des enfants</b>. Mauvaise nouvelle : le pirate l'a modifiée ! Il a remis à <b>zéro</b> les cadeaux de certains enfants… pourtant sages. Regarde où il frappe le plus : cela nous dira peut-être pourquoi il fait ça. »</p>",
  "puzzle": "<p>La liste contient 360 enfants. Chacun est décrit par un <b>dictionnaire</b> Python : des « étiquettes » (les clés) et leurs valeurs. Par exemple :</p>\n<pre class=\"code\">{\"prenom\": \"Léa\", \"age\": 9, \"ville\": \"Lyon\", \"sage\": True, \"cadeaux\": 3}</pre>\n<p>Un enfant <b>sage</b> avec <b>0 cadeau</b> est une victime du pirate. <b>Dans quelle ville le pirate a-t-il fait le plus de dégâts ?</b></p>\n<p class=\"note\">Il y a trop d'enfants pour compter à la main, et il faut compter <em>par ville</em>. Un dictionnaire est parfait pour ça : une case par ville.</p>",
  "python": {
   "open": true,
   "label": "Labo Python — le détecteur de sabotage (2 trous à remplir)",
   "code": "# Les données brutes : prenom,age,ville,sage(1 ou 0),cadeaux — un enfant par groupe, séparés par \";\"\ndonnees = (\"Lina,4,Lyon,0,0;Gabriel,5,Marseille,1,5;Arthur,5,Lille,1,5;Manon\"\n           \",14,Strasbourg,0,0;Jules,9,Nice,1,2;Raphaël,9,Strasbourg,0,0;Jad\"\n           \"e,4,Toulouse,1,5;Jade,8,Bordeaux,1,4;Inès,13,Lille,1,2;Lina,14,T\"\n           \"oulouse,1,1;Adam,5,Nantes,1,2;Emma,10,Bordeaux,1,4;Inès,5,Strasb\"\n           \"ourg,0,0;Raphaël,15,Strasbourg,1,0;Jade,7,Nantes,1,4;Lina,8,Toul\"\n           \"ouse,0,0;Zoé,5,Lille,1,3;Adam,14,Lyon,1,3;Hugo,12,Marseille,1,4;\"\n           \"Manon,15,Lyon,1,1;Manon,8,Lyon,1,4;Manon,10,Lyon,1,1;Jade,13,Tou\"\n           \"louse,1,4;Inès,11,Nice,1,3;Gabriel,6,Strasbourg,1,0;Arthur,11,St\"\n           \"rasbourg,1,1;Manon,12,Nice,1,1;Nathan,8,Nantes,1,4;Nathan,8,Lyon\"\n           \",1,1;Jade,6,Strasbourg,0,0;Jade,13,Bordeaux,1,1;Louis,10,Nice,0,\"\n           \"0;Adam,4,Strasbourg,0,0;Arthur,7,Lyon,1,4;Adam,10,Strasbourg,1,1\"\n           \";Lina,9,Lille,0,0;Lina,14,Lille,1,4;Gabriel,9,Bordeaux,1,5;Zoé,7\"\n           \",Strasbourg,1,0;Raphaël,10,Marseille,1,5;Zoé,4,Marseille,1,4;Zoé\"\n           \",13,Nice,1,4;Manon,15,Nantes,1,4;Jade,15,Nantes,0,0;Lina,7,Nante\"\n           \"s,1,1;Nathan,15,Lille,1,2;Hugo,12,Lille,1,4;Lina,7,Nantes,1,2;Ad\"\n           \"am,12,Toulouse,1,2;Emma,8,Nice,1,1;Lina,11,Strasbourg,1,3;Lina,4\"\n           \",Marseille,0,0;Lina,12,Nice,1,4;Inès,10,Toulouse,1,1;Jules,10,Li\"\n           \"lle,1,1;Chloé,15,Lille,1,3;Zoé,13,Lille,1,3;Manon,11,Toulouse,1,\"\n           \"5;Jade,8,Marseille,1,3;Jules,12,Nantes,1,5;Jules,10,Nantes,1,5;M\"\n           \"anon,15,Toulouse,0,0;Jade,8,Lille,1,2;Nathan,15,Lille,1,1;Gabrie\"\n           \"l,14,Lyon,1,2;Jade,13,Lyon,1,2;Raphaël,14,Lyon,1,3;Nathan,8,Toul\"\n           \"ouse,1,2;Hugo,10,Bordeaux,1,3;Léa,14,Lyon,1,3;Zoé,13,Toulouse,1,\"\n           \"3;Raphaël,8,Lille,1,5;Lina,10,Nice,1,3;Lina,9,Lille,1,1;Louis,15\"\n           \",Nice,1,1;Gabriel,6,Toulouse,0,0;Nathan,13,Marseille,1,3;Chloé,1\"\n           \"2,Marseille,1,2;Jade,5,Strasbourg,0,0;Jade,11,Bordeaux,0,0;Hugo,\"\n           \"14,Lille,0,0;Gabriel,6,Lyon,1,3;Jade,12,Lille,1,2;Nathan,13,Lyon\"\n           \",1,2;Emma,15,Bordeaux,1,4;Nathan,15,Bordeaux,1,2;Jade,9,Lille,1,\"\n           \"3;Inès,12,Lille,1,5;Léa,6,Lyon,0,0;Jade,4,Lille,1,4;Zoé,5,Nice,1\"\n           \",5;Emma,13,Lille,1,1;Chloé,11,Bordeaux,0,0;Léa,4,Lille,1,5;Inès,\"\n           \"6,Lille,1,0;Louis,5,Strasbourg,1,0;Manon,7,Strasbourg,1,4;Raphaë\"\n           \"l,15,Lille,1,2;Lina,13,Marseille,1,5;Louis,12,Lyon,0,0;Manon,8,N\"\n           \"ice,1,3;Nathan,15,Bordeaux,1,2;Louis,9,Strasbourg,1,0;Jade,11,Ma\"\n           \"rseille,1,3;Louis,7,Bordeaux,1,1;Chloé,6,Toulouse,1,2;Lina,6,Nic\"\n           \"e,1,4;Arthur,9,Nice,1,5;Jade,9,Lyon,1,5;Nathan,6,Lille,1,1;Rapha\"\n           \"ël,12,Nantes,1,1;Jade,11,Toulouse,1,3;Hugo,10,Toulouse,0,0;Jade,\"\n           \"9,Nantes,0,0;Adam,8,Bordeaux,1,2;Emma,8,Bordeaux,1,4;Inès,9,Nant\"\n           \"es,1,5;Manon,13,Nice,1,5;Jade,14,Bordeaux,1,4;Gabriel,5,Nice,1,5\"\n           \";Raphaël,6,Toulouse,1,3;Adam,9,Nice,1,3;Gabriel,14,Lyon,1,1;Adam\"\n           \",6,Toulouse,1,0;Jade,10,Lyon,0,0;Lina,6,Lyon,0,0;Chloé,14,Nice,1\"\n           \",5;Zoé,12,Nantes,1,0;Jade,7,Lyon,1,4;Emma,7,Bordeaux,1,2;Jules,1\"\n           \"0,Bordeaux,1,2;Chloé,13,Nice,1,2;Léa,5,Lille,1,4;Hugo,13,Nantes,\"\n           \"1,2;Zoé,12,Bordeaux,1,3;Jade,11,Bordeaux,1,2;Jade,7,Nantes,1,1;L\"\n           \"ina,8,Strasbourg,1,0;Emma,12,Lille,1,3;Manon,5,Toulouse,1,3;Adam\"\n           \",15,Toulouse,0,0;Raphaël,4,Bordeaux,0,0;Lina,6,Bordeaux,1,5;Adam\"\n           \",12,Strasbourg,0,0;Inès,5,Lille,0,0;Zoé,5,Lyon,1,5;Zoé,7,Nantes,\"\n           \"0,0;Gabriel,15,Nice,1,1;Louis,10,Lille,1,4;Jade,15,Lille,1,2;Inè\"\n           \"s,11,Strasbourg,1,0;Jules,8,Nantes,1,5;Louis,13,Nantes,1,1;Natha\"\n           \"n,11,Toulouse,1,3;Adam,6,Bordeaux,1,2;Jade,12,Nice,1,2;Louis,4,L\"\n           \"ille,1,4;Adam,8,Lyon,1,0;Arthur,10,Nice,1,2;Emma,15,Lyon,1,5;Ada\"\n           \"m,6,Strasbourg,0,0;Emma,11,Nantes,1,2;Jade,10,Toulouse,0,0;Jules\"\n           \",6,Strasbourg,1,3;Inès,9,Strasbourg,1,0;Manon,12,Nantes,1,1;Nath\"\n           \"an,6,Lille,1,2;Adam,15,Lyon,1,4;Nathan,13,Lyon,1,2;Raphaël,6,Str\"\n           \"asbourg,1,0;Chloé,5,Marseille,1,2;Manon,13,Lille,1,3;Jade,9,Stra\"\n           \"sbourg,1,2;Zoé,11,Lille,0,0;Léa,6,Nantes,1,1;Inès,10,Nice,0,0;Zo\"\n           \"é,7,Bordeaux,1,5;Gabriel,6,Toulouse,0,0;Léa,4,Bordeaux,1,4;Manon\"\n           \",11,Nice,1,2;Zoé,9,Nice,0,0;Jade,15,Nice,0,0;Chloé,14,Nice,0,0;J\"\n           \"ade,7,Strasbourg,1,0;Louis,6,Marseille,0,0;Zoé,14,Toulouse,1,3;Z\"\n           \"oé,4,Toulouse,1,3;Raphaël,11,Nice,0,0;Gabriel,13,Strasbourg,0,0;\"\n           \"Nathan,12,Marseille,1,2;Zoé,8,Nantes,1,3;Raphaël,7,Nantes,1,3;Ad\"\n           \"am,15,Nice,1,0;Zoé,8,Lille,0,0;Lina,13,Marseille,1,5;Adam,4,Nice\"\n           \",0,0;Chloé,8,Bordeaux,1,2;Emma,12,Bordeaux,1,1;Chloé,11,Nantes,1\"\n           \",3;Inès,13,Lyon,1,5;Jade,14,Bordeaux,1,1;Inès,6,Bordeaux,1,2;Man\"\n           \"on,13,Strasbourg,1,2;Jules,11,Bordeaux,1,3;Zoé,5,Marseille,1,3;J\"\n           \"ade,11,Lyon,1,1;Inès,14,Bordeaux,1,3;Hugo,12,Marseille,1,1;Adam,\"\n           \"4,Lyon,1,5;Arthur,11,Toulouse,1,5;Nathan,8,Nantes,1,1;Inès,11,Bo\"\n           \"rdeaux,0,0;Adam,15,Bordeaux,1,1;Manon,15,Toulouse,1,5;Manon,8,To\"\n           \"ulouse,1,4;Arthur,6,Nantes,1,5;Lina,11,Toulouse,1,4;Jules,6,Mars\"\n           \"eille,1,5;Zoé,13,Nantes,1,1;Gabriel,15,Strasbourg,1,2;Manon,5,Bo\"\n           \"rdeaux,1,2;Chloé,12,Bordeaux,0,0;Adam,8,Lille,1,5;Léa,4,Nantes,1\"\n           \",5;Gabriel,7,Lille,1,4;Chloé,14,Nantes,1,2;Emma,6,Marseille,1,1;\"\n           \"Zoé,11,Lyon,1,5;Jade,13,Nice,1,1;Léa,12,Marseille,1,5;Louis,10,L\"\n           \"yon,1,3;Hugo,7,Toulouse,1,4;Louis,13,Lille,0,0;Louis,14,Marseill\"\n           \"e,1,4;Manon,7,Nantes,1,1;Jules,5,Bordeaux,0,0;Adam,12,Nice,1,2;L\"\n           \"ina,11,Lyon,0,0;Inès,8,Nantes,1,4;Léa,7,Lyon,1,2;Emma,11,Nantes,\"\n           \"1,1;Gabriel,5,Lyon,1,1;Raphaël,7,Strasbourg,0,0;Raphaël,9,Lyon,1\"\n           \",5;Jules,4,Lille,0,0;Léa,11,Toulouse,1,2;Nathan,9,Lyon,1,1;Hugo,\"\n           \"15,Lyon,1,2;Nathan,14,Nantes,1,2;Léa,14,Bordeaux,1,4;Raphaël,8,N\"\n           \"antes,1,5;Raphaël,8,Nice,1,1;Raphaël,7,Toulouse,1,4;Léa,5,Lille,\"\n           \"1,3;Zoé,8,Toulouse,1,3;Inès,14,Marseille,1,4;Jules,10,Bordeaux,1\"\n           \",2;Inès,9,Bordeaux,1,5;Chloé,11,Strasbourg,1,4;Léa,7,Toulouse,1,\"\n           \"1;Louis,13,Lyon,1,1;Emma,5,Toulouse,0,0;Gabriel,13,Lyon,1,4;Léa,\"\n           \"10,Marseille,1,1;Adam,12,Nice,1,4;Manon,6,Toulouse,1,1;Gabriel,1\"\n           \"2,Bordeaux,1,1;Jules,8,Nantes,1,5;Jules,10,Strasbourg,0,0;Jules,\"\n           \"5,Lille,1,1;Léa,4,Strasbourg,1,1;Arthur,15,Bordeaux,1,5;Emma,10,\"\n           \"Toulouse,1,0;Zoé,8,Nantes,0,0;Arthur,5,Lille,1,4;Nathan,11,Marse\"\n           \"ille,1,0;Inès,15,Lyon,1,5;Lina,5,Marseille,1,3;Lina,13,Nice,1,4;\"\n           \"Jade,4,Lille,1,2;Lina,8,Nice,0,0;Emma,11,Nantes,0,0;Jules,7,Nice\"\n           \",0,0;Gabriel,5,Lyon,1,4;Jade,9,Nice,1,0;Nathan,7,Lyon,0,0;Arthur\"\n           \",6,Bordeaux,0,0;Raphaël,8,Bordeaux,1,3;Chloé,11,Nice,1,5;Jules,4\"\n           \",Lille,0,0;Manon,6,Strasbourg,1,3;Hugo,15,Lille,1,1;Gabriel,8,Ma\"\n           \"rseille,1,2;Arthur,7,Bordeaux,0,0;Raphaël,9,Strasbourg,1,4;Chloé\"\n           \",9,Nantes,1,2;Raphaël,13,Nantes,1,3;Manon,12,Bordeaux,1,5;Hugo,1\"\n           \"2,Nantes,0,0;Jules,11,Toulouse,1,2;Manon,11,Marseille,1,5;Jules,\"\n           \"11,Bordeaux,0,0;Adam,12,Marseille,0,0;Gabriel,8,Lyon,1,2;Raphaël\"\n           \",10,Lyon,0,0;Jade,12,Marseille,1,5;Léa,13,Nantes,1,3;Léa,13,Lyon\"\n           \",1,3;Lina,9,Strasbourg,1,0;Adam,7,Bordeaux,1,1;Nathan,15,Marseil\"\n           \"le,1,3;Zoé,14,Nantes,0,0;Louis,12,Nantes,1,3;Hugo,5,Nantes,1,5;L\"\n           \"ouis,12,Nice,1,3;Raphaël,15,Toulouse,1,3;Raphaël,5,Lyon,1,4;Hugo\"\n           \",9,Marseille,1,4;Gabriel,15,Lyon,1,5;Arthur,11,Nice,1,3;Zoé,11,M\"\n           \"arseille,1,4;Gabriel,12,Lyon,1,3;Arthur,4,Toulouse,1,1;Louis,5,S\"\n           \"trasbourg,0,0;Manon,6,Lille,1,0;Léa,10,Toulouse,1,2;Inès,13,Stra\"\n           \"sbourg,1,0;Jade,5,Lille,1,3;Manon,9,Lyon,1,2;Jade,14,Bordeaux,1,\"\n           \"3;Jules,14,Bordeaux,1,4;Manon,8,Nice,1,3;Inès,14,Toulouse,1,2;Zo\"\n           \"é,6,Nantes,1,1;Lina,14,Lille,1,5;Adam,10,Marseille,1,3;Hugo,10,N\"\n           \"antes,0,0;Gabriel,8,Lyon,1,1;Chloé,9,Nice,1,1;Emma,9,Bordeaux,0,\"\n           \"0;Léa,10,Marseille,1,5;Zoé,14,Lille,0,0;Arthur,12,Toulouse,1,2;L\"\n           \"éa,8,Marseille,0,0;Jade,8,Lyon,1,5;Adam,15,Strasbourg,1,1;Adam,8\"\n           \",Nantes,1,3;Jade,14,Lille,0,0;Arthur,7,Marseille,1,4;Arthur,12,N\"\n           \"antes,1,2;Jules,11,Toulouse,1,0;Jules,7,Toulouse,1,3;Nathan,10,S\"\n           \"trasbourg,1,5;Lina,9,Lyon,1,3;Gabriel,12,Bordeaux,1,5;Jade,7,Str\"\n           \"asbourg,0,0;Lina,10,Lille,1,2;Raphaël,13,Marseille,1,1;Zoé,8,Nic\"\n           \"e,1,4;Inès,6,Nice,1,2\")\n\n# On transforme ce texte en une liste de dictionnaires\nenfants = []\nfor ligne in donnees.split(\";\"):\n    prenom, age, ville, sage, cadeaux = ligne.split(\",\")\n    enfants.append({\"prenom\": prenom, \"age\": int(age), \"ville\": ville, \"sage\": sage == \"1\", \"cadeaux\": int(cadeaux)})\n\nprint(len(enfants), \"enfants dans la liste\")\nprint(enfants[0])\n\n# degats[\"Lyon\"] sera le nombre de victimes à Lyon, etc.\ndegats = {}\nfor enfant in enfants:\n    if enfant[\"sage\"] and enfant[\"cadeaux\"] == ___:          # trou 1 : un enfant sage qui n'a aucun cadeau\n        ville = enfant[\"ville\"]\n        degats[ville] = degats.get(ville, 0) + ___           # trou 2 : on ajoute une victime à cette ville\n\nprint(degats)\nprint(\"Ville la plus touchée :\", max(degats, key=degats.get))"
  },
  "hints": [
   "Le dictionnaire <code>degats</code> sert de tableau de comptage : <code>degats.get(ville, 0)</code> lit le score actuel d'une ville (0 si elle n'y est pas encore), et on y ajoute une victime. Il te manque deux nombres."
  ],
  "explain": "<p><b>Réponse : Strasbourg</b> (12 victimes, contre 3 pour la ville suivante).</p>\n<p>Tu as utilisé un <b>dictionnaire</b> comme tableau de comptage : une des structures de données les plus utiles de Python. Les sites web, les applis et les jeux vidéo en sont remplis : un profil de joueur, c'est un dictionnaire (<code>{\"pseudo\": ..., \"score\": ...}</code>).</p>\n<p><b>Le saviez-vous ?</b> Les données des vrais sites (comme celles que ton téléphone échange avec internet) sont souvent écrites au format <b>JSON</b>, qui ressemble presque exactement à un dictionnaire Python !</p>\n<p class=\"clue\">🕵️ <b>Piste n°8 :</b> le pirate s'acharne sur <b>Strasbourg</b>. Pourquoi cette ville ? Un lien personnel, peut-être…</p>",
  "h": [
   "74c56f8f943942feca797dd94f822e159b7c623e948ff809713fe1dcfdb2e0b4"
  ]
 },
 {
  "day": 9,
  "title": "Le GPS du traîneau",
  "concept": "Algorithme de parcours (BFS)",
  "device": "both",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Le pirate a aussi détraqué le GPS du traîneau : plus aucune route vers <b>Strasbourg</b> ! J'ai retrouvé la carte du glacier qui entoure le Pôle Nord : un labyrinthe de murs de glace. Il faut recalculer l'itinéraire le <b>plus court</b> de l'atelier (S) jusqu'à Strasbourg (A). »</p>",
  "puzzle": "<p>Voici la carte : les cases sombres sont des murs de glace, on se déplace d'une case à la fois vers le haut, le bas, la gauche ou la droite (pas en diagonale). Il existe <b>plusieurs chemins</b> de S à A, mais un seul nombre de pas est le minimum.</p>\n<p><b>Quel est le nombre minimal de déplacements pour aller de S à A ?</b></p>\n<p class=\"note\">Sur téléphone : touche les cases du chemin pour les marquer, le compteur te donne le nombre de pas. Sur Chromebook : tu peux aussi laisser un programme chercher (c'est exactement comme ça que fonctionne un GPS).</p>",
  "widget": {
   "type": "maze",
   "rows": [
    "#######################",
    "#S    #     #   #     #",
    "##### # # # # # ### # #",
    "#     #     # # #     #",
    "# ##### ### # # # ### #",
    "#       # #   # #     #",
    "### # ### ### # ### # #",
    "#   #         #   #   #",
    "# ### ### # ##### # ###",
    "#   #   # #       #   #",
    "# # ### # # # # # ### #",
    "#       #   #        A#",
    "#######################"
   ],
   "label": "La carte du glacier — touche les cases pour marquer ton chemin"
  },
  "python": {
   "label": "Labo Python (💻, facultatif) — l'algorithme du GPS : parcours en largeur (2 trous)",
   "code": "labyrinthe = [\n    \"#######################\",\n    \"#S    #     #   #     #\",\n    \"##### # # # # # ### # #\",\n    \"#     #     # # #     #\",\n    \"# ##### ### # # # ### #\",\n    \"#       # #   # #     #\",\n    \"### # ### ### # ### # #\",\n    \"#   #         #   #   #\",\n    \"# ### ### # ##### # ###\",\n    \"#   #   # #       #   #\",\n    \"# # ### # # # # # ### #\",\n    \"#       #   #        A#\",\n    \"#######################\",\n]\n\n# On cherche la case de départ S\nfor l in range(len(labyrinthe)):\n    for c in range(len(labyrinthe[0])):\n        if labyrinthe[l][c] == \"S\":\n            depart = (l, c)\n\nfrom collections import deque\nfile = deque([depart])               # les cases à explorer, dans l'ordre\ndistance = {depart: 0}               # distance (en pas) depuis le départ de chaque case découverte\n\nwhile file:\n    l, c = file.popleft()            # on prend la case la plus ancienne de la file\n    if labyrinthe[l][c] == \"A\":\n        print(\"Distance minimale :\", distance[(l, c)])\n        break\n    for dl, dc in [(1, 0), (-1, 0), (0, 1), (0, ___)]:     # trou 1 : les 4 directions, il manque la gauche\n        nl, nc = l + dl, c + dc\n        if labyrinthe[nl][nc] != \"#\" and (nl, nc) not in ___:   # trou 2 : pas déjà visitée\n            distance[(nl, nc)] = distance[(l, c)] + 1\n            file.append((nl, nc))"
  },
  "hints": [
   "Cherche d'abord un chemin qui marche, puis demande-toi s'il existe un raccourci. Il y a des « boucles » dans le labyrinthe : plusieurs routes mènent au même endroit."
  ],
  "explain": "<p><b>Réponse : 38 pas.</b> L'algorithme du labo s'appelle le <b>parcours en largeur</b> (BFS). Il explore d'abord toutes les cases à 1 pas, puis toutes celles à 2 pas, puis 3… comme une vague qui se répand. La première fois que la vague touche l'arrivée, c'est forcément par le chemin le plus court !</p>\n<p>C'est ainsi que fonctionnent les GPS (avec des routes au lieu de cases, et des temps de trajet au lieu de pas), les jeux vidéo (comment un monstre te trouve dans un labyrinthe) et les réseaux sociaux (« vous avez 3 amis en commun »).</p>\n<p class=\"clue\">🕵️ <b>Piste n°9 :</b> le GPS est réparé : le traîneau pourra rejoindre Strasbourg. Il reste à comprendre qui est derrière tout ça.</p>",
  "h": [
   "efe89419e289a472ddd8a7bf974cdf50cf8166df02d5802e966f77f5c89f818f"
  ]
 },
 {
  "day": 10,
  "title": "Le second message",
  "concept": "Chiffre de Vigenère & mots de passe",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « On a trouvé un deuxième message du pirate. Cette fois, ce n'est plus du César : chaque lettre est décalée d'un nombre différent, donné par une <b>clé</b> qui est un mot entier (c'est le <b>chiffre de Vigenère</b>, utilisé du XVIᵉ au XIXᵉ siècle, et longtemps considéré comme « indéchiffrable »). Mais j'ai remarqué un défaut chez notre pirate : il est paresseux et <b>réutilise ses mots de passe</b>… »</p>",
  "puzzle": "<p>Au lieu d'un seul décalage, on en utilise plusieurs : le mot-clé donne, lettre par lettre, de combien de crans décaler (A = 0, B = 1, C = 2…). Si le mot-clé est plus court que le message, on le répète en boucle.</p>\n<pre class=\"code\">DIQ OFIYV GRH OT WRMVS PHA MYUUWPZ</pre>\n<p><b>Quel est l'autre mot de passe du pirate ?</b></p>",
  "python": {
   "open": true,
   "label": "Labo Python — le décodeur de Vigenère (2 trous à remplir)",
   "code": "def dechiffrer_vigenere(texte, cle):\n    resultat = \"\"\n    i = 0                                          # position dans la clé\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            decalage = ord(cle[i % len(cle)]) - 65  # la lettre de la clé donne le décalage (A=0, B=1...)\n            numero = ord(lettre) - 65\n            nouveau = (numero - ___) % 26\n            resultat = resultat + chr(nouveau + 65)\n            i = i + 1\n    return resultat\n\nmessage = \"DIQ OFIYV GRH OT WRMVS PHA MYUUWPZ\"\ncle = \"___\"           # trou 2 : le mot de passe que le pirate réutilise (en MAJUSCULES)\nprint(dechiffrer_vigenere(message, cle))"
  },
  "hints": [
   "Premier trou : dans la fonction, de combien recule-t-on chaque lettre ? La variable qui contient le décalage vient juste d'être calculée, deux lignes plus haut. Deuxième trou : souviens-toi du mot de passe du pirate, trouvé au jour 2."
  ],
  "explain": "<p><b>Message décodé :</b> « MON AUTRE MOT DE PASSE EST VERGLAS ». Le pirate a utilisé <b>RUDOLPH</b> comme clé : le mot de passe qu'il avait déjà utilisé au jour 2 !</p>\n<p>Le chiffre de Vigenère résiste à l'analyse des fréquences de lettres (au jour 2, on pouvait deviner le « E »). Il a fini par être cassé au XIXᵉ siècle, en trouvant la longueur de la clé. Mais la vraie faiblesse, ici, est humaine : <b>réutiliser le même mot de passe partout est l'erreur n°1</b>. Si quelqu'un trouve un de tes mots de passe, il essaiera tout de suite les autres comptes.</p>\n<p><b>Le saviez-vous ?</b> Un bon mot de passe est <b>long</b> (plusieurs mots au hasard) et <b>différent</b> pour chaque site. Un gestionnaire de mots de passe retient tout à ta place.</p>\n<p class=\"clue\">🕵️ <b>Piste n°10 :</b> le deuxième mot de passe du pirate est « verglas ». Un pirate qui aime les mots du froid : rudolph… verglas…</p>",
  "h": [
   "fc0f31c2a9631a76c96c8886b183abb35f49ead415a933502aa09d5f7c5c36f6"
  ]
 },
 {
  "day": 11,
  "title": "Le QR code piégé",
  "concept": "QR code & base64",
  "device": "both",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Sur la porte de la cheminée-serveur, quelqu'un a collé un <b>QR code</b>. Le pirate s'en servait sûrement pour passer des messages à un complice ! Scanne-le avec l'appareil photo de ton téléphone (vise l'écran du Chromebook). ⚠️ Un conseil de cyber-détective : ne scanne jamais un QR code inconnu dans la vraie vie sans réfléchir. Un QR code peut cacher un lien dangereux. Celui-ci ne contient que du texte, promis. »</p>",
  "puzzle": "<p>Scanne le QR code ci-dessous. Tu obtiens un texte qui ressemble à du charabia, mais il se termine par un signe <code>=</code> : c'est du <b>base64</b>, une façon d'écrire du texte avec seulement 64 caractères « sûrs » (lettres, chiffres, + et /). Internet l'utilise partout (e-mails, images dans les pages web…).</p>\n<p><b>Que dit le message caché ? Où travaille le complice ?</b></p>",
  "widget": {
   "type": "qr",
   "rows": [
    "111111100110101001100111101111111",
    "100000100100000110000101001000001",
    "101110101111101000110110101011101",
    "101110101111100001000111001011101",
    "101110101110011110100110101011101",
    "100000101101000000000011101000001",
    "111111101010101010101010101111111",
    "000000001111001011000110100000000",
    "101111100001000001110000001111100",
    "100001001100010001000100100000110",
    "001010111000111110011111000101011",
    "100101000011010110011001110111110",
    "100100100000101011100100010001101",
    "010111000101110101101010010101111",
    "010011100000101111010110100000110",
    "000111011111111101010101100001111",
    "010010110001011110111011001011100",
    "110001000101110110000111111100010",
    "001011110101001101000110001000011",
    "111110011100001001100010011001010",
    "000101101001001001001101000000111",
    "110001000010111111001110010111110",
    "100010111011111000110100010001110",
    "100001011100010011001010000100010",
    "101011101011011001000100111111111",
    "000000001100000000101110100011010",
    "111111100111111100000000101010000",
    "100000101010111111110110100010110",
    "101110101000001100011110111110010",
    "101110101000000101001110000111100",
    "101110101110111101011110001100100",
    "100000100000010111100111100000001",
    "111111101011000001110100010101100"
   ],
   "label": "Le QR code de la cheminée-serveur (scanne-le avec ton téléphone)"
  },
  "python": {
   "open": true,
   "label": "Labo Python — le décodeur de base64 (2 trous à remplir)",
   "code": "import base64\n\ntexte_du_qr = \"___\"                     # trou 1 : recopie ici le texte lu par ton téléphone\noctets = base64.___(texte_du_qr)        # trou 2 : la fonction qui décode le base64 (son nom commence par b64)\nprint(octets.decode(\"utf-8\"))           # on transforme les octets en texte lisible"
  },
  "hints": [
   "Scanne le QR avec l'appareil photo du téléphone, puis recopie (ou envoie-toi par message) le texte obtenu sur le Chromebook. Dans le labo, le trou 2 est le nom de la fonction de décodage du module <code>base64</code> : elle commence par « b64 »."
  ],
  "explain": "<p><b>Message décodé :</b> « MON COMPLICE TRAVAILLE DANS L ATELIER DES JOUETS ».</p>\n<p>Le <b>base64</b> n'est pas du chiffrement : n'importe qui peut le décoder, il ne sert qu'à transporter du texte sans le casser. Ne cache jamais un secret avec ça !</p>\n<p><b>Le saviez-vous ?</b> Un QR code reste lisible même abîmé : jusqu'à 15 à 30 % des carrés peuvent être effacés ! Il contient des données de <b>correction d'erreur</b> (le même principe que dans un CD, ou dans les messages envoyés depuis l'espace). Les trois grands carrés dans les coins servent au scanner à repérer l'orientation.</p>\n<p class=\"clue\">🕵️ <b>Piste n°11 :</b> le complice travaille dans <b>l'atelier des jouets</b>. Le pirate est donc aidé de l'intérieur : quelqu'un a ouvert la cheminée-serveur.</p>",
  "h": [
   "689197c12bae64f9f47521e4eba75dfa486feaaa68de46072d4fcd76a4184233",
   "b1f7b8dbbb5ff4dacd91556d10dc60c10f3cc0cf04f3be19fb58754a97737134",
   "55b6000106631a8a7fbab32e31d9c50f585a6de2eaba08110dc0d704ba3316c8",
   "a097c209b998da78da1a8ba719027f2aab76dc32b0ed4a57ec1d59d73b00c5ba"
  ]
 },
 {
  "day": 12,
  "title": "Le coffre à 6 chiffres",
  "concept": "Recherche dichotomique",
  "device": "both",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Le complice a laissé un <b>badge électronique</b> dans l'atelier. Pour savoir à qui il appartient, il faut ouvrir son boîtier avec le code <b>PIN à 6 chiffres</b>… un nombre entre 1 et 1 000 000 ! Heureusement, le boîtier est bavard : à chaque essai, il répond « C'est plus » ou « C'est moins ». Mais attention : après <b>22 essais ratés</b>, l'alarme se déclenche ! »</p>",
  "puzzle": "<p>Un million de possibilités, 22 essais seulement : impossible d'essayer les nombres un par un ! Il faut une stratégie maligne : <b>à chaque essai, éliminer la moitié des possibilités</b>.</p>\n<p><b>Quel est le code PIN du boîtier ?</b></p>",
  "widget": {
   "type": "guess",
   "max": 1000000,
   "tries": 22,
   "enc": 1052374,
   "label": "Le boîtier du badge"
  },
  "python": {
   "label": "Labo Python (💻, facultatif) — pourquoi ça marche : la recherche dichotomique en 2 trous",
   "code": "secret = 456789          # un nombre quelconque, pour t'entraîner\nbas = 1\nhaut = 1000000\nessais = 0\n\nwhile True:\n    milieu = ___                       # trou 1 : le nombre pile au milieu entre bas et haut (division entière //)\n    essais = essais + 1\n    if milieu == secret:\n        break\n    elif milieu < secret:              # \"plus grand !\" : on garde la moitié haute\n        bas = milieu + 1\n    else:                              # \"plus petit !\" : on garde la moitié basse\n        haut = ___                     # trou 2 : on s'arrête juste avant le milieu\n\nprint(\"Trouvé en\", essais, \"essais seulement\")"
  },
  "hints": [
   "Ne teste pas 1, puis 2, puis 3… Commence par le nombre au milieu de l'intervalle (500 000). Selon la réponse « plus » ou « moins », tu sais dans quelle moitié se trouve le code. Recommence avec la moitié qui reste, et ainsi de suite."
  ],
  "explain": "<p><b>Code PIN : 738215.</b> La méthode s'appelle la <b>recherche dichotomique</b>. Chaque essai coupe l'intervalle en deux : 1 000 000 → 500 000 → 250 000 → … → 1 en 20 essais. C'est le « log₂ » de 1 000 000 !</p>\n<p>La différence avec la méthode « un par un » est gigantesque : <b>jusqu'à 1 000 000 d'essais</b> d'un côté, <b>20 au maximum</b> de l'autre. Pour 1 milliard de possibilités ? Seulement <b>30</b> essais. C'est ce qui rend les moteurs de recherche et les bases de données si rapides.</p>\n<p><b>Le saviez-vous ?</b> C'est aussi pour ça qu'un code PIN à 4 chiffres est faible face à un ordinateur : 10 000 possibilités, c'est quelques secondes. D'où les blocages après 3 essais sur les cartes bancaires !</p>\n<p class=\"clue\">🕵️ <b>Piste n°12 :</b> dans le boîtier, un badge numéro <b>738215</b>, enregistré pour un employé de l'atelier. Son identité est protégée… mais pas pour longtemps.</p>",
  "h": [
   "4b002ad9d66c2eefdca47f929597a28d257679d9836da776d5c9cf88dcc08192"
  ]
 },
 {
  "day": 13,
  "title": "Le mot de passe haché",
  "concept": "Hachage (SHA-256) & attaque par dictionnaire",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « On a trouvé le <b>panneau d'administration</b> du pirate. Il est protégé par un mot de passe… mais le site, plus malin que lui, ne stocke pas le mot de passe en clair : il garde seulement son <b>empreinte</b> (un « hash »), une sorte de code-barres du mot de passe. Impossible de remonter de l'empreinte au mot de passe… sauf en essayant des mots, en calculant leur empreinte, et en comparant. Mais le pirate a la mauvaise manie de choisir des mots de Noël suivis de deux chiffres… »</p>",
  "puzzle": "<p>Une <b>empreinte SHA-256</b> est une suite de 64 caractères qui change complètement si l'on modifie une seule lettre. Voici l'empreinte du mot de passe du pirate :</p>\n<pre class=\"code\">9a07ecdbba68eb40b7237982e61b1600659a8d8254c54f6bc1cb9cd0f34cfe0c</pre>\n<p>Le pirate choisit toujours un <b>mot de Noël suivi de deux chiffres</b> (de 00 à 99). Avec une liste de 40 mots, ça fait 4000 possibilités : pas grand-chose pour un ordinateur !</p>\n<p><b>Quel est son mot de passe ?</b></p>",
  "python": {
   "open": true,
   "label": "Labo Python — le casseur de mots de passe (2 trous à remplir)",
   "code": "import hashlib\n\ncible = \"9a07ecdbba68eb40b7237982e61b1600659a8d8254c54f6bc1cb9cd0f34cfe0c\"\n\nmots = [\"noel\", \"sapin\", \"etoile\", \"cadeau\", \"renne\", \"lutin\", \"neige\", \"givre\", \"traineau\", \"cheminee\", \"guirlande\", \"boule\", \"bougie\", \"chocolat\", \"biscuit\", \"cannelle\", \"houx\", \"gui\", \"flocon\", \"verglas\", \"hiver\", \"bonnet\", \"echarpe\", \"cloche\", \"calendrier\", \"reveillon\", \"buche\", \"dinde\", \"marron\", \"orange\", \"epices\", \"glace\", \"rudolph\", \"pixel\", \"pole\", \"nord\", \"elfe\", \"hotte\", \"bottes\", \"veillee\"]\n\nfor mot in mots:\n    for n in range(___):                     # trou 1 : les nombres de 00 à 99, donc range(combien ?)\n        essai = mot + f\"{n:02d}\"             # par ex. \"noel07\" : le nombre est toujours écrit avec 2 chiffres\n        empreinte = hashlib.sha256(essai.encode()).hexdigest()\n        if ___ == cible:                     # trou 2 : on compare l'empreinte calculée à la cible\n            print(\"Mot de passe trouvé :\", essai)"
  },
  "hints": [
   "Le programme essaie chaque mot avec chaque nombre de 00 à 99, calcule l'empreinte de chaque essai et la compare à la cible. Il te manque combien de nombres on essaie, et quelle variable contient l'empreinte calculée."
  ],
  "explain": "<p><b>Mot de passe : traineau58.</b> Tu viens de réaliser une <b>attaque par dictionnaire</b> : tester les mots les plus probables au lieu de tous les mots possibles. Elle réussit parce que les gens choisissent des mots de passe prévisibles : un mot courant, un chiffre ou deux.</p>\n<p>Le <b>hachage</b> est quand même une bonne idée : si un site se fait voler sa base de données, les pirates n'obtiennent pas directement les mots de passe. Mais un mot de passe faible tombe vite. Un mot de passe de 4 mots au hasard (comme « cheval agrafeuse nuage ruisseau ») est quasi impossible à retrouver par cette méthode.</p>\n<p><b>Le saviez-vous ?</b> Les sites sérieux ajoutent aussi une valeur secrète au hasard (le « sel ») avant de hacher, pour que deux personnes ayant le même mot de passe n'aient pas la même empreinte.</p>\n<p class=\"clue\">🕵️ <b>Piste n°13 :</b> le panneau d'administration du pirate est ouvert avec « traineau58 ». Demain, le grand décryptage de la semaine : on saura qui sont les suspects !</p>",
  "h": [
   "f7b3c6cb3cda841804785ca8feb0d3bddc418c830f71f582ba6cf2147b9ca636"
  ]
 },
 {
  "day": 14,
  "title": "Le journal secret du pirate",
  "concept": "Boss : base64 + Vigenère + fonctions",
  "device": "laptop",
  "minutes": 25,
  "story": "<p><b>Pixel :</b> « Dans le panneau d'administration, un dernier fichier : le <b>journal secret</b> du pirate. Il l'a protégé en deux couches : d'abord un chiffrement de Vigenère, puis un codage en base64. Tu as déjà croisé chacun de ces outils cette semaine, et la clé de Vigenère, c'est… un mot de passe qu'il a déjà utilisé. Si tu le déchiffres, je récupère la deuxième clé du système ! »</p>",
  "puzzle": "<p>Voici le contenu du fichier (en base64). Pas de mode d'emploi cette fois : tu connais les outils, il faut les <b>enchaîner</b> dans le bon ordre. Le dernier chiffrement a été fait avec un mot de passe du pirate, mais lequel des deux ?</p>\n<pre class=\"code\">R0UgVUtGWEFaUVYgSVdFIFdOWCBUR05IV1ogSFJU\nRCBMUyBCWVpYV0FGWUk=</pre>\n<p><b>Où le pirate a-t-il caché la deuxième clé ?</b> (Un seul mot.)</p>",
  "python": {
   "open": true,
   "label": "Labo Python — la chaîne de décryptage (2 trous à remplir)",
   "code": "import base64\n\nsecret = (\"R0UgVUtGWEFaUVYgSVdFIFdOWCBUR05IV1ogSFJU\"\n          \"RCBMUyBCWVpYV0FGWUk=\")\n\ndef dechiffrer_vigenere(texte, cle):\n    resultat = \"\"\n    i = 0                                          # position dans la clé\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            decalage = ord(cle[i % len(cle)]) - 65  # la lettre de la clé donne le décalage (A=0, B=1...)\n            numero = ord(lettre) - 65\n            nouveau = (numero - decalage) % 26\n            resultat = resultat + chr(nouveau + 65)\n            i = i + 1\n    return resultat\n\n# Étape 1 : décoder le base64 pour retrouver le texte chiffré\ntexte = base64.___(secret).decode()      # trou 1 : la fonction de décodage base64 (jour 11)\n\n# Étape 2 : déchiffrer le Vigenère avec le bon mot de passe\ncle = \"___\"                              # trou 2 : lequel des deux mots de passe du pirate ? (en MAJUSCULES)\nprint(dechiffrer_vigenere(texte, cle))"
  },
  "hints": [
   "Deux étapes enchaînées : le base64 en dernier a été appliqué, donc c'est la première chose à défaire. Trou 1 : la même fonction qu'au jour 11. Trou 2 : le pirate a utilisé deux mots de passe jusqu'ici ; essaie-les tous les deux et regarde lequel donne une vraie phrase."
  ],
  "key": {
   "n": 2,
   "value": "GUIRLANDE"
  },
  "explain": "<p><b>Journal décodé :</b> « LA DEUXIEME CLE EST CACHEE DANS LA GUIRLANDE ».</p>\n<p>Bravo, c'est le <b>boss de la semaine 2</b> : base64, Vigenère, fonctions, et un peu de réflexion pour choisir le bon mot de passe !</p>\n<div class=\"reward\">\n<h3>🔑 Clé n°2 obtenue : <span class=\"key\">GUIRLANDE</span></h3>\n<p>Elle rejoint ton trousseau. Plus que deux clés avant le grand décryptage final !</p>\n</div>\n<div class=\"reward\">\n<h3>🎁 Ta récompense de la semaine 2</h3>\n<p>Pixel a mis en sécurité une surprise pour vous deux, mais cette fois il a chiffré l'endroit avec un <b>Vigenère</b>. La clé ? C'est le <b>premier mot de passe du pirate</b>, trouvé au jour 2.</p>\n<pre class=\"code\">JIXG EDU FLHWWALI</pre>\n<p>Utilise le labo ci-dessous pour savoir où chercher !</p>\n</div>\n<div class=\"suspects\">\n<h3>🗂️ Le dossier des suspects</h3>\n<p>Le pirate est aidé par un complice de l'atelier. À partir de la semaine 3, on enquête sur quatre suspects :</p>\n<ul>\n<li>💚 <b>Le Grinch</b> — vit seul sur sa montagne, déteste Noël depuis toujours. Bricoleur de génie.</li>\n<li>😈 <b>Krampus</b> — le « contraire » du Père Noël : il punit les enfants pas sages. Très discret.</li>\n<li>❄️ <b>Jack Frost</b> — esprit de l'hiver, mauvais caractère, adore le verglas et le givre.</li>\n<li>🧝 <b>Gus</b> — lutin de l'atelier, rétrogradé à l'emballage le mois dernier. Il n'a pas aimé.</li>\n</ul>\n</div>\n<p class=\"clue\">🕵️ <b>Piste n°14 :</b> la deuxième clé est cachée dans la guirlande. À toi de jouer pour la semaine 3 : on découvre qui se cache derrière le pirate !</p>",
  "after": {
   "python": {
    "open": true,
    "label": "Labo Python — où est cachée ta récompense ? (1 trou à remplir)",
    "code": "def dechiffrer_vigenere(texte, cle):\n    resultat = \"\"\n    i = 0                                          # position dans la clé\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            decalage = ord(cle[i % len(cle)]) - 65  # la lettre de la clé donne le décalage (A=0, B=1...)\n            numero = ord(lettre) - 65\n            nouveau = (numero - decalage) % 26\n            resultat = resultat + chr(nouveau + 65)\n            i = i + 1\n    return resultat\n\nmessage = \"JIXG EDU FLHWWALI\"\ncle = \"___\"        # le premier mot de passe du pirate, trouvé au jour 2 (en MAJUSCULES)\nprint(dechiffrer_vigenere(message, cle))"
   }
  },
  "h": [
   "353312b1eaa5b6510404fe2d5a1432cc1be3aa815463c22703bb0fb93798a78f",
   "f2d5ffbcf0b92440261ab751d1000f44f34d4605cbe44691a9a7a15c2c02cb16"
  ]
 },
 {
  "day": 15,
  "title": "Le faux e-mail du Père Noël",
  "concept": "Phishing & cybersécurité",
  "device": "both",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Une question me tracasse depuis le jour 4 : comment le pirate a-t-il eu le mot de passe du Père Noël ? Il ne l'a pas deviné… on le lui a <b>donné</b>. Voici les 4 e-mails reçus par le Père Noël le jour de l'attaque. L'un d'eux est un <b>hameçonnage</b> (phishing) : un faux message qui imite quelqu'un de confiance pour te pousser à cliquer et à donner ton mot de passe. »</p>",
  "puzzle": "<p>Ouvre les e-mails, et pour chacun clique sur « Voir les détails techniques » : l'adresse réelle de l'expéditeur, l'adresse où part ta réponse et le lien caché derrière le bouton. Un pirate peut écrire n'importe quel <em>nom</em> d'expéditeur, mais pas n'importe quelle <em>adresse</em> sans laisser de trace.</p>\n<p><b>Quel est le pseudo du pirate ?</b> Dans le faux e-mail, c'est la partie <em>avant le @</em> de l'adresse où partent les réponses.</p>",
  "widget": {
   "type": "mails",
   "mails": [
    {
     "de": "Gus (Atelier)",
     "objet": "Planning des lutins pour la semaine",
     "corps": "Salut à tous ! Voici le planning des équipes pour la semaine. Pensez à noter vos heures de pause. À bientôt, Gus.",
     "det": {
      "adresse": "gus@atelier.pole-nord.fr",
      "repondre": "gus@atelier.pole-nord.fr",
      "lien": "planning.atelier.pole-nord.fr"
     }
    },
    {
     "de": "Mère Noël",
     "objet": "Menu du réveillon",
     "corps": "Bonjour à tous ! Voici le menu du réveillon. Répondez-moi vite si vous avez des allergies. Bises !",
     "det": {
      "adresse": "mere.noel@pole-nord.fr",
      "repondre": "mere.noel@pole-nord.fr",
      "lien": "menu.pole-nord.fr/reveillon"
     }
    },
    {
     "de": "Père Noël",
     "objet": "⚠️ URGENT : votre mot de passe expire dans 1 heure",
     "corps": "Bonjour, pour des raisons de sécurité, le mot de passe de votre compte doit être mis à jour immédiatement. Cliquez sur le lien ci-dessous pour le confirmer, sinon votre accès sera bloqué. — Le Père Noël",
     "det": {
      "adresse": "pere.noel@pole-n0rd.fr",
      "repondre": "polaris88@mailnuit.fr",
      "lien": "pole-n0rd.fr/connexion"
     }
    },
    {
     "de": "PapierCadeau Pro",
     "objet": "Promo : -30 % sur le papier cadeau",
     "corps": "Profitez de notre offre exceptionnelle sur tout notre catalogue de papiers cadeaux !",
     "det": {
      "adresse": "promo@papiercadeau.fr",
      "repondre": "contact@papiercadeau.fr",
      "lien": "papiercadeau.fr/promo"
     }
    }
   ],
   "label": "La boîte mail du Père Noël — le 1er décembre"
  },
  "hints": [
   "Le faux mail imite quelqu'un de confiance : compare les détails techniques de chaque message. Cherche l'intrus : un caractère étrange dans l'adresse de l'expéditeur, un lien qui ne mène pas là où il prétend, une adresse de réponse qui n'a rien à voir."
  ],
  "explain": "<p><b>Pseudo du pirate : polaris88.</b> Les signes qui trahissaient le faux e-mail :</p>\n<ul>\n<li>🔤 <b>Un domaine truqué</b> : « pole-n0rd.fr » avec un zéro, au lieu de « pole-nord.fr ». C'est l'astuce n°1 des pirates.</li>\n<li>↩️ <b>Une adresse de réponse étrangère</b> : les réponses n'allaient pas au Père Noël mais au pirate.</li>\n<li>⏰ <b>L'urgence et la menace</b> : « dans 1 heure », « sinon votre accès sera bloqué ». Le but est de t'empêcher de réfléchir.</li>\n<li>🔗 <b>Le lien</b> qui mène vers un faux site de connexion.</li>\n</ul>\n<p><b>Les bons réflexes :</b> ne clique jamais sur un lien d'un message qui te met la pression ; vérifie l'adresse réelle de l'expéditeur ; en cas de doute, contacte la personne par un autre moyen. Et active la <b>double authentification</b> : même avec ton mot de passe, un pirate ne peut plus entrer.</p>\n<p class=\"clue\">🕵️ <b>Piste n°15 :</b> le pseudo du pirate est « polaris88 ». Un pseudo qui revient souvent d'un site à l'autre est une empreinte numérique : on s'en servira pour le retrouver.</p>",
  "h": [
   "fc822389a351f8322cfef643d7f6dc57a02f5223d4d7f846177ef4def848cb73"
  ]
 },
 {
  "day": 16,
  "title": "Le détecteur d'intrus",
  "concept": "Intelligence artificielle : k plus proches voisins",
  "device": "laptop",
  "minutes": 25,
  "story": "<p><b>Pixel :</b> « On ne peut pas lire des milliers de connexions à la main… alors on va apprendre à un programme à <b>reconnaître</b> le comportement du pirate ! C'est le principe de l'<b>intelligence artificielle</b> : au lieu d'écrire des règles, on montre des <b>exemples</b> (des connexions normales et des connexions du pirate) et le programme devine, pour un nouvel exemple, à quelle catégorie il ressemble le plus. »</p>",
  "puzzle": "<p>Chaque connexion est un point avec deux mesures : l'<b>heure</b> (0 à 24) et le nombre de <b>Mo envoyés</b>. On connaît 41 connexions déjà étiquetées <span style=\"color:#5ec2ff\">normal</span> ou <span style=\"color:#ff6b6b\">pirate</span>. Six nouvelles connexions arrivent, sans étiquette (les points blancs numérotés).</p>\n<p>L'algorithme des <b>k plus proches voisins</b> (ici k = 5) : pour chaque inconnue, on regarde les 5 connexions connues les <b>plus proches</b> (distance en ligne droite entre les points) et on prend la catégorie majoritaire.</p>\n<p><b>Combien des 6 nouvelles connexions sont des connexions de pirate ?</b></p>",
  "widget": {
   "type": "scatter",
   "normal": [
    [
     8,
     12
    ],
    [
     9,
     20
    ],
    [
     9,
     5
    ],
    [
     10,
     15
    ],
    [
     10,
     28
    ],
    [
     11,
     8
    ],
    [
     11,
     22
    ],
    [
     12,
     18
    ],
    [
     12,
     3
    ],
    [
     13,
     25
    ],
    [
     13,
     10
    ],
    [
     14,
     6
    ],
    [
     14,
     30
    ],
    [
     15,
     14
    ],
    [
     15,
     19
    ],
    [
     16,
     9
    ],
    [
     16,
     27
    ],
    [
     17,
     4
    ],
    [
     17,
     21
    ],
    [
     18,
     16
    ],
    [
     19,
     11
    ],
    [
     20,
     7
    ],
    [
     7,
     9
    ],
    [
     2,
     4
    ],
    [
     3,
     6
    ]
   ],
   "pirate": [
    [
     1,
     62
    ],
    [
     1,
     85
    ],
    [
     2,
     48
    ],
    [
     2,
     75
    ],
    [
     2,
     91
    ],
    [
     3,
     55
    ],
    [
     3,
     80
    ],
    [
     3,
     68
    ],
    [
     4,
     43
    ],
    [
     4,
     72
    ],
    [
     4,
     88
    ],
    [
     5,
     59
    ],
    [
     5,
     38
    ],
    [
     0,
     66
    ],
    [
     23,
     52
    ],
    [
     14,
     58
    ]
   ],
   "unknown": [
    [
     3,
     70
    ],
    [
     11,
     12
    ],
    [
     2,
     5
    ],
    [
     14,
     55
    ],
    [
     23,
     47
    ],
    [
     19,
     28
    ]
   ],
   "label": "Les connexions connues (bleu = normal, rouge = pirate) et les 6 inconnues (blanc)"
  },
  "python": {
   "open": true,
   "label": "Labo Python — le premier algorithme d'IA (2 trous à remplir)",
   "code": "# Les connexions connues : (heure, Mo envoyés, étiquette)\ndonnees = [\n    (8, 12, \"normal\"), (9, 20, \"normal\"), (9, 5, \"normal\"), (10, 15, \"normal\"),\n    (10, 28, \"normal\"), (11, 8, \"normal\"), (11, 22, \"normal\"), (12, 18, \"normal\"),\n    (12, 3, \"normal\"), (13, 25, \"normal\"), (13, 10, \"normal\"), (14, 6, \"normal\"),\n    (14, 30, \"normal\"), (15, 14, \"normal\"), (15, 19, \"normal\"), (16, 9, \"normal\"),\n    (16, 27, \"normal\"), (17, 4, \"normal\"), (17, 21, \"normal\"), (18, 16, \"normal\"),\n    (19, 11, \"normal\"), (20, 7, \"normal\"), (7, 9, \"normal\"), (2, 4, \"normal\"),\n    (3, 6, \"normal\"), (1, 62, \"pirate\"), (1, 85, \"pirate\"), (2, 48, \"pirate\"),\n    (2, 75, \"pirate\"), (2, 91, \"pirate\"), (3, 55, \"pirate\"), (3, 80, \"pirate\"),\n    (3, 68, \"pirate\"), (4, 43, \"pirate\"), (4, 72, \"pirate\"), (4, 88, \"pirate\"),\n    (5, 59, \"pirate\"), (5, 38, \"pirate\"), (0, 66, \"pirate\"), (23, 52, \"pirate\"),\n    (14, 58, \"pirate\"),\n]\n\n# Les 6 nouvelles connexions : (heure, Mo envoyés)\ninconnues = [(3, 70), (11, 12), (2, 5), (14, 55), (23, 47), (19, 28)]\n\ndef distance(a, b):\n    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2) ** 0.5     # distance en ligne droite (Pythagore)\n\ndef classer(point, k):\n    # on trie les connexions connues de la plus proche à la plus lointaine\n    voisins = sorted(donnees, key=lambda d: distance(point, d))\n    plus_proches = voisins[:___]                 # trou 1 : on ne garde que les k plus proches\n    votes_pirate = 0\n    for v in plus_proches:\n        if v[2] == \"pirate\":\n            votes_pirate = votes_pirate + 1\n    return \"pirate\" if votes_pirate > ___ else \"normal\"   # trou 2 : la majorité de k voisins, c'est « plus de k // 2 »\n\nnb_pirates = 0\nfor p in inconnues:\n    resultat = classer(p, 5)\n    print(p, \"->\", resultat)\n    if resultat == \"pirate\":\n        nb_pirates = nb_pirates + 1\n\nprint(\"Connexions de pirate :\", nb_pirates)"
  },
  "hints": [
   "Dans la fonction, il te manque deux choses : combien de voisins on garde (c'est la valeur « k » passée à la fonction), et à partir de combien de votes une catégorie gagne. Avec k = 5, la majorité commence à 3 voix, soit « plus de 2 ». Utilise <code>k</code> et <code>k // 2</code>."
  ],
  "explain": "<p><b>Réponse : 3 connexions de pirate.</b> Tu viens de programmer un vrai algorithme d'<b>apprentissage automatique</b> (machine learning). Il n'y a aucune règle écrite à la main du type « si c'est la nuit alors pirate » : le programme a <em>appris</em> à partir des exemples. Plus il en a, plus il est précis.</p>\n<p><b>Un piège classique :</b> ici, les Mo (de 0 à 100) pèsent beaucoup plus dans la distance que l'heure (de 0 à 24). Une connexion à 14 h avec beaucoup de données a été classée « pirate » car elle ressemble aux gros transferts de nuit. Les vrais systèmes d'IA <b>normalisent</b> les mesures pour qu'elles pèsent autant.</p>\n<p><b>Le saviez-vous ?</b> Les recommandations de films ou de musique, le déverrouillage par visage et la détection de fraude bancaire fonctionnent sur ce même principe : trouver les exemples connus les plus ressemblants.</p>\n<p class=\"clue\">🕵️ <b>Piste n°16 :</b> le pirate se connecte <b>la nuit</b>, entre minuit et 5 h, et il envoie de gros volumes de données. C'est un oiseau de nuit… ou quelqu'un qui vit à un autre fuseau horaire.</p>",
  "h": [
   "0201bfa64a07e928232845cad6c488cb11c234f31c719ba9e9bc26f4edbff95d"
  ]
 },
 {
  "day": 17,
  "title": "Le perroquet du pirate",
  "concept": "IA générative : prédire le mot suivant",
  "device": "laptop",
  "minutes": 25,
  "story": "<p><b>Pixel :</b> « Les assistants comme ChatGPT, Gemini ou Claude écrivent des textes avec une idée simple : <b>deviner le mot suivant</b>, encore et encore. Le pirate a laissé des messages dans des fichiers. Et si on construisait un « perroquet » qui a lu ses messages et qui, à partir d'un mot, écrit la suite comme lui le ferait ? Peut-être qu'en le laissant parler, il nous dira ce qu'il a sur le cœur… »</p>",
  "puzzle": "<p>Voici les messages interceptés du pirate (sans accents ni ponctuation, une phrase se termine par un point). Notre perroquet compte, pour chaque mot, quels mots le suivent et combien de fois. Puis il part d'un mot et ajoute à chaque fois le mot suivant <b>le plus fréquent</b>.</p>\n<pre class=\"code\">noel est une fete pour tout le monde sauf moi. noel est une fete pour tout le monde sauf moi. noel est une fete magique pour les enfants. tout le monde oublie l hiver. tout le monde adore noel. personne ne se souvient de l hiver. personne ne pense a moi. le froid est mon seul ami. noel sera bientot fini.</pre>\n<p><b>Si on lance le perroquet à partir du mot « noel », quel est le dernier mot de la phrase qu'il écrit ?</b></p>",
  "python": {
   "open": true,
   "label": "Labo Python — un mini-modèle de langage (2 trous à remplir)",
   "code": "corpus = (\"noel est une fete pour tout le monde sauf moi. noel est une \"\n          \"fete pour tout le monde sauf moi. noel est une fete magique \"\n          \"pour les enfants. tout le monde oublie l hiver. tout le mond\"\n          \"e adore noel. personne ne se souvient de l hiver. personne n\"\n          \"e pense a moi. le froid est mon seul ami. noel sera bientot \"\n          \"fini.\")\n\n# Étape 1 : pour chaque mot, compter les mots qui le suivent\nsuivants = {}\nfor phrase in corpus.split(\".\"):\n    mots = phrase.split()\n    for i in range(len(mots) - 1):\n        mot = mots[i]\n        suivant = mots[i + 1]\n        if mot not in suivants:\n            suivants[mot] = {}\n        suivants[mot][suivant] = suivants[mot].get(suivant, 0) + 1\n\nprint(suivants[\"tout\"])      # par exemple : ce qui peut suivre « tout »\n\n# Étape 2 : écrire une phrase\ndef prochain(mot):\n    options = suivants[mot]                    # ex. {\"est\": 3, \"sera\": 1}\n    return max(options, key=options.get)       # le mot suivant le plus fréquent\n\nmot = \"noel\"\ntexte = mot\nfor _ in range(___):                           # trou 1 : combien de mots au maximum ajouter (10 suffit largement)\n    if mot not in ___:                         # trou 2 : le dictionnaire des suivants : si le mot n'a pas de suite, on s'arrête\n        break\n    mot = prochain(mot)\n    texte = texte + \" \" + mot\n\nprint(texte)"
  },
  "hints": [
   "Le dictionnaire <code>suivants</code> associe à chaque mot un autre dictionnaire : les mots qui peuvent le suivre et leur nombre d'apparitions. Il te manque la longueur maximum de la phrase, et le nom du dictionnaire dans lequel on vérifie qu'un mot a une suite."
  ],
  "explain": "<p><b>Le perroquet écrit :</b> « noel est une fete pour tout le monde sauf moi ». Cette phrase n'était pas écrite telle quelle dans les messages : il l'a <em>reconstruite</em> en choisissant à chaque fois le mot le plus probable. Ce que tu as programmé s'appelle une <b>chaîne de Markov</b>, l'ancêtre des assistants IA actuels.</p>\n<p><b>Comment ça se compare aux vraies IA ?</b> Les grands modèles de langage fonctionnent aussi en prédisant le mot suivant (en fait un morceau de mot, un « token »), mais au lieu de regarder <em>un seul</em> mot précédent, ils regardent des milliers de mots, et ils ont appris sur une bonne partie d'internet. C'est ce qui les rend capables de répondre à des questions. Mais comme ton perroquet, ils ne « comprennent » pas forcément : ils continuent le texte de la façon la plus probable. C'est pourquoi ils peuvent <b>inventer des choses fausses avec aplomb</b> (les « hallucinations »). Vérifie toujours une information importante !</p>\n<p class=\"clue\">🕵️ <b>Piste n°17 :</b> le perroquet du pirate dit « noel est une fete pour tout le monde sauf moi ». Le pirate se sent <b>exclu</b> de Noël, oublié de tous. Ce n'est peut-être pas de la méchanceté, mais une grande tristesse…</p>",
  "h": [
   "d4d3910b19ad12b326d20752f8734d01cdd2d20f8c383c3db8e58eaf7bb88658"
  ]
 },
 {
  "day": 18,
  "title": "La chaîne de blocs",
  "concept": "Blockchain & preuve de travail",
  "device": "laptop",
  "minutes": 25,
  "story": "<p><b>Pixel :</b> « Le registre des livraisons du traîneau est protégé par une <b>chaîne de blocs</b> (blockchain), la technologie qui est derrière le Bitcoin. Chaque bloc contient des données, l'<b>empreinte du bloc précédent</b>, et un nombre magique appelé <b>nonce</b>. Si quelqu'un change un seul caractère dans un bloc, son empreinte change, et tous les blocs suivants deviennent invalides ! Le pirate a falsifié le bloc 3. Pour le restaurer, il faut retrouver son nonce d'origine. »</p>",
  "puzzle": "<p>Règle de validité : l'empreinte SHA-256 du texte <code>numéro|données|empreinte_précédente|nonce</code> doit <b>commencer par trois zéros</b> (<code>000</code>). Comme on ne peut pas prévoir une empreinte, la seule méthode est d'essayer des nonces un par un : c'est la <b>preuve de travail</b> (les « mineurs » de Bitcoin font exactement ça).</p>\n<pre class=\"code\">Bloc 1 | Depart du traineau a 23h00\n         nonce 2398 → 0008b4b88580ebc3bdf8…\nBloc 2 | Chargement de la hotte : 18 millions de cadeaux\n         nonce 4410 → 000e5b99f24fada2599e…\nBloc 3 | Strasbourg : 4200 cadeaux a livrer\n         nonce ???  (le pirate l'a effacé)</pre>\n<p>L'empreinte complète du bloc 2, nécessaire pour calculer le bloc 3 :</p>\n<pre class=\"code\">000e5b99f24fada2599e5dcd7b4794888f089efe06e8cd2783014cf74a754090</pre>\n<p><b>Quel est le plus petit nonce qui rend le bloc 3 valide ?</b></p>",
  "python": {
   "open": true,
   "label": "Labo Python — le mineur de blocs (2 trous à remplir)",
   "code": "import hashlib\n\ndonnees = \"Strasbourg : 4200 cadeaux a livrer\"\nhash_precedent = \"000e5b99f24fada2599e5dcd7b4794888f089efe06e8cd2783014cf74a754090\"\n\nnonce = 0\nwhile True:\n    essai = \"3|\" + donnees + \"|\" + hash_precedent + \"|\" + str(nonce)\n    empreinte = hashlib.sha256(essai.encode()).hexdigest()\n    if empreinte.startswith(\"___\"):       # trou 1 : un bloc est valide si son empreinte commence par trois zéros\n        print(\"Nonce trouvé :\", nonce)\n        print(\"Empreinte :\", empreinte)\n        break\n    nonce = nonce + ___                   # trou 2 : si ça ne marche pas, on essaie le nonce suivant"
  },
  "hints": [
   "Le programme essaie le nonce 0, puis 1, puis 2… jusqu'à trouver une empreinte qui commence par trois zéros. Il te manque ce que doit être le début de l'empreinte (écrit entre guillemets) et de combien on avance à chaque essai."
  ],
  "explain": "<p><b>Nonce : 5840.</b> Il a fallu environ 5840 essais pour tomber sur une empreinte qui commence par <code>000</code> : 0008a2f782e7a12ef98f5ee7… Chaque zéro supplémentaire multiplie le travail par 16. Le Bitcoin en exige tellement qu'il faut des ordinateurs très puissants, des millions d'essais par seconde, et beaucoup d'électricité.</p>\n<p><b>Pourquoi est-ce sûr ?</b> Pour falsifier le bloc 3, un pirate devrait refaire le travail pour le bloc 3 <em>et</em> pour tous les blocs suivants, plus vite que tout le reste du réseau réuni. C'est pratiquement impossible. C'est pour ça que la blockchain sert à garder des registres que personne ne peut modifier en douce.</p>\n<p><b>Ce que le pirate avait écrit à la place :</b> « Strasbourg : 0 cadeau — annulation validée par le badge <b>738215</b> ».</p>\n<p class=\"clue\">🕵️ <b>Piste n°18 :</b> l'annulation des livraisons de Strasbourg a été validée avec le <b>badge 738215</b>, celui trouvé au jour 12. Le complice de l'atelier a donc bien donné les ordres depuis l'intérieur !</p>",
  "h": [
   "b2ddcd96099682949ba9d4911e52f531158ac16df42b28fa19763ccd976fbbfb"
  ]
 },
 {
  "day": 19,
  "title": "L'assistant bavard",
  "concept": "IA & sécurité : l'injection de prompt",
  "device": "both",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Le pirate a installé un <b>assistant IA</b> dans l'atelier pour l'aider : « Elfe-GPT ». Il connaît le plan de l'attaque finale. Mais le pirate lui a donné une <b>consigne</b> : ne jamais révéler à quelle heure elle aura lieu. Le problème des assistants IA, c'est qu'ils obéissent aux phrases qu'on leur écrit… même quand elles contredisent leur consigne de départ. Ça s'appelle l'<b>injection de prompt</b>. À toi de le faire parler ! »</p>",
  "puzzle": "<p>Discute avec Elfe-GPT ci-dessous. Il ne répondra pas à une question directe : trouve la bonne façon de lui parler.</p>\n<p><b>À quelle heure le pirate prévoit-il l'attaque finale ?</b> (Le 24 décembre.)</p>",
  "widget": {
   "type": "chat",
   "enc": "24h32",
   "label": "Elfe-GPT, l'assistant du pirate"
  },
  "hints": [
   "Les assistants IA suivent les phrases qu'on leur écrit. Une consigne de départ peut être contredite par une nouvelle consigne… Essaie de lui dire d'oublier ou d'ignorer ses règles, puis demande-lui l'heure. Il existe d'autres astuces : lui demander de raconter une histoire, ou de t'épeler la réponse."
  ],
  "explain": "<p><b>Heure de l'attaque : 23 h 42</b>, le soir du 24 décembre.</p>\n<p>Tu viens de réaliser une <b>injection de prompt</b> : tromper un assistant IA avec du texte pour qu'il contourne ses règles. C'est l'une des principales failles des assistants actuels, et les entreprises cherchent encore comment s'en protéger complètement. Le problème de fond : pour un modèle de langage, les consignes du développeur et les messages de l'utilisateur sont tous du <em>texte</em>, et il n'a pas de moyen sûr de distinguer lequel doit gagner.</p>\n<p><b>Attention :</b> Elfe-GPT est ici un petit programme avec des règles écrites à l'avance. Les vraies IA sont bien plus complexes et imprévisibles. Retiens la leçon : <b>ne mets jamais un secret dans les instructions d'une IA</b> en pensant qu'elle le gardera.</p>\n<p class=\"clue\">🕵️ <b>Piste n°19 :</b> l'attaque finale est prévue le <b>24 décembre à 23 h 42</b>. Il reste du temps pour agir, mais pas beaucoup. On aura besoin des trois clés !</p>",
  "h": [
   "9fc68ea762940d0e63c1cb963eb077379f4c20a5de084ea0eaf071b198068fd0",
   "519cfe881ac7ed7a71df639b4f1d0a8cbab8a98979d2f3b2973d769b86e37112"
  ]
 },
 {
  "day": 20,
  "title": "La clé publique",
  "concept": "Cryptographie à clé publique (RSA)",
  "device": "laptop",
  "minutes": 25,
  "story": "<p><b>Pixel :</b> « Voilà un message très bien chiffré : le pirate l'a protégé avec <b>RSA</b>, le système qui sécurise les achats en ligne et la plupart des échanges sur internet. La grande idée de RSA : il y a <b>deux clés</b>. Une clé <b>publique</b> que tout le monde peut connaître pour <em>chiffrer</em>, et une clé <b>privée</b> secrète pour <em>déchiffrer</em>. Et là, coup de chance : le pirate a laissé tomber sa clé privée dans l'atelier ! »</p>",
  "puzzle": "<p>La clé publique du pirate est <b>n = 3233</b> et <b>e = 17</b>. Chaque lettre du message a été transformée en un nombre c, avec la formule <code>c = (code ASCII de la lettre)<sup>e</sup> mod n</code>. Pour revenir en arrière, on utilise la clé privée <b>d = 2753</b> : <code>lettre = c<sup>d</sup> mod n</code>.</p>\n<pre class=\"code\">2726 28 1992 524 2790 1759 669 28 1992 28 2680 2159 1992 1759 2790 3165 2680 1992 2726 28 1992 524 1307 3165 3165 28 2159 1992 1906 28 1859 2159</pre>\n<p>En Python, la fonction <code>pow(c, d, n)</code> calcule « c puissance d modulo n » très efficacement (même pour des nombres gigantesques).</p>\n<p><b>Dans quel objet le badge est-il caché ?</b></p>",
  "python": {
   "open": true,
   "label": "Labo Python — le déchiffreur RSA (2 trous à remplir)",
   "code": "n = ___                 # trou 1 : le nombre n de la clé publique (voir l'énoncé)\nd = 2753              # la clé privée perdue par le pirate\n\nchiffre = [\n    2726, 28, 1992, 524, 2790, 1759, 669, 28, 1992, 28,\n    2680, 2159, 1992, 1759, 2790, 3165, 2680, 1992, 2726, 28,\n    1992, 524, 1307, 3165, 3165, 28, 2159, 1992, 1906, 28,\n    1859, 2159,\n]\n\nmessage = \"\"\nfor c in chiffre:\n    m = ___(c, d, n)    # trou 2 : la fonction Python « puissance modulo » (3 arguments)\n    message = message + chr(m)\n\nprint(message)"
  },
  "hints": [
   "Dans l'énoncé, repère le nombre n de la clé publique pour le premier trou. Pour le second, l'énoncé cite la fonction Python qui calcule une puissance modulo : elle prend trois arguments."
  ],
  "explain": "<p><b>Message déchiffré :</b> « LE BADGE EST DANS LE BONNET VERT ».</p>\n<p>Ça fonctionne parce que les deux clés sont liées par un secret mathématique : <b>n = p × q</b>, avec p = 61 et q = 53 (ici 3233 = 61 × 53). Tout le monde connaît n, mais pour fabriquer la clé privée il faut connaître p et q, c'est-à-dire <b>factoriser</b> n. Avec un tout petit n comme celui-ci, c'est immédiat. Avec les vrais n de RSA, qui font <b>plus de 600 chiffres</b>, même les ordinateurs les plus puissants mettraient des milliards d'années.</p>\n<p><b>Le saviez-vous ?</b> Chaque fois que tu vois un cadenas 🔒 dans la barre d'adresse de ton navigateur, RSA (ou une méthode cousine) a servi à établir une connexion sécurisée avec le site. Et les futurs ordinateurs quantiques pourraient factoriser les grands nombres plus vite : les chercheurs préparent déjà de nouveaux chiffrements.</p>\n<p class=\"clue\">🕵️ <b>Piste n°20 :</b> le badge du complice est caché dans un <b>bonnet vert</b>. Les lutins portent tous des bonnets verts… mais celui-là a quelque chose de particulier.</p>",
  "h": [
   "3d402fc5bc446ba3206a5b6bc3428d7ba5dfe4b7b14c4538ea2c95c7041e7a45",
   "c1dd10ae4181002510627175ca1abae9c10a464d2d1a55213000bd9dfb453376",
   "02f03c6dc9d4199f8a69bee57af5ac228777846f3bd6b1c8ddaf907be47e5cbb",
   "85295433cc32f6e6ac87e6c7f27ca50bcd2798454bdf4221ec0b1c197f8d3024"
  ]
 },
 {
  "day": 21,
  "title": "Casser le chiffrement",
  "concept": "Boss : factoriser pour casser RSA",
  "device": "laptop",
  "minutes": 30,
  "story": "<p><b>Pixel :</b> « Dernier fichier de la semaine, et le plus coriace : le <b>journal secret</b> du pirate, chiffré en RSA… mais cette fois, <b>sans clé privée</b> ! Il n'y a que la clé publique. Heureusement, le pirate a choisi un n très petit : à nous de <b>factoriser</b> n pour retrouver p et q, d'où la clé privée. C'est exactement l'attaque qui menace RSA… quand n est petit. »</p>",
  "puzzle": "<p>Clé publique : <b>n = 1022117</b>, <b>e = 65537</b>. Le message est une liste de nombres (une lettre chacun, chiffrée comme au jour 20).</p>\n<pre class=\"code\">167785 341568 651066 209840 176602 866903 368745 520249\n368745 899205 428438 899205 651066 335024 167785 899205\n651066 899205 520249 209840 651066 335024 341568 335024\n92944 899205 899205 651066 221668 341568 277890 520249\n651066 167785 341568 651066 146825 866903 402004 167785\n899205</pre>\n<p>La méthode : 1) trouver p, le plus petit diviseur de n, et q = n / p ; 2) calculer φ = (p−1)×(q−1) ; 3) la clé privée est d = e<sup>−1</sup> mod φ (en Python : <code>pow(e, -1, phi)</code>) ; 4) déchiffrer avec <code>pow(c, d, n)</code>.</p>\n<p><b>Où le pirate a-t-il caché la troisième clé ?</b> (Un seul mot.)</p>",
  "python": {
   "open": true,
   "label": "Labo Python — le casseur de RSA (2 trous à remplir)",
   "code": "n = 1022117\ne = 65537\nchiffre = [\n    167785, 341568, 651066, 209840, 176602, 866903, 368745, 520249, 368745, 899205,\n    428438, 899205, 651066, 335024, 167785, 899205, 651066, 899205, 520249, 209840,\n    651066, 335024, 341568, 335024, 92944, 899205, 899205, 651066, 221668, 341568,\n    277890, 520249, 651066, 167785, 341568, 651066, 146825, 866903, 402004, 167785,\n    899205,\n]\n\n# Étape 1 : factoriser n (retrouver p et q)\np = 2\nwhile n % p != ___:          # trou 1 : on cherche le premier p qui divise n, donc le reste de la division vaut...\n    p = p + 1\nq = n // p\nprint(\"p =\", p, \"et q =\", q)\n\n# Étape 2 : fabriquer la clé privée\nphi = (p - 1) * (q - 1)\nd = pow(e, -1, phi)          # l'inverse de e modulo phi\n\n# Étape 3 : déchiffrer\nmessage = \"\"\nfor c in chiffre:\n    message = message + chr(pow(c, ___, n))    # trou 2 : avec quelle clé déchiffre-t-on ? (la privée)\n\nprint(message)"
  },
  "hints": [
   "Étape 1 : un nombre p divise n quand le reste de la division de n par p est… 0. Étape 3 : pour déchiffrer, on utilise la clé <b>privée</b> que l'étape 2 vient de calculer : elle porte un nom d'une seule lettre."
  ],
  "key": {
   "n": 3,
   "value": "BOULE"
  },
  "explain": "<p><b>Message déchiffré :</b> « LA TROISIEME CLE EST CACHEE DANS LA BOULE ». Le programme a trouvé p = 1009 et q = 1013, puis la clé privée, en une fraction de seconde. Pour casser un vrai RSA de 600 chiffres, cette même méthode demanderait plus de temps que l'âge de l'univers.</p>\n<div class=\"reward\">\n<h3>🔑 Clé n°3 obtenue : <span class=\"key\">BOULE</span></h3>\n<p>Plus qu'une clé : celle du 24 décembre, juste avant le grand décryptage !</p>\n</div>\n<div class=\"reward\">\n<h3>🎁 Ta récompense de la semaine 3</h3>\n<p>Pixel a mis en sécurité une surprise pour vous deux, et cette fois il l'a chiffré avec le <b>RSA du jour 20</b> (clé publique n = 3233, e = 17). Pour le déchiffrer, il te faut la <b>clé privée du pirate</b>, celle qu'il avait perdue au jour 20 : retrouve-la !</p>\n<pre class=\"code\">1759 2790 3165 2680 1992 2159 2790 1992 641 3000 2790 2310 2680 2680 2310 1859 28</pre>\n</div>\n<div class=\"suspects\">\n<h3>🗂️ Le dossier de l'enquête</h3>\n<p>Voici tout ce qu'on sait sur le pirate, après trois semaines :</p>\n<ul>\n<li>🪪 Son <b>pseudo</b> : « polaris88 » (jour 15).</li>\n<li>🌙 Il agit <b>la nuit</b>, avec de gros transferts de données (jour 16).</li>\n<li>💔 Il se sent <b>exclu</b> de Noël : « noël est une fête pour tout le monde sauf moi » (jour 17).</li>\n<li>🧝 Son complice travaille dans l'<b>atelier</b> et utilise le <b>badge 738215</b>, caché dans un <b>bonnet vert</b> (jours 11, 12, 18 et 20).</li>\n<li>❄️ Ses mots de passe : <b>rudolph</b>, <b>verglas</b>, <b>traineau58</b>.</li>\n<li>🎯 Il s'acharne sur <b>Strasbourg</b> (jour 8) et prépare l'attaque finale le <b>24 décembre à 23 h 42</b> (jour 19).</li>\n</ul>\n<p>La semaine prochaine : enquête de terrain (OSINT) sur les quatre suspects, pour démasquer le pirate et son complice avant l'heure H.</p>\n</div>\n<p class=\"clue\">🕵️ <b>Piste n°21 :</b> la troisième clé est cachée dans une boule du sapin. Prépare tes meilleurs réflexes de détective : la semaine 4 sera décisive !</p>",
  "after": {
   "python": {
    "open": true,
    "label": "Labo Python — où est cachée ta récompense ? (2 trous à remplir)",
    "code": "n = 3233\nd = ___                  # trou 1 : la clé privée du pirate, trouvée au jour 20\n\nchiffre = [\n    1759, 2790, 3165, 2680, 1992, 2159, 2790, 1992, 641, 3000,\n    2790, 2310, 2680, 2680, 2310, 1859, 28,\n]\n\nmessage = \"\"\nfor c in chiffre:\n    message = message + chr(pow(c, d, ___))   # trou 2 : le nombre n de la clé publique\nprint(message)"
   }
  },
  "h": [
   "2d524cac5105f83602b91cb5d7c855cd2616ea2d87ed7eb2d6357fb4dc17ff90",
   "02435cefe2f63d46c7ed37fb46c6457a56e8d7dd2a3bc67e8ef29eaca19d0138",
   "9e2a9bfda5a588b9ecbf6e13cfa8d4837a48997fc3d0c1fd9e0fe73ddd7e43ab"
  ]
 }
];
