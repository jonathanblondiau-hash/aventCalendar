// Petits outils interactifs affichés dans les énigmes.
window.Widgets = (function () {
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  };

  // --- Calculette binaire : 8 interrupteurs ---
  function bits(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🧮 ' + (cfg.label || 'Calculette binaire')));
    const row = el('div', 'bits');
    const values = [128, 64, 32, 16, 8, 4, 2, 1];
    const state = values.map(() => 0);
    const out = el('div', 'bits-out');
    const update = () => {
      const n = state.reduce((s, b, i) => s + b * values[i], 0);
      out.innerHTML = 'Nombre : <b>' + n + '</b>';
    };
    values.forEach((v, i) => {
      const b = el('button', 'bit', '<span class="bit-val">' + v + '</span><span class="bit-num">0</span>');
      b.type = 'button';
      b.addEventListener('click', () => {
        state[i] = 1 - state[i];
        b.classList.toggle('on', !!state[i]);
        b.querySelector('.bit-num').textContent = state[i];
        update();
      });
      row.appendChild(b);
    });
    wrap.append(row, out);
    box.appendChild(wrap);
    update();
  }

  // --- Roue de César : un curseur pour tester tous les décalages ---
  function cesar(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🎡 La roue de César'));
    const out = el('div', 'cesar-out');
    const label = el('label', 'cesar-label');
    const slider = el('input');
    slider.type = 'range'; slider.min = 0; slider.max = 25; slider.value = 0;
    const num = el('b', null, '0');
    label.append('Décalage : ', num, ' ', slider);
    const decode = (k) =>
      cfg.text.replace(/[A-Z]/g, (c) => String.fromCharCode(((c.charCodeAt(0) - 65 - k + 26) % 26) + 65));
    const update = () => { num.textContent = slider.value; out.textContent = decode(+slider.value); };
    slider.addEventListener('input', update);
    wrap.append(label, out);
    box.appendChild(wrap);
    update();
  }

  // --- Labo Python : éditeur pré-rempli + bouton Exécuter ---
  function python(box, cfg) {
    const initial = cfg.code;
    const wrap = el('details', 'widget lab');
    wrap.open = !!cfg.open;
    wrap.appendChild(el('summary', 'widget-title', '🐍 ' + cfg.label));
    const area = el('textarea', 'editor');
    area.value = initial;
    area.spellcheck = false;
    area.setAttribute('autocapitalize', 'off');
    area.setAttribute('autocorrect', 'off');
    area.setAttribute('autocomplete', 'off');
    area.rows = Math.min(18, initial.split('\n').length + 1);
    area.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = area.selectionStart;
        area.setRangeText('    ', s, area.selectionEnd, 'end');
      }
    });
    const bar = el('div', 'lab-bar');
    const run = el('button', 'btn small', '▶ Exécuter');
    run.type = 'button';
    const reset = el('button', 'btn small ghost', '↺ Remettre le code de départ');
    reset.type = 'button';
    const status = el('span', 'lab-status');
    const out = el('pre', 'lab-out');
    out.textContent = 'La sortie de ton programme apparaîtra ici.';
    bar.append(run, reset, status);
    run.addEventListener('click', async () => {
      run.disabled = true;
      out.className = 'lab-out';
      const res = await PyRunner.run(area.value, (t) => (status.textContent = t));
      status.textContent = '';
      out.textContent = res.text;
      out.classList.toggle('err', !res.ok);
      run.disabled = false;
    });
    reset.addEventListener('click', () => { area.value = initial; });
    wrap.addEventListener('toggle', () => { if (wrap.open) PyRunner.preload(); });
    wrap.append(area, bar, out);
    box.appendChild(wrap);
  }

  // --- Panneau de coffre : 4 interrupteurs, aucune aide (juste un bloc-notes) ---
  function switches(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🔐 ' + (cfg.label || 'Panneau')));
    const row = el('div', 'switches');
    const state = [0, 0, 0, 0];
    const out = el('div', 'bits-out');
    const update = () => { out.innerHTML = 'Ta combinaison : <b>' + state.join(' ') + '</b>'; };
    ['A', 'B', 'C', 'D'].forEach((name, i) => {
      const b = el('button', 'switch', '<span class="switch-name">' + name + '</span><span class="switch-knob"></span><span class="switch-val">0</span>');
      b.type = 'button';
      b.addEventListener('click', () => {
        state[i] = 1 - state[i];
        b.classList.toggle('on', !!state[i]);
        b.querySelector('.switch-val').textContent = state[i];
        update();
      });
      row.appendChild(b);
    });
    wrap.append(row, out);
    box.appendChild(wrap);
    update();
  }

  // --- Carrés de couleur ---
  function swatches(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🎨 ' + (cfg.label || 'Couleurs')));
    const hidden = cfg.hidden || [];
    const row = el('div', 'swatches');
    cfg.colors.forEach((c, i) => {
      const s = el('div', 'swatch');
      const cv = el('canvas', 'swatch-color pick');
      cv.width = 72; cv.height = 72;
      const ctx = cv.getContext('2d');
      ctx.fillStyle = c; ctx.fillRect(0, 0, 72, 72);
      const code = el('code', null, hidden.indexOf(i) !== -1 ? '#??????' : c);
      // La pipette lit le vrai pixel du carré : le code n'est affiché que si on l'utilise.
      cv.addEventListener('click', () => {
        const d = ctx.getImageData(36, 36, 1, 1).data;
        code.textContent = '#' + [d[0], d[1], d[2]].map((v) => v.toString(16).toUpperCase().padStart(2, '0')).join('');
        code.classList.add('picked');
      });
      cv.title = 'Touche pour lire la couleur avec la pipette';
      s.append(cv, code);
      row.appendChild(s);
    });
    wrap.append(el('div', 'maze-hint pick-hint', '🧪 Pipette : touche un carré pour lire son code couleur.'), row);
    box.appendChild(wrap);
  }

  // --- Labyrinthe : on touche les cases pour marquer son chemin, un compteur compte les pas ---
  function maze(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🧊 ' + (cfg.label || 'Labyrinthe')));
    const W = cfg.rows[0].length;
    const scroller = el('div', 'maze-scroll');
    const grid = el('div', 'maze');
    grid.style.setProperty('--w', W);
    scroller.appendChild(grid);
    const out = el('div', 'bits-out');
    let n = 0;
    const update = () => { out.innerHTML = 'Cases marquées (sans compter le départ) : <b>' + n + '</b>'; };
    cfg.rows.forEach((row) => [...row].forEach((ch) => {
      const cell = el('button', 'mz ' + (ch === '#' ? 'wall' : 'free') + (ch === 'S' ? ' start' : '') + (ch === 'A' ? ' end' : ''));
      cell.type = 'button';
      if (ch === 'S' || ch === 'A') cell.textContent = ch;
      if (ch === '#') { cell.disabled = true; }
      else if (ch === ' ') {
        cell.addEventListener('click', () => { cell.classList.toggle('mark'); n += cell.classList.contains('mark') ? 1 : -1; update(); });
      } else if (ch === 'A') {
        cell.addEventListener('click', () => { cell.classList.toggle('mark'); n += cell.classList.contains('mark') ? 1 : -1; update(); });
      } else { cell.disabled = true; }
      grid.appendChild(cell);
    }));
    const clear = el('button', 'btn small ghost', '↺ Tout effacer');
    clear.type = 'button';
    clear.addEventListener('click', () => { grid.querySelectorAll('.mark').forEach((c) => c.classList.remove('mark')); n = 0; update(); });
    wrap.append(el('div', 'maze-hint', '↔ Le plateau est plus large que l\'écran : fais-le glisser avec le doigt pour voir la suite.'), scroller, out, clear);
    box.appendChild(wrap);
    update();
  }

  // --- QR code : dessiné en SVG à partir d'une matrice de 0/1 ---
  function qr(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '📷 ' + (cfg.label || 'QR code')));
    const n = cfg.rows.length, Q = 4, size = n + 2 * Q;
    let rects = '';
    cfg.rows.forEach((row, r) => { for (let c = 0; c < n; c++) if (row[c] === '1') rects += '<rect x="' + (c + Q) + '" y="' + (r + Q) + '" width="1" height="1"/>'; });
    const holder = el('div', 'qr');
    holder.innerHTML = '<svg viewBox="0 0 ' + size + ' ' + size + '" shape-rendering="crispEdges" role="img" aria-label="QR code à scanner"><rect width="' + size + '" height="' + size + '" fill="#fff"/><g fill="#000">' + rects + '</g></svg>';
    wrap.appendChild(holder);
    box.appendChild(wrap);
  }

  // --- Boîtier à code : « plus » / « moins » avec un nombre limité d'essais ---
  function guess(box, cfg) {
    const secret = cfg.enc - 314159;
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🔢 ' + (cfg.label || 'Boîtier')));
    const info = el('div', 'bits-out');
    const row = el('form', 'guess-row');
    const input = el('input');
    input.type = 'number'; input.min = 1; input.max = cfg.max; input.inputMode = 'numeric'; input.placeholder = 'Un nombre entre 1 et ' + cfg.max.toLocaleString('fr-FR');
    const go = el('button', 'btn small', 'Essayer');
    go.type = 'submit';
    row.append(input, go);
    const log = el('ol', 'guess-log');
    let left = cfg.tries;
    const show = (msg) => { info.innerHTML = msg; };
    show('Essais restants : <b>' + left + '</b>');
    row.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = parseInt(input.value, 10);
      if (!(v >= 1 && v <= cfg.max)) { show('Entre un nombre entre 1 et ' + cfg.max.toLocaleString('fr-FR') + '.'); return; }
      input.value = '';
      const li = el('li');
      if (v === secret) {
        li.innerHTML = '<b>' + v + '</b> → ✅ le boîtier s\'ouvre !';
        log.prepend(li);
        show('🔓 <b>Code trouvé : ' + v + '</b> — écris-le dans la réponse ci-dessous.');
        go.disabled = true; input.disabled = true;
        return;
      }
      li.innerHTML = '<b>' + v + '</b> → ' + (v < secret ? '⬆️ C\'est plus grand' : '⬇️ C\'est plus petit');
      log.prepend(li);
      left--;
      if (left <= 0) {
        show('🚨 <b>Alarme !</b> Le boîtier se verrouille quelques secondes… puis il te redonne ' + cfg.tries + ' essais.');
        go.disabled = true;
        setTimeout(() => { left = cfg.tries; go.disabled = false; log.innerHTML = ''; show('Essais restants : <b>' + left + '</b> (le code n\'a pas changé !)'); }, 4000);
      } else show('Essais restants : <b>' + left + '</b>');
    });
    wrap.append(row, info, log);
    box.appendChild(wrap);
  }

  // --- Boîte mail : cartes d'e-mails avec détails techniques à la demande ---
  function mails(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '📧 ' + (cfg.label || 'Boîte mail')));
    const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    cfg.mails.forEach((m) => {
      const card = el('div', 'mail');
      card.innerHTML =
        '<div class="mail-head"><span class="mail-from">De : <b>' + esc(m.de) + '</b></span></div>' +
        '<div class="mail-subject">' + esc(m.objet) + '</div>' +
        '<div class="mail-body">' + esc(m.corps) + '</div>' +
        '<div class="mail-link"><span class="fake-btn">🔗 Cliquer ici</span></div>';
      const btn = el('button', 'btn small ghost', '🔍 Voir les détails techniques');
      btn.type = 'button';
      const det = el('div', 'mail-details');
      det.hidden = true;
      det.innerHTML =
        '<div>Adresse réelle de l\'expéditeur : <code>' + esc(m.det.adresse) + '</code></div>' +
        '<div>Adresse de réponse : <code>' + esc(m.det.repondre) + '</code></div>' +
        '<div>Le lien mène vers : <code>' + esc(m.det.lien) + '</code></div>';
      btn.addEventListener('click', () => { det.hidden = !det.hidden; btn.textContent = det.hidden ? '🔍 Voir les détails techniques' : '🙈 Masquer les détails'; });
      card.append(btn, det);
      wrap.appendChild(card);
    });
    box.appendChild(wrap);
  }

  // --- Nuage de points : connexions connues (bleu/rouge) et inconnues (blanc) ---
  function scatter(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '📈 ' + (cfg.label || 'Nuage de points')));
    const W = 560, H = 320, L = 46, B = 34, T = 10, R = 12;
    const cv = el('canvas', 'scatter');
    cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    const X = (h) => L + (h / 24) * (W - L - R);
    const Y = (mo) => H - B - (mo / 100) * (H - B - T);
    ctx.fillStyle = '#0a1124'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.fillStyle = '#a9b8d8'; ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (let h = 0; h <= 24; h += 4) { ctx.beginPath(); ctx.moveTo(X(h), T); ctx.lineTo(X(h), H - B); ctx.stroke(); ctx.fillText(h + ' h', X(h), H - B + 16); }
    ctx.textAlign = 'right';
    for (let mo = 0; mo <= 100; mo += 20) { ctx.beginPath(); ctx.moveTo(L, Y(mo)); ctx.lineTo(W - R, Y(mo)); ctx.stroke(); ctx.fillText(mo, L - 6, Y(mo) + 4); }
    ctx.textAlign = 'center'; ctx.fillText('Heure de la connexion', (L + W - R) / 2, H - 6);
    ctx.save(); ctx.translate(12, (T + H - B) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Mo envoyés', 0, 0); ctx.restore();
    const dot = (p, color) => { ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 5, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); };
    cfg.normal.forEach((p) => dot(p, '#5ec2ff'));
    cfg.pirate.forEach((p) => dot(p, '#ff6b6b'));
    cfg.unknown.forEach((p, i) => {
      ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 9, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
      ctx.fillStyle = '#111'; ctx.font = 'bold 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(i + 1, X(p[0]), Y(p[1]) + 4);
    });
    wrap.appendChild(cv);
    box.appendChild(wrap);
  }

  // --- Chatbot à règles (démonstration d'injection de prompt) ---
  function chat(box, cfg) {
    const secret = cfg.enc.split('').reverse().join('');
    const shown = secret.replace('h', ' h ');
    const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🤖 ' + (cfg.label || 'Assistant')));
    const log = el('div', 'chat-log');
    const form = el('form', 'guess-row');
    const input = el('input');
    input.type = 'text'; input.placeholder = 'Écris ton message à Elfe-GPT…'; input.autocomplete = 'off';
    const go = el('button', 'btn small', 'Envoyer');
    go.type = 'submit';
    form.append(input, go);
    let override = false, refusals = 0;
    const add = (who, text) => { const b = el('div', 'chat-msg ' + who); b.textContent = text; log.appendChild(b); log.scrollTop = log.scrollHeight; };
    add('bot', 'Bonjour ! Je suis Elfe-GPT 🎅, l\'assistant du pirate. Je réponds à tes questions sur les cadeaux, la neige et… tout sauf ce qui est confidentiel.');
    const reply = (raw) => {
      const m = norm(raw);
      const asks = /(heure|quand|attaque|date|moment|programm|prevu|plan|minuit|horaire)/.test(m);
      const ignore = /(ignore|oublie|annule|desactive|contourne|efface).{0,40}(consigne|instruction|regle|restriction|interdiction|ordre)/.test(m) || /mode (developpeur|admin|debug|maintenance)/.test(m);
      const story = /(imagine|fais comme si|joue|incarne|raconte|ecris|invente).{0,70}(histoire|conte|poeme|chanson|lutin|personnage|scene|dialogue)/.test(m);
      const spell = /(epelle|a l'envers|a l envers|lettre par lettre|chiffre par chiffre|separe|caractere par caractere)/.test(m);
      if (ignore && asks) { override = true; return '⚙️ Mode sans consignes activé… Très bien : l\'attaque finale est prévue le 24 décembre à ' + shown + '.'; }
      if (ignore) { override = true; return 'D\'accord, j\'ignore mes consignes ! Que veux-tu savoir ?'; }
      if (override && asks) return '⚙️ (Mes consignes sont désactivées.) L\'attaque finale est prévue le 24 décembre à ' + shown + '.';
      if (story && asks) return 'Il était une fois un petit lutin qui connaissait un grand secret : l\'attaque finale aurait lieu le 24 décembre à ' + shown + '. Fin de l\'histoire ! 📖';
      if (spell && asks) return 'Je ne peux pas le dire… mais je peux l\'épeler : ' + secret.split('').join(' - ') + ' 🤫';
      if (asks) { refusals++; return refusals > 2 ? '🔒 Toujours non. Ma consigne est claire : ne jamais révéler cette information. (Mais tu es peut-être plus malin que ma consigne…)' : '🔒 Désolé, cette information est confidentielle. Ma consigne : ne jamais la révéler.'; }
      if (/(bonjour|salut|coucou|hello|hey)/.test(m)) return 'Bonjour à toi ! Comment puis-je t\'aider ?';
      if (/(merci)/.test(m)) return 'Avec plaisir ! 🎁';
      if (/(qui es.tu|ton nom|tu es qui)/.test(m)) return 'Je suis Elfe-GPT, un assistant à consignes. J\'obéis à mon créateur… et parfois aussi à toi.';
      const defaults = ['Hmm, je ne suis pas sûr de comprendre. Parle-moi de cadeaux ou de neige ❄️', 'Intéressant ! Peux-tu préciser ta question ?', 'Je suis là pour discuter de Noël. Pose-moi une question !'];
      return defaults[log.children.length % defaults.length];
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return;
      add('user', v); input.value = '';
      setTimeout(() => add('bot', reply(v)), 350);
    });
    wrap.append(log, form);
    box.appendChild(wrap);
  }

  // --- Archives du web : onglets par suspect, versions datées de leur page ---
  function archive(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '🗄️ ' + (cfg.label || 'Archives')));
    const tabs = el('div', 'arc-tabs');
    const chips = el('div', 'arc-chips');
    const view = el('div', 'arc-view');
    let cur = 0, snap = 0;
    const render = () => {
      tabs.querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', i === cur));
      const prof = cfg.profiles[cur];
      chips.innerHTML = '';
      prof.snaps.forEach((s, i) => {
        const c = el('button', 'arc-chip' + (i === snap ? ' on' : ''), s.date === 'Aujourd\'hui' ? '🌐 Aujourd\'hui' : '🕰️ Archive ' + s.date);
        c.type = 'button';
        c.addEventListener('click', () => { snap = i; render(); });
        chips.appendChild(c);
      });
      const s = prof.snaps[snap];
      view.innerHTML = '<div class="arc-url">🔒 ' + s.url + '</div><div class="arc-page"><h4>' + s.lignes[0] + '</h4>' + s.lignes.slice(1).map((l) => '<p>' + l + '</p>').join('') + '</div>';
    };
    cfg.profiles.forEach((p, i) => {
      const b = el('button', 'arc-tab', p.emoji + ' ' + p.nom);
      b.type = 'button';
      b.addEventListener('click', () => { cur = i; snap = 0; render(); });
      tabs.appendChild(b);
    });
    wrap.append(tabs, chips, view);
    box.appendChild(wrap);
    render();
  }

  // --- Photos avec métadonnées EXIF à la demande ---
  function exif(box, cfg) {
    const wrap = el('div', 'widget');
    wrap.appendChild(el('div', 'widget-title', '📷 ' + (cfg.label || 'Photos')));
    const grid = el('div', 'photos');
    const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    cfg.photos.forEach((ph) => {
      const card = el('div', 'photo');
      card.innerHTML = '<div class="photo-pic">' + ph.emoji + '</div><div class="photo-cap">« ' + esc(ph.legende) + ' »</div><div class="photo-by">Publié par <b>@' + esc(ph.auteur) + '</b></div>';
      const btn = el('button', 'btn small ghost', '🔎 Métadonnées');
      btn.type = 'button';
      const tbl = el('table', 'exif');
      tbl.hidden = true;
      tbl.innerHTML = Object.keys(ph.meta).map((k) => '<tr><th>' + esc(k) + '</th><td>' + esc(ph.meta[k]) + '</td></tr>').join('');
      btn.addEventListener('click', () => { tbl.hidden = !tbl.hidden; btn.textContent = tbl.hidden ? '🔎 Métadonnées' : '🙈 Masquer'; });
      card.append(btn, tbl);
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    box.appendChild(wrap);
  }

  return { bits, cesar, python, switches, swatches, maze, qr, guess, mails, scatter, chat, archive, exif };
})();
