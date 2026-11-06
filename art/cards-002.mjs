// Per-card glyphs, batch 2: EDHREC ranks 49 to 144.
import { X, S, M, D, I, K, L, A, S2, limb, eyes, eye, circle, ngon, star, xf, rect, ringS, arc } from './_parts.mjs';
import { flame, wave, peak, gear, sword, shield, wings, spear, axe } from './_motifs.mjs';
import { talisman, signet, hand, sprout, MARK, card, fan, book, tome, skull, coin, bolt, key, crown, burst, drop, heart, moon, sun, potion, scroll, fist, tree, tornado, mask, arrow, hourglass, chain, vortex, tentacle, eyeBig, cauldron, banner, anvil, lotus, no, sub } from './_cards.mjs';

const loop = p => p.concat([p[0]]);

export default {
  cards: {
    // a swan
    'Swan Song': () => [S('20,80 30,64 50,58 70,62 86,56 92,64 80,80 50,88'), S(limb('64,62 60,40 50,26 54,14 66,12 70,20', 9, 7)), S('70,14 84,20 70,24'), eye(62, 18, 2), D('38,70 62,72', { w: 3 })],
    // a sentinel's helm with a watchful eye
    'Esper Sentinel': () => [sub('Knight'), S(star(84, 16, 10, 3.5, 4))],
    // a card crowned with demon horns
    'Demonic Tutor': () => [S2('60,22 70,6 80,8 72,14 68,26'), ...card({ s: 0.85, dy: 6 }), I(star(50, 56, 9, 4, 5))],
    // a cloud raining poison
    'Toxic Deluge': () => [S('16,48 10,38 16,28 28,26 32,16 46,10 60,14 68,22 80,22 90,32 88,46 78,52 26,52'), drop({ s: 0.22, dx: -22, dy: 18 }), drop({ s: 0.22, dx: 0, dy: 28 }), drop({ s: 0.22, dx: 22, dy: 18 }), drop({ s: 0.18, dx: -10, dy: 34 }), drop({ s: 0.18, dx: 12, dy: 36 })],
    // a brain struck by lightning
    Brainstorm: () => [sub('Brainiac', { s: 0.8, dy: 10 }), bolt({ s: 0.3, dx: 22, dy: -30 })],
    // a hand batting an arrow aside
    'Deflecting Swat': () => X([hand({ rot: -30, s: 0.8, dx: -8, dy: 6 }), ...arrow({ rot: 70, s: 0.7, dx: 18, dy: -18 })], { s: 0.84, dx: -4, dy: -4 }),
    // a toppling column
    'Ruinous Ultimatum': () => [S('14,84 40,84 40,90 14,90'), S('18,52 36,52 36,84 18,84'), S(xf('40,14 58,14 58,62 40,62', { rot: 30, cx: 50, cy: 62 })), S('50,72 66,64 74,74 60,82'), S('74,84 90,80 92,90 74,92'), S('6,92 94,92 94,96 6,96')],
    // a claw bursting up out of the earth
    "Garruk's Uprising": () => [S('6,80 94,80 94,92 6,92'), S('28,82 30,56 40,40 50,36 60,40 70,56 72,82'), S('34,46 26,16 40,40'), S('46,38 46,8 54,36'), S('58,40 70,14 66,46')],
    'Boros Signet': () => signet('r', 'w'),
    // a shield scored by claws
    'Fierce Guardianship': () => [shield({}), D('34,30 44,66; 46,26 54,70; 58,28 64,64', { w: 4 })],
    // an urn holding a swirl of thought
    'Thought Vessel': () => [S('36,8 64,8 60,18 72,32 76,56 70,76 58,88 42,88 30,76 24,56 28,32 40,18'), I(circle(50, 52, 12, 10)), D(arc(50, 52, 6, 30, 300, 6), { w: 2.5 })],
    // an elf holding up a glowing leaf
    'Elvish Mystic': () => [sub('Elf', { s: 0.86, dx: -6, dy: 7 }), MARK.g({ s: 0.5, dx: 30, dy: -32 })],
    // a crown with a peacock feather
    'Noble Hierarch': () => [crown({ dy: 14 }), S(limb('58,40 70,24 78,14', 4, 4)), S(circle(78, 14, 8, 8)), I(circle(78, 14, 3, 6))],
    // a swarm of beetles
    'Feed the Swarm': () => [heart({ s: 0.9 }), ...[[30, 34], [66, 30], [58, 62], [36, 64]].map(([x, y]) => [S(ngon(x, y, 6, 6)), I(ngon(x, y, 2, 4))])],
    // a fan of cards flung about
    'Frantic Search': () => X([...fan({ s: 0.78, dy: 4 }), D('10,18 22,26; 90,18 78,26; 50,4 50,12', { w: 3 })], { s: 0.86, dy: -5 }),
    // a figure fading behind a shimmering dome
    "Teferi's Protection": () => [S('8,88 10,60 20,38 36,22 50,18 64,22 80,38 90,60 92,88', { holes: ['20,88 22,62 30,46 42,34 50,32 58,34 70,46 78,62 80,88'] }), S(circle(50, 52, 8, 8)), M('50,62 58,64 64,88 50,88'), S('6,88 94,88 94,94 6,94')],
    // a wilting, rotting flower
    Putrefy: () => [S(limb('50,92 50,58 62,40 72,36', 5, 4)), S('64,36 76,28 88,36 84,50 70,50'), S('50,72 32,64 24,70 36,80'), I(circle(78, 42, 3, 6)), drop({ s: 0.14, dx: 30, dy: 16 })],
    // cards spilling from a sack
    'Faithless Looting': () => X([S('34,30 66,30 60,40 76,54 80,72 72,88 28,88 20,72 24,54 40,40'), D('32,34 68,34', { w: 4 }), ...card({ s: 0.4, rot: -30, dx: 26, dy: -30 }), ...card({ s: 0.4, rot: 20, dx: 30, dy: -8 })], { s: 0.9, dx: -4, dy: 3 }),
    // a remora fish
    'Mystic Remora': () => [S('70,50 90,36 92,50 90,64'), S('6,50 18,40 40,36 62,38 74,50 62,62 40,64 18,60'), D('24,40 30,38 36,40 42,38 48,40 54,38 60,40', { w: 2.5 }), eye(16, 48, 2.6), S('30,62 40,62 36,74')],
    // a snake under cherry blossom
    'Sakura-Tribe Elder': () => [sub('Snake', { s: 0.86, dx: -4, dy: 6 }), S(star(78, 18, 10, 5, 5)), I(circle(78, 18, 3, 6)), S(star(60, 10, 6, 3, 5))],
    // a hammer smashing a gear
    Vandalblast: () => [gear(40, 64, 28, 8, 7, 0.3), S(limb('92,8 56,46', 7, 7)), S(xf('44,26 74,26 74,46 44,46', { rot: 45, cx: 59, cy: 36 })), D('12,30 22,38; 20,18 28,30', { w: 3 })],
    // an eye within a returning arrow
    'Eternal Witness': () => [S(limb(arc(50, 50, 38, 40, 330, 12), 10, 10)), S('70,8 92,14 82,30'), ...eyeBig({ s: 0.5 })],
    // flame rising from an open palm
    "Jeska's Will": () => X([hand({ s: 0.8, dy: 10, cy: 90 }), flame(50, 46, 44, 0.7), I(star(50, 72, 6, 2.5, 5))], { s: 0.86, dy: -2 }),
    // an arena with a dripping drop
    'Phyrexian Arena': () => [S('6,40 50,30 94,40 94,84 50,92 6,84'), I('20,48 50,42 80,48 80,76 50,82 20,76'), D('20,60 80,60', { w: 2.5 }), drop({ s: 0.3, dy: -32 })],
    // an arrow climbing a peak
    'Temur Ascendancy': () => [S('6,90 30,50 42,62 58,34 94,90'), S('68,52 80,30 92,52 84,50 84,74 76,74 76,50')],
    // a grinning skull and a dagger
    'Deadly Rollick': () => [skull({ s: 0.8, dx: -6, dy: 6 }), S('74,6 82,8 80,52 76,60 72,52'), S('64,52 88,52 88,58 64,58'), S(rect(73, 58, 6, 14))],
    // a tear in space
    'Void Rend': () => [S('46,4 58,22 50,32 64,46 52,58 62,76 50,96 38,74 46,60 34,44 46,32 36,18'), D('20,20 30,26; 80,30 70,34; 18,70 30,66; 82,72 70,70', { w: 3 })],
    'Rakdos Charm': () => [S('50,10 74,22 84,48 74,78 50,90 26,78 16,48 26,22'), I('50,22 66,30 74,50 66,72 50,80 34,72 26,50 34,30'), ...[MARK.b({ s: 0.5, dx: -12 }), MARK.r({ s: 0.5, dx: 12 })]],
    // a speaking trumpet and its sound
    Propaganda: () => [S('14,40 34,40 70,20 70,80 34,60 14,60'), D('80,34 88,30; 82,50 92,50; 80,66 88,70', { w: 4 })],
    // a broken halo
    Damn: () => [S(xf(circle(50, 50, 40, 16), { sy: 0.45 }), { holes: [xf(circle(50, 50, 28, 14), { sy: 0.3 })] }), I('42,26 50,40 46,52 54,64 50,76 58,50 54,40 60,26')],
    // an oil lamp of insight
    'Enlightened Tutor': () => [S('16,62 34,54 66,54 80,60 94,52 88,66 72,78 50,82 28,78'), S('40,82 60,82 62,90 38,90'), flame(36, 50, 30, 0.45), S(star(74, 22, 10, 3.5, 4))],
    // a whirlpool draining away
    'Mana Drain': () => [...vortex({}), S(circle(50, 50, 10, 8)), K(circle(50, 50, 4, 6))],
    // a cat warrior with a spear
    'Kutzil, Malamet Exemplar': () => [...spear({ dx: 30, s: 0.9 }), sub('Cat', { s: 0.86, dx: -6, dy: 4 })],
    // a card with fangs and a drop of blood
    'Vampiric Tutor': () => [...card({ s: 0.85, dy: -4 }), S2('54,30 58,30 56,42'), drop({ s: 0.2, dy: 22 })],
    // five marks joined in a ring
    'Leyline of the Guildpact': () => [S(circle(50, 50, 42, 16), { holes: [circle(50, 50, 32, 14)] }), ...['w', 'u', 'b', 'r', 'g'].map((c, i) => MARK[c]({ s: 0.32, dx: 28 * Math.sin((i * 72 * Math.PI) / 180), dy: -28 * Math.cos((i * 72 * Math.PI) / 180) })), I(circle(50, 50, 7, 8))],
    // a smooth stone with a spiral
    'Mind Stone': () => [S('18,40 30,20 50,12 72,16 86,34 88,58 78,78 56,88 32,84 16,66'), D('50,50 56,46 60,52 54,60 44,58 40,48 46,38 60,36 68,46 66,60', { w: 3.5 })],
    // a spark snuffed out
    Despark: () => [S(star(50, 50, 40, 14, 4)), ...no()],
    // a coin bag tied with a chain
    'Black Market Connections': () => [S('34,24 66,24 60,34 76,50 80,70 72,88 28,88 20,70 24,50 40,34'), ...chain([[30, 26], [42, 24], [58, 24], [70, 26]], 6), I(circle(50, 64, 9, 8))],
    // a cracked sheriff's star
    'Lotho, Corrupt Shirriff': () => [S(star(50, 50, 42, 22, 6)), I(circle(50, 50, 10, 8)), D('38,12 46,30 40,40 50,52', { w: 3 })],
    // a dagger over an altar
    Victimize: () => [S('12,66 88,66 82,92 18,92'), S('46,4 54,4 56,46 50,58 44,46'), S('34,46 66,46 66,52 34,52'), S(rect(46, 52, 8, 10))],
    // a broad-brimmed hat
    'Annie Joins Up': () => [S('6,62 20,56 30,30 42,22 50,30 58,22 70,30 80,56 94,62 80,72 20,72'), D('26,56 74,56', { w: 4 }), S(star(50, 46, 6, 2.5, 5))],
    // two daggers crossed over a coin
    'Deadly Dispute': () => [...coin(50, 70, 18), S(xf('46,6 54,6 56,56 50,64 44,56', { rot: -35 })), S(xf('46,6 54,6 56,56 50,64 44,56', { rot: 35 }))],
    // an owl's face
    'Baleful Strix': () => [S2('58,24 70,8 74,26'), M('50,20 64,22 78,32 82,50 76,68 62,80 50,84'), I(circle(64, 46, 9, 10), { m: 1 }), S('44,56 56,56 50,70'), D('36,20 50,34 64,20', { w: 3 })],
    // a halfling with a flower
    'Delighted Halfling': () => [sub('Halfling', { s: 0.88, dx: -4, dy: 6 }), S(limb('84,92 84,60', 3, 3)), S(star(84, 56, 9, 4, 5)), I(circle(84, 56, 3, 6))],
    // an old tree with sparks
    'Faeburrow Elder': () => [sub('Treefolk', { s: 0.86, dy: 6 }), S(star(16, 14, 8, 3, 4)), S(star(86, 12, 8, 3, 4))],
    // a star of all five marks
    'Morophon, the Boundless': () => [S(star(50, 52, 44, 20, 5)), ...['w', 'u', 'b', 'r', 'g'].map((c, i) => MARK[c]({ s: 0.24, dx: 26 * Math.sin((i * 72 * Math.PI) / 180), dy: 2 - 26 * Math.cos((i * 72 * Math.PI) / 180) }))],
    // a hooded pilgrim with a candle
    "Avacyn's Pilgrim": () => [M('50,10 62,14 72,28 76,50 84,92 50,92'), I('40,26 60,26 60,50 50,56 40,50'), S(rect(66, 50, 8, 18)), flame(70, 48, 16, 0.26)],
    // a sack, gold bars and coins
    'Big Score': () => [S('8,90 14,72 44,72 50,90'), S('50,90 56,72 86,72 92,90'), S('28,70 34,52 66,52 72,70'), ...coin(38, 32, 12), ...coin(64, 26, 12)],
    'Talisman of Resilience': () => talisman('b', 'g'),
    // a ghost behind bars
    'Ghostly Prison': () => [sub('Spirit', { s: 0.8 }), S('8,8 92,8 92,16 8,16'), S('8,84 92,84 92,92 8,92'), ...[16, 34, 66, 84].map(x => S(rect(x - 3, 16, 6, 68)))],
    'Talisman of Curiosity': () => talisman('g', 'u'),
    // an eye over a single card
    Ponder: () => [...card({ s: 0.7, dy: 14 }), ...eyeBig({ s: 0.5, dy: -30 })],
    // a grinding wheel throwing sparks
    Abrade: () => [S(circle(40, 56, 30, 14), { holes: [circle(40, 56, 7, 8)] }), D('70,40 88,30; 72,52 92,50; 68,64 86,72', { w: 4 }), S('10,86 70,86 70,92 10,92')],
    // a gavel before a sunburst
    'Supreme Verdict': () => [burst({}, 16, 0.72), S(limb('46,52 84,90', 8, 8)), S(xf('20,24 60,24 60,52 20,52', { rot: 45, cx: 40, cy: 38 })), S(xf('14,20 26,20 26,56 14,56', { rot: 45, cx: 40, cy: 38 })), S(xf('54,20 66,20 66,56 54,56', { rot: 45, cx: 40, cy: 38 }))],
    // an ape with a swirl of magic
    Pongify: () => [sub('Ape', { s: 0.86, dy: 6 }), S(star(84, 14, 10, 3.5, 4))],
    // kelp over the waves
    'Tatyova, Benthic Druid': () => [S(limb('40,80 34,56 44,36 38,14', 8, 5)), S(limb('60,80 66,58 58,40 64,22', 8, 5)), S('38,14 30,6 44,6'), S('64,22 74,12 70,26'), wave(76, 6)],
    // a brush dripping red
    'Blood Artist': () => [S(limb('84,8 46,52', 7, 7)), S('48,46 56,54 46,70 34,76 30,68 38,56'), drop({ s: 0.24, dx: -20, dy: 34 })],
    // a clamp gripping a skull
    Skullclamp: () => [skull({ s: 0.62, dy: 14 }), S('12,12 88,12 88,22 76,22 76,40 68,40 68,22 32,22 32,40 24,40 24,22 12,22'), S(rect(46, 4, 8, 8))],
    // a shield with arcs of motion
    'Flawless Maneuver': () => [shield({ s: 0.8 }), D(arc(50, 50, 44, 200, 250, 6), { w: 4 }), D(arc(50, 50, 44, 110, 160, 6), { w: 4 }), D(arc(50, 50, 44, 290, 340, 6), { w: 4 })],
    // a lotus with clock hands
    'Timeless Lotus': () => [...lotus({}), D('50,46 50,32; 50,46 60,52', { w: 3 })],
    // a globe and a card
    'Worldly Tutor': () => [S(circle(42, 46, 34, 14)), D('8,46 76,46; 42,12 42,80', { w: 2.5 }), D(arc(42, 46, 16, 0, 360, 12, 34), { w: 2.5 }), ...card({ s: 0.5, rot: 15, dx: 26, dy: 22 })],
    'Lightning Bolt': () => [bolt({})],
    // cards carried on the wind
    Windfall: () => [S(limb('6,30 50,30 60,22 56,14', 6, 5)), S(limb('6,56 70,56 82,48 78,38', 6, 5)), ...card({ s: 0.42, rot: -20, dx: 22, dy: 20 }), ...card({ s: 0.4, rot: 25, dx: -22, dy: 24 }), ...card({ s: 0.4, rot: 5, dx: 28, dy: -26 })],
    // a solemn metal face
    'Solemn Simulacrum': () => [shoulder(), M('50,12 64,14 74,24 76,44 72,62 62,74 50,78'), I('38,40 46,42 46,48 38,46'), I('62,40 54,42 54,48 62,46'), D('42,64 58,64', { w: 3 }), D('50,14 50,32', { w: 3 })],
    // a sceptre with four points
    'Austere Command': () => [S(rect(46, 30, 8, 64)), S(star(50, 26, 22, 8, 4)), I(circle(50, 26, 4, 6)), S('34,86 66,86 66,94 34,94')],
    // a pitchfork in flame
    Bedevil: () => [flame(50, 92, 50, 1.1), S(rect(46, 30, 8, 64)), S('28,30 72,30 72,36 28,36'), S('28,6 34,6 34,30 28,30'), S('46,4 54,4 54,30 46,30'), S('66,6 72,6 72,30 66,30')],
    // a wolf howling at a crescent
    'Return of the Wildspeaker': () => [moon({ s: 0.4, dx: 26, dy: -26 }), sub('Wolf', { s: 0.86, dx: -6, dy: 6 })],
    // a goblin with a spark
    'Goblin Anarchomancer': () => [sub('Goblin', { s: 0.86, dy: 6 }), S(star(16, 14, 10, 3.5, 4)), MARK.g({ s: 0.36, dx: 34, dy: -34 })],
    // a crystal ball holding a card
    'Mystical Tutor': () => [S('34,72 66,72 74,90 26,90'), S(circle(50, 44, 30, 14)), ...card({ s: 0.4, dy: -6 })],
    // a waving hand
    Farewell: () => [hand({ rot: 15, s: 0.9, dy: 4 }), D(arc(50, 50, 46, 300, 330, 4), { w: 4 }), D(arc(50, 50, 46, 30, 60, 4), { w: 4 })],
    // something sinking into a whirlpool
    'Sink into Stupor': () => [S('8,60 92,60 92,70 8,70'), D('16,78 40,78; 54,78 84,78; 26,88 74,88', { w: 4 }), S('40,12 60,12 62,38 58,56 42,56 38,38'), I(circle(50, 30, 4, 6))],
    // two sprouts, doubled
    'Doubling Season': () => [S(circle(30, 54, 24, 12)), S(circle(70, 54, 24, 12)), MARK.g({ s: 0.6, dx: -20, dy: 4 }), MARK.g({ s: 0.6, dx: 20, dy: 4 })],
    // a shield of overlapping scales
    'Hardened Scales': () => [shield({}), ...[[38, 32], [62, 32], [50, 46], [38, 60], [62, 60], [50, 74]].map(([x, y]) => I(ngon(x, y, 7, 4)))],
    'Talisman of Impulse': () => talisman('r', 'g'),
    // a sickle and cut stalks
    'Culling Ritual': () => [S('20,30 34,14 54,8 74,12 88,24 92,40 80,30 64,24 46,24 32,32 26,40'), S(limb('30,36 70,92', 10, 10)), S(xf(rect(10, 70, 9, 24))), S(xf(rect(82, 64, 9, 30)))],
    // a pack with a coin and a leaf
    'Tireless Provisioner': () => [S('22,22 78,22 84,32 84,88 16,88 16,32'), S('30,10 70,10 72,22 28,22'), D('16,48 84,48', { w: 3 }), ...coin(36, 68, 9), MARK.g({ s: 0.36, dx: 14, dy: 18 })],
    // a sword on angel wings
    "Akroma's Will": () => [wings(44, 44), ...sword({ s: 0.95 })],
    // a wave of bones and a gravestone
    'Muldrotha, the Gravetide': () => [S('34,72 34,40 42,26 54,22 66,26 74,40 74,72'), D('44,40 64,40; 44,50 64,50; 44,60 58,60', { w: 3 }), wave(74, 8)],
    // a crescent and whispered lines
    "Night's Whisper": () => [moon({ s: 0.9, dx: 14 }), S(limb('66,32 88,28', 6, 6)), S(limb('70,50 92,50', 6, 6)), S(limb('66,68 88,72', 6, 6))],
    // a figure dissolving into light
    Mortify: () => [S(star(50, 50, 44, 30, 12)), M('50,22 58,24 62,34 58,44 50,46'), M('50,46 62,48 68,70 60,76 58,90 50,90'), D('64,58 72,62; 66,70 76,72', { w: 3 })],
    // three spirits rising from a portal
    'Eerie Ultimatum': () => [S(xf(circle(50, 82, 40, 14), { sy: 0.24, cy: 82 })), sub('Spirit', { s: 0.36, dx: -26, dy: -6 }), sub('Spirit', { s: 0.42, dy: -18 }), sub('Spirit', { s: 0.36, dx: 26, dy: -6 })],
    // a skull on a staff
    'Deathrite Shaman': () => [S(rect(46, 44, 8, 50)), skull({ s: 0.5, dy: -18 }), S('30,40 70,40 66,48 34,48')],
    // a clock at twelve
    'Stroke of Midnight': () => [S(circle(50, 52, 40, 16), { holes: [circle(50, 52, 32, 16)] }), S(rect(47, 22, 6, 32)), S('50,50 56,54 50,58 44,54'), D('50,14 50,20; 88,52 82,52; 50,90 50,84; 12,52 18,52', { w: 3.5 })],
    // a devil wreathed in fire
    'Mayhem Devil': () => [flame(50, 92, 84, 1.1), sub('Devil', { s: 0.7, dy: 10 })],
    // a sphere in a ring of marks
    "Commander's Sphere": () => [S(circle(50, 50, 30, 14)), ringS(50, 50, 36, 43, 16), ...['w', 'u', 'b', 'r', 'g'].map((c, i) => MARK[c]({ s: 0.2, dx: 14 * Math.sin((i * 72 * Math.PI) / 180), dy: -14 * Math.cos((i * 72 * Math.PI) / 180) }))],
    // an ear and a paw print
    'Beast Whisperer': () => [S('30,90 30,62 22,40 26,20 40,8 56,8 68,18 72,34 64,46 56,58 52,74 44,90'), D('38,24 52,20 58,30 50,40', { w: 3.5 }), S(circle(78, 74, 9, 8)), S(circle(66, 60, 4, 6)), S(circle(78, 56, 4, 6)), S(circle(90, 60, 4, 6))],
    // a curled hunting horn
    'Fyndhorn Elves': () => [S('12,40 22,30 46,30 70,44 90,26 92,46 80,66 60,70 36,58 16,56'), D('46,30 42,58; 60,38 58,68', { w: 3 }), L('22,30 30,16 70,16 80,30', { w: 3 })],
    // a vine spiralling round a stone
    'Wild Growth': () => [S('22,74 30,52 50,44 70,52 78,74 70,90 30,90'), S(limb('16,60 30,40 52,30 72,36 82,50 74,62 60,58', 6, 4)), S('60,58 70,64 64,70'), S('30,40 22,30 36,30'), S('72,36 80,24 86,34')],
    // a sprout ringed by a circling arrow
    'Crop Rotation': () => [S(limb(arc(50, 52, 38, 30, 320, 12), 8, 8)), S('62,6 82,16 66,26'), ...sprout({ s: 0.6, dy: 18 })],
    // a whirlwind of cards
    'Whirlwind of Thought': () => [...tornado({ s: 0.9 }), ...card({ s: 0.3, rot: -30, dx: -34, dy: 0 }), ...card({ s: 0.3, rot: 30, dx: 34, dy: 18 })],
    // standing stones around a tree
    'The Great Henge': () => [S('8,30 30,30 30,86 8,86'), S('70,30 92,30 92,86 70,86'), S('4,18 96,18 96,30 4,30'), ...tree({ s: 0.5, dy: 24 })],
    // an anvil throwing sparks
    'Storm-Kiln Artist': () => [anvil({ dy: 8 }), D('50,30 44,12; 60,30 70,10; 40,32 26,20', { w: 3.5 }), S(star(50, 22, 7, 2.5, 4))],
    // a fist in a burst
    'Force of Will': () => [burst({}, 14, 0.7), fist({ s: 0.7 })],
    'Simic Signet': () => signet('g', 'u'),
    // a cracked ground shaking
    'Impact Tremors': () => [S('6,62 94,62 94,92 6,92'), I('40,62 46,72 40,80 50,92 58,92 52,80 58,70 52,62'), D('14,40 22,50; 30,30 34,44; 70,30 66,44; 86,40 78,50', { w: 4 })],
    // a vial holding a lizard's tail
    'Rapid Hybridization': () => [...potion({}), S(limb('40,70 52,64 58,72 66,66', 5, 3))],
  },
};

function shoulder() { return M('50,74 62,76 78,82 88,92 50,92'); }
