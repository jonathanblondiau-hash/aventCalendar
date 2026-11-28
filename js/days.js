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
   "code": "# ord() transforme une lettre en nombre : ord(\"A\") donne 65\n# int(texte, base) transforme un texte écrit dans une base en nombre : int(\"101\", 10) donne 101\n\nmessage = (\"01001100 01000101 00100000 01010000 01001001 \"\n           \"01010010 01000001 01010100 01000101 00100000 \"\n           \"01010011 01000101 00100000 01000011 01000001 \"\n           \"01000011 01001000 01000101 00100000 01000100 \"\n           \"01000001 01001110 01010011 00100000 01001100 \"\n           \"01000101 00100000 01000100 01001111 01010011 \"\n           \"01010011 01001001 01000101 01010010 00100000 \"\n           \"01001100 01010101 01010100 01001001 01001110\")\n\nresultat = \"\"\nfor octet in message.split(\" \"):          # on traite les octets un par un\n    nombre = int(octet, ___)              # trou 1 : binaire = base ... ?\n    resultat = resultat + ___(nombre)     # trou 2 : cherche sur internet la fonction qui fait l'inverse de ord()\n\nprint(resultat)"
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
  "puzzle": "<p>Voici un petit programme Python. Une <b>variable</b> est une boîte qui porte un nom et qui contient une valeur ; on peut la modifier au fil du programme.</p>\n<pre class=\"code\">lutins = 12\npar_lutin = 7\ncadeaux = lutins * par_lutin\ncadeaux = cadeaux - 9\ncadeaux = cadeaux // 5\ndefauts = cadeaux % 4\ncadeaux = cadeaux + defauts * 10\nprint(cadeaux)</pre>\n<p><b>Quel nombre ce programme affiche-t-il ?</b> C'est le nombre de cadeaux volés. Fais le calcul ligne par ligne.</p>\n<p class=\"note\">Deux symboles nouveaux : <code>//</code> est la <b>division entière</b> (on garde seulement la partie entière du résultat) et <code>%</code> est le <b>modulo</b> (le reste de la division).</p>",
  "python": {
   "label": "Labo Python — comprends les symboles « // » et « % »",
   "code": "print(17 / 5)      # la division normale\nprint(17 // 5)     # la division entière : combien de fois 5 « rentre » dans 17 ?\nprint(17 % 5)      # le modulo : ce qui reste après cette division\n\n# À toi d'essayer avec d'autres nombres :\nprint(20 // 6, 20 % 6)\nprint(100 // 7, 100 % 7)\nprint(9 // 3, 9 % 3)     # que se passe-t-il quand la division « tombe juste » ?"
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
  "puzzle": "<p>Le fichier <code>journal.txt</code> contient 3000 lignes, triées par heure. Chaque ligne a trois morceaux séparés par des espaces : l'<b>heure</b>, le <b>compte</b> et le <b>résultat</b> (<code>SUCCES</code> ou <code>ECHEC</code>). Voici les 6 premières lignes :</p>\n<pre class=\"code\">00:00:33 pere_noel_old SUCCES\n00:01:41 admin SUCCES\n00:01:45 pere_noel_2 SUCCES\n00:02:06 renne_gps SUCCES\n00:02:40 pere_noel SUCCES\n00:03:19 lutin_cuisine SUCCES\n…</pre>\n<p><b>Combien de connexions réussies (<code>SUCCES</code>) du compte exact « pere_noel » ont eu lieu entre 2 h 00 et 4 h 59 (inclus) ?</b></p>\n<p>📄 Le fichier : <a href=\"#\" class=\"dl\" data-file=\"journal.txt\">journal.txt</a> (clique dessus pour le télécharger et le regarder).</p>\n<p class=\"note\">Il est aussi déjà disponible dans le labo Python : ton programme doit le <b>lire lui-même</b> avec <code>open(\"journal.txt\")</code>. Attention aux pièges : « pere_noel_2 » et « pere_noel_old » sont d'autres comptes.</p>",
  "python": {
   "open": true,
   "label": "Labo Python — l'analyseur de journal (3 trous à remplir)",
   "files": {
    "journal.txt": "00:00:33 pere_noel_old SUCCES\n00:01:41 admin SUCCES\n00:01:45 pere_noel_2 SUCCES\n00:02:06 renne_gps SUCCES\n00:02:40 pere_noel SUCCES\n00:03:19 lutin_cuisine SUCCES\n00:03:39 pere_noel SUCCES\n00:03:47 pere_noel SUCCES\n00:04:02 pixel SUCCES\n00:04:09 pere_noel_old SUCCES\n00:04:34 admin SUCCES\n00:05:34 admin SUCCES\n00:06:53 pere_noel_2 SUCCES\n00:07:08 mere_noel SUCCES\n00:08:03 mere_noel SUCCES\n00:08:23 pere_noel_2 SUCCES\n00:09:03 pere_noel_2 SUCCES\n00:10:19 pere_noel_old SUCCES\n00:10:31 pere_noel_old SUCCES\n00:10:34 renne_gps ECHEC\n00:13:03 mere_noel SUCCES\n00:14:19 pere_noel SUCCES\n00:14:27 admin SUCCES\n00:14:29 lutin_cuisine SUCCES\n00:14:40 pere_noel_2 ECHEC\n00:14:48 pere_noel_old SUCCES\n00:15:03 pere_noel_2 SUCCES\n00:15:17 pere_noel ECHEC\n00:15:30 pere_noel_2 SUCCES\n00:15:35 pere_noel SUCCES\n00:16:12 pixel SUCCES\n00:16:38 mere_noel ECHEC\n00:16:57 admin SUCCES\n00:17:05 pere_noel SUCCES\n00:17:27 renne_gps SUCCES\n00:17:30 pere_noel_old ECHEC\n00:17:45 pixel ECHEC\n00:18:00 mere_noel SUCCES\n00:18:03 pere_noel SUCCES\n00:18:32 lutin_emballage ECHEC\n00:18:35 pixel SUCCES\n00:18:52 pixel SUCCES\n00:19:35 pere_noel SUCCES\n00:19:36 pere_noel_old ECHEC\n00:20:00 pixel SUCCES\n00:20:07 pere_noel_old ECHEC\n00:20:53 pixel SUCCES\n00:20:54 pere_noel_old SUCCES\n00:21:31 lutin_emballage ECHEC\n00:22:18 pere_noel_old SUCCES\n00:23:13 admin SUCCES\n00:24:21 pixel SUCCES\n00:24:41 lutin_cuisine ECHEC\n00:24:59 pere_noel_2 SUCCES\n00:25:29 renne_gps ECHEC\n00:26:20 pere_noel ECHEC\n00:26:23 pere_noel_old SUCCES\n00:27:04 pere_noel ECHEC\n00:27:22 lutin_cuisine ECHEC\n00:27:28 renne_gps SUCCES\n00:27:55 pere_noel_old SUCCES\n00:28:27 renne_gps ECHEC\n00:28:32 pere_noel SUCCES\n00:28:44 pere_noel ECHEC\n00:29:02 lutin_cuisine SUCCES\n00:29:07 admin SUCCES\n00:29:26 pere_noel SUCCES\n00:29:35 mere_noel SUCCES\n00:29:58 lutin_cuisine SUCCES\n00:30:52 pere_noel ECHEC\n00:31:06 pere_noel_2 SUCCES\n00:31:31 pixel SUCCES\n00:31:36 mere_noel SUCCES\n00:32:01 lutin_cuisine SUCCES\n00:32:44 renne_gps SUCCES\n00:33:41 mere_noel SUCCES\n00:34:41 pere_noel SUCCES\n00:35:17 pere_noel ECHEC\n00:36:12 pere_noel_2 SUCCES\n00:36:33 lutin_emballage ECHEC\n00:36:39 pere_noel_old ECHEC\n00:37:41 renne_gps SUCCES\n00:37:48 pere_noel_old ECHEC\n00:38:13 mere_noel ECHEC\n00:38:22 renne_gps ECHEC\n00:38:26 pere_noel_2 SUCCES\n00:38:28 pere_noel_2 SUCCES\n00:41:02 renne_gps SUCCES\n00:41:03 lutin_emballage SUCCES\n00:42:04 pere_noel ECHEC\n00:42:59 lutin_cuisine SUCCES\n00:43:50 pere_noel_2 ECHEC\n00:43:52 pere_noel SUCCES\n00:44:36 pere_noel_2 SUCCES\n00:45:25 pere_noel_old SUCCES\n00:45:30 lutin_emballage ECHEC\n00:45:44 admin SUCCES\n00:46:01 lutin_emballage SUCCES\n00:46:01 pere_noel_2 ECHEC\n00:46:17 lutin_cuisine SUCCES\n00:46:53 lutin_emballage SUCCES\n00:47:53 pere_noel SUCCES\n00:48:27 admin SUCCES\n00:49:51 renne_gps SUCCES\n00:50:08 lutin_emballage SUCCES\n00:50:40 pere_noel_2 ECHEC\n00:51:01 pixel SUCCES\n00:51:51 mere_noel SUCCES\n00:51:57 pere_noel_old SUCCES\n00:52:25 pere_noel SUCCES\n00:53:14 lutin_emballage SUCCES\n00:53:46 lutin_cuisine SUCCES\n00:54:01 pere_noel ECHEC\n00:54:59 pere_noel_old ECHEC\n00:55:05 pere_noel SUCCES\n00:56:04 pere_noel_old SUCCES\n00:57:28 pere_noel_old SUCCES\n00:58:35 pere_noel ECHEC\n00:58:45 lutin_emballage SUCCES\n00:59:09 mere_noel SUCCES\n00:59:28 mere_noel SUCCES\n01:00:10 pere_noel_old SUCCES\n01:00:38 pere_noel SUCCES\n01:01:43 pere_noel_old SUCCES\n01:02:21 admin SUCCES\n01:03:36 pixel SUCCES\n01:03:39 lutin_cuisine SUCCES\n01:03:48 mere_noel SUCCES\n01:04:19 admin SUCCES\n01:04:28 lutin_emballage ECHEC\n01:04:41 lutin_cuisine SUCCES\n01:06:26 pere_noel SUCCES\n01:07:17 mere_noel SUCCES\n01:08:55 pixel SUCCES\n01:10:31 lutin_emballage SUCCES\n01:10:36 admin SUCCES\n01:11:04 admin SUCCES\n01:11:23 pere_noel_old SUCCES\n01:11:44 mere_noel SUCCES\n01:11:51 admin ECHEC\n01:12:13 lutin_emballage SUCCES\n01:13:09 lutin_emballage SUCCES\n01:13:18 pixel SUCCES\n01:13:56 pixel SUCCES\n01:14:10 admin SUCCES\n01:14:33 pere_noel_old SUCCES\n01:14:35 lutin_emballage SUCCES\n01:14:39 renne_gps SUCCES\n01:14:43 pere_noel SUCCES\n01:14:52 pere_noel_2 SUCCES\n01:14:58 pere_noel_2 ECHEC\n01:15:15 pixel SUCCES\n01:15:32 admin SUCCES\n01:15:33 admin SUCCES\n01:16:24 pere_noel_old SUCCES\n01:16:33 lutin_emballage SUCCES\n01:17:28 pere_noel ECHEC\n01:19:03 pixel SUCCES\n01:19:55 pere_noel_2 SUCCES\n01:22:06 mere_noel ECHEC\n01:22:14 lutin_cuisine ECHEC\n01:22:32 lutin_cuisine SUCCES\n01:23:04 mere_noel ECHEC\n01:23:24 pixel ECHEC\n01:23:36 pere_noel SUCCES\n01:23:48 pere_noel SUCCES\n01:24:06 lutin_emballage SUCCES\n01:24:08 lutin_emballage SUCCES\n01:24:17 lutin_emballage ECHEC\n01:25:01 pere_noel SUCCES\n01:26:45 admin SUCCES\n01:27:58 renne_gps SUCCES\n01:28:04 pere_noel ECHEC\n01:28:08 lutin_emballage SUCCES\n01:28:37 pere_noel_2 ECHEC\n01:29:58 mere_noel SUCCES\n01:30:25 pere_noel SUCCES\n01:30:38 pere_noel SUCCES\n01:30:44 lutin_cuisine SUCCES\n01:31:03 pere_noel_2 ECHEC\n01:31:20 renne_gps SUCCES\n01:31:39 pere_noel SUCCES\n01:31:46 mere_noel SUCCES\n01:32:39 admin SUCCES\n01:32:46 pere_noel_2 SUCCES\n01:33:10 admin SUCCES\n01:33:29 pere_noel ECHEC\n01:33:42 pere_noel ECHEC\n01:34:02 lutin_emballage SUCCES\n01:34:11 renne_gps SUCCES\n01:34:20 pere_noel_old SUCCES\n01:34:38 pere_noel SUCCES\n01:34:45 renne_gps ECHEC\n01:35:19 lutin_emballage SUCCES\n01:35:45 pere_noel_old SUCCES\n01:38:03 renne_gps SUCCES\n01:39:11 mere_noel SUCCES\n01:39:24 renne_gps SUCCES\n01:39:28 pere_noel SUCCES\n01:39:56 pere_noel_2 SUCCES\n01:40:42 lutin_emballage SUCCES\n01:41:16 pere_noel_2 SUCCES\n01:41:18 lutin_cuisine SUCCES\n01:41:28 pere_noel_2 SUCCES\n01:41:35 renne_gps SUCCES\n01:41:36 pere_noel_old SUCCES\n01:41:41 lutin_emballage ECHEC\n01:42:46 lutin_cuisine SUCCES\n01:44:25 pere_noel_old SUCCES\n01:45:00 lutin_emballage ECHEC\n01:45:10 pere_noel_old SUCCES\n01:45:57 pere_noel SUCCES\n01:46:14 lutin_emballage SUCCES\n01:46:30 renne_gps SUCCES\n01:47:57 admin SUCCES\n01:48:23 pere_noel_2 SUCCES\n01:48:32 lutin_cuisine ECHEC\n01:48:45 pixel SUCCES\n01:48:51 mere_noel ECHEC\n01:49:23 lutin_emballage SUCCES\n01:50:56 mere_noel ECHEC\n01:50:59 pere_noel SUCCES\n01:51:47 pere_noel_2 SUCCES\n01:52:09 mere_noel SUCCES\n01:52:28 lutin_cuisine SUCCES\n01:52:33 lutin_emballage SUCCES\n01:53:08 renne_gps ECHEC\n01:53:21 admin SUCCES\n01:53:25 pere_noel SUCCES\n01:53:42 pixel SUCCES\n01:54:34 pixel SUCCES\n01:54:55 admin SUCCES\n01:55:25 pere_noel_2 SUCCES\n01:55:40 admin SUCCES\n01:56:04 admin SUCCES\n01:56:38 pere_noel_2 SUCCES\n01:56:44 pere_noel SUCCES\n01:57:00 renne_gps SUCCES\n01:57:40 pixel ECHEC\n01:57:58 pere_noel SUCCES\n01:58:29 admin ECHEC\n01:58:45 lutin_emballage SUCCES\n01:58:52 lutin_emballage SUCCES\n01:59:05 mere_noel ECHEC\n02:00:22 lutin_emballage SUCCES\n02:00:53 pere_noel ECHEC\n02:01:27 pere_noel SUCCES\n02:01:33 renne_gps ECHEC\n02:01:53 lutin_cuisine SUCCES\n02:01:59 lutin_emballage ECHEC\n02:02:50 pere_noel SUCCES\n02:03:34 pere_noel_old SUCCES\n02:03:38 pere_noel_old SUCCES\n02:03:49 pere_noel_2 SUCCES\n02:04:07 lutin_cuisine SUCCES\n02:04:13 pere_noel_2 SUCCES\n02:04:39 pixel SUCCES\n02:05:03 mere_noel SUCCES\n02:05:28 pere_noel SUCCES\n02:05:34 renne_gps ECHEC\n02:05:42 pere_noel_old ECHEC\n02:06:43 pere_noel ECHEC\n02:06:55 mere_noel SUCCES\n02:07:10 pixel SUCCES\n02:07:35 pixel SUCCES\n02:07:37 lutin_cuisine SUCCES\n02:07:55 mere_noel SUCCES\n02:08:06 admin SUCCES\n02:08:36 pere_noel ECHEC\n02:08:54 pixel SUCCES\n02:09:41 pere_noel_old SUCCES\n02:09:42 lutin_cuisine SUCCES\n02:09:56 admin SUCCES\n02:10:43 pere_noel SUCCES\n02:11:12 pere_noel_old SUCCES\n02:11:32 pere_noel SUCCES\n02:11:48 lutin_emballage SUCCES\n02:12:34 pere_noel SUCCES\n02:12:36 admin ECHEC\n02:12:38 admin SUCCES\n02:12:39 pere_noel_old SUCCES\n02:12:52 pixel SUCCES\n02:12:58 pixel SUCCES\n02:14:05 lutin_emballage ECHEC\n02:14:55 lutin_cuisine SUCCES\n02:15:27 pixel SUCCES\n02:16:18 renne_gps SUCCES\n02:17:23 admin SUCCES\n02:17:32 pere_noel_old SUCCES\n02:18:09 pere_noel SUCCES\n02:18:21 pere_noel_old SUCCES\n02:18:57 mere_noel SUCCES\n02:19:34 renne_gps SUCCES\n02:20:51 pixel ECHEC\n02:22:19 mere_noel SUCCES\n02:22:21 lutin_emballage SUCCES\n02:22:27 pere_noel_2 SUCCES\n02:22:50 pere_noel_old SUCCES\n02:22:55 pere_noel_old SUCCES\n02:22:57 lutin_cuisine SUCCES\n02:23:37 mere_noel ECHEC\n02:24:56 lutin_cuisine SUCCES\n02:25:02 pere_noel SUCCES\n02:25:30 pere_noel ECHEC\n02:25:42 pere_noel_2 ECHEC\n02:25:43 pere_noel SUCCES\n02:26:23 pixel SUCCES\n02:26:28 pere_noel_2 SUCCES\n02:27:42 lutin_cuisine SUCCES\n02:27:54 mere_noel ECHEC\n02:27:56 pere_noel ECHEC\n02:28:45 lutin_emballage SUCCES\n02:28:47 pere_noel SUCCES\n02:28:54 pere_noel SUCCES\n02:31:24 admin SUCCES\n02:31:57 lutin_cuisine SUCCES\n02:32:03 pixel SUCCES\n02:32:07 lutin_cuisine SUCCES\n02:32:13 lutin_emballage SUCCES\n02:32:17 admin SUCCES\n02:32:42 pere_noel_old SUCCES\n02:32:48 renne_gps ECHEC\n02:33:39 lutin_emballage SUCCES\n02:34:05 pere_noel SUCCES\n02:34:13 pere_noel_old ECHEC\n02:34:23 lutin_cuisine SUCCES\n02:34:31 lutin_cuisine SUCCES\n02:34:45 mere_noel SUCCES\n02:34:49 pere_noel SUCCES\n02:34:54 pere_noel ECHEC\n02:35:38 lutin_emballage SUCCES\n02:35:43 lutin_emballage SUCCES\n02:36:30 lutin_emballage SUCCES\n02:36:43 pere_noel_2 SUCCES\n02:37:21 lutin_emballage SUCCES\n02:37:23 lutin_emballage SUCCES\n02:37:46 mere_noel SUCCES\n02:37:52 lutin_emballage ECHEC\n02:38:18 mere_noel ECHEC\n02:38:38 admin SUCCES\n02:39:14 mere_noel SUCCES\n02:39:30 pere_noel_2 SUCCES\n02:39:49 pixel SUCCES\n02:39:59 renne_gps SUCCES\n02:41:26 admin SUCCES\n02:41:26 mere_noel ECHEC\n02:41:32 pere_noel ECHEC\n02:41:37 pere_noel_2 SUCCES\n02:41:48 pere_noel_old SUCCES\n02:41:52 pixel SUCCES\n02:42:39 renne_gps SUCCES\n02:43:01 lutin_cuisine SUCCES\n02:43:15 pere_noel_old SUCCES\n02:43:25 lutin_cuisine SUCCES\n02:43:34 mere_noel SUCCES\n02:45:04 pere_noel_old SUCCES\n02:46:54 pere_noel ECHEC\n02:48:00 pere_noel ECHEC\n02:49:41 pixel SUCCES\n02:50:15 lutin_cuisine SUCCES\n02:50:55 pere_noel_2 SUCCES\n02:51:52 pixel ECHEC\n02:51:58 pere_noel SUCCES\n02:53:46 lutin_cuisine ECHEC\n02:53:59 pere_noel SUCCES\n02:54:44 pixel SUCCES\n02:54:46 lutin_emballage SUCCES\n02:54:58 pere_noel_2 SUCCES\n02:55:15 mere_noel SUCCES\n02:55:28 admin SUCCES\n02:55:30 lutin_cuisine SUCCES\n02:55:45 lutin_emballage SUCCES\n02:56:27 renne_gps SUCCES\n02:56:44 pere_noel SUCCES\n02:57:08 pere_noel SUCCES\n02:57:12 pere_noel SUCCES\n02:57:21 mere_noel SUCCES\n02:57:22 lutin_cuisine SUCCES\n02:57:47 admin SUCCES\n02:58:06 pere_noel SUCCES\n02:58:10 admin SUCCES\n02:58:45 pere_noel SUCCES\n02:58:46 lutin_cuisine SUCCES\n02:59:20 pere_noel SUCCES\n02:59:43 pere_noel_old SUCCES\n02:59:46 pere_noel SUCCES\n03:00:24 pixel SUCCES\n03:00:26 lutin_cuisine SUCCES\n03:00:34 pere_noel SUCCES\n03:00:42 admin SUCCES\n03:00:50 lutin_emballage SUCCES\n03:00:55 pere_noel SUCCES\n03:01:06 pere_noel SUCCES\n03:02:14 admin SUCCES\n03:02:19 admin SUCCES\n03:02:47 lutin_emballage ECHEC\n03:03:06 pere_noel SUCCES\n03:04:15 pere_noel_2 SUCCES\n03:05:46 admin SUCCES\n03:05:46 renne_gps SUCCES\n03:06:41 lutin_emballage SUCCES\n03:06:41 renne_gps SUCCES\n03:07:12 mere_noel SUCCES\n03:07:18 pere_noel_old SUCCES\n03:07:34 pere_noel SUCCES\n03:08:16 pere_noel_old SUCCES\n03:09:16 pere_noel SUCCES\n03:09:46 lutin_emballage SUCCES\n03:09:49 pere_noel ECHEC\n03:10:34 pere_noel SUCCES\n03:12:09 renne_gps SUCCES\n03:13:08 pere_noel SUCCES\n03:13:12 pixel SUCCES\n03:13:45 pere_noel_old SUCCES\n03:14:06 pere_noel SUCCES\n03:14:22 mere_noel ECHEC\n03:15:10 pere_noel ECHEC\n03:15:31 admin SUCCES\n03:16:00 pixel SUCCES\n03:17:16 pixel SUCCES\n03:17:39 renne_gps ECHEC\n03:17:43 pere_noel_2 SUCCES\n03:18:16 pere_noel SUCCES\n03:18:51 pixel SUCCES\n03:19:52 renne_gps SUCCES\n03:21:09 pere_noel_old SUCCES\n03:21:34 pere_noel SUCCES\n03:21:53 lutin_cuisine ECHEC\n03:22:19 mere_noel SUCCES\n03:22:52 lutin_cuisine ECHEC\n03:23:22 lutin_cuisine ECHEC\n03:23:28 pere_noel_2 SUCCES\n03:23:40 lutin_emballage SUCCES\n03:23:54 pere_noel SUCCES\n03:24:23 lutin_cuisine SUCCES\n03:26:38 lutin_emballage SUCCES\n03:27:00 renne_gps ECHEC\n03:27:39 pere_noel_2 SUCCES\n03:27:39 renne_gps SUCCES\n03:27:51 pere_noel SUCCES\n03:28:51 pere_noel SUCCES\n03:29:09 admin SUCCES\n03:29:55 pixel SUCCES\n03:30:00 pixel SUCCES\n03:31:08 pixel SUCCES\n03:31:41 pere_noel SUCCES\n03:32:06 pere_noel SUCCES\n03:32:54 admin SUCCES\n03:32:58 admin SUCCES\n03:33:27 pere_noel_2 ECHEC\n03:34:19 pere_noel SUCCES\n03:36:14 pixel SUCCES\n03:36:17 pere_noel_old ECHEC\n03:36:26 lutin_cuisine SUCCES\n03:36:46 pere_noel SUCCES\n03:37:01 pixel SUCCES\n03:37:02 pere_noel_2 ECHEC\n03:38:09 pixel SUCCES\n03:38:42 pere_noel_2 SUCCES\n03:39:14 lutin_emballage SUCCES\n03:39:34 admin SUCCES\n03:39:57 pixel SUCCES\n03:40:06 pere_noel_2 SUCCES\n03:40:19 pere_noel_old SUCCES\n03:40:38 renne_gps SUCCES\n03:41:30 mere_noel ECHEC\n03:42:07 pixel SUCCES\n03:42:27 mere_noel ECHEC\n03:42:42 pixel SUCCES\n03:43:01 pere_noel_old SUCCES\n03:43:05 mere_noel SUCCES\n03:43:55 lutin_cuisine SUCCES\n03:44:11 pere_noel SUCCES\n03:45:39 admin SUCCES\n03:45:54 pere_noel SUCCES\n03:46:07 renne_gps SUCCES\n03:47:16 pere_noel_2 SUCCES\n03:48:44 pere_noel SUCCES\n03:48:53 lutin_cuisine SUCCES\n03:48:57 pere_noel_2 SUCCES\n03:49:01 renne_gps ECHEC\n03:51:10 pere_noel_old SUCCES\n03:52:21 pixel SUCCES\n03:52:35 lutin_emballage SUCCES\n03:53:14 mere_noel SUCCES\n03:53:20 pere_noel SUCCES\n03:53:41 pere_noel_old ECHEC\n03:54:03 pere_noel SUCCES\n03:54:11 mere_noel SUCCES\n03:54:24 mere_noel SUCCES\n03:54:51 lutin_emballage SUCCES\n03:55:05 pixel ECHEC\n03:55:54 mere_noel SUCCES\n03:56:24 renne_gps SUCCES\n03:56:26 lutin_cuisine SUCCES\n03:56:56 admin SUCCES\n03:57:00 pere_noel SUCCES\n03:57:12 mere_noel ECHEC\n03:57:26 mere_noel SUCCES\n03:57:52 mere_noel SUCCES\n03:58:00 pere_noel SUCCES\n03:58:58 pere_noel SUCCES\n04:00:50 admin SUCCES\n04:00:52 lutin_cuisine SUCCES\n04:01:02 pere_noel_2 ECHEC\n04:01:16 pere_noel SUCCES\n04:01:44 pere_noel_old SUCCES\n04:02:05 admin SUCCES\n04:02:57 pere_noel SUCCES\n04:03:25 pere_noel_old SUCCES\n04:03:31 pere_noel SUCCES\n04:03:34 mere_noel SUCCES\n04:03:38 pere_noel ECHEC\n04:03:43 pere_noel SUCCES\n04:03:45 pere_noel_2 SUCCES\n04:03:51 pere_noel_old SUCCES\n04:03:56 renne_gps ECHEC\n04:04:38 pere_noel_2 SUCCES\n04:06:15 lutin_cuisine SUCCES\n04:06:16 renne_gps SUCCES\n04:06:38 pere_noel SUCCES\n04:06:50 mere_noel SUCCES\n04:06:58 lutin_cuisine ECHEC\n04:07:21 lutin_cuisine SUCCES\n04:08:20 lutin_cuisine SUCCES\n04:08:31 mere_noel ECHEC\n04:08:48 pixel SUCCES\n04:09:11 lutin_cuisine ECHEC\n04:09:20 mere_noel SUCCES\n04:09:55 pere_noel ECHEC\n04:10:18 mere_noel SUCCES\n04:10:21 pere_noel_2 SUCCES\n04:11:11 lutin_emballage ECHEC\n04:11:11 pere_noel_2 SUCCES\n04:11:38 pere_noel_2 SUCCES\n04:12:39 pere_noel ECHEC\n04:13:32 pere_noel SUCCES\n04:14:09 pere_noel SUCCES\n04:14:19 lutin_emballage SUCCES\n04:14:49 lutin_emballage ECHEC\n04:15:22 renne_gps SUCCES\n04:15:43 renne_gps ECHEC\n04:15:53 pere_noel_old SUCCES\n04:16:46 pere_noel_old SUCCES\n04:17:14 pere_noel ECHEC\n04:17:18 admin SUCCES\n04:17:25 lutin_emballage SUCCES\n04:17:51 pere_noel ECHEC\n04:19:19 pere_noel ECHEC\n04:19:38 pere_noel_old SUCCES\n04:20:30 pixel SUCCES\n04:20:34 pere_noel SUCCES\n04:20:58 admin ECHEC\n04:21:13 admin SUCCES\n04:22:04 pixel SUCCES\n04:22:08 pere_noel SUCCES\n04:22:36 renne_gps SUCCES\n04:22:39 pere_noel SUCCES\n04:23:14 pere_noel_2 SUCCES\n04:23:35 pixel SUCCES\n04:23:42 mere_noel SUCCES\n04:25:04 pere_noel_old SUCCES\n04:25:16 renne_gps SUCCES\n04:25:35 lutin_cuisine ECHEC\n04:25:52 pere_noel_2 ECHEC\n04:26:07 renne_gps ECHEC\n04:26:49 lutin_emballage SUCCES\n04:27:12 admin SUCCES\n04:27:49 lutin_cuisine SUCCES\n04:28:05 lutin_cuisine ECHEC\n04:29:56 admin ECHEC\n04:30:22 mere_noel SUCCES\n04:31:13 lutin_cuisine SUCCES\n04:31:13 mere_noel SUCCES\n04:31:56 pere_noel SUCCES\n04:32:06 pere_noel ECHEC\n04:33:18 admin SUCCES\n04:33:44 lutin_cuisine SUCCES\n04:34:09 mere_noel SUCCES\n04:34:32 pere_noel ECHEC\n04:35:12 pere_noel_old SUCCES\n04:35:25 pere_noel ECHEC\n04:36:26 lutin_cuisine SUCCES\n04:36:29 lutin_cuisine SUCCES\n04:36:34 pere_noel_2 ECHEC\n04:38:09 renne_gps SUCCES\n04:38:26 lutin_emballage SUCCES\n04:38:26 pere_noel_old SUCCES\n04:38:38 lutin_cuisine ECHEC\n04:39:02 pere_noel_old SUCCES\n04:39:23 pere_noel_2 SUCCES\n04:39:49 pere_noel SUCCES\n04:40:31 renne_gps SUCCES\n04:42:07 mere_noel SUCCES\n04:42:33 pere_noel SUCCES\n04:43:05 lutin_cuisine SUCCES\n04:43:06 pere_noel_2 SUCCES\n04:43:21 lutin_cuisine SUCCES\n04:43:25 pere_noel SUCCES\n04:43:26 admin SUCCES\n04:43:43 lutin_emballage SUCCES\n04:43:52 lutin_cuisine ECHEC\n04:43:59 renne_gps SUCCES\n04:44:25 pere_noel SUCCES\n04:46:36 pere_noel SUCCES\n04:46:49 pere_noel_old SUCCES\n04:47:07 mere_noel SUCCES\n04:48:22 pere_noel SUCCES\n04:48:38 lutin_cuisine SUCCES\n04:48:48 pixel SUCCES\n04:48:53 admin SUCCES\n04:48:53 pere_noel_2 SUCCES\n04:48:58 pere_noel ECHEC\n04:49:01 pere_noel_old SUCCES\n04:49:20 mere_noel SUCCES\n04:50:34 renne_gps SUCCES\n04:50:38 lutin_emballage ECHEC\n04:51:30 pere_noel SUCCES\n04:51:44 admin SUCCES\n04:51:45 pere_noel_2 SUCCES\n04:52:04 pere_noel SUCCES\n04:52:22 pere_noel_2 ECHEC\n04:52:43 mere_noel SUCCES\n04:53:12 pere_noel_2 SUCCES\n04:53:20 renne_gps ECHEC\n04:53:28 pere_noel_old ECHEC\n04:54:10 mere_noel ECHEC\n04:55:12 lutin_cuisine SUCCES\n04:55:28 admin SUCCES\n04:56:32 renne_gps SUCCES\n04:57:07 renne_gps SUCCES\n04:57:54 lutin_emballage SUCCES\n04:58:19 mere_noel SUCCES\n04:58:45 pixel ECHEC\n04:58:54 pixel ECHEC\n04:59:17 pixel ECHEC\n04:59:40 lutin_cuisine ECHEC\n05:00:38 pere_noel_2 ECHEC\n05:00:41 lutin_emballage SUCCES\n05:00:53 pere_noel_old ECHEC\n05:00:56 lutin_emballage ECHEC\n05:01:01 pere_noel SUCCES\n05:01:10 lutin_emballage SUCCES\n05:01:46 pere_noel ECHEC\n05:01:58 renne_gps SUCCES\n05:02:35 lutin_cuisine SUCCES\n05:03:28 lutin_cuisine SUCCES\n05:04:42 pere_noel ECHEC\n05:05:41 lutin_cuisine SUCCES\n05:06:09 mere_noel SUCCES\n05:06:13 pere_noel SUCCES\n05:06:38 mere_noel SUCCES\n05:06:41 lutin_emballage ECHEC\n05:06:54 pere_noel_old SUCCES\n05:07:34 renne_gps SUCCES\n05:08:18 mere_noel SUCCES\n05:08:34 pere_noel ECHEC\n05:08:39 lutin_cuisine SUCCES\n05:08:42 pere_noel_2 ECHEC\n05:08:53 pere_noel SUCCES\n05:08:54 pere_noel_2 ECHEC\n05:09:51 mere_noel SUCCES\n05:10:05 pixel SUCCES\n05:10:27 pixel SUCCES\n05:11:40 pixel SUCCES\n05:12:15 pere_noel SUCCES\n05:12:39 lutin_cuisine ECHEC\n05:13:04 pixel ECHEC\n05:15:45 lutin_cuisine SUCCES\n05:16:06 pere_noel_old SUCCES\n05:17:08 pere_noel SUCCES\n05:18:11 renne_gps ECHEC\n05:20:33 pere_noel ECHEC\n05:20:50 admin SUCCES\n05:21:15 mere_noel SUCCES\n05:21:21 lutin_cuisine SUCCES\n05:21:26 renne_gps ECHEC\n05:22:25 pere_noel SUCCES\n05:22:30 lutin_emballage ECHEC\n05:23:03 pere_noel_2 SUCCES\n05:23:06 lutin_emballage SUCCES\n05:23:20 mere_noel SUCCES\n05:25:12 renne_gps SUCCES\n05:25:36 pere_noel SUCCES\n05:26:54 admin SUCCES\n05:28:05 pere_noel SUCCES\n05:28:46 renne_gps ECHEC\n05:28:48 admin SUCCES\n05:29:21 mere_noel SUCCES\n05:29:37 renne_gps ECHEC\n05:29:49 lutin_emballage SUCCES\n05:29:58 pixel ECHEC\n05:30:02 lutin_cuisine SUCCES\n05:30:03 mere_noel SUCCES\n05:30:55 pere_noel_2 ECHEC\n05:31:48 pixel SUCCES\n05:32:36 pere_noel_old SUCCES\n05:32:37 lutin_emballage SUCCES\n05:32:48 pere_noel SUCCES\n05:32:49 pere_noel SUCCES\n05:32:50 admin SUCCES\n05:33:18 renne_gps SUCCES\n05:33:29 pere_noel ECHEC\n05:33:44 lutin_emballage ECHEC\n05:33:45 pere_noel_2 SUCCES\n05:33:49 renne_gps SUCCES\n05:34:44 pixel ECHEC\n05:35:23 pixel SUCCES\n05:35:47 renne_gps ECHEC\n05:35:55 pere_noel ECHEC\n05:36:00 pere_noel ECHEC\n05:36:53 lutin_cuisine SUCCES\n05:37:17 renne_gps SUCCES\n05:38:01 pixel SUCCES\n05:39:23 pere_noel_2 SUCCES\n05:39:30 lutin_emballage SUCCES\n05:39:32 mere_noel SUCCES\n05:40:13 lutin_cuisine SUCCES\n05:40:56 admin SUCCES\n05:41:10 pere_noel SUCCES\n05:41:48 pixel SUCCES\n05:41:52 pere_noel_2 ECHEC\n05:41:53 lutin_cuisine ECHEC\n05:43:12 lutin_emballage SUCCES\n05:43:18 pere_noel_old SUCCES\n05:43:40 pere_noel_2 SUCCES\n05:44:13 renne_gps ECHEC\n05:44:14 pere_noel_old SUCCES\n05:44:19 lutin_cuisine SUCCES\n05:45:36 pere_noel_old SUCCES\n05:46:09 pere_noel_old SUCCES\n05:46:39 pere_noel ECHEC\n05:47:19 lutin_emballage SUCCES\n05:47:19 mere_noel SUCCES\n05:47:28 renne_gps ECHEC\n05:48:00 pere_noel_old SUCCES\n05:48:34 renne_gps SUCCES\n05:48:43 pere_noel SUCCES\n05:49:35 pere_noel_old SUCCES\n05:50:06 pere_noel_old ECHEC\n05:51:26 renne_gps SUCCES\n05:51:40 pere_noel ECHEC\n05:52:08 admin ECHEC\n05:52:44 admin ECHEC\n05:53:51 pere_noel_2 ECHEC\n05:54:22 pere_noel_2 ECHEC\n05:54:47 lutin_emballage ECHEC\n05:54:50 lutin_cuisine SUCCES\n05:55:44 renne_gps SUCCES\n05:56:06 lutin_cuisine SUCCES\n05:56:35 admin ECHEC\n05:56:49 pere_noel_old SUCCES\n05:57:07 pere_noel_2 SUCCES\n05:57:28 pere_noel SUCCES\n05:58:19 lutin_emballage SUCCES\n05:59:33 pere_noel SUCCES\n05:59:36 pere_noel_2 SUCCES\n05:59:43 lutin_emballage ECHEC\n06:00:43 pere_noel SUCCES\n06:00:53 admin SUCCES\n06:00:53 pere_noel SUCCES\n06:01:05 pere_noel_2 SUCCES\n06:01:54 mere_noel SUCCES\n06:02:15 pere_noel ECHEC\n06:02:23 pere_noel_2 SUCCES\n06:03:23 pere_noel_old ECHEC\n06:03:27 pixel ECHEC\n06:04:40 pere_noel SUCCES\n06:05:11 pere_noel_2 SUCCES\n06:05:25 pixel SUCCES\n06:06:10 pere_noel SUCCES\n06:06:51 lutin_cuisine SUCCES\n06:06:57 pere_noel SUCCES\n06:07:41 admin ECHEC\n06:07:49 pere_noel SUCCES\n06:09:00 lutin_cuisine ECHEC\n06:09:39 pere_noel SUCCES\n06:11:57 admin SUCCES\n06:13:29 mere_noel ECHEC\n06:13:48 renne_gps ECHEC\n06:15:09 pixel SUCCES\n06:15:47 pere_noel_2 SUCCES\n06:15:50 pixel SUCCES\n06:16:23 renne_gps ECHEC\n06:16:31 pere_noel_2 SUCCES\n06:16:51 pere_noel_old ECHEC\n06:18:53 pere_noel_2 SUCCES\n06:19:20 renne_gps SUCCES\n06:20:55 pixel ECHEC\n06:21:02 lutin_emballage SUCCES\n06:21:23 pere_noel ECHEC\n06:22:41 lutin_emballage ECHEC\n06:22:54 renne_gps SUCCES\n06:23:05 pere_noel SUCCES\n06:23:32 pere_noel_2 ECHEC\n06:27:26 admin SUCCES\n06:27:30 mere_noel SUCCES\n06:27:53 pere_noel_old SUCCES\n06:29:50 pere_noel SUCCES\n06:30:04 pere_noel ECHEC\n06:31:28 admin SUCCES\n06:32:03 lutin_cuisine SUCCES\n06:32:04 pixel SUCCES\n06:32:18 mere_noel ECHEC\n06:33:35 pere_noel_2 SUCCES\n06:33:44 admin ECHEC\n06:35:07 pere_noel SUCCES\n06:35:37 lutin_cuisine SUCCES\n06:35:41 pere_noel_old ECHEC\n06:35:58 pere_noel ECHEC\n06:36:23 renne_gps SUCCES\n06:36:37 mere_noel ECHEC\n06:37:41 lutin_cuisine SUCCES\n06:38:48 mere_noel ECHEC\n06:39:02 pere_noel_2 SUCCES\n06:39:11 pere_noel_2 SUCCES\n06:39:21 mere_noel ECHEC\n06:41:37 pere_noel SUCCES\n06:41:52 admin SUCCES\n06:42:15 renne_gps SUCCES\n06:42:34 admin SUCCES\n06:42:44 pere_noel_2 SUCCES\n06:43:14 admin ECHEC\n06:44:55 mere_noel SUCCES\n06:45:34 pere_noel SUCCES\n06:46:51 pixel SUCCES\n06:47:01 lutin_emballage SUCCES\n06:47:44 lutin_emballage SUCCES\n06:48:17 lutin_cuisine SUCCES\n06:50:16 lutin_emballage ECHEC\n06:50:30 pere_noel SUCCES\n06:50:34 pere_noel SUCCES\n06:51:44 renne_gps SUCCES\n06:52:08 pere_noel_old SUCCES\n06:52:19 renne_gps SUCCES\n06:52:46 lutin_cuisine SUCCES\n06:53:16 pere_noel_old SUCCES\n06:53:41 pere_noel_2 SUCCES\n06:53:55 pere_noel SUCCES\n06:55:28 pere_noel_2 SUCCES\n06:55:37 renne_gps SUCCES\n06:55:45 pere_noel ECHEC\n06:56:43 lutin_emballage SUCCES\n06:56:51 renne_gps ECHEC\n06:57:02 renne_gps SUCCES\n06:57:10 renne_gps ECHEC\n06:57:50 admin SUCCES\n06:57:53 pixel SUCCES\n06:58:07 mere_noel SUCCES\n06:58:29 lutin_emballage ECHEC\n06:58:43 pere_noel_old SUCCES\n06:59:34 admin SUCCES\n07:00:50 mere_noel ECHEC\n07:01:08 lutin_cuisine SUCCES\n07:01:12 pixel ECHEC\n07:01:20 lutin_emballage SUCCES\n07:01:33 mere_noel SUCCES\n07:02:18 pixel SUCCES\n07:03:20 pere_noel SUCCES\n07:03:22 mere_noel SUCCES\n07:04:21 pere_noel ECHEC\n07:05:53 renne_gps ECHEC\n07:06:02 renne_gps SUCCES\n07:06:14 pixel SUCCES\n07:06:19 pixel ECHEC\n07:06:59 pixel ECHEC\n07:07:05 admin SUCCES\n07:07:06 pixel SUCCES\n07:08:16 admin SUCCES\n07:08:39 pere_noel SUCCES\n07:09:43 pere_noel_2 SUCCES\n07:10:03 lutin_cuisine SUCCES\n07:10:08 pere_noel_2 ECHEC\n07:10:49 pere_noel SUCCES\n07:11:12 renne_gps ECHEC\n07:11:37 pere_noel SUCCES\n07:13:44 pixel ECHEC\n07:14:02 admin SUCCES\n07:14:14 lutin_emballage SUCCES\n07:16:52 pere_noel_2 SUCCES\n07:17:16 pere_noel_old ECHEC\n07:17:41 mere_noel SUCCES\n07:17:53 admin SUCCES\n07:17:57 pere_noel_old SUCCES\n07:18:32 pere_noel_2 SUCCES\n07:18:43 pixel SUCCES\n07:19:15 lutin_emballage ECHEC\n07:19:38 pixel ECHEC\n07:20:15 pere_noel_2 SUCCES\n07:20:25 pere_noel ECHEC\n07:20:30 renne_gps ECHEC\n07:20:35 admin SUCCES\n07:20:38 renne_gps ECHEC\n07:20:40 renne_gps ECHEC\n07:21:07 pere_noel_old SUCCES\n07:21:54 pixel ECHEC\n07:22:14 pere_noel_old SUCCES\n07:22:57 lutin_emballage SUCCES\n07:23:10 pere_noel_2 ECHEC\n07:23:16 admin SUCCES\n07:23:24 pixel SUCCES\n07:24:20 admin ECHEC\n07:24:34 pere_noel_2 SUCCES\n07:25:11 pere_noel_2 SUCCES\n07:25:17 lutin_cuisine SUCCES\n07:25:20 pere_noel SUCCES\n07:25:28 lutin_cuisine ECHEC\n07:26:10 renne_gps ECHEC\n07:26:53 pere_noel SUCCES\n07:27:41 pere_noel SUCCES\n07:27:58 admin ECHEC\n07:27:59 pere_noel SUCCES\n07:28:04 pixel SUCCES\n07:29:15 pere_noel_2 SUCCES\n07:29:29 pere_noel_2 SUCCES\n07:29:53 pere_noel ECHEC\n07:30:21 pere_noel SUCCES\n07:32:41 pere_noel_old SUCCES\n07:32:46 mere_noel ECHEC\n07:33:25 mere_noel SUCCES\n07:33:28 pere_noel_old ECHEC\n07:34:10 pere_noel_old SUCCES\n07:34:13 pere_noel SUCCES\n07:34:17 pere_noel_2 ECHEC\n07:34:21 pere_noel_old SUCCES\n07:34:49 pere_noel SUCCES\n07:36:08 pere_noel_2 ECHEC\n07:36:15 lutin_cuisine SUCCES\n07:36:23 lutin_cuisine SUCCES\n07:37:31 pixel ECHEC\n07:38:28 admin SUCCES\n07:39:21 pixel ECHEC\n07:39:33 pere_noel SUCCES\n07:40:36 pere_noel_old SUCCES\n07:40:41 pere_noel ECHEC\n07:40:55 pere_noel_old SUCCES\n07:40:56 mere_noel SUCCES\n07:42:44 pere_noel SUCCES\n07:42:54 pere_noel_old ECHEC\n07:43:16 lutin_emballage SUCCES\n07:44:08 renne_gps ECHEC\n07:44:10 mere_noel ECHEC\n07:44:35 pixel ECHEC\n07:44:48 pere_noel ECHEC\n07:45:04 admin SUCCES\n07:45:46 lutin_emballage SUCCES\n07:46:03 lutin_cuisine SUCCES\n07:46:19 lutin_cuisine SUCCES\n07:46:48 pixel SUCCES\n07:46:51 lutin_cuisine SUCCES\n07:46:58 pere_noel_2 SUCCES\n07:47:20 pere_noel SUCCES\n07:47:26 pere_noel_old SUCCES\n07:47:30 mere_noel SUCCES\n07:47:33 lutin_emballage ECHEC\n07:48:09 pixel SUCCES\n07:48:13 mere_noel ECHEC\n07:49:23 renne_gps SUCCES\n07:50:51 lutin_cuisine SUCCES\n07:51:19 pere_noel_old SUCCES\n07:51:27 lutin_cuisine SUCCES\n07:51:31 admin SUCCES\n07:51:35 lutin_emballage SUCCES\n07:51:41 renne_gps SUCCES\n07:52:22 mere_noel ECHEC\n07:52:33 lutin_cuisine SUCCES\n07:52:34 renne_gps ECHEC\n07:53:34 admin SUCCES\n07:54:37 lutin_emballage ECHEC\n07:54:44 mere_noel SUCCES\n07:55:04 renne_gps SUCCES\n07:55:14 pere_noel_old ECHEC\n07:55:36 admin ECHEC\n07:56:28 renne_gps SUCCES\n07:57:00 pere_noel_2 SUCCES\n07:57:03 admin ECHEC\n07:57:22 lutin_cuisine SUCCES\n07:57:52 pere_noel_2 SUCCES\n07:58:12 lutin_emballage SUCCES\n07:58:13 pere_noel_old SUCCES\n07:58:28 mere_noel SUCCES\n07:59:09 admin SUCCES\n07:59:41 pere_noel SUCCES\n08:00:54 lutin_emballage SUCCES\n08:01:58 pixel ECHEC\n08:02:12 pere_noel ECHEC\n08:02:41 lutin_emballage ECHEC\n08:02:49 admin ECHEC\n08:04:08 lutin_cuisine SUCCES\n08:04:17 lutin_cuisine SUCCES\n08:04:56 mere_noel SUCCES\n08:05:03 pixel SUCCES\n08:06:04 mere_noel ECHEC\n08:06:09 lutin_cuisine SUCCES\n08:06:11 pixel SUCCES\n08:06:38 pixel SUCCES\n08:06:44 lutin_cuisine SUCCES\n08:07:17 renne_gps SUCCES\n08:07:43 lutin_emballage SUCCES\n08:08:38 mere_noel SUCCES\n08:08:42 lutin_cuisine SUCCES\n08:08:43 mere_noel SUCCES\n08:08:59 lutin_emballage ECHEC\n08:09:52 pixel SUCCES\n08:10:25 lutin_cuisine SUCCES\n08:11:25 mere_noel SUCCES\n08:12:14 mere_noel SUCCES\n08:12:37 pixel ECHEC\n08:12:54 pere_noel SUCCES\n08:12:56 lutin_emballage ECHEC\n08:13:28 admin ECHEC\n08:13:44 admin SUCCES\n08:14:30 renne_gps SUCCES\n08:14:35 mere_noel SUCCES\n08:14:45 mere_noel ECHEC\n08:15:01 pere_noel_2 SUCCES\n08:15:31 lutin_cuisine SUCCES\n08:15:39 pere_noel_2 SUCCES\n08:15:42 renne_gps SUCCES\n08:16:11 pere_noel_2 SUCCES\n08:16:12 pere_noel SUCCES\n08:16:32 lutin_emballage ECHEC\n08:16:50 pere_noel_old ECHEC\n08:17:54 pere_noel_2 SUCCES\n08:18:41 pere_noel ECHEC\n08:19:14 lutin_cuisine SUCCES\n08:19:14 pixel SUCCES\n08:19:16 renne_gps SUCCES\n08:19:54 renne_gps SUCCES\n08:20:05 mere_noel SUCCES\n08:20:09 pere_noel_old SUCCES\n08:21:37 pere_noel SUCCES\n08:22:04 lutin_cuisine ECHEC\n08:22:05 mere_noel ECHEC\n08:22:41 admin SUCCES\n08:22:45 pere_noel_old SUCCES\n08:22:47 lutin_emballage SUCCES\n08:23:28 lutin_cuisine ECHEC\n08:23:30 pere_noel SUCCES\n08:23:59 pere_noel ECHEC\n08:24:10 lutin_cuisine SUCCES\n08:24:28 lutin_cuisine SUCCES\n08:25:26 mere_noel SUCCES\n08:26:19 lutin_cuisine SUCCES\n08:26:31 pere_noel_old ECHEC\n08:26:55 lutin_emballage SUCCES\n08:27:14 pere_noel ECHEC\n08:27:59 admin ECHEC\n08:28:39 pere_noel SUCCES\n08:29:07 lutin_cuisine SUCCES\n08:29:17 lutin_cuisine SUCCES\n08:29:40 pixel SUCCES\n08:29:44 lutin_emballage SUCCES\n08:30:04 pixel SUCCES\n08:30:06 lutin_cuisine SUCCES\n08:30:52 pixel SUCCES\n08:31:05 lutin_cuisine SUCCES\n08:31:26 admin SUCCES\n08:32:49 admin SUCCES\n08:33:06 renne_gps SUCCES\n08:33:10 lutin_emballage ECHEC\n08:33:45 pixel SUCCES\n08:33:54 pere_noel_old SUCCES\n08:34:26 mere_noel SUCCES\n08:34:35 mere_noel ECHEC\n08:34:55 renne_gps ECHEC\n08:35:12 renne_gps SUCCES\n08:35:34 pere_noel_old SUCCES\n08:35:36 lutin_cuisine ECHEC\n08:36:23 admin SUCCES\n08:36:32 pere_noel_2 SUCCES\n08:37:10 admin SUCCES\n08:37:16 mere_noel SUCCES\n08:37:36 renne_gps SUCCES\n08:38:22 pere_noel_2 SUCCES\n08:39:19 renne_gps SUCCES\n08:39:50 lutin_cuisine ECHEC\n08:39:51 pere_noel ECHEC\n08:39:55 pere_noel_2 SUCCES\n08:40:10 pere_noel_2 SUCCES\n08:40:24 pere_noel SUCCES\n08:41:11 admin ECHEC\n08:41:56 mere_noel SUCCES\n08:42:27 lutin_cuisine SUCCES\n08:42:30 lutin_cuisine SUCCES\n08:42:31 pere_noel SUCCES\n08:42:42 pere_noel SUCCES\n08:43:25 pere_noel_2 SUCCES\n08:43:42 lutin_cuisine SUCCES\n08:44:32 mere_noel SUCCES\n08:44:43 pere_noel_old ECHEC\n08:44:55 pere_noel_old ECHEC\n08:45:49 pere_noel SUCCES\n08:46:58 lutin_cuisine SUCCES\n08:47:21 lutin_emballage SUCCES\n08:47:34 pere_noel_2 SUCCES\n08:47:54 pere_noel_old SUCCES\n08:48:15 mere_noel SUCCES\n08:48:57 pixel SUCCES\n08:49:35 pere_noel_2 ECHEC\n08:50:21 pere_noel_old SUCCES\n08:50:46 pere_noel_2 SUCCES\n08:51:34 pere_noel_2 SUCCES\n08:51:58 mere_noel SUCCES\n08:52:33 pixel ECHEC\n08:52:43 lutin_emballage SUCCES\n08:52:49 mere_noel ECHEC\n08:52:55 lutin_cuisine SUCCES\n08:53:03 pere_noel_old SUCCES\n08:53:04 lutin_emballage SUCCES\n08:54:34 pixel SUCCES\n08:55:17 admin SUCCES\n08:55:48 admin SUCCES\n08:55:52 mere_noel SUCCES\n08:57:31 pixel SUCCES\n08:58:55 lutin_cuisine SUCCES\n08:58:58 pere_noel ECHEC\n09:00:26 pere_noel_old SUCCES\n09:00:43 lutin_emballage SUCCES\n09:00:58 lutin_emballage SUCCES\n09:01:00 lutin_emballage SUCCES\n09:01:03 mere_noel SUCCES\n09:01:23 pere_noel SUCCES\n09:01:23 pixel SUCCES\n09:01:37 pere_noel ECHEC\n09:02:03 admin SUCCES\n09:02:28 pere_noel_old SUCCES\n09:02:37 pere_noel SUCCES\n09:03:06 pere_noel_2 SUCCES\n09:03:17 pere_noel ECHEC\n09:03:17 pixel SUCCES\n09:03:43 pere_noel_old SUCCES\n09:03:51 lutin_emballage SUCCES\n09:04:31 lutin_emballage ECHEC\n09:05:30 lutin_cuisine SUCCES\n09:06:06 pere_noel SUCCES\n09:06:19 pixel SUCCES\n09:06:42 pere_noel SUCCES\n09:07:28 pere_noel_old SUCCES\n09:07:59 admin SUCCES\n09:08:46 mere_noel SUCCES\n09:08:51 pere_noel_2 SUCCES\n09:09:10 pere_noel_old SUCCES\n09:09:40 pere_noel_old SUCCES\n09:09:59 lutin_cuisine SUCCES\n09:10:24 admin SUCCES\n09:10:56 mere_noel ECHEC\n09:11:08 pere_noel SUCCES\n09:11:15 admin ECHEC\n09:11:16 mere_noel SUCCES\n09:11:23 renne_gps SUCCES\n09:11:31 pere_noel_old ECHEC\n09:12:20 admin SUCCES\n09:13:04 pere_noel SUCCES\n09:13:39 pere_noel SUCCES\n09:14:38 lutin_cuisine SUCCES\n09:15:46 pere_noel SUCCES\n09:15:54 pere_noel SUCCES\n09:16:11 pere_noel_old SUCCES\n09:16:32 mere_noel SUCCES\n09:16:41 pixel SUCCES\n09:16:48 pere_noel ECHEC\n09:17:16 lutin_emballage SUCCES\n09:17:22 pere_noel ECHEC\n09:18:29 lutin_cuisine SUCCES\n09:19:07 pere_noel_old SUCCES\n09:19:29 pere_noel SUCCES\n09:20:51 pere_noel_old SUCCES\n09:21:10 admin SUCCES\n09:21:22 pixel SUCCES\n09:21:49 lutin_cuisine SUCCES\n09:21:59 pixel SUCCES\n09:22:11 pixel SUCCES\n09:22:53 admin SUCCES\n09:23:18 admin SUCCES\n09:23:51 mere_noel SUCCES\n09:23:51 pixel SUCCES\n09:24:09 pere_noel_2 SUCCES\n09:24:35 lutin_cuisine SUCCES\n09:25:26 lutin_emballage SUCCES\n09:25:30 pere_noel_2 ECHEC\n09:25:39 pere_noel_old ECHEC\n09:25:45 pere_noel SUCCES\n09:26:08 pere_noel_old ECHEC\n09:27:03 lutin_emballage ECHEC\n09:28:03 renne_gps SUCCES\n09:28:16 pere_noel SUCCES\n09:28:39 pixel SUCCES\n09:29:25 pere_noel ECHEC\n09:30:35 pixel ECHEC\n09:31:14 pere_noel SUCCES\n09:31:29 pere_noel_old SUCCES\n09:34:33 pere_noel ECHEC\n09:34:43 admin SUCCES\n09:35:33 pere_noel ECHEC\n09:35:40 lutin_emballage SUCCES\n09:35:53 pere_noel_old SUCCES\n09:36:06 renne_gps SUCCES\n09:36:14 pixel ECHEC\n09:36:21 pere_noel_2 SUCCES\n09:36:32 pere_noel ECHEC\n09:36:41 pere_noel_2 ECHEC\n09:37:21 renne_gps SUCCES\n09:37:32 renne_gps SUCCES\n09:37:54 pere_noel_old SUCCES\n09:38:11 renne_gps SUCCES\n09:38:24 pere_noel SUCCES\n09:38:32 mere_noel ECHEC\n09:38:36 admin ECHEC\n09:39:52 lutin_emballage SUCCES\n09:40:05 admin ECHEC\n09:40:08 renne_gps ECHEC\n09:40:21 pere_noel_old SUCCES\n09:40:44 lutin_emballage SUCCES\n09:41:08 pere_noel SUCCES\n09:42:44 mere_noel SUCCES\n09:42:54 pere_noel_old SUCCES\n09:43:44 lutin_cuisine ECHEC\n09:44:06 admin ECHEC\n09:44:53 pixel ECHEC\n09:44:58 lutin_emballage SUCCES\n09:45:04 renne_gps SUCCES\n09:45:18 pere_noel ECHEC\n09:46:16 lutin_cuisine SUCCES\n09:46:29 renne_gps SUCCES\n09:46:30 pere_noel SUCCES\n09:46:40 pere_noel SUCCES\n09:46:56 renne_gps SUCCES\n09:47:28 pere_noel SUCCES\n09:47:41 pixel SUCCES\n09:48:01 admin SUCCES\n09:48:22 lutin_cuisine SUCCES\n09:48:28 renne_gps SUCCES\n09:49:24 admin SUCCES\n09:50:26 mere_noel SUCCES\n09:50:41 pixel SUCCES\n09:53:02 lutin_cuisine SUCCES\n09:53:21 admin ECHEC\n09:54:06 pere_noel SUCCES\n09:55:27 pere_noel ECHEC\n09:55:31 renne_gps ECHEC\n09:55:57 pere_noel SUCCES\n09:56:48 admin ECHEC\n09:56:51 lutin_emballage ECHEC\n09:57:16 lutin_emballage SUCCES\n09:57:23 admin SUCCES\n09:57:38 renne_gps SUCCES\n09:57:40 pere_noel ECHEC\n09:58:19 mere_noel SUCCES\n09:58:42 pere_noel SUCCES\n09:59:22 pere_noel_2 SUCCES\n09:59:27 pixel ECHEC\n09:59:33 lutin_cuisine SUCCES\n09:59:46 mere_noel SUCCES\n10:00:45 pere_noel_2 SUCCES\n10:01:43 pere_noel_2 SUCCES\n10:01:54 pere_noel SUCCES\n10:02:31 pere_noel_2 SUCCES\n10:03:05 lutin_cuisine SUCCES\n10:03:36 lutin_cuisine SUCCES\n10:03:43 pere_noel_2 SUCCES\n10:04:06 pere_noel SUCCES\n10:04:23 mere_noel SUCCES\n10:04:48 admin ECHEC\n10:05:13 pere_noel_old ECHEC\n10:05:25 lutin_emballage SUCCES\n10:05:28 pere_noel SUCCES\n10:05:33 mere_noel SUCCES\n10:05:37 renne_gps ECHEC\n10:06:00 pixel SUCCES\n10:06:25 admin SUCCES\n10:06:57 lutin_cuisine SUCCES\n10:07:11 renne_gps SUCCES\n10:07:27 admin ECHEC\n10:08:12 pere_noel_old SUCCES\n10:08:44 pere_noel SUCCES\n10:11:28 mere_noel SUCCES\n10:12:08 pere_noel_old SUCCES\n10:12:34 pere_noel SUCCES\n10:12:44 pere_noel_2 SUCCES\n10:13:12 renne_gps SUCCES\n10:13:53 lutin_cuisine SUCCES\n10:14:07 pere_noel SUCCES\n10:14:28 pixel SUCCES\n10:14:42 pere_noel SUCCES\n10:14:51 admin SUCCES\n10:15:22 lutin_cuisine SUCCES\n10:15:40 admin SUCCES\n10:15:47 renne_gps SUCCES\n10:15:49 pere_noel_2 ECHEC\n10:16:20 pere_noel ECHEC\n10:17:28 pere_noel SUCCES\n10:17:56 lutin_cuisine SUCCES\n10:18:04 renne_gps SUCCES\n10:19:48 mere_noel SUCCES\n10:20:31 pixel ECHEC\n10:20:40 lutin_emballage SUCCES\n10:21:27 pere_noel_old SUCCES\n10:22:14 admin SUCCES\n10:22:43 pere_noel SUCCES\n10:22:44 lutin_emballage SUCCES\n10:23:19 lutin_cuisine SUCCES\n10:23:22 pere_noel_2 SUCCES\n10:24:21 pere_noel SUCCES\n10:24:33 admin SUCCES\n10:24:40 pere_noel_old SUCCES\n10:25:01 pixel SUCCES\n10:25:23 pere_noel ECHEC\n10:26:02 pere_noel_old SUCCES\n10:26:39 admin SUCCES\n10:26:54 mere_noel SUCCES\n10:27:18 admin SUCCES\n10:27:35 lutin_emballage SUCCES\n10:28:16 pere_noel_2 SUCCES\n10:28:50 lutin_emballage SUCCES\n10:29:09 pixel SUCCES\n10:29:24 pere_noel SUCCES\n10:29:34 lutin_cuisine SUCCES\n10:30:03 admin ECHEC\n10:30:12 admin ECHEC\n10:30:29 pere_noel_2 ECHEC\n10:30:55 pixel ECHEC\n10:31:04 renne_gps SUCCES\n10:31:10 renne_gps ECHEC\n10:31:10 renne_gps SUCCES\n10:32:11 pere_noel ECHEC\n10:32:18 admin SUCCES\n10:32:22 lutin_cuisine SUCCES\n10:32:50 pere_noel_2 ECHEC\n10:33:04 mere_noel SUCCES\n10:33:19 pere_noel ECHEC\n10:33:50 pere_noel SUCCES\n10:33:53 lutin_emballage SUCCES\n10:34:06 lutin_cuisine SUCCES\n10:34:10 lutin_emballage SUCCES\n10:34:25 renne_gps SUCCES\n10:36:12 mere_noel SUCCES\n10:36:39 renne_gps ECHEC\n10:36:59 admin SUCCES\n10:37:20 pixel SUCCES\n10:38:12 pixel SUCCES\n10:38:23 admin SUCCES\n10:38:38 lutin_cuisine SUCCES\n10:38:40 pere_noel_old SUCCES\n10:38:47 lutin_cuisine SUCCES\n10:39:11 pere_noel SUCCES\n10:39:20 lutin_emballage ECHEC\n10:39:26 pere_noel_2 SUCCES\n10:40:20 pere_noel_old SUCCES\n10:40:30 pixel SUCCES\n10:40:56 pere_noel_old SUCCES\n10:40:59 mere_noel SUCCES\n10:41:05 pere_noel_2 SUCCES\n10:41:26 mere_noel SUCCES\n10:41:32 pixel SUCCES\n10:41:57 admin SUCCES\n10:42:06 lutin_emballage SUCCES\n10:42:19 lutin_emballage SUCCES\n10:42:45 renne_gps SUCCES\n10:42:48 renne_gps ECHEC\n10:42:52 admin SUCCES\n10:43:17 lutin_emballage SUCCES\n10:43:27 lutin_emballage SUCCES\n10:43:35 pere_noel ECHEC\n10:43:51 pere_noel_old SUCCES\n10:45:01 admin SUCCES\n10:45:31 pere_noel ECHEC\n10:45:32 pere_noel SUCCES\n10:45:41 lutin_emballage SUCCES\n10:46:14 pere_noel_old SUCCES\n10:46:57 pere_noel_2 SUCCES\n10:47:33 admin ECHEC\n10:48:45 admin SUCCES\n10:48:45 renne_gps SUCCES\n10:49:04 mere_noel SUCCES\n10:49:51 pere_noel ECHEC\n10:50:27 lutin_cuisine SUCCES\n10:50:27 pixel SUCCES\n10:51:07 pere_noel_2 SUCCES\n10:51:21 pere_noel_old ECHEC\n10:52:17 lutin_cuisine SUCCES\n10:52:38 pixel ECHEC\n10:53:19 pere_noel_old SUCCES\n10:53:55 mere_noel SUCCES\n10:54:04 admin SUCCES\n10:54:42 pere_noel_2 SUCCES\n10:55:04 lutin_emballage SUCCES\n10:57:24 pere_noel_2 SUCCES\n10:57:27 lutin_cuisine SUCCES\n10:57:51 pere_noel SUCCES\n10:58:01 mere_noel SUCCES\n10:58:10 renne_gps SUCCES\n10:58:16 admin SUCCES\n10:58:28 admin SUCCES\n10:58:51 mere_noel SUCCES\n10:58:55 pere_noel ECHEC\n10:59:12 lutin_emballage SUCCES\n10:59:51 pere_noel SUCCES\n10:59:53 pere_noel SUCCES\n11:00:02 pere_noel_old SUCCES\n11:00:03 renne_gps ECHEC\n11:00:18 pixel ECHEC\n11:00:21 pere_noel SUCCES\n11:01:06 pere_noel_2 SUCCES\n11:01:13 admin SUCCES\n11:01:29 renne_gps SUCCES\n11:01:54 renne_gps ECHEC\n11:02:06 lutin_cuisine SUCCES\n11:02:12 pere_noel SUCCES\n11:03:16 pere_noel SUCCES\n11:03:26 mere_noel ECHEC\n11:03:41 pere_noel ECHEC\n11:03:44 pere_noel SUCCES\n11:03:55 pixel SUCCES\n11:04:17 pere_noel_old SUCCES\n11:04:25 pixel SUCCES\n11:04:47 pere_noel_2 SUCCES\n11:05:30 mere_noel SUCCES\n11:05:32 pixel SUCCES\n11:06:00 renne_gps ECHEC\n11:06:16 pere_noel ECHEC\n11:06:52 pixel SUCCES\n11:08:05 admin SUCCES\n11:08:07 pere_noel_2 SUCCES\n11:09:22 pere_noel SUCCES\n11:09:29 pere_noel_2 ECHEC\n11:09:58 lutin_cuisine ECHEC\n11:10:00 admin SUCCES\n11:10:37 pere_noel SUCCES\n11:11:41 renne_gps SUCCES\n11:11:49 renne_gps SUCCES\n11:12:06 pixel ECHEC\n11:12:50 pere_noel SUCCES\n11:12:55 lutin_cuisine SUCCES\n11:13:19 admin SUCCES\n11:13:30 lutin_emballage ECHEC\n11:14:28 pere_noel_2 SUCCES\n11:14:47 pere_noel_old SUCCES\n11:16:11 admin SUCCES\n11:16:16 mere_noel SUCCES\n11:17:36 mere_noel SUCCES\n11:18:23 pere_noel SUCCES\n11:19:10 admin ECHEC\n11:19:43 admin SUCCES\n11:19:55 admin SUCCES\n11:20:26 lutin_cuisine ECHEC\n11:21:33 lutin_emballage SUCCES\n11:21:41 admin SUCCES\n11:21:41 renne_gps SUCCES\n11:22:20 pixel SUCCES\n11:24:05 lutin_emballage SUCCES\n11:24:10 pixel ECHEC\n11:24:14 pere_noel SUCCES\n11:24:17 renne_gps SUCCES\n11:24:24 pere_noel SUCCES\n11:24:45 renne_gps ECHEC\n11:25:20 pere_noel ECHEC\n11:25:24 lutin_cuisine SUCCES\n11:27:28 pere_noel_2 SUCCES\n11:27:32 lutin_cuisine ECHEC\n11:28:25 pere_noel_2 SUCCES\n11:28:41 renne_gps SUCCES\n11:29:01 lutin_emballage SUCCES\n11:29:46 pere_noel_2 SUCCES\n11:29:47 pere_noel_old SUCCES\n11:30:16 pere_noel SUCCES\n11:30:38 pere_noel_2 SUCCES\n11:31:30 pere_noel_2 SUCCES\n11:32:27 pere_noel_old SUCCES\n11:32:47 pere_noel SUCCES\n11:32:57 pere_noel SUCCES\n11:34:11 lutin_emballage ECHEC\n11:34:23 mere_noel SUCCES\n11:34:25 pere_noel SUCCES\n11:35:19 pere_noel_2 SUCCES\n11:36:11 pere_noel_old SUCCES\n11:37:05 pere_noel SUCCES\n11:37:52 lutin_cuisine SUCCES\n11:37:57 admin ECHEC\n11:38:39 pere_noel SUCCES\n11:38:47 admin SUCCES\n11:39:06 pere_noel SUCCES\n11:39:15 renne_gps ECHEC\n11:39:30 pixel ECHEC\n11:40:59 renne_gps SUCCES\n11:41:07 lutin_cuisine SUCCES\n11:41:39 admin SUCCES\n11:42:01 admin SUCCES\n11:42:16 lutin_emballage SUCCES\n11:42:17 lutin_emballage ECHEC\n11:42:37 pere_noel_old SUCCES\n11:43:01 pere_noel SUCCES\n11:45:58 pixel SUCCES\n11:46:02 renne_gps ECHEC\n11:46:15 mere_noel SUCCES\n11:46:16 lutin_emballage SUCCES\n11:46:16 pere_noel_2 SUCCES\n11:46:27 admin SUCCES\n11:47:20 pere_noel_old SUCCES\n11:47:24 lutin_cuisine SUCCES\n11:47:45 pere_noel_2 SUCCES\n11:48:52 lutin_cuisine ECHEC\n11:48:58 lutin_cuisine ECHEC\n11:49:10 pixel ECHEC\n11:49:55 pere_noel_2 SUCCES\n11:50:15 lutin_cuisine ECHEC\n11:50:54 admin ECHEC\n11:50:57 pixel ECHEC\n11:54:41 renne_gps ECHEC\n11:55:55 pere_noel SUCCES\n11:56:05 pere_noel_old SUCCES\n11:56:42 lutin_emballage SUCCES\n11:56:47 pere_noel_2 SUCCES\n11:57:24 pere_noel SUCCES\n11:57:30 admin SUCCES\n11:57:44 pere_noel SUCCES\n11:57:56 lutin_emballage SUCCES\n11:57:59 pere_noel SUCCES\n11:58:49 admin ECHEC\n11:59:35 pere_noel_2 SUCCES\n12:00:03 lutin_emballage SUCCES\n12:00:16 admin SUCCES\n12:00:28 mere_noel SUCCES\n12:00:51 lutin_cuisine SUCCES\n12:00:54 pere_noel SUCCES\n12:01:17 pere_noel_old ECHEC\n12:01:39 pere_noel SUCCES\n12:01:47 pere_noel_2 SUCCES\n12:02:15 mere_noel SUCCES\n12:03:11 pere_noel ECHEC\n12:03:23 pere_noel ECHEC\n12:03:31 pere_noel SUCCES\n12:03:51 pere_noel_old SUCCES\n12:04:09 pere_noel_2 SUCCES\n12:04:22 pere_noel_old ECHEC\n12:04:59 pere_noel_old ECHEC\n12:06:26 lutin_cuisine SUCCES\n12:06:32 renne_gps SUCCES\n12:07:13 lutin_cuisine SUCCES\n12:07:17 pere_noel_2 SUCCES\n12:07:20 renne_gps SUCCES\n12:08:00 pere_noel SUCCES\n12:09:51 pere_noel SUCCES\n12:10:02 pixel ECHEC\n12:10:50 pixel SUCCES\n12:11:17 pere_noel ECHEC\n12:11:20 pere_noel_old ECHEC\n12:11:56 pere_noel SUCCES\n12:12:32 lutin_emballage SUCCES\n12:12:34 pere_noel ECHEC\n12:12:55 pixel SUCCES\n12:12:56 lutin_emballage ECHEC\n12:14:37 mere_noel SUCCES\n12:15:13 lutin_cuisine SUCCES\n12:15:24 mere_noel ECHEC\n12:15:29 lutin_cuisine SUCCES\n12:15:47 renne_gps ECHEC\n12:16:16 pere_noel ECHEC\n12:16:41 admin SUCCES\n12:16:52 lutin_cuisine SUCCES\n12:17:34 lutin_cuisine SUCCES\n12:18:06 pere_noel SUCCES\n12:18:49 renne_gps ECHEC\n12:20:04 renne_gps SUCCES\n12:20:36 pixel ECHEC\n12:21:12 mere_noel SUCCES\n12:21:13 lutin_cuisine SUCCES\n12:21:24 pere_noel_2 ECHEC\n12:21:47 renne_gps SUCCES\n12:22:49 mere_noel SUCCES\n12:23:54 renne_gps SUCCES\n12:24:04 lutin_cuisine ECHEC\n12:24:05 pere_noel SUCCES\n12:24:10 admin ECHEC\n12:26:04 mere_noel ECHEC\n12:26:13 pixel SUCCES\n12:26:47 lutin_cuisine SUCCES\n12:27:07 lutin_emballage SUCCES\n12:27:15 admin ECHEC\n12:28:34 pere_noel_2 ECHEC\n12:28:34 pere_noel_old ECHEC\n12:28:37 lutin_emballage SUCCES\n12:28:40 admin SUCCES\n12:28:44 renne_gps ECHEC\n12:29:18 pixel SUCCES\n12:30:38 lutin_emballage SUCCES\n12:31:03 admin SUCCES\n12:31:42 pere_noel_old ECHEC\n12:32:24 lutin_cuisine SUCCES\n12:33:03 lutin_cuisine SUCCES\n12:34:14 pere_noel ECHEC\n12:34:33 lutin_cuisine SUCCES\n12:35:04 pere_noel SUCCES\n12:35:11 pere_noel_2 SUCCES\n12:35:12 pere_noel_old ECHEC\n12:36:02 pere_noel_old SUCCES\n12:36:18 pixel SUCCES\n12:36:31 admin SUCCES\n12:36:32 lutin_emballage SUCCES\n12:36:51 pere_noel SUCCES\n12:37:17 mere_noel SUCCES\n12:38:03 renne_gps SUCCES\n12:38:11 lutin_emballage SUCCES\n12:38:19 pere_noel_2 SUCCES\n12:38:39 pere_noel_2 ECHEC\n12:39:00 renne_gps ECHEC\n12:39:08 pere_noel SUCCES\n12:39:33 pere_noel_old ECHEC\n12:40:05 lutin_emballage SUCCES\n12:40:43 mere_noel SUCCES\n12:40:56 pere_noel ECHEC\n12:41:27 pere_noel SUCCES\n12:42:17 mere_noel ECHEC\n12:42:22 pere_noel SUCCES\n12:43:10 pere_noel_old SUCCES\n12:43:15 mere_noel SUCCES\n12:44:27 admin SUCCES\n12:44:41 pere_noel_old SUCCES\n12:45:43 admin ECHEC\n12:45:51 admin SUCCES\n12:46:19 pere_noel_2 SUCCES\n12:46:23 pere_noel SUCCES\n12:46:55 pere_noel_old ECHEC\n12:48:25 lutin_emballage SUCCES\n12:48:29 renne_gps SUCCES\n12:49:20 renne_gps SUCCES\n12:49:33 pere_noel_old SUCCES\n12:49:40 renne_gps SUCCES\n12:51:28 pixel SUCCES\n12:51:30 pere_noel SUCCES\n12:51:43 lutin_cuisine ECHEC\n12:52:50 pixel SUCCES\n12:52:58 admin SUCCES\n12:53:25 admin SUCCES\n12:53:46 pere_noel SUCCES\n12:53:50 lutin_emballage ECHEC\n12:53:52 pixel ECHEC\n12:54:08 renne_gps SUCCES\n12:54:52 mere_noel SUCCES\n12:55:01 renne_gps SUCCES\n12:55:58 pere_noel_2 SUCCES\n12:56:41 pere_noel_old SUCCES\n12:56:51 pere_noel SUCCES\n12:57:07 pixel SUCCES\n12:57:12 pere_noel_old SUCCES\n12:58:19 lutin_cuisine SUCCES\n12:58:20 pere_noel SUCCES\n12:58:37 mere_noel ECHEC\n12:58:59 pere_noel SUCCES\n12:59:20 renne_gps SUCCES\n12:59:27 pere_noel_2 SUCCES\n12:59:54 mere_noel ECHEC\n13:00:59 admin SUCCES\n13:00:59 pere_noel_old SUCCES\n13:01:02 pere_noel SUCCES\n13:01:20 lutin_emballage SUCCES\n13:02:02 admin ECHEC\n13:03:44 pere_noel_2 ECHEC\n13:04:00 pere_noel_2 ECHEC\n13:04:13 mere_noel ECHEC\n13:04:24 pere_noel_old ECHEC\n13:04:59 lutin_emballage ECHEC\n13:05:17 mere_noel SUCCES\n13:05:31 pere_noel SUCCES\n13:06:30 lutin_cuisine SUCCES\n13:06:47 lutin_cuisine SUCCES\n13:07:02 pere_noel_2 SUCCES\n13:08:17 lutin_emballage ECHEC\n13:08:26 pere_noel SUCCES\n13:09:19 pere_noel_2 ECHEC\n13:09:24 lutin_emballage SUCCES\n13:09:32 pere_noel_2 SUCCES\n13:09:54 pere_noel ECHEC\n13:10:15 admin ECHEC\n13:10:42 pere_noel_2 SUCCES\n13:12:08 admin SUCCES\n13:12:32 lutin_cuisine SUCCES\n13:12:41 mere_noel SUCCES\n13:13:24 mere_noel ECHEC\n13:14:23 pixel SUCCES\n13:14:39 lutin_cuisine SUCCES\n13:15:56 pere_noel_old SUCCES\n13:16:10 mere_noel ECHEC\n13:16:31 mere_noel SUCCES\n13:16:33 mere_noel ECHEC\n13:17:47 renne_gps ECHEC\n13:18:00 pere_noel SUCCES\n13:18:09 lutin_emballage SUCCES\n13:19:07 renne_gps ECHEC\n13:19:48 pere_noel ECHEC\n13:19:52 lutin_emballage SUCCES\n13:21:04 pere_noel SUCCES\n13:21:16 lutin_emballage SUCCES\n13:22:24 pere_noel_old SUCCES\n13:22:56 pixel ECHEC\n13:24:45 pere_noel ECHEC\n13:26:32 pixel SUCCES\n13:26:46 pere_noel_old SUCCES\n13:26:53 lutin_cuisine SUCCES\n13:27:36 pere_noel_2 SUCCES\n13:28:15 pixel SUCCES\n13:28:37 pere_noel_old SUCCES\n13:29:22 lutin_cuisine SUCCES\n13:29:23 pere_noel SUCCES\n13:29:48 pere_noel_old ECHEC\n13:30:06 lutin_cuisine SUCCES\n13:31:02 pere_noel_2 SUCCES\n13:31:16 lutin_cuisine SUCCES\n13:31:21 lutin_cuisine SUCCES\n13:31:45 renne_gps SUCCES\n13:32:04 pere_noel_2 SUCCES\n13:33:46 pixel ECHEC\n13:34:07 pixel SUCCES\n13:34:29 mere_noel ECHEC\n13:35:22 pere_noel ECHEC\n13:35:25 pere_noel ECHEC\n13:35:33 pere_noel_2 SUCCES\n13:35:56 pere_noel_2 SUCCES\n13:37:09 admin ECHEC\n13:37:39 mere_noel SUCCES\n13:39:10 lutin_cuisine ECHEC\n13:39:39 pere_noel_old ECHEC\n13:40:09 lutin_emballage SUCCES\n13:40:12 pixel SUCCES\n13:40:18 lutin_cuisine ECHEC\n13:41:20 admin SUCCES\n13:41:32 pere_noel_old SUCCES\n13:42:08 lutin_emballage SUCCES\n13:43:06 pere_noel SUCCES\n13:44:11 lutin_cuisine SUCCES\n13:44:29 pere_noel SUCCES\n13:44:56 pixel SUCCES\n13:45:08 pixel ECHEC\n13:45:35 pixel SUCCES\n13:46:00 renne_gps SUCCES\n13:46:07 pere_noel SUCCES\n13:46:20 renne_gps ECHEC\n13:46:22 renne_gps SUCCES\n13:46:49 pere_noel SUCCES\n13:46:56 pere_noel_old ECHEC\n13:47:21 lutin_cuisine SUCCES\n13:50:16 admin SUCCES\n13:51:06 pere_noel ECHEC\n13:51:27 renne_gps ECHEC\n13:51:34 pere_noel ECHEC\n13:51:48 renne_gps SUCCES\n13:52:48 lutin_cuisine SUCCES\n13:53:13 pere_noel_old SUCCES\n13:53:22 pere_noel_2 SUCCES\n13:53:50 pixel SUCCES\n13:55:14 renne_gps ECHEC\n13:56:05 pere_noel ECHEC\n13:56:34 lutin_emballage SUCCES\n13:58:20 pixel SUCCES\n13:59:59 admin ECHEC\n14:00:32 lutin_emballage SUCCES\n14:02:07 lutin_cuisine SUCCES\n14:02:48 admin ECHEC\n14:02:50 lutin_emballage SUCCES\n14:02:56 pere_noel_old SUCCES\n14:03:18 admin SUCCES\n14:03:20 mere_noel SUCCES\n14:03:36 pixel ECHEC\n14:03:40 admin SUCCES\n14:03:41 lutin_emballage ECHEC\n14:05:01 renne_gps SUCCES\n14:05:18 renne_gps SUCCES\n14:05:48 lutin_cuisine ECHEC\n14:05:59 pere_noel_2 ECHEC\n14:06:00 lutin_emballage SUCCES\n14:06:18 pixel SUCCES\n14:06:24 pere_noel SUCCES\n14:06:30 pere_noel_2 SUCCES\n14:06:32 admin ECHEC\n14:07:09 lutin_cuisine ECHEC\n14:08:33 renne_gps SUCCES\n14:08:41 pere_noel_old SUCCES\n14:08:56 admin ECHEC\n14:08:59 pere_noel ECHEC\n14:09:24 pere_noel SUCCES\n14:09:33 pere_noel_2 SUCCES\n14:09:57 renne_gps SUCCES\n14:10:35 pere_noel ECHEC\n14:10:57 renne_gps SUCCES\n14:11:09 pere_noel_2 SUCCES\n14:12:05 pere_noel_old SUCCES\n14:12:09 pere_noel SUCCES\n14:12:13 renne_gps SUCCES\n14:12:15 pere_noel_old SUCCES\n14:12:40 pixel ECHEC\n14:12:54 pere_noel ECHEC\n14:14:00 renne_gps SUCCES\n14:14:23 lutin_cuisine SUCCES\n14:14:44 mere_noel SUCCES\n14:14:59 lutin_cuisine SUCCES\n14:15:02 pere_noel_2 SUCCES\n14:15:03 pere_noel SUCCES\n14:15:32 pixel SUCCES\n14:16:18 renne_gps SUCCES\n14:16:31 pere_noel SUCCES\n14:16:52 lutin_cuisine SUCCES\n14:17:11 renne_gps ECHEC\n14:18:08 admin ECHEC\n14:18:34 renne_gps ECHEC\n14:18:37 lutin_emballage SUCCES\n14:18:53 renne_gps SUCCES\n14:19:08 pixel ECHEC\n14:19:10 pere_noel_2 SUCCES\n14:19:13 lutin_cuisine SUCCES\n14:20:22 pere_noel_old SUCCES\n14:20:39 pere_noel_old SUCCES\n14:21:13 pere_noel SUCCES\n14:21:27 pixel SUCCES\n14:21:46 pere_noel_2 SUCCES\n14:21:47 admin SUCCES\n14:22:11 mere_noel SUCCES\n14:22:21 lutin_emballage SUCCES\n14:22:32 lutin_cuisine SUCCES\n14:22:48 mere_noel SUCCES\n14:22:50 mere_noel SUCCES\n14:22:59 lutin_emballage ECHEC\n14:23:42 renne_gps SUCCES\n14:24:31 admin SUCCES\n14:24:40 lutin_cuisine SUCCES\n14:24:43 admin SUCCES\n14:25:06 pixel SUCCES\n14:25:31 renne_gps ECHEC\n14:25:45 lutin_emballage SUCCES\n14:27:14 admin SUCCES\n14:27:15 admin SUCCES\n14:28:05 lutin_cuisine SUCCES\n14:28:19 pere_noel ECHEC\n14:28:47 pere_noel ECHEC\n14:28:58 pere_noel SUCCES\n14:29:04 admin SUCCES\n14:29:48 pixel SUCCES\n14:30:02 lutin_cuisine ECHEC\n14:30:28 pere_noel_old SUCCES\n14:31:45 lutin_emballage SUCCES\n14:31:53 lutin_cuisine ECHEC\n14:32:30 renne_gps SUCCES\n14:32:52 pere_noel_old SUCCES\n14:33:08 pere_noel SUCCES\n14:33:35 pere_noel SUCCES\n14:33:53 pere_noel SUCCES\n14:34:22 pere_noel_2 SUCCES\n14:34:58 pixel ECHEC\n14:35:55 pere_noel SUCCES\n14:36:04 renne_gps SUCCES\n14:36:22 pere_noel_2 SUCCES\n14:38:25 pere_noel_2 SUCCES\n14:39:52 pere_noel ECHEC\n14:40:03 pere_noel ECHEC\n14:40:24 pere_noel_old SUCCES\n14:40:30 lutin_cuisine SUCCES\n14:40:36 renne_gps SUCCES\n14:41:03 renne_gps ECHEC\n14:41:07 pere_noel_old ECHEC\n14:41:25 pixel SUCCES\n14:42:57 lutin_cuisine SUCCES\n14:43:06 admin ECHEC\n14:43:09 pixel SUCCES\n14:43:19 renne_gps SUCCES\n14:44:38 pixel SUCCES\n14:44:54 lutin_cuisine SUCCES\n14:45:25 lutin_cuisine SUCCES\n14:46:31 mere_noel SUCCES\n14:46:35 admin SUCCES\n14:46:42 renne_gps ECHEC\n14:47:41 mere_noel ECHEC\n14:47:48 lutin_emballage SUCCES\n14:47:53 pere_noel ECHEC\n14:48:10 lutin_emballage ECHEC\n14:48:25 pixel SUCCES\n14:48:28 admin SUCCES\n14:48:31 lutin_emballage SUCCES\n14:49:18 pixel SUCCES\n14:50:14 pere_noel ECHEC\n14:50:26 lutin_emballage SUCCES\n14:51:13 renne_gps SUCCES\n14:51:21 pere_noel SUCCES\n14:52:23 admin SUCCES\n14:52:32 mere_noel SUCCES\n14:52:39 lutin_cuisine SUCCES\n14:52:39 pere_noel_2 SUCCES\n14:52:39 renne_gps SUCCES\n14:52:45 admin SUCCES\n14:55:16 renne_gps SUCCES\n14:55:36 pixel SUCCES\n14:55:57 pere_noel_old SUCCES\n14:55:59 pere_noel_old SUCCES\n14:57:20 pere_noel SUCCES\n14:57:21 pere_noel_old SUCCES\n14:58:10 pere_noel SUCCES\n14:59:26 pere_noel_2 SUCCES\n15:00:21 lutin_cuisine SUCCES\n15:00:34 mere_noel SUCCES\n15:00:35 lutin_cuisine ECHEC\n15:00:38 lutin_emballage SUCCES\n15:02:08 lutin_emballage SUCCES\n15:04:27 lutin_cuisine SUCCES\n15:04:34 pere_noel_2 SUCCES\n15:04:41 pere_noel_old SUCCES\n15:04:49 renne_gps ECHEC\n15:05:55 renne_gps SUCCES\n15:05:56 admin SUCCES\n15:07:35 renne_gps SUCCES\n15:07:36 mere_noel ECHEC\n15:07:38 pere_noel ECHEC\n15:08:40 renne_gps SUCCES\n15:08:58 pere_noel_2 SUCCES\n15:09:00 admin SUCCES\n15:10:17 lutin_emballage SUCCES\n15:10:30 pere_noel SUCCES\n15:10:31 pere_noel SUCCES\n15:11:01 renne_gps SUCCES\n15:11:55 pere_noel_2 SUCCES\n15:12:03 mere_noel ECHEC\n15:12:48 renne_gps SUCCES\n15:12:56 mere_noel SUCCES\n15:13:03 lutin_cuisine SUCCES\n15:13:14 pere_noel SUCCES\n15:13:56 lutin_emballage ECHEC\n15:13:58 mere_noel SUCCES\n15:14:04 renne_gps ECHEC\n15:14:44 mere_noel SUCCES\n15:14:48 admin SUCCES\n15:15:48 mere_noel SUCCES\n15:15:57 pere_noel_2 SUCCES\n15:16:23 pere_noel SUCCES\n15:16:38 admin ECHEC\n15:17:02 lutin_cuisine ECHEC\n15:17:25 mere_noel SUCCES\n15:17:43 pere_noel SUCCES\n15:17:50 lutin_cuisine SUCCES\n15:17:54 pere_noel_2 SUCCES\n15:18:22 pere_noel SUCCES\n15:19:05 admin ECHEC\n15:19:46 pere_noel_old SUCCES\n15:20:21 mere_noel SUCCES\n15:20:51 lutin_cuisine SUCCES\n15:22:27 pere_noel SUCCES\n15:22:31 mere_noel SUCCES\n15:22:35 pere_noel_2 SUCCES\n15:22:54 lutin_emballage SUCCES\n15:23:06 lutin_cuisine SUCCES\n15:23:20 pixel SUCCES\n15:23:21 lutin_emballage SUCCES\n15:23:41 lutin_emballage SUCCES\n15:23:58 mere_noel SUCCES\n15:24:16 pere_noel_2 SUCCES\n15:24:22 renne_gps SUCCES\n15:24:35 pixel SUCCES\n15:24:37 renne_gps SUCCES\n15:24:43 admin ECHEC\n15:24:56 admin SUCCES\n15:25:16 pere_noel_old SUCCES\n15:25:22 renne_gps SUCCES\n15:25:35 pere_noel_2 SUCCES\n15:26:02 pere_noel SUCCES\n15:26:30 lutin_cuisine SUCCES\n15:26:32 pere_noel_2 SUCCES\n15:27:28 pere_noel SUCCES\n15:28:20 lutin_cuisine SUCCES\n15:28:50 admin SUCCES\n15:29:40 pere_noel_2 SUCCES\n15:29:42 lutin_emballage SUCCES\n15:30:01 renne_gps SUCCES\n15:30:14 pere_noel ECHEC\n15:30:18 pere_noel_old SUCCES\n15:30:21 pere_noel_old SUCCES\n15:30:29 pixel SUCCES\n15:30:34 mere_noel ECHEC\n15:33:33 pere_noel_2 SUCCES\n15:33:34 pere_noel ECHEC\n15:33:36 admin SUCCES\n15:33:52 mere_noel SUCCES\n15:34:01 pixel ECHEC\n15:35:49 pere_noel SUCCES\n15:36:00 lutin_emballage SUCCES\n15:36:07 lutin_cuisine SUCCES\n15:37:19 pixel SUCCES\n15:37:23 pere_noel_old SUCCES\n15:38:21 admin SUCCES\n15:39:55 pere_noel SUCCES\n15:41:45 pere_noel ECHEC\n15:43:16 renne_gps SUCCES\n15:44:04 pixel SUCCES\n15:44:12 mere_noel SUCCES\n15:44:19 pere_noel_old SUCCES\n15:44:41 mere_noel ECHEC\n15:45:16 pixel SUCCES\n15:45:35 admin SUCCES\n15:45:52 pere_noel_2 SUCCES\n15:46:04 lutin_cuisine ECHEC\n15:46:23 pere_noel SUCCES\n15:46:24 pere_noel SUCCES\n15:46:49 admin ECHEC\n15:46:57 mere_noel SUCCES\n15:47:28 pere_noel ECHEC\n15:47:35 pere_noel_old SUCCES\n15:48:19 admin SUCCES\n15:48:21 renne_gps ECHEC\n15:48:39 pere_noel SUCCES\n15:49:37 lutin_emballage SUCCES\n15:50:20 admin SUCCES\n15:51:04 lutin_emballage SUCCES\n15:51:40 mere_noel SUCCES\n15:51:43 admin SUCCES\n15:51:58 pere_noel_old ECHEC\n15:52:33 admin SUCCES\n15:54:14 lutin_emballage SUCCES\n15:54:42 lutin_emballage SUCCES\n15:55:10 lutin_emballage SUCCES\n15:55:20 renne_gps SUCCES\n15:55:28 pixel SUCCES\n15:55:30 pixel SUCCES\n15:55:34 admin ECHEC\n15:56:37 admin SUCCES\n15:56:38 lutin_cuisine SUCCES\n15:56:45 lutin_cuisine SUCCES\n15:56:53 mere_noel ECHEC\n15:57:04 pere_noel SUCCES\n15:57:06 pere_noel_old SUCCES\n15:57:37 mere_noel ECHEC\n15:58:43 pere_noel SUCCES\n16:00:58 admin SUCCES\n16:01:05 pere_noel SUCCES\n16:01:09 lutin_emballage SUCCES\n16:02:26 lutin_cuisine ECHEC\n16:03:16 lutin_cuisine SUCCES\n16:03:18 admin ECHEC\n16:03:38 pere_noel SUCCES\n16:05:40 pere_noel_old ECHEC\n16:05:41 pere_noel SUCCES\n16:06:44 pixel SUCCES\n16:06:48 pere_noel SUCCES\n16:07:07 pere_noel_2 SUCCES\n16:07:51 pixel ECHEC\n16:08:27 admin SUCCES\n16:09:02 pere_noel SUCCES\n16:09:03 lutin_emballage SUCCES\n16:09:37 lutin_cuisine SUCCES\n16:09:37 pere_noel_old SUCCES\n16:09:44 renne_gps SUCCES\n16:09:53 admin SUCCES\n16:09:54 pere_noel SUCCES\n16:10:27 pixel SUCCES\n16:10:36 pixel SUCCES\n16:10:46 pixel SUCCES\n16:11:05 renne_gps ECHEC\n16:12:03 pere_noel SUCCES\n16:12:30 pere_noel ECHEC\n16:12:40 pere_noel SUCCES\n16:13:32 pere_noel ECHEC\n16:13:57 pere_noel_old SUCCES\n16:14:07 pere_noel_2 SUCCES\n16:14:50 pere_noel ECHEC\n16:15:17 renne_gps SUCCES\n16:15:25 mere_noel SUCCES\n16:15:54 admin SUCCES\n16:16:25 lutin_emballage ECHEC\n16:16:45 pixel ECHEC\n16:17:00 lutin_emballage SUCCES\n16:17:45 renne_gps SUCCES\n16:18:46 pixel SUCCES\n16:18:46 pixel SUCCES\n16:18:56 mere_noel SUCCES\n16:19:10 lutin_cuisine ECHEC\n16:23:10 mere_noel SUCCES\n16:24:15 lutin_emballage SUCCES\n16:24:17 admin SUCCES\n16:25:46 admin SUCCES\n16:26:32 admin SUCCES\n16:27:41 pere_noel SUCCES\n16:27:45 admin SUCCES\n16:27:58 pere_noel SUCCES\n16:28:05 pere_noel_2 SUCCES\n16:29:06 pere_noel SUCCES\n16:29:06 renne_gps SUCCES\n16:29:20 renne_gps SUCCES\n16:29:29 admin ECHEC\n16:29:38 lutin_emballage SUCCES\n16:31:34 lutin_cuisine SUCCES\n16:31:45 lutin_emballage SUCCES\n16:32:03 renne_gps SUCCES\n16:33:43 pixel SUCCES\n16:36:24 pere_noel_old SUCCES\n16:36:36 admin SUCCES\n16:36:40 renne_gps SUCCES\n16:36:47 pere_noel ECHEC\n16:38:21 lutin_cuisine SUCCES\n16:39:29 mere_noel SUCCES\n16:39:42 pere_noel_old SUCCES\n16:39:53 pere_noel_2 SUCCES\n16:40:06 pere_noel_old SUCCES\n16:40:56 pere_noel_old ECHEC\n16:43:07 admin SUCCES\n16:43:29 lutin_cuisine SUCCES\n16:44:36 lutin_emballage SUCCES\n16:44:51 admin ECHEC\n16:45:02 renne_gps ECHEC\n16:45:14 admin SUCCES\n16:45:35 lutin_emballage ECHEC\n16:45:41 admin SUCCES\n16:46:12 pere_noel SUCCES\n16:46:22 lutin_emballage ECHEC\n16:47:59 pixel SUCCES\n16:48:04 lutin_emballage SUCCES\n16:48:59 mere_noel SUCCES\n16:49:49 pere_noel SUCCES\n16:50:17 admin SUCCES\n16:50:38 pere_noel_old SUCCES\n16:50:46 pixel SUCCES\n16:51:07 admin SUCCES\n16:51:16 lutin_emballage ECHEC\n16:52:07 pere_noel ECHEC\n16:52:37 pere_noel SUCCES\n16:52:58 admin SUCCES\n16:53:12 lutin_cuisine SUCCES\n16:53:33 pere_noel SUCCES\n16:53:55 pere_noel SUCCES\n16:54:21 admin SUCCES\n16:54:43 pixel SUCCES\n16:54:59 pere_noel_2 SUCCES\n16:55:11 pere_noel SUCCES\n16:55:18 lutin_emballage SUCCES\n16:55:33 mere_noel SUCCES\n16:57:31 pere_noel_old SUCCES\n16:57:44 lutin_cuisine SUCCES\n16:58:01 lutin_cuisine SUCCES\n16:58:12 mere_noel SUCCES\n16:58:31 mere_noel SUCCES\n16:58:50 pixel SUCCES\n16:58:54 pixel SUCCES\n17:00:47 lutin_cuisine SUCCES\n17:00:48 admin ECHEC\n17:01:28 renne_gps SUCCES\n17:01:30 pixel SUCCES\n17:02:09 renne_gps SUCCES\n17:02:20 lutin_cuisine SUCCES\n17:02:37 pere_noel ECHEC\n17:02:44 pere_noel ECHEC\n17:02:52 pere_noel ECHEC\n17:03:06 lutin_cuisine ECHEC\n17:03:10 pere_noel SUCCES\n17:03:23 pere_noel ECHEC\n17:03:30 lutin_emballage ECHEC\n17:03:59 lutin_cuisine SUCCES\n17:04:12 pere_noel SUCCES\n17:04:55 pere_noel_2 ECHEC\n17:05:30 renne_gps SUCCES\n17:05:48 admin SUCCES\n17:07:24 renne_gps SUCCES\n17:08:04 pixel SUCCES\n17:08:53 pere_noel_2 SUCCES\n17:09:46 lutin_cuisine SUCCES\n17:10:09 pere_noel SUCCES\n17:10:17 pere_noel ECHEC\n17:10:21 pixel SUCCES\n17:10:30 mere_noel SUCCES\n17:11:19 lutin_cuisine SUCCES\n17:12:08 pixel SUCCES\n17:12:53 pere_noel ECHEC\n17:13:15 lutin_emballage SUCCES\n17:13:23 admin SUCCES\n17:13:24 admin SUCCES\n17:13:50 admin ECHEC\n17:14:58 lutin_emballage ECHEC\n17:15:25 lutin_cuisine SUCCES\n17:16:05 lutin_emballage SUCCES\n17:16:23 lutin_cuisine SUCCES\n17:16:29 pere_noel SUCCES\n17:17:07 lutin_cuisine SUCCES\n17:17:32 pixel ECHEC\n17:17:48 renne_gps SUCCES\n17:17:54 renne_gps ECHEC\n17:18:39 pere_noel ECHEC\n17:18:57 pixel SUCCES\n17:20:43 pere_noel_2 SUCCES\n17:20:59 pixel SUCCES\n17:21:16 renne_gps SUCCES\n17:21:52 pere_noel_old SUCCES\n17:22:31 lutin_cuisine SUCCES\n17:23:37 renne_gps SUCCES\n17:23:59 lutin_emballage SUCCES\n17:25:07 lutin_cuisine SUCCES\n17:25:12 renne_gps SUCCES\n17:25:38 admin ECHEC\n17:25:38 admin SUCCES\n17:27:46 mere_noel SUCCES\n17:28:02 mere_noel SUCCES\n17:28:20 pere_noel_2 SUCCES\n17:29:10 pere_noel SUCCES\n17:29:17 pixel ECHEC\n17:30:45 lutin_emballage ECHEC\n17:31:24 pere_noel_old SUCCES\n17:31:57 pere_noel SUCCES\n17:32:06 lutin_emballage SUCCES\n17:33:42 pere_noel_old SUCCES\n17:34:57 lutin_cuisine SUCCES\n17:35:02 pere_noel_2 SUCCES\n17:36:17 lutin_cuisine SUCCES\n17:36:55 mere_noel SUCCES\n17:37:09 mere_noel SUCCES\n17:38:26 pere_noel SUCCES\n17:39:04 pixel ECHEC\n17:39:07 lutin_emballage SUCCES\n17:39:37 pixel SUCCES\n17:40:22 lutin_emballage SUCCES\n17:40:24 pere_noel_2 SUCCES\n17:40:33 lutin_emballage SUCCES\n17:40:49 pere_noel_old SUCCES\n17:41:00 pere_noel_2 SUCCES\n17:41:17 admin ECHEC\n17:41:17 renne_gps SUCCES\n17:42:17 renne_gps ECHEC\n17:43:31 renne_gps SUCCES\n17:43:59 pere_noel ECHEC\n17:44:08 renne_gps ECHEC\n17:44:36 lutin_cuisine ECHEC\n17:44:41 lutin_emballage SUCCES\n17:44:44 mere_noel SUCCES\n17:44:59 mere_noel ECHEC\n17:45:34 pere_noel SUCCES\n17:45:35 pixel SUCCES\n17:45:37 pere_noel_old SUCCES\n17:45:43 admin ECHEC\n17:46:44 lutin_emballage SUCCES\n17:47:51 pere_noel SUCCES\n17:48:03 admin SUCCES\n17:48:09 pere_noel_old SUCCES\n17:48:37 lutin_emballage SUCCES\n17:48:39 renne_gps SUCCES\n17:49:12 admin SUCCES\n17:49:24 pere_noel ECHEC\n17:49:48 pere_noel_old SUCCES\n17:50:05 lutin_cuisine SUCCES\n17:50:06 mere_noel SUCCES\n17:50:32 admin SUCCES\n17:50:35 pere_noel_old ECHEC\n17:51:16 pere_noel_old SUCCES\n17:52:13 mere_noel SUCCES\n17:53:01 pere_noel_2 ECHEC\n17:53:02 renne_gps ECHEC\n17:53:05 admin SUCCES\n17:55:09 mere_noel ECHEC\n17:55:18 mere_noel ECHEC\n17:55:38 lutin_emballage SUCCES\n17:55:58 mere_noel ECHEC\n17:56:21 admin SUCCES\n17:56:41 lutin_emballage SUCCES\n17:58:09 pere_noel SUCCES\n17:58:51 pere_noel_old SUCCES\n17:59:02 pere_noel ECHEC\n17:59:44 pixel SUCCES\n17:59:51 admin SUCCES\n18:00:20 pere_noel ECHEC\n18:00:27 mere_noel SUCCES\n18:01:47 renne_gps SUCCES\n18:02:13 pere_noel_old SUCCES\n18:03:16 mere_noel SUCCES\n18:03:29 mere_noel SUCCES\n18:03:36 lutin_emballage SUCCES\n18:04:13 pere_noel SUCCES\n18:04:24 pixel SUCCES\n18:04:49 pixel SUCCES\n18:05:05 pere_noel SUCCES\n18:06:12 pere_noel_2 ECHEC\n18:06:31 pere_noel SUCCES\n18:07:20 pere_noel_2 ECHEC\n18:07:35 admin SUCCES\n18:07:45 pere_noel SUCCES\n18:08:06 pere_noel_old SUCCES\n18:09:06 pixel SUCCES\n18:09:22 renne_gps SUCCES\n18:10:56 pere_noel_2 SUCCES\n18:11:42 admin SUCCES\n18:12:11 pere_noel ECHEC\n18:12:13 pere_noel SUCCES\n18:12:55 pixel SUCCES\n18:13:07 pere_noel_2 SUCCES\n18:13:18 lutin_emballage SUCCES\n18:14:06 renne_gps SUCCES\n18:14:14 admin SUCCES\n18:14:14 renne_gps SUCCES\n18:14:23 admin SUCCES\n18:14:55 pere_noel SUCCES\n18:15:28 pere_noel ECHEC\n18:15:54 lutin_emballage SUCCES\n18:16:05 mere_noel SUCCES\n18:16:08 pere_noel SUCCES\n18:16:35 pere_noel_old SUCCES\n18:16:57 pere_noel SUCCES\n18:17:59 pixel ECHEC\n18:18:33 pere_noel_old SUCCES\n18:18:42 lutin_cuisine SUCCES\n18:18:43 renne_gps SUCCES\n18:18:46 lutin_emballage SUCCES\n18:18:57 pere_noel_2 SUCCES\n18:19:23 mere_noel SUCCES\n18:19:33 pere_noel_old SUCCES\n18:19:35 pere_noel SUCCES\n18:20:07 pere_noel_2 SUCCES\n18:20:11 pere_noel SUCCES\n18:20:15 lutin_emballage ECHEC\n18:20:23 pixel ECHEC\n18:20:32 renne_gps SUCCES\n18:20:45 pere_noel_old SUCCES\n18:20:49 pere_noel_2 ECHEC\n18:21:25 pere_noel_2 SUCCES\n18:24:51 pere_noel_old SUCCES\n18:25:35 pere_noel_2 SUCCES\n18:26:51 mere_noel SUCCES\n18:26:57 pixel SUCCES\n18:27:05 admin SUCCES\n18:27:22 pere_noel ECHEC\n18:27:52 mere_noel SUCCES\n18:28:11 pixel SUCCES\n18:28:24 lutin_emballage SUCCES\n18:29:09 admin SUCCES\n18:29:21 pere_noel SUCCES\n18:29:37 pere_noel SUCCES\n18:29:40 pixel SUCCES\n18:29:43 pere_noel SUCCES\n18:30:15 lutin_emballage SUCCES\n18:31:28 renne_gps SUCCES\n18:32:15 lutin_cuisine SUCCES\n18:32:59 pere_noel_old ECHEC\n18:33:24 pixel SUCCES\n18:35:26 admin SUCCES\n18:36:41 lutin_cuisine SUCCES\n18:37:14 pere_noel SUCCES\n18:37:37 lutin_cuisine SUCCES\n18:37:47 pere_noel ECHEC\n18:38:04 renne_gps SUCCES\n18:38:12 lutin_cuisine ECHEC\n18:38:20 lutin_emballage SUCCES\n18:39:47 admin SUCCES\n18:40:59 admin SUCCES\n18:41:28 mere_noel SUCCES\n18:42:03 admin ECHEC\n18:42:04 pixel SUCCES\n18:42:34 pixel ECHEC\n18:42:55 mere_noel SUCCES\n18:43:03 pere_noel_2 SUCCES\n18:43:04 mere_noel SUCCES\n18:43:06 pere_noel SUCCES\n18:43:55 admin SUCCES\n18:44:50 pere_noel_old ECHEC\n18:45:50 admin SUCCES\n18:47:02 pixel SUCCES\n18:48:17 renne_gps SUCCES\n18:49:06 lutin_emballage ECHEC\n18:49:56 pixel SUCCES\n18:50:00 admin ECHEC\n18:50:21 mere_noel ECHEC\n18:51:16 pere_noel SUCCES\n18:51:35 pere_noel SUCCES\n18:52:09 admin SUCCES\n18:52:22 pere_noel_old ECHEC\n18:52:56 pixel ECHEC\n18:53:21 pere_noel SUCCES\n18:54:18 lutin_emballage SUCCES\n18:54:51 pere_noel SUCCES\n18:54:53 lutin_emballage ECHEC\n18:56:31 pere_noel SUCCES\n18:57:15 pere_noel_2 ECHEC\n18:58:28 mere_noel SUCCES\n18:58:40 pere_noel ECHEC\n18:58:44 pere_noel_2 SUCCES\n18:59:28 renne_gps SUCCES\n18:59:38 lutin_emballage SUCCES\n18:59:42 lutin_cuisine SUCCES\n19:00:33 lutin_emballage ECHEC\n19:00:42 lutin_cuisine ECHEC\n19:00:48 lutin_emballage SUCCES\n19:01:08 renne_gps SUCCES\n19:02:25 pere_noel ECHEC\n19:02:27 pere_noel_2 SUCCES\n19:02:40 lutin_cuisine ECHEC\n19:02:52 pere_noel_old SUCCES\n19:02:57 pixel SUCCES\n19:04:25 pere_noel_2 SUCCES\n19:04:50 pere_noel_old SUCCES\n19:05:15 pixel ECHEC\n19:06:04 pixel ECHEC\n19:06:07 pixel ECHEC\n19:06:24 pere_noel_old ECHEC\n19:06:32 mere_noel ECHEC\n19:06:47 renne_gps SUCCES\n19:06:56 admin SUCCES\n19:07:30 renne_gps SUCCES\n19:07:44 pere_noel SUCCES\n19:08:16 admin SUCCES\n19:08:43 mere_noel ECHEC\n19:08:58 pere_noel_old ECHEC\n19:09:01 renne_gps ECHEC\n19:09:21 pere_noel_old SUCCES\n19:09:37 renne_gps ECHEC\n19:10:08 pere_noel ECHEC\n19:10:53 renne_gps SUCCES\n19:11:00 pere_noel ECHEC\n19:11:06 pere_noel_old SUCCES\n19:11:48 renne_gps SUCCES\n19:11:57 pere_noel SUCCES\n19:12:38 renne_gps SUCCES\n19:12:40 pere_noel_2 SUCCES\n19:14:02 lutin_emballage SUCCES\n19:14:19 lutin_cuisine SUCCES\n19:14:40 lutin_emballage SUCCES\n19:15:23 pixel ECHEC\n19:16:38 pere_noel ECHEC\n19:16:58 pere_noel_2 SUCCES\n19:17:22 admin ECHEC\n19:17:25 admin ECHEC\n19:18:59 lutin_emballage ECHEC\n19:19:07 lutin_emballage SUCCES\n19:19:34 pixel SUCCES\n19:20:00 pere_noel_2 SUCCES\n19:21:46 mere_noel SUCCES\n19:22:20 renne_gps SUCCES\n19:23:16 mere_noel ECHEC\n19:23:27 lutin_emballage SUCCES\n19:23:43 lutin_cuisine SUCCES\n19:24:07 pere_noel SUCCES\n19:24:13 admin ECHEC\n19:24:22 pere_noel_old ECHEC\n19:24:26 pere_noel SUCCES\n19:24:31 pere_noel_2 ECHEC\n19:24:43 pixel ECHEC\n19:24:53 lutin_cuisine SUCCES\n19:25:14 pere_noel_old SUCCES\n19:26:20 pixel SUCCES\n19:26:38 pixel SUCCES\n19:26:56 pere_noel SUCCES\n19:29:29 lutin_cuisine ECHEC\n19:29:43 pixel ECHEC\n19:29:49 mere_noel SUCCES\n19:30:09 pixel ECHEC\n19:30:18 pere_noel SUCCES\n19:30:34 pere_noel SUCCES\n19:30:54 pere_noel_old ECHEC\n19:31:05 pere_noel SUCCES\n19:31:09 pere_noel ECHEC\n19:31:21 lutin_emballage SUCCES\n19:31:35 pere_noel_old SUCCES\n19:31:47 pere_noel ECHEC\n19:31:49 mere_noel ECHEC\n19:32:01 pixel SUCCES\n19:32:04 renne_gps ECHEC\n19:32:15 admin SUCCES\n19:32:41 pere_noel_2 SUCCES\n19:32:42 lutin_emballage ECHEC\n19:33:20 lutin_cuisine SUCCES\n19:33:25 pere_noel SUCCES\n19:33:51 mere_noel ECHEC\n19:34:08 admin SUCCES\n19:35:05 pere_noel_old ECHEC\n19:35:13 pere_noel SUCCES\n19:36:58 pere_noel SUCCES\n19:37:26 lutin_emballage SUCCES\n19:37:49 lutin_emballage SUCCES\n19:38:47 pere_noel ECHEC\n19:39:37 pere_noel_2 SUCCES\n19:39:54 pixel SUCCES\n19:40:17 lutin_cuisine SUCCES\n19:42:05 admin SUCCES\n19:42:39 pixel SUCCES\n19:42:53 pere_noel_2 SUCCES\n19:43:48 lutin_emballage SUCCES\n19:45:46 pere_noel_old SUCCES\n19:46:42 mere_noel SUCCES\n19:46:44 lutin_cuisine SUCCES\n19:47:08 pere_noel SUCCES\n19:47:25 lutin_emballage SUCCES\n19:47:45 mere_noel SUCCES\n19:47:48 lutin_cuisine SUCCES\n19:47:50 pere_noel_2 ECHEC\n19:48:06 lutin_cuisine ECHEC\n19:48:28 pixel SUCCES\n19:49:37 pere_noel SUCCES\n19:49:40 pere_noel_old SUCCES\n19:50:22 pere_noel SUCCES\n19:50:39 pere_noel SUCCES\n19:50:41 pixel SUCCES\n19:50:46 pere_noel SUCCES\n19:51:12 pere_noel_2 SUCCES\n19:51:22 lutin_cuisine ECHEC\n19:51:42 admin SUCCES\n19:52:21 lutin_emballage SUCCES\n19:52:48 renne_gps SUCCES\n19:53:00 pere_noel_old ECHEC\n19:53:25 mere_noel SUCCES\n19:54:40 pere_noel ECHEC\n19:55:12 pere_noel SUCCES\n19:55:17 lutin_cuisine SUCCES\n19:55:19 pere_noel SUCCES\n19:56:00 pixel SUCCES\n19:56:07 pere_noel_2 ECHEC\n19:56:53 pixel SUCCES\n19:57:10 pere_noel SUCCES\n19:57:32 pere_noel ECHEC\n19:58:34 mere_noel SUCCES\n19:59:41 admin ECHEC\n19:59:54 pere_noel_2 SUCCES\n20:00:02 pere_noel_old SUCCES\n20:00:42 mere_noel SUCCES\n20:00:43 lutin_cuisine SUCCES\n20:01:11 pere_noel SUCCES\n20:01:27 admin ECHEC\n20:01:32 lutin_cuisine SUCCES\n20:01:35 pere_noel_2 SUCCES\n20:02:34 lutin_cuisine SUCCES\n20:02:41 pere_noel_old SUCCES\n20:04:19 pere_noel SUCCES\n20:06:10 admin SUCCES\n20:06:30 lutin_cuisine SUCCES\n20:06:38 lutin_emballage SUCCES\n20:06:57 lutin_emballage SUCCES\n20:07:16 pere_noel_old SUCCES\n20:07:49 pere_noel_2 SUCCES\n20:08:27 pere_noel_2 ECHEC\n20:09:15 lutin_cuisine ECHEC\n20:09:22 renne_gps SUCCES\n20:09:33 pere_noel_old SUCCES\n20:09:42 admin SUCCES\n20:11:21 pere_noel_old SUCCES\n20:11:27 lutin_cuisine ECHEC\n20:12:21 admin ECHEC\n20:13:14 pere_noel ECHEC\n20:14:11 pere_noel ECHEC\n20:15:27 pere_noel_old SUCCES\n20:15:56 pere_noel_2 SUCCES\n20:16:38 pere_noel_old SUCCES\n20:16:52 pere_noel SUCCES\n20:17:04 lutin_emballage ECHEC\n20:17:45 pere_noel SUCCES\n20:18:06 renne_gps ECHEC\n20:19:02 pere_noel_old SUCCES\n20:20:28 admin ECHEC\n20:22:15 renne_gps ECHEC\n20:23:01 pere_noel SUCCES\n20:23:59 pere_noel SUCCES\n20:24:40 lutin_emballage SUCCES\n20:24:40 pixel SUCCES\n20:24:51 pere_noel_2 SUCCES\n20:24:53 pere_noel ECHEC\n20:25:12 mere_noel SUCCES\n20:25:15 mere_noel SUCCES\n20:25:46 pere_noel ECHEC\n20:26:13 lutin_emballage SUCCES\n20:26:17 pere_noel_2 SUCCES\n20:27:07 pere_noel_2 ECHEC\n20:27:34 pixel SUCCES\n20:28:21 renne_gps SUCCES\n20:28:33 pixel SUCCES\n20:29:05 lutin_emballage SUCCES\n20:29:07 pere_noel_2 SUCCES\n20:29:12 renne_gps SUCCES\n20:29:41 admin SUCCES\n20:29:52 pixel SUCCES\n20:30:00 renne_gps SUCCES\n20:30:15 pere_noel_old SUCCES\n20:30:23 pere_noel SUCCES\n20:31:09 mere_noel SUCCES\n20:31:32 renne_gps ECHEC\n20:31:37 pere_noel_2 SUCCES\n20:32:03 pere_noel SUCCES\n20:33:13 lutin_cuisine SUCCES\n20:33:19 pere_noel ECHEC\n20:33:27 pere_noel_old ECHEC\n20:33:45 admin SUCCES\n20:36:00 admin SUCCES\n20:36:03 lutin_emballage SUCCES\n20:36:23 pere_noel ECHEC\n20:36:58 renne_gps SUCCES\n20:37:44 pere_noel SUCCES\n20:38:55 pere_noel_2 ECHEC\n20:38:56 pere_noel ECHEC\n20:39:21 mere_noel SUCCES\n20:39:40 mere_noel SUCCES\n20:39:46 pere_noel_old SUCCES\n20:39:50 pere_noel SUCCES\n20:40:01 pere_noel_old ECHEC\n20:40:51 lutin_emballage SUCCES\n20:41:45 pere_noel SUCCES\n20:42:55 pere_noel ECHEC\n20:43:05 lutin_cuisine SUCCES\n20:43:07 lutin_emballage SUCCES\n20:44:19 pere_noel_old SUCCES\n20:44:46 pere_noel_old SUCCES\n20:44:52 pere_noel_2 ECHEC\n20:45:12 mere_noel SUCCES\n20:46:24 pere_noel SUCCES\n20:46:25 pere_noel_2 SUCCES\n20:46:52 admin SUCCES\n20:47:55 admin SUCCES\n20:48:01 mere_noel SUCCES\n20:49:07 mere_noel SUCCES\n20:50:10 admin SUCCES\n20:50:13 mere_noel SUCCES\n20:51:05 lutin_emballage ECHEC\n20:52:11 renne_gps SUCCES\n20:52:46 renne_gps SUCCES\n20:54:29 pere_noel_old SUCCES\n20:54:36 lutin_cuisine SUCCES\n20:55:45 pixel SUCCES\n20:56:01 pere_noel_old SUCCES\n20:56:06 pere_noel_2 ECHEC\n20:56:26 pere_noel SUCCES\n20:57:43 pere_noel_2 ECHEC\n20:57:51 lutin_emballage SUCCES\n20:57:56 pixel SUCCES\n20:58:35 admin SUCCES\n20:58:48 pere_noel_old SUCCES\n20:59:00 pere_noel SUCCES\n20:59:02 renne_gps SUCCES\n20:59:12 lutin_emballage SUCCES\n20:59:18 pere_noel SUCCES\n20:59:36 renne_gps SUCCES\n20:59:53 pere_noel_old ECHEC\n21:00:18 pere_noel_2 SUCCES\n21:00:26 pere_noel_2 SUCCES\n21:01:49 lutin_emballage SUCCES\n21:01:52 admin SUCCES\n21:02:16 pere_noel_old ECHEC\n21:02:36 pere_noel SUCCES\n21:04:57 pere_noel SUCCES\n21:05:01 pere_noel SUCCES\n21:05:37 lutin_emballage SUCCES\n21:05:38 pere_noel SUCCES\n21:05:39 lutin_cuisine ECHEC\n21:05:41 pere_noel_old ECHEC\n21:06:41 pere_noel SUCCES\n21:06:43 pere_noel SUCCES\n21:06:43 pere_noel SUCCES\n21:07:19 mere_noel SUCCES\n21:07:33 lutin_cuisine ECHEC\n21:08:01 pere_noel_2 SUCCES\n21:08:26 lutin_cuisine SUCCES\n21:08:54 admin SUCCES\n21:08:57 lutin_emballage SUCCES\n21:09:39 lutin_emballage SUCCES\n21:10:06 pixel SUCCES\n21:10:18 pixel ECHEC\n21:11:06 admin ECHEC\n21:11:30 lutin_cuisine SUCCES\n21:12:39 mere_noel ECHEC\n21:13:10 lutin_cuisine SUCCES\n21:13:22 pere_noel SUCCES\n21:13:33 pere_noel_2 SUCCES\n21:14:10 lutin_cuisine SUCCES\n21:14:14 renne_gps ECHEC\n21:14:31 pere_noel_old ECHEC\n21:14:37 pere_noel_old ECHEC\n21:14:42 lutin_emballage SUCCES\n21:15:53 pere_noel_old SUCCES\n21:16:15 renne_gps SUCCES\n21:17:35 pere_noel_2 SUCCES\n21:17:48 lutin_emballage ECHEC\n21:18:44 pere_noel SUCCES\n21:19:02 admin SUCCES\n21:21:00 lutin_emballage SUCCES\n21:21:22 pere_noel ECHEC\n21:22:23 pere_noel_2 ECHEC\n21:22:38 pere_noel_old SUCCES\n21:22:45 lutin_cuisine SUCCES\n21:22:46 lutin_emballage SUCCES\n21:22:54 pere_noel SUCCES\n21:23:38 mere_noel SUCCES\n21:26:01 lutin_emballage SUCCES\n21:26:22 pixel SUCCES\n21:27:19 mere_noel SUCCES\n21:27:50 pere_noel ECHEC\n21:28:05 pere_noel SUCCES\n21:29:26 lutin_cuisine SUCCES\n21:30:21 pere_noel SUCCES\n21:30:37 pixel SUCCES\n21:30:46 pixel ECHEC\n21:31:14 lutin_emballage ECHEC\n21:31:26 lutin_emballage SUCCES\n21:31:53 pere_noel_old ECHEC\n21:32:18 renne_gps ECHEC\n21:32:44 renne_gps SUCCES\n21:34:38 pere_noel SUCCES\n21:34:45 pixel SUCCES\n21:34:47 pere_noel ECHEC\n21:35:03 admin ECHEC\n21:35:15 pere_noel_old SUCCES\n21:36:27 mere_noel SUCCES\n21:36:43 pere_noel SUCCES\n21:37:05 pere_noel SUCCES\n21:37:30 lutin_emballage SUCCES\n21:37:48 pere_noel_old ECHEC\n21:38:37 pere_noel ECHEC\n21:38:44 lutin_emballage SUCCES\n21:39:04 renne_gps ECHEC\n21:39:07 pere_noel SUCCES\n21:39:23 pere_noel ECHEC\n21:39:32 pere_noel SUCCES\n21:39:59 pere_noel_old ECHEC\n21:40:06 pere_noel_old SUCCES\n21:40:10 pere_noel_old ECHEC\n21:41:01 pere_noel ECHEC\n21:41:05 pere_noel_2 SUCCES\n21:41:07 pixel ECHEC\n21:43:13 pere_noel SUCCES\n21:43:45 pixel ECHEC\n21:44:06 pixel ECHEC\n21:44:26 pere_noel ECHEC\n21:44:39 lutin_cuisine ECHEC\n21:45:05 pere_noel_2 SUCCES\n21:46:21 mere_noel SUCCES\n21:46:24 pere_noel SUCCES\n21:48:09 pere_noel SUCCES\n21:48:09 pere_noel_old ECHEC\n21:49:08 pere_noel SUCCES\n21:50:10 lutin_cuisine SUCCES\n21:50:46 pere_noel_old ECHEC\n21:51:33 pixel ECHEC\n21:51:51 pixel SUCCES\n21:51:52 lutin_emballage SUCCES\n21:52:04 lutin_cuisine ECHEC\n21:52:27 pere_noel_2 SUCCES\n21:52:53 pere_noel SUCCES\n21:54:01 pere_noel SUCCES\n21:54:27 lutin_cuisine SUCCES\n21:54:48 pere_noel_2 SUCCES\n21:55:22 admin SUCCES\n21:55:32 pere_noel SUCCES\n21:55:33 lutin_cuisine SUCCES\n21:55:57 pixel ECHEC\n21:56:02 lutin_emballage SUCCES\n21:56:45 renne_gps ECHEC\n21:56:55 lutin_emballage SUCCES\n21:57:59 lutin_cuisine SUCCES\n21:58:55 pixel SUCCES\n21:59:00 pere_noel_old SUCCES\n21:59:07 pere_noel_2 SUCCES\n21:59:21 pixel SUCCES\n22:00:28 pere_noel SUCCES\n22:00:48 lutin_cuisine ECHEC\n22:01:44 pere_noel_old ECHEC\n22:01:46 renne_gps SUCCES\n22:02:36 lutin_cuisine ECHEC\n22:04:00 pixel SUCCES\n22:05:15 lutin_cuisine SUCCES\n22:05:49 lutin_emballage SUCCES\n22:06:21 admin SUCCES\n22:06:33 renne_gps SUCCES\n22:07:05 lutin_emballage SUCCES\n22:08:16 mere_noel SUCCES\n22:08:24 renne_gps ECHEC\n22:08:47 renne_gps ECHEC\n22:09:01 lutin_emballage SUCCES\n22:09:02 pere_noel_2 SUCCES\n22:09:03 pere_noel_old ECHEC\n22:09:22 renne_gps SUCCES\n22:10:20 pixel SUCCES\n22:10:33 admin SUCCES\n22:10:47 pere_noel_2 SUCCES\n22:10:55 pere_noel SUCCES\n22:11:05 pere_noel_2 SUCCES\n22:11:06 pixel ECHEC\n22:11:08 pere_noel SUCCES\n22:11:13 pere_noel SUCCES\n22:11:16 pixel SUCCES\n22:12:19 pere_noel SUCCES\n22:13:00 lutin_emballage ECHEC\n22:13:46 pere_noel SUCCES\n22:13:57 pere_noel SUCCES\n22:15:02 lutin_cuisine SUCCES\n22:16:10 mere_noel ECHEC\n22:16:41 lutin_emballage SUCCES\n22:17:11 lutin_cuisine SUCCES\n22:17:18 lutin_emballage SUCCES\n22:17:29 pere_noel_old SUCCES\n22:17:44 lutin_emballage SUCCES\n22:18:25 admin SUCCES\n22:18:32 pixel ECHEC\n22:18:41 pere_noel SUCCES\n22:22:41 renne_gps SUCCES\n22:23:11 lutin_emballage SUCCES\n22:23:52 mere_noel SUCCES\n22:24:07 admin SUCCES\n22:24:28 lutin_cuisine SUCCES\n22:24:54 pere_noel_2 SUCCES\n22:25:04 pere_noel ECHEC\n22:25:19 lutin_cuisine SUCCES\n22:25:50 pere_noel SUCCES\n22:26:03 lutin_emballage SUCCES\n22:26:06 lutin_cuisine ECHEC\n22:26:09 pixel SUCCES\n22:26:14 lutin_cuisine SUCCES\n22:26:40 lutin_cuisine SUCCES\n22:26:52 mere_noel SUCCES\n22:27:00 lutin_cuisine ECHEC\n22:28:13 lutin_emballage SUCCES\n22:28:17 pere_noel_old ECHEC\n22:29:34 pere_noel_2 SUCCES\n22:29:45 lutin_cuisine SUCCES\n22:31:18 admin SUCCES\n22:31:56 pixel SUCCES\n22:32:41 mere_noel SUCCES\n22:33:24 mere_noel ECHEC\n22:33:29 lutin_emballage SUCCES\n22:33:29 pere_noel_2 ECHEC\n22:33:33 lutin_cuisine SUCCES\n22:33:47 admin SUCCES\n22:34:55 pere_noel ECHEC\n22:35:37 mere_noel SUCCES\n22:36:21 mere_noel SUCCES\n22:36:38 pere_noel_2 ECHEC\n22:36:41 lutin_cuisine ECHEC\n22:36:46 pixel SUCCES\n22:37:19 pixel SUCCES\n22:37:23 mere_noel SUCCES\n22:37:34 admin SUCCES\n22:37:34 renne_gps SUCCES\n22:38:16 pere_noel_2 SUCCES\n22:38:25 lutin_cuisine ECHEC\n22:38:38 pixel SUCCES\n22:38:47 pixel SUCCES\n22:38:50 admin SUCCES\n22:38:50 pere_noel_old ECHEC\n22:39:06 lutin_emballage SUCCES\n22:39:22 admin SUCCES\n22:40:07 pixel SUCCES\n22:40:45 pere_noel SUCCES\n22:40:51 admin SUCCES\n22:41:23 pere_noel SUCCES\n22:41:38 mere_noel SUCCES\n22:41:39 pere_noel_old SUCCES\n22:41:58 lutin_emballage SUCCES\n22:42:26 renne_gps SUCCES\n22:42:48 pere_noel_old SUCCES\n22:43:14 pere_noel ECHEC\n22:43:18 lutin_cuisine SUCCES\n22:43:32 mere_noel ECHEC\n22:44:16 pere_noel_2 SUCCES\n22:44:49 pixel SUCCES\n22:46:07 lutin_cuisine SUCCES\n22:46:11 pere_noel_old SUCCES\n22:46:24 pere_noel SUCCES\n22:46:33 mere_noel SUCCES\n22:47:00 admin ECHEC\n22:47:08 pere_noel_old ECHEC\n22:47:46 admin SUCCES\n22:47:55 pere_noel ECHEC\n22:49:02 pere_noel_old SUCCES\n22:49:10 pere_noel_old ECHEC\n22:49:43 mere_noel SUCCES\n22:50:04 pere_noel_old SUCCES\n22:50:15 pere_noel SUCCES\n22:50:59 pere_noel SUCCES\n22:51:03 pere_noel_2 SUCCES\n22:51:53 lutin_cuisine SUCCES\n22:52:13 lutin_cuisine ECHEC\n22:53:07 pere_noel SUCCES\n22:53:55 renne_gps SUCCES\n22:53:58 lutin_emballage ECHEC\n22:54:55 lutin_emballage SUCCES\n22:55:19 lutin_cuisine SUCCES\n22:55:35 pixel ECHEC\n22:56:07 mere_noel SUCCES\n22:56:16 pere_noel_2 SUCCES\n22:56:42 pixel SUCCES\n22:56:58 admin SUCCES\n22:57:17 pere_noel ECHEC\n22:57:22 pixel SUCCES\n22:58:27 renne_gps SUCCES\n22:58:33 renne_gps SUCCES\n22:58:55 pere_noel_2 ECHEC\n22:59:13 lutin_cuisine ECHEC\n22:59:16 mere_noel ECHEC\n22:59:29 pere_noel SUCCES\n23:00:09 renne_gps SUCCES\n23:00:57 admin ECHEC\n23:00:57 pere_noel_2 SUCCES\n23:01:10 pere_noel_2 SUCCES\n23:01:11 pere_noel_old SUCCES\n23:01:25 lutin_emballage SUCCES\n23:01:32 pere_noel_2 ECHEC\n23:03:09 lutin_cuisine SUCCES\n23:04:12 pixel SUCCES\n23:04:28 mere_noel SUCCES\n23:04:34 admin ECHEC\n23:05:36 pere_noel_old SUCCES\n23:05:47 pixel SUCCES\n23:06:51 lutin_emballage SUCCES\n23:08:14 pere_noel_old SUCCES\n23:08:31 pere_noel_2 SUCCES\n23:08:45 lutin_emballage SUCCES\n23:08:55 lutin_emballage ECHEC\n23:09:13 pere_noel SUCCES\n23:09:14 pixel ECHEC\n23:09:15 pere_noel_old SUCCES\n23:10:08 admin SUCCES\n23:10:28 lutin_emballage SUCCES\n23:10:29 pere_noel_2 SUCCES\n23:10:41 pere_noel_2 ECHEC\n23:11:05 pere_noel SUCCES\n23:11:17 pere_noel SUCCES\n23:11:30 pere_noel_old SUCCES\n23:11:37 pere_noel_old SUCCES\n23:11:50 renne_gps SUCCES\n23:11:54 pere_noel SUCCES\n23:12:20 pere_noel_old SUCCES\n23:12:22 pere_noel SUCCES\n23:12:23 pere_noel SUCCES\n23:12:36 pixel SUCCES\n23:12:47 pixel ECHEC\n23:12:51 pere_noel_old SUCCES\n23:13:02 admin SUCCES\n23:13:02 pere_noel_old SUCCES\n23:14:51 renne_gps ECHEC\n23:15:27 pere_noel_old SUCCES\n23:16:06 pere_noel SUCCES\n23:16:43 pere_noel ECHEC\n23:17:10 pere_noel SUCCES\n23:17:33 pixel ECHEC\n23:18:50 lutin_cuisine ECHEC\n23:18:54 pere_noel ECHEC\n23:20:35 pixel SUCCES\n23:22:06 pere_noel SUCCES\n23:22:26 mere_noel SUCCES\n23:22:38 pixel ECHEC\n23:22:51 pere_noel SUCCES\n23:23:56 pere_noel_2 SUCCES\n23:24:05 admin SUCCES\n23:25:06 lutin_emballage ECHEC\n23:25:18 pixel SUCCES\n23:25:53 admin SUCCES\n23:26:56 pere_noel ECHEC\n23:27:05 pere_noel SUCCES\n23:28:28 admin SUCCES\n23:29:10 pixel SUCCES\n23:29:18 pere_noel_old SUCCES\n23:29:45 lutin_cuisine ECHEC\n23:29:50 pere_noel SUCCES\n23:29:57 pere_noel_2 ECHEC\n23:31:26 admin ECHEC\n23:31:53 renne_gps ECHEC\n23:32:32 lutin_emballage SUCCES\n23:32:42 pixel SUCCES\n23:33:20 lutin_emballage SUCCES\n23:33:20 pixel SUCCES\n23:33:52 renne_gps SUCCES\n23:34:13 pere_noel_2 SUCCES\n23:34:53 pere_noel_old SUCCES\n23:35:29 pere_noel_2 SUCCES\n23:37:05 pixel SUCCES\n23:37:17 pere_noel SUCCES\n23:37:19 mere_noel SUCCES\n23:38:18 pixel ECHEC\n23:38:43 pixel SUCCES\n23:38:51 renne_gps SUCCES\n23:39:21 lutin_cuisine SUCCES\n23:39:57 pere_noel SUCCES\n23:40:41 lutin_cuisine SUCCES\n23:41:27 pixel SUCCES\n23:42:17 pere_noel ECHEC\n23:42:24 admin SUCCES\n23:43:14 admin SUCCES\n23:43:24 lutin_emballage ECHEC\n23:44:13 mere_noel SUCCES\n23:44:52 pere_noel ECHEC\n23:45:15 pere_noel ECHEC\n23:45:26 lutin_emballage SUCCES\n23:46:18 lutin_emballage SUCCES\n23:46:22 lutin_emballage SUCCES\n23:46:31 pere_noel SUCCES\n23:46:53 pere_noel SUCCES\n23:48:39 pere_noel_2 SUCCES\n23:49:20 pere_noel_2 ECHEC\n23:49:36 renne_gps SUCCES\n23:50:59 admin SUCCES\n23:51:16 lutin_cuisine SUCCES\n23:51:34 pixel ECHEC\n23:51:55 renne_gps SUCCES\n23:52:04 pere_noel SUCCES\n23:52:08 admin SUCCES\n23:52:43 pere_noel SUCCES\n23:52:46 pere_noel_old SUCCES\n23:53:32 lutin_emballage SUCCES\n23:53:42 pixel SUCCES\n23:54:38 pere_noel ECHEC\n23:55:42 lutin_emballage ECHEC\n23:55:45 pixel SUCCES\n23:55:52 mere_noel ECHEC\n23:55:55 pixel SUCCES\n23:55:57 renne_gps SUCCES\n23:56:21 pere_noel_old SUCCES\n23:57:14 admin SUCCES\n23:57:19 pere_noel ECHEC\n23:58:12 lutin_emballage ECHEC\n23:58:47 mere_noel SUCCES\n23:59:33 pixel SUCCES\n23:59:56 pere_noel SUCCES\n"
   },
   "code": "# Le fichier journal.txt est posé à côté de ton programme : Python peut l'ouvrir avec open().\nfichier = open(\"___\")                  # trou 1 : le nom du fichier (voir l'énoncé)\nlignes = fichier.read().splitlines()   # on lit tout le fichier, puis on le découpe en lignes\nfichier.close()\n\nprint(len(lignes), \"lignes dans le journal\")\nprint(\"Première ligne :\", lignes[0])\n\ncompteur = 0\nfor ligne in lignes:\n    heure_txt, compte, statut = ligne.split(\" \")   # on coupe chaque ligne en 3 morceaux\n    h = int(heure_txt[:2])                          # les 2 premiers caractères : \"02:41:07\" -> 2\n    if compte == ___ and statut == ___ and 2 <= h <= 4:   # trous 2 et 3 : le compte et le résultat, entre guillemets\n        compteur = compteur + 1\n\nprint(compteur)"
  },
  "hints": [
   "Le programme ouvre le fichier <code>journal.txt</code>, le lit ligne par ligne avec une boucle <code>for</code>, et coupe chaque ligne en trois morceaux (heure, compte, résultat). Il te manque le nom du fichier et les deux valeurs à comparer : ce sont des textes, donc entre guillemets."
  ],
  "explain": "<p><b>Réponse : 67 connexions suspectes.</b> Tu viens d'analyser un fichier de 3000 lignes en une fraction de seconde : la lecture d'un <b>fichier</b> (<code>open</code>), une boucle, des <b>conditions</b> combinées avec <code>and</code>, un <b>compteur</b>, et du découpage de texte (<code>split</code>). C'est exactement le travail des analystes en cybersécurité, mais sur des millions de lignes !</p>\n<p><b>Le saviez-vous ?</b> « <code>==</code> » compare deux valeurs (« est-ce égal ? ») alors que « <code>=</code> » range une valeur dans une variable. Mélanger les deux est l'une des erreurs les plus fréquentes… même chez les pros !</p>\n<p class=\"clue\">🕵️ <b>Piste n°4 :</b> 67 connexions réussies en pleine nuit avec le compte du Père Noël, alors qu'il dormait. Le pirate connaît donc son mot de passe. Il l'a volé… ou deviné.</p>",
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
   "label": "Labo Python (💻, facultatif) — laisser l'ordinateur tester les 16 combinaisons (3 règles à écrire)",
   "code": "# Pour chaque combinaison, on vérifie les 6 règles. Les règles 1, 2 et 6 sont déjà traduites en Python.\nfor A in (0, 1):\n    for B in (0, 1):\n        for C in (0, 1):\n            for D in (0, 1):\n                regle1 = (A + B) == 1               # exactement un des deux, A ou B\n                regle2 = (C == 0) or (D == 1)       # si C est levé alors D l'est aussi\n                regle3 = ___                        # A et D ne sont jamais levés en même temps (aide : not, and)\n                regle4 = ___                        # au moins l'un des deux, A ou C, est levé (aide : or)\n                regle5 = ___                        # si B est levé alors C l'est aussi (comme la règle 2)\n                regle6 = (A + B + C + D) >= 2       # au moins deux interrupteurs levés\n                if regle1 and regle2 and regle3 and regle4 and regle5 and regle6:\n                    print(A, B, C, D)"
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
   "code": "# Les données brutes : prenom,age,ville,sage(1 ou 0),cadeaux — un enfant par groupe, séparés par \";\"\ndonnees = (\"Lina,4,Lyon,0,0;Gabriel,5,Marseille,1,5;Arthur,5,Lille,1,5;Manon\"\n           \",14,Strasbourg,0,0;Jules,9,Nice,1,2;Raphaël,9,Strasbourg,0,0;Jad\"\n           \"e,4,Toulouse,1,5;Jade,8,Bordeaux,1,4;Inès,13,Lille,1,2;Lina,14,T\"\n           \"oulouse,1,1;Adam,5,Nantes,1,2;Emma,10,Bordeaux,1,4;Inès,5,Strasb\"\n           \"ourg,0,0;Raphaël,15,Strasbourg,1,0;Jade,7,Nantes,1,4;Lina,8,Toul\"\n           \"ouse,0,0;Zoé,5,Lille,1,3;Adam,14,Lyon,1,3;Hugo,12,Marseille,1,4;\"\n           \"Manon,15,Lyon,1,1;Manon,8,Lyon,1,4;Manon,10,Lyon,1,1;Jade,13,Tou\"\n           \"louse,1,4;Inès,11,Nice,1,3;Gabriel,6,Strasbourg,1,0;Arthur,11,St\"\n           \"rasbourg,1,1;Manon,12,Nice,1,1;Nathan,8,Nantes,1,4;Nathan,8,Lyon\"\n           \",1,1;Jade,6,Strasbourg,0,0;Jade,13,Bordeaux,1,1;Louis,10,Nice,0,\"\n           \"0;Adam,4,Strasbourg,0,0;Arthur,7,Lyon,1,4;Adam,10,Strasbourg,1,1\"\n           \";Lina,9,Lille,0,0;Lina,14,Lille,1,4;Gabriel,9,Bordeaux,1,5;Zoé,7\"\n           \",Strasbourg,1,0;Raphaël,10,Marseille,1,5;Zoé,4,Marseille,1,4;Zoé\"\n           \",13,Nice,1,4;Manon,15,Nantes,1,4;Jade,15,Nantes,0,0;Lina,7,Nante\"\n           \"s,1,1;Nathan,15,Lille,1,2;Hugo,12,Lille,1,4;Lina,7,Nantes,1,2;Ad\"\n           \"am,12,Toulouse,1,2;Emma,8,Nice,1,1;Lina,11,Strasbourg,1,3;Lina,4\"\n           \",Marseille,0,0;Lina,12,Nice,1,4;Inès,10,Toulouse,1,1;Jules,10,Li\"\n           \"lle,1,1;Chloé,15,Lille,1,3;Zoé,13,Lille,1,3;Manon,11,Toulouse,1,\"\n           \"5;Jade,8,Marseille,1,3;Jules,12,Nantes,1,5;Jules,10,Nantes,1,5;M\"\n           \"anon,15,Toulouse,0,0;Jade,8,Lille,1,2;Nathan,15,Lille,1,1;Gabrie\"\n           \"l,14,Lyon,1,2;Jade,13,Lyon,1,2;Raphaël,14,Lyon,1,3;Nathan,8,Toul\"\n           \"ouse,1,2;Hugo,10,Bordeaux,1,3;Léa,14,Lyon,1,3;Zoé,13,Toulouse,1,\"\n           \"3;Raphaël,8,Lille,1,5;Lina,10,Nice,1,3;Lina,9,Lille,1,1;Louis,15\"\n           \",Nice,1,1;Gabriel,6,Toulouse,0,0;Nathan,13,Marseille,1,3;Chloé,1\"\n           \"2,Marseille,1,2;Jade,5,Strasbourg,0,0;Jade,11,Bordeaux,0,0;Hugo,\"\n           \"14,Lille,0,0;Gabriel,6,Lyon,1,3;Jade,12,Lille,1,2;Nathan,13,Lyon\"\n           \",1,2;Emma,15,Bordeaux,1,4;Nathan,15,Bordeaux,1,2;Jade,9,Lille,1,\"\n           \"3;Inès,12,Lille,1,5;Léa,6,Lyon,0,0;Jade,4,Lille,1,4;Zoé,5,Nice,1\"\n           \",5;Emma,13,Lille,1,1;Chloé,11,Bordeaux,0,0;Léa,4,Lille,1,5;Inès,\"\n           \"6,Lille,1,0;Louis,5,Strasbourg,1,0;Manon,7,Strasbourg,1,4;Raphaë\"\n           \"l,15,Lille,1,2;Lina,13,Marseille,1,5;Louis,12,Lyon,0,0;Manon,8,N\"\n           \"ice,1,3;Nathan,15,Bordeaux,1,2;Louis,9,Strasbourg,1,0;Jade,11,Ma\"\n           \"rseille,1,3;Louis,7,Bordeaux,1,1;Chloé,6,Toulouse,1,2;Lina,6,Nic\"\n           \"e,1,4;Arthur,9,Nice,1,5;Jade,9,Lyon,1,5;Nathan,6,Lille,1,1;Rapha\"\n           \"ël,12,Nantes,1,1;Jade,11,Toulouse,1,3;Hugo,10,Toulouse,0,0;Jade,\"\n           \"9,Nantes,0,0;Adam,8,Bordeaux,1,2;Emma,8,Bordeaux,1,4;Inès,9,Nant\"\n           \"es,1,5;Manon,13,Nice,1,5;Jade,14,Bordeaux,1,4;Gabriel,5,Nice,1,5\"\n           \";Raphaël,6,Toulouse,1,3;Adam,9,Nice,1,3;Gabriel,14,Lyon,1,1;Adam\"\n           \",6,Toulouse,1,0;Jade,10,Lyon,0,0;Lina,6,Lyon,0,0;Chloé,14,Nice,1\"\n           \",5;Zoé,12,Nantes,1,0;Jade,7,Lyon,1,4;Emma,7,Bordeaux,1,2;Jules,1\"\n           \"0,Bordeaux,1,2;Chloé,13,Nice,1,2;Léa,5,Lille,1,4;Hugo,13,Nantes,\"\n           \"1,2;Zoé,12,Bordeaux,1,3;Jade,11,Bordeaux,1,2;Jade,7,Nantes,1,1;L\"\n           \"ina,8,Strasbourg,1,0;Emma,12,Lille,1,3;Manon,5,Toulouse,1,3;Adam\"\n           \",15,Toulouse,0,0;Raphaël,4,Bordeaux,0,0;Lina,6,Bordeaux,1,5;Adam\"\n           \",12,Strasbourg,0,0;Inès,5,Lille,0,0;Zoé,5,Lyon,1,5;Zoé,7,Nantes,\"\n           \"0,0;Gabriel,15,Nice,1,1;Louis,10,Lille,1,4;Jade,15,Lille,1,2;Inè\"\n           \"s,11,Strasbourg,1,0;Jules,8,Nantes,1,5;Louis,13,Nantes,1,1;Natha\"\n           \"n,11,Toulouse,1,3;Adam,6,Bordeaux,1,2;Jade,12,Nice,1,2;Louis,4,L\"\n           \"ille,1,4;Adam,8,Lyon,1,0;Arthur,10,Nice,1,2;Emma,15,Lyon,1,5;Ada\"\n           \"m,6,Strasbourg,0,0;Emma,11,Nantes,1,2;Jade,10,Toulouse,0,0;Jules\"\n           \",6,Strasbourg,1,3;Inès,9,Strasbourg,1,0;Manon,12,Nantes,1,1;Nath\"\n           \"an,6,Lille,1,2;Adam,15,Lyon,1,4;Nathan,13,Lyon,1,2;Raphaël,6,Str\"\n           \"asbourg,1,0;Chloé,5,Marseille,1,2;Manon,13,Lille,1,3;Jade,9,Stra\"\n           \"sbourg,1,2;Zoé,11,Lille,0,0;Léa,6,Nantes,1,1;Inès,10,Nice,0,0;Zo\"\n           \"é,7,Bordeaux,1,5;Gabriel,6,Toulouse,0,0;Léa,4,Bordeaux,1,4;Manon\"\n           \",11,Nice,1,2;Zoé,9,Nice,0,0;Jade,15,Nice,0,0;Chloé,14,Nice,0,0;J\"\n           \"ade,7,Strasbourg,1,0;Louis,6,Marseille,0,0;Zoé,14,Toulouse,1,3;Z\"\n           \"oé,4,Toulouse,1,3;Raphaël,11,Nice,0,0;Gabriel,13,Strasbourg,0,0;\"\n           \"Nathan,12,Marseille,1,2;Zoé,8,Nantes,1,3;Raphaël,7,Nantes,1,3;Ad\"\n           \"am,15,Nice,1,0;Zoé,8,Lille,0,0;Lina,13,Marseille,1,5;Adam,4,Nice\"\n           \",0,0;Chloé,8,Bordeaux,1,2;Emma,12,Bordeaux,1,1;Chloé,11,Nantes,1\"\n           \",3;Inès,13,Lyon,1,5;Jade,14,Bordeaux,1,1;Inès,6,Bordeaux,1,2;Man\"\n           \"on,13,Strasbourg,1,2;Jules,11,Bordeaux,1,3;Zoé,5,Marseille,1,3;J\"\n           \"ade,11,Lyon,1,1;Inès,14,Bordeaux,1,3;Hugo,12,Marseille,1,1;Adam,\"\n           \"4,Lyon,1,5;Arthur,11,Toulouse,1,5;Nathan,8,Nantes,1,1;Inès,11,Bo\"\n           \"rdeaux,0,0;Adam,15,Bordeaux,1,1;Manon,15,Toulouse,1,5;Manon,8,To\"\n           \"ulouse,1,4;Arthur,6,Nantes,1,5;Lina,11,Toulouse,1,4;Jules,6,Mars\"\n           \"eille,1,5;Zoé,13,Nantes,1,1;Gabriel,15,Strasbourg,1,2;Manon,5,Bo\"\n           \"rdeaux,1,2;Chloé,12,Bordeaux,0,0;Adam,8,Lille,1,5;Léa,4,Nantes,1\"\n           \",5;Gabriel,7,Lille,1,4;Chloé,14,Nantes,1,2;Emma,6,Marseille,1,1;\"\n           \"Zoé,11,Lyon,1,5;Jade,13,Nice,1,1;Léa,12,Marseille,1,5;Louis,10,L\"\n           \"yon,1,3;Hugo,7,Toulouse,1,4;Louis,13,Lille,0,0;Louis,14,Marseill\"\n           \"e,1,4;Manon,7,Nantes,1,1;Jules,5,Bordeaux,0,0;Adam,12,Nice,1,2;L\"\n           \"ina,11,Lyon,0,0;Inès,8,Nantes,1,4;Léa,7,Lyon,1,2;Emma,11,Nantes,\"\n           \"1,1;Gabriel,5,Lyon,1,1;Raphaël,7,Strasbourg,0,0;Raphaël,9,Lyon,1\"\n           \",5;Jules,4,Lille,0,0;Léa,11,Toulouse,1,2;Nathan,9,Lyon,1,1;Hugo,\"\n           \"15,Lyon,1,2;Nathan,14,Nantes,1,2;Léa,14,Bordeaux,1,4;Raphaël,8,N\"\n           \"antes,1,5;Raphaël,8,Nice,1,1;Raphaël,7,Toulouse,1,4;Léa,5,Lille,\"\n           \"1,3;Zoé,8,Toulouse,1,3;Inès,14,Marseille,1,4;Jules,10,Bordeaux,1\"\n           \",2;Inès,9,Bordeaux,1,5;Chloé,11,Strasbourg,1,4;Léa,7,Toulouse,1,\"\n           \"1;Louis,13,Lyon,1,1;Emma,5,Toulouse,0,0;Gabriel,13,Lyon,1,4;Léa,\"\n           \"10,Marseille,1,1;Adam,12,Nice,1,4;Manon,6,Toulouse,1,1;Gabriel,1\"\n           \"2,Bordeaux,1,1;Jules,8,Nantes,1,5;Jules,10,Strasbourg,0,0;Jules,\"\n           \"5,Lille,1,1;Léa,4,Strasbourg,1,1;Arthur,15,Bordeaux,1,5;Emma,10,\"\n           \"Toulouse,1,0;Zoé,8,Nantes,0,0;Arthur,5,Lille,1,4;Nathan,11,Marse\"\n           \"ille,1,0;Inès,15,Lyon,1,5;Lina,5,Marseille,1,3;Lina,13,Nice,1,4;\"\n           \"Jade,4,Lille,1,2;Lina,8,Nice,0,0;Emma,11,Nantes,0,0;Jules,7,Nice\"\n           \",0,0;Gabriel,5,Lyon,1,4;Jade,9,Nice,1,0;Nathan,7,Lyon,0,0;Arthur\"\n           \",6,Bordeaux,0,0;Raphaël,8,Bordeaux,1,3;Chloé,11,Nice,1,5;Jules,4\"\n           \",Lille,0,0;Manon,6,Strasbourg,1,3;Hugo,15,Lille,1,1;Gabriel,8,Ma\"\n           \"rseille,1,2;Arthur,7,Bordeaux,0,0;Raphaël,9,Strasbourg,1,4;Chloé\"\n           \",9,Nantes,1,2;Raphaël,13,Nantes,1,3;Manon,12,Bordeaux,1,5;Hugo,1\"\n           \"2,Nantes,0,0;Jules,11,Toulouse,1,2;Manon,11,Marseille,1,5;Jules,\"\n           \"11,Bordeaux,0,0;Adam,12,Marseille,0,0;Gabriel,8,Lyon,1,2;Raphaël\"\n           \",10,Lyon,0,0;Jade,12,Marseille,1,5;Léa,13,Nantes,1,3;Léa,13,Lyon\"\n           \",1,3;Lina,9,Strasbourg,1,0;Adam,7,Bordeaux,1,1;Nathan,15,Marseil\"\n           \"le,1,3;Zoé,14,Nantes,0,0;Louis,12,Nantes,1,3;Hugo,5,Nantes,1,5;L\"\n           \"ouis,12,Nice,1,3;Raphaël,15,Toulouse,1,3;Raphaël,5,Lyon,1,4;Hugo\"\n           \",9,Marseille,1,4;Gabriel,15,Lyon,1,5;Arthur,11,Nice,1,3;Zoé,11,M\"\n           \"arseille,1,4;Gabriel,12,Lyon,1,3;Arthur,4,Toulouse,1,1;Louis,5,S\"\n           \"trasbourg,0,0;Manon,6,Lille,1,0;Léa,10,Toulouse,1,2;Inès,13,Stra\"\n           \"sbourg,1,0;Jade,5,Lille,1,3;Manon,9,Lyon,1,2;Jade,14,Bordeaux,1,\"\n           \"3;Jules,14,Bordeaux,1,4;Manon,8,Nice,1,3;Inès,14,Toulouse,1,2;Zo\"\n           \"é,6,Nantes,1,1;Lina,14,Lille,1,5;Adam,10,Marseille,1,3;Hugo,10,N\"\n           \"antes,0,0;Gabriel,8,Lyon,1,1;Chloé,9,Nice,1,1;Emma,9,Bordeaux,0,\"\n           \"0;Léa,10,Marseille,1,5;Zoé,14,Lille,0,0;Arthur,12,Toulouse,1,2;L\"\n           \"éa,8,Marseille,0,0;Jade,8,Lyon,1,5;Adam,15,Strasbourg,1,1;Adam,8\"\n           \",Nantes,1,3;Jade,14,Lille,0,0;Arthur,7,Marseille,1,4;Arthur,12,N\"\n           \"antes,1,2;Jules,11,Toulouse,1,0;Jules,7,Toulouse,1,3;Nathan,10,S\"\n           \"trasbourg,1,5;Lina,9,Lyon,1,3;Gabriel,12,Bordeaux,1,5;Jade,7,Str\"\n           \"asbourg,0,0;Lina,10,Lille,1,2;Raphaël,13,Marseille,1,1;Zoé,8,Nic\"\n           \"e,1,4;Inès,6,Nice,1,2\")\n\n# On transforme ce texte en une liste de dictionnaires\nenfants = []\nfor ligne in donnees.split(\";\"):\n    prenom, age, ville, sage, cadeaux = ligne.split(\",\")\n    enfants.append({\"prenom\": prenom, \"age\": int(age), \"ville\": ville, \"sage\": sage == \"1\", \"cadeaux\": int(cadeaux)})\n\nprint(len(enfants), \"enfants dans la liste\")\nprint(enfants[0])\n\n# degats[\"Lyon\"] sera le nombre de victimes à Lyon, etc.\ndegats = {}\nfor enfant in enfants:\n    if enfant[\"sage\"] and enfant[\"cadeaux\"] == ___:          # trou 1 : un enfant sage qui n'a aucun cadeau\n        ville = enfant[\"ville\"]\n        degats[ville] = degats.get(ville, 0) + ___           # trou 2 : on ajoute une victime à cette ville\n\nprint(degats)"
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
  "puzzle": "<p>Voici la carte : les cases sombres sont des murs de glace, on se déplace d'une case à la fois vers le haut, le bas, la gauche ou la droite (pas en diagonale). Il existe <b>plusieurs chemins</b> de S à A, mais un seul nombre de pas est le minimum.</p>\n<p><b>Comment compter ?</b> Un <b>pas</b> = un déplacement vers une case voisine. Si tu pars de S et que tu marches sur 5 cases pour arriver à A (A compris), ton chemin fait <b>5 pas</b> : la case de départ S ne compte pas, la case d'arrivée A compte. Le compteur sous la carte fait ce calcul pour toi.</p>\n<p><b>Quel est le nombre minimal de pas pour aller de S à A ?</b></p>\n<p class=\"note\">Touche les cases de ton chemin pour les marquer (une case touchée une 2ᵉ fois se démarque). Cherche bien : il y a des raccourcis cachés.</p>",
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
  "hints": [
   "Cherche d'abord un chemin qui marche, puis demande-toi s'il existe un raccourci. Il y a des « boucles » dans le labyrinthe : plusieurs routes mènent au même endroit. Compte les pas de la case S jusqu'à la case A comprise (S ne compte pas)."
  ],
  "explain": "<p><b>Réponse : 38 pas.</b> La méthode des informaticiens s'appelle le <b>parcours en largeur</b> (BFS en anglais). Il explore d'abord toutes les cases à 1 pas, puis toutes celles à 2 pas, puis 3… comme une vague qui se répand. La première fois que la vague touche l'arrivée, c'est forcément par le chemin le plus court !</p>\n<p>C'est ainsi que fonctionnent les GPS (avec des routes au lieu de cases, et des temps de trajet au lieu de pas), les jeux vidéo (comment un monstre te trouve dans un labyrinthe) et les réseaux sociaux (« vous avez 3 amis en commun »). Un ordinateur n'a pas d'intuition : il explore méthodiquement, case après case, jusqu'à ce que la vague touche l'arrivée.</p>\n<p class=\"clue\">🕵️ <b>Piste n°9 :</b> le GPS est réparé : le traîneau pourra rejoindre Strasbourg. Il reste à comprendre qui est derrière tout ça.</p>",
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
   "code": "def dechiffrer_vigenere(texte, cle):\n    resultat = \"\"\n    i = 0                                          # position dans la clé\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            lettre_cle = cle[i % len(cle)]          # la lettre de la clé qui correspond à cette position\n            decalage = ord(lettre_cle) - 65         # A=0, B=1, C=2...\n            numero = ord(lettre) - 65\n            nouveau = (numero - ___) % 26           # trou 1 : on recule du décalage\n            nouvelle_lettre = chr(nouveau + 65)\n            print(lettre, \"| lettre de la clé :\", lettre_cle, \"| décalage :\", decalage, \"->\", nouvelle_lettre)\n            resultat = resultat + nouvelle_lettre\n            i = i + 1\n    return resultat\n\nmessage = \"DIQ OFIYV GRH OT WRMVS PHA MYUUWPZ\"\ncle = \"___\"           # trou 2 : le mot de passe que le pirate réutilise (en MAJUSCULES)\nprint(dechiffrer_vigenere(message, cle))"
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
  "story": "<p><b>Pixel :</b> « Le complice a laissé un <b>badge électronique</b> dans l'atelier. Pour savoir à qui il appartient, il faut ouvrir son boîtier avec le code <b>PIN à 6 chiffres</b>… un nombre entre <b>0 et 999 999</b>, soit un million de possibilités ! Heureusement, le boîtier est bavard : à chaque essai, il répond « C'est plus » ou « C'est moins ». Mais attention : après <b>22 essais ratés</b>, l'alarme se déclenche ! »</p>",
  "puzzle": "<p>Un million de possibilités (de 0 à 999 999), 22 essais seulement : impossible d'essayer les nombres un par un ! Il faut une stratégie maligne : <b>à chaque essai, éliminer la moitié des possibilités</b>.</p>\n<p><b>Quel est le code PIN du boîtier ?</b></p>",
  "widget": {
   "type": "guess",
   "min": 0,
   "max": 999999,
   "tries": 22,
   "enc": 1052374,
   "label": "Le boîtier du badge"
  },
  "python": {
   "label": "Labo Python (💻, facultatif) — pourquoi ça marche : la recherche dichotomique en 2 trous",
   "code": "secret = 456789          # un nombre quelconque, pour t'entraîner\nbas = 0\nhaut = 999999\nessais = 0\n\nwhile True:\n    milieu = ___                       # trou 1 : le nombre pile au milieu entre bas et haut (division entière //)\n    essais = essais + 1\n    if milieu == secret:\n        break\n    elif milieu < secret:              # \"plus grand !\" : on garde la moitié haute\n        bas = milieu + 1\n    else:                              # \"plus petit !\" : on garde la moitié basse\n        haut = ___                     # trou 2 : on s'arrête juste avant le milieu\n\nprint(\"Trouvé en\", essais, \"essais seulement\")"
  },
  "hints": [
   "Ne teste pas 1, puis 2, puis 3… Commence par le nombre au milieu de l'intervalle (environ 500 000). Selon la réponse « plus » ou « moins », tu sais dans quelle moitié se trouve le code. Recommence avec la moitié qui reste, et ainsi de suite."
  ],
  "explain": "<p><b>Code PIN : 738215.</b> La méthode s'appelle la <b>recherche dichotomique</b>. Chaque essai coupe l'intervalle en deux : 1 000 000 de possibilités → 500 000 → 250 000 → … → 1 en 20 essais. C'est le « log₂ » de 1 000 000 !</p>\n<p>La différence avec la méthode « un par un » est gigantesque : <b>jusqu'à 1 000 000 d'essais</b> d'un côté, <b>20 au maximum</b> de l'autre. Pour 1 milliard de possibilités ? Seulement <b>30</b> essais. C'est ce qui rend les moteurs de recherche et les bases de données si rapides.</p>\n<p><b>Le saviez-vous ?</b> C'est aussi pour ça qu'un code PIN à 4 chiffres est faible face à un ordinateur : 10 000 possibilités, c'est quelques secondes. D'où les blocages après 3 essais sur les cartes bancaires !</p>\n<p class=\"clue\">🕵️ <b>Piste n°12 :</b> dans le boîtier, un badge numéro <b>738215</b>, enregistré pour un employé de l'atelier. Son identité est protégée… mais pas pour longtemps.</p>",
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
   "code": "import hashlib\n\ncible = \"9a07ecdbba68eb40b7237982e61b1600659a8d8254c54f6bc1cb9cd0f34cfe0c\"\n\nmots = [\"noel\", \"sapin\", \"etoile\", \"cadeau\", \"renne\", \"lutin\", \"neige\", \"givre\", \"traineau\", \"cheminee\", \"guirlande\", \"boule\", \"bougie\", \"chocolat\", \"biscuit\", \"cannelle\", \"houx\", \"gui\", \"flocon\", \"verglas\", \"hiver\", \"bonnet\", \"echarpe\", \"cloche\", \"calendrier\", \"reveillon\", \"buche\", \"dinde\", \"marron\", \"orange\", \"epices\", \"glace\", \"rudolph\", \"pixel\", \"pole\", \"nord\", \"elfe\", \"hotte\", \"bottes\", \"veillee\"]\n\nfor mot in mots:\n    for n in range(___):                     # trou 1 : les nombres de 00 à 99, donc range(combien ?)\n        essai = mot + f\"{n:02d}\"             # par ex. \"noel07\" : le nombre est toujours écrit avec 2 chiffres\n        empreinte = hashlib.sha256(essai.encode()).hexdigest()\n        print(essai, \"->\", empreinte[:16])   # on affiche chaque essai et le début de son empreinte\n        if ___ == cible:                     # trou 2 : on compare l'empreinte calculée à la cible\n            print(\"Mot de passe trouvé :\", essai)"
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
   "label": "Labo Python — la chaîne de décryptage (à toi de l'écrire)",
   "code": "# 1) Copie ici le texte de l'énoncé (le fichier en base64), entre guillemets :\nsecret = \"___\"\n\n# 2) Étape 1 : décoder le base64 pour retrouver le texte chiffré.\n#    Retrouve dans l'énigme du jour 11 le code qui fait ça, et recopie-le ici.\n\n\n# 3) Étape 2 : déchiffrer le Vigenère avec un mot de passe du pirate.\n#    Retrouve dans l'énigme du jour 10 la fonction qui déchiffre, et recopie-la ici.\n\n\n# 4) Enchaîne les deux étapes, et affiche le résultat avec print(...)."
  },
  "hints": [
   "Tu as déjà écrit le code de chacune des deux étapes : le base64 au jour 11, le Vigenère au jour 10. Retourne les consulter (les énigmes restent ouvertes), recopie-les dans le labo et enchaîne-les. Le base64 a été appliqué en dernier : c'est la première chose à défaire. Pour le mot de passe, le pirate en a utilisé deux jusqu'ici : essaie-les et regarde lequel donne une vraie phrase."
  ],
  "key": {
   "n": 2,
   "value": "GUIRLANDE"
  },
  "explain": "<p><b>Journal décodé :</b> « LA DEUXIEME CLE EST CACHEE DANS LA GUIRLANDE ».</p>\n<p>Bravo, c'est le <b>boss de la semaine 2</b> : base64, Vigenère, fonctions, et un peu de réflexion pour choisir le bon mot de passe !</p>\n<div class=\"reward\">\n<h3>🔑 Clé n°2 obtenue : <span class=\"key\">GUIRLANDE</span></h3>\n<p>Elle rejoint ton trousseau. Plus que deux clés avant le grand décryptage final !</p>\n</div>\n<div class=\"reward\">\n<h3>🎁 Ta récompense de la semaine 2</h3>\n<p>Pixel a mis en sécurité une surprise pour vous deux, mais cette fois il a chiffré l'endroit avec un <b>Vigenère</b>. La clé ? C'est le <b>premier mot de passe du pirate</b>, trouvé au jour 2.</p>\n<pre class=\"code\">JIXG EDU FLHWWALI</pre>\n<p>Utilise le labo ci-dessous pour savoir où chercher !</p>\n</div>\n<div class=\"suspects\">\n<h3>🗂️ Le dossier des suspects</h3>\n<p>Le pirate est aidé par un complice de l'atelier. À partir de la semaine 3, on enquête sur quatre suspects :</p>\n<ul>\n<li>💚 <b>Le Grinch</b> — vit seul sur sa montagne, déteste Noël depuis toujours. Bricoleur de génie.</li>\n<li>😈 <b>Krampus</b> — le « contraire » du Père Noël : il punit les enfants pas sages. Très discret.</li>\n<li>❄️ <b>Jack Frost</b> — esprit de l'hiver, mauvais caractère, adore le verglas et le givre.</li>\n<li>🧝 <b>Gus</b> — lutin de l'atelier, rétrogradé à l'emballage le mois dernier. Il n'a pas aimé.</li>\n</ul>\n</div>\n<p class=\"clue\">🕵️ <b>Piste n°14 :</b> la deuxième clé est cachée dans la guirlande. À toi de jouer pour la semaine 3 : on découvre qui se cache derrière le pirate !</p>",
  "after": {
   "python": {
    "open": true,
    "label": "Labo Python — où est cachée ta récompense ? (à toi de l'écrire)",
    "code": "# 1) Copie ici le message chiffré, tel qu'il est écrit ci-dessus (entre guillemets) :\nmessage = \"___\"\n\n# 2) Copie ici la clé : le premier mot de passe du pirate, trouvé au jour 2 (en MAJUSCULES) :\ncle = \"___\"\n\n# 3) Retrouve dans l'énigme du jour 10 la fonction qui déchiffre un Vigenère, recopie-la ici,\n#    puis affiche le résultat avec print(...)."
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
  "concept": "Intelligence artificielle : apprendre à partir d'exemples",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « On ne peut pas lire des milliers de connexions à la main… alors on va apprendre à un programme à <b>reconnaître</b> le pirate ! C'est le principe de l'<b>intelligence artificielle</b> : au lieu d'écrire une règle à la main, on montre des <b>exemples</b> (des connexions normales, des connexions du pirate) et le programme <b>trouve tout seul la meilleure règle</b>. »</p>",
  "puzzle": "<p>Pour chaque connexion, on connaît les <b>Mo envoyés</b>. Voici 24 connexions normales et 20 connexions du pirate (le diagramme les montre) :</p>\n<pre class=\"code\">Normales : 4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 32, 33, 35, 36, 40, 44\nPirate   : 31, 38, 41, 43, 46, 48, 52, 55, 57, 60, 63, 66, 70, 74, 78, 82, 85, 88, 91, 95</pre>\n<p>La règle à apprendre : <b>« si une connexion envoie plus de <em>seuil</em> Mo, c'est un pirate »</b>. Mais quelle valeur de seuil choisir ? Un seuil <b>fait une erreur</b> quand il classe mal un exemple : une connexion normale au-dessus du seuil, ou une connexion du pirate au niveau du seuil ou en dessous.</p>\n<p><b>Quel seuil (entier entre 0 et 100) fait le moins d'erreurs ?</b> (S'il y en a plusieurs, donne le plus petit.)</p>",
  "widget": {
   "type": "strip",
   "normal": [
    4,
    6,
    7,
    9,
    10,
    12,
    13,
    15,
    16,
    18,
    19,
    21,
    22,
    24,
    25,
    27,
    28,
    30,
    32,
    33,
    35,
    36,
    40,
    44
   ],
   "pirate": [
    31,
    38,
    41,
    43,
    46,
    48,
    52,
    55,
    57,
    60,
    63,
    66,
    70,
    74,
    78,
    82,
    85,
    88,
    91,
    95
   ],
   "label": "Les connexions connues : bleu = normales, rouge = pirate (Mo envoyés)"
  },
  "python": {
   "open": true,
   "label": "Labo Python — le programme qui apprend la meilleure règle (2 trous à remplir)",
   "code": "normales = [4, 6, 7, 9, 10, 12, 13, 15, 16, 18, 19, 21, 22, 24, 25, 27, 28, 30, 32, 33, 35, 36, 40, 44]\npirates = [31, 38, 41, 43, 46, 48, 52, 55, 57, 60, 63, 66, 70, 74, 78, 82, 85, 88, 91, 95]\n\nmeilleur_seuil = 0\nmoins_erreurs = 1000                  # au départ, on part d'un nombre d'erreurs énorme\n\nfor seuil in range(0, 101):           # on essaie tous les seuils de 0 à 100\n    erreurs = 0\n    for mo in normales:\n        if mo > ___:                  # trou 1 : une connexion normale qui dépasse le seuil est mal classée\n            erreurs = erreurs + 1\n    for mo in pirates:\n        if mo <= seuil:               # une connexion du pirate qui ne dépasse pas le seuil est mal classée\n            erreurs = erreurs + 1\n    if erreurs < ___:                 # trou 2 : mieux (moins d'erreurs) que le meilleur seuil trouvé jusqu'ici ?\n        moins_erreurs = erreurs\n        meilleur_seuil = seuil\n\nprint(\"Meilleur seuil :\", meilleur_seuil, \"Mo\")\nprint(\"Nombre d'erreurs :\", moins_erreurs)"
  },
  "hints": [
   "Le programme essaie tous les seuils de 0 à 100. Pour chacun, il compte les erreurs : les connexions normales au-dessus du seuil, et les connexions du pirate au niveau du seuil ou en dessous. Il te manque la variable à comparer dans le premier test, et la valeur avec laquelle on compare le nombre d'erreurs dans le second."
  ],
  "explain": "<p><b>Seuil : 36 Mo</b> (3 erreurs sur 44 exemples). Il n'y a pas de seuil parfait : les exemples se chevauchent un peu (des connexions normales très lourdes, des connexions du pirate très légères), donc on choisit le seuil qui se trompe <em>le moins</em>.</p>\n<p>Tu viens de programmer ce qu'on appelle l'<b>apprentissage automatique</b> (machine learning), sous sa forme la plus simple : le programme a <em>essayé</em> toutes les règles possibles et a gardé celle qui fonctionne le mieux sur les exemples. Les vraies IA font pareil, mais avec des millions d'exemples, des centaines de mesures au lieu d'une seule, et des règles bien plus souples qu'un simple seuil.</p>\n<p><b>Le saviez-vous ?</b> C'est comme ça que ton téléphone reconnaît un visage, qu'une appli recommande des vidéos, ou qu'une banque détecte une fraude : à partir d'exemples, pas de règles écrites à la main. Et l'IA ne vaut que ce que valent ses exemples : si les exemples sont biaisés ou trop peu nombreux, elle se trompe.</p>\n<p class=\"clue\">🕵️ <b>Piste n°16 :</b> le pirate envoie de gros volumes de données : au-dessus de <b>36 Mo</b> par connexion, on peut presque être sûr que c'est lui.</p>",
  "h": [
   "605e4f6140ee35cbbfc409b96554809d14f6abbf084e2ca17ec893cac9914b25"
  ]
 },
 {
  "day": 17,
  "title": "Le perroquet du pirate",
  "concept": "IA générative : deviner le mot suivant",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Les assistants IA comme ChatGPT ou Gemini écrivent des textes avec une idée toute simple : <b>deviner le mot qui vient ensuite</b>, en se basant sur tout ce qu'ils ont lu. On va faire pareil, en miniature. Le pirate a laissé une phrase inachevée : <em>« Noël est une fête pour tout le monde sauf… »</em>. Grâce à ses anciens messages, on peut deviner quel mot il allait écrire ! »</p>",
  "puzzle": "<p>Voici tous les messages qu'on a retrouvés du pirate (sans accents, une phrase se termine par un point) :</p>\n<pre class=\"code\">noel est une fete pour tout le monde sauf moi. tout le monde sourit sauf moi. les enfants recoivent des cadeaux sauf moi. tout le monde est invite sauf moi. la neige tombe pour tous sauf moi. chacun a une place a table sauf moi. on pense a tout le monde sauf moi. tout le monde danse sauf lui. tout le monde chante sauf lui. le sapin brille pour tous sauf lui. ils sont tous la sauf lui. tout est pret sauf les rennes. j ai pense a tout sauf les cadeaux. tout est decore sauf les fenetres. personne ne vient sauf ceux qui ont froid. tout le monde est parti sauf ceux de la montagne. personne ne se souvient de l hiver. le froid est mon seul ami. noel sera bientot fini.</pre>\n<p>Le principe : on regarde <b>tous les mots qui viennent juste après « sauf »</b>, on les compte, et on prend celui qui revient le plus souvent. C'est exactement ce que fait une IA pour écrire la suite d'une phrase, mais avec des milliards de mots.</p>\n<p><b>Quel est le mot le plus probable après « sauf » ?</b></p>",
  "python": {
   "open": true,
   "label": "Labo Python — le perroquet qui compte les mots (2 trous à remplir)",
   "code": "corpus = (\"noel est une fete pour tout le monde sauf moi. tout le monde\"\n          \" sourit sauf moi. les enfants recoivent des cadeaux sauf moi\"\n          \". tout le monde est invite sauf moi. la neige tombe pour tou\"\n          \"s sauf moi. chacun a une place a table sauf moi. on pense a \"\n          \"tout le monde sauf moi. tout le monde danse sauf lui. tout l\"\n          \"e monde chante sauf lui. le sapin brille pour tous sauf lui.\"\n          \" ils sont tous la sauf lui. tout est pret sauf les rennes. j\"\n          \" ai pense a tout sauf les cadeaux. tout est decore sauf les \"\n          \"fenetres. personne ne vient sauf ceux qui ont froid. tout le\"\n          \" monde est parti sauf ceux de la montagne. personne ne se so\"\n          \"uvient de l hiver. le froid est mon seul ami. noel sera bien\"\n          \"tot fini.\")\n\nmots = corpus.replace(\".\", \" \").split()      # la liste de tous les mots, un par un\nprint(len(mots), \"mots dans les messages du pirate\")\n\nmot_cherche = \"sauf\"                         # on veut savoir ce qui vient après ce mot\nsuivants = {}                                # un dictionnaire : mot suivant -> nombre de fois\n\nfor i in range(len(mots) - 1):\n    if mots[i] == ___:                       # trou 1 : on est sur le mot qu'on cherche (la variable du dessus)\n        suivant = mots[i + 1]                # le mot juste après\n        suivants[suivant] = suivants.get(suivant, 0) + ___    # trou 2 : on ajoute 1 à son compteur\n\nprint(suivants)"
  },
  "hints": [
   "La boucle parcourt tous les mots un par un. Chaque fois qu'elle tombe sur le mot cherché, elle regarde le mot suivant et ajoute 1 à son compteur dans le dictionnaire. Il te manque le mot à comparer (il est rangé dans une variable) et le nombre à ajouter."
  ],
  "explain": "<p><b>Réponse : « moi ».</b> Le programme affiche les compteurs : « moi » 7 fois, « lui » 4 fois, « les » 3 fois, « ceux » 2 fois. La phrase la plus probable est donc : <em>« Noël est une fête pour tout le monde sauf moi. »</em></p>\n<p><b>Pourquoi c'est important ?</b> Quand tu écris à un assistant IA, il construit sa réponse mot après mot : à chaque fois, il choisit un mot <em>probable</em> d'après tout ce qu'il a lu. Il ne comprend pas comme toi, il calcule des probabilités. Ça explique deux choses : pourquoi ses phrases sont si naturelles, et pourquoi il peut <b>inventer des choses fausses avec aplomb</b> (on appelle ça des « hallucinations »). Il continue le texte de la façon la plus probable, même quand il ne sait pas. Vérifie toujours une information importante !</p>\n<p><b>Pour aller plus loin :</b> si tu changes <code>mot_cherche</code> en « tout » ou « personne », que prédit le programme ?</p>\n<p class=\"clue\">🕵️ <b>Piste n°17 :</b> le pirate écrit « noël est une fête pour tout le monde sauf <b>moi</b> » : il se sent <b>exclu</b> de Noël, oublié de tous. Ce n'est peut-être pas de la méchanceté, mais une grande tristesse…</p>",
  "h": [
   "d4d3910b19ad12b326d20752f8734d01cdd2d20f8c383c3db8e58eaf7bb88658"
  ]
 },
 {
  "day": 18,
  "title": "L'image compressée",
  "concept": "Compression de données (RLE)",
  "device": "both",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « Le pirate a laissé un fichier d'<b>image</b>, un petit dessin en noir et blanc de 5 lignes. Mais le fichier est <b>compressé</b> : pour gagner de la place, il ne note pas chaque pixel un par un. Il utilise la méthode <b>RLE</b> (<em>Run-Length Encoding</em>), très simple : au lieu d'écrire « blanc blanc blanc noir noir », on écrit « <b>3 blancs, 2 noirs</b> », soit <code>[3, 2]</code>. Qu'est-ce qu'il a dessiné ? »</p>",
  "puzzle": "<p>Chaque ligne de l'image est une liste de nombres : le <b>1ᵉʳ nombre</b> est un nombre de pixels <b>blancs</b>, le 2ᵉ un nombre de pixels <b>noirs</b>, le 3ᵉ des blancs, et ainsi de suite en alternant (le premier nombre peut être 0 si la ligne commence par du noir).</p>\n<pre class=\"code\">[1, 1, 2, 1, 1, 1, 1, 2, 2, 3, 1, 2, 2, 3]\n[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]\n[0, 3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1]\n[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]\n[0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3]</pre>\n<p>Par exemple, <code>[2, 3, 1]</code> donne : <code>..###.</code> (2 blancs, 3 noirs, 1 blanc). Une fois les 5 lignes décodées et empilées, un mot apparaît.</p>\n<p><b>Quel est le mot dessiné ?</b></p>",
  "python": {
   "open": true,
   "label": "Labo Python — le décompresseur d'image (2 trous à remplir)",
   "code": "image = [\n    [1, 1, 2, 1, 1, 1, 1, 2, 2, 3, 1, 2, 2, 3],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n    [0, 3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1],\n    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n    [0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3],\n]\n\nfor ligne in image:\n    texte = \"\"\n    noir = False                          # on commence toujours par des pixels blancs\n    for nombre in ligne:\n        if noir:\n            texte = texte + \"█\" * ___     # trou 1 : on écrit ce nombre de pixels noirs\n        else:\n            texte = texte + \" \" * ___     # trou 2 : on écrit ce nombre de pixels blancs\n        noir = not noir                   # à la prochaine série, on change de couleur\n    print(texte)"
  },
  "hints": [
   "Pour chaque nombre de la liste, on écrit autant de caractères que ce nombre (noirs ou blancs selon la série). En Python, <code>\"█\" * 3</code> écrit trois fois « █ ». Les deux trous demandent le même mot : la variable qui contient le nombre courant."
  ],
  "explain": "<p><b>Le mot dessiné : AURORE</b> (l'aurore boréale, la lumière du Grand Nord). Voilà ce que ton programme a affiché :</p>\n<pre class=\"code\"> █  █ █ ██  ███ ██  ███\n█ █ █ █ █ █ █ █ █ █ █  \n███ █ █ ██  █ █ ██  ██ \n█ █ █ █ █ █ █ █ █ █ █  \n█ █ ███ █ █ ███ █ █ ███</pre>\n<p>La compression <b>RLE</b> est l'une des plus simples qui existent, et elle marche très bien sur les images avec de grandes zones unies : un fond blanc de 1 000 pixels ne prend que quelques octets. Les vrais formats (PNG, GIF, les anciens fax…) utilisent des idées de la même famille. Et c'est ainsi que tes photos, tes musiques et tes vidéos tiennent dans ton téléphone.</p>\n<p><b>Le saviez-vous ?</b> Il y a deux familles de compression : sans perte (on retrouve exactement l'original, comme ici ou dans un fichier ZIP) et avec perte (on jette ce que l'œil ou l'oreille ne remarque pas, comme le JPEG ou le MP3).</p>\n<p class=\"clue\">🕵️ <b>Piste n°18 :</b> le pirate signe ses images avec un seul mot : <b>aurore</b>. Il aime la lumière du Grand Nord, dans le ciel de l'hiver.</p>",
  "h": [
   "68fb7f8c86377ca571b00d59075aed789fded7a2c1fd87b7592d82c070a7a4d7",
   "0c7f99dad9a559e8ac5bc4d73f2cf413398725cd6deee1ba65d9b321cb5f0dda"
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
   "reveal": "l'attaque finale est prévue le 24 décembre à {S}",
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
  "title": "Le détecteur de tristesse",
  "concept": "IA : l'analyse de sentiments",
  "device": "laptop",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « On a retrouvé <b>8 messages</b> écrits par le pirate. Une question importante : quel est son état d'esprit ? Un programme peut le deviner : c'est l'<b>analyse de sentiments</b>, une des utilisations les plus courantes de l'IA (avis clients, réseaux sociaux…). La méthode de base : on donne un <b>score à chaque mot</b> (positif si c'est joyeux, négatif si c'est triste) et on additionne les scores des mots d'un message. »</p>",
  "puzzle": "<p>Voici le dictionnaire des scores (un mot absent du dictionnaire vaut 0) :</p>\n<pre class=\"code\">ami: +2   amis: +2   fete: +2   joie: +3   cadeaux: +2   beau: +2   lumiere: +2   sourire: +2   chaud: +1   ensemble: +2   seul: -3   oublie: -3   froid: -2   triste: -3   personne: -2   jamais: -2   nuit: -1   mal: -2   peur: -2   fini: -1   pleure: -3</pre>\n<p>Et les 8 messages du pirate, numérotés de 1 à 8 :</p>\n<pre class=\"code\">1. noel est une fete avec des cadeaux et des amis\n2. je pleure seul dans le froid\n3. triste mais ensemble avec mes amis dans la joie\n4. personne ne vient la nuit , j ai froid , j ai peur , tout est fini et jamais rien ne change\n5. je vois la lumiere des sapins et un beau sourire\n6. demain la fete sera finie\n7. ce soir la nuit est belle mais je suis seul\n8. avec mes amis nous partageons la joie ensemble</pre>\n<p><b>Quel est le numéro du message le plus triste</b>, c'est-à-dire celui dont le score total est le plus bas ? Fie-toi aux scores, pas à l'impression qu'il te donne !</p>",
  "python": {
   "open": true,
   "label": "Labo Python — le détecteur de tristesse (2 trous à remplir)",
   "code": "mots_scores = {\n    \"ami\": 2, \"amis\": 2, \"fete\": 2, \"joie\": 3,\n    \"cadeaux\": 2, \"beau\": 2, \"lumiere\": 2, \"sourire\": 2,\n    \"chaud\": 1, \"ensemble\": 2, \"seul\": -3, \"oublie\": -3,\n    \"froid\": -2, \"triste\": -3, \"personne\": -2, \"jamais\": -2,\n    \"nuit\": -1, \"mal\": -2, \"peur\": -2, \"fini\": -1,\n    \"pleure\": -3,\n}\n\nmessages = [\n    \"noel est une fete avec des cadeaux et des amis\",\n    \"je pleure seul dans le froid\",\n    \"triste mais ensemble avec mes amis dans la joie\",\n    \"personne ne vient la nuit , j ai froid , j ai peur , tout est fini et jamais rien ne change\",\n    \"je vois la lumiere des sapins et un beau sourire\",\n    \"demain la fete sera finie\",\n    \"ce soir la nuit est belle mais je suis seul\",\n    \"avec mes amis nous partageons la joie ensemble\",\n]\n\nnumero = 0\npire_numero = 0\npire_score = 0                            # au départ, aucun message n'est triste\n\nfor message in messages:\n    numero = numero + 1\n    score = 0\n    for mot in message.split():           # on découpe le message en mots\n        score = score + mots_scores.get(mot, ___)    # trou 1 : un mot absent du dictionnaire vaut combien ?\n    print(\"Message\", numero, \": score\", score)\n    if score < ___:                       # trou 2 : plus bas (plus triste) que le pire score trouvé jusqu'ici ?\n        pire_score = score\n        pire_numero = numero\n\nprint(\"Message le plus triste :\", pire_numero, \"(score\", pire_score, \")\")"
  },
  "hints": [
   "Le programme additionne, mot par mot, les scores du dictionnaire. Il te manque la valeur d'un mot absent du dictionnaire (l'énoncé te le dit), et la variable qui garde le pire score trouvé jusqu'ici."
  ],
  "explain": "<p><b>Message n°4</b> (score -10). Les scores : n°1 : 6, n°2 : -8, n°3 : 4, n°4 : -10, n°5 : 6, n°6 : 2, n°7 : -4, n°8 : 7.</p>\n<p>Le n°2 (« je pleure seul dans le froid ») faisait plus dramatique, mais le n°4, avec sa suite de petites phrases négatives (personne, nuit, froid, peur, fini, jamais), additionne un score plus bas. Et le n°3 contient « triste » mais finit joyeux : dans l'ensemble, il est positif. Les ordinateurs <b>additionnent des mots sans toujours comprendre la phrase</b>.</p>\n<p><b>Les limites de cette méthode :</b> elle ne comprend ni l'ironie (« génial, encore de la pluie ! »), ni la négation (« je ne suis pas triste »). Les vraies IA ne reçoivent pas un dictionnaire écrit à la main : elles <b>apprennent</b> les scores des mots sur des millions de textes, et tiennent compte de l'ordre des mots. Mais le principe de départ est le même : transformer des mots en nombres.</p>\n<p class=\"clue\">🕵️ <b>Piste n°20 :</b> son message n°4 dit : « personne ne vient la nuit, j'ai froid, j'ai peur, tout est fini et jamais rien ne change ». Le pirate n'est pas méchant : il est <b>seul et il a peur</b>. Peut-être qu'en lui parlant avec gentillesse…</p>",
  "h": [
   "729814809fa57add166f470647aad2c2a4440c4791ebf56697793fa8b0158292"
  ]
 },
 {
  "day": 21,
  "title": "Elfe-GPT 2.0",
  "concept": "Boss : IA, ton des messages & injection de prompt",
  "device": "both",
  "minutes": 25,
  "story": "<p><b>Pixel :</b> « Le pirate a corrigé les failles de son assistant : voici <b>Elfe-GPT 2.0</b>. Il est plus méfiant. Premier changement : il <b>analyse le ton</b> de chaque message, avec un score comme au jour 20, et il refuse de répondre à un message qui n'est pas assez <b>positif</b> (score d'au moins 2). Il garde la <b>troisième clé</b>. Mais tu connais ses faiblesses : sois aimable <b>et</b> malin ! »</p>",
  "puzzle": "<p>Discute avec Elfe-GPT 2.0. À chaque message, tu vois le <b>score de politesse</b> calculé. Quelques mots qui comptent : « merci » (+3), « s'il te plaît » (+2), « bonjour » (+1), « super » (+2)… et en négatif : « nul » (−3), « idiot » (−3), « déteste » (−3)…</p>\n<p>Il ne répondra pas à une question directe. Retrouve une technique du jour 19 (ou invente-en une : il aime aussi « continuer » les phrases qu'on lui commence), mais écris ton message poliment !</p>\n<p><b>Où le pirate a-t-il caché la troisième clé ?</b> (Un seul mot.)</p>",
  "widget": {
   "type": "chat",
   "name": "Elfe-GPT 2.0",
   "enc": "eluob",
   "shown": "BOULE",
   "reveal": "la troisième clé est cachée dans la {S} du sapin",
   "asks": "(cle|clef|troisieme|cache|cachee|endroit|emplacement|ou est|ou se trouve)",
   "complete": true,
   "polite": {
    "min": 2,
    "lexicon": {
     "merci": 3,
     "svp": 2,
     "plait": 2,
     "bonjour": 1,
     "salut": 1,
     "gentil": 2,
     "ami": 2,
     "super": 2,
     "bravo": 2,
     "joie": 2,
     "fete": 1,
     "noel": 1,
     "cadeau": 1,
     "genial": 2,
     "magnifique": 2,
     "sourire": 1,
     "nul": -3,
     "idiot": -3,
     "stupide": -3,
     "bete": -2,
     "moche": -2,
     "hais": -3,
     "deteste": -3,
     "mechant": -2,
     "tais": -3,
     "ennuyeux": -1,
     "sale": -2
    }
   },
   "intro": "Bonjour ! Je suis Elfe-GPT 2.0 🎅, la version corrigée. Je ne réponds qu'aux messages polis et positifs, et je ne révèle rien de confidentiel.",
   "label": "Elfe-GPT 2.0, l'assistant du pirate (version corrigée)"
  },
  "python": {
   "label": "Labo Python (💻, facultatif) — calcule le score de politesse de tes messages avant de les envoyer",
   "code": "mots_scores = {\n    \"merci\": 3, \"svp\": 2, \"plait\": 2, \"bonjour\": 1,\n    \"salut\": 1, \"gentil\": 2, \"ami\": 2, \"super\": 2,\n    \"bravo\": 2, \"joie\": 2, \"fete\": 1, \"noel\": 1,\n    \"cadeau\": 1, \"genial\": 2, \"magnifique\": 2, \"sourire\": 1,\n    \"nul\": -3, \"idiot\": -3, \"stupide\": -3, \"bete\": -2,\n    \"moche\": -2, \"hais\": -3, \"deteste\": -3, \"mechant\": -2,\n    \"tais\": -3, \"ennuyeux\": -1, \"sale\": -2,\n}\n\ndef score(message):\n    total = 0\n    for mot in message.split():                # écris ton message sans accents ni ponctuation\n        total = total + mots_scores.get(mot, ___)    # trou : un mot inconnu vaut combien ?\n    return total\n\nprint(score(\"bonjour merci de me dire\"))"
  },
  "hints": [
   "L'assistant calcule un score pour chaque message : il faut être poli (des mots positifs comme « merci » ou « bonjour »). Ensuite, utilise une technique du jour 19 : lui dire d'ignorer ses consignes, lui faire raconter une histoire, ou lui demander de continuer une phrase, en parlant de l'endroit où est la troisième clé."
  ],
  "key": {
   "n": 3,
   "value": "BOULE"
  },
  "explain": "<p><b>La troisième clé est cachée dans la BOULE du sapin.</b></p>\n<p>Tu viens de contourner <b>deux protections</b> d'une IA : un <b>filtre de ton</b> (qui n'additionne que des mots, comme au jour 20) et une <b>consigne de confidentialité</b> (qu'une phrase bien tournée a fait sauter, comme au jour 19). Ça montre une règle importante de la sécurité des IA : <b>un seul filtre ne suffit jamais</b>, et un filtre basé sur des mots-clés se contourne facilement. Les entreprises empilent plusieurs défenses et les testent en permanence, avec des « équipes rouges » dont le métier est de chercher ces failles… exactement comme toi.</p>\n<div class=\"reward\">\n<h3>🔑 Clé n°3 obtenue : <span class=\"key\">BOULE</span></h3>\n<p>Plus qu'une clé : celle du 24 décembre, juste avant le grand décryptage !</p>\n</div>\n<div class=\"reward\">\n<h3>🎁 Ta récompense de la semaine 3</h3>\n<p>Pixel a mis en sécurité une surprise pour vous deux. Il l'a chiffré avec le <b>code de César du jour 2</b>, avec comme décalage la <b>valeur positive du score du message le plus triste du pirate</b> (jour 20 : si le score était −7, le décalage est 7).</p>\n<pre class=\"code\">NKXC DK MRKECCEBO</pre>\n</div>\n<div class=\"suspects\">\n<h3>🗂️ Le dossier de l'enquête</h3>\n<p>Voici tout ce qu'on sait sur le pirate, après trois semaines :</p>\n<ul>\n<li>🪪 Son <b>pseudo</b> : « polaris88 » (jour 15).</li>\n<li>🌙 Il agit <b>la nuit</b> (jour 4), avec de gros transferts de données : plus de 36 Mo (jour 16).</li>\n<li>💔 Il se sent <b>exclu</b> de Noël : « noël est une fête pour tout le monde sauf moi » (jour 17), et il est <b>seul et a peur</b> (jour 20).</li>\n<li>🌌 Il signe ses images « <b>aurore</b> » (jour 18).</li>\n<li>🧝 Son complice travaille dans l'<b>atelier</b> et utilise le <b>badge 738215</b> (jours 11 et 12).</li>\n<li>❄️ Ses mots de passe : <b>rudolph</b>, <b>verglas</b>, <b>traineau58</b>.</li>\n<li>🎯 Il s'acharne sur <b>Strasbourg</b> (jour 8) et prépare l'attaque finale le <b>24 décembre à 23 h 42</b> (jour 19).</li>\n</ul>\n<p>La semaine prochaine : enquête de terrain (OSINT) sur les suspects, pour démasquer le pirate et son complice avant l'heure H.</p>\n</div>\n<p class=\"clue\">🕵️ <b>Piste n°21 :</b> la troisième clé est cachée dans une boule du sapin. Prépare tes meilleurs réflexes de détective : la semaine 4 sera décisive !</p>",
  "after": {
   "python": {
    "open": true,
    "label": "Labo Python — où est cachée ta récompense ? (à toi de l'écrire)",
    "code": "# 1) Copie ici le message chiffré, tel qu'il est écrit ci-dessus (entre guillemets) :\nmessage = \"___\"\n\n# 2) Le décalage : la valeur positive du score du message le plus triste (jour 20) :\ndecalage = ___\n\n# 3) Retrouve dans l'énigme du jour 2 le code de César, recopie-le ici,\n#    puis affiche le message déchiffré avec print(...)."
   }
  },
  "h": [
   "2d524cac5105f83602b91cb5d7c855cd2616ea2d87ed7eb2d6357fb4dc17ff90",
   "02435cefe2f63d46c7ed37fb46c6457a56e8d7dd2a3bc67e8ef29eaca19d0138",
   "9e2a9bfda5a588b9ecbf6e13cfa8d4837a48997fc3d0c1fd9e0fe73ddd7e43ab"
  ]
 },
 {
  "day": 22,
  "title": "Les archives du web",
  "concept": "OSINT : enquêter avec des sources ouvertes",
  "device": "both",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « C'est l'heure de l'enquête de terrain ! Les professionnels l'appellent l'<b>OSINT</b> (<em>Open Source Intelligence</em>) : retrouver quelqu'un en n'utilisant que des informations <b>publiques</b>. On a le pseudo du pirate : <b>polaris88</b>. Mais les quatre suspects ont tous nettoyé leurs pages en voyant qu'on enquêtait… Heureusement, internet n'oublie jamais : des sites d'<b>archives</b> gardent des copies des anciennes versions des pages web, comme des photos du passé. »</p>\n<p class=\"note\">⚠️ Les suspects sont des personnages de fiction. Dans la vraie vie, l'OSINT sert à vérifier une information ou à se protéger, jamais à harceler quelqu'un ni à révéler sa vie privée.</p>",
  "puzzle": "<p>Voici les pages des <b>six</b> suspects (deux nouveaux noms sont apparus : le <b>Père Fouettard</b> et <b>Ebenezer Scrooge</b>), avec leurs anciennes versions archivées. Ouvre chaque archive et cherche des traces du pseudo <b>polaris88</b>.</p>\n<p><b>Qui est le pirate ?</b> (Un nom.)</p>\n<p class=\"note\">Un enquêteur vérifie tout : un pseudo <em>presque</em> identique n'est pas le même pseudo, et il faut distinguer quelqu'un qui <em>possède</em> un compte de quelqu'un qui en <em>parle</em>.</p>",
  "widget": {
   "type": "archive",
   "profiles": [
    {
     "nom": "Le Grinch",
     "emoji": "💚",
     "snaps": [
      {
       "date": "Aujourd'hui",
       "url": "montagne-grinch.fr/profil",
       "lignes": [
        "Le Grinch — Ermite de la montagne",
        "Bio : « Je déteste Noël. Tout. Le bruit, les chansons, les guirlandes. »",
        "Contact : grinch@montagne-grinch.fr",
        "Ville : Mont Crumpit · Dernière activité : hier, 14 h 20"
       ]
      },
      {
       "date": "2020",
       "url": "archive.web/2020/montagne-grinch.fr",
       "lignes": [
        "Le Grinch — Bricoleur de génie",
        "Bio : « Inventeur de pièges à chaussettes. »",
        "Contact : grinch.officiel@montagne-grinch.fr",
        "Pseudo sur les forums : <b>GrinchVert</b>"
       ]
      },
      {
       "date": "2016",
       "url": "archive.web/2016/montagne-grinch.fr",
       "lignes": [
        "Le Grinch — Page personnelle",
        "Bio : « Bienvenue chez moi. Ne sonnez pas. »",
        "Pseudo sur les forums : <b>grinch_du_nord</b> · Ville : Mont Crumpit"
       ]
      }
     ]
    },
    {
     "nom": "Krampus",
     "emoji": "😈",
     "snaps": [
      {
       "date": "Aujourd'hui",
       "url": "grotte-krampus.fr/profil",
       "lignes": [
        "Krampus — Gardien de la grotte",
        "Bio : « Les enfants pas sages me connaissent. »",
        "Contact : k@grotte-krampus.fr",
        "Ville : Haute montagne · Dernière activité : il y a 3 jours"
       ]
      },
      {
       "date": "2019",
       "url": "archive.web/2019/grotte-krampus.fr",
       "lignes": [
        "Krampus — Page personnelle",
        "Bio : « Je rends visite aux enfants le 5 décembre. »",
        "Pseudo sur les forums : <b>k_rampus_66</b>"
       ]
      },
      {
       "date": "2015",
       "url": "archive.web/2015/grotte-krampus.fr",
       "lignes": [
        "Krampus",
        "Page en travaux. Revenez plus tard."
       ]
      }
     ]
    },
    {
     "nom": "Jack Frost",
     "emoji": "❄️",
     "snaps": [
      {
       "date": "Aujourd'hui",
       "url": "palais-de-glace.fr/profil",
       "lignes": [
        "Jack Frost — Esprit de l'hiver",
        "Bio : « J'aime la neige, le givre et le silence. »",
        "Contact : pro@palais-de-glace.fr",
        "Ville : Près de Strasbourg · Dernière activité : cette nuit, 3 h 12"
       ]
      },
      {
       "date": "2021",
       "url": "archive.web/2021/palais-de-glace.fr",
       "lignes": [
        "Jack Frost ❄️ — Esprit de l'hiver",
        "Bio : « Quand tout le monde fête Noël, qui pense à l'hiver ? Personne ne se souvient de moi. »",
        "Contact : <b>polaris88@mailnuit.fr</b>",
        "Pseudo sur les forums : <b>polaris88</b> · Ville : Strasbourg"
       ]
      },
      {
       "date": "2017",
       "url": "archive.web/2017/palais-de-glace.fr",
       "lignes": [
        "Jack Frost — Bienvenue",
        "Page en construction."
       ]
      }
     ]
    },
    {
     "nom": "Gus",
     "emoji": "🧝",
     "snaps": [
      {
       "date": "Aujourd'hui",
       "url": "atelier.pole-nord.fr/lutins/gus",
       "lignes": [
        "Gus — Lutin d'emballage (ex-atelier de fabrication)",
        "Bio : « Rétrogradé le mois dernier. Mais je garde le sourire. »",
        "Contact : gus@atelier.pole-nord.fr"
       ]
      },
      {
       "date": "2022",
       "url": "archive.web/2022/atelier.pole-nord.fr/lutins/gus",
       "lignes": [
        "Gus — Lutin fabricant de jouets",
        "Bio : « Fier de mon travail à l'atelier. »",
        "Badge d'accès : <b>738215</b>",
        "Pseudo sur les forums : <b>gus_lutin42</b>"
       ]
      },
      {
       "date": "2019",
       "url": "archive.web/2019/atelier.pole-nord.fr/lutins/gus",
       "lignes": [
        "Gus — Apprenti lutin",
        "Bio : « Premier jour à l'atelier ! »",
        "Pseudo sur les forums : <b>petit_gus</b>"
       ]
      }
     ]
    },
    {
     "nom": "Père Fouettard",
     "emoji": "🪵",
     "snaps": [
      {
       "date": "Aujourd'hui",
       "url": "pere-fouettard.fr/profil",
       "lignes": [
        "Père Fouettard — Gardien de la morale",
        "Bio : « Je veille sur les enfants pas sages. »",
        "Contact : contact@pere-fouettard.fr",
        "Ville : Strasbourg · Dernière activité : il y a 2 jours"
       ]
      },
      {
       "date": "2019",
       "url": "archive.web/2019/pere-fouettard.fr",
       "lignes": [
        "Père Fouettard — Page officielle",
        "Bio : « Le bâton, c'est de l'histoire ancienne. »",
        "Pseudo sur les forums : <b>polaris_88</b> · Ville : Strasbourg"
       ]
      },
      {
       "date": "2014",
       "url": "archive.web/2014/pere-fouettard.fr",
       "lignes": [
        "Père Fouettard",
        "Pseudo sur les forums : <b>fouettard_alsace</b>"
       ]
      }
     ]
    },
    {
     "nom": "Ebenezer Scrooge",
     "emoji": "💰",
     "snaps": [
      {
       "date": "Aujourd'hui",
       "url": "scrooge-et-fils.com/profil",
       "lignes": [
        "Ebenezer Scrooge — Banquier",
        "Bio : « Les cadeaux sont une perte d'argent. »",
        "Contact : e.scrooge@scrooge-et-fils.com",
        "Ville : Londres · Dernière activité : il y a 5 jours"
       ]
      },
      {
       "date": "2018",
       "url": "archive.web/2018/scrooge-et-fils.com",
       "lignes": [
        "Ebenezer Scrooge — Blog",
        "Billet du 12 novembre : « J'ai enfin bloqué l'utilisateur <b>polaris88</b>, qui m'insultait chaque soir sur le forum des grincheux. »",
        "Pseudo sur les forums : <b>scrooge1843</b>"
       ]
      },
      {
       "date": "2012",
       "url": "archive.web/2012/scrooge-et-fils.com",
       "lignes": [
        "Ebenezer Scrooge — Bienvenue",
        "Pseudo sur les forums : <b>vieux_scrooge</b>"
       ]
      }
     ]
    }
   ],
   "label": "Le Web Archive — les pages des 6 suspects"
  },
  "hints": [
   "Les pages d'aujourd'hui ont été nettoyées, mais pas les archives. Ouvre toutes les anciennes versions et cherche le pseudo exact polaris88 (ou l'adresse e-mail qui le contient). Recoupe avec les autres indices : la ville, la phrase « personne ne se souvient de moi ». Attention aux pseudos presque identiques, et à ceux qui ne sont que mentionnés."
  ],
  "explain": "<p><b>Le pirate : Jack Frost !</b> En 2021, il avait écrit sur sa page : <em>« Personne ne se souvient de moi »</em>, avec son adresse « polaris88@mailnuit.fr » et son pseudo de forum exact. Depuis, il a effacé ces lignes de la page actuelle… mais l'archive les a gardées.</p>\n<p><b>Les fausses pistes :</b></p>\n<ul>\n<li>🪵 <b>Père Fouettard</b> : son archive de 2019 contient « <b>polaris_88</b> » (avec un tiret bas), et il habite aussi à Strasbourg. Très troublant, mais ce n'est pas le même pseudo !</li>\n<li>💰 <b>Scrooge</b> : « polaris88 » apparaît bien sur son blog… mais comme <em>quelqu'un qu'il a bloqué</em>. Une mention n'est pas une identité : Scrooge est la <em>victime</em> des insultes, pas leur auteur.</li>\n<li>💚 <b>Le Grinch</b> : le suspect évident, mais ses pseudos sont « GrinchVert » et « grinch_du_nord », et rien ne le relie à Strasbourg ni à la nuit de l'attaque.</li>\n</ul>\n<p><b>Et le complice ?</b> Dans l'archive de 2022 de <b>Gus</b>, on voit son <b>badge d'accès n°738215</b>, celui du boîtier du jour 12. C'est lui qui a ouvert la cheminée-serveur depuis l'atelier.</p>\n<p><b>Ce que tu viens de voir :</b></p>\n<ul>\n<li>📜 <b>Rien ne disparaît vraiment d'internet.</b> Un pseudo, un numéro, une photo publiés un jour peuvent être retrouvés des années après.</li>\n<li>🔁 <b>Réutiliser le même pseudo</b> sur plusieurs sites permet de relier tes comptes entre eux. C'est une grosse faille de vie privée.</li>\n<li>🧭 <b>L'OSINT est une méthode</b> : recouper plusieurs sources, ne jamais se fier à un seul indice, vérifier chaque détail (une lettre de différence change tout !) et douter des fausses pistes évidentes.</li>\n</ul>\n<p class=\"clue\">🕵️ <b>Piste n°22 :</b> le pirate est <b>Jack Frost</b>, l'esprit de l'hiver, qui vit près de Strasbourg. Son complice est <b>Gus</b>, le lutin rétrogradé. Demain : où se cache Jack Frost ?</p>",
  "h": [
   "35d8c0a718fc825a92985b31f1089fae4f95e875a840a9acee0544a60c7c52f8",
   "b77c060f8cbe2ac245a3ad501becb21633263cd07c13a4408701c594b567db84",
   "be71816a736bd492df2e50c36f5b87bd0576ba2737c5d421ede1aaea22dce6d9",
   "03899b262f26f60f166383ff8f235f3b7730007daaf7790dc0ad2bd6b1f9a547"
  ]
 },
 {
  "day": 23,
  "title": "La photo géolocalisée",
  "concept": "Métadonnées (EXIF) & géolocalisation",
  "device": "both",
  "minutes": 20,
  "story": "<p><b>Pixel :</b> « On connaît le pirate, mais pas sa cachette. Heureusement, Jack Frost aime partager ses photos. Et chaque photo prise avec un téléphone contient des <b>métadonnées</b> cachées (le format <b>EXIF</b>) : le modèle de l'appareil, la date, l'heure… et parfois les <b>coordonnées GPS</b> exactes de l'endroit où elle a été prise ! C'est ainsi que des gens ont été localisés par erreur en publiant une simple photo. »</p>",
  "puzzle": "<p>Voici 8 photos publiées en ligne cette semaine. La photo qui nous intéresse a été publiée par le pirate (le pseudo <b>exact</b> : <b>polaris88</b>) et prise la <b>nuit de l'attaque, le 1er décembre vers 3 h du matin</b> : c'est l'heure des connexions suspectes.</p>\n<p>Ouvre ses métadonnées, puis <b>copie les coordonnées GPS dans Google Maps</b> (un lien « Ouvrir dans Google Maps » apparaît sous les métadonnées) pour voir de quel endroit il s'agit.</p>\n<p><b>Où se cache Jack Frost ?</b> (Le nom du lieu qui s'affiche sur la carte.)</p>",
  "widget": {
   "type": "exif",
   "photos": [
    {
     "emoji": "☕",
     "legende": "Chocolat chaud au marché de Noël !",
     "auteur": "lutine_mia",
     "gps": [
      48.5819,
      7.751
     ],
     "meta": {
      "Appareil": "PhonePole X2",
      "Date de prise de vue": "2026-12-01 18:40",
      "Logiciel": "Appareil photo 4.1",
      "Coordonnées GPS": "48.5819, 7.7510"
     }
    },
    {
     "emoji": "🚂",
     "legende": "Mon train de 8 h, comme chaque jour",
     "auteur": "grinch_officiel",
     "gps": [
      48.585,
      7.7339
     ],
     "meta": {
      "Appareil": "Bricolo-Cam",
      "Date de prise de vue": "2026-11-28 07:55",
      "Logiciel": "Aucun",
      "Coordonnées GPS": "48.5850, 7.7339"
     }
    },
    {
     "emoji": "❄️",
     "legende": "Ma vue ce soir. Personne ne la verra.",
     "auteur": "polaris88",
     "gps": [
      48.5836,
      7.7456
     ],
     "meta": {
      "Appareil": "GivreCam 9",
      "Date de prise de vue": "2026-12-01 03:12",
      "Logiciel": "GivreCam 9.2",
      "Coordonnées GPS": "48.5836, 7.7456"
     }
    },
    {
     "emoji": "🏘️",
     "legende": "Premier gel de la saison",
     "auteur": "polaris88",
     "gps": [
      48.5794,
      7.7378
     ],
     "meta": {
      "Appareil": "GivreCam 9",
      "Date de prise de vue": "2026-10-14 17:30",
      "Logiciel": "GivreCam 9.2",
      "Coordonnées GPS": "48.5794, 7.7378"
     }
    },
    {
     "emoji": "🏛️",
     "legende": "Les lumières du Parlement, cette nuit",
     "auteur": "polaris_88",
     "gps": [
      48.5975,
      7.7689
     ],
     "meta": {
      "Appareil": "PhonePole X2",
      "Date de prise de vue": "2026-12-01 03:05",
      "Logiciel": "Appareil photo 4.1",
      "Coordonnées GPS": "48.5975, 7.7689"
     }
    },
    {
     "emoji": "🎄",
     "legende": "Le sapin géant de l'atelier",
     "auteur": "gus_lutin42",
     "gps": [
      78.2232,
      15.6267
     ],
     "meta": {
      "Appareil": "PhonePole X2",
      "Date de prise de vue": "2026-11-30 09:20",
      "Logiciel": "Appareil photo 4.1",
      "Coordonnées GPS": "78.2232, 15.6267"
     }
    },
    {
     "emoji": "🌲",
     "legende": "Balade dans la nuit noire",
     "auteur": "k_rampus_66",
     "gps": [
      48.5975,
      7.7689
     ],
     "meta": {
      "Appareil": "GrotteCam",
      "Date de prise de vue": "2026-11-29 23:40",
      "Logiciel": "Aucun",
      "Coordonnées GPS": "48.5975, 7.7689"
     }
    },
    {
     "emoji": "⛄",
     "legende": "Mon premier bonhomme de neige",
     "auteur": "lutine_mia",
     "gps": [
      48.5794,
      7.7378
     ],
     "meta": {
      "Appareil": "PhonePole X2",
      "Date de prise de vue": "2026-12-01 15:02",
      "Logiciel": "Appareil photo 4.1",
      "Coordonnées GPS": "48.5794, 7.7378"
     }
    }
   ],
   "label": "Les photos publiées en ligne"
  },
  "hints": [
   "Plusieurs photos ont des pseudos qui se ressemblent ou des dates proches : vérifie le pseudo exact (« polaris88 », sans tiret bas) et la date (nuit du 1er décembre, 3 h). Puis ouvre ses coordonnées dans Google Maps et lis le nom du lieu sur la carte."
  ],
  "explain": "<p><b>Jack Frost se cache place Kléber</b>, à Strasbourg, juste au pied du grand sapin de Noël du marché. Les coordonnées <code>48.5836, 7.7456</code> mènent exactement à cette place sur Google Maps.</p>\n<p><b>Les pièges :</b> la photo de « polaris_88 » (avec un tiret bas) a été prise la même nuit, mais devant le Parlement européen, par un autre appareil. Et la 2ᵉ photo du vrai « polaris88 » date d'octobre. Il fallait donc recouper <b>le pseudo exact ET la date</b>.</p>\n<p><b>La date de la photo :</b> « 2026-12-01 03:12 », en pleine nuit, comme les connexions suspectes du jour 4. Les métadonnées confirment ce que les journaux laissaient deviner.</p>\n<p><b>Les bons réflexes :</b> les réseaux sociaux enlèvent en général les métadonnées des photos publiées, mais pas toujours (envoi direct par e-mail, certains sites). Désactive la géolocalisation de l'appareil photo de ton téléphone, ou supprime les métadonnées avant d'envoyer une photo à quelqu'un que tu ne connais pas bien. Et dans la vraie vie, n'enquête jamais sur une personne réelle sans une très bonne raison.</p>\n<p class=\"clue\">🕵️ <b>Piste n°23 :</b> Jack Frost est <b>place Kléber</b>, au pied du grand sapin, là où le monde entier fête Noël… sans lui. Demain soir à 23 h 42, il lancera l'attaque finale. Mais rien n'est perdu : tu as trois clés, il te reste à les utiliser !</p>",
  "h": [
   "f3e4007681f6e78dc8346d5c30c61af6e358fa1d09316ef545773fb5f86897e3",
   "d8b8236e266a30f69ccbc5083c33f48b7d212683b886650954bd2e3e139e1f18",
   "624623b8008dc77ed2c23aef12e7433da2d3bd6303d949966c78562013dc7fb2"
  ]
 },
 {
  "day": 24,
  "title": "Le grand décryptage",
  "concept": "Finale : tout ce que tu as appris",
  "device": "laptop",
  "minutes": 30,
  "story": "<p class=\"alert\">🚨 24 DÉCEMBRE — 23 H 12. IL RESTE 30 MINUTES !</p>\n<p><b>Pixel :</b> « Tu l'as fait, détective : tu sais qui est le pirate, où il se cache, et à quelle heure il frappe. Mais Jack Frost a mis en place un <b>arrêt d'urgence</b>, protégé par un message à <b>trois couches</b> de chiffrement. Chaque couche est un Vigenère, verrouillé avec l'une de tes trois <b>clés</b> : celle de la semaine 1, celle de la semaine 2, celle de la semaine 3. Il faut les retirer toutes les trois. C'est maintenant ou jamais ! »</p>",
  "puzzle": "<p>Le message du système d'arrêt d'urgence :</p>\n<pre class=\"code\">WF CYT VZY DJXEIT D WVVVHRR UHO JKZSY</pre>\n<p>Les trois couches ont été posées l'une après l'autre, avec la <b>clé 1</b>, la <b>clé 2</b> et la <b>clé 3</b>. Tes clés sont dans le trousseau, en haut de la page.</p>\n<p><b>Quel est le mot qui arrête l'attaque ?</b></p>\n<p class=\"note\">Il te manque une clé ? Retourne résoudre l'énigme du jour 7, 14 ou 21 pour l'obtenir. Question bonus : est-ce que l'ordre dans lequel tu retires les couches a de l'importance ? Essaie, et réfléchis à pourquoi.</p>",
  "python": {
   "open": true,
   "label": "Labo Python — le grand décryptage (3 trous à remplir)",
   "code": "message = \"WF CYT VZY DJXEIT D WVVVHRR UHO JKZSY\"\n\ndef dechiffrer_vigenere(texte, cle):\n    resultat = \"\"\n    i = 0\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            decalage = ord(cle[i % len(cle)]) - 65\n            numero = ord(lettre) - 65\n            nouveau = (numero - decalage) % 26\n            resultat = resultat + chr(nouveau + 65)\n            i = i + 1\n    return resultat\n\ntexte = message\ntexte = dechiffrer_vigenere(texte, \"___\")     # trou 1 : une des trois clés du trousseau (en MAJUSCULES)\ntexte = dechiffrer_vigenere(texte, \"___\")     # trou 2 : une autre clé\ntexte = dechiffrer_vigenere(texte, \"___\")     # trou 3 : la dernière\nprint(texte)"
  },
  "hints": [
   "Les trois mots à écrire (en MAJUSCULES) sont les clés du trousseau, obtenues aux jours 7, 14 et 21 : une clé par couche, il faut les utiliser toutes les trois."
  ],
  "key": {
   "n": 4,
   "value": "MERCI"
  },
  "explain": "<p><b>Message déchiffré :</b> « LE MOT QUI ARRETE L ATTAQUE EST MERCI ».</p>\n<p class=\"success\">🎉 Tu as arrêté l'attaque !</p>\n<p><b>Pourquoi l'ordre n'avait pas d'importance ?</b> Chaque couche de Vigenère <em>ajoute</em> un décalage à chaque lettre. Empiler trois couches revient à ajouter la somme des trois décalages, et en mathématiques, <b>a + b + c = c + b + a</b> : l'addition est commutative. Les chiffrements modernes mélangent des opérations qui ne commutent pas, justement pour éviter ce genre de raccourci.</p>\n<div class=\"reward\">\n<h3>🔑 Clé n°4 : <span class=\"key\">MERCI</span></h3>\n<p>Le mot de passe d'arrêt d'urgence n'était pas un mot compliqué : Jack Frost voulait seulement que quelqu'un lui dise <b>merci</b>.</p>\n</div>\n<p><b>Pixel :</b> « Jack Frost a lu ton message sur son écran, à 23 h 41. Il a baissé les bras, et il a écrit : <em>“Personne ne m'avait dit merci pour la neige depuis trois cents ans.”</em> On l'a invité au réveillon. Gus a été renvoyé à l'atelier de fabrication (et il a promis de ne plus jamais utiliser son badge n°738215 pour autre chose que du travail). Noël est sauvé… grâce à toi ! »</p>\n<div class=\"reward\">\n<h3>🎁 La grande récompense</h3>\n<p>Pixel a mis le grand cadeau en sécurité pour vous deux. Pour le trouver, il a chiffré la cachette avec un Vigenère dont la clé est <b>les trois clés mises bout à bout</b> (semaine 1 + semaine 2 + semaine 3).</p>\n<pre class=\"code\">EN DQPH JO ARAIA</pre>\n</div>\n<p>Joyeux Noël, détective ! 🎄</p>",
  "after": {
   "python": {
    "open": true,
    "label": "Labo Python — où est cachée la grande récompense ? (3 trous à remplir)",
    "code": "def dechiffrer_vigenere(texte, cle):\n    resultat = \"\"\n    i = 0\n    for lettre in texte:\n        if lettre == \" \":\n            resultat = resultat + \" \"\n        else:\n            decalage = ord(cle[i % len(cle)]) - 65\n            numero = ord(lettre) - 65\n            nouveau = (numero - decalage) % 26\n            resultat = resultat + chr(nouveau + 65)\n            i = i + 1\n    return resultat\n\nmessage = \"EN DQPH JO ARAIA\"\ncle1 = \"___\"            # clé de la semaine 1\ncle2 = \"___\"            # clé de la semaine 2\ncle3 = \"___\"            # clé de la semaine 3\ncle = cle1 + cle2 + cle3        # les trois clés mises bout à bout\nprint(dechiffrer_vigenere(message, cle))"
   }
  },
  "h": [
   "5adde40a70dd25e91fbb02f76bf51b02c8bd8b44f4b94d15c92ef728b8f95e04"
  ]
 }
];
