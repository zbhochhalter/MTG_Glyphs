// Renders the glyph sources in art/*.mjs into glyphs/.
// Each art module's default export is { subtypes: {key: () => layers},
// types: {...}, cards: {"Card Name": () => layers} }. Cards are written as
// glyphs/cards/<oracle_id>.svg, so the oracle index is needed for them.
// Hand-drawn SVGs that have no art source are left alone.
//   node tools/render-art.mjs [--only key,key] [art/file.mjs ...]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { render, X, pts, lines } from './lib/glyphkit.mjs';
import { ROOT, oracleIndex, keyOf } from './lib/common.mjs';

const args = process.argv.slice(2);
const only = args.includes('--only') ? new Set(args[args.indexOf('--only') + 1].split(',')) : null;
const files = args.filter(a => a.endsWith('.mjs'));
const artDir = path.join(ROOT, 'art');
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
  const s = Math.min(1, 88 / (x1 - x0), 88 / (y1 - y0));
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  return X(ls, { s, cx, cy, dx: 50 - cx, dy: 50 - cy });
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
      try { fs.writeFileSync(path.join(ROOT, 'glyphs', kind, key + '.svg'), render(mod.autofit ? fit(fn()) : fn())); }
      catch (e) { console.error(`${tag} (${name}): ${e.stack}`); process.exitCode = 1; continue; }
      n++;
    }
  }
}
console.log(`rendered ${n} glyphs`);
