// Semaine 2 (jours 8 à 14) : Python plus costaud, premiers suspects, clé n°2.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { REWARDS } from './recompenses.mjs';

// ---------- Outils ----------
const lcg = (g) => (g * 1103515245n + 12345n) % 2147483648n;
const hi = (g) => Number(g >> 16n);
const vigenere = (text, key, dir = 1) => {
  let i = 0;
  return [...text].map((c) => {
    if (c === ' ') return c;
    const k = key.charCodeAt(i++ % key.length) - 65;
    return String.fromCharCode(((c.charCodeAt(0) - 65 + dir * k + 26) % 26) + 65);
  }).join('');
};
const b64 = (s) => Buffer.from(s, 'utf8').toString('base64');
const chunk = (s, n) => s.match(new RegExp('.{1,' + n + '}', 'g'));
const chunksPy = (varname, s, n, pad) => varname + ' = (' + chunk(s, n).map((c) => `"${c}"`).join('\n' + ' '.repeat(pad)) + ')';

const VIGENERE_PY = [
  'def dechiffrer_vigenere(texte, cle):',
  '    resultat = ""',
  '    i = 0                                          # position dans la clé',
  '    for lettre in texte:',
  '        if lettre == " ":',
  '            resultat = resultat + " "',
  '        else:',
  '            decalage = ord(cle[i % len(cle)]) - 65  # la lettre de la clé donne le décalage (A=0, B=1...)',
  '            numero = ord(lettre) - 65',
  '            nouveau = (numero - decalage) % 26',
  '            resultat = resultat + chr(nouveau + 65)',
  '            i = i + 1',
  '    return resultat',
].join('\n');

// =====================================================================
// Jour 8 : dictionnaires — les listes du Père Noël sabotées
// =====================================================================
const PRENOMS = ['Léa', 'Hugo', 'Emma', 'Louis', 'Jade', 'Gabriel', 'Chloé', 'Arthur', 'Manon', 'Jules', 'Inès', 'Adam', 'Lina', 'Raphaël', 'Zoé', 'Nathan'];
const VILLES = ['Lyon', 'Marseille', 'Lille', 'Nantes', 'Strasbourg', 'Bordeaux', 'Toulouse', 'Nice'];
const VILLE_CIBLE = 'Strasbourg'; // la ville que le pirate attaque le plus
const ENFANTS = [];
{
  let g = 2024n;
  for (let i = 0; i < 360; i++) {
    g = lcg(g); const prenom = PRENOMS[hi(g) % PRENOMS.length];
    g = lcg(g); const age = 4 + (hi(g) % 12);
    g = lcg(g); const ville = VILLES[hi(g) % VILLES.length];
    g = lcg(g); const sage = hi(g) % 5 !== 0;
    g = lcg(g); let cadeaux = sage ? 1 + (hi(g) % 5) : 0;
    g = lcg(g); if (sage && hi(g) % 100 < (ville === VILLE_CIBLE ? 45 : 8)) cadeaux = 0; // sabotage
    ENFANTS.push({ prenom, age, ville, sage, cadeaux });
  }
}
const DEGATS = {};
for (const e of ENFANTS) if (e.sage && e.cadeaux === 0) DEGATS[e.ville] = (DEGATS[e.ville] || 0) + 1;
const classement = Object.entries(DEGATS).sort((a, b) => b[1] - a[1]);
if (classement[0][0] !== VILLE_CIBLE || classement[0][1] - classement[1][1] < 4) throw new Error('Jour 8 : maximum pas assez net ' + JSON.stringify(classement));
const REP8 = classement[0][0];
const DONNEES8 = ENFANTS.map((e) => `${e.prenom},${e.age},${e.ville},${e.sage ? 1 : 0},${e.cadeaux}`);
const DONNEES8_PY = 'donnees = (' + chunk(DONNEES8.join(';'), 64).map((c, i, a) => `"${c}"`).join('\n           ') + ')';

