// Renders the glyph sources in art/*.mjs into glyphs/.
// Each art module's default export is { subtypes: {key: () => layers},
// types: {...}, cards: {"Card Name": () => layers} }. Cards are written as
// glyphs/cards/<oracle_id>.svg, so the oracle index is needed for them.
// Hand-drawn SVGs that have no art source are left alone.
//   node tools/render-art.mjs [--only key,key] [art/file.mjs ...]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { render } from './lib/glyphkit.mjs';
import { ROOT, oracleIndex, keyOf } from './lib/common.mjs';

const args = process.argv.slice(2);
const only = args.includes('--only') ? new Set(args[args.indexOf('--only') + 1].split(',')) : null;
const files = args.filter(a => a.endsWith('.mjs'));
const artDir = path.join(ROOT, 'art');
const sources = files.length ? files.map(f => path.resolve(f)) : fs.readdirSync(artDir).filter(f => f.endsWith('.mjs') && !f.startsWith('_')).sort().map(f => path.join(artDir, f));

let idx = null, n = 0;
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
      try { fs.writeFileSync(path.join(ROOT, 'glyphs', kind, key + '.svg'), render(fn())); }
      catch (e) { console.error(`${tag} (${name}): ${e.stack}`); process.exitCode = 1; continue; }
      n++;
    }
  }
}
console.log(`rendered ${n} glyphs`);
