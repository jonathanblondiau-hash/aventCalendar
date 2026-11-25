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

  return { bits, cesar, python, switches, swatches, maze, qr, guess };
})();
