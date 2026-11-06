// Shared pictogram parts. Pictograms face left and sit in the box
// x 26-74, y 30-84; a ground line, where there is one, runs at y 84.
import { body, line, solid, dot, circle, ellipse, arc, rrect, tf, T, P } from '../../../tools/lib/hierokit.mjs';
export * from '../../../tools/lib/hierokit.mjs';

// a standing figure in profile, facing left
export const figure = ({ arms = 'down', head = true } = {}) => [
  body('40,47 56,47 62,74 36,74'),
  head ? body(circle(47, 38, 7.5, 20)) : null,
  line('42,74 40,84; 54,74 56,84'),
  arms === 'down' ? line('42,50 34,64') : arms === 'forward' ? line('42,52 26,52; 44,58 28,58') : arms === 'up' ? line('42,50 34,38') : null,
];
// a head in profile, facing left, with the eye at (ex, ey)
export const headProfile = (pts, ex, ey) => [body(pts), dot(ex, ey, 2.4)];
// a ground line across the box
export const ground = (y = 84) => line(`24,${y} 76,${y}`);
// a closed polyline (outline only)
export const ring = pts => line([[...P(pts), P(pts)[0]]]);
