// Renders the glyph sources in art/*.mjs into glyphs/.
// Each art module's default export is { subtypes: {key: () => layers},
// types: {...}, cards: {"Card Name": () => layers} }. Cards are written as
// glyphs/cards/<oracle_id>.svg, so the oracle index is needed for them.
// Hand-drawn SVGs that have no art source are left alone.
//   node tools/render-art.mjs [--set name] [--only key,key] [art/file.mjs ...]
// For sets other than Sketchbook, sources live in <set>/art/ and each
// function returns a composed sign { svg, radicals, determinative, cartouche }
// (see tools/lib/hierokit.mjs); the grammar of every sign is recorded in
// <set>/signs.json for build-manifest. Radicals registered by the set's
// grammar are written to <set>/glyphs/radicals/.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { render, X, pts, lines } from './lib/glyphkit.mjs';
import { ROOT, oracleIndex, keyOf, argSet, readJSON, writeJSON } from './lib/common.mjs';

const args = process.argv.slice(2);
const only = args.includes('--only') ? new Set(args[args.indexOf('--only') + 1].split(',')) : null;
const files = args.filter(a => a.endsWith('.mjs'));
const set = argSet();
const artDir = set.artPath;
const signsPath = path.join(set.path, 'signs.json');
const signs = readJSON(signsPath, { radicals: {}, types: {}, subtypes: {}, cards: {} });
const sources = files.length ? files.map(f => path.resolve(f)) : fs.readdirSync(artDir).filter(f => f.endsWith('.mjs') && !f.startsWith('_')).sort().map(f => path.join(artDir, f));

let idx = null, n = 0;

// Opt-in (export autofit: true): shrink and recentre a drawing whose outline
// would run past 6..94, so card sources needn't be nudged by hand.
function fit(layers) {
  const ls = layers.flat(Infinity).filter(Boolean);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  const see = p => { for (const [x, y] of p) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); } };
  for (const l of ls) { if (l.p) see(pts(l.p)); (l.ps || []).forEach(see); (l.l || []).forEach(see); }
  x0 -= 2; y0 -= 2; x1 += 2; y1 += 2;
  if (x0 >= 6 && y0 >= 6 && x1 <= 94 && y1 <= 94) return ls;
  // scale about x = 50 so the ink/accent split stays put; recentre vertically
  const cy = (y0 + y1) / 2;
  const s = Math.min(1, 44 / Math.max(50 - x0, x1 - 50), 88 / (y1 - y0));
  return X(ls, { s, cx: 50, cy, dy: 50 - cy });
}
const seen = new Map();
for (const src of sources) {
  const mod = (await import(pathToFileURL(src).href)).default;
  for (const kind of ['types', 'subtypes', 'cards']) {
    for (const [name, fn] of Object.entries(mod[kind] || {})) {
      let key = kind === 'cards' ? name : keyOf(name);
      if (only && !only.has(key) && !only.has(name)) continue;
      if (kind === 'cards') {
        idx ||= await oracleIndex();
        const id = idx.byName[name.toLowerCase()];
        if (!id) { console.error(`unknown card name: ${name}`); process.exitCode = 1; continue; }
        key = id;
      }
      const tag = `${kind}/${key}`;
      if (seen.has(tag)) { console.error(`${tag} defined in both ${seen.get(tag)} and ${path.basename(src)}`); process.exitCode = 1; }
      seen.set(tag, path.basename(src));
      try {
        const outDir = path.join(set.path, 'glyphs', kind);
        fs.mkdirSync(outDir, { recursive: true });
        const res = fn();
        if (res && typeof res.svg === 'string') {
          fs.writeFileSync(path.join(outDir, key + '.svg'), res.svg);
          signs[kind][key] = { radicals: res.radicals, determinative: res.determinative, ...(res.cartouche ? { cartouche: true } : {}) };
        } else fs.writeFileSync(path.join(outDir, key + '.svg'), render(mod.autofit ? fit(res) : res));
      }
      catch (e) { console.error(`${tag} (${name}): ${e.stack}`); process.exitCode = 1; continue; }
      n++;
    }
  }
}
if (set.name !== 'sketchbook') {
  const kit = await import('./lib/hierokit.mjs');
  const outDir = path.join(set.path, 'glyphs', 'radicals');
  fs.mkdirSync(outDir, { recursive: true });
  for (const [key, r] of Object.entries(kit.RADICALS)) {
    fs.writeFileSync(path.join(outDir, key + '.svg'), kit.radicalSheet(key).svg);
    signs.radicals[key] = { meaning: r.meaning };
    n++;
  }
  signs.determinatives = Object.fromEntries(Object.entries(kit.DETS).map(([k, d]) => [k, { meaning: d.meaning }]));
  writeJSON(signsPath, signs);
}
console.log(`rendered ${n} glyphs (${set.name})`);