// =====================================================================
// Jour 9 : labyrinthe (parcours en largeur)
// =====================================================================
function genMaze(cw, ch, seed) {
  const W = 2 * cw + 1, H = 2 * ch + 1;
  const g = Array.from({ length: H }, () => Array(W).fill('#'));
  let s = BigInt(seed);
  const rnd = (n) => { s = lcg(s); return hi(s) % n; };
  const stack = [[1, 1]]; g[1][1] = ' ';
  const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]];
  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const opts = dirs.filter(([dr, dc]) => { const nr = r + dr, nc = c + dc; return nr > 0 && nc > 0 && nr < H - 1 && nc < W - 1 && g[nr][nc] === '#'; });
    if (!opts.length) { stack.pop(); continue; }
    const [dr, dc] = opts[rnd(opts.length)];
    g[r + dr / 2][c + dc / 2] = ' '; g[r + dr][c + dc] = ' '; stack.push([r + dr, c + dc]);
  }
  let extra = 0, tries = 0; // quelques murs en moins : plusieurs chemins possibles, un seul est le plus court
  while (extra < 12 && tries < 2000) {
    tries++;
    const r = 1 + rnd(H - 2), c = 1 + rnd(W - 2);
    if (g[r][c] !== '#') continue;
    if (r % 2 === 1 && c % 2 === 0 && g[r][c - 1] === ' ' && g[r][c + 1] === ' ') { g[r][c] = ' '; extra++; }
    else if (r % 2 === 0 && c % 2 === 1 && g[r - 1][c] === ' ' && g[r + 1][c] === ' ') { g[r][c] = ' '; extra++; }
  }
  g[1][1] = 'S'; g[H - 2][W - 2] = 'A';
  return g.map((r) => r.join(''));
}
function bfs(rows) {
  const H = rows.length, W = rows[0].length;
  const dist = new Map([['1,1', 0]]); const q = [[1, 1]];
  while (q.length) {
    const [r, c] = q.shift();
    if (rows[r][c] === 'A') return dist.get(r + ',' + c);
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (rows[nr][nc] !== '#' && !dist.has(nr + ',' + nc)) { dist.set(nr + ',' + nc, dist.get(r + ',' + c) + 1); q.push([nr, nc]); }
    }
  }
  return -1;
}
const MAZE = genMaze(11, 6, 777);
const REP9 = String(bfs(MAZE));
if (+REP9 < 30) throw new Error('Jour 9 : labyrinthe trop court ' + REP9);
const MAZE_PY = 'labyrinthe = [\n' + MAZE.map((r) => `    "${r}",`).join('\n') + '\n]';

// =====================================================================
// Jour 10 : Vigenère (clé = RUDOLPH, le mot de passe du jour 2)
// =====================================================================
const CLE10 = 'RUDOLPH';
const CLAIR10 = 'MON AUTRE MOT DE PASSE EST VERGLAS';
const CHIFFRE10 = vigenere(CLAIR10, CLE10);

// =====================================================================
// Jour 11 : QR code (base64)
// =====================================================================
const QR = JSON.parse(readFileSync(new URL('./qr-jour11.json', import.meta.url), 'utf8'));
const CLAIR11 = 'MON COMPLICE TRAVAILLE DANS L ATELIER DES JOUETS';
if (QR.text !== b64(CLAIR11)) throw new Error('Jour 11 : le QR code ne correspond plus au message (relancer tools/make-qr.mjs)');

// =====================================================================
// Jour 12 : recherche dichotomique (code PIN)
// =====================================================================
const PIN12 = 738215;
const MAX12 = 999999; // un code à 6 chiffres : de 000000 à 999999 (un million de possibilités)
const ESSAIS12 = 22;

// =====================================================================
// Jour 13 : mot de passe retrouvé à partir de son empreinte (hash)
// =====================================================================
const MOTS13 = ['noel', 'sapin', 'etoile', 'cadeau', 'renne', 'lutin', 'neige', 'givre', 'traineau', 'cheminee', 'guirlande', 'boule', 'bougie', 'chocolat',
  'biscuit', 'cannelle', 'houx', 'gui', 'flocon', 'verglas', 'hiver', 'bonnet', 'echarpe', 'cloche', 'calendrier', 'reveillon', 'buche', 'dinde',
  'marron', 'orange', 'epices', 'glace', 'rudolph', 'pixel', 'pole', 'nord', 'elfe', 'hotte', 'bottes', 'veillee'];
const MDP13 = 'traineau58';
const HASH13 = createHash('sha256').update(MDP13).digest('hex');
if (!MOTS13.includes('traineau')) throw new Error('mot absent');

// =====================================================================
// Jour 14 : boss (base64 -> Vigenère avec le mot de passe du jour 10)
// =====================================================================
const CLE14 = 'VERGLAS';
const CLAIR14 = 'LA DEUXIEME CLE EST CACHEE DANS LA GUIRLANDE';
const SECRET14 = b64(vigenere(CLAIR14, CLE14));
const CACHETTE2 = REWARDS[2].cachette;
if (!/^[A-Z ]+$/.test(CACHETTE2)) throw new Error('REWARDS[2].cachette : majuscules et espaces uniquement');
const CACHETTE2_CHIFFREE = vigenere(CACHETTE2, 'RUDOLPH');

