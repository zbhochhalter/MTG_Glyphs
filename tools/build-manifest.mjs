// Rebuilds manifest.json from the glyph folders, naming cards from Scryfall's
// oracle data. The version comes from package.json.
//   node tools/build-manifest.mjs [--offline]
import path from 'node:path';
import { ROOT, listGlyphs, readJSON, writeJSON, oracleIndex } from './lib/common.mjs';

const offline = process.argv.includes('--offline');
const pkg = readJSON(path.join(ROOT, 'package.json'));
const glyphs = listGlyphs();
const man = { version: pkg.version, cards: {}, subtypes: {}, types: {} };
const cards = glyphs.filter(g => g.kind === 'cards');
const idx = cards.length ? await oracleIndex({ offline }) : null;
for (const g of glyphs) {
  if (g.kind === 'cards') {
    const name = idx.ids[g.key];
    if (!name) console.error(`warning: ${g.key} is not a known oracle id`);
    man.cards[g.key] = { name: name || null, file: g.file };
  } else man[g.kind][g.key] = g.file;
}
// cards sorted by name reads better in diffs than by id
man.cards = Object.fromEntries(Object.entries(man.cards).sort((a, b) => (a[1].name || '').localeCompare(b[1].name || '')));
writeJSON(path.join(ROOT, 'manifest.json'), man);
console.log(`manifest ${man.version}: ${cards.length} cards, ${Object.keys(man.subtypes).length} subtypes, ${Object.keys(man.types).length} types`);
