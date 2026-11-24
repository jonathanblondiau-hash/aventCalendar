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

// ---------- Jour 1 : binaire (39 octets : trop long à la main, il faut Python) ----------
const CLAIR1 = 'LE PIRATE SE CACHE DANS LE DOSSIER LUTIN';
const MOT1 = 'LUTIN';
const OCTETS1 = [...CLAIR1].map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'));
const CHUNKS1 = [];
for (let i = 0; i < OCTETS1.length; i += 5) CHUNKS1.push(OCTETS1.slice(i, i + 5).join(' '));
const MESSAGE_PY1 = 'message = (' + CHUNKS1.map((c, i) => `"${c}${i < CHUNKS1.length - 1 ? ' ' : ''}"`).join('\n           ') + ')';

// ---------- Jour 2 : César (décalage inconnu, force brute en Python) ----------
const DECALAGE = 7;
const CLAIR2 = 'LE MOT DE PASSE EST LE NOM DU RENNE AU NEZ ROUGE';
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
    concept: 'Binaire, ASCII & premier programme',
    device: 'laptop',
    minutes: 20,
    story: `<p class="alert">🚨 ALERTE CYBERATTAQUE — Pôle Nord, 1er décembre, 6 h 12</p>
<p><b>Pixel, lutin informaticien :</b> « Ce matin, tous les écrans de l'atelier se sont éteints ! Quelqu'un est entré dans le serveur du Père Noël : la liste des enfants sages, la carte du traîneau… tout est verrouillé. Le pirate n'a laissé qu'une seule trace dans les journaux du système, écrite en <b>0</b> et en <b>1</b>, la seule langue que comprennent les ordinateurs. Il y a des dizaines d'octets, et je n'ai pas le temps de tout décoder à la main. Heureusement, tu as un ordinateur… »</p>`,
    puzzle: `<p>Chaque groupe de 8 chiffres (un <b>octet</b>) est un nombre écrit en <b>binaire</b>, et chaque nombre correspond à une lettre (table ASCII : A = 65, B = 66, C = 67…, l'espace = 32). Voici le message du pirate :</p>
<pre class="code">${OCTETS1.join(' ')}</pre>
<p>Il y a ${OCTETS1.length} octets. Décoder ça à la main, c'est possible… mais très long. <b>Dans quel dossier le pirate se cache-t-il ?</b></p>
<p class="note">Astuce de détective : apprends à l'ordinateur à le faire à ta place. Le labo Python ci-dessous contient déjà presque tout le programme.</p>`,
    widget: { type: 'bits', label: 'Calculette binaire — pour comprendre UN octet (elle donne le nombre, à toi de trouver la lettre)' },
    python: {
      open: true,
      label: 'Labo Python — le décodeur du pirate (2 trous à remplir)',
      code: [
        '# ord() transforme une lettre en nombre : ord("A") donne 65',
        '# int(texte, base) transforme un texte écrit dans une base en nombre : int("101", 10) donne 101',
        '',
        MESSAGE_PY1,
        '',
        'resultat = ""',
        'for octet in message.split(" "):          # on traite les octets un par un',
        '    nombre = int(octet, ___)              # trou 1 : binaire = base ... ?',
        '    resultat = resultat + ___(nombre)     # trou 2 : la fonction qui fait le chemin inverse de ord()',
        '',
        'print(resultat)',
      ].join('\n'),
    },
    hints: [
      `Il y a ${OCTETS1.length} octets : à la main, c'est très long. Le labo Python lit les octets un par un dans une boucle : il te manque seulement deux morceaux.`,
      'Trou 1 : le binaire s\'écrit avec deux chiffres (0 et 1), donc c\'est la base… 2. Trou 2 : ord() va de la lettre vers le nombre ; la fonction inverse, qui va du nombre vers la lettre, s\'appelle chr().',
      'Remplace le premier ___ par 2 et le second par chr, puis clique sur Exécuter. Le programme affiche la phrase du pirate : cherche le nom du dossier.',
    ],
    answer: MOT1,
    explain: `<p><b>Message décodé :</b> « ${CLAIR1} ».</p>
<p>Tu viens d'écrire ton premier <b>programme de forensique</b> : une <b>boucle</b> (<code>for</code>) qui répète la même opération sur chaque octet. Ton ordinateur stocke <em>tout</em> sous forme de nombres : les lettres, les images, la musique… Pour les lettres, il utilise un tableau de correspondance appelé <b>ASCII</b> (inventé dans les années 1960). Aujourd'hui, le standard <b>Unicode</b> va beaucoup plus loin : l'émoji 🎄 est le nombre 127 876 !</p>
<p class="clue">🕵️ <b>Piste n°1 :</b> le pirate se cache dans un dossier nommé « lutin ». Demain, on y entre.</p>`,
  },
  {
    day: 2,
    title: 'Le code de César',
    concept: 'Cryptographie, fonctions & force brute',
    device: 'laptop',
    minutes: 20,
    story: `<p><b>Pixel :</b> « Le dossier « lutin » existait bien ! Il contient un seul fichier : un message que le pirate envoie à un complice. Mais il l'a <b>chiffré</b>, comme le faisait déjà Jules César il y a 2 000 ans : chaque lettre est <b>décalée</b> dans l'alphabet. Le problème : on ne sait pas de combien de crans. »</p>`,
    puzzle: `<p>Le pirate a décalé toutes les lettres du même nombre de crans (le « décalage »), mais il ne l'a écrit nulle part. Voici son message :</p>
<pre class="code">${CHIFFRE2}</pre>
<p>Il n'y a que <b>25 décalages possibles</b>. Plutôt que de les tester un par un à la main, fais-les tester par l'ordinateur : une seule des 25 lignes affichées sera une vraie phrase.</p>
<p><b>Quel est le mot de passe du pirate ?</b> <em>(Le message ne le donne pas directement : lis-le bien.)</em></p>`,
    python: {
      open: true,
      label: 'Labo Python — le casseur de code (1 trou à remplir)',
      code: [
        `message = "${CHIFFRE2}"`,
        '',
        '# Une fonction = un petit programme réutilisable, avec un nom et des « entrées »',
        'def dechiffrer(texte, decalage):',
        '    resultat = ""',
        '    for lettre in texte:',
        '        if lettre == " ":',
        '            resultat = resultat + " "',
        '        else:',
        '            numero = ord(lettre) - 65                  # A=0, B=1, ... Z=25',
        '            nouveau = (numero - ___) % 26              # trou : de combien de crans recule-t-on ?',
        '            resultat = resultat + chr(nouveau + 65)',
        '    return resultat',
        '',
        '# On essaie les 25 décalages possibles et on regarde lequel donne une vraie phrase',
        'for essai in range(1, 26):',
        '    print(essai, dechiffrer(message, essai))',
      ].join('\n'),
    },
    hints: [
      'Le pirate a décalé toutes les lettres du même nombre de crans, mais tu ne sais pas lequel : l\'ordinateur va tous les essayer. Dans la fonction, il manque l\'endroit où l\'on utilise l\'entrée « decalage ».',
      'Pour reculer de « decalage » crans, on soustrait le paramètre de la fonction. Dans la ligne avec le trou, il faut écrire le nom de ce paramètre.',
      'Remplace ___ par decalage, puis exécute. Parmi les 25 lignes, une seule est lisible. Elle te demande le nom d\'un animal célèbre : celui du Père Noël qui a le nez rouge.',
    ],
    answer: ['rudolph', 'rudolphe'],
    explain: `<p><b>Message déchiffré :</b> « ${CLAIR2} » (décalage de ${DECALAGE}). Et le renne au nez rouge s'appelle <b>Rudolph</b> !</p>
<p>Ce que tu viens de faire s'appelle une attaque par <b>force brute</b> : tester toutes les clés possibles. Avec seulement 25 clés, un ordinateur en vient à bout en une fraction de seconde. Les chiffres modernes (ceux qui protègent ta banque ou tes messages) ont des clés tellement grandes qu'il faudrait des milliards d'années pour toutes les essayer.</p>
<p>Tu as aussi écrit… une <b>fonction</b> : un bloc de code qu'on nomme une fois et qu'on réutilise autant de fois qu'on veut (ici, 25 fois).</p>
<p><b>Le saviez-vous ?</b> Au IXᵉ siècle, le savant arabe Al-Kindi a trouvé une méthode plus maligne : compter les lettres. Dans un texte français, le « E » est la lettre la plus fréquente. Si ton message chiffré a beaucoup de « H », il y a de bonnes chances que « H » représente « E » !</p>
<p class="clue">🕵️ <b>Piste n°2 :</b> le mot de passe du pirate est « rudolph ». Il va nous ouvrir le programme qu'il a lancé sur la hotte…</p>`,
  },
  {
    day: 3,
    title: 'La hotte déborde',
    concept: 'Variables & calculs en Python',
    device: 'laptop',
    minutes: 15,
    story: `<p><b>Pixel :</b> « Grâce au mot de passe « rudolph », on a pu ouvrir le programme que le pirate a lancé sur la hotte du traîneau ! C'est un <b>script de sabotage</b>. Un bon enquêteur ne l'exécute jamais à l'aveugle : il le <b>lit</b> et il prévoit ce qu'il va faire. Combien de cadeaux ce script va-t-il faire disparaître ? »</p>`,
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
  return { ...rest, h: [].concat(answer).map((a) => hash(d.day, a)) };
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
  ...DAYS.map((d) => `| ${d.day} | ${d.title} | **${[].concat(d.answer).join('** ou **')}** |`),
  '',
  ...DAYS.flatMap((d) => [`## Jour ${d.day} — ${d.title}`, '', ...d.hints.map((h, i) => `- Indice ${i + 1} : ${h}`), '']),
].join('\n');
writeFileSync(join(root, 'parents', 'SOLUTIONS.md'), md);
console.log(`OK : ${DAYS.length} jours générés.`);
