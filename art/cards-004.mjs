// Per-card glyphs, batch 4: EDHREC ranks 241 to 336.
import { X, S, M, D, I, K, L, A, S2, limb, eyes, eye, circle, ngon, star, xf, rect, ringS, arc } from './_parts.mjs';
import { flame, wave, peak, gear, sword, shield, wings, spear, axe } from './_motifs.mjs';
import { talisman, signet, hand, sprout, MARK, card, fan, book, tome, skull, coin, bolt, key, crown, burst, drop, heart, moon, sun, potion, scroll, fist, tree, tornado, mask, arrow, hourglass, chain, vortex, tentacle, eyeBig, cauldron, banner, anvil, lotus, no, sub } from './_cards.mjs';

const halo = (cx, cy, r) => S(xf(circle(cx, cy, r, 14), { sy: 0.3, cy }), { holes: [xf(circle(cx, cy, r * 0.65, 12), { sy: 0.2, cy })] });
const coffin = o => S(xf('38,8 62,8 74,24 66,92 34,92 26,24', o));
const snow = (cx, cy, r) => S(star(cx, cy, r, r * 0.35, 6));

export default {
  autofit: true,
  cards: {
    // a whip of braided hair
    'Braids, Arisen Nightmare': () => [S(limb('20,10 34,22 28,38 44,50 38,66 54,78 50,92', 12, 6)), D('24,18 34,22; 30,34 38,40; 38,50 46,56; 44,66 50,72', { w: 2.5 }), S(circle(70, 30, 12, 10)), eye(70, 30, 3)],
    // a palette and a brushstroke
    'Expressive Iteration': () => [S('20,30 42,14 70,16 88,34 86,58 70,74 54,68 40,82 22,74 12,52', { holes: [circle(32, 56, 6, 8)] }), I(circle(50, 30, 5, 6)), I(circle(70, 36, 5, 6)), I(circle(70, 56, 5, 6))],
    // a tax scroll over the land
    'Land Tax': () => [...scroll({ s: 0.8, dy: -6 }), peak(50, 96, 22, 60)],
    // a raging elemental of flame
    'Omnath, Locus of Rage': () => [flame(50, 92, 84, 1.1), I('36,50 46,54 44,58'), I('64,50 54,54 56,58'), I('40,68 60,68 50,74')],
    // a serpent in a whirlpool
    'Aesi, Tyrant of Gyre Strait': () => [sub('Serpent', { s: 0.86, dy: -6 }), D(arc(50, 90, 30, 280, 440, 8, 6), { w: 3 })],
    // a war horn with a pennant
    "Warleader's Call": () => [S('8,62 26,54 52,50 74,34 90,14 92,38 80,60 56,72 26,74'), S(limb('50,50 50,14', 4, 4)), S('52,14 72,20 52,28')],
    // an eye within a leaf
    'Shamanic Revelation': () => [MARK.g({ s: 1.6, cx: 50, cy: 50, dx: 0, dy: 0 }), ...eyeBig({ s: 0.4 })],
    // a halo shattering
    'Aura Shards': () => [S('16,40 30,26 46,22 44,34 28,44'), S('56,22 72,26 86,40 72,44 58,34'), S('86,58 72,74 56,78 58,66 72,56'), S('44,78 28,74 14,60 28,56 42,66'), S(star(50, 50, 10, 4, 4))],
    // the sun rising over the horizon
    "Dawn's Truce": () => [S('6,62 94,62 94,70 6,70'), S(xf(star(50, 62, 42, 32, 16))), S('22,62 26,46 38,36 50,32 62,36 74,46 78,62')],
    Entomb: () => [coffin(), I('40,22 60,22 66,32 60,82 40,82 34,32'), D('44,40 56,40; 50,34 50,56'.split(';')[0], { w: 3 })],
    // two crossed curved blades
    'Isshin, Two Heavens as One': () => [S(xf('48,6 54,8 56,64 50,74 44,64', { rot: -32 })), S(xf('48,6 54,8 56,64 50,74 44,64', { rot: 32 })), S(xf(rect(44, 74, 12, 4), { rot: -32 })), S(xf(rect(44, 74, 12, 4), { rot: 32 })), S(circle(20, 18, 7, 8)), S(circle(80, 18, 7, 8))],
    // a crowned dragon
    'Korvold, Fae-Cursed King': () => [sub('Dragon', { s: 0.86, dy: 8 }), crown({ s: 0.34, dy: -38 })],
    // a forking branch
    'Branching Evolution': () => [S(limb('50,94 50,58 30,36 22,14', 13, 7)), S(limb('50,62 70,40 80,18', 13, 7)), S(limb('36,44 50,28 54,14', 9, 6)), S(star(22, 12, 9, 4, 4)), S(star(80, 14, 11, 4, 4))],
    // a dragon breathing lightning
    'Niv-Mizzet, Parun': () => [sub('Dragon', { s: 0.8, dx: -10, dy: 6 }), bolt({ s: 0.3, dx: 30, dy: 10 })],
    // a chalice anointing
    'Anointed Procession': () => [S('22,30 78,30 70,52 56,60 56,78 70,88 30,88 44,78 44,60 30,52'), drop({ s: 0.24, dy: -36 })],
    // a lens over a gathered kin
    'Kindred Discovery': () => [X([...[30, 50, 70].map((x, i) => S(circle(x, i === 1 ? 46 : 54, 12, 8))), S('14,90 20,70 50,62 80,70 86,90')], { s: 0.86, dy: 6 }), S(circle(70, 26, 14, 12), { holes: [circle(70, 26, 8, 8)] }), S(limb('60,36 50,46', 6, 6))],
    // a tower above a grave
    'Bastion of Remembrance': () => [S('30,6 40,6 40,12 46,12 46,6 54,6 54,12 60,12 60,6 70,6 70,22 30,22'), S('34,22 66,22 70,90 30,90'), I('44,32 56,32 56,46 44,46'), S('14,90 86,90 86,96 14,96')],
    // a toasting goblet
    'Cruel Celebrant': () => [S('26,12 74,12 68,40 56,50 56,74 70,86 30,86 44,74 44,50 32,40'), I('30,16 70,16 66,30 34,30'), D('20,6 26,12; 80,6 74,12', { w: 3 })],
    'Selesnya Signet': () => signet('g', 'w'),
    // vines wrapping a gear
    "Nature's Claim": () => [gear(50, 50, 36, 10, 7, 0.3), S(limb('14,86 28,60 50,52 70,36 84,14', 7, 5)), S('40,52 30,42 44,40'), S('70,36 82,38 74,46')],
    // a charging beast
    'Rampaging Baloths': () => [sub('Beast', { s: 0.9, dy: 4 }), D('8,80 18,70; 82,80 92,70', { w: 4 })],
    // a mossy stone face
    'Forgotten Ancient': () => [S('22,18 50,8 78,18 84,50 76,82 50,92 24,82 16,50'), I('32,40 44,42 42,48'), I('68,40 56,42 58,48'), D('40,68 60,68', { w: 3.5 }), S('22,18 34,8 50,14 66,6 78,18 50,22')],
    // an angry flame face
    Anger: () => [flame(50, 92, 86, 1.1), I('34,52 46,56 44,60'), I('66,52 54,56 56,60'), I('40,72 60,72 56,78 44,78')],
    // a small bauble with a compass needle
    "Wayfarer's Bauble": () => [L('50,6 50,18', { w: 3 }), ringS(50, 10, 3, 7, 8), S(circle(50, 56, 34, 14)), I(circle(50, 56, 24, 14)), S('50,36 56,56 50,76 44,56'), I('50,40 54,56 46,56')],
    // a ferret with a secret key
    'Toski, Bearer of Secrets': () => [sub('Ferret', { s: 0.86, dy: -2 }), S(circle(78, 80, 12, 10)), I(ngon(78, 80, 4, 4))],
    // a skull in a ring of crackling lightning
    'Crackling Doom': () => [D('10,50 20,34 30,46 40,24 50,40 60,24 70,46 80,34 90,50', { w: 4 }), skull({ s: 0.7, dy: 14 })],
    // an otter holding lightning
    'Stormcatch Mentor': () => [sub('Otter', { s: 0.86, dx: -6, dy: 6 }), bolt({ s: 0.28, dx: 32, dy: -30 })],
    // a sprout growing counters
    'Evolution Sage': () => [MARK.g({ s: 1.5, cx: 50, cy: 50, dx: 0, dy: 6 }), ...[[18, 18], [82, 18]].map(([x, y]) => S(star(x, y, 12, 4, 4)))],
    // a mole in the snow
    'Icetill Explorer': () => [sub('Mole', { s: 0.86, dy: 8 }), snow(18, 16, 9), snow(84, 14, 8)],
    // a kami spirit with a leaf
    'Kami of Whispered Hopes': () => [sub('Spirit', { s: 0.86, dy: 6 }), MARK.g({ s: 0.4, dx: 32, dy: -32 })],
    // a half-closed eye over a card
    Consider: () => [...card({ s: 0.6, dy: 18 }), S('16,30 32,18 50,14 68,18 84,30 68,34 50,36 32,34'), D('22,30 78,30', { w: 3 })],
    // a snake coiled on a staff
    'Fanatic of Rhonas': () => [S(rect(22, 30, 8, 64)), sub('Snake', { s: 0.9, dx: 8, dy: 2 })],
    // two heads side by side
    'Parallel Lives': () => [S(circle(32, 34, 13, 10)), S(circle(68, 34, 13, 10)), S('12,90 16,66 32,54 46,62 46,90'), S('54,90 54,62 68,54 84,66 88,90')],
    // a stitched-shut mouth
    Silence: () => [M('50,12 64,16 74,28 76,46 72,62 62,74 50,78'), eyes(60, 40, 3), I('34,58 66,58 62,64 38,64'), D('40,54 40,68; 50,54 50,68; 60,54 60,68', { w: 2.5 })],
    // wings around a sheltering dome
    'Shalai, Voice of Plenty': () => [wings(40, 44), S('20,88 22,66 34,54 50,50 66,54 78,66 80,88', { holes: ['30,88 32,70 40,62 50,60 60,62 68,70 70,88'] })],
    // a hand reaching from a coffin
    'Buried Alive': () => [coffin({ s: 0.8, dy: 8 }), hand({ s: 0.5, dy: -24 })],
    // a dragon over a coin
    'Goldspan Dragon': () => [...coin(50, 72, 20), sub('Dragon', { s: 0.66, dy: -16 })],
    // a figure and its mirror double
    'Spark Double': () => [S(circle(30, 30, 12, 10)), S('12,90 16,62 30,48 44,62 46,90'), S(circle(70, 30, 12, 10)), S('54,90 56,62 70,48 84,62 88,90'), S(star(50, 14, 8, 3, 4))],
    // a pact with a slash through it
    'Pact of Negation': () => [...scroll({ s: 0.86 }), ...no({})],
    // a hand holding wheat
    "Sythis, Harvest's Hand": () => [hand({ s: 0.7, dy: 18 }), ...[38, 50, 62].map(x => [S(limb(`${x},60 ${x},20`, 3, 3)), S(xf('0,-10 4,0 0,10 -4,0', { dx: x, dy: 16, cx: 0, cy: 0 }))])],
    // a heart sprouting a leaf
    'Selvala, Heart of the Wilds': () => [heart({ s: 0.84, dy: 10 }), MARK.g({ s: 0.5, dx: 12, dy: -32 })],
    // a lute ringing out
    'Resonating Lute': () => [sub('Bard', { s: 0.84, dx: -6 }), D(arc(50, 52, 34, 40, 80, 4), { w: 3.5 }), D(arc(50, 52, 44, 40, 80, 4), { w: 3.5 })],
    // a tower on a windswept crag
    'Windcrag Siege': () => [peak(50, 92, 50, 88), S('38,6 46,6 46,10 54,10 54,6 62,6 62,46 38,46'), D('8,20 30,20; 70,28 92,28; 6,36 28,36', { w: 4 })],
    // a shouting mouth in a laurel
    'Voice of Victory': () => [S2('54,90 38,82 24,66 18,44 20,24 28,36 32,54 42,70 56,80'), I(xf(circle(50, 48, 14, 10), { sy: 1.2 })), D('50,22 50,14; 30,30 24,24; 70,30 76,24', { w: 3 })],
    // a shed skin over a shield
    'Snakeskin Veil': () => [shield({}), D('34,30 50,38 66,30; 34,46 50,54 66,46; 38,62 50,70 62,62', { w: 3 })],
    // a throne on legs
    'Roaming Throne': () => [S('26,8 38,2 50,8 62,2 74,8 74,50 26,50'), S('16,44 84,44 84,56 16,56'), S(limb('24,56 14,90', 7, 6)), S(limb('76,56 86,90', 7, 6)), S(limb('40,56 36,90', 6, 6)), S(limb('60,56 64,90', 6, 6)), I('42,16 58,16 56,34 44,34')],
    // a glowing elk
    'Enduring Vitality': () => [sub('Elk', { s: 0.86, dy: 6 }), S(star(12, 80, 7, 2.5, 4)), S(star(88, 78, 7, 2.5, 4))],
    // a broken gear beside a torn page
    'Wear // Tear': () => [gear(32, 40, 24, 8, 5, 0.32), S('56,40 90,40 90,92 56,92 62,78 54,66 62,52')],
    // a sprout with arrows rising
    'Unnatural Growth': () => [...sprout({ s: 1.1, dy: -2 }), ...[[18, 30], [82, 30]].map(([x, y]) => S(xf('0,-14 8,-2 3,-2 3,10 -3,10 -3,-2 -8,-2', { dx: x, dy: y, cx: 0, cy: 0 })))],
    // fire bursting through cracked ground
    'Underworld Breach': () => [flame(50, 66, 58, 0.9), S('6,66 36,66 44,78 56,68 64,66 94,66 94,94 6,94'), I('40,72 48,80 56,72 52,90 46,90')],
    // a demon with a whip
    'Kardur, Doomscourge': () => [sub('Demon', { s: 0.82, dy: 8 }), D('10,88 20,74 12,60 24,48', { w: 4 })],
    // a dagger at the throat
    'Go for the Throat': () => [S('20,60 30,48 44,44 56,48 64,60 64,94 20,94'), S(xf('46,6 54,6 56,52 50,62 44,52', { rot: 50, cx: 70, cy: 40 })), D('34,58 50,58', { w: 3 })],
    // an altar holding a gear
    "Ashnod's Altar": () => [S('12,56 88,56 80,92 20,92'), D('20,68 80,68', { w: 3 }), gear(50, 34, 20, 8, 5, 0.34)],
    // a figure fading into sparkle
    Ephemerate: () => [S(circle(50, 24, 10, 8)), M('50,36 62,40 66,60 62,90 50,90'), D('70,30 82,24; 72,50 88,50; 70,70 82,76', { w: 3 }), S(star(84, 12, 8, 3, 4))],
    // a vampire at an open door
    'Welcoming Vampire': () => [S('8,8 46,8 46,92 8,92', { holes: ['16,16 38,16 38,92 16,92'] }), sub('Vampire', { s: 0.6, dx: 20, dy: 14 })],
    // a frost serpent
    'Ohran Frostfang': () => [sub('Snake', { s: 0.86, dy: 6 }), snow(18, 18, 10)],
    // a fiery beast crowned with crystals
    'Jegantha, the Wellspring': () => [sub('Elk', { s: 0.86, dy: 6 }), S('40,10 44,0 48,10'), S('52,10 56,0 60,10')],
    // an elf crowned in leaves
    'Disciple of Freyalise': () => [sub('Elf', { s: 0.86, dy: 7 }), S('32,22 40,10 46,20 54,8 60,20 68,10 72,24 50,24')],
    // a sword through a wax seal
    Dispatch: () => [S(circle(50, 62, 26, 12)), I(star(50, 62, 10, 4, 5)), ...sword({ rot: 0, s: 0.8, dy: -12 })],
    // cupped hands around a moon
    "Tamiyo's Safekeeping": () => [moon({ s: 0.5, dy: -12 }), S('8,58 22,52 40,66 50,84 50,94 30,94 14,80'), S('92,58 78,52 60,66 50,84 50,94 70,94 86,80')],
    // falling chains of darkness
    Damnation: () => [flame(50, 94, 88, 1.15), skull({ s: 0.72, dy: 14 })],
    // a dragon under a halo
    'Mondrak, Glory Dominus': () => [sub('Dragon', { s: 0.86, dy: 8 }), halo(50, 8, 18)],
    // a silver tree
    'Sterling Grove': () => [...tree({}), D('34,26 44,34; 56,22 66,32; 30,42 40,44', { w: 3 })],
    // a chisel shaping metal
    'Etherium Sculptor': () => [S('18,50 50,40 82,50 82,90 18,90'), S(limb('74,6 50,40', 8, 6)), S('46,36 54,42 48,48'), D('26,62 74,62; 34,76 66,76', { w: 3 })],
    // a tree that walks
    'Entish Restoration': () => [S('22,18 50,6 78,18 84,40 70,50 30,50 16,40'), S('38,48 62,48 64,70 54,70 54,94 46,94 46,70 36,70'), S(limb('38,58 22,72', 6, 5)), S(limb('62,58 80,46', 6, 5))],
    // a dauthi before the void
    'Dauthi Voidwalker': () => [S(circle(50, 50, 44, 16)), sub('Dauthi', { s: 0.8, dy: 6 })],
    // a hammer and a glowing shield
    'Sram, Senior Edificer': () => [shield({ s: 0.8, dx: -8, dy: 4 }), S(limb('86,10 54,58', 6, 6)), S(xf('64,6 92,6 92,20 64,20', { rot: 35, cx: 78, cy: 14 }))],
    // a goblin over flames
    Guttersnipe: () => [flame(50, 92, 50, 1.2), sub('Goblin', { s: 0.78, dy: -6 })],
    // a lantern holding a soul
    'Soul Warden': () => [S('40,4 60,4 60,12 40,12'), S('30,12 70,12 76,22 76,80 70,88 30,88 24,80 24,22'), A('32,22 68,22 68,78 32,78'), sub('Spirit', { s: 0.3, dy: 4 })],
    // a staff across a slowed clock
    'Teferi, Time Raveler': () => [S(circle(50, 50, 36, 16)), I(circle(50, 50, 28, 16)), D('50,50 50,28; 50,50 64,58', { w: 4 }), S(limb('10,92 90,10', 6, 6))],
    // a sword striking a stone
    Vindicate: () => [S('14,68 34,58 66,58 86,68 80,92 20,92'), I('46,58 50,70 56,64 52,78'), ...sword({ s: 0.62, dy: -16 })],
    // a prism with flame and wave
    'Prismari Command': () => [S('50,10 82,72 18,72'), MARK.u({ s: 0.5, dx: -14, dy: 24 }), MARK.r({ s: 0.5, dx: 14, dy: 24 }), S(star(50, 46, 8, 3, 4))],
    // a fist slamming a card
    'Demand Answers': () => [...card({ s: 0.6, rot: 10, dy: 20 }), fist({ s: 0.5, dy: -26 })],
    // a cracked hand mirror
    'Cursed Mirror': () => [S(limb('50,64 50,94', 10, 10)), S(circle(50, 36, 30, 14)), A(circle(50, 36, 21, 14)), D('40,16 50,32 44,44 56,56', { w: 3 })],
    // a palm turning a bolt back
    'Deflecting Palm': () => [hand({ s: 0.8, dx: 12, dy: 6 }), bolt({ s: 0.5, dx: -24, dy: -8 })],
    // an airship
    'Jhoira, Weatherlight Captain': () => [S('14,26 36,14 64,14 86,26 64,38 36,38'), L('34,38 34,52; 66,38 66,52', { w: 3 }), S('8,52 92,52 80,70 20,70'), S('6,60 18,52 18,70'), S2('68,58 90,56 84,64')],
    // a dinosaur with gaping jaws
    'Ghalta, Primal Hunger': () => [sub('Dinosaur', { s: 0.9, dy: 2 }), D('8,90 18,80; 28,94 34,84', { w: 3.5 })],
    // spirit dragons coiling
    'Call the Spirit Dragons': () => [S(limb('14,86 30,60 20,34 40,14 60,20', 13, 7)), S(limb('86,86 70,60 80,34 60,14 40,20', 13, 7)), S('58,14 72,10 70,22'), S('42,14 28,10 30,22'), S(star(50, 52, 10, 4, 5))],
    // five dragon heads on long necks
    Tiamat: () => [...[-56, -28, 0, 28, 56].map(a => [S(xf(limb('50,94 50,34', 12, 10), { rot: a, cx: 50, cy: 94 })), S(xf('40,24 50,12 60,24 58,38 42,38', { rot: a, cx: 50, cy: 94 }))])],
    // a goblin with a soul in a jar
    'Warren Soultrader': () => [sub('Goblin', { s: 0.8, dx: -8, dy: 2 }), S('70,62 86,62 88,92 68,92'), A('72,68 84,68 84,86 72,86')],
    // an undead holding a reliquary
    'Wight of the Reliquary': () => [skull({ s: 0.7, dx: -10, dy: -6 }), S('66,56 88,56 90,92 64,92'), I('70,62 84,62 84,72 70,72')],
    // a world tree in a ring
    'Esika, God of the Tree': () => [ringS(50, 50, 38, 45, 16), ...tree({ s: 0.76 })],
    // coins overflowing beneath an eye
    'Villainous Wealth': () => [...coin(30, 74, 14), ...coin(50, 80, 14), ...coin(70, 74, 14), ...coin(40, 58, 12), ...coin(60, 58, 12), ...eyeBig({ s: 0.5, dy: -26 })],
    // an angel with a great sword
    'Gisela, Blade of Goldnight': () => [wings(44, 44), S(circle(50, 34, 9, 8)), M('50,44 60,48 64,90 50,90'), ...sword({ rot: 30, s: 0.7, dx: 16, dy: -6 })],
    // a mechanical dragon head
    'Ramos, Dragon Engine': () => [sub('Dragon', { s: 0.86, dy: 8 }), gear(50, 12, 10, 6, 3, 0.36)],
    // a herald's horn with a banner
    "Herald's Horn": () => [S('8,74 20,62 40,54 62,40 80,22 92,8 94,30 84,52 64,70 40,80 18,82'), D('40,56 46,78; 62,42 68,66', { w: 3 }), S(limb('20,62 34,40', 4, 4)), S('34,40 52,46 36,52')],
    // a vault door
    'Mana Vault': () => [S('10,10 90,10 90,90 10,90'), S(circle(50, 50, 28, 14)), I(circle(50, 50, 20, 14)), D('50,32 50,68; 32,50 68,50', { w: 4 }), S(circle(50, 50, 6, 8))],
    // an ape's ghost
    'Simian Spirit Guide': () => [sub('Spirit', { s: 0.9, dy: 4 }), roundE()],
    // a two-pronged spear
    'Bident of Thassa': () => [S(rect(46, 30, 8, 64)), S('30,6 36,6 38,30 62,30 64,6 70,6 70,40 30,40'), wave(82, 4)],
    // a foot stamping a stump
    'Stump Stomp': () => [S('20,72 80,72 76,92 24,92'), S('34,8 66,8 70,46 84,54 86,66 30,66 30,46')],
    // a gem in a chrome setting
    'Chrome Mox': () => [S(ngon(50, 50, 40, 8, 22.5)), I(ngon(50, 50, 30, 8, 22.5)), S('50,26 70,50 50,74 30,50'), D('30,50 70,50', { w: 2.5 })],
    // a moon dotted with a thousand marks
    'Anim Pakal, Thousandth Moon': () => [S(circle(50, 50, 40, 16)), ...[[36, 34], [58, 28], [66, 52], [44, 60], [54, 72], [30, 52]].map(([x, y]) => I(circle(x, y, 3.6, 6)))],
    // a pick over sand
    'Ramunap Excavator': () => [S('6,70 30,58 50,62 72,54 94,64 94,92 6,92'), S(limb('28,64 70,16', 7, 7)), S('50,12 66,8 88,18 70,22 58,22')],
    // candles in a ritual circle
    'Cabal Ritual': () => [S(xf(circle(50, 70, 42, 16), { sy: 0.4, cy: 70 })), ...[[22, 58], [50, 50], [78, 58]].map(([x, y]) => [S(rect(x - 4, y - 22, 8, 22)), flame(x, y - 22, 12, 0.2)])],
    // an oracle's eye over the waves
    "Thassa's Oracle": () => [...eyeBig({ s: 0.8, dy: -12 }), wave(74, 6)],
    // a red burst
    'Red Elemental Blast': () => [burst({}, 12, 0.5), S(circle(50, 50, 14, 10)), I(circle(50, 50, 6, 6))],
  },
};

function roundE() { return S2(circle(78, 40, 8, 8)); }
