# Style guide

Every glyph should look like it belongs on a Sketchbook card: bold, flat, low-poly shapes with thick dark outlines, ink on the left and the card's colour on the right, legible at 20 mm and in greyscale.

## How a glyph is built

Most glyphs are drawn in code with `tools/lib/glyphkit.mjs`, from sources in `art/*.mjs`. The kit handles the two-tone rules, so a source only has to describe shapes.

- **Solid shapes** (`S`, mirrored `M`, paired `S2`): the kit cuts every solid at x = 50, fills the left part ink and the right part accent, and strokes the whole outline in ink at 4 units.
- **The inverse rule.** Structure inside the ink half would vanish (ink on ink), so the kit draws it in accent:
  - where a shape's left edge lies over an earlier shape, the kit adds a 2.5-unit accent separator automatically;
  - detail lines (`D`) are accent on the left and ink on the right;
  - inverse fills (`I`) are accent on the left and ink on the right. Eyes, gems and nostrils use them.
- **Flat accent fills.** The right half has no facet lines (from 0.1.0, by request). Use a `D` detail line only where it shows something real: an eye, a mouth, a seam, armour bands, a book's spine. If a line doesn't name a feature, leave it out.
- `K` is plain ink, `A` plain accent with an ink outline, and `L` ink lines everywhere (strings, ropes, whiskers over the ground).
- `X(layers, {s, dx, dy, rot})` scales or shifts a finished drawing, which is how edge and centring problems get fixed.

## Line weights

| element | width |
| --- | --- |
| outline | 4 |
| detail lines | 3 (2 to 2.5 for teeth, whiskers, fine bands) |
| separators | 2.5 |
| minimum | 2 (the validator fails anything thinner) |
| maximum | 5 |

## Composition

- Keep paint inside about 6 to 94 on both axes. The validator warns at 4/96 and fails at 2/98.
- Centre the mass. Most glyphs are symmetric about x = 50 and drawn with `M`, so the split falls naturally.
- Fill the square: a glyph shouldn't sit in less than half of it.
- Draw the subject itself: an elk is an elk's head, an Advisor is a scroll and quill.

## Recurring motifs

- **Heads** are frontal and symmetric. `head()` and `person()` in `art/_figures.mjs` give the standard humanoid head (top y ≈ 14, chin y ≈ 72, half-width 22) on shoulders reaching y = 92. Eyes are inverse diamonds (`eyes(x, y)`) at about y = 44.
  - Humanoid peoples differ by one strong feature, added to the standard head: ears (elf, Vulcan-like), ridges (Klingon, Bajoran, Cardassian), antennae (Andorian), horns (Azra, Tiefling), hair or headgear (Human, Officer, Pirate, Samurai).
  - Animal heads are frontal with the ears drawn first, behind the head. Snouts are a second mirrored shape over the face, and noses are inverse hexagons on the seam.
- **Profiles** (horse, camel, boar, shark, whale) face left, so the head falls in the ink half and the body runs into the accent.
- **Wings** use `wings(y, span)` from `art/_motifs.mjs`: a pair of scalloped feather fans rooted at x = 54 / 46.
- **Weapons:** `sword()`, `axe()`, `spear()` and `shield()`, upright, with a transform for diagonals. Crossed weapons cross at the centre.
- **Elements:** `flame()` for fire; `wave()` for the sea, as a band along the bottom; peaks for mountains; ngons for suns and moons.
- **Buildings** are frontal and symmetric, standing on a ground bar at y ≈ 88 to 94.
- **Mana rocks:** talismans are pendants and signets are seal rings. Each carries two colour marks, deliberately different from the mana symbols: white = feather, blue = wave, black = crescent, red = bolt, green = leaf.
- **Planeswalkers** get emblems built from their colours and story (a weapon, a tool, an element, a creature they're tied to), never a face.
- **Characters from licensed universes** (Star Trek, Doctor Who, Warhammer, Marvel, Final Fantasy) are drawn as generic ideas, such as "a ridged face" or "two hearts", not copies of their franchise designs or logos.

## Originality rules

- Never trace or imitate Wizards of the Coast card art, set symbols, mana symbols, the planeswalker sigil, frames or logos.
- Never adapt game-icons.net or any other icon set.
- Avoid other trademarks too. The Fractal glyph was redrawn because a Sierpinski triangle of three read as a famous video-game emblem.
- Avoid religious symbols as decoration. The Graveborn headstone carries lines, not a cross.

## Style log

- **0.1.0:** First full set. Facet lines on the accent half were dropped after review: they added noise without naming anything. Validation balance thresholds: left half ≥ 55% ink, right half ≥ 22% accent, accent ≥ 12% of the glyph. Thin subjects (bows, rods, rotors) sit near the lower bound; thicken parts rather than lowering it further.
- Hooks and lines read as chains when drawn as `ringS` links. Single `D` circles disappear against pale grounds.
- `D` given a single polyline as an array used to draw nothing. `lines()` now accepts one polyline.
