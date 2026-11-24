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
 }
];
