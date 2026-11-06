// Per-card glyphs, batch 6: EDHREC ranks 433 to 528.
import { X, S, M, D, I, K, L, A, S2, limb, eyes, eye, circle, ngon, star, xf, rect, ringS, arc } from './_parts.mjs';
import { flame, wave, peak, gear, sword, shield, wings, spear, axe } from './_motifs.mjs';
import { talisman, signet, hand, sprout, MARK, card, fan, book, tome, skull, coin, bolt, key, crown, burst, drop, heart, moon, sun, potion, scroll, fist, tree, tornado, mask, arrow, hourglass, chain, vortex, tentacle, eyeBig, cauldron, banner, anvil, lotus, no, sub } from './_cards.mjs';

const big = (c, s = 1.5, dx = 0, dy = 0) => MARK[c]({ s, cx: 50, cy: 50, dx, dy });
const charm = (a, b, c) => [S('50,10 74,22 84,48 74,78 50,90 26,78 16,48 26,22'), I('50,22 66,30 74,50 66,72 50,80 34,72 26,50 34,30'), ...(c ? [MARK[a]({ s: 0.36, dy: -14 }), MARK[b]({ s: 0.36, dx: -12, dy: 10 }), MARK[c]({ s: 0.36, dx: 12, dy: 10 })] : [MARK[a]({ s: 0.5, dx: -12 }), MARK[b]({ s: 0.5, dx: 12 })])];
const crystal = c => [S('50,4 70,28 72,72 50,96 28,72 30,28'), D('50,4 50,96; 30,28 70,28; 28,72 72,72', { w: 2.5 }), MARK[c]({ s: 0.5 })];
const gemSet = o => [S(xf(ngon(50, 50, 40, 8, 22.5), o)), I(xf('50,24 72,50 50,76 28,50', o))];

