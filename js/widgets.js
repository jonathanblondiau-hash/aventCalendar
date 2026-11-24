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

  return { bits, cesar, python };
})();
