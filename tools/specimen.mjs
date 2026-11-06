// Specimen sheet for a sign-system set: the composition grid, every radical
// and determinative with its meaning, the type signs and sample signs, all
// numbered so review feedback can name them. Includes a 15 mm strip and a
// greyscale strip.
//   node tools/specimen.mjs --set hieroglyph [--out path.png]
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { INK, COLOURS, recolour, argSet, readJSON, listGlyphs, oracleIndex, setInfo } from './lib/common.mjs';

const set = argSet();
const args = process.argv.slice(2);
const out = args.includes('--out') ? path.resolve(args[args.indexOf('--out') + 1]) : path.join(set.path, 'specimen.png');
await import(path.join(set.artPath, '_grammar.mjs'));
const kit = await import('./lib/hierokit.mjs');
const signs = readJSON(path.join(set.path, 'signs.json'));
const glyphs = listGlyphs(set);
const idx = glyphs.some(g => g.kind === 'cards') ? await oracleIndex({ offline: true }).catch(() => oracleIndex()) : null;
const names = Object.keys(COLOURS);
const txt = g => fs.readFileSync(g.abs, 'utf8');
let ci = 0;
const tile = (no, svgText, title, sub, size = 120) => {
  const [acc, ground] = COLOURS[names[ci++ % names.length]];
  return `<div class="t" style="background:${ground}"><span class="no">${no}</span>${recolour(svgText, INK, acc, size)}<b>${title}</b>${sub ? `<i>${sub}</i>` : ''}</div>`;
};
const detSvg = k => kit.svgOf(kit.T(kit.DETS[k].draw(), { s: 3.2, dx: 50, dy: 50 }));
const label = g => (g.kind === 'cards' ? idx?.ids[g.key] || g.key.slice(0, 8) : g.key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
const gram = (kind, key) => { const m = signs[kind]?.[key]; if (!m) return ''; return [m.determinative && `det: ${m.determinative}`, m.radicals?.length && `rad: ${m.radicals.join(', ')}`, m.cartouche && 'cartouche'].filter(Boolean).join(' · '); };

// composition grid diagram
const G = kit.GRID, C = G.cartouche;
const grid = `<svg viewBox="0 0 100 100" width="240" height="240" style="background:#fff">
<rect x="6" y="6" width="88" height="88" fill="none" stroke="#bbb" stroke-dasharray="2 2"/>
<rect x="${G.pic.x0}" y="${G.pic.y0}" width="${G.pic.x1 - G.pic.x0}" height="${G.pic.y1 - G.pic.y0}" fill="#e9efe0" stroke="#7a9"/>
<rect x="${C.x0}" y="${C.y0}" width="${C.x1 - C.x0}" height="${C.y1 - C.y0}" rx="${C.r}" fill="none" stroke="#b97" stroke-dasharray="3 2"/>
${G.slots.map((s, i) => `<rect x="${s.cx - 8 * s.s}" y="${s.cy - 8 * s.s}" width="${16 * s.s}" height="${16 * s.s}" fill="#dde8f3" stroke="#79a"/><text x="${s.cx}" y="${s.cy + 2}" font-size="5" text-anchor="middle">R${i + 1}</text>`).join('')}
<rect x="${G.det.cx - 6}" y="${G.det.cy - 6}" width="12" height="12" fill="#f3e3dd" stroke="#a87"/><text x="${G.det.cx}" y="${G.det.cy + 2}" font-size="5" text-anchor="middle">D</text>
<text x="50" y="58" font-size="6" text-anchor="middle">pictogram</text><text x="50" y="94" font-size="4.5" text-anchor="middle" fill="#a76">cartouche</text></svg>`;

const radicals = Object.entries(signs.radicals).map(([k, r], i) => tile(`R${i + 1}`, txt({ abs: path.join(set.path, 'glyphs/radicals', k + '.svg') }), k, r.meaning, 84));
const dets = Object.entries(kit.DETS).map(([k, d], i) => tile(`D${i + 1}`, detSvg(k), k, d.meaning.replace(/^[^:]+: /, ''), 84));
const sampleList = [...glyphs.filter(g => g.kind === 'types'), ...glyphs.filter(g => g.kind === 'subtypes'), ...glyphs.filter(g => g.kind === 'cards')];
const samples = sampleList.map((g, i) => tile(`${g.kind === 'types' ? 'T' : 'S'}${i + 1}`, txt(g), label(g), gram(g.kind, g.key)));
ci = 0;
const strip = (size, grey) => `<div class="strip ${grey ? 'grey' : ''}">${sampleList.map((g, i) => { const [acc, ground] = COLOURS[names[i % names.length]]; return `<div style="background:${ground}">${recolour(txt(g), INK, acc, size)}</div>`; }).join('')}</div>`;

const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:16px;font:13px system-ui,sans-serif;color:#2b3538;background:#fff;width:1580px}
h1{font-size:20px;margin:0 0 4px}h2{font-size:15px;margin:18px 0 8px}
.row{display:flex;gap:20px;align-items:flex-start}
.g{display:flex;flex-wrap:wrap;gap:8px}
.t{position:relative;width:150px;border-radius:6px;padding:10px 4px 6px;display:flex;flex-direction:column;align-items:center;text-align:center}
.t b{font-size:13px;margin-top:2px}.t i{font-size:10px;opacity:.75;font-style:normal;line-height:1.25}
.no{position:absolute;top:4px;left:6px;font:600 12px ui-monospace,monospace;color:#2b3538;background:#fff8;border-radius:3px;padding:0 3px}
.strip{display:flex;flex-wrap:wrap;gap:4px}.strip div{padding:2px;border-radius:3px}.grey{filter:grayscale(1)}
.notes{max-width:900px;line-height:1.45}
</style>
<h1>${set.title}: specimen</h1>
<div class="row">${grid}<div class="notes"><p><b>Grammar.</b> A sign is a pictogram (centred) plus up to two radicals (R1 above, R2 to the right) plus one determinative (D, lower-left). A rounded cartouche around the pictogram marks a named thing: planeswalkers and legendary cards. Every stroke is ${kit.STROKE} units with round caps; radicals and determinatives are always ink; the pictogram's mass is filled with the card colour on its right half (or wholly).</p>
<p>Numbers: R = radical, D = determinative, T = type sign, S = sample sign.</p></div></div>
<h2>Radicals</h2><div class="g">${radicals.join('')}</div>
<h2>Determinatives (lower-left corner)</h2><div class="g">${dets.join('')}</div>
<h2>Type signs and sample signs</h2><div class="g">${samples.join('')}</div>
<h2>At 15 mm</h2>${strip('15mm')}
<h2>Greyscale</h2>${strip(56, true)}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1612, height: 900 } });
await page.setContent(html.replace(/width="15mm" height="15mm"/g, 'style="width:15mm;height:15mm"'));
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(path.relative(process.cwd(), out));
