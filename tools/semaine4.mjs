// Semaine 4 (jours 22 à 24) : enquête OSINT fictive, démasquer le pirate, finale avec les 3 clés.
import { REWARDS } from './recompenses.mjs';

const chunk = (s, n) => s.match(new RegExp('.{1,' + n + '}', 'g'));
const vigenere = (text, key, dir = 1) => {
  let i = 0;
  return [...text].map((c) => {
    if (c === ' ') return c;
    const k = key.charCodeAt(i++ % key.length) - 65;
    return String.fromCharCode(((c.charCodeAt(0) - 65 + dir * k + 26) % 26) + 65);
  }).join('');
};
const VIGENERE_PY = [
  'def dechiffrer_vigenere(texte, cle):',
  '    resultat = ""',
  '    i = 0',
  '    for lettre in texte:',
  '        if lettre == " ":',
  '            resultat = resultat + " "',
  '        else:',
  '            decalage = ord(cle[i % len(cle)]) - 65',
  '            numero = ord(lettre) - 65',
  '            nouveau = (numero - decalage) % 26',
  '            resultat = resultat + chr(nouveau + 65)',
  '            i = i + 1',
  '    return resultat',
].join('\n');

// =====================================================================
// Jour 22 : archives web (Wayback) — qui est derrière « polaris88 » ?
// =====================================================================
const PSEUDO = 'polaris88';
const PROFILS22 = [
  { nom: 'Le Grinch', emoji: '💚', snaps: [
    { date: 'Aujourd\'hui', url: 'montagne-grinch.fr/profil', lignes: ['Le Grinch — Ermite de la montagne', 'Bio : « Je déteste Noël. Tout. Le bruit, les chansons, les guirlandes. »', 'Contact : grinch@montagne-grinch.fr', 'Ville : Mont Crumpit · Dernière activité : hier, 14 h 20'] },
    { date: '2020', url: 'archive.web/2020/montagne-grinch.fr', lignes: ['Le Grinch — Bricoleur de génie', 'Bio : « Inventeur de pièges à chaussettes. »', 'Contact : grinch.officiel@montagne-grinch.fr', 'Pseudo sur les forums : <b>GrinchVert</b>'] },
  ] },
  { nom: 'Krampus', emoji: '😈', snaps: [
    { date: 'Aujourd\'hui', url: 'grotte-krampus.fr/profil', lignes: ['Krampus — Gardien de la grotte', 'Bio : « Les enfants pas sages me connaissent. »', 'Contact : k@grotte-krampus.fr', 'Ville : Haute montagne · Dernière activité : il y a 3 jours'] },
    { date: '2019', url: 'archive.web/2019/grotte-krampus.fr', lignes: ['Krampus — Page personnelle', 'Bio : « Je rends visite aux enfants le 5 décembre. »', 'Pseudo sur les forums : <b>k_rampus_66</b>'] },
  ] },
  { nom: 'Jack Frost', emoji: '❄️', snaps: [
    { date: 'Aujourd\'hui', url: 'palais-de-glace.fr/profil', lignes: ['Jack Frost — Esprit de l\'hiver', 'Bio : « J\'aime la neige, le givre et le silence. »', 'Contact : pro@palais-de-glace.fr', 'Ville : Près de Strasbourg · Dernière activité : cette nuit, 3 h 12'] },
    { date: '2021', url: 'archive.web/2021/palais-de-glace.fr', lignes: ['Jack Frost ❄️ — Esprit de l\'hiver', 'Bio : « Quand tout le monde fête Noël, qui pense à l\'hiver ? Personne ne se souvient de moi. »', `Contact : <b>${PSEUDO}@mailnuit.fr</b>`, 'Pseudo sur les forums : <b>polaris88</b> · Ville : Strasbourg'] },
    { date: '2017', url: 'archive.web/2017/palais-de-glace.fr', lignes: ['Jack Frost — Bienvenue', 'Page en construction.'] },
  ] },
  { nom: 'Gus', emoji: '🧝', snaps: [
    { date: 'Aujourd\'hui', url: 'atelier.pole-nord.fr/lutins/gus', lignes: ['Gus — Lutin d\'emballage (ex-atelier de fabrication)', 'Bio : « Rétrogradé le mois dernier. Mais je garde le sourire. »', 'Contact : gus@atelier.pole-nord.fr'] },
    { date: '2022', url: 'archive.web/2022/atelier.pole-nord.fr/lutins/gus', lignes: ['Gus — Lutin fabricant de jouets', 'Bio : « Fier de mon travail à l\'atelier. »', 'Badge d\'accès : <b>738215</b>', 'Pseudo sur les forums : <b>gus_lutin42</b>'] },
  ] },
];

