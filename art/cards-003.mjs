// Per-card glyphs, batch 3: EDHREC ranks 145 to 240.
import { X, S, M, D, I, K, L, A, S2, limb, eyes, eye, circle, ngon, star, xf, rect, ringS, arc } from './_parts.mjs';
import { flame, wave, peak, gear, sword, shield, wings, spear, axe } from './_motifs.mjs';
import { talisman, signet, hand, sprout, MARK, card, fan, book, tome, skull, coin, bolt, key, crown, burst, drop, heart, moon, sun, potion, scroll, fist, tree, tornado, mask, arrow, hourglass, chain, vortex, tentacle, eyeBig, cauldron, banner, anvil, lotus, no, sub } from './_cards.mjs';

const five = (r, s = 0.24, dy = 0) => ['w', 'u', 'b', 'r', 'g'].map((c, i) => MARK[c]({ s, dx: r * Math.sin((i * 72 * Math.PI) / 180), dy: dy - r * Math.cos((i * 72 * Math.PI) / 180) }));
const die = (cx, cy, s, pips) => [S(xf('-14,-14 14,-14 14,14 -14,14', { s, dx: cx, dy: cy, cx: 0, cy: 0 })), ...pips.map(([x, y]) => I(ngon(cx + x * s, cy + y * s, 2.6 * s, 6)))];
const dino = o => sub('Dinosaur', o);
const note = o => [S(xf(circle(40, 76, 12, 10), { sy: 0.75, cy: 76, ...o })), S(xf(rect(46, 20, 7, 56), o)), S(xf('53,20 74,28 74,40 53,32', o))];

