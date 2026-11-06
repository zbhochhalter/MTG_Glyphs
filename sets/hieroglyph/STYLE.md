# Hieroglyph: sign grammar and style

Hieroglyph is a pictographic writing system for Magic cards. Every glyph is a **sign**, built by fixed rules from a small vocabulary, so a reader who learns the rules can read any card at a glance. It covers the same keys as the Sketchbook set and follows the same file contract (see the repository README).

The code that enforces these rules is `tools/lib/hierokit.mjs`. The vocabulary lives in `sets/hieroglyph/art/_grammar.mjs` and the signs in `sets/hieroglyph/art/*.mjs`.

## Anatomy of a sign

A sign has up to four parts, always in the same places:

| part | how many | where | colour |
| --- | --- | --- | --- |
| pictogram | exactly one | centred, in the box x 26–74, y 30–84 | ink outline; accent fills its mass |
| radical | up to two | first above (centre 50, 15), second to the right (centre 85, 52) | ink |
| determinative | one | lower-left corner (centre 14, 86) | ink |
| cartouche | named things only | rounded rectangle x 22–78, y 28–90; the pictogram shrinks to 80% inside it | ink |

Nothing else goes in a sign. No sign takes more than two radicals.

## Pictograms

- **One sign per concept, drawn the same way every time.** When a card is about an Elk, its sign uses the Elk pictogram as it is.
- **Creatures** face left in strict profile.
  - Animals are drawn whole: body, legs, head.
  - People are drawn as a standing figure (`figure()` in `_pics.mjs`).
  - Peoples defined by the head (Elf, Goblin, Orc and similar) are drawn as a head-and-shoulders bust. The bust's shoulders keep the head reading as a person, not a bird.
- **Objects** are shown from their most recognisable side: a sword point up, a chest side-on, a cart in profile.
- **Places** stand on a ground line at y 84 with a landmark on it. Water is two wave lines instead of a ground line.
- **Mass:** the main body is an accent-filled shape. Normally only the part right of x = 50 is filled (`body(..., 'right')`), so the sign reads dark-left, coloured-right. A small shape that carries the meaning on its own, such as a wing, a flag or a blade, may be filled whole (`'full'`).
- **Budget:** a creature takes no more than about 12 strokes and shapes.

## Radicals

Radicals are small, fixed marks that add meaning. They're always ink, so they read in greyscale and on every card colour. Each one is drawn in a 16-unit box.

| # | key | meaning |
| --- | --- | --- |
| R1 | flame | red; fire, damage |
| R2 | wave | blue; water, the mind |
| R3 | leaf | green; growth, nature |
| R4 | sun | white; light, order |
| R5 | crescent | black; night, death |
| R6 | gear | artifact; colourless, machines (a hex nut) |
| R7 | eye | look at, scry, reveal |
| R8 | hand | draw, return to hand |
| R9 | cross | counter, negate |
| R10 | shield | protection, prevent |
| R11 | wing | flying, evasion |
| R12 | jag | damage, lightning |
| R13 | down | destroy, sacrifice |
| R14 | plus | +1/+1 and other counters, grow |
| R15 | loop | untap, again |
| R16 | crown | legendary, rule |
| R17 | heart | life, gain life |
| R18 | key | search, tutor |
| R19 | card | a card |
| R20 | gem | mana, Treasure |
| R21 | spiral | exile, banish |

**Which radicals a sign takes:**

- **Subtype signs** take radicals only for what the thing does. A Treasure makes mana, so it gets *gem*. Basic land types get their colour radical (Island gets *wave*). Creature types get none, because a creature type has no fixed colour.
- **Card signs** take the radicals of their main effect, most important first. Colour radicals are used only when the effect has none of its own.
- **Planeswalker signs** take their colour radicals (at most two).

## Determinatives

The determinative classifies a sign by card type. It always sits in the lower-left corner, so a reader learns the corner once and reads every card's type from it.

| # | key | mark |
| --- | --- | --- |
| D1 | creature | two legs (Λ) |
| D2 | instant | a quick arrow (→) |
| D3 | sorcery | a bowl (∪) |
| D4 | enchantment | a frame bracket ([) |
| D5 | artifact | a box (□) |
| D6 | land | a ground line under a hill |
| D7 | planeswalker | an arch (∩) |
| D8 | battle | a flag |
| D9 | kindred | three of a kind (|||) |
| D10 | token | a counter disc (●) |
| D11 | emblem | a diamond (◇) |

Subtype signs take the determinative of the type the subtype belongs to. Creature types use creature, land types use land, and so on. Spell types use the determinative of the card type they most often appear on: Arcane, Trap and Omen take instant; Adventure, Lesson and Chorus take sorcery. A type sign takes its own determinative.

## Cartouche

A rounded enclosure around the pictogram marks a **named thing**: a planeswalker's emblem, and the sign of a legendary card. A cartouche reads as "this specific one". Radicals and the determinative stay outside the cartouche, in their usual places.

## Strokes and space

- **Stroke weight:** one, 4.5 units, everywhere, with round caps and round joins. Geometry scales; strokes never do. Validation fails any other weight.
- **Shapes:** circles, arcs, straight lines and right angles come before detail.
- **Fills:** solid ink only where a shape needs mass, such as an eye dot, a shield radical or a flame.
- **Space:**
  - leave generous negative space;
  - nothing touches the edge of the cell, so keep paint within 6 to 94;
  - signs should feel carved and calm, never busy.
- **Legibility:**
  - each sign must read at 15 mm and in greyscale;
  - a reader with no context should name the subject in one guess;
  - any sign that two reviewers would confuse with another gets redrawn.

## Files and manifest

- Signs live in `sets/hieroglyph/glyphs/{types,subtypes,cards}/`, keyed exactly as in the Sketchbook set. Cards are keyed by Scryfall oracle id.
- Each radical, drawn alone and large, is in `glyphs/radicals/<key>.svg` for the key sheet.
- `manifest.json` has the same shape as the root manifest, with these changes:
  - every entry is an object, `{ "file", "radicals": [...], "determinative", "cartouche"? }`;
  - card entries also carry their `"name"`;
  - there are extra top-level `"set": "hieroglyph"`, `"radicals"` and `"determinatives"` maps.

## Style log

- **0.2.0 specimen:**
  - Grid fixed as above.
  - Radical slots enlarged to 17.6 units (above) and 15.2 units (right), and the determinative to 14.4 units. At smaller sizes the 4.5-unit stroke closed up their counters at 15 mm.
  - Elf and Goblin redrawn as busts: as bare heads in profile, they read as birds.
