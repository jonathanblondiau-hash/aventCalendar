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

// =====================================================================
// RÉCOMPENSES RÉELLES — à personnaliser par les parents !
// La cachette est chiffrée (César) et déchiffrée par les enfants avec du Python.
// Écrire en MAJUSCULES, sans accents ni ponctuation. Puis : node tools/generate.mjs
// =====================================================================
const REWARDS = {
  1: { cachette: 'DANS LE FRIGO', cadeau: 'une surprise' },
};
const SHIFT_REWARD = 7; // même décalage que le pirate au jour 2

// ---------- Jour 4 : gros journal de connexions (3000 lignes générées, impossible à compter à la main) ----------
const NB_LIGNES4 = 3000;
const COMPTES4 = ['pere_noel', 'pere_noel', 'pixel', 'mere_noel', 'lutin_cuisine', 'renne_gps', 'pere_noel_2', 'pere_noel_old', 'lutin_emballage', 'admin'];
const lcg = (g) => (g * 1103515245n + 12345n) % 2147483648n; // même générateur que dans le code Python
const JOURNAL4 = [];
{
  let g = 12345n;
  for (let i = 0; i < NB_LIGNES4; i++) {
    g = lcg(g); const h = Number(g >> 16n) % 24;
    g = lcg(g); const m = Number(g >> 16n) % 60;
    g = lcg(g); const sec = Number(g >> 16n) % 60;
    g = lcg(g); const compte = COMPTES4[Number(g >> 16n) % COMPTES4.length];
    g = lcg(g); const statut = Number(g >> 16n) % 4 !== 0 ? 'SUCCES' : 'ECHEC';
    const pad = (n) => String(n).padStart(2, '0');
    JOURNAL4.push(`${pad(h)}:${pad(m)}:${pad(sec)} ${compte} ${statut}`);
  }
  JOURNAL4.sort();
}
const REP4 = String(
  JOURNAL4.filter((l) => {
    const [t, c, st] = l.split(' ');
    return c === 'pere_noel' && st === 'SUCCES' && +t.slice(0, 2) >= 2 && +t.slice(0, 2) <= 4;
  }).length,
);
const JOURNAL4_APERCU = JOURNAL4.slice(0, 6).join('\n');
const JOURNAL4_PY = [
  '# ===== Ne modifie pas ce bloc : il fabrique le gros fichier de journal (comme si on le lisait sur le disque) =====',
  'def suivant(graine):',
  '    return (graine * 1103515245 + 12345) % 2147483648',
  '',
  'def lire_journal():',
  '    comptes = ["pere_noel", "pere_noel", "pixel", "mere_noel", "lutin_cuisine",',
  '               "renne_gps", "pere_noel_2", "pere_noel_old", "lutin_emballage", "admin"]',
  '    lignes = []',
  '    graine = 12345',
  `    for i in range(${NB_LIGNES4}):`,
  '        graine = suivant(graine); h = (graine >> 16) % 24',
  '        graine = suivant(graine); m = (graine >> 16) % 60',
  '        graine = suivant(graine); s = (graine >> 16) % 60',
  '        graine = suivant(graine); compte = comptes[(graine >> 16) % len(comptes)]',
  '        graine = suivant(graine); statut = "SUCCES" if (graine >> 16) % 4 != 0 else "ECHEC"',
  '        lignes.append(f"{h:02d}:{m:02d}:{s:02d} {compte} {statut}")',
  '    lignes.sort()',
  '    return lignes',
  '# ==================================================================================================================',
].join('\n');

// ---------- Jour 5 : coffre logique (booléens) ----------
const RULES5 = [
  (A, B, C, D) => A + B === 1,
  (A, B, C, D) => !C || D,
  (A, B, C, D) => !(A && D),
  (A, B, C, D) => A || C,
  (A, B, C, D) => !B || C,
  (A, B, C, D) => A + B + C + D >= 2,
];
const SOLS5 = [];
for (let n = 0; n < 16; n++) {
  const v = [(n >> 3) & 1, (n >> 2) & 1, (n >> 1) & 1, n & 1];
  if (RULES5.every((r) => r(...v))) SOLS5.push(v.join(''));
}
if (SOLS5.length !== 1) throw new Error('Jour 5 : le coffre doit avoir une seule solution, trouvé : ' + SOLS5);
const REP5 = SOLS5[0]; // 0111

