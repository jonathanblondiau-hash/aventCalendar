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
    { date: '2016', url: 'archive.web/2016/montagne-grinch.fr', lignes: ['Le Grinch — Page personnelle', 'Bio : « Bienvenue chez moi. Ne sonnez pas. »', 'Pseudo sur les forums : <b>grinch_du_nord</b> · Ville : Mont Crumpit'] },
  ] },
  { nom: 'Krampus', emoji: '😈', snaps: [
    { date: 'Aujourd\'hui', url: 'grotte-krampus.fr/profil', lignes: ['Krampus — Gardien de la grotte', 'Bio : « Les enfants pas sages me connaissent. »', 'Contact : k@grotte-krampus.fr', 'Ville : Haute montagne · Dernière activité : il y a 3 jours'] },
    { date: '2019', url: 'archive.web/2019/grotte-krampus.fr', lignes: ['Krampus — Page personnelle', 'Bio : « Je rends visite aux enfants le 5 décembre. »', 'Pseudo sur les forums : <b>k_rampus_66</b>'] },
    { date: '2015', url: 'archive.web/2015/grotte-krampus.fr', lignes: ['Krampus', 'Page en travaux. Revenez plus tard.'] },
  ] },
  { nom: 'Jack Frost', emoji: '❄️', snaps: [
    { date: 'Aujourd\'hui', url: 'palais-de-glace.fr/profil', lignes: ['Jack Frost — Esprit de l\'hiver', 'Bio : « J\'aime la neige, le givre et le silence. »', 'Contact : pro@palais-de-glace.fr', 'Ville : Près de Strasbourg · Dernière activité : cette nuit, 3 h 12'] },
    { date: '2021', url: 'archive.web/2021/palais-de-glace.fr', lignes: ['Jack Frost ❄️ — Esprit de l\'hiver', 'Bio : « Quand tout le monde fête Noël, qui pense à l\'hiver ? Personne ne se souvient de moi. »', `Contact : <b>${PSEUDO}@mailnuit.fr</b>`, 'Pseudo sur les forums : <b>polaris88</b> · Ville : Strasbourg'] },
    { date: '2017', url: 'archive.web/2017/palais-de-glace.fr', lignes: ['Jack Frost — Bienvenue', 'Page en construction.'] },
  ] },
  { nom: 'Gus', emoji: '🧝', snaps: [
    { date: 'Aujourd\'hui', url: 'atelier.pole-nord.fr/lutins/gus', lignes: ['Gus — Lutin d\'emballage (ex-atelier de fabrication)', 'Bio : « Rétrogradé le mois dernier. Mais je garde le sourire. »', 'Contact : gus@atelier.pole-nord.fr'] },
    { date: '2022', url: 'archive.web/2022/atelier.pole-nord.fr/lutins/gus', lignes: ['Gus — Lutin fabricant de jouets', 'Bio : « Fier de mon travail à l\'atelier. »', 'Badge d\'accès : <b>738215</b>', 'Pseudo sur les forums : <b>gus_lutin42</b>'] },
    { date: '2019', url: 'archive.web/2019/atelier.pole-nord.fr/lutins/gus', lignes: ['Gus — Apprenti lutin', 'Bio : « Premier jour à l\'atelier ! »', 'Pseudo sur les forums : <b>petit_gus</b>'] },
  ] },
  { nom: 'Père Fouettard', emoji: '🪵', snaps: [
    { date: 'Aujourd\'hui', url: 'pere-fouettard.fr/profil', lignes: ['Père Fouettard — Gardien de la morale', 'Bio : « Je veille sur les enfants pas sages. »', 'Contact : contact@pere-fouettard.fr', 'Ville : Strasbourg · Dernière activité : il y a 2 jours'] },
    { date: '2019', url: 'archive.web/2019/pere-fouettard.fr', lignes: ['Père Fouettard — Page officielle', 'Bio : « Le bâton, c\'est de l\'histoire ancienne. »', 'Pseudo sur les forums : <b>polaris_88</b> · Ville : Strasbourg'] },
    { date: '2014', url: 'archive.web/2014/pere-fouettard.fr', lignes: ['Père Fouettard', 'Pseudo sur les forums : <b>fouettard_alsace</b>'] },
  ] },
  { nom: 'Ebenezer Scrooge', emoji: '💰', snaps: [
    { date: 'Aujourd\'hui', url: 'scrooge-et-fils.com/profil', lignes: ['Ebenezer Scrooge — Banquier', 'Bio : « Les cadeaux sont une perte d\'argent. »', 'Contact : e.scrooge@scrooge-et-fils.com', 'Ville : Londres · Dernière activité : il y a 5 jours'] },
    { date: '2018', url: 'archive.web/2018/scrooge-et-fils.com', lignes: ['Ebenezer Scrooge — Blog', 'Billet du 12 novembre : « J\'ai enfin bloqué l\'utilisateur <b>polaris88</b>, qui m\'insultait chaque soir sur le forum des grincheux. »', 'Pseudo sur les forums : <b>scrooge1843</b>'] },
    { date: '2012', url: 'archive.web/2012/scrooge-et-fils.com', lignes: ['Ebenezer Scrooge — Bienvenue', 'Pseudo sur les forums : <b>vieux_scrooge</b>'] },
  ] },
];

