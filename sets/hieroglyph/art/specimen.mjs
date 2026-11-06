// Hieroglyph specimen: the eleven type signs, and 23 sample signs.
import './_grammar.mjs';
import { sign, body, line, solid, dot, circle, ellipse, arc, rrect, T, P, figure, ground, ring, headProfile } from './_pics.mjs';

const gearPts = (cx, cy, r, n = 8, depth = 6) => {
  const p = [];
  for (let i = 0; i < n; i++) for (const [da, rr] of [[-0.3, r - depth], [-0.17, r], [0.17, r], [0.3, r - depth]]) {
    const a = ((i + da) * 2 * Math.PI) / n; p.push([cx + rr * Math.sin(a), cy - rr * Math.cos(a)]);
  }
  return p;
};
const star4 = (cx, cy, ro, ri) => Array.from({ length: 8 }, (_, i) => { const r = i % 2 ? ri : ro, a = (i * Math.PI) / 4; return [cx + r * Math.sin(a), cy - r * Math.cos(a)]; });
const wavesAt = y => line(`24,${y} 31,${y - 4} 38,${y} 45,${y - 4} 52,${y} 59,${y - 4} 66,${y} 73,${y - 4} 76,${y - 2}`);
const scroll = (x0, y0, x1, y1) => [body(`${x0},${y0} ${x1},${y0} ${x1},${y1} ${x0},${y1}`), line(`${x0 - 3},${y0} ${x1 + 3},${y0}; ${x0 - 3},${y1} ${x1 + 3},${y1}`)];