export const DAYS_S2 = [
  // ------------------------------------------------------------ JOUR 8
  {
    day: 8,
    title: 'La liste du Père Noël',
    concept: 'Dictionnaires & compteurs',
    device: 'laptop',
    minutes: 20,
    story: `<p><b>Pixel :</b> « Bonne nouvelle : on a restauré une sauvegarde de la <b>liste des enfants</b>. Mauvaise nouvelle : le pirate l'a modifiée ! Il a remis à <b>zéro</b> les cadeaux de certains enfants… pourtant sages. Regarde où il frappe le plus : cela nous dira peut-être pourquoi il fait ça. »</p>`,
    puzzle: `<p>La liste contient ${ENFANTS.length} enfants. Chacun est décrit par un <b>dictionnaire</b> Python : des « étiquettes » (les clés) et leurs valeurs. Par exemple :</p>
<pre class="code">{"prenom": "Léa", "age": 9, "ville": "Lyon", "sage": True, "cadeaux": 3}</pre>
<p>Un enfant <b>sage</b> avec <b>0 cadeau</b> est une victime du pirate. <b>Dans quelle ville le pirate a-t-il fait le plus de dégâts ?</b></p>
<p class="note">Il y a trop d'enfants pour compter à la main, et il faut compter <em>par ville</em>. Un dictionnaire est parfait pour ça : une case par ville.</p>`,
    python: {
      open: true,
      label: 'Labo Python — le détecteur de sabotage (2 trous à remplir)',
      code: [
        '# Les données brutes : prenom,age,ville,sage(1 ou 0),cadeaux — un enfant par groupe, séparés par ";"',
        DONNEES8_PY,
        '',
        '# On transforme ce texte en une liste de dictionnaires',
        'enfants = []',
        'for ligne in donnees.split(";"):',
        '    prenom, age, ville, sage, cadeaux = ligne.split(",")',
        '    enfants.append({"prenom": prenom, "age": int(age), "ville": ville, "sage": sage == "1", "cadeaux": int(cadeaux)})',
        '',
        'print(len(enfants), "enfants dans la liste")',
        'print(enfants[0])',
        '',
        '# degats["Lyon"] sera le nombre de victimes à Lyon, etc.',
        'degats = {}',
        'for enfant in enfants:',
        '    if enfant["sage"] and enfant["cadeaux"] == ___:          # trou 1 : un enfant sage qui n\'a aucun cadeau',
        '        ville = enfant["ville"]',
        '        degats[ville] = degats.get(ville, 0) + ___           # trou 2 : on ajoute une victime à cette ville',
        '',
        'print(degats)',
      ].join('\n'),
    },
    hints: [
      'Le dictionnaire <code>degats</code> sert de tableau de comptage : <code>degats.get(ville, 0)</code> lit le score actuel d\'une ville (0 si elle n\'y est pas encore), et on y ajoute une victime. Il te manque deux nombres.',
      'Trou 1 : <code>0</code> (aucun cadeau). Trou 2 : <code>1</code> (une victime de plus).',
      `Le programme affiche le score de chaque ville. Une seule ville se détache nettement des autres : ${REP8}.`,
    ],
    answer: REP8,
    explain: `<p><b>Réponse : ${REP8}</b> (${DEGATS[REP8]} victimes, contre ${classement[1][1]} pour la ville suivante).</p>
<p>Tu as utilisé un <b>dictionnaire</b> comme tableau de comptage : une des structures de données les plus utiles de Python. Les sites web, les applis et les jeux vidéo en sont remplis : un profil de joueur, c'est un dictionnaire (<code>{"pseudo": ..., "score": ...}</code>).</p>
<p><b>Le saviez-vous ?</b> Les données des vrais sites (comme celles que ton téléphone échange avec internet) sont souvent écrites au format <b>JSON</b>, qui ressemble presque exactement à un dictionnaire Python !</p>
<p class="clue">🕵️ <b>Piste n°8 :</b> le pirate s'acharne sur <b>${REP8}</b>. Pourquoi cette ville ? Un lien personnel, peut-être…</p>`,
  },
  // ------------------------------------------------------------ JOUR 9
  {
    day: 9,
    title: 'Le GPS du traîneau',
    concept: 'Algorithme de parcours (BFS)',
    device: 'both',
    minutes: 20,
    story: `<p><b>Pixel :</b> « Le pirate a aussi détraqué le GPS du traîneau : plus aucune route vers <b>${REP8}</b> ! J'ai retrouvé la carte du glacier qui entoure le Pôle Nord : un labyrinthe de murs de glace. Il faut recalculer l'itinéraire le <b>plus court</b> de l'atelier (S) jusqu'à ${REP8} (A). »</p>`,
    puzzle: `<p>Voici la carte : les cases sombres sont des murs de glace, on se déplace d'une case à la fois vers le haut, le bas, la gauche ou la droite (pas en diagonale). Il existe <b>plusieurs chemins</b> de S à A, mais un seul nombre de pas est le minimum.</p>
<p><b>Comment compter ?</b> Un <b>pas</b> = un déplacement vers une case voisine. Si tu pars de S et que tu marches sur 5 cases pour arriver à A (A compris), ton chemin fait <b>5 pas</b> : la case de départ S ne compte pas, la case d'arrivée A compte. Le compteur sous la carte fait ce calcul pour toi.</p>
<p><b>Quel est le nombre minimal de pas pour aller de S à A ?</b></p>
<p class="note">Touche les cases de ton chemin pour les marquer (une case touchée une 2ᵉ fois se démarque). Cherche bien : il y a des raccourcis cachés.</p>`,
    widget: { type: 'maze', rows: MAZE, label: 'La carte du glacier — touche les cases pour marquer ton chemin' },
    hints: [
      'Cherche d\'abord un chemin qui marche, puis demande-toi s\'il existe un raccourci. Il y a des « boucles » dans le labyrinthe : plusieurs routes mènent au même endroit. Compte les pas de la case S jusqu\'à la case A comprise (S ne compte pas).',
      'Si tu trouves un nombre juste en dessous de la bonne réponse, vérifie que tu as bien compté la case A d\'arrivée.',
      `Le plus court chemin fait exactement ${REP9} pas.`,
    ],
    answer: REP9,
    explain: `<p><b>Réponse : ${REP9} pas.</b> La méthode des informaticiens s'appelle le <b>parcours en largeur</b> (BFS en anglais). Il explore d'abord toutes les cases à 1 pas, puis toutes celles à 2 pas, puis 3… comme une vague qui se répand. La première fois que la vague touche l'arrivée, c'est forcément par le chemin le plus court !</p>
<p>C'est ainsi que fonctionnent les GPS (avec des routes au lieu de cases, et des temps de trajet au lieu de pas), les jeux vidéo (comment un monstre te trouve dans un labyrinthe) et les réseaux sociaux (« vous avez 3 amis en commun »). Un ordinateur n'a pas d'intuition : il explore méthodiquement, case après case, jusqu'à ce que la vague touche l'arrivée.</p>
<p class="clue">🕵️ <b>Piste n°9 :</b> le GPS est réparé : le traîneau pourra rejoindre ${REP8}. Il reste à comprendre qui est derrière tout ça.</p>`,
  },
  // ------------------------------------------------------------ JOUR 10
  {
    day: 10,
    title: 'Le second message',
    concept: 'Chiffre de Vigenère & mots de passe',
    device: 'laptop',
    minutes: 20,
    story: `<p><b>Pixel :</b> « On a trouvé un deuxième message du pirate. Cette fois, ce n'est plus du César : chaque lettre est décalée d'un nombre différent, donné par une <b>clé</b> qui est un mot entier (c'est le <b>chiffre de Vigenère</b>, utilisé du XVIᵉ au XIXᵉ siècle, et longtemps considéré comme « indéchiffrable »). Mais j'ai remarqué un défaut chez notre pirate : il est paresseux et <b>réutilise ses mots de passe</b>… »</p>`,
    puzzle: `<p>Au lieu d'un seul décalage, on en utilise plusieurs : le mot-clé donne, lettre par lettre, de combien de crans décaler (A = 0, B = 1, C = 2…). Si le mot-clé est plus court que le message, on le répète en boucle.</p>
<pre class="code">${CHIFFRE10}</pre>
<p><b>Quel est l'autre mot de passe du pirate ?</b></p>`,
    python: {
      open: true,
      label: 'Labo Python — le décodeur de Vigenère (2 trous à remplir)',
      code: [
        [
          'def dechiffrer_vigenere(texte, cle):',
          '    resultat = ""',
          '    i = 0                                          # position dans la clé',
          '    for lettre in texte:',
          '        if lettre == " ":',
          '            resultat = resultat + " "',
          '        else:',
          '            lettre_cle = cle[i % len(cle)]          # la lettre de la clé qui correspond à cette position',
          '            decalage = ord(lettre_cle) - 65         # A=0, B=1, C=2...',
          '            numero = ord(lettre) - 65',
          '            nouveau = (numero - ___) % 26           # trou 1 : on recule du décalage',
          '            nouvelle_lettre = chr(nouveau + 65)',
          '            print(lettre, "| lettre de la clé :", lettre_cle, "| décalage :", decalage, "->", nouvelle_lettre)',
          '            resultat = resultat + nouvelle_lettre',
          '            i = i + 1',
          '    return resultat',
        ].join('\n'),
        '',
        `message = "${CHIFFRE10}"`,
        'cle = "___"           # trou 2 : le mot de passe que le pirate réutilise (en MAJUSCULES)',
        'print(dechiffrer_vigenere(message, cle))',
      ].join('\n'),
    },
    hints: [
      'Premier trou : dans la fonction, de combien recule-t-on chaque lettre ? La variable qui contient le décalage vient juste d\'être calculée, deux lignes plus haut. Deuxième trou : souviens-toi du mot de passe du pirate, trouvé au jour 2.',
      'Trou 1 : <code>decalage</code>. Trou 2 : le mot de passe du jour 2, écrit en majuscules.',
      'La clé est <code>RUDOLPH</code>. Le message décodé se termine par le nouveau mot de passe.',
    ],
    answer: 'verglas',
    explain: `<p><b>Message décodé :</b> « ${CLAIR10} ». Le pirate a utilisé <b>RUDOLPH</b> comme clé : le mot de passe qu'il avait déjà utilisé au jour 2 !</p>
<p>Le chiffre de Vigenère résiste à l'analyse des fréquences de lettres (au jour 2, on pouvait deviner le « E »). Il a fini par être cassé au XIXᵉ siècle, en trouvant la longueur de la clé. Mais la vraie faiblesse, ici, est humaine : <b>réutiliser le même mot de passe partout est l'erreur n°1</b>. Si quelqu'un trouve un de tes mots de passe, il essaiera tout de suite les autres comptes.</p>
<p><b>Le saviez-vous ?</b> Un bon mot de passe est <b>long</b> (plusieurs mots au hasard) et <b>différent</b> pour chaque site. Un gestionnaire de mots de passe retient tout à ta place.</p>
<p class="clue">🕵️ <b>Piste n°10 :</b> le deuxième mot de passe du pirate est « verglas ». Un pirate qui aime les mots du froid : rudolph… verglas…</p>`,
  },
  // ------------------------------------------------------------ JOUR 11
  {
    day: 11,
    title: 'Le QR code piégé',
    concept: 'QR code & base64',
    device: 'both',
    minutes: 15,
    story: `<p><b>Pixel :</b> « Sur la porte de la cheminée-serveur, quelqu'un a collé un <b>QR code</b>. Le pirate s'en servait sûrement pour passer des messages à un complice ! Scanne-le avec l'appareil photo de ton téléphone (vise l'écran du Chromebook). ⚠️ Un conseil de cyber-détective : ne scanne jamais un QR code inconnu dans la vraie vie sans réfléchir. Un QR code peut cacher un lien dangereux. Celui-ci ne contient que du texte, promis. »</p>`,
    puzzle: `<p>Scanne le QR code ci-dessous. Tu obtiens un texte qui ressemble à du charabia, mais il se termine par un signe <code>=</code> : c'est du <b>base64</b>, une façon d'écrire du texte avec seulement 64 caractères « sûrs » (lettres, chiffres, + et /). Internet l'utilise partout (e-mails, images dans les pages web…).</p>
<p><b>Que dit le message caché ? Où travaille le complice ?</b></p>`,
    widget: { type: 'qr', rows: QR.rows, label: 'Le QR code de la cheminée-serveur (scanne-le avec ton téléphone)' },
    python: {
      open: true,
      label: 'Labo Python — le décodeur de base64 (2 trous à remplir)',
      code: [
        'import base64',
        '',
        'texte_du_qr = "___"                     # trou 1 : recopie ici le texte lu par ton téléphone',
        'octets = base64.___(texte_du_qr)        # trou 2 : la fonction qui décode le base64 (son nom commence par b64)',
        'print(octets.decode("utf-8"))           # on transforme les octets en texte lisible',
      ].join('\n'),
    },
    hints: [
      'Scanne le QR avec l\'appareil photo du téléphone, puis recopie (ou envoie-toi par message) le texte obtenu sur le Chromebook. Dans le labo, le trou 2 est le nom de la fonction de décodage du module <code>base64</code> : elle commence par « b64 ».',
      'Trou 2 : <code>b64decode</code>. Attention à bien recopier tous les caractères du texte, y compris le « = » final.',
      'Le message décodé dit où travaille le complice : un lieu bien connu des lutins, où l\'on fabrique les jouets.',
    ],
    answer: ['atelier', 'latelier', 'atelierdesjouets', 'latelierdesjouets'],
    explain: `<p><b>Message décodé :</b> « ${CLAIR11} ».</p>
<p>Le <b>base64</b> n'est pas du chiffrement : n'importe qui peut le décoder, il ne sert qu'à transporter du texte sans le casser. Ne cache jamais un secret avec ça !</p>
<p><b>Le saviez-vous ?</b> Un QR code reste lisible même abîmé : jusqu'à 15 à 30 % des carrés peuvent être effacés ! Il contient des données de <b>correction d'erreur</b> (le même principe que dans un CD, ou dans les messages envoyés depuis l'espace). Les trois grands carrés dans les coins servent au scanner à repérer l'orientation.</p>
<p class="clue">🕵️ <b>Piste n°11 :</b> le complice travaille dans <b>l'atelier des jouets</b>. Le pirate est donc aidé de l'intérieur : quelqu'un a ouvert la cheminée-serveur.</p>`,
  },
  // ------------------------------------------------------------ JOUR 12
  {
    day: 12,
    title: 'Le coffre à 6 chiffres',
    concept: 'Recherche dichotomique',
    device: 'both',
    minutes: 15,
    story: `<p><b>Pixel :</b> « Le complice a laissé un <b>badge électronique</b> dans l'atelier. Pour savoir à qui il appartient, il faut ouvrir son boîtier avec le code <b>PIN à 6 chiffres</b>… un nombre entre <b>0 et 999 999</b>, soit un million de possibilités ! Heureusement, le boîtier est bavard : à chaque essai, il répond « C'est plus » ou « C'est moins ». Mais attention : après <b>${ESSAIS12} essais ratés</b>, l'alarme se déclenche ! »</p>`,
    puzzle: `<p>Un million de possibilités (de 0 à 999 999), ${ESSAIS12} essais seulement : impossible d'essayer les nombres un par un ! Il faut une stratégie maligne : <b>à chaque essai, éliminer la moitié des possibilités</b>.</p>
<p><b>Quel est le code PIN du boîtier ?</b></p>`,
    widget: { type: 'guess', min: 0, max: MAX12, tries: ESSAIS12, enc: PIN12 + 314159, label: 'Le boîtier du badge' },
    python: {
      label: 'Labo Python (💻, facultatif) — pourquoi ça marche : la recherche dichotomique en 2 trous',
      code: [
        'secret = 456789          # un nombre quelconque, pour t\'entraîner',
        'bas = 0',
        'haut = 999999',
        'essais = 0',
        '',
        'while True:',
        '    milieu = ___                       # trou 1 : le nombre pile au milieu entre bas et haut (division entière //)',
        '    essais = essais + 1',
        '    if milieu == secret:',
        '        break',
        '    elif milieu < secret:              # "plus grand !" : on garde la moitié haute',
        '        bas = milieu + 1',
        '    else:                              # "plus petit !" : on garde la moitié basse',
        '        haut = ___                     # trou 2 : on s\'arrête juste avant le milieu',
        '',
        'print("Trouvé en", essais, "essais seulement")',
      ].join('\n'),
    },
    hints: [
      'Ne teste pas 1, puis 2, puis 3… Commence par le nombre au milieu de l\'intervalle (environ 500 000). Selon la réponse « plus » ou « moins », tu sais dans quelle moitié se trouve le code. Recommence avec la moitié qui reste, et ainsi de suite.',
      'Après le premier essai (500 000), il reste 500 000 possibilités ; après le deuxième, 250 000 ; puis 125 000… Il suffit de 20 essais pour un million de possibilités.',
      `Le code est entre 700 000 et 800 000. Continue à couper en deux !`,
    ],
    answer: String(PIN12),
    explain: `<p><b>Code PIN : ${PIN12}.</b> La méthode s'appelle la <b>recherche dichotomique</b>. Chaque essai coupe l'intervalle en deux : 1 000 000 de possibilités → 500 000 → 250 000 → … → 1 en 20 essais. C'est le « log₂ » de 1 000 000 !</p>
<p>La différence avec la méthode « un par un » est gigantesque : <b>jusqu'à 1 000 000 d'essais</b> d'un côté, <b>20 au maximum</b> de l'autre. Pour 1 milliard de possibilités ? Seulement <b>30</b> essais. C'est ce qui rend les moteurs de recherche et les bases de données si rapides.</p>
<p><b>Le saviez-vous ?</b> C'est aussi pour ça qu'un code PIN à 4 chiffres est faible face à un ordinateur : 10 000 possibilités, c'est quelques secondes. D'où les blocages après 3 essais sur les cartes bancaires !</p>
<p class="clue">🕵️ <b>Piste n°12 :</b> dans le boîtier, un badge numéro <b>${PIN12}</b>, enregistré pour un employé de l'atelier. Son identité est protégée… mais pas pour longtemps.</p>`,
  },
  // ------------------------------------------------------------ JOUR 13
  {
    day: 13,
    title: 'Le mot de passe haché',
    concept: 'Hachage (SHA-256) & attaque par dictionnaire',
    device: 'laptop',
    minutes: 20,
    story: `<p><b>Pixel :</b> « On a trouvé le <b>panneau d'administration</b> du pirate. Il est protégé par un mot de passe… mais le site, plus malin que lui, ne stocke pas le mot de passe en clair : il garde seulement son <b>empreinte</b> (un « hash »), une sorte de code-barres du mot de passe. Impossible de remonter de l'empreinte au mot de passe… sauf en essayant des mots, en calculant leur empreinte, et en comparant. Mais le pirate a la mauvaise manie de choisir des mots de Noël suivis de deux chiffres… »</p>`,
    puzzle: `<p>Une <b>empreinte SHA-256</b> est une suite de 64 caractères qui change complètement si l'on modifie une seule lettre. Voici l'empreinte du mot de passe du pirate :</p>
<pre class="code">${HASH13}</pre>
<p>Le pirate choisit toujours un <b>mot de Noël suivi de deux chiffres</b> (de 00 à 99). Avec une liste de ${MOTS13.length} mots, ça fait ${MOTS13.length * 100} possibilités : pas grand-chose pour un ordinateur !</p>
<p><b>Quel est son mot de passe ?</b></p>`,
    python: {
      open: true,
      label: 'Labo Python — le casseur de mots de passe (2 trous à remplir)',
      code: [
        'import hashlib',
        '',
        `cible = "${HASH13}"`,
        '',
        'mots = [' + MOTS13.map((m) => `"${m}"`).join(', ') + ']',
        '',
        'for mot in mots:',
        '    for n in range(___):                     # trou 1 : les nombres de 00 à 99, donc range(combien ?)',
        '        essai = mot + f"{n:02d}"             # par ex. "noel07" : le nombre est toujours écrit avec 2 chiffres',
        '        empreinte = hashlib.sha256(essai.encode()).hexdigest()',
        '        print(essai, "->", empreinte[:16])   # on affiche chaque essai et le début de son empreinte',
        '        if ___ == cible:                     # trou 2 : on compare l\'empreinte calculée à la cible',
        '            print("Mot de passe trouvé :", essai)',
      ].join('\n'),
    },
    hints: [
      'Le programme essaie chaque mot avec chaque nombre de 00 à 99, calcule l\'empreinte de chaque essai et la compare à la cible. Il te manque combien de nombres on essaie, et quelle variable contient l\'empreinte calculée.',
      'Trou 1 : <code>100</code> (de 0 à 99 inclus, ça fait 100 valeurs). Trou 2 : <code>empreinte</code>.',
      'Le mot de passe est un mot qui sert à tirer le Père Noël dans les airs, suivi de deux chiffres.',
    ],
    answer: MDP13,
    explain: `<p><b>Mot de passe : ${MDP13}.</b> Tu viens de réaliser une <b>attaque par dictionnaire</b> : tester les mots les plus probables au lieu de tous les mots possibles. Elle réussit parce que les gens choisissent des mots de passe prévisibles : un mot courant, un chiffre ou deux.</p>
<p>Le <b>hachage</b> est quand même une bonne idée : si un site se fait voler sa base de données, les pirates n'obtiennent pas directement les mots de passe. Mais un mot de passe faible tombe vite. Un mot de passe de 4 mots au hasard (comme « cheval agrafeuse nuage ruisseau ») est quasi impossible à retrouver par cette méthode.</p>
<p><b>Le saviez-vous ?</b> Les sites sérieux ajoutent aussi une valeur secrète au hasard (le « sel ») avant de hacher, pour que deux personnes ayant le même mot de passe n'aient pas la même empreinte.</p>
<p class="clue">🕵️ <b>Piste n°13 :</b> le panneau d'administration du pirate est ouvert avec « ${MDP13} ». Demain, le grand décryptage de la semaine : on saura qui sont les suspects !</p>`,
  },
  // ------------------------------------------------------------ JOUR 14
  {
    day: 14,
    title: 'Le journal secret du pirate',
    concept: 'Boss : base64 + Vigenère + fonctions',
    device: 'laptop',
    minutes: 25,
    story: `<p><b>Pixel :</b> « Dans le panneau d'administration, un dernier fichier : le <b>journal secret</b> du pirate. Il l'a protégé en deux couches : d'abord un chiffrement de Vigenère, puis un codage en base64. Tu as déjà croisé chacun de ces outils cette semaine, et la clé de Vigenère, c'est… un mot de passe qu'il a déjà utilisé. Si tu le déchiffres, je récupère la deuxième clé du système ! »</p>`,
    puzzle: `<p>Voici le contenu du fichier (en base64). Pas de mode d'emploi cette fois : tu connais les outils, il faut les <b>enchaîner</b> dans le bon ordre. Le dernier chiffrement a été fait avec un mot de passe du pirate, mais lequel des deux ?</p>
<pre class="code">${chunk(SECRET14, 40).join('\n')}</pre>
<p><b>Où le pirate a-t-il caché la deuxième clé ?</b> (Un seul mot.)</p>`,
    python: {
      open: true,
      label: 'Labo Python — la chaîne de décryptage (à toi de l\'écrire)',
      code: [
        '# 1) Copie ici le texte de l\'énoncé (le fichier en base64), entre guillemets :',
        'secret = "___"',
        '',
        '# 2) Étape 1 : décoder le base64 pour retrouver le texte chiffré.',
        '#    Retrouve dans l\'énigme du jour 11 le code qui fait ça, et recopie-le ici.',
        '',
        '',
        '# 3) Étape 2 : déchiffrer le Vigenère avec un mot de passe du pirate.',
        '#    Retrouve dans l\'énigme du jour 10 la fonction qui déchiffre, et recopie-la ici.',
        '',
        '',
        '# 4) Enchaîne les deux étapes, et affiche le résultat avec print(...).',
      ].join('\n'),
    },
    hints: [
      'Tu as déjà écrit le code de chacune des deux étapes : le base64 au jour 11, le Vigenère au jour 10. Retourne les consulter (les énigmes restent ouvertes), recopie-les dans le labo et enchaîne-les. Le base64 a été appliqué en dernier : c\'est la première chose à défaire. Pour le mot de passe, le pirate en a utilisé deux jusqu\'ici : essaie-les et regarde lequel donne une vraie phrase.',
      'Étape 1 : <code>base64.b64decode(secret).decode()</code>. Étape 2 : la fonction du jour 10, avec le mot de passe trouvé au jour 10 (le second message), pas celui du jour 2.',
      'La clé est <code>VERGLAS</code>. La phrase finale dit où est cachée la deuxième clé : un objet qui brille sur le sapin.',
    ],
    answer: ['guirlande', 'laguirlande'],
    key: { n: 2, value: 'GUIRLANDE' },
    explain: `<p><b>Journal décodé :</b> « ${CLAIR14} ».</p>
<p>Bravo, c'est le <b>boss de la semaine 2</b> : base64, Vigenère, fonctions, et un peu de réflexion pour choisir le bon mot de passe !</p>
<div class="reward">
<h3>🔑 Clé n°2 obtenue : <span class="key">GUIRLANDE</span></h3>
<p>Elle rejoint ton trousseau. Plus que deux clés avant le grand décryptage final !</p>
</div>
<div class="reward">
<h3>🎁 Ta récompense de la semaine 2</h3>
<p>Pixel a mis en sécurité ${REWARDS[2].cadeau} pour vous deux, mais cette fois il a chiffré l'endroit avec un <b>Vigenère</b>. La clé ? C'est le <b>premier mot de passe du pirate</b>, trouvé au jour 2.</p>
<pre class="code">${CACHETTE2_CHIFFREE}</pre>
<p>Utilise le labo ci-dessous pour savoir où chercher !</p>
</div>
<div class="suspects">
<h3>🗂️ Le dossier des suspects</h3>
<p>Le pirate est aidé par un complice de l'atelier. À partir de la semaine 3, on enquête sur quatre suspects :</p>
<ul>
<li>💚 <b>Le Grinch</b> — vit seul sur sa montagne, déteste Noël depuis toujours. Bricoleur de génie.</li>
<li>😈 <b>Krampus</b> — le « contraire » du Père Noël : il punit les enfants pas sages. Très discret.</li>
<li>❄️ <b>Jack Frost</b> — esprit de l'hiver, mauvais caractère, adore le verglas et le givre.</li>
<li>🧝 <b>Gus</b> — lutin de l'atelier, rétrogradé à l'emballage le mois dernier. Il n'a pas aimé.</li>
</ul>
</div>
<p class="clue">🕵️ <b>Piste n°14 :</b> la deuxième clé est cachée dans la guirlande. À toi de jouer pour la semaine 3 : on découvre qui se cache derrière le pirate !</p>`,
    after: {
      python: {
        open: true,
        label: 'Labo Python — où est cachée ta récompense ? (à toi de l\'écrire)',
        code: [
          '# 1) Copie ici le message chiffré, tel qu\'il est écrit ci-dessus (entre guillemets) :',
          'message = "___"',
          '',
          '# 2) Copie ici la clé : le premier mot de passe du pirate, trouvé au jour 2 (en MAJUSCULES) :',
          'cle = "___"',
          '',
          '# 3) Retrouve dans l\'énigme du jour 10 la fonction qui déchiffre un Vigenère, recopie-la ici,',
          '#    puis affiche le résultat avec print(...).',
        ].join('\n'),
      },
    },
  },
];