// ---------- Jour 6 : couleurs hexadécimales ----------
const CLAIR6 = 'PAR LA CHEMINEE';
const COULEURS6 = [];
for (let i = 0; i < CLAIR6.length; i += 3) {
  COULEURS6.push('#' + [...CLAIR6.slice(i, i + 3)].map((c) => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(''));
}

// ---------- Jour 7 : boss de la semaine (hexadécimal puis César) ----------
const SHIFT7 = 11;
const CLAIR7 = 'LA CLE EST CACHEE DANS L ETOILE DU SAPIN';
const HEX7 = [...caesar(CLAIR7, SHIFT7)].map((c) => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join('');
const HEX7_CHUNKS = HEX7.match(/.{1,32}/g);
const HEX7_PY = 'secret = (' + HEX7_CHUNKS.map((c) => `"${c}"`).join('\n          ') + ')';
const CACHETTE1 = REWARDS[1].cachette;
if (!/^[A-Z ]+$/.test(CACHETTE1)) throw new Error('REWARDS[1].cachette : majuscules et espaces uniquement');
const CACHETTE1_CHIFFREE = caesar(CACHETTE1, SHIFT_REWARD);

const DECHIFFRER_PY = [
  'def dechiffrer(texte, decalage):',
  '    resultat = ""',
  '    for lettre in texte:',
  '        if lettre == " ":',
  '            resultat = resultat + " "',
  '        else:',
  '            numero = ord(lettre) - 65',
  '            nouveau = (numero - decalage) % 26',
  '            resultat = resultat + chr(nouveau + 65)',
  '    return resultat',
].join('\n');

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
  {
    day: 4,
    title: 'Les traces du pirate',
    concept: 'Boucles, conditions & analyse de fichier',
    device: 'laptop',
    minutes: 20,
    story: `<p><b>Pixel :</b> « Le sabotage de la hotte nous a donné une idée : le serveur garde un <b>journal de connexions</b>. Chaque ligne dit <em>à quelle heure</em> et <em>quel compte</em> s'est connecté, et si ça a marché. Problème : ce journal fait <b>${NB_LIGNES4} lignes</b> rien que pour cette nuit ! Le vrai Père Noël dort entre 2 h et 5 h du matin. Si son compte se connecte à ce moment-là, ce n'est pas lui… »</p>`,
    puzzle: `<p>Le fichier <code>journal.txt</code> contient ${NB_LIGNES4} lignes, triées par heure. Chaque ligne a trois morceaux séparés par des espaces : l'<b>heure</b>, le <b>compte</b> et le <b>résultat</b> (<code>SUCCES</code> ou <code>ECHEC</code>). Voici les 6 premières lignes :</p>
<pre class="code">${JOURNAL4_APERCU}
…</pre>
<p><b>Combien de connexions réussies (<code>SUCCES</code>) du compte exact « pere_noel » ont eu lieu entre 2 h 00 et 4 h 59 (inclus) ?</b></p>
<p class="note">Attention aux pièges : « pere_noel_2 » et « pere_noel_old » sont d'autres comptes. Le fichier est bien trop long pour être compté à la main : c'est un travail pour un programme.</p>`,
    python: {
      open: true,
      label: 'Labo Python — l\'analyseur de journal (2 trous à remplir)',
      code: [
        JOURNAL4_PY,
        '',
        'journal = lire_journal()',
        'print(len(journal), "lignes dans le journal")',
        'print("Première ligne :", journal[0])',
        '',
        'compteur = 0',
        'for ligne in journal:',
        '    heure_txt, compte, statut = ligne.split(" ")   # on coupe la ligne en 3 morceaux',
        '    h = int(heure_txt[:2])                          # les 2 premiers caractères : "02:41:07" -> 2',
        '    if compte == ___ and statut == ___ and 2 <= h <= 4:   # trous : le nom du compte et le résultat, entre guillemets',
        '        compteur = compteur + 1',
        '',
        'print(compteur)',
      ].join('\n'),
    },
    hints: [
      'Le journal est bien trop long pour être lu à la main : une boucle <code>for</code> le parcourt ligne par ligne. Chaque ligne est coupée en trois morceaux (heure, compte, résultat). Il te manque les deux valeurs à comparer : ce sont des textes, donc entre guillemets.',
      'Trou 1 : <code>"pere_noel"</code> (le nom exact du compte). Trou 2 : <code>"SUCCES"</code> (en majuscules, comme dans le fichier).',
      'Le résultat est un nombre entre 40 et 80. Si ton programme affiche un nombre très différent, vérifie l\'orthographe des deux textes entre guillemets.',
    ],
    answer: REP4,
    explain: `<p><b>Réponse : ${REP4} connexions suspectes.</b> Tu viens d'analyser un fichier de ${NB_LIGNES4} lignes en une fraction de seconde : une boucle, des <b>conditions</b> combinées avec <code>and</code>, un <b>compteur</b>, et du découpage de texte (<code>split</code>). C'est exactement le travail des analystes en cybersécurité, mais sur des millions de lignes !</p>
<p><b>Le saviez-vous ?</b> « <code>==</code> » compare deux valeurs (« est-ce égal ? ») alors que « <code>=</code> » range une valeur dans une variable. Mélanger les deux est l'une des erreurs les plus fréquentes… même chez les pros !</p>
<p class="clue">🕵️ <b>Piste n°4 :</b> ${REP4} connexions réussies en pleine nuit avec le compte du Père Noël, alors qu'il dormait. Le pirate connaît donc son mot de passe. Il l'a volé… ou deviné.</p>`,
  },
  {
    day: 5,
    title: 'Le coffre du pirate',
    concept: 'Logique booléenne (ET, OU, NON)',
    device: 'both',
    minutes: 15,
    story: `<p><b>Pixel :</b> « Grâce au mot de passe volé, on a trouvé la planque du pirate : un <b>coffre</b> à 4 interrupteurs, A, B, C et D. Chacun est levé (1) ou baissé (0). À l'intérieur, sûrement des preuves ! Il n'y a qu'une seule combinaison qui respecte toutes les règles gravées sur la porte… »</p>`,
    puzzle: `<p>Le coffre s'ouvre uniquement si les <b>6 règles</b> sont toutes vraies :</p>
<ol>
<li>Exactement <b>un</b> des deux interrupteurs A et B est levé (ni les deux, ni aucun).</li>
<li><b>Si</b> C est levé, <b>alors</b> D doit l'être aussi.</li>
<li>A et D ne sont <b>jamais</b> levés en même temps.</li>
<li>Au moins l'un des deux, A <b>ou</b> C, est levé.</li>
<li><b>Si</b> B est levé, <b>alors</b> C doit l'être aussi.</li>
<li>Au moins <b>deux</b> interrupteurs sont levés.</li>
</ol>
<p><b>Quelle est la combinaison ?</b> Réponds avec 4 chiffres dans l'ordre A, B, C, D (1 = levé, 0 = baissé).</p>`,
    widget: { type: 'switches', label: 'Le panneau du coffre — note ta combinaison (aucune aide : à toi de raisonner !)' },
    python: {
      label: 'Labo Python (💻, facultatif) — laisser l\'ordinateur tester les 16 combinaisons',
      code: [
        'for A in (0, 1):',
        '    for B in (0, 1):',
        '        for C in (0, 1):',
        '            for D in (0, 1):',
        '                regle1 = (A + B) == 1',
        '                regle2 = (C == 0) or (D == 1)       # "si C alors D"',
        '                regle3 = not (A == 1 and D == 1)',
        '                regle4 = ___                        # trou : "A ou C est levé"',
        '                regle5 = (B == 0) or (C == 1)',
        '                regle6 = (A + B + C + D) >= 2',
        '                if regle1 and regle2 and regle3 and regle4 and regle5 and regle6:',
        '                    print(A, B, C, D)',
      ].join('\n'),
    },
    hints: [
      'Commence par les règles qui t\'imposent le plus de choses. La règle 1 te dit : soit A est levé et B baissé, soit l\'inverse. Étudie ces deux cas séparément.',
      'Cas « A levé » : la règle 3 force D à 0, puis la règle 2 force C à 0 (car si C était levé, D devrait l\'être). Combien d\'interrupteurs sont alors levés ? La règle 6 est-elle respectée ?',
      'Le cas « A levé » est impossible. Donc A = 0 et B = 1. Ensuite la règle 5 force C, puis la règle 2 force D. Combinaison : 0, 1, 1, 1.',
    ],
    answer: REP5,
    explain: `<p><b>Combinaison : ${REP5.split('').join(' · ')}</b>. Tu viens de faire de la <b>logique booléenne</b>, le langage de base de tous les ordinateurs : <code>and</code> (ET), <code>or</code> (OU), <code>not</code> (NON). « Si C alors D » s'écrit <code>(not C) or D</code> : une règle qui n'est violée que si C est vrai et D faux.</p>
<p><b>Le saviez-vous ?</b> Le processeur de ton téléphone contient des milliards de minuscules circuits (« portes logiques ») qui font exactement ça : ET, OU, NON. Tout le reste, les jeux, les vidéos, l'IA, est construit par-dessus.</p>
<p class="clue">🕵️ <b>Piste n°5 :</b> à l'intérieur du coffre, une feuille avec 5 carrés de couleur étranges et une inscription : « mon accès… ». Le reste est effacé. Ces couleurs cachent quelque chose !</p>`,
  },
  {
    day: 6,
    title: 'Les couleurs du pirate',
    concept: 'Hexadécimal & couleurs RVB',
    device: 'laptop',
    minutes: 20,
    story: `<p><b>Pixel :</b> « Ces 5 carrés de couleur ne sont pas là pour décorer ! Sur un écran, une couleur est décrite par trois nombres (rouge, vert, bleu) écrits en <b>hexadécimal</b>, un système en base 16 qui utilise les chiffres 0 à 9 puis les lettres A à F. Le pirate y a caché des lettres : chaque nombre est le code ASCII d'une lettre, comme au jour 1. »</p>`,
    puzzle: `<p>Chaque couleur s'écrit <code>#RRVVBB</code> : trois nombres hexadécimaux de 2 chiffres. Ici, chacun est le code ASCII d'une lettre (l'espace est 20 en hexadécimal, soit 32). Lis les couleurs dans l'ordre :</p>
<pre class="code">${COULEURS6.join('  ')}</pre>
<p><b>Par où le pirate est-il entré ?</b> (Le message se termine par le nom de l'endroit.)</p>
<p class="note">Dans le labo, la liste ne contient que les 2 premières couleurs : à toi de recopier les 3 autres !</p>`,
    widget: { type: 'swatches', colors: COULEURS6, label: 'Les cinq carrés de couleur trouvés dans le coffre' },
    python: {
      open: true,
      label: 'Labo Python — le traducteur de couleurs (2 trous à remplir)',
      code: [
        '# Il n\'y a ici que les 2 premières couleurs : recopie les 3 autres depuis l\'énoncé, dans la liste (entre guillemets, séparées par des virgules)',
        `couleurs = [${COULEURS6.slice(0, 2).map((c) => `"${c}"`).join(', ')}]`,
        '',
        'message = ""',
        'for couleur in couleurs:',
        '    for i in range(1, 7, ___):                      # trou 1 : on lit 2 caractères à la fois, donc on avance de ... en ...',
        '        canal = couleur[i:i + 2]                    # par ex. "50" (on saute le # du début)',
        '        message = message + chr(int(canal, ___))    # trou 2 : l\'hexadécimal est en base ... ?',
        '',
        'print(message)',
      ].join('\n'),
    },
    hints: [
      'Le labo ne contient que 2 couleurs : recopie les autres depuis l\'énoncé. Chaque couleur contient 3 nombres de 2 chiffres hexadécimaux, donc 3 lettres : la boucle interne doit les lire un par un, en sautant de 2 caractères à chaque fois.',
      'Trou 1 : on avance de 2 en 2. Trou 2 : l\'hexadécimal, c\'est « base 16 » (comme « base 2 » pour le binaire au jour 1).',
      'Remplace le premier ___ par 2 et le second par 16, puis exécute. Le programme affiche une phrase : il te demande l\'endroit par où il est passé.',
    ],
    answer: ['cheminee', 'lacheminee'],
    explain: `<p><b>Message décodé :</b> « ${CLAIR6} ». Le pirate est entré par la <b>cheminée</b>… la cheminée-serveur, par où passent tous les câbles de l'atelier !</p>
<p>Pourquoi l'hexadécimal ? Parce qu'un octet (8 bits) s'écrit toujours avec exactement 2 chiffres hexadécimaux (de 00 à FF), alors qu'il en faut 8 en binaire. C'est plus court et plus lisible : les programmeurs et les designers l'utilisent partout (couleurs, adresses mémoire…). Le rouge pur est <code>#FF0000</code> : 255 de rouge, 0 de vert, 0 de bleu.</p>
<p><b>Le saviez-vous ?</b> Un écran affiche environ 16,7 millions de couleurs : 256 × 256 × 256. Ton cerveau n'en distingue qu'une partie !</p>
<p class="clue">🕵️ <b>Piste n°6 :</b> le pirate est entré par la cheminée-serveur. Il a laissé un dernier fichier, protégé à double tour. Demain, c'est le grand décryptage !</p>`,
  },
  {
    day: 7,
    title: 'Le coffre-fort de la semaine',
    concept: 'Boss : hexadécimal + César + fonctions',
    device: 'laptop',
    minutes: 25,
    story: `<p><b>Pixel :</b> « On y est presque ! Dans la cheminée-serveur, un dernier fichier : le <b>journal secret</b> du pirate. Il l'a protégé en deux couches : d'abord il a décalé les lettres (son chiffre de César préféré, avec un décalage qu'on ne connaît pas), puis il a écrit le résultat en <b>hexadécimal</b>. Tout ce que tu as appris cette semaine va servir. Si tu le déchiffres, je pourrai réparer le premier système du Père Noël. »</p>`,
    puzzle: `<p>Voici le contenu du fichier : chaque paire de chiffres hexadécimaux est le code ASCII d'un caractère (jour 6), et le texte obtenu est chiffré avec un décalage de César (jour 2) de valeur inconnue.</p>
<pre class="code">${HEX7_CHUNKS.join('\n')}</pre>
<p><b>Où le pirate a-t-il caché la clé du système ?</b> (Un seul mot.)</p>
<p class="note">Cette fois, pas de mode d'emploi : les deux outils que tu connais sont déjà dans le labo, il te reste à les <b>enchaîner</b>.</p>`,
    python: {
      open: true,
      label: 'Labo Python — la chaîne de décryptage (3 trous à remplir)',
      code: [
        HEX7_PY,
        '',
        '# Étape 1 : de l\'hexadécimal vers le texte (comme au jour 6)',
        'def hex_vers_texte(h):',
        '    texte = ""',
        '    for i in range(0, len(h), 2):',
        '        texte = texte + chr(int(h[i:i + 2], ___))     # trou 1',
        '    return texte',
        '',
        '# Étape 2 : le déchiffrement de César (comme au jour 2) — déjà écrit pour toi',
        DECHIFFRER_PY,
        '',
        'texte = hex_vers_texte(secret)',
        '',
        '# Étape 3 : on essaie tous les décalages',
        'for essai in range(1, ___):                           # trou 2 : jusqu\'à 25 inclus, donc on s\'arrête avant...',
        '    print(essai, ___)                                 # trou 3 : le texte déchiffré avec ce décalage',
      ].join('\n'),
    },
    hints: [
      'Deux étapes enchaînées : d\'abord transformer l\'hexadécimal en texte (c\'est le travail de <code>hex_vers_texte</code>), puis casser le César sur ce texte (la fonction <code>dechiffrer</code>, déjà écrite).',
      'Trou 1 : l\'hexadécimal, c\'est la base 16. Trou 2 : <code>range(1, 26)</code> va de 1 à 25. Trou 3 : un appel à la fonction : <code>dechiffrer(texte, essai)</code>.',
      'Lance le programme : 25 lignes s\'affichent, une seule est une vraie phrase. La clé est cachée dans une partie du sapin qui brille en haut.',
    ],
    answer: ['etoile', 'letoile'],
    key: { n: 1, value: 'ETOILE' },
    explain: `<p><b>Journal décodé :</b> « ${CLAIR7} » (hexadécimal, puis César de décalage ${SHIFT7}).</p>
<p>Bravo, c'est le <b>boss de la semaine 1</b> : tu as enchaîné deux transformations (hexadécimal → texte → César), chacune dans sa propre <b>fonction</b>. C'est comme ça que les programmeurs construisent de grands programmes : en assemblant de petits morceaux qui font chacun une seule chose.</p>
<div class="reward">
<h3>🔑 Clé n°1 obtenue : <span class="key">ETOILE</span></h3>
<p>Garde-la précieusement : elle servira pour le <b>grand décryptage final</b> du 24 décembre !</p>
</div>
<div class="reward">
<h3>🎁 Ta récompense de la semaine 1</h3>
<p>Pixel a mis en sécurité ${REWARDS[1].cadeau} pour vous deux, mais il a chiffré l'endroit avec le chiffre préféré du pirate (le <b>même décalage que celui du jour 2</b>) :</p>
<pre class="code">${CACHETTE1_CHIFFREE}</pre>
<p>Déchiffre-le avec le labo ci-dessous pour savoir où chercher !</p>
</div>
<p class="clue">🕵️ <b>Piste n°7 :</b> le pirate a caché la clé dans l'étoile du sapin. Elle ouvre le premier verrou du système. La semaine prochaine, on répare avec du Python plus costaud !</p>`,
    after: {
      python: {
        open: true,
        label: 'Labo Python — où est cachée ta récompense ? (1 trou à remplir)',
        code: [
          DECHIFFRER_PY,
          '',
          `message = "${CACHETTE1_CHIFFREE}"`,
          'decalage = ___        # le même décalage que le pirate au jour 2 !',
          'print(dechiffrer(message, decalage))',
        ].join('\n'),
      },
    },
  },
];

// ---------- Sorties ----------
const out = DAYS.map((d) => {
  const { answer, ...rest } = d;
  return { ...rest, hints: d.hints.slice(0, 1), h: [].concat(answer).map((a) => hash(d.day, a)) };
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
  '> Le site n\'affiche que l\'**indice 1** de chaque jour ; les indices 2 et 3 (plus révélateurs) sont réservés aux parents, ci-dessous.',
  '',
  `**Récompense semaine 1** : cachette « ${REWARDS[1].cachette} » (${REWARDS[1].cadeau}). À modifier dans \`tools/generate.mjs\` (REWARDS), puis \`node tools/generate.mjs\`.`,
  '',
  '| Jour | Titre | Réponse |',
  '|---|---|---|',
  ...DAYS.map((d) => `| ${d.day} | ${d.title} | **${[].concat(d.answer).join('** ou **')}** |`),
  '',
  ...DAYS.flatMap((d) => [`## Jour ${d.day} — ${d.title}`, '', ...d.hints.map((h, i) => `- Indice ${i + 1} : ${h}`), '']),
].join('\n');
writeFileSync(join(root, 'parents', 'SOLUTIONS.md'), md);
console.log(`OK : ${DAYS.length} jours générés.`);
