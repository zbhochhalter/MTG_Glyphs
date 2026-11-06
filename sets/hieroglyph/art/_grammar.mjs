// The Hieroglyph grammar: radicals and type determinatives.
// Each is drawn in a 16-unit box centred on (0, 0), in ink only.
// Importing this module registers them with tools/lib/hierokit.mjs.
import { RADICALS, DETS, line, solid, dot, circle, arc, P } from '../../../tools/lib/hierokit.mjs';

const R = (key, meaning, draw) => { RADICALS[key] = { meaning, draw }; };
const Dt = (key, meaning, draw) => { DETS[key] = { meaning, draw }; };

// ---- colour radicals
R('flame', 'red; fire, damage', () => [solid('0,-8 2.5,-3 6,-5 5.5,2 2,7.5 -2,7.5 -5.5,2 -6,-5 -2.5,-3')]);
R('wave', 'blue; water, the mind', () => [line('-8,1 -4,-3.5 0,1 4,-3.5 8,1')]);
R('leaf', 'green; growth, nature', () => [solid('-6,6 -6,0 -2,-5 6,-7 5,0 0,5'), line('-7,7 -2,2')]);
R('sun', 'white; light, order', () => [line([[...circle(0, 0, 6, 16), circle(0, 0, 6, 16)[0]]]), dot(0, 0, 1.2)]);
R('crescent', 'black; night, death', () => [solid('2,-8 -4,-6 -7,0 -4,6 2,8 -2,3 -3,0 -2,-3')]);
R('gear', 'artifact; colourless, machines', () => [line([[...circle(0, 0, 6.5, 6), circle(0, 0, 6.5, 6)[0]]]), dot(0, 0, 1.4)]);
// ---- effect radicals
R('eye', 'look at, scry, reveal', () => [line('-8,0 -4,-4 4,-4 8,0 4,4 -4,4 -8,0'), dot(0, 0, 1.6)]);
R('hand', 'draw, return to hand', () => [solid('-5,1 5,1 5,8 -5,8'), line('-3,1 -3,-7; 1,1 1,-8; 5,1 5,-5; -5,4 -8,-1')]);
R('cross', 'counter, negate', () => [line('-6,-6 6,6; 6,-6 -6,6')]);
R('shield', 'protection, prevent', () => [solid('-6,-7 6,-7 6,1 0,7 -6,1')]);
R('wing', 'flying, evasion', () => [solid('-8,5 -3,-4 8,-8 6,-2 8,1 3,4 4,7')]);
R('jag', 'damage, lightning', () => [line('-6,-8 3,-2 -3,2 6,8')]);
R('down', 'destroy, sacrifice', () => [line('0,-8 0,7; -6,1 0,7 6,1')]);
R('plus', 'counters, grow', () => [line('0,-7 0,7; -7,0 7,0')]);
R('loop', 'untap, again', () => [line(arc(0, 0, 6, 40, 330, 10)), solid('6,-6 7,1 1,-2')]);
R('crown', 'legendary, rule', () => [solid('-7,6 -7,-5 -3,-1 0,-7 3,-1 7,-5 7,6')]);
R('heart', 'life, gain life', () => [solid('0,7 -7,0 -7,-4 -4,-7 0,-4 4,-7 7,-4 7,0')]);
R('key', 'search, tutor', () => [line([[...circle(-4, 0, 3.5, 10), circle(-4, 0, 3.5, 10)[0]]]), line('-0.5,0 8,0; 5,0 5,4')]);
R('card', 'a card', () => [line('-5,-7 5,-7 5,7 -5,7 -5,-7')]);
R('gem', 'mana, treasure', () => [solid('-7,-2 -3,-7 3,-7 7,-2 0,8')]);
R('spiral', 'exile, banish', () => [line('0,0 2,-1 2,2 -2,3 -4,-1 -1,-5 4,-5 7,0 5,6 -2,8')]);

// ---- type determinatives (lower-left corner)
Dt('creature', 'Creature: two legs', () => [line('-6,8 0,-7 6,8')]);
Dt('instant', 'Instant: a quick arrow', () => [line('-8,0 7,0; 1,-6 7,0 1,6')]);
Dt('sorcery', 'Sorcery: a bowl', () => [line('-7,-6 -7,1 0,7 7,1 7,-6')]);
Dt('enchantment', 'Enchantment: a frame bracket', () => [line('4,-8 -6,-8 -6,8 4,8')]);
Dt('artifact', 'Artifact: a box', () => [line('-6,-6 6,-6 6,6 -6,6 -6,-6')]);
Dt('land', 'Land: a ground line under a hill', () => [line('-8,6 8,6; -5,6 0,0 5,6')]);
Dt('planeswalker', 'Planeswalker: an arch', () => [line('-6,8 -6,-2 0,-8 6,-2 6,8')]);
Dt('battle', 'Battle: a flag', () => [line('-5,8 -5,-8'), solid('-5,-8 6,-4 -5,0')]);
Dt('kindred', 'Kindred: three of a kind', () => [line('-6,-6 -6,7; 0,-6 0,7; 6,-6 6,7')]);
Dt('token', 'Token: a counter disc', () => [solid(circle(0, 0, 6, 14))]);
Dt('emblem', 'Emblem: a diamond', () => [line('0,-8 7,0 0,8 -7,0 0,-8')]);

export { RADICALS, DETS };
