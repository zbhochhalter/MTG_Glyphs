// Checks every glyph against the file contract and the manifest.
//   node tools/validate.mjs [--set name|--all-sets] [--offline] [--no-oracle] [--quiet] [files...]
// --offline uses the cached oracle index even if it is stale.
// Exit code 1 on any error. Warnings are printed but don't fail.
import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import { ROOT, listGlyphs, readJSON, oracleIndex, argSet, SETS } from './lib/common.mjs';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const flag = f => args.includes(f);
// --all-sets: run this script once per set and fail if any fails
if (args.includes('--all-sets')) {
  const rest = args.filter(a => a !== '--all-sets');
  let bad = 0;
  for (const name of Object.keys(SETS.sets)) {
    console.log(`== ${name}`);
    const r = spawnSync(process.execPath, [process.argv[1], '--set', name, ...rest], { stdio: 'inherit' });
    bad ||= r.status;
  }
  process.exit(bad ? 1 : 0);
}
const set = argSet();
// a sign-system set (one that has radicals) follows the stricter Hieroglyph rules
const SIGNS = readJSON(path.join(set.path, 'signs.json'), null);
const STROKE = SIGNS ? 4.5 : null;
const only = args.filter(a => a.endsWith('.svg')).map(a => path.relative(set.path, path.resolve(a)));

const MAX_BYTES = 6 * 1024;
const ELEMENTS = new Set(['svg', 'g', 'path', 'polygon', 'polyline', 'rect', 'circle', 'ellipse', 'line']);
const GEOM = ['d', 'points', 'x', 'y', 'width', 'height', 'cx', 'cy', 'r', 'rx', 'ry', 'x1', 'y1', 'x2', 'y2', 'transform'];
const PAINT = ['fill', 'stroke', 'stroke-width', 'stroke-linejoin', 'stroke-linecap', 'stroke-miterlimit', 'fill-rule', 'class'];
const ATTRS = new Set([...GEOM, ...PAINT]);
// balance thresholds, measured on the rasterised glyph
const BAL = SIGNS ? { leftInk: 0.55, rightAcc: 0.15, minAcc: 0.06 } : { leftInk: 0.55, rightAcc: 0.22, minAcc: 0.12 };

const errors = [], warnings = [];
const NAMES = Object.fromEntries(Object.entries(readJSON(set.manifestPath, {}).cards || {}).map(([k, v]) => [`glyphs/cards/${k}.svg`, v.name]));
const label = f => (NAMES[f] ? `${f} (${NAMES[f]})` : f);
const err = (f, m) => errors.push(`${label(f)}: ${m}`);
const warn = (f, m) => warnings.push(`${label(f)}: ${m}`);

