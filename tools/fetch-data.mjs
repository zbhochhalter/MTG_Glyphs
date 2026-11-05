// Refreshes data/catalogs.json (Scryfall subtype catalogs) and
// data/top-cards.json (EDHREC's most-played cards with oracle ids).
//   node tools/fetch-data.mjs [--top 1000]
import path from 'node:path';
import { ROOT, UA, scryfall, writeJSON, oracleIndex, sleep, keyOf } from './lib/common.mjs';

const args = process.argv.slice(2);
const TOP = args.includes('--top') ? +args[args.indexOf('--top') + 1] : 1000;

const catalogs = {};
for (const t of ['creature', 'artifact', 'enchantment', 'land', 'spell', 'planeswalker', 'battle']) {
  catalogs[t] = (await scryfall(`https://api.scryfall.com/catalog/${t}-types`)).data;
}
writeJSON(path.join(ROOT, 'data/catalogs.json'), catalogs);
const n = Object.values(catalogs).flat().length;
const keys = new Set(Object.values(catalogs).flat().map(keyOf));
console.log(`catalogs: ${n} subtypes, ${keys.size} distinct keys`);

// EDHREC: top/year.json, then top/year-past2years-N.json, 100 cards a page
const idx = await oracleIndex();
const top = [];
let page = 'top/year.json';
while (page && top.length < TOP) {
  const r = await fetch('https://json.edhrec.com/pages/' + page, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${r.status} ${page}`);
  const j = await r.json();
  const list = j.cardviews ? j : (j.container?.json_dict?.cardlists || [])[0] || {};
  for (const c of list.cardviews || []) {
    const id = idx.byName[c.name.toLowerCase()];
    top.push({ rank: top.length + 1, name: c.name, oracle_id: id || null, decks: c.num_decks });
  }
  page = list.more;
  await sleep(400);
}
writeJSON(path.join(ROOT, 'data/top-cards.json'), top.slice(0, TOP));
console.log(`top cards: ${Math.min(TOP, top.length)}; unmatched: ${top.filter(c => !c.oracle_id).length}`);
