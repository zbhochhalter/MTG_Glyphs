// glyphkit: a small vector toolkit for drawing Sketchbook glyphs.
//
// A glyph is a list of layers drawn in painter's order. The kit splits
// every solid shape at x = 50 so its left half is ink and its right half is
// accent, draws ink outlines, and keeps internal structure legible on the
// ink half by drawing it in accent (the "inverse rule"):
//
//   left half:  ink fill, accent detail lines, accent separators where a
//               shape overlaps an earlier one
//   right half: accent fill, ink outlines, ink facet and detail lines
//
// Everything is polygons, which suits the faceted low-poly look and lets the
// kit clip shapes exactly without clip paths (which the file contract bans).
//
// Layer constructors (pts are "x,y x,y ..." strings or [[x,y],...] arrays):
//   S(pts, o)    solid two-tone shape. o.f = facet polylines (right half
//                only), o.d = detail polylines (inverse rule), o.holes = [pts]
//   M(half, o)   mirrored solid: half runs from the top centre, down the
//                right side, to the bottom centre; mirrored about x = 50.
//                o.f and o.d are mirrored too.
//   D(lines, o)  detail polylines, inverse rule. o.m mirrors. o.w width.
//   F(lines, o)  facet polylines: ink, right half only. o.w width.
//   I(pts, o)    inverse fill: accent on the left, ink on the right (eyes,
//                gems, nostrils). o.m mirrors.
//   K(pts)       ink fill.  A(pts) accent fill with ink outline.
//   L(lines, o)  ink polylines everywhere (stems, strings over the ground).
// Polyline strings separate lines with ";".

export const W = { outline: 4, facet: 2.5, detail: 3, sep: 2.5 };
// Facet lines (o.f and F layers) are no longer drawn: the accent half stays a
// clean flat fill. Sources may still carry them; the renderer ignores them.
export const DRAW_FACETS = false;
const SEAM = 50;

// ---------- geometry ----------
export function pts(p) {
  if (Array.isArray(p)) return p.map(q => [+q[0], +q[1]]);
  return p.trim().split(/\s+/).map(s => s.split(',').map(Number));
}
export function lines(l) {
  if (!l) return [];
  if (Array.isArray(l) && Array.isArray(l[0]) && typeof l[0][0] === 'number') return [pts(l)];
  if (Array.isArray(l)) return l.map(x => (typeof x === 'string' ? pts(x) : x));
  return l.split(';').map(s => s.trim()).filter(Boolean).map(pts);
}
const mx = p => p.map(([x, y]) => [100 - x, y]);
export function mirrorHalf(half) {
  const h = pts(half);
  const back = mx(h).reverse();
  // drop duplicated seam points
  const out = h.slice();
  for (const q of back) {
    const last = out[out.length - 1];
    if (Math.abs(last[0] - q[0]) < 1e-6 && Math.abs(last[1] - q[1]) < 1e-6) continue;
    out.push(q);
  }
  const f = out[0], l = out[out.length - 1];
  if (Math.abs(f[0] - l[0]) < 1e-6 && Math.abs(f[1] - l[1]) < 1e-6) out.pop();
  return out;
}
export function area(p) {
  let a = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i], [x2, y2] = p[(i + 1) % p.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}
const orient = (p, cw = true) => ((area(p) > 0) === cw ? p : p.slice().reverse());

function clipPoly(p, keepLeft, at) {
  const inside = q => (keepLeft ? q[0] <= at : q[0] >= at);
  const out = [];
  for (let i = 0; i < p.length; i++) {
    const a = p[i], b = p[(i + 1) % p.length];
    const ia = inside(a), ib = inside(b);
    if (ia) out.push(a);
    if (ia !== ib) {
      const t = (at - a[0]) / (b[0] - a[0]);
      out.push([at, a[1] + t * (b[1] - a[1])]);
    }
  }
  return out.length >= 3 && Math.abs(area(out)) > 0.05 ? out : null;
}
function clipLine(l, keepLeft, at = SEAM) {
  const inside = q => (keepLeft ? q[0] <= at : q[0] >= at);
  const res = [];
  let cur = [];
  for (let i = 0; i < l.length; i++) {
    const a = l[i];
    if (i === 0) { if (inside(a)) cur.push(a); continue; }
    const p = l[i - 1], ip = inside(p), ia = inside(a);
    if (ip && ia) cur.push(a);
    else if (ip !== ia) {
      const t = (at - p[0]) / (a[0] - p[0]);
      const m = [at, p[1] + t * (a[1] - p[1])];
      if (ip) { cur.push(m); res.push(cur); cur = []; }
      else { cur = [m, a]; }
    }
  }
  if (cur.length >= 2) res.push(cur);
  return res.filter(s => s.length >= 2 && len(s) > 0.3);
}
const len = s => s.slice(1).reduce((t, q, i) => t + Math.hypot(q[0] - s[i][0], q[1] - s[i][1]), 0);

