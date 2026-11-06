// Per-card glyphs, batch 5: EDHREC ranks 337 to 432.
import { X, S, M, D, I, K, L, A, S2, limb, eyes, eye, circle, ngon, star, xf, rect, ringS, arc } from './_parts.mjs';
import { flame, wave, peak, gear, sword, shield, wings, spear, axe } from './_motifs.mjs';
import { talisman, signet, hand, sprout, MARK, card, fan, book, tome, skull, coin, bolt, key, crown, burst, drop, heart, moon, sun, potion, scroll, fist, tree, tornado, mask, arrow, hourglass, chain, vortex, tentacle, eyeBig, cauldron, banner, anvil, lotus, no, sub } from './_cards.mjs';

const five = (r, s = 0.24, dy = 0) => ['w', 'u', 'b', 'r', 'g'].map((c, i) => MARK[c]({ s, dx: r * Math.sin((i * 72 * Math.PI) / 180), dy: dy - r * Math.cos((i * 72 * Math.PI) / 180) }));
const gem = o => [S(xf('50,10 80,36 50,90 20,36', o)), D([xf('20,36 80,36', o), xf('36,36 50,90 64,36', o)], { w: 2.5 })];
const halo = (cx, cy, r) => S(xf(circle(cx, cy, r, 14), { sy: 0.3, cy }), { holes: [xf(circle(cx, cy, r * 0.65, 12), { sy: 0.2, cy })] });
const rose = o => [S(xf(limb('50,94 50,52', 6, 5), o)), S(xf('50,76 32,66 24,72 36,82', o)), S(xf('50,10 64,14 72,26 70,40 60,50 50,52 40,50 30,40 28,26 36,14', o)), D([xf('40,24 50,32 60,24', o), xf('36,38 50,44 64,38', o)], { w: 3 })];