// =====================================================================
// Jour 23 : métadonnées EXIF + géolocalisation
// =====================================================================
const PHOTO = [48.6000, 7.7000];
const LIEUX23 = [
  ['Atelier du Père Noël', 78.2232, 15.6267],
  ['Chalet du Grinch', 48.6100, 7.7000],
  ['Grotte de Krampus', 47.5000, 10.2000],
  ['Palais de glace', 48.6000, 7.7130],
  ['Marché de Noël', 48.5839, 7.7500],
];
const hav = (a, b, c, d) => { const R = 6371, r = (x) => (x * Math.PI) / 180; const p = r(c - a), l = r(d - b); const x = Math.sin(p / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(l / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)); };
const km = LIEUX23.map(([n, la, lo]) => [n, hav(PHOTO[0], PHOTO[1], la, lo)]).sort((a, b) => a[1] - b[1]);
const naif = LIEUX23.map(([n, la, lo]) => [n, Math.hypot(PHOTO[0] - la, PHOTO[1] - lo)]).sort((a, b) => a[1] - b[1]);
if (km[0][0] !== 'Palais de glace' || naif[0][0] === km[0][0]) throw new Error('Jour 23 : le piège des degrés ne fonctionne plus');
const REP23 = km[0][0];
const PHOTOS23 = [
  { emoji: '☕', legende: 'Chocolat chaud au marché de Noël !', auteur: 'lutine_mia', meta: { Appareil: 'PhonePole X2', 'Date de prise de vue': '2026-12-01 18:40', Logiciel: 'Appareil photo 4.1', 'Coordonnées GPS': '48.5839, 7.7500' } },
  { emoji: '🏔️', legende: 'Mon chalet, sa vue et ses grincheuses', auteur: 'grinch_officiel', meta: { Appareil: 'Bricolo-Cam', 'Date de prise de vue': '2026-11-28 14:05', Logiciel: 'Aucun', 'Coordonnées GPS': '48.6100, 7.7000' } },
  { emoji: '❄️', legende: 'Ma vue ce soir. Personne ne la verra.', auteur: PSEUDO, meta: { Appareil: 'GivreCam 9', 'Date de prise de vue': '2026-12-01 03:12', Logiciel: 'GivreCam 9.2', 'Coordonnées GPS': `${PHOTO[0].toFixed(4)}, ${PHOTO[1].toFixed(4)}` } },
  { emoji: '🎄', legende: 'Le sapin géant de l\'atelier', auteur: 'gus_lutin42', meta: { Appareil: 'PhonePole X2', 'Date de prise de vue': '2026-11-30 09:20', Logiciel: 'Appareil photo 4.1', 'Coordonnées GPS': '78.2232, 15.6267' } },
];
const LIEUX23_PY = '{\n' + LIEUX23.map(([n, la, lo]) => `    "${n}": (${la}, ${lo}),`).join('\n') + '\n}';

