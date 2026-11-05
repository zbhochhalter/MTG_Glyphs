// Review sheets. Recolours glyphs exactly as the Sketchbook renderer does and
// writes labelled sheets of 48 to contact/, each with a strip at 20 mm
// printed size and a greyscale strip.
//   node tools/contact.mjs [--kind cards|subtypes|types] [--keys a,b,c]
//                          [--art art/file.mjs] [--name prefix] [--colour green]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { ROOT, INK, COLOURS, recolour, listGlyphs, readJSON, keyOf, oracleIndex } from './lib/common.mjs';

const args = process.argv.slice(2);
const opt = k => (args.includes('--' + k) ? args[args.indexOf('--' + k) + 1] : null);
let glyphs = listGlyphs();
if (opt('kind')) glyphs = glyphs.filter(g => g.kind === opt('kind'));
if (opt('keys')) { const s = new Set(opt('keys').split(',')); glyphs = glyphs.filter(g => s.has(g.key)); }
if (opt('art')) {
  const mod = (await import(pathToFileURL(path.resolve(opt('art'))).href)).default;
  const want = new Set();
  for (const k of ['types', 'subtypes']) for (const n of Object.keys(mod[k] || {})) want.add(`${k}/${keyOf(n)}`);
  if (mod.cards) { const idx = await oracleIndex(); for (const n of Object.keys(mod.cards)) want.add(`cards/${idx.byName[n.toLowerCase()]}`); }
  glyphs = glyphs.filter(g => want.has(`${g.kind}/${g.key}`));
}
const manifest = readJSON(path.join(ROOT, 'manifest.json'), { cards: {} });
const label = g => (g.kind === 'cards' ? manifest.cards[g.key]?.name || g.key.slice(0, 8) : g.key);
const names = Object.keys(COLOURS);
const fixed = opt('colour');
const prefix = opt('name') || 'sheet';
const outDir = path.join(ROOT, 'contact');
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1640, height: 900 }, deviceScaleFactor: 1 });
for (let s = 0; s * 48 < glyphs.length; s++) {
  const batch = glyphs.slice(s * 48, s * 48 + 48);
  const cell = (g, i, size, grey) => {
    const c = fixed || names[i % names.length];
    const [acc, ground] = COLOURS[c];
    const svg = recolour(fs.readFileSync(path.join(ROOT, g.file), 'utf8'), INK, acc, size);
    return `<div class="c" style="background:${ground}">${svg}${grey ? '' : `<b>${label(g)}</b><i>${c}</i>`}</div>`;
  };
  const html = `<!doctype html><meta charset="utf-8"><style>
    body{margin:12px;font:13px system-ui,sans-serif;background:#fff;color:#2b3538}
    .g{display:grid;grid-template-columns:repeat(8,196px);gap:6px}
    .c{display:flex;flex-direction:column;align-items:center;padding:8px 4px 6px;border-radius:6px}
    .c b{font-weight:600;margin-top:4px;max-width:186px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .c i{font-size:10px;opacity:.6}
    h2{font-size:13px;margin:12px 0 6px}
    .strip{display:flex;flex-wrap:wrap;gap:4px}.strip .c{padding:3px;border-radius:3px}
    .grey{filter:grayscale(1)}
  </style>
  <h2>${prefix} ${s + 1}: ${batch.length} glyphs</h2>
  <div class="g">${batch.map((g, i) => cell(g, i, 160)).join('')}</div>
  <h2>20 mm printed size</h2><div class="strip">${batch.map((g, i) => cell(g, i, '20mm', true)).join('')}</div>
  <h2>greyscale</h2><div class="strip grey">${batch.map((g, i) => cell(g, i, 56, true)).join('')}</div>`;
  await page.setContent(html.replace(/width="20mm" height="20mm"/g, 'style="width:20mm;height:20mm"'));
  const file = path.join(outDir, `${prefix}-${String(s + 1).padStart(2, '0')}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(path.relative(ROOT, file));
}
await browser.close();