// =====================================================================
// Jour 23 : métadonnées EXIF + géolocalisation
// =====================================================================
const LIEUX23 = { 'Place Kléber': [48.5836, 7.7456], 'Cathédrale': [48.5819, 7.7510], 'Gare de Strasbourg': [48.5850, 7.7339], 'Petite France': [48.5794, 7.7378], 'Parlement européen': [48.5975, 7.7689], 'Longyearbyen (Svalbard)': [78.2232, 15.6267] };
const REP23 = 'Place Kléber';
const pt = (n) => LIEUX23[n];
const PHOTOS23 = [
  { emoji: '☕', legende: 'Chocolat chaud au marché de Noël !', auteur: 'lutine_mia', gps: pt('Cathédrale'), meta: { Appareil: 'PhonePole X2', 'Date de prise de vue': '2026-12-01 18:40', Logiciel: 'Appareil photo 4.1', 'Coordonnées GPS': '48.5819, 7.7510' } },
  { emoji: '🚂', legende: 'Mon train de 8 h, comme chaque jour', auteur: 'grinch_officiel', gps: pt('Gare de Strasbourg'), meta: { Appareil: 'Bricolo-Cam', 'Date de prise de vue': '2026-11-28 07:55', Logiciel: 'Aucun', 'Coordonnées GPS': '48.5850, 7.7339' } },
  { emoji: '❄️', legende: 'Ma vue ce soir. Personne ne la verra.', auteur: PSEUDO, gps: pt('Place Kléber'), meta: { Appareil: 'GivreCam 9', 'Date de prise de vue': '2026-12-01 03:12', Logiciel: 'GivreCam 9.2', 'Coordonnées GPS': '48.5836, 7.7456' } },
  { emoji: '🏘️', legende: 'Premier gel de la saison', auteur: PSEUDO, gps: pt('Petite France'), meta: { Appareil: 'GivreCam 9', 'Date de prise de vue': '2026-10-14 17:30', Logiciel: 'GivreCam 9.2', 'Coordonnées GPS': '48.5794, 7.7378' } },
  { emoji: '🏛️', legende: 'Les lumières du Parlement, cette nuit', auteur: 'polaris_88', gps: pt('Parlement européen'), meta: { Appareil: 'PhonePole X2', 'Date de prise de vue': '2026-12-01 03:05', Logiciel: 'Appareil photo 4.1', 'Coordonnées GPS': '48.5975, 7.7689' } },
  { emoji: '🎄', legende: 'Le sapin géant de l\'atelier', auteur: 'gus_lutin42', gps: pt('Longyearbyen (Svalbard)'), meta: { Appareil: 'PhonePole X2', 'Date de prise de vue': '2026-11-30 09:20', Logiciel: 'Appareil photo 4.1', 'Coordonnées GPS': '78.2232, 15.6267' } },
  { emoji: '🌲', legende: 'Balade dans la nuit noire', auteur: 'k_rampus_66', gps: pt('Parlement européen'), meta: { Appareil: 'GrotteCam', 'Date de prise de vue': '2026-11-29 23:40', Logiciel: 'Aucun', 'Coordonnées GPS': '48.5975, 7.7689' } },
  { emoji: '⛄', legende: 'Mon premier bonhomme de neige', auteur: 'lutine_mia', gps: pt('Petite France'), meta: { Appareil: 'PhonePole X2', 'Date de prise de vue': '2026-12-01 15:02', Logiciel: 'Appareil photo 4.1', 'Coordonnées GPS': '48.5794, 7.7378' } },
];

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
    puzzle: `<p>Voici les pages des <b>six</b> suspects (deux nouveaux noms sont apparus : le <b>Père Fouettard</b> et <b>Ebenezer Scrooge</b>), avec leurs anciennes versions archivées. Ouvre chaque archive et cherche des traces du pseudo <b>${PSEUDO}</b>.</p>
<p><b>Qui est le pirate ?</b> (Un nom.)</p>
<p class="note">Un enquêteur vérifie tout : un pseudo <em>presque</em> identique n'est pas le même pseudo, et il faut distinguer quelqu'un qui <em>possède</em> un compte de quelqu'un qui en <em>parle</em>.</p>`,
    widget: { type: 'archive', profiles: PROFILS22, label: 'Le Web Archive — les pages des 6 suspects' },
    hints: [
      `Les pages d'aujourd'hui ont été nettoyées, mais pas les archives. Ouvre toutes les anciennes versions et cherche le pseudo exact ${PSEUDO} (ou l'adresse e-mail qui le contient). Recoupe avec les autres indices : la ville, la phrase « personne ne se souvient de moi ». Attention aux pseudos presque identiques, et à ceux qui ne sont que mentionnés.`,
      `Deux archives contiennent « polaris » : une avec un tiret bas (« polaris_88 »), qui n'est pas le bon pseudo, et une où le nom est seulement cité par quelqu'un d'autre. Une seule archive contient le pseudo exact ET une bio qui parle d'être oublié.`,
      'Le pirate est l\'esprit de l\'hiver : c\'est celui dont le nom évoque le givre.',
    ],
    answer: ['jackfrost', 'jack', 'frost', 'bonhommedegivre'],
    explain: `<p><b>Le pirate : Jack Frost !</b> En 2021, il avait écrit sur sa page : <em>« Personne ne se souvient de moi »</em>, avec son adresse « ${PSEUDO}@mailnuit.fr » et son pseudo de forum exact. Depuis, il a effacé ces lignes de la page actuelle… mais l'archive les a gardées.</p>
<p><b>Les fausses pistes :</b></p>
<ul>
<li>🪵 <b>Père Fouettard</b> : son archive de 2019 contient « <b>polaris_88</b> » (avec un tiret bas), et il habite aussi à Strasbourg. Très troublant, mais ce n'est pas le même pseudo !</li>
<li>💰 <b>Scrooge</b> : « polaris88 » apparaît bien sur son blog… mais comme <em>quelqu'un qu'il a bloqué</em>. Une mention n'est pas une identité : Scrooge est la <em>victime</em> des insultes, pas leur auteur.</li>
<li>💚 <b>Le Grinch</b> : le suspect évident, mais ses pseudos sont « GrinchVert » et « grinch_du_nord », et rien ne le relie à Strasbourg ni à la nuit de l'attaque.</li>
</ul>
<p><b>Et le complice ?</b> Dans l'archive de 2022 de <b>Gus</b>, on voit son <b>badge d'accès n°738215</b>, celui du boîtier du jour 12. C'est lui qui a ouvert la cheminée-serveur depuis l'atelier.</p>
<p><b>Ce que tu viens de voir :</b></p>
<ul>
<li>📜 <b>Rien ne disparaît vraiment d'internet.</b> Un pseudo, un numéro, une photo publiés un jour peuvent être retrouvés des années après.</li>
<li>🔁 <b>Réutiliser le même pseudo</b> sur plusieurs sites permet de relier tes comptes entre eux. C'est une grosse faille de vie privée.</li>
<li>🧭 <b>L'OSINT est une méthode</b> : recouper plusieurs sources, ne jamais se fier à un seul indice, vérifier chaque détail (une lettre de différence change tout !) et douter des fausses pistes évidentes.</li>
</ul>
<p class="clue">🕵️ <b>Piste n°22 :</b> le pirate est <b>Jack Frost</b>, l'esprit de l'hiver, qui vit près de Strasbourg. Son complice est <b>Gus</b>, le lutin rétrogradé. Demain : où se cache Jack Frost ?</p>`,
  },
  // ------------------------------------------------------------ JOUR 23
  {
    day: 23,
    title: 'La photo géolocalisée',
    concept: 'Métadonnées (EXIF) & géolocalisation',
    device: 'both',
    minutes: 20,
    story: `<p><b>Pixel :</b> « On connaît le pirate, mais pas sa cachette. Heureusement, Jack Frost aime partager ses photos. Et chaque photo prise avec un téléphone contient des <b>métadonnées</b> cachées (le format <b>EXIF</b>) : le modèle de l'appareil, la date, l'heure… et parfois les <b>coordonnées GPS</b> exactes de l'endroit où elle a été prise ! C'est ainsi que des gens ont été localisés par erreur en publiant une simple photo. »</p>`,
    puzzle: `<p>Voici ${PHOTOS23.length} photos publiées en ligne cette semaine. La photo qui nous intéresse a été publiée par le pirate (le pseudo <b>exact</b> : <b>${PSEUDO}</b>) et prise la <b>nuit de l'attaque, le 1er décembre vers 3 h du matin</b> : c'est l'heure des connexions suspectes.</p>
<p>Ouvre ses métadonnées, puis <b>copie les coordonnées GPS dans Google Maps</b> (un lien « Ouvrir dans Google Maps » apparaît sous les métadonnées) pour voir de quel endroit il s'agit.</p>
<p><b>Où se cache Jack Frost ?</b> (Le nom du lieu qui s'affiche sur la carte.)</p>`,
    widget: { type: 'exif', photos: PHOTOS23, label: 'Les photos publiées en ligne' },
    hints: [
      `Plusieurs photos ont des pseudos qui se ressemblent ou des dates proches : vérifie le pseudo exact (« ${PSEUDO} », sans tiret bas) et la date (nuit du 1er décembre, 3 h). Puis ouvre ses coordonnées dans Google Maps et lis le nom du lieu sur la carte.`,
      `Deux photos sont publiées par « ${PSEUDO} » : une seule a été prise la nuit de l'attaque. L'autre date d'octobre.`,
      'Le lieu est une grande place de Strasbourg, connue pour son immense sapin de Noël.',
    ],
    answer: ['placekleber', 'laplacekleber', 'kleber'],
    explain: `<p><b>Jack Frost se cache place Kléber</b>, à Strasbourg, juste au pied du grand sapin de Noël du marché. Les coordonnées <code>48.5836, 7.7456</code> mènent exactement à cette place sur Google Maps.</p>
<p><b>Les pièges :</b> la photo de « polaris_88 » (avec un tiret bas) a été prise la même nuit, mais devant le Parlement européen, par un autre appareil. Et la 2ᵉ photo du vrai « ${PSEUDO} » date d'octobre. Il fallait donc recouper <b>le pseudo exact ET la date</b>.</p>
<p><b>La date de la photo :</b> « 2026-12-01 03:12 », en pleine nuit, comme les connexions suspectes du jour 4. Les métadonnées confirment ce que les journaux laissaient deviner.</p>
<p><b>Les bons réflexes :</b> les réseaux sociaux enlèvent en général les métadonnées des photos publiées, mais pas toujours (envoi direct par e-mail, certains sites). Désactive la géolocalisation de l'appareil photo de ton téléphone, ou supprime les métadonnées avant d'envoyer une photo à quelqu'un que tu ne connais pas bien. Et dans la vraie vie, n'enquête jamais sur une personne réelle sans une très bonne raison.</p>
<p class="clue">🕵️ <b>Piste n°23 :</b> Jack Frost est <b>place Kléber</b>, au pied du grand sapin, là où le monde entier fête Noël… sans lui. Demain soir à 23 h 42, il lancera l'attaque finale. Mais rien n'est perdu : tu as trois clés, il te reste à les utiliser !</p>`,
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
<p>Joyeux Noël, détective ! 🎄</p>`,
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
