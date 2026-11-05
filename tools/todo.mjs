// Lists subtypes, types and top cards that have no glyph yet.
//   node tools/todo.mjs [--cards 200]
import path from 'node:path';
import fs from 'node:fs';
import { ROOT, readJSON, keyOf } from './lib/common.mjs';
const args = process.argv.slice(2);
const N = args.includes('--cards') ? +args[args.indexOf('--cards') + 1] : 100;
const has = (kind, key) => fs.existsSync(path.join(ROOT, 'glyphs', kind, key + '.svg'));
const cats = readJSON(path.join(ROOT, 'data/catalogs.json'));
const TYPES = ['creature', 'instant', 'sorcery', 'enchantment', 'artifact', 'land', 'planeswalker', 'battle', 'kindred', 'token', 'emblem'];
const t = TYPES.filter(k => !has('types', k));
console.log(`types missing (${t.length}/${TYPES.length}): ${t.join(', ')}`);
for (const [g, list] of Object.entries(cats)) {
  const m = list.filter(n => !has('subtypes', keyOf(n)));
  console.log(`${g} subtypes missing (${m.length}/${list.length}): ${m.join(', ')}`);
}
const top = readJSON(path.join(ROOT, 'data/top-cards.json')).slice(0, N);
const c = top.filter(x => !has('cards', x.oracle_id));
console.log(`top ${N} cards missing (${c.length}): ${c.map(x => x.name).join(' | ')}`);
