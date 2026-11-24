// Génère js/days.js (réponses hachées) et parents/SOLUTIONS.md à partir du contenu ci-dessous.
// Usage : node tools/generate.mjs
// Pour ajouter un jour : ajouter un objet dans DAYS (avec la réponse en clair), puis relancer ce script.
import { createHash } from 'node:crypto';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Même normalisation que dans js/app.js : minuscules, sans accents, sans espaces ni ponctuation.
const normalize = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const hash = (day, answer) =>
  createHash('sha256').update(`${day}:${normalize(answer)}`).digest('hex');

const bin = (s) => [...s].map((c) => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
const caesar = (s, k) =>
  [...s].map((c) => (/[A-Z]/.test(c) ? String.fromCharCode(((c.charCodeAt(0) - 65 + k) % 26) + 65) : c)).join('');

// ---------- Jour 1 : binaire ----------
const MOT1 = 'SAPIN';

// ---------- Jour 2 : César ----------
const DECALAGE = 5;
const CLAIR2 = 'LE MOT DE PASSE EST RENNE';
const CHIFFRE2 = caesar(CLAIR2, DECALAGE);

// ---------- Jour 3 : variables ----------
const lutins = 12, parLutin = 7;
let cadeaux = lutins * parLutin;
cadeaux = cadeaux - 9;
cadeaux = Math.floor(cadeaux / 5);
const defauts = cadeaux % 4;
cadeaux = cadeaux + defauts * 10;
const REP3 = String(cadeaux); // 45

const DAYS = [
  {
    day: 1,
    title: 'Le message des lutins',
    concept: 'Binaire & ASCII',
    device: 'both',
    minutes: 10,
    story: `<p class="alert">🚨 ALERTE CYBERATTAQUE — Pôle Nord, 1er décembre, 6 h 12</p>
<p><b>Pixel, lutin informaticien :</b> « Ce matin, tous les écrans de l'atelier se sont éteints ! Quelqu'un est entré dans le serveur du Père Noël : la liste des enfants sages, la carte du traîneau… tout est verrouillé. Le pirate n'a laissé qu'une seule trace dans les journaux du système, écrite en <b>0</b> et en <b>1</b>, la seule langue que comprennent les ordinateurs. Aide-moi à la lire, détective ! »</p>`,
    puzzle: `<p>Chaque groupe de 8 chiffres (un <b>octet</b>) est un nombre écrit en <b>binaire</b>, et chaque nombre correspond à une lettre (table ASCII : A = 65, B = 66, C = 67…).</p>
<pre class="code">${bin(MOT1)}</pre>
<p><b>Quel est le mot caché ?</b> (C'est le nom du dossier où le pirate range ses outils.)</p>`,
    widget: { type: 'bits', label: 'Calculette binaire — clique sur les bits pour les allumer' },
    python: {
      label: 'Labo Python (💻 Chromebook) — facultatif mais malin',
      code: [
        'print(ord("A"))      # le nombre caché derrière la lettre A',
        'print(bin(65))       # ce nombre écrit en binaire',
        'print(chr(___))      # remplace ___ par 83 : quelle lettre obtiens-tu ?',
      ].join('\n'),
    },
    hints: [
      'Un octet se lit de droite à gauche : les positions valent 1, 2, 4, 8, 16, 32, 64 et 128. Ajoute les valeurs là où il y a un « 1 ».',
      'Utilise la calculette : allume les bits du premier groupe. Tu dois obtenir un nombre entre 65 et 90, ce sont les lettres majuscules.',
      'Le premier octet vaut 83. Dans l\'alphabet, 65 = A, donc 83 = A + 18, c\'est la 19ᵉ lettre : « S ». Continue avec les 4 autres !',
    ],
    answer: MOT1,
    explain: `<p><b>Bravo !</b> Ton ordinateur stocke <em>tout</em> sous forme de nombres : les lettres, les images, la musique… Pour les lettres, il utilise un tableau de correspondance appelé <b>ASCII</b> (inventé dans les années 1960). Aujourd'hui, le standard <b>Unicode</b> va beaucoup plus loin : l'émoji 🎄 est le nombre 127 876 !</p>
<p class="clue">🕵️ <b>Piste n°1 :</b> le pirate se cache dans un dossier nommé « sapin ». Demain, on y entre.</p>
<p><b>Le saviez-vous ?</b> Un octet peut prendre 2⁸ = 256 valeurs. Ton téléphone manipule des milliards de ces octets, sans jamais se tromper.</p>`,
  },
  {
    day: 2,
    title: 'Le code de César',
    concept: 'Cryptographie & boucles',
    device: 'both',
    minutes: 15,
    story: `<p><b>Pixel :</b> « Le dossier « sapin » existait bien ! Il contient un seul fichier : un message que le pirate envoie à un complice. Mais il l'a <b>chiffré</b>, comme le faisait déjà Jules César il y a 2 000 ans : chaque lettre est <b>décalée</b> dans l'alphabet. À toi de le casser ! »</p>`,
    puzzle: `<p>Chaque lettre a été décalée de la même quantité dans l'alphabet (A→F, B→G, etc. pour un décalage de 5, par exemple). Retrouve le décalage et lis le message.</p>
<pre class="code">${CHIFFRE2}</pre>
<p><b>Quel est le mot de passe du pirate (le dernier mot de la phrase) ?</b></p>`,
    widget: { type: 'cesar', text: CHIFFRE2 },
    python: {
      label: 'Labo Python (💻) — le même déchiffrement, par un programme',
      code: [
        `message = "${CHIFFRE2}"`,
        'decalage = ___        # essaie un nombre entre 1 et 25',
        '',
        'resultat = ""',
        'for lettre in message:',
        '    if lettre == " ":',
        '        resultat = resultat + " "',
        '    else:',
        '        numero = ord(lettre) - 65            # A=0, B=1, ... Z=25',
        '        nouveau = (numero - decalage) % 26   # on recule, et on revient à Z après A',
        '        resultat = resultat + chr(nouveau + 65)',
        '',
        'print(resultat)',
      ].join('\n'),
    },
    hints: [
      'Dans une phrase en français, il y a souvent le petit mot « LE ». Ici, que vaut « QJ » ? Quel décalage transforme QJ en LE ?',
      'Avec la roue ou le curseur, essaie les décalages un par un jusqu\'à ce qu\'une phrase lisible apparaisse. Il n\'y a que 25 possibilités !',
      `Le décalage est ${DECALAGE}. Le message se termine par le mot de passe, en un seul mot.`,
    ],
    answer: 'renne',
    explain: `<p><b>Message déchiffré :</b> « ${CLAIR2} ».</p>
<p>Le chiffre de César n'a que <b>25 clés possibles</b> : un ordinateur les teste toutes en une fraction de seconde. C'est ce qu'on appelle une attaque par <b>force brute</b>. Les chiffres modernes (ceux qui protègent ta banque ou tes messages) ont des clés tellement grandes qu'il faudrait des milliards d'années pour les essayer toutes.</p>
<p><b>Le saviez-vous ?</b> Au IXᵉ siècle, le savant arabe Al-Kindi a trouvé une méthode plus maligne : compter les lettres. Dans un texte français, le « E » est la lettre la plus fréquente. Si ton message chiffré a beaucoup de « J », il y a de bonnes chances que « J » représente « E » !</p>
<p class="clue">🕵️ <b>Piste n°2 :</b> le mot de passe du pirate est « renne ». Il va nous ouvrir le programme qu'il a lancé sur la hotte…</p>`,
  },
  {
    day: 3,
    title: 'La hotte déborde',
    concept: 'Variables & calculs en Python',
    device: 'laptop',
    minutes: 15,
    story: `<p><b>Pixel :</b> « Grâce au mot de passe « renne », on a pu ouvrir le programme que le pirate a lancé sur la hotte du traîneau ! C'est un <b>script de sabotage</b>. Un bon enquêteur ne l'exécute jamais à l'aveugle : il le <b>lit</b> et il prévoit ce qu'il va faire. Combien de cadeaux ce script va-t-il faire disparaître ? »</p>`,
    puzzle: `<p>Voici un petit programme Python. Une <b>variable</b> est une boîte qui porte un nom et qui contient une valeur ; on peut la modifier au fil du programme.</p>
<pre class="code">lutins = 12
par_lutin = 7
cadeaux = lutins * par_lutin
cadeaux = cadeaux - 9
cadeaux = cadeaux // 5
defauts = cadeaux % 4
cadeaux = cadeaux + defauts * 10
print(cadeaux)</pre>
<p><b>Quel nombre ce programme affiche-t-il ?</b> C'est le nombre de cadeaux volés. Fais le calcul ligne par ligne, puis vérifie dans le labo si tu veux.</p>
<p class="note">Deux symboles nouveaux : <code>//</code> est la <b>division entière</b> (on garde seulement la partie entière du résultat) et <code>%</code> est le <b>modulo</b> (le reste de la division).</p>`,
    python: {
      label: 'Labo Python — comprends « // » et « % » avant de résoudre',
      code: [
        'print(17 / 5)     # division normale',
        'print(17 // 5)    # division entière : combien de fois 5 « rentre » dans 17 ?',
        'print(17 % 5)     # modulo : ce qui reste après cette division',
        '',
        'reste = 23 ___ 4  # remplace ___ pour que reste vaille 3',
        'print(reste)',
        '',
        '# Ton tour : recopie ici le programme de l\'énoncé et regarde ce qu\'il affiche !',
      ].join('\n'),
    },
    hints: [
      'Avance ligne par ligne en notant la valeur de « cadeaux » après chaque ligne. Commence par 12 × 7.',
      'Après la 4ᵉ ligne, cadeaux vaut 75. Ensuite 75 // 5, puis défauts = ce nombre % 4.',
      'cadeaux = 15, donc défauts = 15 % 4 = 3. La dernière ligne ajoute 3 × 10 à 15.',
    ],
    answer: REP3,
    explain: `<p><b>Réponse : ${REP3}.</b> Tu viens de faire ce que fait un ordinateur : exécuter des instructions <em>dans l'ordre</em>, en gardant en mémoire des variables.</p>
<p>Le modulo <code>%</code> est partout : pour savoir si un nombre est pair (<code>n % 2 == 0</code>), pour faire tourner une horloge (<code>heure % 24</code>), et même… dans le chiffre de César que tu as utilisé hier !</p>
<p><b>Le saviez-vous ?</b> Python porte le nom de la troupe comique des <em>Monty Python</em>, pas du serpent. Son créateur, Guido van Rossum, adorait leurs sketchs.</p>
<p class="clue">🕵️ <b>Piste n°3 :</b> le pirate fait disparaître ${REP3} cadeaux. Il prépare quelque chose de bien plus gros… Demain, on commence à réparer !</p>`,
  },
];

// ---------- Sorties ----------
const out = DAYS.map((d) => {
  const { answer, ...rest } = d;
  return { ...rest, h: hash(d.day, answer) };
});

mkdirSync(join(root, 'js'), { recursive: true });
mkdirSync(join(root, 'parents'), { recursive: true });
writeFileSync(
  join(root, 'js', 'days.js'),
  '// FICHIER GÉNÉRÉ par tools/generate.mjs — ne pas modifier à la main.\nwindow.DAYS = ' +
    JSON.stringify(out, null, 1) +
    ';\n',
);

const md = [
  '# Solutions (réservé aux parents 🤫)',
  '',
  '> Ne publiez pas ce dossier `parents/` si les enfants ont accès au dépôt.',
  '',
  '| Jour | Titre | Réponse |',
  '|---|---|---|',
  ...DAYS.map((d) => `| ${d.day} | ${d.title} | **${d.answer}** |`),
  '',
  ...DAYS.flatMap((d) => [`## Jour ${d.day} — ${d.title}`, '', ...d.hints.map((h, i) => `- Indice ${i + 1} : ${h}`), '']),
].join('\n');
writeFileSync(join(root, 'parents', 'SOLUTIONS.md'), md);
console.log(`OK : ${DAYS.length} jours générés.`);
