// hierokit: the Hieroglyph set's sign grammar and renderer.
// See sets/hieroglyph/STYLE.md for the rules this code enforces.
//
// A sign is composed from:
//   pic        the pictogram: layers drawn in the pictogram box (x 26-74, y 30-84)
//   radicals   up to two radical keys: the first sits above, the second to the right
//   det        one determinative key (a card type), drawn in the lower-left corner
//   cartouche  true for named things (planeswalkers, legendary cards)
//
// Layers:
//   body(pts, mode)  a closed shape: accent fill (mode 'right' fills only the
//                    part right of x = 50, 'full' fills it all, 'none' leaves
//                    it empty) under an ink outline
//   line(polylines)  open ink strokes
//   solid(pts)       an ink mass (filled and stroked, so corners round off)
//   dot(x, y, r)     a small ink disc
// Every stroke is 4.5 units with round caps and joins.

export const STROKE = 4.5;
export const GRID = {
  pic: { x0: 26, y0: 30, x1: 74, y1: 84, cx: 50, cy: 57 },
  slots: [{ cx: 50, cy: 15, s: 1.1 }, { cx: 85, cy: 52, s: 0.95 }], // radical slots: above, right
  det: { cx: 14, cy: 86, s: 0.9 },
  cartouche: { x0: 22, y0: 28, x1: 78, y1: 90, r: 14, picScale: 0.8 },
};

// ---------- geometry ----------
const r1 = v => Math.round(v * 10) / 10;
export const P = s => (Array.isArray(s) ? s.map(q => [+q[0], +q[1]]) : s.trim().split(/\s+/).map(t => t.split(',').map(Number)));
const PL = s => (Array.isArray(s) && Array.isArray(s[0]) && typeof s[0][0] === 'number' ? [P(s)] : (Array.isArray(s) ? s.map(P) : s.split(';').map(t => t.trim()).filter(Boolean).map(P)));
export const circle = (cx, cy, r, n = 28) => Array.from({ length: n }, (_, i) => { const a = (2 * Math.PI * i) / n; return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; });
export const ellipse = (cx, cy, rx, ry, n = 28) => Array.from({ length: n }, (_, i) => { const a = (2 * Math.PI * i) / n; return [cx + rx * Math.sin(a), cy - ry * Math.cos(a)]; });
// arc from a0 to a1 degrees (0 = up, clockwise), as a polyline
export const arc = (cx, cy, r, a0, a1, n = 12, ry = r) => Array.from({ length: n + 1 }, (_, i) => { const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180; return [cx + r * Math.sin(a), cy - ry * Math.cos(a)]; });
export function rrect(x0, y0, x1, y1, r, n = 6) {
  const c = (cx, cy, a0) => arc(cx, cy, r, a0, a0 + 90, n);
  return [...c(x1 - r, y0 + r, 0), ...c(x1 - r, y1 - r, 90), ...c(x0 + r, y1 - r, 180), ...c(x0 + r, y0 + r, 270)];
}
export function tf(p, { s = 1, sx = s, sy = s, dx = 0, dy = 0, cx = 0, cy = 0, rot = 0 } = {}) {
  const a = (rot * Math.PI) / 180, c = Math.cos(a), si = Math.sin(a);
  return P(p).map(([x, y]) => { let X = (x - cx) * sx, Y = (y - cy) * sy; [X, Y] = [X * c - Y * si, X * si + Y * c]; return [X + cx + dx, Y + cy + dy]; });
}
const area = p => p.reduce((a, q, i) => { const n = p[(i + 1) % p.length]; return a + q[0] * n[1] - n[0] * q[1]; }, 0) / 2;
function clipRight(p, at = 50) {
  const out = [];
  for (let i = 0; i < p.length; i++) {
    const a = p[i], b = p[(i + 1) % p.length], ia = a[0] >= at, ib = b[0] >= at;
    if (ia) out.push(a);
    if (ia !== ib) out.push([at, a[1] + ((at - a[0]) / (b[0] - a[0])) * (b[1] - a[1])]);
  }
  return out.length > 2 && Math.abs(area(out)) > 0.2 ? out : null;
}

