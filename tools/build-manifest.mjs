// Rebuilds manifest.json from the glyph folders, naming cards from Scryfall's
// oracle data. The version comes from package.json.
//   node tools/build-manifest.mjs [--set name] [--offline]
// Sets are versioned together: every manifest takes its version from sets.json.
// Sign-system sets also record each sign's radicals and determinative, read
// from <set>/signs.json (written by render-art).
import path from 'node:path';
import { ROOT, listGlyphs, readJSON, writeJSON, oracleIndex, argSet, SETS } from './lib/common.mjs';

const offline = process.argv.includes('--offline');
const set = argSet();
const glyphs = listGlyphs(set);
const signs = readJSON(path.join(set.path, 'signs.json'), null);
const man = signs ? { set: set.name, version: SETS.version, cards: {}, subtypes: {}, types: {}, radicals: {}, determinatives: signs.determinatives || {} } : { version: SETS.version, cards: {}, subtypes: {}, types: {} };
const gram = (kind, key) => (signs ? { radicals: signs[kind]?.[key]?.radicals || [], determinative: signs[kind]?.[key]?.determinative || null, ...(signs[kind]?.[key]?.cartouche ? { cartouche: true } : {}) } : {});
const cards = glyphs.filter(g => g.kind === 'cards');
const idx = cards.length ? await oracleIndex({ offline }) : null;
for (const g of glyphs) {
  if (g.kind === 'cards') {
    const name = idx.ids[g.key];
    if (!name) console.error(`warning: ${g.key} is not a known oracle id`);
    man.cards[g.key] = { name: name || null, file: g.file, ...gram('cards', g.key) };
  } else if (g.kind === 'radicals') man.radicals[g.key] = { file: g.file, meaning: signs?.radicals?.[g.key]?.meaning || null };
  else man[g.kind][g.key] = signs ? { file: g.file, ...gram(g.kind, g.key) } : g.file;
}
// cards sorted by name reads better in diffs than by id
man.cards = Object.fromEntries(Object.entries(man.cards).sort((a, b) => (a[1].name || '').localeCompare(b[1].name || '')));
writeJSON(set.manifestPath, man);
console.log(`${set.name} manifest ${man.version}: ${cards.length} cards, ${Object.keys(man.subtypes).length} subtypes, ${Object.keys(man.types).length} types`);