export default {
  autofit: true,
  cards: {
    // a satyr's horned wine cup overflowing
    'Xenagos, God of Revels': () => [sub('Satyr', { s: 0.86, dy: 6 }), S(star(84, 14, 9, 3.5, 4))],
    // an oracle's eye over a land tile
    'Oracle of Mul Daya': () => [S('6,70 50,52 94,70 50,88'), ...eyeBig({ s: 0.7, dy: -18 })],
    // hooves stampeding
    'Overwhelming Stampede': () => [...[[26, 30], [62, 22], [40, 62], [76, 58]].map(([x, y]) => [S(xf('-10,10 -12,-6 -6,-12 0,-4 6,-12 12,-6 10,10 0,6', { dx: x, dy: y, cx: 0, cy: 0 }))])],
    // a chord struck on a harp
    'Chord of Calling': () => [S('22,90 20,40 30,16 54,8 78,18 84,40 74,48 54,42 44,54 40,90'), D('32,30 32,86; 42,22 42,52; 54,16 54,40; 66,20 66,42', { w: 2.5 })],
    // a squirrel general with a acorn helm
    'Chatterfang, Squirrel General': () => [sub('Squirrel', { s: 0.86, dy: 6 }), S('20,14 34,6 44,14 42,22 22,22')],
    // a gear being forged on an anvil
    Fabricate: () => [anvil({ dy: 10 }), gear(50, 22, 16, 8, 4, 0.34)],
    // a hive of hexagons
    'Sliver Hivelord': () => [...[[50, 22], [30, 38], [70, 38], [50, 54], [30, 70], [70, 70], [50, 86]].map(([x, y]) => S(ngon(x, y, 12, 6, 30))), I(ngon(50, 54, 5, 6, 30))],
    // a knight's helm with a white plume
    'Adeline, Resplendent Cathar': () => [sub('Knight'), S(star(20, 20, 10, 3.5, 4))],
    // a veil of light drawn over a figure
    'Veil of Summer': () => [S('10,92 14,40 30,14 50,8 70,14 86,40 90,92 70,78 50,92 30,78'), I('36,40 64,40 60,62 50,68 40,62'), MARK.g({ s: 0.36, dy: -26 })],
    // a catapult loaded with a goblin
    'Goblin Bombardment': () => [sub('Siege'), S2('24,10 30,4 32,16')],
    // skulls rising from a grave line
    'Living Death': () => [S('6,82 94,82 94,92 6,92'), skull({ s: 0.48, dx: -22, dy: 6 }), skull({ s: 0.48, dx: 22, dy: 6 }), skull({ s: 0.48, dy: -30 })],
    // a mother's protective rune
    'Mother of Runes': () => [ringS(50, 50, 34, 42, 16), S('50,18 74,50 50,82 26,50'), I('50,32 62,50 50,68 38,50')],
    // a coin purse and a seal of office
    'Kambal, Profiteering Mayor': () => [S('34,30 66,30 60,40 76,54 80,72 72,88 28,88 20,72 24,54 40,40'), D('32,34 68,34', { w: 4 }), I(star(50, 64, 10, 4, 5))],
    // a cracked stone
    Fracture: () => [S('14,30 30,14 58,10 82,22 90,50 80,78 52,90 24,82 10,58'), I('46,10 54,30 44,46 58,60 48,90 38,90 48,60 34,46 44,30 38,10')],
    // a green earth crystal
    'The Earth Crystal': () => [S('50,4 70,28 72,72 50,96 28,72 30,28'), D('50,4 50,96; 30,28 70,28; 28,72 72,72', { w: 2.5 })],
    // a kneeling figure under a crown
    'Blind Obedience': () => [crown({ s: 0.5, dy: -26 }), S(circle(50, 54, 10, 8)), M('50,64 64,66 74,80 76,92 50,92')],
    // a mind with a misstep
    'Mental Misstep': () => [sub('Brainiac', { s: 0.86, dy: 6 }), ...no({ s: 0.9 })],
    // a naturalist's magnifier and leaf
    'Jukai Naturalist': () => [MARK.g({ s: 1.2, cx: 50, cy: 50, dx: -6, dy: 6 }), S(circle(68, 30, 16, 12), { holes: [circle(68, 30, 9, 8)] }), S(limb('80,42 92,56', 7, 7))],
    // a flame igniting a field
    "Chandra's Ignition": () => [flame(50, 92, 86, 1.15), S(circle(50, 62, 12, 10)), I(circle(50, 62, 5, 6))],
    // a banner over ranks
    'Legion Leadership': () => [...banner({ dx: -6 }), shield({ s: 0.5, dx: 14, dy: 24 })],
    // a green sun at its zenith
    "Green Sun's Zenith": () => [...sun({ s: 1 }), MARK.g({ s: 0.6, cx: 50, cy: 50, dx: 0, dy: 0 })],
    // a lion's lair: a retreat
    'Felidar Retreat': () => [S('6,88 12,56 26,34 44,22 60,22 76,32 88,52 94,88', { holes: ['28,88 32,64 42,52 50,48 58,52 68,64 72,88'] }), S(star(50, 70, 10, 4, 5))],
    // an ascending arrow over waves and leaves
    'Simic Ascendancy': () => [wave(74, 6), MARK.g({ s: 0.6, dx: -16, dy: -10 }), S('66,48 78,24 90,48 82,46 82,64 74,64 74,46')],
    // a mass of question-free mysteries: a hooded cluster of eyes
    'Mass of Mysteries': () => [S('10,70 16,40 36,20 64,20 84,40 90,70 70,86 30,86'), ...[[34, 44], [62, 40], [48, 62], [72, 64], [28, 66]].map(([x, y]) => I(ngon(x, y, 5, 6)))],
    // a chained eye in a crown
    'Binding the Old Gods': () => [...eyeBig({ s: 0.8 }), ...chain([[10, 50], [90, 50]], 7)],
    // a leaf and a wave intertwined
    Terrasymbiosis: () => [MARK.g({ s: 1.7, cx: 50, cy: 50, dx: -14, dy: -10 }), MARK.u({ s: 1.5, cx: 50, cy: 50, dx: 14, dy: 16 })],
    // a red flash
    Pyroblast: () => [burst({}, 10, 0.45), flame(50, 66, 34, 0.5)],
    // two leaves bound together
    'Elemental Bond': () => [MARK.g({ s: 1.5, cx: 50, cy: 50, dx: -18 }), MARK.g({ s: 1.5, cx: 50, cy: 50, dx: 18 }), S('28,48 72,48 72,58 28,58')],
    // roots shared between two trees
    'Shared Roots': () => [...tree({ s: 0.5, dx: -22, dy: -16 }), ...tree({ s: 0.5, dx: 22, dy: -16 }), S(limb('14,86 30,74 50,80 70,74 86,86', 7, 6))],
    // a haloed ghostly knight
    'Geist of Saint Thalia': () => [sub('Spirit', { s: 0.86, dy: 8 }), halo(50, 8, 16)],
    // a marauder's cleaver
    'Accursed Marauder': () => [S('20,14 74,14 84,24 84,52 20,52'), S(limb('34,52 30,92', 9, 9)), I(circle(70, 30, 5, 6)), skull({ s: 0.3, dx: 22, dy: 26 })],
    // a hand sifting bones
    'Grisly Salvage': () => [hand({ s: 0.7, dx: -14, dy: 14 }), skull({ s: 0.56, dx: 20, dy: -12 })],
    // a hand hiding behind a curtain
    'Clever Concealment': () => [S('10,8 90,8 90,16 10,16'), S('14,16 40,16 34,50 40,90 14,90'), S('60,16 86,16 86,90 60,90 66,50'), S(star(50, 52, 10, 3.5, 4))],
    // a balance of office
    'Kambal, Consul of Allocation': () => [sub('Monger')],
    // a sun pierced by a blade
    'Glissa Sunslayer': () => [...sun({ s: 0.9, dy: -10 }), S('46,40 54,40 56,92 50,96 44,92')],
    // a skull with a prophet's eye
    'Skull Prophet': () => [skull({ s: 0.9, dy: 6 }), I(ngon(50, 30, 6, 4))],
    // a fist holding five suns
    'Fist of Suns': () => [fist({ s: 0.8, dy: 12 }), ...five(30, 0.22, -26)],
    // two harvests: twin wheat sheaves
    'Second Harvest': () => [...[30, 70].map(x => [S(xf('0,-36 8,-20 6,0 10,30 -10,30 -6,0 -8,-20', { dx: x, dy: 56, cx: 0, cy: 0 })), D([xf('-8,6 8,6', { dx: x, dy: 56, cx: 0, cy: 0 })], { w: 3 })])],
    // a dark realm rising: a tower under a crescent
    'Rise of the Dark Realms': () => [moon({ s: 0.4, dx: -26, dy: -26 }), S('40,30 60,30 68,90 32,90'), S('36,22 64,22 64,32 36,32'), skull({ s: 0.3, dy: 10 })],
    // a lion head with a festival crown
    'Jetmir, Nexus of Revels': () => [sub('Chimera', { s: 0.9, dy: 6 })],
    // an ascending arrow with a prayer-bead ring
    'Jeskai Ascendancy': () => [ringS(50, 56, 28, 36, 14), S('50,6 66,30 56,30 56,62 44,62 44,30 34,30')],
    // a horned dark-steel helm
    'Sheoldred, the Apocalypse': () => [S2('60,30 72,10 90,4 82,16 72,34'), sub('Knight', { s: 0.86, dy: 8 })],
    // a demon's contract
    'Diabolic Tutor': () => [...scroll({ s: 0.86, dy: 6 }), S2('60,8 70,0 74,12')],
    // a thief's mask over a card
    'Notion Thief': () => [...card({ s: 0.62, dy: 20 }), S('14,24 50,30 86,24 80,44 56,40 50,46 44,40 20,44'), K(ngon(34, 34, 3, 4)), A(ngon(66, 34, 3, 4))],
    // a crusader's banner and helm
    "Cathars' Crusade": () => [...banner({ s: 0.9, dx: -14 }), sub('Soldier', { s: 0.5, dx: 22, dy: 24 })],
    // a field journal and a lantern
    'Tamiyo, Field Researcher': () => [...book({ dy: 12 }), moon({ s: 0.4, dy: -30 })],
    // a storyteller's open book with sparks
    'Birgi, God of Storytelling': () => [...book({ dy: 12 }), flame(50, 44, 34, 0.5)],
    // a bolt bent back
    'Bolt Bend': () => [S('16,8 34,8 26,40 60,40 72,60 58,62 52,52 22,52 8,40'), S('58,62 84,62 70,92')],
    // a pointed mage hat with glowing eyes
    'Vivi Ornitier': () => [S('8,48 26,40 40,14 52,4 60,16 66,40 92,48 70,54 30,54'), K('30,54 70,54 66,80 34,80'), A(ngon(42, 64, 4, 4)), A(ngon(58, 64, 4, 4))],
    // two worlds linked by a conduit
    'Conduit of Worlds': () => [S(circle(24, 30, 18, 12)), S(circle(76, 70, 18, 12)), S(limb('36,42 64,58', 10, 10)), I(circle(24, 30, 6, 6)), I(circle(76, 70, 6, 6))],
    // bones cast for a reading
    'Read the Bones': () => [skull({ s: 0.66, dx: 10, dy: -12 }), S(limb('16,84 86,74', 9, 9)), S(circle(16, 84, 7, 6)), S(circle(86, 74, 7, 6))],
    // a cull: a sickle over a drop
    'Culling the Weak': () => [S('20,30 34,14 54,8 74,12 88,24 92,40 80,30 64,24 46,24 32,32 26,40'), S(limb('30,36 56,78', 9, 9)), drop({ s: 0.36, dx: 18, dy: 26 })],
    // a beastmaster's claw ascending
    'Beastmaster Ascension': () => [S('20,92 22,60 34,40 50,34 66,40 78,60 80,92'), S('26,46 18,16 34,40'), S('42,36 42,6 54,34'), S('58,36 66,8 70,40'), S('74,46 86,18 82,52'), S(star(50, 66, 10, 4, 5))],
    // a dragon over mountain peaks
    'Terror of the Peaks': () => [peak(26, 94, 36, 46), peak(74, 94, 40, 50), sub('Dragon', { s: 0.6, dy: -18 })],
    // an edict scroll with a skull
    'Blasphemous Edict': () => [...scroll({}), skull({ s: 0.3, dx: 18, dy: 12 })],
    // a market stall
    'Mahadi, Emporium Master': () => [S('6,34 50,10 94,34 84,40 16,40'), S('16,40 30,40 30,90 16,90'), S('70,40 84,40 84,90 70,90'), S('10,64 90,64 90,72 10,72'), ...coin(50, 52, 9)],
    // a volcano awakening
    'Valakut Awakening': () => [S('6,92 34,40 66,40 94,92'), flame(50, 40, 34, 0.6), I('40,52 50,66 60,52 56,92 44,92')],
    // a probe with a needle
    'Gitaxian Probe': () => [S(limb('14,88 60,42', 11, 11)), S('56,46 52,30 70,24 78,40'), S(limb('72,30 90,12', 5, 4)), ...eyeBig({ s: 0.5, dx: 16, dy: 16 })],
    // a snake coiled around an oracle's orb
    'Coiling Oracle': () => [S(circle(50, 58, 26, 14)), S(limb('14,70 30,40 50,32 70,40 86,30', 8, 6)), S('82,24 94,20 92,34 82,34'), I(circle(50, 58, 8, 8))],
    // a rose with thorns
    'Vito, Thorn of the Dusk Rose': () => [...rose({}), S2('52,62 62,58 56,68')],
    // roots creeping up from below
    'Insidious Roots': () => [S('6,20 94,20 94,30 6,30'), S(limb('20,30 24,60 14,90', 8, 4)), S(limb('50,30 50,62 60,92', 9, 4)), S(limb('80,30 74,58 86,88', 8, 4))],
    // a dusk rose
    'Elenda, the Dusk Rose': () => [...rose({}), drop({ s: 0.18, dx: 28, dy: 20 })],
    // a dragon with a world in its claws
    'Atarka, World Render': () => [sub('Dragon', { s: 0.8, dy: -6 }), S(circle(50, 82, 12, 10))],
    // two hearts bound in blood
    'Sanguine Bond': () => [heart({ s: 0.6, dx: -16, dy: -6 }), heart({ s: 0.6, dx: 16, dy: 6 }), drop({ s: 0.2, dy: 38 })],
    // a temple atop rising steps
    'Growing Rites of Itlimoc': () => [S('8,90 92,90 84,74 16,74'), S('20,72 80,72 72,56 28,56'), S('30,54 70,54 64,38 36,38'), S('40,36 60,36 60,20 40,20'), MARK.g({ s: 0.4, dy: -36 })],
    // a sword through a storm cloud
    'Elspeth, Storm Slayer': () => [S('16,52 8,42 14,30 28,28 34,16 50,10 64,16 70,26 84,28 92,40 86,52'), ...sword({ s: 0.8, dy: 10 })],
    // a great cleaver
    'The Reaver Cleaver': () => [S('18,10 78,10 88,20 86,58 18,58'), S(limb('30,58 26,94', 10, 10)), I(circle(70, 26, 6, 6)), D('24,48 80,48', { w: 3 })],
    // a shield wall: three shields locked
    'Unbreakable Formation': () => [shield({ s: 0.6, dx: -28, dy: 10 }), shield({ s: 0.6, dx: 28, dy: 10 }), shield({ s: 0.7, dy: -4 })],
    // a monk on a peak
    'Pinnacle Monk': () => [peak(50, 94, 40, 90), S(circle(50, 18, 9, 8)), M('50,28 60,30 70,52 50,54')],
    // a broker's scale over coins
    'Brokers Ascendancy': () => [...coin(50, 78, 16), S(rect(46, 18, 8, 46)), S('12,22 88,22 88,30 12,30'), S('4,42 32,42 26,54 10,54'), S('68,42 96,42 90,54 74,54'), L('18,30 12,42; 82,30 88,42', { w: 2.5 })],
    // a wurm devouring skulls
    'Massacre Wurm': () => [sub('Wurm', { s: 0.86, dy: 4 }), skull({ s: 0.24, dx: 32, dy: 30 })],
    // a meathook on a chain
    'The Meathook Massacre': () => [...chain([[50, 8], [50, 22]], 7), S('46,30 54,30 54,60 62,74 58,88 44,92 32,84 32,72 42,74 44,82 50,80 50,70 46,62'), drop({ s: 0.2, dx: 26, dy: 34 })],
    // a memorial banner on a kavu
    'Tannuk, Memorial Ensign': () => [sub('Kavu', { s: 0.86, dy: 8 }), S(rect(80, 2, 4, 26)), S('84,4 96,8 84,14')],
    // a ghost over a crypt
    'Crypt Ghast': () => [S('10,62 50,50 90,62 90,92 10,92'), I('40,92 40,72 50,66 60,72 60,92'), sub('Spirit', { s: 0.5, dy: -24 })],
    // a goblet of blood
    'Exquisite Blood': () => [S('24,10 76,10 70,40 56,50 56,74 70,86 30,86 44,74 44,50 30,40'), I('28,14 72,14 68,32 32,32'), drop({ s: 0.18, dy: 40 })],
    // a champion lamb with a sword
    'Champion of Lambholt': () => [sub('Sheep', { s: 0.82, dx: -6, dy: 8 }), ...sword({ s: 0.5, dx: 30, dy: -8 })],
    // a dark book bleeding
    Necropotence: () => [...tome({ s: 0.9 }), skull({ s: 0.34, dx: 4, dy: -6 }), drop({ s: 0.16, dx: 30, dy: 40 })],
    // a talisman shaped like a claw
    'Wishclaw Talisman': () => [L('50,6 50,18', { w: 3 }), ringS(50, 10, 3, 7, 8), S('50,18 70,30 80,50 72,74 60,86 50,74 40,86 28,74 20,50 30,30'), I(star(50, 48, 10, 4, 5))],
    // a withered bloom with a crown of thorns
    'Beledros Witherbloom': () => [sub('Treefolk', { s: 0.86, dy: 8 }), S('30,12 38,2 44,10 50,0 56,10 62,2 70,12 50,16')],
    // a cat blinking out of place
    'Displacer Kitten': () => [sub('Cat', { s: 0.86, dx: 4, dy: 4 }), D('8,30 18,34; 6,50 16,50; 8,70 18,66', { w: 3.5 })],
    // a laughing scientist's flask
    'Laboratory Maniac': () => [...potion({}), D('16,20 24,28; 84,20 76,28', { w: 3.5 })],
    // an eroding cliff
    Erode: () => [S('10,92 14,40 30,24 50,20 64,30 70,48 62,64 76,78 72,92'), D('34,40 40,52; 50,34 56,46', { w: 3 }), S(circle(84, 70, 4, 6)), S(circle(88, 84, 5, 6))],
    // ripples spreading from a skull
    'Ripples of Undeath': () => [D(arc(50, 62, 36, 270, 450, 10, 14), { w: 4 }), D(arc(50, 62, 44, 270, 450, 10, 20), { w: 4 }), skull({ s: 0.5, dy: -12 })],
    // a mechanaut with a wrench
    'Enthusiastic Mechanaut': () => [sub('Robot', { s: 0.82, dx: -6, dy: 6 }), S(limb('74,90 86,58', 6, 6)), S('80,54 78,44 88,40 92,52')],
    // a broken icon
    'Third Path Iconoclast': () => [S('20,10 80,10 80,82 50,94 20,82'), I('46,10 54,30 46,46 56,64 48,94 40,90 48,64 38,46 46,30 40,10')],
    // a sprung trap snapping a brain
    'Mindbreak Trap': () => [sub('Trap'), sub('Brainiac', { s: 0.4, dy: -26 })],
    // a hand giving back a card
    Reprieve: () => [...card({ s: 0.62, dx: -10, dy: 8 }), S(limb(arc(50, 50, 40, 30, 150, 8), 8, 8)), S('20,62 34,84 10,82')],
    // a creature turned to dark steel
    'Darksteel Mutation': () => [S('20,70 30,40 50,30 70,40 80,70 70,90 30,90'), S2('62,36 70,20 76,40'), D('36,56 64,56; 50,44 50,84', { w: 3 }), eyes(60, 50, 3)],
    // an angel with dark wings and a halo
    'Avacyn, Angel of Horror': () => [sub('Angel'), I(ngon(50, 30, 3, 4))],
    // a wizard's staff with a crystal
    "Wizard's Staff": () => [S(limb('30,94 64,30', 8, 7)), S('64,6 80,18 80,36 64,44 52,32 52,18'), I('64,16 72,22 72,32 64,36 58,30 58,22')],
    // a hand raising a corpse
    'Dread Return': () => [S('6,82 94,82 94,92 6,92'), hand({ s: 0.62, dx: -18, dy: 6 }), skull({ s: 0.44, dx: 22, dy: -14 })],
    // a spirit shielding others
    'Selfless Spirit': () => [sub('Spirit', { s: 0.8, dy: -6 }), S('14,82 86,82 80,94 20,94'), wings(50, 28)],
    // a tree with six branches
    Six: () => [sub('Treefolk', { s: 0.84, dy: 8 }), ...[[14, 20], [86, 20], [10, 46], [90, 46], [30, 6], [70, 6]].map(([x, y]) => MARK.g({ s: 0.24, cx: 50, cy: 50, dx: x - 50, dy: y - 50 }))],
    // a paladin's shield with an equipped blade
    'Puresteel Paladin': () => [shield({}), ...sword({ s: 0.6, dy: -6 })],
    // an imperial seal
    'Imperial Seal': () => [S(star(50, 54, 40, 34, 16)), I(circle(50, 54, 24, 14)), crown({ s: 0.36, dy: 4 })],
    // an elf among tree branches
    'Arbor Elf': () => [sub('Elf', { s: 0.82, dy: 9 }), S(limb('8,10 30,20 50,14 70,20 92,10', 7, 6))],
  },
};
