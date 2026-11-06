// Shared motifs for per-card glyphs (art/cards-*.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { X, S, M, D, I, K, L, A, S2, limb, eyes, eye, circle, ngon, star, xf, rect, ringS, arc } from './_parts.mjs';
import { flame, wave, peak, gear, sword, shield, wings } from './_motifs.mjs';

// Colour marks for mana rocks and multicolour effects. Deliberately not the
// mana symbols: white = feather, blue = wave, black = crescent, red = bolt,
// green = leaf.
export const MARK = {
  w: o => S(xf('50,30 58,40 58,58 50,70 42,58 42,40', o)),
  u: o => S(xf('34,58 40,46 50,44 56,52 64,44 68,58 60,66 40,66', o)),
  b: o => S(xf('56,30 44,36 38,50 44,64 56,70 50,58 50,42', o)),
  r: o => S(xf('54,28 40,52 50,52 44,72 62,46 52,46 58,28', o)),
  g: o => S(xf('50,30 60,40 62,54 50,70 38,54 40,40', o), { d: [xf('50,38 50,66', o)] }),
};
export const pair = (a, b, y = 0, s = 0.6) => [MARK[a]({ s, dx: -12, dy: y }), MARK[b]({ s, dx: 12, dy: y })];
// a talisman: a pendant on a short chain
export const talisman = (a, b) => X([L('50,6 50,18', { w: 3 }), ringS(50, 10, 3, 7, 8), S('50,18 74,30 84,54 72,80 50,92 28,80 16,54 26,30'), I('50,28 68,38 74,56 64,76 50,82 36,76 26,56 32,38'), ...pair(a, b, 6, 0.55)], { s: 0.9, dy: 3 });
// a signet: a seal ring with a broad face
export const signet = (a, b) => [ringS(50, 64, 18, 28, 14), S('20,18 80,18 86,30 80,48 20,48 14,30'), I('26,24 74,24 78,32 74,42 26,42 22,32'), ...pair(a, b, -17, 0.4)];
export const hand = o => S(xf('30,94 30,62 22,48 27,44 35,54 35,24 42,22 44,50 46,18 53,18 54,50 57,22 64,22 64,52 67,30 74,32 72,60 68,76 66,94', o));
export const sprout = o => [S(xf(limb('50,94 50,52', 6, 5), o)), S(xf('50,56 38,42 20,40 16,48 32,58', o)), S(xf('50,50 62,34 82,30 86,40 68,52', o))];

