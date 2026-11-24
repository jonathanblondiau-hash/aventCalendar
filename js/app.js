(function () {
  'use strict';
  const TOTAL = 24;
  const STORE_KEY = 'avent-pixel-v1';

  // ---------- Dates ----------
  const now = new Date();
  const YEAR = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const params = new URLSearchParams(location.search);

  // ?tout  -> tout débloquer (aperçu parents)   ?jour=N -> simuler le jour N
  function maxDay() {
    if (params.has('tout')) return TOTAL;
    if (params.has('jour')) return Math.max(0, Math.min(TOTAL, parseInt(params.get('jour'), 10) || 0));
    if (now.getFullYear() > YEAR) return TOTAL;
    if (now.getMonth() < 11) return 0;
    return Math.min(TOTAL, now.getDate());
  }
  const MAX = maxDay();

  // ---------- Sauvegarde (localStorage, avec repli en mémoire) ----------
  let state = { solved: {}, hints: {} };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) state = Object.assign(state, JSON.parse(raw));
  } catch (e) { /* mode privé : on garde en mémoire */ }
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {} };

  // ---------- Utilitaires ----------
  const $ = (s, r) => (r || document).querySelector(s);
  const normalize = (s) =>
    s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const dayData = (n) => (window.DAYS || []).find((d) => d.day === n);
  const isCorrect = (day, input) => sha256(day.day + ':' + normalize(input)) === day.h;

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ---------- Grille ----------
  const grid = $('#grid');
  function renderGrid() {
    grid.innerHTML = '';
    let solvedCount = 0;
    for (let n = 1; n <= TOTAL; n++) {
      const d = dayData(n);
      const solved = !!state.solved[n];
      if (solved) solvedCount++;
      const locked = n > MAX;
      const soon = !locked && !d;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'door' + (solved ? ' solved' : '') + (locked ? ' locked' : '') + (soon ? ' soon' : '') + (!locked && d && !solved ? ' ready' : '');
      b.setAttribute('aria-label', 'Jour ' + n + (locked ? ' (verrouillé)' : solved ? ' (résolu)' : ''));
      b.innerHTML =
        '<span class="door-num">' + n + '</span>' +
        '<span class="door-icon">' + (solved ? '⭐' : locked ? '🔒' : soon ? '🛠️' : '🎁') + '</span>' +
        '<span class="door-title">' + (d && !locked ? d.title : locked ? 'Le ' + n + ' décembre' : 'Bientôt…') + '</span>';
      b.addEventListener('click', () => onDoor(n));
      grid.appendChild(b);
    }
    $('#progress-text').textContent = solvedCount + ' / ' + TOTAL + ' énigmes résolues';
    $('#progress-bar').style.width = (solvedCount / TOTAL) * 100 + '%';
  }

  function onDoor(n) {
    const d = dayData(n);
    if (n > MAX) {
      const el = grid.children[n - 1];
      el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake');
      toast(MAX === 0 ? '🎄 Patience ! Le calendrier ouvre le 1er décembre.' : '🔒 Pas si vite ! Cette porte s\'ouvre le ' + n + ' décembre.');
      return;
    }
    if (!d) { toast('🛠️ Pixel prépare encore cette porte… reviens bientôt !'); return; }
    openDay(d);
  }

  // ---------- Fenêtre d'une énigme ----------
  const modal = $('#modal');
  const body = $('#modal-body');
  const deviceLabel = { both: '📱💻 Téléphone ou Chromebook', laptop: '💻 Plutôt Chromebook' };

  function openDay(d) {
    body.innerHTML = '';
    const head = document.createElement('div');
    head.className = 'day-head';
    head.innerHTML =
      '<div class="day-badge">Jour ' + d.day + '</div><h2>' + d.title + '</h2>' +
      '<div class="tags"><span class="tag">🧠 ' + d.concept + '</span><span class="tag">' + (deviceLabel[d.device] || '') + '</span><span class="tag">⏱ ~' + d.minutes + ' min</span></div>';
    const story = document.createElement('div');
    story.className = 'story';
    story.innerHTML = '<div class="avatar">🧝</div><div class="bubble">' + d.story + '</div>';
    const puzzle = document.createElement('div');
    puzzle.className = 'puzzle';
    puzzle.innerHTML = d.puzzle;
    body.append(head, story, puzzle);

    if (d.widget) Widgets[d.widget.type](body, d.widget);
    if (d.python) Widgets.python(body, d.python);

    // Indices progressifs
    const hintBox = document.createElement('div');
    hintBox.className = 'hints';
    const hintBtn = document.createElement('button');
    hintBtn.type = 'button';
    hintBtn.className = 'btn ghost small';
    const showHints = () => {
      const k = state.hints[d.day] || 0;
      hintBox.querySelectorAll('.hint').forEach((n) => n.remove());
      for (let i = 0; i < k; i++) {
        const h = document.createElement('div');
        h.className = 'hint';
        h.innerHTML = '<b>Indice ' + (i + 1) + ' :</b> ' + d.hints[i];
        hintBox.insertBefore(h, hintBtn);
      }
      hintBtn.style.display = k >= d.hints.length ? 'none' : '';
      hintBtn.textContent = '💡 Un indice ? (' + k + '/' + d.hints.length + ')';
    };
    hintBtn.addEventListener('click', () => {
      state.hints[d.day] = (state.hints[d.day] || 0) + 1; save(); showHints();
    });
    hintBox.appendChild(hintBtn);
    body.appendChild(hintBox);
    showHints();

    // Formulaire de réponse
    const form = document.createElement('form');
    form.className = 'answer';
    form.autocomplete = 'off';
    form.innerHTML =
      '<label for="ans">Ta réponse</label><div class="row"><input id="ans" type="text" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Écris ta réponse ici" /><button class="btn" type="submit">Valider</button></div><div class="feedback" role="status"></div>';
    const reveal = document.createElement('div');
    reveal.className = 'reveal';
    body.append(form, reveal);

    const showSolved = () => {
      form.classList.add('done');
      form.querySelector('input').disabled = true;
      form.querySelector('button').disabled = true;
      reveal.innerHTML =
        '<div class="success">✅ Bravo, énigme résolue !</div>' +
        '<div class="explain">' + d.explain + '</div>';
    };
    if (state.solved[d.day]) showSolved();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const fb = form.querySelector('.feedback');
      if (!normalize(input.value)) return;
      if (isCorrect(d, input.value)) {
        state.solved[d.day] = true; save();
        fb.textContent = '';
        showSolved(); renderGrid(); confetti();
        reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const msgs = ['Pas tout à fait… relis l\'énoncé !', 'Hmm, ce n\'est pas ça. Un indice, peut-être ?', 'Presque ? Vérifie l\'orthographe et recommence.', 'Les lutins secouent la tête. Essaie encore !'];
        fb.textContent = '❌ ' + msgs[Math.floor(Math.random() * msgs.length)];
        form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
      }
    });

    modal.hidden = false;
    document.body.classList.add('noscroll');
    $('#modal-scroll').scrollTop = 0;
  }

  function closeModal() { modal.hidden = true; document.body.classList.remove('noscroll'); }
  $('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  // ---------- Reset ----------
  $('#reset').addEventListener('click', () => {
    if (confirm('Effacer toute la progression de ce calendrier ?')) {
      state = { solved: {}, hints: {} }; save(); renderGrid();
    }
  });

  // ---------- Confettis ----------
  function confetti() {
    const colors = ['#ffcf4a', '#e63946', '#2a9d63', '#5ec2ff', '#fff'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('i');
      c.className = 'confetti';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.6 + Math.random() * 1.6 + 's';
      c.style.animationDelay = Math.random() * 0.4 + 's';
      c.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3800);
    }
  }

  // ---------- Neige ----------
  (function snow() {
    const cv = $('#snow');
    if (!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    let w, h, flakes;
    const resize = () => {
      w = cv.width = window.innerWidth; h = cv.height = window.innerHeight;
      flakes = Array.from({ length: Math.min(90, Math.floor(w / 14)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 2.5, v: 0.4 + Math.random() * 1, d: Math.random() * Math.PI * 2,
      }));
    };
    resize(); window.addEventListener('resize', resize);
    (function frame() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      flakes.forEach((f) => {
        f.y += f.v; f.d += 0.01; f.x += Math.sin(f.d) * 0.4;
        if (f.y > h) { f.y = -5; f.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(frame);
    })();
  })();

  // ---------- Bandeau d'accueil ----------
  const intro = $('#countdown');
  if (MAX === 0) {
    const d = Math.ceil((new Date(YEAR, 11, 1) - now) / 86400000);
    intro.textContent = '⏳ Ouverture dans ' + d + ' jour' + (d > 1 ? 's' : '') + ' — le 1er décembre !';
  } else if (params.has('tout') || params.has('jour')) {
    intro.textContent = '👀 Mode aperçu : jours débloqués jusqu\'au ' + MAX;
  } else {
    intro.textContent = '📅 Nous sommes le ' + now.getDate() + ' décembre : les portes 1 à ' + MAX + ' sont ouvertes.';
  }

  renderGrid();
})();