export default {
  autofit: true,
  cards: {
    // brass knuckles
    'Professional Face-Breaker': () => [S('10,40 90,40 90,60 80,66 20,66 10,60', { holes: [circle(22, 52, 5, 6), circle(41, 52, 5, 6), circle(60, 52, 5, 6), circle(79, 52, 5, 6)] }), S('26,66 74,66 64,86 36,86')],
    // a compass rose
    Explore: () => [S(star(50, 50, 44, 12, 4)), S(xf(star(50, 50, 26, 8, 4), { rot: 45 })), I(circle(50, 50, 5, 6))],
    // an axe bitten into a stump
    'Fell the Profane': () => [S('16,62 84,62 80,92 20,92'), D(arc(50, 62, 26, 270, 450, 8, 6), { w: 2.5 }), ...axe({ rot: 30, s: 0.7, dy: -12 })],
    // a leaf over an open book
    "Rishkar's Expertise": () => [...book({ dy: 8 }), MARK.g({ s: 0.8, dy: -26 })],
    // a fire bowl on an altar
    'Village Rites': () => [flame(50, 46, 40, 0.8), S('20,44 80,44 72,60 28,60'), S('40,60 60,60 62,84 38,84'), S('24,84 76,84 80,94 20,94')],
    // beetles multiplying
    'Scute Swarm': () => [sub('Insect', { s: 0.5, dx: -20, dy: -14 }), sub('Insect', { s: 0.6, dx: 16, dy: 14 })],
    // three cards, one turned up
    Preordain: () => [...card({ s: 0.44, dx: -28, dy: 10 }), ...card({ s: 0.44, dx: 28, dy: 10 }), ...card({ s: 0.54, dy: -2 }), S(star(50, 46, 7, 3, 4))],
    // a cauldron bubbling skulls
    'Cauldron of Essence': () => [...cauldron({ dy: 2 }), skull({ s: 0.36, dy: -32 })],
    // an eye with a glint
    Opt: () => [...eyeBig({ s: 0.9 }), S(star(80, 18, 12, 4, 4))],
    // a hook through a heart
    'Elas il-Kor, Sadistic Pilgrim': () => [heart({ s: 0.84, dy: 6 }), S(limb('70,4 70,48 60,62 46,60 42,50', 6, 4))],
    // a card in flames
    'Thrill of Possibility': () => [flame(50, 92, 80, 1.1), ...card({ s: 0.55, dy: 12 })],
    // a mirror orb on a stand
    "Mirari's Wake": () => [S('36,74 64,74 72,92 28,92'), S(circle(50, 44, 32, 14)), A(xf(circle(50, 44, 18, 12), { sy: 1 })), S(star(44, 38, 7, 2.5, 4))],
    // a blooming flower
    'Bloom Tender': () => [S(limb('50,94 50,56', 6, 5)), S('50,76 34,66 24,72 38,82'), S(star(50, 36, 30, 16, 6)), I(circle(50, 36, 8, 8))],
    // a rake
    Harrow: () => [S(limb('50,94 50,40', 7, 7)), S('16,30 84,30 84,42 16,42'), ...[18, 32, 46, 60, 74].map(x => S(xf(rect(x, 10, 6, 20))))],
    // a skull rising with light in its eyes
    'Animate Dead': () => [S('6,84 94,84 94,94 6,94'), skull({ s: 0.8, dy: -6 }), D('20,16 28,24; 80,16 72,24; 50,2 50,8', { w: 3 })],
    // an elf under a crescent
    'Elves of Deep Shadow': () => [sub('Elf', { s: 0.86, dx: -4, dy: 7 }), moon({ s: 0.3, dx: 30, dy: -32 })],
    // a palm raised to forbid
    'Grand Abolisher': () => [hand({ s: 0.9, dy: 2 }), ...no({ s: 0.9 })],
    // a pirate hat over a coin
    'Pitiless Plunderer': () => [S('8,38 30,18 50,24 70,18 92,38 70,42 50,38 30,42'), ...coin(50, 68, 22)],
    'Golgari Signet': () => signet('b', 'g'),
    // books shelved on a branch
    'Sylvan Library': () => [S(limb('6,70 50,62 94,70', 8, 8)), ...[[18, 34], [34, 28], [50, 30], [66, 26], [80, 34]].map(([x, h]) => S(rect(x - 6, 62 - h, 12, h))), S(limb('50,70 52,94', 9, 9))],
    // a hexagon sign struck out
    'Hexing Squelcher': () => [S(ngon(50, 50, 40, 6, 30), { holes: [ngon(50, 50, 28, 6, 30)] }), I(ngon(50, 50, 12, 4)), ...no({})],
    // a block crumbling away
    'Abrupt Decay': () => [S('16,20 84,20 84,60 70,58 64,70 50,64 36,72 28,60 16,62'), S('30,76 40,74 42,84 32,86'), S('58,80 68,78 66,90 56,90'), D('40,28 46,44 38,56', { w: 3 })],
    // a steaming bowl with a leaf
    'Revitalizing Repast': () => [S('10,50 90,50 82,70 66,82 34,82 18,70'), S('36,82 64,82 66,92 34,92'), D('36,40 32,28 38,16; 52,40 48,28 54,16', { w: 3.5 }), MARK.g({ s: 0.4, dx: 20, dy: -22 })],
    // a pair of bats
    'Mirkwood Bats': () => [sub('Bat', { s: 0.6, dx: -16, dy: 16 }), sub('Bat', { s: 0.5, dx: 22, dy: -18 })],
    // a horn sounding a call
    "Eladamri's Call": () => [S('10,62 24,50 50,46 72,30 88,14 90,34 80,58 60,70 30,72'), D('70,70 84,80; 60,78 66,92', { w: 4 }), D('30,56 40,52', { w: 3 })],
    // ley lines glowing in the ground
    'Nissa, Leyline Tamer': () => [S('6,52 50,30 94,52 50,74'), D('28,52 50,40 72,52 50,64 28,52', { w: 3 }), S(limb('50,52 50,14', 6, 4)), MARK.g({ s: 0.4, dy: -36 })],
    // a bat before the rising sun
    'Malakir Rebirth': () => [...sun({ s: 0.7, dy: -14 }), S('34,92 30,60 38,46 62,46 70,60 66,92'), D('40,62 60,62', { w: 3 })],
    // a quill writing in blood
    'Sign in Blood': () => [S('84,6 92,12 62,56 52,66 54,52'), S('10,82 50,74 74,82'), drop({ s: 0.28, dx: -22, dy: 18 })],
    // a straight razor
    'Zulaport Cutthroat': () => [S('10,30 70,30 82,40 82,46 10,46'), S(limb('70,46 86,86', 9, 9)), D('20,38 64,38', { w: 2.5 }), drop({ s: 0.2, dx: -26, dy: 26 })],
    // two dice
    Gamble: () => [...die(34, 40, 1.3, [[-7, -7], [7, 7], [0, 0]]), ...die(66, 66, 1.3, [[-7, -7], [7, -7], [-7, 7], [7, 7]])],
    // a maelstrom with lightning
    'Maelstrom Wanderer': () => [...vortex({ s: 1 }), bolt({ s: 0.36 })],
    // a goblin with a crackling coil
    'Goblin Electromancer': () => [sub('Goblin', { s: 0.86, dy: 6 }), bolt({ s: 0.28, dx: 32, dy: -30 })],
    // a trumpet and notes
    'Inspiring Call': () => [S('8,58 26,50 60,50 88,30 92,50 88,72 60,58 26,58'), ...note({ s: 0.4, dx: -16, dy: -30 })],
    // a wizard's hat with a scholar's tassel
    'Archmage Emeritus': () => [sub('Wizard'), L('62,10 40,26 40,44', { w: 3 }), S('36,44 44,44 44,54 36,54')],
    // a wide mouth chanting
    'Gray Merchant of Asphodel': () => [M('50,10 66,14 78,26 82,46 78,66 66,80 50,86'), I('30,52 70,52 64,72 36,72'), eyes(62, 34, 3), D('84,40 92,36; 86,54 94,56', { w: 3 })],
    // a vulture over a skull
    'Morbid Opportunist': () => [skull({ s: 0.5, dy: 22 }), wings(28, 40), S('46,18 54,18 54,30 46,30'), S('44,22 34,26 44,28')],
    // a lantern of five colours
    'Chromatic Lantern': () => [S('40,4 60,4 60,12 40,12'), S('30,12 70,12 76,22 76,80 70,88 30,88 24,80 24,22'), A('32,22 68,22 68,78 32,78'), ...five(14, 0.22)],
    // a radiant gem
    'Gleaming Splendor': () => [burst({ s: 1 }, 16, 0.76), S('50,20 72,40 50,80 28,40'), D('28,40 72,40', { w: 2.5 })],
    // a seed with a watchful eye
    'Seedborn Muse': () => [S('50,8 64,22 72,44 68,68 50,90 32,68 28,44 36,22'), ...eyeBig({ s: 0.4 }), S(star(82, 18, 8, 3, 4))],
    // an eye in an offering bowl
    'Viscera Seer': () => [S('10,54 90,54 80,74 62,86 38,86 20,74'), ...eyeBig({ s: 0.6, dy: -16 })],
    'Gruul Signet': () => signet('r', 'g'),
    // a giant hoof print in a crater
    'Craterhoof Behemoth': () => [S(xf(circle(50, 74, 44, 16), { sy: 0.35, cy: 74 })), S('20,70 24,30 34,14 46,12 48,40 44,72'), S('56,72 52,40 54,12 66,14 76,30 80,70'), D('24,58 44,60; 56,60 76,58', { w: 3 })],
    // a cracked gear spitting sparks
    'Untimely Malfunction': () => [gear(48, 54, 36, 10, 8, 0.32), I('44,18 52,36 44,46 54,58', { m: 0 }), D('82,14 74,22; 90,30 80,32', { w: 3.5 })],
    // a witch's hat and a spark
    'Witch Enchanter': () => [S('8,82 26,72 74,72 92,82 74,90 26,90'), S('28,74 40,40 56,22 70,10 64,30 70,74'), S(star(80, 36, 10, 3.5, 4)), I('36,62 66,62 66,68 36,68')],
    // a meteor falling
    'Finale of Devastation': () => [S('80,10 92,22 52,66 40,54'), S(circle(36, 70, 22, 12)), D('64,16 88,8; 70,28 92,24', { w: 3 })],
    // a shield with an ink drop
    Inkshield: () => [shield({}), I('50,26 58,42 62,56 50,66 38,56 42,42')],
    // a page torn in two
    'Tear Asunder': () => [S('12,10 46,10 52,24 44,38 52,52 44,66 50,90 12,90'), S('56,10 88,10 88,90 56,90 50,66 58,52 50,38 58,24')],
    // a coin in flame
    'Unexpected Windfall': () => [flame(50, 92, 82, 1.1), ...coin(50, 64, 20)],
    // an open palm before a burst
    'Force of Negation': () => [burst({}, 14, 0.7), hand({ s: 0.76, dy: 8 })],
    // a fiery claw grasping
    'Infernal Grasp': () => [S('22,92 24,64 18,42 26,38 34,56 34,22 42,20 46,52 48,14 56,14 56,50 60,20 68,22 66,54 74,38 82,42 74,70 72,92'), D('34,22 32,10; 48,14 50,4; 68,22 70,10', { w: 3 })],
    // a withered, thorny flower
    'Withering Torment': () => [S(limb('50,94 52,60 46,40 52,26', 8, 6)), S('52,26 36,12 28,32 44,34'), S('52,26 66,8 78,26 60,36'), S2('54,70 66,64 58,76'), S('48,50 66,44 58,56')],
    // tentacles around a ship
    'Hullbreaker Horror': () => [S('14,58 86,58 76,78 24,78'), S(rect(46, 16, 6, 42)), S('52,20 74,40 52,48'), S(limb('10,94 8,70 18,52 30,48', 8, 4)), S(limb('90,94 92,72 82,56 72,54', 8, 4)), wave(80, 5)],
    // a snapped twig
    Snap: () => [S(limb('8,72 46,50', 14, 12)), S(limb('54,50 92,28', 14, 12)), D('44,38 50,26; 58,40 64,28', { w: 3.5 })],
    // a tree-giant sprouting saplings
    'Avenger of Zendikar': () => [sub('Treefolk', { s: 0.8, dy: -4 }), ...sprout({ s: 0.3, dx: -36, dy: 32 }), ...sprout({ s: 0.3, dx: 36, dy: 32 })],
    // an orc's face and an arrow
    'Orcish Bowmasters': () => [sub('Orc', { s: 0.86, dx: -4, dy: 6 }), ...arrow({ rot: 45, s: 0.5, dx: 26, dy: -26 })],
    // a plain gold ring, glowing
    'The One Ring': () => [D('50,6 50,14; 86,50 78,50; 50,94 50,86; 14,50 22,50; 24,24 30,30; 76,24 70,30; 24,76 30,70; 76,76 70,70', { w: 3 }), S(xf(circle(50, 50, 28, 16), { sy: 0.8 }), { holes: [xf(circle(50, 50, 18, 14), { sy: 0.7 })] })],
    // footprints across the land
    Exploration: () => [S('6,70 50,56 94,70 94,92 6,92'), ...[[20, 78], [36, 72], [54, 80], [70, 72]].map(([x, y]) => I(xf(circle(x, y, 4, 6), { sy: 0.6, cy: y }))), S(star(70, 28, 16, 6, 4))],
    // a flag planted among trees
    'Skyshroud Claim': () => [S('6,90 20,60 34,90'), S('66,90 80,60 94,90'), S(rect(46, 14, 6, 76)), S('52,16 84,22 52,34'), S('20,90 80,90 80,94 20,94')],
    // a skull-faced great helm
    'Syr Konrad, the Grim': () => [sub('Knight'), I(circle(40, 62, 4, 6)), I(circle(60, 62, 4, 6))],
    // a great drop drained into small ones
    Exsanguinate: () => [drop({ s: 0.8, dy: -6 }), drop({ s: 0.18, dx: -30, dy: 34 }), drop({ s: 0.18, dx: 30, dy: 34 }), drop({ s: 0.18, dy: 40 })],
    // a pillar of law
    'Authority of the Consuls': () => [S('20,10 80,10 76,20 24,20'), S('30,20 70,20 66,82 34,82'), S('20,82 80,82 84,92 16,92'), D('42,24 42,78; 50,24 50,78; 58,24 58,78', { w: 2.5 })],
    // a dryad's face crowned with land
    'Dryad of the Ilysian Grove': () => [sub('Dryad', { s: 0.86, dy: 7 }), S(star(50, 8, 7, 3, 5))],
    // a contract sealed with a skull
    'Diabolic Intent': () => [S('22,8 78,8 78,90 22,90'), D('32,22 68,22; 32,34 68,34; 32,46 58,46', { w: 3 }), skull({ s: 0.32, dx: 10, dy: 22 })],
    // a dinosaur under storm
    'Etali, Primal Storm': () => [dino({ s: 0.7, dx: -4, dy: 14 }), bolt({ s: 0.26, dx: 26, dy: -32 })],
    // a gust blowing everything away
    Aetherize: () => [S(limb('24,26 70,26 84,16 76,6', 12, 8)), S(limb('14,50 82,50 92,40 86,28', 12, 8)), S(limb('24,74 70,74 84,84 76,94', 12, 8))],
    // a face turning into a blank card
    'Reality Shift': () => [S('8,18 42,18 42,82 8,82'), S('50,18 68,22 76,34 76,64 66,78 50,82'), D('42,50 50,50', { w: 3 }), eye(62, 44, 3)],
    // a horned obelisk
    "Bolas's Citadel": () => [S2('60,24 76,16 86,4 88,20 76,30 62,34'), S('40,20 60,20 66,88 34,88'), S('20,88 80,88 86,94 14,94'), I('46,40 54,40 54,56 46,56')],
    // a faerie with a watchful eye
    'Faerie Mastermind': () => [sub('Faerie', { s: 0.86, dy: 6 }), ...eyeBig({ s: 0.24, dx: 34, dy: -38 })],
    // a monkey with a stolen coin
    'Ragavan, Nimble Pilferer': () => [sub('Monkey', { s: 0.82, dx: -6, dy: 4 }), ...coin(80, 78, 12)],
    // a card lifted from the earth
    'Bala Ged Recovery': () => [S('6,70 94,70 94,92 6,92'), hand({ s: 0.5, dx: -16, dy: 22 }), ...card({ s: 0.5, rot: 15, dx: 18, dy: -16 })],
    // an ornate reliquary
    'Relic of Sauron': () => [S('20,40 80,40 84,86 16,86'), S('14,30 50,12 86,30 80,40 20,40'), I('40,52 60,52 62,72 38,72'), I(ngon(50, 26, 5, 4))],
    // a blueprint and a sprout
    'Guardian Project': () => [S('10,14 74,14 74,86 10,86'), D('10,40 74,40; 10,62 74,62; 32,14 32,86; 54,14 54,86', { w: 2 }), ...sprout({ s: 0.5, dx: 26, dy: 22 })],
    // a war horn
    'Temur Battlecrier': () => [S('10,66 28,58 52,50 74,34 90,12 92,36 80,60 56,74 28,76'), D('48,56 54,72; 64,46 72,64', { w: 3 }), D('14,40 26,46; 22,28 32,38', { w: 3 })],
    // a giant standing in the sun
    'Sun Titan': () => [...sun({ s: 1 }), I('50,32 58,34 62,44 58,54 66,58 70,74 30,74 34,58 42,54 38,44 42,34')],
    // three leaves in a circle
    Harmonize: () => [ringS(50, 50, 34, 42, 16), MARK.g({ s: 0.5, dy: -18 }), MARK.g({ s: 0.5, rot: 120, cx: 50, cy: 50, dx: 0, dy: 0 }), MARK.g({ s: 0.5, dx: -16, dy: 12 })],
    // a geyser bursting up
    'Mana Geyser': () => [S('34,94 40,60 30,40 38,20 50,6 62,20 70,40 60,60 66,94'), S('6,88 94,88 94,96 6,96'), D('22,30 14,22; 78,30 86,22; 26,52 16,52; 74,52 84,52', { w: 3.5 })],
    // a cobra beside a lotus
    'Lotus Cobra': () => [...lotus({ s: 0.9, dy: 16 }), sub('Snake', { s: 0.5, dy: -26 })],
    // two faces back to back
    'Veyran, Voice of Duality': () => [S('48,10 34,14 24,28 22,48 18,58 26,62 26,76 36,82 48,84'), S('52,10 66,14 76,28 78,48 82,58 74,62 74,76 64,82 52,84'), I(ngon(34, 40, 3, 4)), I(ngon(66, 40, 3, 4))],
    // a crowned dinosaur head
    'Etali, Primal Conqueror': () => [dino({ s: 0.76, dx: -2, dy: 14 }), crown({ s: 0.4, dx: 6, dy: -32 })],
    // a broken gear and a leaf
    'Reclamation Sage': () => [gear(46, 54, 34, 10, 7, 0.3), I('42,20 50,36 42,46 52,60', { m: 0 }), MARK.g({ s: 0.5, dx: 30, dy: -32 })],
    // a coiled wyrm over its egg
    'Miirym, Sentinel Wyrm': () => [M('50,50 62,54 70,66 70,80 62,90 50,92'), sub('Dragon', { s: 0.66, dy: -16 })],
    // a note on fire
    'Seething Song': () => [flame(50, 92, 84, 1.1), ...note({ s: 0.6, dx: 4, dy: 18 })],
    // a straw hat on a winding path
    'Azusa, Lost but Seeking': () => [S('6,44 30,26 50,18 70,26 94,44 70,48 30,48'), D('50,56 40,66 58,76 46,92', { w: 5 })],
    // a war banner on wings
    'Aurelia, the Warleader': () => [wings(44, 44), S(rect(46, 6, 8, 88)), S('54,12 80,12 74,24 80,36 54,36')],
    // a little storm cloud
    Flusterstorm: () => [S('16,52 8,42 14,30 28,28 34,16 50,10 64,16 70,26 84,28 92,40 86,52'), bolt({ s: 0.4, dy: 26 })],
    // a molten metal blob splitting in two
    'Phyrexian Metamorph': () => [S('20,40 30,24 42,22 50,32 58,22 70,24 80,40 78,62 66,80 50,72 34,80 22,62'), I(circle(34, 46, 4, 6)), I(circle(66, 46, 4, 6)), D('50,32 50,72', { w: 3 })],
    // a book and a candle
    'Loran of the Third Path': () => [...book({ dy: 14 }), S(rect(44, 24, 12, 28)), flame(50, 24, 20, 0.3)],
    // a horned frog
    'The Gitrog Monster': () => [sub('Frog', { s: 0.86, dy: 8 }), S2('62,26 72,6 80,10 72,30')],
    // three dinosaur heads
    'Zacama, Primal Calamity': () => [S(limb('50,94 50,36', 12, 10)), S(limb('40,92 24,56', 11, 9)), S(limb('60,92 76,56', 11, 9)), S('8,46 22,38 36,46 30,60 14,60'), S('64,46 78,38 92,46 86,60 70,60'), S('38,22 50,14 62,22 60,40 40,40'), I(ngon(54, 28, 2.4, 4), { m: 1 })],
    // an arrow returning to the land
    "Sevinne's Reclamation": () => [S('6,74 94,74 94,92 6,92'), S(limb(arc(50, 50, 32, 60, 330, 12), 8, 8)), S('74,64 90,66 82,80')],
    // a flowering vine spreading
    'Utopia Sprawl': () => [S(limb('10,80 30,64 50,70 70,56 88,60', 9, 8)), S(limb('30,64 30,40 38,28', 7, 6)), S(limb('70,56 72,36 66,24', 7, 6)), S(star(38, 24, 13, 6, 5)), S(star(68, 20, 17, 8, 5)), S(star(84, 50, 14, 7, 5))],
    'Talisman of Unity': () => talisman('g', 'w'),
    // a bolt bent by a mirror
    'Redirect Lightning': () => [S('18,6 34,6 26,38 54,38 30,58 22,52 36,44 10,44'), S('56,40 84,50 80,94 52,84'), D('62,54 76,58', { w: 3 })],
    // a mouldering vine wreath
    'Moldervine Reclamation': () => [ringS(50, 50, 28, 40, 14), ...[[50, 10], [84, 40], [70, 82], [30, 82], [16, 40]].map(([x, y]) => S(star(x, y, 9, 4, 5)))],
    // a single petal
    'Lotus Petal': () => [S('50,8 66,26 72,52 64,76 50,92 36,76 28,52 34,26'), D('50,18 50,82', { w: 3 })],
    // a target shattered into four
    Decimate: () => [S(circle(50, 50, 40, 16)), I(circle(50, 50, 28, 16)), S(circle(50, 50, 14, 12)), D('50,6 50,94; 6,50 94,50', { w: 5 })],
  },
};