export default {
  types: {
    // a beast walking
    Creature: () => sign({ det: 'creature', pic: [line('70,62 76,52'), body(ellipse(56, 62, 16, 9)), line('46,68 44,84; 52,70 52,84; 62,70 62,84; 68,68 70,84'), body(circle(36, 52, 9, 20)), body('34,44 38,36 42,45'), dot(32, 51, 2)] }),
    // a stopwatch
    Instant: () => sign({ det: 'instant', pic: [line('50,40 50,34; 44,34 56,34'), body(circle(50, 60, 20, 28)), line('50,60 50,48; 50,60 58,66')] }),
    // a cauldron over a fire line
    Sorcery: () => sign({ det: 'sorcery', pic: [body('30,50 70,50 68,64 60,76 40,76 32,64'), line('24,50 76,50; 38,76 34,84; 62,76 66,84'), dot(44, 40, 3), dot(56, 34, 3)] }),
    // a four-pointed sparkle
    Enchantment: () => sign({ det: 'enchantment', pic: [body(star4(50, 57, 26, 8))] }),
    // a gear
    Artifact: () => sign({ det: 'artifact', pic: [body(gearPts(50, 57, 24), 'right', [circle(50, 57, 7, 16)])] }),
    // a hill on the ground line
    Land: () => sign({ det: 'land', pic: [body('26,84 36,64 50,52 64,64 74,84'), ground()] }),
    // a doorway holding a star
    Planeswalker: () => sign({ det: 'planeswalker', pic: [body('28,84 28,52 50,32 72,52 72,84', 'right', ['38,80 38,57 50,46 62,57 62,80']), solid(star4(50, 66, 8, 3))] }),
    // a flag on the ground
    Battle: () => sign({ det: 'battle', pic: [line('40,84 40,32'), body('40,34 72,44 40,54', 'full'), ground()] }),
    // three heads together
    Kindred: () => sign({ det: 'kindred', pic: [body(circle(34, 50, 7, 16)), body(circle(66, 50, 7, 16)), body('24,82 26,64 34,60 42,64 44,82'), body('56,82 58,64 66,60 74,64 76,82'), body(circle(50, 44, 8, 18)), body('38,84 40,60 50,55 60,60 62,84')] }),
    // a counter disc
    Token: () => sign({ det: 'token', pic: [body(circle(50, 58, 22, 28)), ring(circle(50, 58, 12, 20))] }),
    // a medallion on ribbons
    Emblem: () => sign({ det: 'emblem', pic: [line('42,66 36,84; 58,66 64,84'), body(circle(50, 52, 18, 24)), dot(50, 52, 3)] }),
  },
  subtypes: {
    // an elk in profile, antlered
    Elk: () => sign({ det: 'creature', pic: [line('34,38 36,30 30,24; 36,32 44,26; 36,30 38,20'), body(ellipse(58, 60, 15, 9)), line('48,66 46,84; 54,68 54,84; 64,68 64,84; 70,66 72,84'), body('46,58 38,44 30,40 26,44 32,48 38,60'), dot(31, 43, 2)] }),
    // a big-nosed, big-eared head
    Goblin: () => sign({ det: 'creature', pic: [body('30,84 34,74 50,68 66,74 70,84'), body('62,42 78,36 70,52'), ...headProfile('54,32 64,36 68,46 64,58 56,64 46,64 40,58 38,54 28,56 36,46 38,40 46,34', 45, 44)] }),
    // a winged dragon, long neck forward
    Dragon: () => sign({ det: 'creature', pic: [body('56,58 60,30 78,36 70,58', 'full'), line('72,68 78,76 72,84; 52,72 50,84; 66,72 68,84'), body(ellipse(60, 66, 14, 8)), body('50,62 42,50 40,42 46,40 52,48 58,58'), body('24,38 32,30 44,32 48,40 40,46 26,44'), dot(36, 36, 2.2)] }),
    // a robed figure, pointed hat and staff
    Wizard: () => sign({ det: 'creature', pic: [line('30,32 30,84'), ...T(figure(), { s: 0.86, cx: 50, cy: 84 }), body('39,40 47,18 56,40', 'full')] }),
    // a figure with a raised wing
    Angel: () => sign({ det: 'creature', pic: [body('52,50 74,30 74,50 66,64 56,60', 'full'), ...figure()] }),
    // a figure walking with arms held forward
    Zombie: () => sign({ det: 'creature', pic: [...figure({ arms: 'forward', head: false }), body(circle(44, 40, 7.5, 20))] }),
    // a figure with a fish's tail
    Merfolk: () => sign({ det: 'creature', pic: [body(circle(44, 38, 7, 18)), body('38,46 52,46 54,62 38,62'), line('40,50 30,60'), body('38,60 54,60 60,70 70,74 74,66 74,84 64,82 52,74 40,70')] }),
    // a narrow head with a long swept ear
    Elf: () => sign({ det: 'creature', pic: [body('30,84 34,74 50,68 66,74 70,84'), body('60,42 72,22 68,50'), ...headProfile('52,32 62,36 66,46 62,58 54,64 46,64 40,58 36,52 32,50 36,46 38,38 44,32', 44, 44)] }),
    Human: () => sign({ det: 'creature', pic: [...figure()] }),
    // a figure with spear and round shield
    Soldier: () => sign({ det: 'creature', pic: [line('30,28 30,84'), ...figure({ arms: null }), body(circle(36, 60, 10, 20), 'full')] }),
    // a mound and palm on the waves
    Island: () => sign({ det: 'land', radicals: ['wave'], pic: [body('30,76 38,64 50,60 62,64 70,76'), line('52,62 56,40; 56,40 44,36; 56,40 68,36; 56,40 62,48'), wavesAt(82)] }),
    // two pines on the ground line
    Forest: () => sign({ det: 'land', radicals: ['leaf'], pic: [body('28,82 38,48 48,82', 'full'), body('52,82 62,38 72,82'), ground()] }),
    // a sword, point up
    Equipment: () => sign({ det: 'artifact', pic: [body('50,30 55,38 55,64 45,64 45,38'), line('36,66 64,66; 50,68 50,78'), dot(50, 82, 3.4)] }),
    // a disc inside a ring of light
    Aura: () => sign({ det: 'enchantment', pic: [ring(circle(50, 58, 22, 28)), body(circle(50, 58, 10, 20), 'full')] }),
    // a scroll of three chapters
    Saga: () => sign({ det: 'enchantment', pic: [...scroll(34, 36, 66, 80), line('40,50 60,50; 40,58 60,58; 40,66 60,66')] }),
    // a cart on two wheels
    Vehicle: () => sign({ det: 'artifact', pic: [line('30,60 22,54'), body('30,48 72,48 72,66 30,66'), body(circle(40, 72, 8, 18), 'full'), body(circle(62, 72, 8, 18), 'full')] }),
    // a chest
    Treasure: () => sign({ det: 'artifact', radicals: ['gem'], pic: [body('28,54 30,44 40,38 60,38 70,44 72,54'), body('28,54 72,54 72,80 28,80'), dot(50, 60, 3)] }),
    // planeswalker types are named things: cartouches
    Garruk: () => sign({ det: 'planeswalker', radicals: ['leaf'], cartouche: true, pic: [line('38,84 58,34'), body('48,42 70,28 78,50 58,56', 'full')] }),
    Teferi: () => sign({ det: 'planeswalker', radicals: ['sun', 'wave'], cartouche: true, pic: [line('28,30 72,30; 28,84 72,84'), body('30,32 70,32 54,57 70,82 30,82 46,57', 'full')] }),
    Jace: () => sign({ det: 'planeswalker', radicals: ['wave', 'eye'], cartouche: true, pic: [body('30,84 34,74 44,70 56,70 66,74 70,84'), body('52,30 64,36 68,50 66,66 56,72 42,72 40,62 34,58 40,48 40,38'), solid('44,44 52,44 54,60 44,62 42,54'), dot(46, 50, 1.6)] }),
  },
  cards: {
    'Lightning Bolt': () => sign({ det: 'instant', radicals: ['flame'], pic: [body('58,30 34,62 50,62 40,84 68,50 52,50 62,30', 'full')] }),
    'Sol Ring': () => sign({ det: 'artifact', radicals: ['sun', 'gem'], pic: [body(circle(50, 58, 21, 28), 'right', [circle(50, 58, 10, 20)])] }),
    Counterspell: () => sign({ det: 'instant', radicals: ['cross', 'wave'], pic: [...scroll(32, 44, 68, 74), line('40,54 60,54; 40,64 56,64')] }),
  },
};
