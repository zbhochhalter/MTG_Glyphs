// Shared parts for glyph sources. Files starting with "_" are not glyph
// sources themselves.
export * from '../tools/lib/glyphkit.mjs';
import { S, I, D, pts, lines, ngon, xf, rect } from '../tools/lib/glyphkit.mjs';

const mx = p => pts(p).map(([x, y]) => [100 - x, y]);
export { mx };

// the same solid on both sides (ears, antlers, wings, legs)
const mxl = l => l && lines(l).map(mx);
export const S2 = (p, o = {}) => [S(mx(p), { ...o, f: mxl(o.f), d: mxl(o.d) }), S(p, o)];
// thick polyline as a polygon, tapering to w1 at the end
export function limb(p, w0 = 6, w1 = w0) {
  const q = pts(p), L = [], R = [];
  for (let i = 0; i < q.length; i++) {
    const a = q[Math.max(0, i - 1)], b = q[Math.min(q.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
    const w = (w0 + (w1 - w0) * (i / Math.max(1, q.length - 1))) / 2;
    L.push([q[i][0] - (dy / d) * w, q[i][1] + (dx / d) * w]);
    R.push([q[i][0] + (dy / d) * w, q[i][1] - (dx / d) * w]);
  }
  return [...L, ...R.reverse()];
}
// eyes: an inverse diamond pair
export const eyes = (x, y, r = 3.2, n = 4) => I(ngon(x, y, r, n), { m: 1 });
export const eye = (x, y, r = 3.2, n = 4) => I(ngon(x, y, r, n));
export const circle = (cx, cy, r, n = 12, rot = 0) => ngon(cx, cy, r, n, rot);
export { ngon, xf, rect };