export default {
  autofit: true,
  cards: {
    // a skull-faced knight
    'Corpse Knight': () => [sub('Knight'), skull({ s: 0.3, dx: 30, dy: 30 })],
    // a frozen tower on a cliff
    'Frostcliff Siege': () => [peak(50, 94, 46, 90), S('38,8 46,8 46,12 54,12 54,8 62,8 62,48 38,48'), S(star(80, 24, 12, 4, 6))],
    // a skull with doubling counters
    'Corpsejack Menace': () => [sub('Insect', { s: 0.8, dy: 6 }), S(star(14, 14, 9, 3.5, 4)), S(star(86, 14, 9, 3.5, 4))],
    // a gift returned
    'Return the Favor': () => [S('14,44 86,44 86,56 14,56'), S('20,56 80,56 80,92 20,92'), S(rect(45, 44, 10, 48)), S(limb(arc(50, 40, 30, 300, 420, 8), 7, 7)), S('70,16 88,26 70,32')],
    // an idol over a void
    'Idol of Oblivion': () => [K(circle(50, 60, 34, 14)), S('34,10 66,10 72,40 64,52 36,52 28,40'), I('40,22 46,24 44,30'), I('60,22 54,24 56,30'), S('42,52 58,52 56,66 44,66')],
    // a crowd of slivers' spines
    'Sliver Legion': () => [...[20, 35, 50, 65, 80].map((x, i) => S(xf('-6,40 -4,0 0,-30 4,0 6,40', { dx: x, dy: 50 + (i % 2) * 8, cx: 0, cy: 0 })))],
    // a desecrated crown on a skull
    'Yarok, the Desecrated': () => [skull({ s: 0.8, dy: 12 }), crown({ s: 0.5, dy: -32 })],
    // a walker between realms: a doorway and footsteps
    Realmwalker: () => [S('16,92 16,30 26,16 50,8 74,16 84,30 84,92', { holes: ['28,92 28,36 50,24 72,36 72,92'] }), S(star(50, 58, 12, 4, 4))],
    // a storm of a thousand years: hourglass in a cloud
    'Thousand-Year Storm': () => [S('16,40 8,30 14,18 28,16 34,6 50,2 64,6 70,14 84,16 92,28 86,40'), ...hourglass({ s: 0.56, dy: 18 })],
    // a two-headed dragon
    'Two-Headed Hellkite': () => [sub('Dragon', { s: 0.6, dx: -20, dy: 6 }), sub('Dragon', { s: 0.6, dx: 20, dy: -6 })],
    // a turbine of power
    'Thran Dynamo': () => [gear(50, 50, 40, 12, 7, 0), S(circle(50, 50, 22, 12)), bolt({ s: 0.36 })],
    // a world being born: a planet with a sprout
    'Planar Genesis': () => [S(circle(50, 58, 32, 14)), ...sprout({ s: 0.5, dy: -30 }), D(arc(50, 58, 20, 200, 300, 6), { w: 3 })],
    // a badger cub with a mole's claws
    'Badgermole Cub': () => [sub('Badger', { s: 0.86, dy: 4 }), S2('58,84 70,86 76,94 56,94')],
    // a curious peering eye with a card
    Curiosity: () => [...eyeBig({ s: 0.9, dy: -6 }), ...card({ s: 0.3, dx: 30, dy: 34 })],
    // a world tree with an offering
    'Tribute to the World Tree': () => [...tree({}), ...coin(50, 88, 7)],
    // an amber mox
    'Mox Amber': () => [...gemSet({}), S(circle(50, 50, 8, 8))],
    // a diplomat's handshake
    'Mangara, the Diplomat': () => [S('6,54 30,44 46,50 58,44 72,46 94,56 86,66 60,64 50,70 34,66 14,66'), D('40,52 50,58 60,52', { w: 3 }), S(star(50, 22, 12, 4, 4))],
    // a patchwork banner
    'Patchwork Banner': () => [S(rect(46, 4, 8, 92)), S('54,10 92,10 84,30 92,50 54,50'), D('54,30 88,30; 72,10 72,50', { w: 2.5 })],
    // a maelstrom nexus of five
    'Maelstrom Nexus': () => [...vortex({}), S(circle(50, 50, 12, 10)), I(star(50, 50, 6, 2.5, 5))],
    // a kraul priest's mandibles
    'Mazirek, Kraul Death Priest': () => [sub('Tyranid', { s: 0.9, dy: 4 })],
    // a krasis: a fish-bird hybrid
    'Hydroid Krasis': () => [sub('Jellyfish', { s: 0.8, dy: 6 }), wings(14, 30)],
    // a queen's crown on a mountain
    'The Queen of Dale': () => [peak(50, 94, 40, 90), crown({ s: 0.6, dy: -16 })],
    // twin casters: two mirrored figures with sparks
    'Adrix and Nev, Twincasters': () => [S(limb('16,90 62,26', 10, 8)), S(limb('84,90 38,26', 10, 8)), S(star(66, 20, 16, 6, 4)), S(star(34, 20, 16, 6, 4))],
    // a druid's charm
    "Archdruid's Charm": () => [...charm('g', 'g')],
    // a clock face swept clean
    'Time Wipe': () => [S(circle(50, 50, 40, 16), { holes: [circle(50, 50, 30, 16)] }), S(limb('20,80 80,20', 8, 8)), I(circle(50, 50, 6, 6))],
    // a marionette on strings
    'Marionette Apprentice': () => [S('20,8 80,8 80,14 20,14'), L('30,14 34,40; 50,14 50,26; 70,14 66,40', { w: 2 }), S(circle(50, 32, 8, 8)), M('50,40 64,42 66,66 50,68'), S(limb('36,42 30,62', 5, 5)), S(limb('64,42 70,62', 5, 5)), S(limb('44,66 40,90', 5, 5)), S(limb('56,66 60,90', 5, 5))],
    // a spinning wheel of fortune
    'Wheel of Fortune': () => [ringS(50, 50, 30, 40, 16), D('50,10 50,90; 10,50 90,50; 22,22 78,78; 78,22 22,78', { w: 4 }), S(circle(50, 50, 10, 8)), S('44,2 56,2 50,12')],
    // a colossal figure rising from the grave
    'Colossal Grave-Reaver': () => [S('6,84 94,84 94,92 6,92'), skull({ s: 0.84, dy: -4 })],
    // two of everything: a pair of dice
    'Trouble in Pairs': () => [S('14,24 46,24 46,56 14,56'), S('54,44 86,44 86,76 54,76'), I(circle(30, 40, 4, 6)), I(circle(62, 52, 4, 6)), I(circle(78, 68, 4, 6))],
    // an analyst's magnifier over rubble
    'Aftermath Analyst': () => [S('6,80 20,66 40,72 56,62 76,70 94,80 94,92 6,92'), S(circle(44, 34, 20, 12), { holes: [circle(44, 34, 12, 10)] }), S(limb('58,48 80,70', 8, 8))],
    // kin to all: a circle of linked hands
    'Betor, Kin to All': () => [ringS(50, 50, 26, 36, 16), ...[0, 72, 144, 216, 288].map(a => S(xf(circle(50, 10, 8, 8), { rot: a })))],
    // an unwritten blank page
    'Ureni of the Unwritten': () => [S('16,10 84,10 84,90 16,90'), A('24,18 76,18 76,82 24,82'), sub('Dragon', { s: 0.5 })],
    // an ageless hourglass and a card
    "Teferi's Ageless Insight": () => [...hourglass({ s: 0.76, dx: -10 }), ...card({ s: 0.36, dx: 28, dy: 20 })],
    'Golgari Charm': () => charm('b', 'g'),
    // a soul gem in a setting
    'The Soul Stone': () => [...gemSet({}), S('50,30 64,50 50,70 36,50')],
    // a greater good: a heart over cards
    'Greater Good': () => [...fan({ s: 0.7, dy: 24 }), heart({ s: 0.5, dy: -24 })],
    // a saw cutting through
    'Saw in Half': () => [S('10,40 80,40 90,50 80,60 10,60'), D('16,60 20,66 24,60 28,66 32,60 36,66 40,60 44,66 48,60 52,66 56,60 60,66 64,60 68,66 72,60 76,66', { w: 2 }), S('80,30 94,30 94,70 80,70')],
    // a ghostly flicker of two spirits
    'Ghostly Flicker': () => [sub('Spirit', { s: 0.6, dx: -18, dy: 10 }), sub('Spirit', { s: 0.6, dx: 18, dy: -10 })],
    // a mind's eye framed in a multiverse ring
    'Jace, Multiverse Architect': () => [ringS(50, 50, 34, 42, 16), ...eyeBig({ s: 0.66 })],
    // a grave pact: a skull on a scroll
    'Grave Pact': () => [...scroll({}), skull({ s: 0.4, dy: 6 })],
    // a noxious bubbling vial
    'Noxious Revival': () => [...potion({}), S(circle(40, 12, 4, 6)), S(circle(60, 6, 3, 6))],
    // a dragon on a hoard of coins
    'Smaug, Wicked Worm': () => [...coin(30, 82, 10), ...coin(50, 86, 10), ...coin(70, 82, 10), sub('Dragon', { s: 0.7, dy: -12 })],
    // a cosmic serpent coiling
    'Koma, Cosmos Serpent': () => [S(limb('14,88 28,62 50,58 70,44 64,26 44,22', 12, 10)), S('30,14 44,8 54,16 50,30 36,30'), eye(42, 18, 2.6), S(star(80, 70, 10, 4, 4)), S(star(86, 22, 7, 2.5, 4))],
    // a ship's captain's wheel
    'Sisay, Weatherlight Captain': () => [S(rect(46, 6, 8, 70)), S('54,10 86,58 54,58'), S('46,16 18,58 46,58'), S('8,64 92,64 80,84 20,84'), wave(86, 4)],
    // a laurel crown of victory
    'Iroas, God of Victory': () => [S2('54,86 38,78 24,62 18,40 20,20 28,34 32,52 42,68 56,78'), ...sword({ s: 0.6, dy: -4 })],
    // an incubating druid's egg with a leaf
    'Incubation Druid': () => [sub('Egg', { s: 0.86, dy: 6 }), MARK.g({ s: 0.4, dy: -36 })],
    // a waterlogged book
    'Waterlogged Teachings': () => [...book({ dy: -8 }), wave(76, 6)],
    // a fog bank
    Fog: () => [S('6,30 30,22 52,28 74,20 94,28 94,40 6,40'), S('10,52 36,46 60,52 84,46 92,58 6,58'), S('6,72 28,66 52,72 76,66 94,72 94,82 6,82')],
    // a mechanical bird of paradise
    'Ornithopter of Paradise': () => [sub('Thopter'), S(star(84, 80, 8, 3, 4))],
    // a teller's book with a deer
    'Chulane, Teller of Tales': () => [...book({ dy: 18 }), sub('Elk', { s: 0.46, dy: -24 })],
    // a shattered spire
    'Ozolith, the Shattered Spire': () => [S('38,92 42,30 50,6 58,30 62,92'), S('20,40 28,30 32,44'), S('72,24 82,34 74,44'), I('48,40 52,52 46,64 54,76')],
    // a trickster's cards flying from a hat
    "Tibalt's Trickery": () => [S('26,62 74,62 70,92 30,92'), S('16,58 84,58 80,66 20,66'), ...card({ s: 0.36, rot: -24, dx: -16, dy: -22 }), ...card({ s: 0.36, rot: 20, dx: 16, dy: -26 })],
    // an all-out charge: arrows in a fan
    'All-Out Assault': () => [...[-30, 0, 30].flatMap(r => arrow({ rot: r, s: 0.9, cx: 50, cy: 90 })), shield({ s: 0.44, dy: 30 })],
    // a drifting manta-like flyer
    Mulldrifter: () => [S('6,44 30,30 50,36 70,30 94,44 74,56 60,52 50,74 40,52 26,56'), eyes(56, 44, 2.4)],
    // a merfolk follower with a shell
    "Kiora's Follower": () => [sub('Merfolk', { s: 0.86, dy: 6 })],
    // a caretaker's watering can
    "Caretaker's Talent": () => [S('20,40 64,40 66,86 18,86'), S('64,50 90,28 92,36 70,62'), L('22,40 42,22 62,40', { w: 4 }), MARK.g({ s: 0.4, dx: -8, dy: 14 })],
    // a ritual of crypt-lights around a figure
    'Cryptolith Rite': () => [S('20,22 40,6 60,6 80,22 80,62 20,62'), I('34,24 66,24 66,58 34,58'), ...['w', 'u', 'b', 'r', 'g'].map((c, i) => MARK[c]({ s: 0.24, dx: -32 + i * 16, dy: 34 }))],
    // a bear's terror claws
    'Goreclaw, Terror of Qal Sisma': () => [sub('Bear', { s: 0.82, dy: -4 }), D('20,92 30,72; 40,94 46,74; 60,94 54,74; 80,92 70,72', { w: 4 })],
    // a specimen jar crackling
    'Hydroelectric Specimen': () => [S('26,10 74,10 80,20 80,86 74,92 26,92 20,86 20,20'), A('28,22 72,22 72,84 28,84'), bolt({ s: 0.4 })],
    // a poison-tipped arrow
    'Poison-Tip Archer': () => [...arrow({ rot: 45, s: 1.05 }), drop({ s: 0.22, dx: 28, dy: -14 })],
    // an armoury door opening
    'Open the Armory': () => [S('8,10 50,10 50,90 8,90'), S('50,10 92,22 92,78 50,90'), ...sword({ s: 0.5, dx: -22, dy: 0 }), I(circle(60, 52, 4, 6))],
    // a titan of nature: a giant fist of roots
    "Uro, Titan of Nature's Wrath": () => [sub('Salamander', { s: 0.9, dy: 4 }), MARK.u({ s: 0.4, dx: -30, dy: -32 }), MARK.g({ s: 0.4, dx: 30, dy: -32 })],
    // glittering sparkles
    'All That Glitters': () => [S(star(50, 50, 44, 14, 4)), S(star(18, 18, 10, 3, 4)), S(star(84, 80, 10, 3, 4)), S(star(84, 18, 8, 2.5, 4))],
    // a war of spirits: crossed blades over a torii-free gate of clouds
    'The Kami War': () => [S('6,50 30,40 50,46 70,40 94,50 70,60 50,54 30,60'), ...sword({ rot: -40, s: 0.8 }), ...sword({ rot: 40, s: 0.8 })],
    // an agent's dark glasses
    'Opposition Agent': () => [M('50,12 64,16 74,28 76,46 72,62 62,74 50,78'), S('18,38 82,38 78,52 56,52 50,46 44,52 22,52'), D('40,64 60,64', { w: 3 })],
    // a bridge under siege
    'Bridgeworks Battle': () => [S('6,52 94,52 94,62 6,62'), S(rect(16, 62, 10, 30)), S(rect(74, 62, 10, 30)), D(arc(50, 92, 30, 270, 450, 8, 24), { w: 4 }), ...sword({ s: 0.5, dy: -24 })],
    // a corrupted halo
    'Corrupted Conviction': () => [S(xf(circle(50, 30, 40, 16), { sy: 0.4, cy: 30 }), { holes: [xf(circle(50, 30, 28, 14), { sy: 0.25, cy: 30 })] }), drop({ s: 0.5, dy: 18 })],
    // a tracker's lantern and footprints
    'Tireless Tracker': () => [S('40,4 60,4 60,10 40,10'), S('30,10 70,10 76,20 76,58 70,64 30,64 24,58 24,20'), A('32,20 68,20 68,54 32,54'), ...[[28, 82], [50, 76], [72, 84]].map(([x, y]) => I(xf(circle(x, y, 5, 6), { sy: 0.7, cy: y })))],
    // a dragon over a volcanic vent
    'Savage Ventmaw': () => [S('10,92 34,62 66,62 90,92'), flame(50, 62, 20, 0.4), sub('Dragon', { s: 0.58, dy: -20 })],
    // a spinning top over cards
    "Sensei's Divining Top": () => [sub('Toy', { s: 0.86, dy: -4 }), S('20,90 80,90 80,94 20,94')],
    // a lurker's eyes in a loch
    'Emry, Lurker of the Loch': () => [wave(56, 8), A(ngon(36, 44, 6, 6)), A(ngon(64, 44, 6, 6)), K(ngon(36, 44, 2.4, 4)), K(ngon(64, 44, 2.4, 4)), S('6,74 94,74 94,90 6,90')],
    'The Wind Crystal': () => crystal('w'),
    // a hand gripping a broken branch
    'Krosan Grip': () => [fist({ s: 0.7, dy: 14 }), S(limb('6,24 44,30', 9, 7)), S(limb('56,28 94,20', 9, 7)), D('46,22 50,14; 54,22 58,14', { w: 3 })],
    // a carrion bird over bones
    'Carrion Feeder': () => [sub('Bird', { s: 0.78, dy: -6 }), S(limb('20,90 80,82', 7, 7))],
    // a figure drowning in a loch
    'Drown in the Loch': () => [wave(50, 8), S(rect(46, 64, 8, 30)), hand({ s: 0.42, dy: -16 })],
    // a flashback: a card with a curling arrow
    Flashback: () => [...card({ s: 0.7 }), S(limb(arc(50, 50, 44, 230, 330, 6), 7, 7)), S('84,20 92,8 70,12')],
    // a weaver's web of enchantment
    'Sanctum Weaver': () => [S(star(50, 50, 40, 30, 8)), D('50,10 50,90; 10,50 90,50; 22,22 78,78; 78,22 22,78', { w: 3 }), I(circle(50, 50, 8, 8))],
    // an elf with a sapling
    'Wood Elves': () => [sub('Elf', { s: 0.86, dx: -6, dy: 7 }), ...sprout({ s: 0.36, dx: 34, dy: 26 })],
    // a battering ram
    'Mardu Siegebreaker': () => [S('8,40 74,40 92,50 74,60 8,60'), S('62,34 74,28 80,40'), S('62,66 74,72 80,60'), S(circle(26, 76, 10, 10)), S(circle(58, 76, 10, 10))],
    // a haywire mite with sparks
    'Haywire Mite': () => [sub('Mite', { s: 0.86, dy: 6 }), bolt({ s: 0.24, dx: 32, dy: -32 })],
    // a knight with an orchid
    'Knight of the White Orchid': () => [sub('Knight', { s: 0.86, dx: -4, dy: 6 }), S(star(82, 18, 12, 6, 5)), I(circle(82, 18, 4, 6))],
    'Izzet Charm': () => charm('u', 'r'),
    // an archaeologist's map with a pick
    "Archaeomancer's Map": () => [S('8,16 34,22 66,14 92,20 92,86 66,80 34,88 8,82'), D('34,22 34,88; 66,14 66,80', { w: 2.5 }), D('68,26 80,38; 80,26 68,38', { w: 3.5 }), S(limb('14,70 48,40', 6, 6)), S('40,34 56,30 60,42 48,46')],
    // a sword with a land tile
    'Sword of the Animist': () => [...sword({ rot: 30 }), S('6,78 26,68 46,78 26,88')],
    'Naya Charm': () => charm('r', 'g', 'w'),
    // a champion's spear in flame
    "Samut, Hazoret's Champion": () => [flame(50, 92, 84, 1.1), ...spear({ s: 0.9 })],
    // a bitter black blossom
    Bitterblossom: () => [S(limb('50,94 50,58', 6, 5)), S(star(50, 36, 34, 14, 5)), I(circle(50, 36, 8, 8)), S2('54,74 66,68 60,80')],
    // a mentor's book with a small apprentice
    'Mentor of the Meek': () => [...book({ dy: 16 }), S(circle(50, 22, 10, 8)), M('50,32 58,34 60,48 50,50')],
    // a stitcher's needle and thread
    "Stitcher's Supplier": () => [S('24,10 76,10 82,24 82,76 76,90 24,90 18,76 18,24'), D('18,36 82,36; 18,64 82,64', { w: 3 }), S(limb('60,60 92,14', 6, 6)), S(circle(92, 14, 5, 6))],
    // a mail coat
    'Mithril Coat': () => [M('50,10 62,8 72,12 88,22 92,40 80,44 74,88 50,92'), ...[[38, 30], [62, 30], [38, 50], [62, 50], [38, 70], [62, 70]].map(([x, y]) => D(arc(x, y, 6, 90, 270, 4), { w: 2.5 }))],
    // an intangible halo over a crowd
    'Intangible Virtue': () => [S(xf(circle(50, 22, 30, 14), { sy: 0.35, cy: 22 }), { holes: [xf(circle(50, 22, 20, 12), { sy: 0.22, cy: 22 })] }), ...[[30, 60], [50, 54], [70, 60]].map(([x, y]) => [S(circle(x, y, 9, 8)), S(xf('-14,34 -10,16 0,10 10,16 14,34', { dx: x, dy: y + 6, cx: 0, cy: 0 }))])],
    // a shovel digging through an hourglass
    'Dig Through Time': () => [...hourglass({ s: 0.7, dx: -10 }), S(limb('86,8 66,64', 6, 6)), S('58,58 72,62 70,80 58,76')],
    // a copper dragon on coins
    'Ancient Copper Dragon': () => [...coin(50, 82, 12), sub('Dragon', { s: 0.72, dy: -12 })],
    'The Fire Crystal': () => crystal('r'),
    // a weaver spider spinning stars
    'Nyx Weaver': () => [sub('Spider', { s: 0.86, dy: 6 }), S(star(14, 14, 8, 3, 4)), S(star(86, 14, 8, 3, 4))],
    // an innkeeper's tankard
    "Innkeeper's Talent": () => [S('22,22 66,22 66,90 22,90'), S('66,36 82,36 86,46 82,74 66,74', { holes: ['66,44 78,44 78,66 66,66'] }), S('18,14 34,8 50,14 66,8 72,22 18,22'), D('34,32 34,80; 50,32 50,80', { w: 3 })],
  },
};