// ---- more motifs, added from batch 2 on
const loop = p => p.concat([p[0]]);
// a playing card, upright, centred at (cx, cy)
export const card = (o, inner = true) => [S(xf('30,12 70,12 74,16 74,84 70,88 30,88 26,84 26,16', o)), inner ? D([xf('34,22 66,22 66,78 34,78 34,22', o)], { w: 2.5 }) : null];
// three cards fanned
export const fan = (o = {}) => [-22, 0, 22].flatMap(a => card({ ...o, rot: a + (o.rot || 0), cx: 50, cy: 92 }, false));
// an open book
export const book = o => [S(xf('6,40 28,32 50,42 72,32 94,40 94,86 72,78 50,88 28,78 6,86', o)), D([xf('50,42 50,88', o)], { w: 3 })];
// a closed book seen from the front
export const tome = o => [S(xf('20,10 80,10 84,14 84,90 20,90', o)), S(xf('20,10 30,10 30,90 20,90', o))];
// a skull
export const skull = o => [M('50,10 64,12 76,24 80,42 76,56 68,62 66,76 58,82 50,82'), I(circle(62, 44, 7, 7), { m: 1 }), I('50,54 54,64 46,64'), D('40,72 60,72; 44,66 44,78; 50,66 50,80; 56,66 56,78', { w: 2.5 })].map(l => (o ? X([l], o)[0] : l));
export const coin = (cx, cy, r) => [S(circle(cx, cy, r, 12)), D(loop(circle(cx, cy, r * 0.62, 12)), { w: 2.5 })];
export const bolt = o => S(xf('58,4 26,52 46,52 36,96 74,40 54,40 66,4', o));
export const key = o => [S(xf(circle(50, 22, 14, 10), o), { holes: [xf(circle(50, 22, 6, 8), o)] }), S(xf('46,34 54,34 54,92 46,92', o)), S(xf('54,70 68,70 68,78 54,78', o)), S(xf('54,82 64,82 64,90 54,90', o))];
export const crown = o => S(xf('14,74 14,34 30,50 40,22 50,44 60,22 70,50 86,34 86,74', o));
export const burst = (o, n = 12, ri = 0.62) => S(xf(star(50, 50, 44, 44 * ri, n), o));
export const drop = o => S(xf('50,8 60,28 72,48 74,64 66,80 50,88 34,80 26,64 28,48 40,28', o));
export const heart = o => S(xf('50,88 14,54 10,34 18,18 34,14 50,26 66,14 82,18 90,34 86,54', o));
export const moon = o => S(xf('62,8 40,14 26,30 22,50 28,70 44,84 64,90 50,74 44,56 46,34 52,20', o));
export const sun = (o, n = 12) => [S(xf(star(50, 50, 44, 34, n * 2), o)), S(xf(circle(50, 50, 24, 12), o))];
export const potion = o => [S(xf('42,8 58,8 58,16 42,16', o)), S(xf('44,16 56,16 56,32 74,46 80,64 74,82 60,92 40,92 26,82 20,64 26,46 44,32', o)), I(xf('26,62 74,62 72,78 60,86 40,86 28,78', o))];
export const scroll = o => [S(xf('20,14 80,14 80,24 20,24', o)), S(xf('26,24 74,24 74,78 26,78', o)), S(xf('20,76 80,76 80,86 20,86', o)), D([xf('34,36 66,36', o), xf('34,48 66,48', o), xf('34,60 56,60', o)], { w: 3 })];
export const fist = o => [S(xf('30,58 70,58 72,90 28,90', o)), S(xf('20,26 34,20 46,22 58,20 72,24 82,32 84,50 76,62 24,62 18,46', o)), D([xf('34,22 34,46', o), xf('46,22 46,46', o), xf('58,22 58,46', o), xf('70,26 70,46', o)], { w: 2.5 }), S(xf('18,44 40,44 46,52 36,58 20,56', o))];
export const tree = o => [S(xf(limb('50,94 50,50', 10, 7), o)), S(xf('50,6 66,10 80,22 86,38 80,52 64,58 50,56 36,58 20,52 14,38 20,22 34,10', o))];
export const tornado = o => [S(xf('8,14 92,14 84,30 16,30', o)), S(xf('20,34 80,34 72,50 28,50', o)), S(xf('32,54 68,54 60,70 40,70', o)), S(xf('42,74 58,74 52,92 48,92', o))];
export const mask = o => [S(xf('50,14 64,16 74,26 76,44 70,62 60,74 50,78 40,74 30,62 24,44 26,26 36,16', o)), I(xf('32,40 44,38 44,46 34,46', o)), I(xf('56,38 68,40 66,46 56,46', o))];
export const arrow = o => [S(xf('47,20 53,20 53,84 47,84', o)), S(xf('50,4 62,22 38,22', o)), S(xf('53,70 64,78 64,94 53,86', o)), S(xf('47,70 36,78 36,94 47,86', o))];
export const hourglass = o => [S(xf('16,6 84,6 84,14 16,14', o)), S(xf('16,86 84,86 84,94 16,94', o)), S(xf('24,14 76,14 70,32 56,46 56,54 70,68 76,86 24,86 30,68 44,54 44,46 30,32', o)), I(xf('50,58 66,86 34,86', o))];
export const chain = (pts, r = 6) => pts.map(([x, y]) => ringS(x, y, r - 4, r + 2, 8));
export const vortex = o => [0, 90, 180, 270].map(a => S(xf('50,50 60,30 76,22 90,26 80,32 66,36 58,52', { ...o, rot: a + (o?.rot || 0) })));
export const tentacle = o => S(xf(limb('34,94 30,70 34,50 46,32 62,22 76,24 82,34 76,42 66,40 64,32', 20, 6), o));
export const eyeBig = o => [S(xf('6,50 20,34 36,26 50,24 64,26 80,34 94,50 80,66 64,74 50,76 36,74 20,66', o)), A(xf(circle(50, 50, 17, 12), o)), K(xf(circle(50, 50, 7, 8), o))];
export const cauldron = o => [S(xf('50,46 72,46 80,58 76,74 66,84 70,92 58,92 56,88 44,88 42,92 30,92 34,84 24,74 20,58 28,46', o)), S(xf('14,40 86,40 86,50 14,50', o))];
export const banner = o => [S(xf(rect(46, 6, 8, 88), o)), S(xf('54,12 92,12 84,28 92,44 54,44', o))];
export const anvil = o => [S(xf('10,30 80,30 92,24 88,40 70,46 64,62 74,74 26,74 36,62 30,46 14,44', o)), S(xf('20,74 80,74 84,86 16,86', o))];
export const lotus = o => [S(xf('50,20 60,40 58,64 50,72 42,64 40,40', o)), S(xf('42,68 26,44 22,30 36,40 46,60', o)), S(xf('58,68 74,44 78,30 64,40 54,60', o)), S(xf('40,72 14,56 8,62 24,78', o)), S(xf('60,72 86,56 92,62 76,78', o))];
export const no = (o = {}) => [S(xf('14,46 86,46 86,54 14,54', { rot: -45, ...o }))];

// Every subtype drawing, so creature cards can build on their subtype
// and add something that makes them their own.
const dir = path.dirname(fileURLToPath(import.meta.url));
const SUB = {};
for (const f of fs.readdirSync(dir).filter(f => /^(creatures|artifacts|spells|planeswalkers)/.test(f)).sort()) {
  const m = (await import(path.join(dir, f))).default;
  Object.assign(SUB, m.subtypes || {});
}
export const sub = (name, o) => (o ? X([SUB[name]()], o) : SUB[name]());