function parse(txt, f) {
  const nodes = [];
  const stack = [];
  const body = txt.replace(/^\s*<\?xml[^>]*\?>/, '');
  if (/<!--/.test(body)) err(f, 'comments are not allowed');
  if (/<!/.test(body.replace(/<!--[\s\S]*?-->/g, ''))) err(f, 'DOCTYPE/CDATA not allowed');
  const re = /<(\/?)([A-Za-z][\w:.-]*)((?:\s+[^\s=>/]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g;
  let m, pos = 0;
  while ((m = re.exec(body))) {
    if (m.index !== pos) { err(f, `unparseable markup near offset ${pos}`); break; }
    pos = re.lastIndex;
    if (m[5] !== undefined) { if (m[5].trim()) err(f, 'text content is not allowed'); continue; }
    const [, close, name, attrStr, selfClose] = m;
    if (close) { if (stack.pop()?.name !== name) err(f, `mismatched </${name}>`); continue; }
    const attrs = {};
    for (const a of attrStr.matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
      if (a[1] in attrs) err(f, `duplicate attribute ${a[1]} on <${name}>`);
      attrs[a[1]] = a[2] ?? a[3];
    }
    const node = { name, attrs, parent: stack[stack.length - 1] || null };
    nodes.push(node);
    if (!selfClose) stack.push(node);
  }
  if (pos !== body.length) err(f, 'trailing unparseable markup');
  if (stack.length) err(f, 'unclosed elements');
  return nodes;
}

function checkFile(g) {
  const f = g.file, abs = g.abs;
  const buf = fs.readFileSync(abs), txt = buf.toString('utf8');
  if (buf.length > MAX_BYTES) err(f, `${buf.length} bytes, over ${MAX_BYTES}`);
  const nodes = parse(txt, f);
  const root = nodes[0];
  if (!root || root.name !== 'svg') { err(f, 'root element must be <svg>'); return; }
  if (nodes.filter(n => n.name === 'svg').length > 1) err(f, 'nested <svg> not allowed');
  const ra = root.attrs;
  if (ra.xmlns !== 'http://www.w3.org/2000/svg') err(f, 'root needs xmlns="http://www.w3.org/2000/svg"');
  if (ra.viewBox !== '0 0 100 100') err(f, `viewBox must be "0 0 100 100", got "${ra.viewBox}"`);
  for (const a of Object.keys(ra)) if (!['xmlns', 'viewBox'].includes(a)) err(f, `root attribute "${a}" not allowed`);
  let accents = 0, maxW = 0;
  for (const n of nodes.slice(1)) {
    if (!ELEMENTS.has(n.name)) { err(f, `<${n.name}> not allowed`); continue; }
    for (const [a, v] of Object.entries(n.attrs)) {
      if (!ATTRS.has(a)) { err(f, `attribute "${a}" on <${n.name}> not allowed`); continue; }
      if ((a === 'width' || a === 'height') && n.name !== 'rect') err(f, `${a} only allowed on <rect>`);
      if (GEOM.includes(a) && /\d\.\d\d/.test(v)) err(f, `${a} has more than one decimal place`);
      if (/url\(|#[0-9a-f]{3,8}/i.test(v) && !((a === 'fill' || a === 'stroke') && v === '#000')) {
        if (a === 'fill' || a === 'stroke') err(f, `${a}="${v}" not allowed (use #000, none or class="accent")`);
        else if (/url\(/.test(v)) err(f, `external or paint-server reference in ${a}`);
      }
      if ((a === 'fill' || a === 'stroke') && !['#000', 'none'].includes(v)) err(f, `${a}="${v}" not allowed (use #000, none or class="accent")`);
      if (a === 'class' && v !== 'accent') err(f, `class="${v}" not allowed`);
      if (a === 'stroke-width') {
        const w = +v; maxW = Math.max(maxW, w);
        if (!(w >= 2)) err(f, `stroke-width ${v} under 2`);
        if (w > 5) err(f, `stroke-width ${v} over 5`);
        if (STROKE && w !== STROKE) err(f, `stroke-width ${v}: this set uses ${STROKE} everywhere`);
      }
    }
    if (n.attrs.class === 'accent') {
      accents++;
      if ('fill' in n.attrs) err(f, `accent <${n.name}> must not carry fill`);
      if ('stroke' in n.attrs && n.attrs.stroke !== 'none') err(f, 'accent shapes are fills, never strokes');
      if (n.name === 'g') err(f, 'class="accent" goes on shapes, not groups');
      for (let p = n.parent; p && p !== root; p = p.parent) if ('fill' in p.attrs || 'class' in p.attrs) err(f, 'accent shape inside a group that sets fill or class');
    }
    if (n.name === 'g' && n.attrs.class) err(f, 'class not allowed on <g>');
  }
  // radicals are ink-only by definition
  if (g.kind === 'radicals') return;
  if (!accents) err(f, 'no accent shapes');
  if (maxW && maxW < 3.5) warn(f, `heaviest stroke is ${maxW}; outlines should be 3.5 to 5`);
  balance(f, txt);
}

// Rasterise with pure colours and measure each half.
function balance(f, txt) {
  const svg = txt
    .replace(/class="accent"/g, 'fill="#ff0000" class="accent"')
    .replace('<svg', '<svg fill="#000"');
  const N = 200;
  let px;
  try {
    px = new Resvg(svg, { fitTo: { mode: 'width', value: N }, background: '#ffffff' }).render().pixels;
  } catch (e) { err(f, 'does not render: ' + e.message); return; }
  const c = { inkL: 0, inkR: 0, accL: 0, accR: 0 };
  let x0 = N, x1 = -1, y0 = N, y1 = -1;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const i = (y * N + x) * 4, r = px[i], gg = px[i + 1], b = px[i + 2];
    const left = x < N / 2;
    let painted = false;
    if (r < 100 && gg < 100 && b < 100) { left ? c.inkL++ : c.inkR++; painted = true; }
    else if (r > 180 && gg < 90 && b < 90) { left ? c.accL++ : c.accR++; painted = true; }
    else if (r < 245 || gg < 245) painted = true;
    if (painted) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  }
  const L = c.inkL + c.accL, R = c.inkR + c.accR;
  if (L < 200 || R < 200) { err(f, 'one half is (nearly) empty'); return; }
  const leftInk = c.inkL / L, rightAcc = c.accR / R, acc = (c.accL + c.accR) / (L + R);
  if (leftInk < BAL.leftInk) err(f, `left half only ${(leftInk * 100).toFixed(0)}% ink (min ${BAL.leftInk * 100}%)`);
  if (rightAcc < BAL.rightAcc) err(f, `right half only ${(rightAcc * 100).toFixed(0)}% accent (min ${BAL.rightAcc * 100}%)`);
  if (acc < BAL.minAcc) err(f, `accent is only ${(acc * 100).toFixed(0)}% of the glyph`);
  const s = 100 / N, bb = [x0 * s, y0 * s, (x1 + 1) * s, (y1 + 1) * s];
  if (bb[0] < 2 || bb[1] < 2 || bb[2] > 98 || bb[3] > 98) err(f, `paint reaches the edge (${bb.map(v => v.toFixed(0)).join(',')})`);
  else if (bb[0] < 4 || bb[1] < 4 || bb[2] > 96 || bb[3] > 96) warn(f, `crowds the edge (${bb.map(v => v.toFixed(0)).join(',')})`);
  const cx = (bb[0] + bb[2]) / 2, cy = (bb[1] + bb[3]) / 2;
  if (!SIGNS && (Math.abs(cx - 50) > 8 || Math.abs(cy - 50) > 10)) warn(f, `off centre (${cx.toFixed(0)},${cy.toFixed(0)})`);
  if (bb[2] - bb[0] < 50 && bb[3] - bb[1] < 50) warn(f, 'small: fills less than half the square');
  if (flag('--stats')) console.log(f, JSON.stringify({ leftInk: +leftInk.toFixed(2), rightAcc: +rightAcc.toFixed(2), acc: +acc.toFixed(2), bbox: bb.map(Math.round) }));
}

const all = listGlyphs(set);
const glyphs = only.length ? all.filter(g => only.includes(g.file)) : all;
for (const g of glyphs) checkFile(g);

if (!only.length) {
  const man = readJSON(set.manifestPath);
  const mf = path.relative(ROOT, set.manifestPath);
  if (!man) err(mf, 'missing');
  else {
    if (!/^\d+\.\d+\.\d+$/.test(man.version || '')) err(mf, 'version must be semver');
    if (man.version !== SETS.version) err(mf, `version ${man.version} differs from sets.json ${SETS.version}; the sets are versioned together`);
    const listed = new Set();
    const kinds = SIGNS ? ['cards', 'subtypes', 'types', 'radicals'] : ['cards', 'subtypes', 'types'];
    for (const kind of kinds) {
      for (const [k, v] of Object.entries(man[kind] || {})) {
        const file = typeof v === 'string' ? v : v.file;
        if (kind === 'cards' && !v.name) err(mf, `card ${k} has no name`);
        if (file !== `glyphs/${kind}/${k}.svg`) err(mf, `${kind}.${k} points at ${file}`);
        if (!fs.existsSync(path.join(set.path, file))) err(mf, `${kind}.${k}: no file ${file}`);
        listed.add(file);
        // the grammar: every sign names its radicals and determinative, and they must exist
        if (SIGNS && kind !== 'radicals') {
          if (!Array.isArray(v.radicals)) err(mf, `${kind}.${k} has no radicals list`);
          else {
            if (v.radicals.length > 2) err(mf, `${kind}.${k} has ${v.radicals.length} radicals (max 2)`);
            for (const r of v.radicals) if (!fs.existsSync(path.join(set.path, 'glyphs/radicals', r + '.svg'))) err(mf, `${kind}.${k} uses radical "${r}", which has no glyphs/radicals/${r}.svg`);
          }
          if (!v.determinative) err(mf, `${kind}.${k} has no determinative`);
          else if (!(man.determinatives || {})[v.determinative]) err(mf, `${kind}.${k} uses unknown determinative "${v.determinative}"`);
        }
      }
    }
    for (const g of all) if (!listed.has(g.file)) err(g.file, 'no manifest entry');
    if (!flag('--no-oracle')) {
      try {
        const idx = await oracleIndex({ offline: flag('--offline') });
        for (const id of Object.keys(man.cards || {})) if (!idx.ids[id]) err(mf, `oracle id ${id} unknown to Scryfall`);
        for (const g of all.filter(g => g.kind === 'cards')) if (!/^[0-9a-f-]{36}$/.test(g.key)) err(g.file, 'card files are named <oracle_id>.svg');
      } catch (e) { err('oracle check', e.message); }
    }
  }
}

if (!flag('--quiet')) for (const w of warnings) console.log('warning ' + w);
for (const e of errors) console.log('error   ' + e);
console.log(`${set.name}: ${glyphs.length} glyphs checked: ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
