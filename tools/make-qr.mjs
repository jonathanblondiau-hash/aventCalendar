// Génère tools/qr-jour11.json (matrice du QR code du jour 11).
// Usage (une seule fois, en dehors du dépôt) :
//   npm install qrcode   puis   node tools/make-qr.mjs "<texte base64>"
import QRCode from 'qrcode';
import { writeFileSync } from 'node:fs';
const text = process.argv[2];
const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
const n = qr.modules.size;
const rows = [];
for (let r = 0; r < n; r++) rows.push(Array.from({ length: n }, (_, c) => (qr.modules.data[r * n + c] ? '1' : '0')).join(''));
writeFileSync(new URL('./qr-jour11.json', import.meta.url), JSON.stringify({ text, rows }, null, 1));
console.log('QR', n + 'x' + n, 'pour', text.length, 'caractères');
