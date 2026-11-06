import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const CACHE = path.join(ROOT, '.cache');
export const UA = 'sketchbook-glyphs-tools/1.0 (+https://github.com/zbhochhalter/MTG_Glyphs)';

export const INK = '#2b3538';
export const COLOURS = {
  green: ['#9bb99a', '#f0ddd1'],
  red: ['#d98d78', '#d5e8e3'],
  blue: ['#8fb2cf', '#ede3d4'],
  black: ['#8a8094', '#e3ead4'],
  white: ['#d2bb72', '#e2e8f0'],
  multicolour: ['#d4b468', '#e6dff0'],
  colourless: ['#c4c7ca', '#efe9df'],
};

// Lower case, spaces as hyphens, apostrophes and full stops dropped.
export const keyOf = name =>
  name.toLowerCase().replace(/['’.]/g, '').trim().replace(/\s+/g, '-');

// Exactly the Sketchbook renderer's recolouring.
export function recolour(txt, ink, accent, size = 800) {
  txt = txt.replace(/class="accent"/g, 'fill="' + accent + '" class="accent"');
  txt = txt.replace(/fill="#000"/g, 'fill="' + ink + '"').replace(/stroke="#000"/g, 'stroke="' + ink + '"');
  if (!/<svg[^>]*\sfill=/.test(txt)) txt = txt.replace('<svg', '<svg fill="' + ink + '"');
  txt = txt.replace('<svg', '<svg width="' + size + '" height="' + size + '"');
  return txt;
}

export const readJSON = (f, dflt) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : dflt);
export const writeJSON = (f, v) => fs.writeFileSync(f, JSON.stringify(v, null, 2) + '\n');

export const sleep = ms => new Promise(r => setTimeout(r, ms));
let lastReq = 0;
// Scryfall asks for at most 10 requests a second (fewer for searches); stay
// well under it and back off on 429.
export async function scryfall(url) {
  for (let attempt = 0; ; attempt++) {
    const wait = lastReq + 200 - Date.now();
    if (wait > 0) await sleep(wait);
    lastReq = Date.now();
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
    if (r.status === 429 && attempt < 4) { await sleep(2000 * 2 ** attempt); continue; }
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  }
}

// Oracle index: { ids: {oracle_id: name}, byName: {lower name: oracle_id} },
// built from Scryfall's Oracle Cards bulk file and cached for a week.
export async function oracleIndex({ maxAgeDays = 7, offline = false } = {}) {
  const idx = path.join(CACHE, 'oracle-index.json');
  if (fs.existsSync(idx)) {
    const age = (Date.now() - fs.statSync(idx).mtimeMs) / 864e5;
    if (age < maxAgeDays || offline) return readJSON(idx);
  }
  if (offline) throw new Error('no cached oracle index and --offline given');
  fs.mkdirSync(CACHE, { recursive: true });
  const meta = await scryfall('https://api.scryfall.com/bulk-data/oracle-cards');
  const url = meta.jsonl_download_uri || meta.download_uri;
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const gz = path.join(CACHE, 'oracle-cards.jsonl' + (url.endsWith('.gz') ? '.gz' : ''));
  fs.writeFileSync(gz, Buffer.from(await r.arrayBuffer()));
  let stream = fs.createReadStream(gz);
  if (gz.endsWith('.gz')) stream = stream.pipe(zlib.createGunzip());
  const ids = {}, byName = {}, info = {};
  const add = c => {
    if (!c.oracle_id && c.card_faces?.[0]?.oracle_id) c.oracle_id = c.card_faces[0].oracle_id;
    if (!c.oracle_id) return;
    ids[c.oracle_id] = c.name;
    byName[c.name.toLowerCase()] = c.oracle_id;
    if (c.name.includes(' // ')) byName[c.name.split(' // ')[0].toLowerCase()] ??= c.oracle_id;
    info[c.oracle_id] = { t: c.type_line || c.card_faces?.[0]?.type_line || '', c: c.color_identity || [] };
  };
  if (url.includes('.jsonl')) {
    for await (const line of readline.createInterface({ input: stream })) if (line.trim()) add(JSON.parse(line));
  } else {
    const chunks = []; for await (const c of stream) chunks.push(c);
    JSON.parse(Buffer.concat(chunks).toString('utf8')).forEach(add);
  }
  const out = { updated: meta.updated_at, ids, byName, info };
  writeJSON(idx, out);
  fs.rmSync(gz);
  return out;
}

// ---- glyph sets (sets.json). Each set has its own glyphs/ folder and
// manifest; file paths in a manifest are relative to the set's folder.
export const SETS = readJSON(path.join(ROOT, 'sets.json'));
export function setInfo(name = SETS.default) {
  const s = SETS.sets[name];
  if (!s) throw new Error(`unknown set "${name}" (sets: ${Object.keys(SETS.sets).join(', ')})`);
  const dir = path.join(ROOT, s.dir);
  return { name, ...s, path: dir, manifestPath: path.join(ROOT, s.manifest), artPath: path.join(ROOT, s.art), abs: f => path.join(dir, f) };
}
// --set <name> from argv, else the default set
export const argSet = (argv = process.argv) => setInfo(argv.includes('--set') ? argv[argv.indexOf('--set') + 1] : undefined);
export const KINDS = ['cards', 'subtypes', 'types', 'radicals'];
export function listGlyphs(set = setInfo()) {
  const res = [];
  for (const kind of KINDS) {
    const dir = path.join(set.path, 'glyphs', kind);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).sort()) if (f.endsWith('.svg')) res.push({ kind, key: f.slice(0, -4), file: `glyphs/${kind}/${f}`, abs: path.join(dir, f) });
  }
  return res;
}
