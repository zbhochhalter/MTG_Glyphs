// Recurring motifs, so later batches match earlier ones. See STYLE.md.
import { S, M, D, F, I, K, L, A, pts, ngon, star, xf, arc, rect, mirrorHalf } from '../tools/lib/glyphkit.mjs';
import { S2, limb, mx } from './_parts.mjs';

const T = (p, o) => (o ? xf(p, o) : pts(p));
const Tl = (l, o) => l.split(';').map(s => (o ? xf(s, o) : pts(s)));

// Sword, drawn upright with its tip at the top; o is an xf transform.
export function sword(o, { len = 1 } = {}) {
  const y = v => 50 + (v - 50) * len;
  return [
    S(T(`50,${y(5)} 56.5,${y(14)} 56.5,${y(60)} 43.5,${y(60)} 43.5,${y(14)}`, o), { f: Tl(`50,${y(9)} 50,${y(58)}`, o) }),
    S(T(`32,${y(59)} 68,${y(59)} 68,${y(68)} 32,${y(68)}`, o)),
    S(T(`45.5,${y(68)} 54.5,${y(68)} 54.5,${y(83)} 45.5,${y(83)}`, o)),
    S(T(ngon(50, y(88), 6.5, 6, 30), o)),
  ];
}
// Axe: haft plus a crescent head on the right of the haft
export function axe(o) {
  return [
    S(T('47,10 53,10 53,92 47,92', o)),
    S(T('53,16 66,10 78,18 82,32 78,46 66,52 53,46', o), { f: Tl('53,30 82,32; 66,10 70,30 66,52', o) }),
  ];
}
// Spear: shaft with a leaf blade at the top
export function spear(o) {
  return [
    S(T('48,26 52,26 52,94 48,94', o)),
    S(T('50,4 58,18 56,28 50,32 44,28 42,18', o), { f: Tl('50,6 50,30', o) }),
  ];
}
// Shield: heater shape, mirrored
export const shield = (o, f = '50,14 72,30; 72,30 50,58 64,78') =>
  S(T(mirrorHalf('50,10 80,16 80,44 72,66 50,90'), o), { f: f && Tl(f, o) });
function mirrorPts(half) {
  const h = pts(half), out = h.slice();
  for (const q of h.slice(0, -1).reverse().slice(0, -1).map(([x, y]) => [100 - x, y])) out.push(q);
  out.push([100 - h[0][0], h[0][1]]);
  return out.filter((q, i, a) => i === 0 || q[0] !== a[i - 1][0] || q[1] !== a[i - 1][1]);
}
// Gear with n teeth
export function gear(cx, cy, r, n = 8, depth = 7, hole = 0.38) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const a0 = (360 * i) / n, s = 360 / n;
    for (const [da, rr] of [[-0.3, r - depth], [-0.18, r], [0.18, r], [0.3, r - depth]]) {
      const a = ((a0 + da * s) * Math.PI) / 180;
      p.push([cx + rr * Math.sin(a), cy - rr * Math.cos(a)]);
    }
  }
  return S(p, { holes: hole ? [ngon(cx, cy, r * hole, 8, 22.5)] : undefined, f: [[[cx, cy - r + depth], [cx + (r - depth) * 0.7, cy + (r - depth) * 0.7]]] });
}
// Flame: a tongue of fire, base at (cx, by), height h
export function flame(cx = 50, by = 90, h = 80, w = 1) {
  const X = x => cx + (x - 50) * w, Y = y => by - (90 - y) * (h / 80);
  const p = [[50, 10], [60, 28], [70, 24], [76, 46], [82, 40], [82, 64], [74, 82], [62, 90], [38, 90], [26, 82], [18, 64], [20, 44], [28, 52], [32, 30], [40, 38], [44, 22]];
  return S(p.map(([x, y]) => [X(x), Y(y)]), {
    f: [[[X(50), Y(90)], [X(60), Y(66)], [X(60), Y(28)]], [[X(60), Y(66)], [X(76), Y(46)]], [[X(60), Y(66)], [X(74), Y(82)]]],
  });
}
// Wave crest band
export function wave(y = 60, amp = 10) {
  return S([[8, y + 6], [16, y - amp + 2], [28, y - amp], [38, y - 2], [44, y + 4], [52, y - amp], [64, y - amp - 2], [76, y - 4], [84, y + 2], [92, y - 4], [92, y + 16], [8, y + 16]],
    { f: [[[52, y - amp], [60, y + 16]], [[76, y - 4], [80, y + 16]]] });
}
// Hills and mountains
export function peak(cx, base, h, w, o = {}) {
  return S([[cx, base - h], [cx + w * 0.3, base - h * 0.7], [cx + w / 2, base], [cx - w / 2, base], [cx - w * 0.3, base - h * 0.72]], o);
}
// Wings: a pair spread to both sides, root near (54, y)
export function wings(y = 44, span = 44, drop = 0) {
  const r = [[54, y], [66, y - 16], [82, y - 22], [94, y - 20], [92, y - 8], [96, y + 2], [88, y + 8], [90, y + 18 + drop], [78, y + 18 + drop], [74, y + 28 + drop], [62, y + 20], [54, y + 14]]
    .map(([x, yy]) => [54 + (x - 54) * (span / 44), yy]);
  return S2(r, { f: [[[56, y + 3], r[3]], [[57, y + 8], r[6]], [[57, y + 12], r[8]]] });
}
// Hood/robe bust: a cloaked figure seen from the front
export function bust(y = 56) {
  return M(`50,${y} 62,${y + 4} 74,${y + 14} 82,${y + 36} 50,${y + 36}`, { f: `50,${y + 2} 66,${y + 36}; 62,${y + 4} 74,${y + 22}` });
}
export { T, Tl, mirrorPts };