function inPoly(q, p) {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [xi, yi] = p[i], [xj, yj] = p[j];
    if ((yi > q[1]) !== (yj > q[1]) && q[0] < ((xj - xi) * (q[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const inShape = (q, s) => inPoly(q, s.poly) && !(s.holes || []).some(h => inPoly(q, h));

// thick polyline -> polygons (for accent lines, which must be fills)
function thick(l, w) {
  const h = w / 2, out = [];
  for (let i = 1; i < l.length; i++) {
    let [x1, y1] = l[i - 1], [x2, y2] = l[i];
    const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1;
    const ux = dx / d, uy = dy / d;
    // square caps so joints and ends close up
    x1 -= ux * h; y1 -= uy * h; x2 += ux * h; y2 += uy * h;
    const nx = -uy * h, ny = ux * h;
    out.push([[x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]]);
  }
  return out;
}

// ---------- shape helpers for authors ----------
export const r1 = v => Math.round(v * 10) / 10;
export function ngon(cx, cy, r, n = 8, rot = 0, ry = r) {
  const o = [];
  for (let i = 0; i < n; i++) {
    const a = ((rot + (360 * i) / n) * Math.PI) / 180;
    o.push([cx + r * Math.sin(a), cy - ry * Math.cos(a)]);
  }
  return o;
}
export function star(cx, cy, ro, ri, n = 5, rot = 0) {
  const o = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? ri : ro, a = ((rot + (180 * i) / n) * Math.PI) / 180;
    o.push([cx + r * Math.sin(a), cy - r * Math.cos(a)]);
  }
  return o;
}
export function rect(x, y, w, h) { return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; }
export function xf(p, { dx = 0, dy = 0, s = 1, sx = s, sy = s, rot = 0, cx = 50, cy = 50 } = {}) {
  const a = (rot * Math.PI) / 180, c = Math.cos(a), si = Math.sin(a);
  return pts(p).map(([x, y]) => {
    let X = (x - cx) * sx, Y = (y - cy) * sy;
    [X, Y] = [X * c - Y * si, X * si + Y * c];
    return [X + cx + dx, Y + cy + dy];
  });
}
// arc polyline from angle a0 to a1 (degrees, 0 = up, clockwise)
export function arc(cx, cy, r, a0, a1, n = 8, ry = r) {
  const o = [];
  for (let i = 0; i <= n; i++) {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    o.push([cx + r * Math.sin(a), cy - ry * Math.cos(a)]);
  }
  return o;
}
export const join = (...ps) => ps.flatMap(p => pts(p));
export const str = p => pts(p).map(q => q.join(',')).join(' ');

// ---------- layers ----------
export const S = (p, o = {}) => ({ t: 'S', p: pts(p), ...o });
export const M = (half, o = {}) => ({
  t: 'S', p: mirrorHalf(half), ...o,
  f: o.f ? lines(o.f).flatMap(l => [l, mx(l)]) : undefined,
  d: o.d ? lines(o.d).flatMap(l => [l, mx(l)]) : undefined,
  holes: o.holes ? o.holes.flatMap(h => [pts(h), mx(pts(h))]) : undefined,
});
export const D = (l, o = {}) => ({ t: 'D', l: lines(l).flatMap(x => (o.m ? [x, mx(x)] : [x])), ...o });
export const F = (l, o = {}) => ({ t: 'F', l: lines(l).flatMap(x => (o.m ? [x, mx(x)] : [x])), ...o });
export const L = (l, o = {}) => ({ t: 'L', l: lines(l).flatMap(x => (o.m ? [x, mx(x)] : [x])), ...o });
export const I = (p, o = {}) => ({ t: 'I', ps: o.m ? [pts(p), mx(pts(p))] : [pts(p)], ...o });
export const K = (p, o = {}) => ({ t: 'K', ps: o.m ? [pts(p), mx(pts(p))] : [pts(p)], ...o });
export const A = (p, o = {}) => ({ t: 'A', p: pts(p), ...o });

// ---------- rendering ----------
const fmt = v => { const r = r1(v); return Object.is(r, -0) ? '0' : String(r); };
function dPoly(p) {
  let s = '', px, py;
  p.forEach(([x, y], i) => {
    const X = fmt(x), Y = fmt(y);
    if (i && X === px && Y === py) return;
    s += (i ? (s.endsWith('M') ? '' : ' ') : 'M') + X + ' ' + Y;
    px = X; py = Y;
  });
  return s + 'Z';
}
function dLine(l) { return 'M' + l.map(([x, y]) => fmt(x) + ' ' + fmt(y)).join(' '); }

export function render(layers) {
  const out = []; // {k:'ink'|'acc'|'st', w, d, eo}
  const push = (k, d, w, eo) => {
    if (!d) return;
    const last = out[out.length - 1];
    if (last && last.k === k && last.w === w && !eo && !last.eo) last.d += d;
    else out.push({ k, d, w, eo });
  };
  const solids = [];
  const inv = (ls, w) => {
    for (const l of ls) {
      for (const s of clipLine(l, true)) for (const q of thick(s, w)) push('acc', dPoly(orient(q)));
      push('st', clipLine(l, false).map(dLine).join(''), w);
    }
  };
  for (const ly of layers.flat(Infinity).filter(Boolean)) {
    if (ly.t === 'S' || ly.t === 'A') {
      const poly = orient(pts(ly.p)), holes = (ly.holes || []).map(h => orient(pts(h), false));
      const eo = holes.length > 0;
      const all = [poly, ...holes];
      if (ly.t === 'A') push('acc', all.map(dPoly).join(''), undefined, eo);
      else {
        push('ink', all.map(p => clipPoly(p, true, SEAM + 0.6)).filter(Boolean).map(dPoly).join(''), undefined, eo);
        push('acc', all.map(p => clipPoly(p, false, SEAM)).filter(Boolean).map(dPoly).join(''), undefined, eo);
      }
      push('st', all.map(dPoly).join(''), ly.w || W.outline);
      // accent separators where this shape's left edges lie over earlier ink
      if (ly.t === 'S' && !ly.nosep) {
        const seps = [];
        // outer rings have positive area (clockwise on screen) and holes
        // negative, so (dy,-dx) always points away from the material
        for (const ring of all) {
          for (let i = 0; i < ring.length; i++) {
            const a = ring[i], b = ring[(i + 1) % ring.length];
            const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 1.5));
            let run = null;
            for (let k = 0; k <= n; k++) {
              const t = k / n, q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
              const dx = b[0] - a[0], dy = b[1] - a[1], dd = Math.hypot(dx, dy) || 1;
              const nx = dy / dd, ny = -dx / dd;
              const o = [q[0] + nx * 3.2, q[1] + ny * 3.2];
              const covered = q[0] < SEAM - 0.5 && o[0] < SEAM && solids.some(s => inShape(o, s));
              if (covered) { (run ||= []).push(q); }
              else if (run) { if (run.length > 1) seps.push([run[0], run[run.length - 1]]); run = null; }
            }
            if (run && run.length > 1) seps.push([run[0], run[run.length - 1]]);
          }
        }
        for (const s of seps) for (const q of thick(s, ly.sepw || W.sep)) push('acc', dPoly(orient(q)));
      }
      if (DRAW_FACETS && ly.f) push('st', lines(ly.f).flatMap(l => clipLine(l, false)).map(dLine).join(''), ly.fw || W.facet);
      if (ly.d) inv(lines(ly.d), ly.dw || W.detail);
      if (ly.t === 'S') solids.push({ poly, holes });
      else solids.push({ poly, holes, acc: true });
    } else if (ly.t === 'D') inv(ly.l, ly.w || W.detail);
    else if (ly.t === 'F' && DRAW_FACETS) push('st', ly.l.flatMap(l => clipLine(l, false)).map(dLine).join(''), ly.w || W.facet);
    else if (ly.t === 'L') push('st', ly.l.map(dLine).join(''), ly.w || W.detail);
    else if (ly.t === 'I') {
      for (const p of ly.ps) {
        const pp = orient(p);
        push('acc', [clipPoly(pp, true, SEAM)].filter(Boolean).map(dPoly).join(''));
        push('ink', [clipPoly(pp, false, SEAM - 0.4)].filter(Boolean).map(dPoly).join(''));
      }
    } else if (ly.t === 'K') {
      for (const p of ly.ps) push('ink', dPoly(orient(p)));
    }
  }
  const body = out.map(e => {
    const eo = e.eo ? ' fill-rule="evenodd"' : '';
    if (e.k === 'ink') return `<path fill="#000"${eo} d="${e.d}"/>`;
    if (e.k === 'acc') return `<path class="accent"${eo} d="${e.d}"/>`;
    return `<path fill="none" stroke="#000" stroke-width="${e.w}" stroke-linejoin="round" stroke-linecap="round" d="${e.d}"/>`;
  }).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n${body}\n</svg>\n`;
}

// Transform whole layers (scale/shift a finished drawing): X(layers, {s, dx, dy, rot})
export function X(layers, o) {
  const P = p => xf(p, o), Ls = l => l && lines(l).map(P);
  return layers.flat(Infinity).filter(Boolean).map(ly => ({
    ...ly,
    p: ly.p && P(ly.p), ps: ly.ps && ly.ps.map(P), l: ly.l && ly.l.map(P),
    f: Ls(ly.f), d: Ls(ly.d), holes: ly.holes && ly.holes.map(P),
  }));
}
