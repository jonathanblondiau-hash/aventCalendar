// FICHIER GÉNÉRÉ par tools/generate.mjs — ne pas modifier à la main.
window.DAYS = [
 {
  "day": 1,
  "title": "Le message des lutins",
  "concept": "Binaire & ASCII",
  "device": "both",
  "minutes": 10,
  "story": "<p><b>Pixel, lutin informaticien :</b> « Au secours ! Le serveur central du Pôle Nord est tombé en panne, et le Père Noël ne peut plus lire ses propres listes. Tout ce qui nous reste, c'est un message arrivé par la porte n°1. Les ordinateurs ne parlent qu'une langue : des <b>0</b> et des <b>1</b>. Peux-tu m'aider à la comprendre ? »</p>",
  "puzzle": "<p>Chaque groupe de 8 chiffres (un <b>octet</b>) est un nombre écrit en <b>binaire</b>, et chaque nombre correspond à une lettre (table ASCII : A = 65, B = 66, C = 67…).</p>\n<pre class=\"code\">01010011 01000001 01010000 01001001 01001110</pre>\n<p><b>Quel est le mot caché ?</b></p>",
  "widget": {
   "type": "bits",
   "label": "Calculette binaire — clique sur les bits pour les allumer"
  },
  "python": {
   "label": "Labo Python (💻 Chromebook) — facultatif mais malin",
   "code": "print(ord(\"A\"))      # le nombre caché derrière la lettre A\nprint(bin(65))       # ce nombre écrit en binaire\nprint(chr(___))      # remplace ___ par 83 : quelle lettre obtiens-tu ?"
  },
  "hints": [
   "Un octet se lit de droite à gauche : les positions valent 1, 2, 4, 8, 16, 32, 64 et 128. Ajoute les valeurs là où il y a un « 1 ».",
   "Utilise la calculette : allume les bits du premier groupe. Tu dois obtenir un nombre entre 65 et 90, ce sont les lettres majuscules.",
   "Le premier octet vaut 83. Dans l'alphabet, 65 = A, donc 83 = A + 18, c'est la 19ᵉ lettre : « S ». Continue avec les 4 autres !"
  ],
  "explain": "<p><b>Bravo !</b> Ton ordinateur stocke <em>tout</em> sous forme de nombres : les lettres, les images, la musique… Pour les lettres, il utilise un tableau de correspondance appelé <b>ASCII</b> (inventé dans les années 1960). Aujourd'hui, le standard <b>Unicode</b> va beaucoup plus loin : l'émoji 🎄 est le nombre 127 876 !</p>\n<p><b>Le saviez-vous ?</b> Un octet peut prendre 2⁸ = 256 valeurs. Ton téléphone manipule des milliards de ces octets, sans jamais se tromper.</p>",
  "h": "82e8714d5d7e8cae6d3886d6f45a44083427098973b1cac8a687b6ff7a109b21"
 },
 {
  "day": 2,
  "title": "Le code de César",
  "concept": "Cryptographie & boucles",
  "device": "both",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Bien joué pour le binaire ! Mais j'ai un nouveau problème : le Grinch espionne nos messages. Alors on les chiffre, comme le faisait déjà Jules César il y a 2 000 ans : chaque lettre est <b>décalée</b> dans l'alphabet. Voici le dernier message de la hotte… »</p>",
  "puzzle": "<p>Chaque lettre a été décalée de la même quantité dans l'alphabet (A→F, B→G, etc. pour un décalage de 5, par exemple). Retrouve le décalage et lis le message.</p>\n<pre class=\"code\">QJ RTY IJ UFXXJ JXY WJSSJ</pre>\n<p><b>Quel est le mot de passe (le dernier mot de la phrase) ?</b></p>",
  "widget": {
   "type": "cesar",
   "text": "QJ RTY IJ UFXXJ JXY WJSSJ"
  },
  "python": {
   "label": "Labo Python (💻) — le même déchiffrement, par un programme",
   "code": "message = \"QJ RTY IJ UFXXJ JXY WJSSJ\"\ndecalage = ___        # essaie un nombre entre 1 et 25\n\nresultat = \"\"\nfor lettre in message:\n    if lettre == \" \":\n        resultat = resultat + \" \"\n    else:\n        numero = ord(lettre) - 65            # A=0, B=1, ... Z=25\n        nouveau = (numero - decalage) % 26   # on recule, et on revient à Z après A\n        resultat = resultat + chr(nouveau + 65)\n\nprint(resultat)"
  },
  "hints": [
   "Dans une phrase en français, il y a souvent le petit mot « LE ». Ici, que vaut « QJ » ? Quel décalage transforme QJ en LE ?",
   "Avec la roue ou le curseur, essaie les décalages un par un jusqu'à ce qu'une phrase lisible apparaisse. Il n'y a que 25 possibilités !",
   "Le décalage est 5. Le message se termine par le mot de passe, en un seul mot."
  ],
  "explain": "<p><b>Message déchiffré :</b> « LE MOT DE PASSE EST RENNE ».</p>\n<p>Le chiffre de César n'a que <b>25 clés possibles</b> : un ordinateur les teste toutes en une fraction de seconde. C'est ce qu'on appelle une attaque par <b>force brute</b>. Les chiffres modernes (ceux qui protègent ta banque ou tes messages) ont des clés tellement grandes qu'il faudrait des milliards d'années pour les essayer toutes.</p>\n<p><b>Le saviez-vous ?</b> Au IXᵉ siècle, le savant arabe Al-Kindi a trouvé une méthode plus maligne : compter les lettres. Dans un texte français, le « E » est la lettre la plus fréquente. Si ton message chiffré a beaucoup de « J », il y a de bonnes chances que « J » représente « E » !</p>",
  "h": "3c7d5e4bd91593ab57b3208e0bf2c4598b937736148e11314e8f001561082036"
 },
 {
  "day": 3,
  "title": "La hotte déborde",
  "concept": "Variables & calculs en Python",
  "device": "laptop",
  "minutes": 15,
  "story": "<p><b>Pixel :</b> « Le compteur de cadeaux de la hotte est complètement détraqué. Voici le programme qui le pilote. Avant de l'exécuter, <b>réfléchis</b> : quelle valeur va-t-il afficher ? C'est exactement ce que doit faire un programmeur : prévoir ce que fera son code. »</p>",
  "puzzle": "<p>Voici un petit programme Python. Une <b>variable</b> est une boîte qui porte un nom et qui contient une valeur ; on peut la modifier au fil du programme.</p>\n<pre class=\"code\">lutins = 12\npar_lutin = 7\ncadeaux = lutins * par_lutin\ncadeaux = cadeaux - 9\ncadeaux = cadeaux // 5\ndefauts = cadeaux % 4\ncadeaux = cadeaux + defauts * 10\nprint(cadeaux)</pre>\n<p><b>Quel nombre ce programme affiche-t-il ?</b> Fais le calcul ligne par ligne, puis vérifie dans le labo si tu veux.</p>\n<p class=\"note\">Deux symboles nouveaux : <code>//</code> est la <b>division entière</b> (on garde seulement la partie entière du résultat) et <code>%</code> est le <b>modulo</b> (le reste de la division).</p>",
  "python": {
   "label": "Labo Python — comprends « // » et « % » avant de résoudre",
   "code": "print(17 / 5)     # division normale\nprint(17 // 5)    # division entière : combien de fois 5 « rentre » dans 17 ?\nprint(17 % 5)     # modulo : ce qui reste après cette division\n\nreste = 23 ___ 4  # remplace ___ pour que reste vaille 3\nprint(reste)\n\n# Ton tour : recopie ici le programme de l'énoncé et regarde ce qu'il affiche !"
  },
  "hints": [
   "Avance ligne par ligne en notant la valeur de « cadeaux » après chaque ligne. Commence par 12 × 7.",
   "Après la 4ᵉ ligne, cadeaux vaut 75. Ensuite 75 // 5, puis défauts = ce nombre % 4.",
   "cadeaux = 15, donc défauts = 15 % 4 = 3. La dernière ligne ajoute 3 × 10 à 15."
  ],
  "explain": "<p><b>Réponse : 45.</b> Tu viens de faire ce que fait un ordinateur : exécuter des instructions <em>dans l'ordre</em>, en gardant en mémoire des variables.</p>\n<p>Le modulo <code>%</code> est partout : pour savoir si un nombre est pair (<code>n % 2 == 0</code>), pour faire tourner une horloge (<code>heure % 24</code>), et même… dans le chiffre de César que tu as utilisé hier !</p>\n<p><b>Le saviez-vous ?</b> Python porte le nom de la troupe comique des <em>Monty Python</em>, pas du serpent. Son créateur, Guido van Rossum, adorait leurs sketchs.</p>",
  "h": "4368fe93a6624296265e3dc44864485f4a236dd9709fd15c44375cad7b28e301"
 }
];