// =====================================================================
// Jour 24 : finale — 3 couches de Vigenère (clés 1, 2, 3)
// =====================================================================
const CLE1 = 'ETOILE', CLE2 = 'GUIRLANDE', CLE3 = 'BOULE';
const CLAIR24 = 'LE MOT QUI ARRETE L ATTAQUE EST MERCI';
const C1 = vigenere(CLAIR24, CLE1), C2 = vigenere(C1, CLE2), C3 = vigenere(C2, CLE3);
const CACHETTE4 = REWARDS[4].cachette;
if (!/^[A-Z ]+$/.test(CACHETTE4)) throw new Error('REWARDS[4].cachette : majuscules et espaces uniquement');
const CACHETTE4_CHIFFREE = vigenere(CACHETTE4, CLE1 + CLE2 + CLE3);

export const DAYS_S4 = [
  // ------------------------------------------------------------ JOUR 22
  {
    day: 22,
    title: 'Les archives du web',
    concept: 'OSINT : enquêter avec des sources ouvertes',
    device: 'both',
    minutes: 20,
    story: `<p><b>Pixel :</b> « C'est l'heure de l'enquête de terrain ! Les professionnels l'appellent l'<b>OSINT</b> (<em>Open Source Intelligence</em>) : retrouver quelqu'un en n'utilisant que des informations <b>publiques</b>. On a le pseudo du pirate : <b>${PSEUDO}</b>. Mais les quatre suspects ont tous nettoyé leurs pages en voyant qu'on enquêtait… Heureusement, internet n'oublie jamais : des sites d'<b>archives</b> gardent des copies des anciennes versions des pages web, comme des photos du passé. »</p>
<p class="note">⚠️ Les suspects sont des personnages de fiction. Dans la vraie vie, l'OSINT sert à vérifier une information ou à se protéger, jamais à harceler quelqu'un ni à révéler sa vie privée.</p>`,
    puzzle: `<p>Voici les pages des quatre suspects, avec leurs anciennes versions archivées. Ouvre chaque archive et cherche une trace du pseudo <b>${PSEUDO}</b>.</p>
<p><b>Qui est le pirate ?</b> (Un nom.)</p>`,
    widget: { type: 'archive', profiles: PROFILS22, label: 'Le Web Archive — les pages des 4 suspects' },
    hints: [
      `Les pages d'aujourd'hui ont été nettoyées, mais pas les archives. Ouvre l'ancienne version de chaque suspect et cherche le pseudo ${PSEUDO} (ou l'adresse e-mail qui le contient). Compare aussi avec les autres indices : la ville, la phrase « personne ne se souvient de moi ».`,
      `Le pseudo apparaît dans l'archive de 2021 d'un seul suspect, avec une bio qui parle d'être oublié.`,
      'Le pirate est l\'esprit de l\'hiver : c\'est celui dont le nom évoque le givre.',
    ],
    answer: ['jackfrost', 'jack', 'frost', 'bonhommedegivre'],
    explain: `<p><b>Le pirate : Jack Frost !</b> En 2021, il avait écrit sur sa page : <em>« Personne ne se souvient de moi »</em>, avec son adresse « ${PSEUDO}@mailnuit.fr » et son pseudo de forum. Depuis, il a effacé ces lignes de la page actuelle… mais l'archive les a gardées. Les autres suspects n'avaient rien à voir avec « ${PSEUDO} » : le <b>Grinch</b> n'était qu'une fausse piste (très suspect, mais ses pseudos sont « GrinchVert » et sa bio n'a rien à voir).</p>
<p><b>Et le complice ?</b> Dans l'archive de 2022 de <b>Gus</b>, on voit son <b>badge d'accès n°738215</b>, celui du boîtier du jour 12 et du bloc falsifié du jour 18. C'est lui qui a ouvert la cheminée-serveur depuis l'atelier.</p>
<p><b>Ce que tu viens de voir :</b></p>
<ul>
<li>📜 <b>Rien ne disparaît vraiment d'internet.</b> Un pseudo, un numéro, une photo publiés un jour peuvent être retrouvés des années après.</li>
<li>🔁 <b>Réutiliser le même pseudo</b> sur plusieurs sites permet de relier tes comptes entre eux. C'est une grosse faille de vie privée.</li>
<li>🧭 <b>L'OSINT est une méthode</b> : recouper plusieurs sources, ne jamais se fier à un seul indice, et douter des fausses pistes évidentes.</li>
</ul>
<p class="clue">🕵️ <b>Piste n°22 :</b> le pirate est <b>Jack Frost</b>, l'esprit de l'hiver, qui vit près de Strasbourg. Son complice est <b>Gus</b>, le lutin rétrogradé. Demain : où se cache Jack Frost ?</p>`,
  },
  // ------------------------------------------------------------ JOUR 23
  {
    day: 23,
    title: 'La photo géolocalisée',
    concept: 'Métadonnées (EXIF) & géolocalisation',
    device: 'laptop',
    minutes: 25,
    story: `<p><b>Pixel :</b> « On connaît le pirate, mais pas sa cachette. Heureusement, Jack Frost aime partager ses photos. Et chaque photo prise avec un téléphone contient des <b>métadonnées</b> cachées (le format <b>EXIF</b>) : le modèle de l'appareil, la date, l'heure… et parfois les <b>coordonnées GPS</b> exactes de l'endroit où elle a été prise ! C'est ainsi que des gens ont été localisés par erreur en publiant une simple photo. »</p>`,
    puzzle: `<p>Voici 4 photos publiées en ligne cette semaine. Repère celle du pirate (publiée par son pseudo <b>${PSEUDO}</b>), regarde ses métadonnées, puis trouve le lieu connu <b>le plus proche</b> des coordonnées GPS.</p>
<p><b>Où se cache Jack Frost ?</b> (Le nom du lieu.)</p>
<p class="note">Les 5 lieux connus : ${LIEUX23.map(([n, la, lo]) => `${n} (${la}, ${lo})`).join(' · ')}.</p>`,
    widget: { type: 'exif', photos: PHOTOS23, label: 'Les photos publiées en ligne' },
    python: {
      open: true,
      label: 'Labo Python — le calculateur de distances (2 trous à remplir)',
      code: [
        'import math',
        '',
        '# Distance en km entre deux points du globe (formule de Haversine)',
        'def distance_km(lat1, lon1, lat2, lon2):',
        '    r = ___                                  # trou 1 : le rayon de la Terre en kilomètres (environ 6371)',
        '    p1 = math.radians(lat1)',
        '    p2 = math.radians(lat2)',
        '    dp = math.radians(lat2 - lat1)',
        '    dl = math.radians(lon2 - lon1)',
        '    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2',
        '    return 2 * r * math.asin(math.___(a))    # trou 2 : la racine carrée (square root en anglais)',
        '',
        `photo = (${PHOTO[0].toFixed(4)}, ${PHOTO[1].toFixed(4)})    # les coordonnées GPS lues dans les métadonnées de la bonne photo`,
        '',
        'lieux = ' + LIEUX23_PY,
        '',
        'meilleur = None',
        'plus_petite = 99999',
        'for nom, (lat, lon) in lieux.items():',
        '    d = distance_km(photo[0], photo[1], lat, lon)',
        '    print(nom, ":", round(d, 2), "km")',
        '    if d < plus_petite:',
        '        plus_petite = d',
        '        meilleur = nom',
        '',
        'print("Lieu le plus proche :", meilleur)',
      ].join('\n'),
    },
    hints: [
      `Une seule photo est publiée par « ${PSEUDO} » : ouvre ses métadonnées et lis les coordonnées GPS. Compare-les ensuite aux 5 lieux. Attention : un petit écart de longitude ne représente pas la même distance qu'un petit écart de latitude, c'est pour ça qu'on utilise une formule (le labo la contient).`,
      'Trou 1 : le rayon de la Terre vaut environ <code>6371</code> km. Trou 2 : la racine carrée en Python s\'appelle <code>sqrt</code> (dans le module math).',
      `Deux lieux sont presque aussi proches l'un que l'autre. Le programme affiche les distances : le plus proche est le palais de l'esprit de l'hiver.`,
    ],
    answer: ['palaisdeglace', 'lepalaisdeglace', 'palais'],
    explain: `<p><b>Jack Frost se cache au ${REP23}.</b> Le programme donne : ${km.map(([n, d]) => `${n} : ${d.toFixed(2)} km`).join(' · ')}.</p>
<p><b>Le piège :</b> en comparant simplement les nombres, le <b>chalet du Grinch</b> semblait plus proche (écart de 0,0100 contre 0,0130 degré). Mais un degré de longitude est plus court qu'un degré de latitude dès qu'on s'éloigne de l'équateur : à Strasbourg, il ne vaut que 73 km contre 111 km. Avec la bonne formule, c'est le palais de glace qui gagne. Le Grinch était encore une fausse piste !</p>
<p><b>La date de la photo :</b> « 2026-12-01 03:12 », en pleine nuit : c'est la plage horaire des connexions suspectes du jour 16. Les métadonnées confirment ce que les journaux laissaient deviner.</p>
<p><b>Les bons réflexes :</b> les réseaux sociaux enlèvent en général les métadonnées des photos publiées, mais pas toujours (envoi direct par e-mail, certains sites). Désactive la géolocalisation de l'appareil photo de ton téléphone, ou supprime les métadonnées avant d'envoyer une photo à quelqu'un que tu ne connais pas bien.</p>
<p class="clue">🕵️ <b>Piste n°23 :</b> Jack Frost est au <b>${REP23}</b>, près de Strasbourg. Demain soir à 23 h 42, il lancera l'attaque finale. Mais rien n'est perdu : tu as trois clés, il te reste à les utiliser !</p>`,
  },
  // ------------------------------------------------------------ JOUR 24
  {
    day: 24,
    title: 'Le grand décryptage',
    concept: 'Finale : tout ce que tu as appris',
    device: 'laptop',
    minutes: 30,
    story: `<p class="alert">🚨 24 DÉCEMBRE — 23 H 12. IL RESTE 30 MINUTES !</p>
<p><b>Pixel :</b> « Tu l'as fait, détective : tu sais qui est le pirate, où il se cache, et à quelle heure il frappe. Mais Jack Frost a mis en place un <b>arrêt d'urgence</b>, protégé par un message à <b>trois couches</b> de chiffrement. Chaque couche est un Vigenère, verrouillé avec l'une de tes trois <b>clés</b> : celle de la semaine 1, celle de la semaine 2, celle de la semaine 3. Il faut les retirer toutes les trois. C'est maintenant ou jamais ! »</p>`,
    puzzle: `<p>Le message du système d'arrêt d'urgence :</p>
<pre class="code">${C3}</pre>
<p>Les trois couches ont été posées l'une après l'autre, avec la <b>clé 1</b>, la <b>clé 2</b> et la <b>clé 3</b>. Tes clés sont dans le trousseau, en haut de la page.</p>
<p><b>Quel est le mot qui arrête l'attaque ?</b></p>
<p class="note">Il te manque une clé ? Retourne résoudre l'énigme du jour 7, 14 ou 21 pour l'obtenir. Question bonus : est-ce que l'ordre dans lequel tu retires les couches a de l'importance ? Essaie, et réfléchis à pourquoi.</p>`,
    python: {
      open: true,
      label: 'Labo Python — le grand décryptage (3 trous à remplir)',
      code: [
        `message = "${C3}"`,
        '',
        VIGENERE_PY,
        '',
        'texte = message',
        'texte = dechiffrer_vigenere(texte, "___")     # trou 1 : une des trois clés du trousseau (en MAJUSCULES)',
        'texte = dechiffrer_vigenere(texte, "___")     # trou 2 : une autre clé',
        'texte = dechiffrer_vigenere(texte, "___")     # trou 3 : la dernière',
        'print(texte)',
      ].join('\n'),
    },
    hints: [
      'Les trois mots à écrire (en MAJUSCULES) sont les clés du trousseau, obtenues aux jours 7, 14 et 21 : une clé par couche, il faut les utiliser toutes les trois.',
      `Les trois clés : « ${CLE1} », « ${CLE2} » et « ${CLE3} ». L'ordre n'a pas d'importance (voir l'explication).`,
      'Le message final dit quel mot arrête l\'attaque : c\'est un mot très simple que Jack Frost n\'a jamais entendu.',
    ],
    answer: 'merci',
    key: { n: 4, value: 'MERCI' },
    explain: `<p><b>Message déchiffré :</b> « ${CLAIR24} ».</p>
<p class="success">🎉 Tu as arrêté l'attaque !</p>
<p><b>Pourquoi l'ordre n'avait pas d'importance ?</b> Chaque couche de Vigenère <em>ajoute</em> un décalage à chaque lettre. Empiler trois couches revient à ajouter la somme des trois décalages, et en mathématiques, <b>a + b + c = c + b + a</b> : l'addition est commutative. Les chiffrements modernes mélangent des opérations qui ne commutent pas, justement pour éviter ce genre de raccourci.</p>
<div class="reward">
<h3>🔑 Clé n°4 : <span class="key">MERCI</span></h3>
<p>Le mot de passe d'arrêt d'urgence n'était pas un mot compliqué : Jack Frost voulait seulement que quelqu'un lui dise <b>merci</b>.</p>
</div>
<p><b>Pixel :</b> « Jack Frost a lu ton message sur son écran, à 23 h 41. Il a baissé les bras, et il a écrit : <em>“Personne ne m'avait dit merci pour la neige depuis trois cents ans.”</em> On l'a invité au réveillon. Gus a été renvoyé à l'atelier de fabrication (et il a promis de ne plus jamais utiliser son badge n°738215 pour autre chose que du travail). Noël est sauvé… grâce à toi ! »</p>
<div class="reward">
<h3>🎁 La grande récompense</h3>
<p>Pixel a mis ${REWARDS[4].cadeau} en sécurité pour vous deux. Pour le trouver, il a chiffré la cachette avec un Vigenère dont la clé est <b>les trois clés mises bout à bout</b> (semaine 1 + semaine 2 + semaine 3).</p>
<pre class="code">${CACHETTE4_CHIFFREE}</pre>
</div>
<div class="suspects">
<h3>🧠 Ce que tu as appris en 24 jours</h3>
<ul>
<li>💻 <b>Python :</b> variables, boucles, conditions, fonctions, listes, dictionnaires, modules.</li>
<li>🔢 <b>Représentation des données :</b> binaire, ASCII, hexadécimal, couleurs RVB, base64, QR codes.</li>
<li>🔐 <b>Cryptographie :</b> César, Vigenère, force brute, hachage SHA-256, RSA.</li>
<li>🧮 <b>Algorithmes :</b> parcours en largeur (GPS), recherche dichotomique, preuve de travail.</li>
<li>🤖 <b>IA :</b> k plus proches voisins, prédiction du mot suivant, injection de prompt.</li>
<li>🛡️ <b>Cybersécurité :</b> phishing, mots de passe, métadonnées, OSINT et vie privée.</li>
</ul>
<p>Le plus important : tu as appris à <b>chercher</b>, à <b>tester</b>, à <b>te méfier des évidences</b> et à <b>ne pas abandonner</b>. Garde cette curiosité. Joyeux Noël, détective ! 🎄</p>
</div>`,
    after: {
      python: {
        open: true,
        label: 'Labo Python — où est cachée la grande récompense ? (3 trous à remplir)',
        code: [
          VIGENERE_PY,
          '',
          `message = "${CACHETTE4_CHIFFREE}"`,
          'cle1 = "___"            # clé de la semaine 1',
          'cle2 = "___"            # clé de la semaine 2',
          'cle3 = "___"            # clé de la semaine 3',
          'cle = cle1 + cle2 + cle3        # les trois clés mises bout à bout',
          'print(dechiffrer_vigenere(message, cle))',
        ].join('\n'),
      },
    },
  },
];