// ---------- layers ----------
export const body = (pts, mode = 'right', holes = []) => ({ t: 'body', p: P(pts), mode, holes: holes.map(P) });
export const line = l => ({ t: 'line', l: PL(l) });
export const solid = (pts, holes = []) => ({ t: 'solid', p: P(pts), holes: holes.map(P) });
export const dot = (x, y, r = 2.4) => ({ t: 'solid', p: circle(x, y, r, 12), holes: [] });
// move layers: transform every point (stroke width never scales)
export function T(layers, o) {
  return layers.flat(Infinity).filter(Boolean).map(l => ({ ...l, p: l.p && tf(l.p, o), holes: l.holes && l.holes.map(h => tf(h, o)), l: l.l && l.l.map(q => tf(q, o)) }));
}

// ---------- rendering ----------
const fmt = v => { const r = r1(v); return Object.is(r, -0) ? '0' : String(r); };
const dPoly = p => 'M' + p.map(([x, y]) => fmt(x) + ' ' + fmt(y)).join(' ') + 'Z';
const dLine = l => 'M' + l.map(([x, y]) => fmt(x) + ' ' + fmt(y)).join(' ');
const orient = (p, cw = true) => ((area(p) > 0) === cw ? p : p.slice().reverse());

export function renderLayers(layers) {
  const out = [];
  const push = (k, d, eo) => {
    if (!d) return;
    const last = out[out.length - 1];
    if (last && last.k === k && !eo && !last.eo) last.d += d; else out.push({ k, d, eo });
  };
  for (const l of layers.flat(Infinity).filter(Boolean)) {
    const rings = l.p ? [orient(l.p), ...(l.holes || []).map(h => orient(h, false))] : [];
    const eo = (l.holes || []).length > 0;
    if (l.t === 'body') {
      if (l.mode !== 'none') push('acc', rings.map(r => (l.mode === 'full' ? r : clipRight(r))).filter(Boolean).map(dPoly).join(''), eo);
      push('st', rings.map(dPoly).join(''));
    } else if (l.t === 'solid') { push('ink', rings.map(dPoly).join(''), eo); push('st', rings.map(dPoly).join('')); }
    else if (l.t === 'line') push('st', l.l.map(dLine).join(''));
  }
  return out.map(e => e.k === 'acc' ? `<path class="accent"${e.eo ? ' fill-rule="evenodd"' : ''} d="${e.d}"/>`
    : e.k === 'ink' ? `<path fill="#000"${e.eo ? ' fill-rule="evenodd"' : ''} d="${e.d}"/>`
    : `<path fill="none" stroke="#000" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round" d="${e.d}"/>`).join('\n');
}
export const svgOf = layers => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n${renderLayers(layers)}\n</svg>\n`;

// ---------- grammar ----------
// RADICALS and DETS map a key to { meaning, draw: () => layers in a 16-unit
// box centred on (0, 0) }. They are filled in by sets/hieroglyph/art/_grammar.mjs.
export const RADICALS = {};
export const DETS = {};
const place = (layers, { cx, cy, s }) => T(layers, { s, dx: cx, dy: cy });

// Compose a sign. Returns { svg, radicals, determinative, cartouche }.
export function sign({ pic = [], radicals = [], det = null, cartouche = false }) {
  if (radicals.length > 2) throw new Error('a sign takes at most two radicals');
  for (const r of radicals) if (!RADICALS[r]) throw new Error(`unknown radical "${r}"`);
  if (det && !DETS[det]) throw new Error(`unknown determinative "${det}"`);
  const C = GRID.cartouche;
  const layers = [];
  if (cartouche) layers.push(line([[...rrect(C.x0, C.y0, C.x1, C.y1, C.r), rrect(C.x0, C.y0, C.x1, C.y1, C.r)[0]]]));
  layers.push(cartouche ? T(pic, { s: C.picScale, cx: GRID.pic.cx, cy: GRID.pic.cy + 2 }) : pic);
  radicals.forEach((r, i) => layers.push(place(RADICALS[r].draw(), GRID.slots[i])));
  if (det) layers.push(place(DETS[det].draw(), GRID.det));
  return { svg: svgOf(layers), radicals, determinative: det, cartouche: !!cartouche };
}
// A radical alone, drawn large for the key sheet.
export const radicalSheet = key => ({ svg: svgOf(T(RADICALS[key].draw(), { s: 3.6, dx: 50, dy: 50 })), radicals: [key], determinative: null, cartouche: false });
