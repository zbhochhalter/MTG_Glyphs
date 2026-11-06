// Per-card glyphs, batch 1: EDHREC's most-played cards, ranks 1 to 48.
// Keyed by card name here; written to glyphs/cards/<oracle_id>.svg.
import { X, S, M, D, I, K, L, A, S2, limb, eyes, eye, circle, ngon, star, xf, rect, ringS, arc } from './_parts.mjs';
import { flame, wave, peak, gear, sword, shield, wings } from './_motifs.mjs';

import { MARK, pair, talisman, signet, hand, sprout } from './_cards.mjs';

export default {
  cards: {
    // a ring of the sun
    'Sol Ring': () => [S(star(50, 50, 44, 36, 16), { holes: [circle(50, 50, 20, 14)] }), D(circle(50, 50, 28, 14).concat([circle(50, 50, 28, 14)[0]]), { w: 3 })],
    'Arcane Signet': () => [ringS(50, 64, 18, 28, 14), S('20,18 80,18 86,30 80,48 20,48 14,30'), I(star(50, 33, 12, 5, 5))],
    // a sword bent into a plough blade
    'Swords to Plowshares': () => [S(rect(45, 8, 10, 20)), S('30,28 70,28 70,36 30,36'), S('44,36 56,36 58,52 78,66 88,86 66,80 50,70 34,80 12,86 22,66 42,52')],
    // a path winding to a door of light
    'Path to Exile': () => [S('34,8 66,8 76,18 76,58 24,58 24,18'), A('34,20 66,20 66,58 34,58'), S('34,58 66,58 80,72 92,92 8,92 20,72'), D('50,62 42,72 56,80 46,92', { w: 3 })],
    // a spell circle struck through
    Counterspell: () => [ringS(50, 50, 30, 42, 16), S(xf('14,46 86,46 86,54 14,54', { rot: -45 })), S(star(50, 50, 12, 5, 4))],
    // a sprout and its seeds
    Cultivate: () => [...sprout({}), S(circle(24, 82, 5, 6)), S(circle(76, 82, 5, 6)), S(circle(14, 66, 4, 6)), S(circle(86, 66, 4, 6))],
    // an eye over a far horizon
    Farseek: () => [peak(28, 92, 30, 44), peak(72, 92, 40, 48), S('6,40 20,28 50,22 80,28 94,40 80,52 50,58 20,52'), A(circle(50, 40, 12, 10)), K(circle(50, 40, 5, 6))],
    // a bell tolling in flame
    'Blasphemous Act': () => [flame(50, 80, 74, 1.1), S('50,26 62,30 66,48 72,66 80,74 20,74 28,66 34,48 38,30'), S(circle(50, 82, 6, 8)), D('28,66 72,66', { w: 3 })],
    // claws tearing out of a heart
    'Beast Within': () => [S('50,88 14,54 10,34 18,18 34,14 50,26 66,14 82,18 90,34 86,54'), D('30,24 44,70; 46,22 56,72; 62,22 68,64', { w: 4 })],
    'Talisman of Dominance': () => talisman('u', 'b'),
    // a mounted trophy and a dagger
    "Assassin's Trophy": () => [S('20,20 80,20 86,62 50,90 14,62'), I('38,32 62,32 66,50 58,62 42,62 34,50'), S(xf('46,6 54,6 54,60 50,70 46,60', { rot: 40, cx: 60, cy: 50 })), S(xf('38,58 62,58 62,64 38,64', { rot: 40, cx: 60, cy: 50 }))],
    // a tree drawn in an open book
    "Nature's Lore": () => [S('6,52 28,46 50,54 72,46 94,52 94,90 72,84 50,92 28,84 6,90'), D('50,54 50,92', { w: 3 }), S(rect(47, 30, 6, 22)), S(circle(50, 22, 16, 10))],
    // a shield in a burst of light
    'Heroic Intervention': () => [S(star(50, 50, 44, 32, 16)), shield({ s: 0.62 }), I(star(50, 44, 9, 4, 5))],
    // a sprout bursting out of the ground
    'Rampant Growth': () => [...sprout({ s: 1.1, dy: -6 }), S('6,82 94,82 94,92 6,92'), D('34,86 40,94; 60,86 66,94', { w: 2.5 })],
    // a vortex of arrows
    'Chaos Warp': () => [...[0, 90, 180, 270].map(a => S(xf('50,50 60,30 72,22 66,18 84,10 82,30 78,24 68,34 58,52', { rot: a }))), I(circle(50, 50, 6, 6))],
    // a bird with a fanned tail
    'Birds of Paradise': () => [...[-40, -20, 0, 20, 40].map(a => S(xf('47,56 53,56 56,94 44,94', { rot: a, cx: 50, cy: 56 }))), wings(34, 40), M('50,20 58,24 60,40 56,58 50,62'), S(circle(50, 18, 8, 8)), S('47,24 53,24 50,30')],
    'Talisman of Creativity': () => talisman('u', 'r'),
    'Talisman of Indulgence': () => talisman('b', 'r'),
    'Talisman of Hierarchy': () => talisman('w', 'b'),
    // a rose
    "An Offer You Can't Refuse": () => [S(limb('46,92 50,50', 5, 5)), S('48,74 30,66 22,70 34,80'), M('50,10 62,14 72,26 70,40 60,50 50,52'), D('40,22 50,30 60,22; 36,36 50,42 64,36', { w: 3 })],
    // a winged boot
    'Swiftfoot Boots': () => [S('30,10 58,10 58,64 82,72 88,88 26,88 26,60'), S('58,22 76,14 94,16 84,24 92,30 74,34 58,36'), D('30,60 58,64', { w: 3 })],
    'Talisman of Progress': () => talisman('w', 'u'),
    // three candles round a bowl
    'Dark Ritual': () => [S('14,58 86,58 76,78 60,86 40,86 24,78'), S(rect(18, 34, 8, 22)), S(rect(46, 26, 8, 30)), S(rect(74, 34, 8, 22)), flame(22, 32, 14, 0.24), flame(50, 24, 16, 0.26), flame(78, 32, 14, 0.24)],
    // a face coming apart into shards
    'Anguished Unmaking': () => [M('50,10 64,14 72,26 70,48 62,62 56,72 50,74'), I('38,30 46,34 44,40'), I('62,30 54,34 56,40'), I(xf(circle(50, 56, 7, 8), { sy: 1.3, cy: 56 })), S('76,30 88,24 86,38'), S('80,52 94,54 84,62'), S('72,72 84,80 74,86')],
    // a crown on a staff
    'Ignoble Hierarch': () => [S(rect(46, 40, 8, 54)), S('22,40 22,14 34,26 42,8 50,22 58,8 66,26 78,14 78,40'), I(circle(50, 32, 4, 6))],
    // three moons
    'Three Visits': () => [S('36,6 22,14 16,28 20,42 36,50 30,38 30,18'), S('62,26 48,34 42,48 46,62 62,70 56,58 56,38'), S('88,48 74,56 68,70 72,84 88,92 82,80 82,60')],
    // a sapling reaching out
    "Kodama's Reach": () => [S('36,92 40,62 30,48 16,40 12,30 22,34 34,42 40,30 38,14 48,24 50,40 56,26 66,18 64,34 58,46 72,40 86,30 88,40 72,52 62,62 64,92'), eyes(56, 72, 2.6)],
    // a greave with a bolt
    'Lightning Greaves': () => [S('30,8 70,8 72,28 66,60 64,78 76,92 26,92 34,78 32,60 28,28'), D('32,30 68,30; 34,60 66,60', { w: 3 }), I('54,36 42,52 50,52 44,64 60,46 52,46 58,36')],
    'Talisman of Conviction': () => talisman('r', 'w'),
    'Dimir Signet': () => signet('u', 'b'),
    'Rakdos Signet': () => signet('b', 'r'),
    // a book with a coin over it
    'Rhystic Study': () => [S('6,58 28,52 50,60 72,52 94,58 94,92 72,86 50,94 28,86 6,92'), D('50,60 50,94', { w: 3 }), S(circle(50, 26, 18, 12)), I(circle(50, 26, 9, 10))],
    'Izzet Signet': () => signet('u', 'r'),
    // a leaf-crowned pointed ear
    'Llanowar Elves': () => [S(limb('50,94 50,70', 6, 6)), S('50,6 66,18 76,38 72,58 50,74 28,58 24,38 34,18'), D('50,14 50,70; 50,34 64,26; 50,48 36,40; 50,58 64,52', { w: 3 })],
    // a three-spoked charm
    'Boros Charm': () => [ringS(50, 50, 30, 40, 14), ...[0, 120, 240].map(a => S(xf('46,50 54,50 54,14 46,14', { rot: a }))), S(circle(50, 50, 9, 8))],
    'Orzhov Signet': () => signet('w', 'b'),
    // a palm raised against a spell
    'Arcane Denial': () => [hand({ s: 0.9, dy: -1 }), I(xf(circle(50, 66, 9, 10)))],
    // a drum torn by claws
    'Rhythm of the Wild': () => [S('16,30 84,30 78,86 22,86'), S(xf(circle(50, 30, 34, 14), { sy: 0.3, cy: 30 })), D('36,40 46,80; 50,40 58,80; 64,40 70,76', { w: 4 })],
    // a round stone pierced with holes
    'Fellwar Stone': () => [S(ngon(50, 50, 42, 9, 10), { holes: [circle(50, 22, 5, 6), circle(76, 42, 5, 6), circle(66, 72, 5, 6), circle(34, 72, 5, 6), circle(24, 42, 5, 6)] }), I(circle(50, 50, 6, 6))],
    // a star struck through
    Negate: () => [S(star(50, 50, 40, 18, 5)), S(xf('10,46 90,46 90,54 10,54', { rot: 45 }))],
    // a gift box with a bow
    'Generous Gift': () => [S('14,44 86,44 86,56 14,56'), S('20,56 80,56 80,92 20,92'), S(rect(45, 44, 10, 48)), S('50,44 30,24 22,34 36,44'), S('50,44 70,24 78,34 64,44')],
    // a skull with a spark of life
    Reanimate: () => [M('50,26 64,28 74,40 76,56 70,68 62,72 60,86 50,88'), I(circle(61, 52, 6, 6), { m: 1 }), I('50,62 53,70 47,70'), S('56,6 46,20 54,20 48,30 64,14 56,14 60,6')],
    // a funnel of wind
    'Cyclonic Rift': () => [S('8,14 92,14 84,30 16,30'), S('20,34 80,34 72,50 28,50'), S('32,54 68,54 60,70 40,70'), S('42,74 58,74 52,92 48,92')],
    'Azorius Signet': () => signet('w', 'u'),
    // a heavy hand pressing on coins
    'Smothering Tithe': () => [S('20,92 80,92 80,82 20,82'), S('24,80 76,80 76,70 24,70'), S('28,68 72,68 72,58 28,58'), S('20,50 20,28 30,18 40,22 40,10 50,8 54,18 60,10 70,14 74,26 80,30 80,50')],
    // a spiral vine
    'Growth Spiral': () => [S(limb('50,92 50,64 36,56 34,40 46,28 62,30 68,42 60,52 50,48', 9, 6)), S('62,30 70,14 86,8 82,24'), S('34,40 20,34 10,40 22,48')],
    // a seal stamped with a cross
    "Dovin's Veto": () => [S('36,8 64,8 60,36 76,44 84,60 16,60 24,44 40,36'), S('10,62 90,62 90,72 10,72'), D('30,82 70,94; 70,82 30,94', { w: 5 })],
    // an orb split by a bolt
    Terminate: () => [S(circle(50, 50, 40, 16)), I('58,8 36,48 50,48 40,92 66,44 52,44 62,8')],
  },
};
