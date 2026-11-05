// Heads and figures shared across creature glyphs. See STYLE.md "Heads".
import { S, M, D, F, I, K, L, A, pts, ngon, star, xf } from '../tools/lib/glyphkit.mjs';
import { S2, eyes } from './_parts.mjs';

// Shoulders under a head, bottom at y = 92.
export const shoulders = (y = 72, w = 38) =>
  M(`50,${y} 62,${y + 2} ${50 + w * 0.78},${y + 8} ${50 + w},${92} 50,92`, { f: `62,${y + 2} 68,92` });
// A frontal humanoid head; top at y0, chin at y1, half width w.
export function head({ y0 = 14, y1 = 72, w = 22, eyeY = null, eyesOn = true, f = true } = {}) {
  const h = y1 - y0, Y = t => y0 + h * t, X = t => 50 + w * t;
  const half = `50,${Y(0)} ${X(0.5)},${Y(0.03)} ${X(0.86)},${Y(0.17)} ${X(1)},${Y(0.38)} ${X(0.96)},${Y(0.62)} ${X(0.72)},${Y(0.84)} ${X(0.36)},${Y(0.98)} 50,${Y(1)}`;
  const out = [M(half, { f: f ? `50,${Y(0)} ${X(0.86)},${Y(0.17)}; ${X(1)},${Y(0.38)} ${X(0.5)},${Y(0.55)} ${X(0.72)},${Y(0.84)}; ${X(0.5)},${Y(0.55)} 50,${Y(0.7)}` : undefined })];
  if (eyesOn) out.push(eyes(X(0.42), eyeY ?? Y(0.48), 3.2));
  return out;
}
// Head and shoulders together (a bust portrait).
export const person = (o = {}) => [shoulders(o.sy ?? 74, o.sw ?? 38), ...head(o)];
// Pointed ear pair, drawn behind a head of half width w at height y.
export const pointedEars = (y = 40, w = 22, len = 14) =>
  S2(`${50 + w - 2},${y - 6} ${50 + w + len},${y - 14} ${50 + w - 1},${y + 8}`);
// Round ear pair.
export const roundEars = (x = 70, y = 40, r = 7) => S2(ngon(x, y, r, 7));
// Animal head with ears at the top corners; frontal, muzzle down.
export function muzzle(half, f) { return M(half, { f }); }
