// Exécute du Python dans le navigateur grâce à Pyodide, dans un Web Worker
// (si le code boucle à l'infini, on arrête le worker au lieu de figer la page).
window.PyRunner = (function () {
  // Adresse de Pyodide. Peut être remplacée (window.PYODIDE_BASE) pour héberger Pyodide soi-même.
  const CDN = window.PYODIDE_BASE || 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  const TIMEOUT_MS = 8000;
  let worker = null;
  let ready = null;
  let loaded = false;

  const WORKER_SRC = [
    'importScripts("' + CDN + 'pyodide.js");',
    'let py, buf = [];',
    'const init = loadPyodide({ indexURL: "' + CDN + '" }).then((p) => {',
    '  py = p;',
    '  py.setStdout({ batched: (s) => buf.push(s) });',
    '  py.setStderr({ batched: (s) => buf.push(s) });',
    '  postMessage({ type: "ready" });',
    '});',
    'init.catch((e) => postMessage({ type: "initerror", error: String(e) }));',
    'onmessage = async (e) => {',
    '  await init; buf = [];',
    '  try { await py.runPythonAsync(e.data.code); postMessage({ type: "done", out: buf.join("\\n") }); }',
    '  catch (err) { postMessage({ type: "error", out: buf.join("\\n"), error: String(err.message || err) }); }',
    '};',
  ].join('\n');

  function start() {
    const url = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }));
    worker = new Worker(url);
    ready = new Promise((resolve, reject) => {
      const onMsg = (e) => {
        if (e.data.type === 'ready') { loaded = true; worker.removeEventListener('message', onMsg); resolve(); }
        if (e.data.type === 'initerror') { worker.removeEventListener('message', onMsg); reject(new Error(e.data.error)); }
      };
      worker.addEventListener('message', onMsg);
      worker.addEventListener('error', () => reject(new Error('worker')), { once: true });
    });
    ready.catch(() => { worker = null; ready = null; loaded = false; });
  }

  // Traduit les erreurs Python les plus courantes en conseils lisibles.
  function friendly(raw) {
    const lines = raw.trim().split('\n');
    const last = lines[lines.length - 1] || raw;
    const lineMatch = raw.match(/File "<exec>", line (\d+)/g);
    const where = lineMatch ? ' (ligne ' + lineMatch[lineMatch.length - 1].match(/(\d+)/)[1] + ')' : '';
    let tip = '';
    if (/SyntaxError/.test(last)) tip = 'Python ne comprend pas cette ligne : il manque peut-être un guillemet, une parenthèse, ou il reste un « ___ » à remplacer.';
    else if (/NameError/.test(last)) tip = 'Python ne connaît pas ce nom : vérifie l\'orthographe (majuscules comprises).';
    else if (/IndentationError/.test(last)) tip = 'Les espaces en début de ligne comptent en Python : vérifie l\'alignement.';
    else if (/TypeError/.test(last)) tip = 'On mélange peut-être des nombres et du texte.';
    return '⚠️ Erreur' + where + ' : ' + last + (tip ? '\n👉 ' + tip : '');
  }

  async function run(code, onStatus) {
    if (/___/.test(code)) return { ok: false, text: '✏️ Il reste des « ___ » à remplacer par ta réponse avant de lancer le programme !' };
    if (!window.Worker) return { ok: false, text: 'Ton navigateur ne peut pas exécuter Python ici.' };
    try {
      if (!worker) start();
      if (!loaded) onStatus && onStatus('Chargement de Python… (la première fois, ça prend 10 à 20 secondes)');
      await ready;
    } catch (e) {
      return { ok: false, text: '📡 Impossible de charger Python (connexion internet nécessaire la première fois). Réessaie dans un instant.' };
    }
    onStatus && onStatus('Exécution…');
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        worker.terminate(); worker = null; ready = null; loaded = false;
        resolve({ ok: false, text: '⏱️ Le programme tourne trop longtemps : boucle infinie ? Je l\'ai arrêté.' });
      }, TIMEOUT_MS);
      const onMsg = (e) => {
        if (e.data.type !== 'done' && e.data.type !== 'error') return;
        clearTimeout(timer);
        worker.removeEventListener('message', onMsg);
        if (e.data.type === 'done') resolve({ ok: true, text: e.data.out || '(le programme n\'a rien affiché — pense à utiliser print)' });
        else resolve({ ok: false, text: (e.data.out ? e.data.out + '\n' : '') + friendly(e.data.error) });
      };
      worker.addEventListener('message', onMsg);
      worker.postMessage({ code });
    });
  }

  return { run, preload: () => { if (!worker) { start(); } } };
})();
