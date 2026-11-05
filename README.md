# Sketchbook Glyphs

An open library of original, two-tone SVG glyphs for Magic: The Gathering cards. They're drawn for **Sketchbook**, a quiet, graphic playtest-proxy card style, but any project can use them.

- **11 type glyphs:** Creature, Instant, Sorcery, Enchantment, Artifact, Land, Planeswalker, Battle, Kindred, Token and Emblem.
- **535 subtype glyphs:** every entry in Scryfall's creature, artifact, enchantment, land, spell, planeswalker and battle type catalogs.
- **Per-card glyphs** for the most-played cards on EDHREC, keyed by Scryfall oracle id. The first batch covers the top 48; see [CONTRIBUTING.md](CONTRIBUTING.md) for how the work continues.

The gallery is at <https://zbhochhalter.github.io/MTG_Glyphs/> once GitHub Pages is enabled (see [Publishing](#publishing)).

## Using the glyphs

Fetch from jsDelivr at a release tag. It serves with `Access-Control-Allow-Origin: *`, so browsers can read the files directly:

```
https://cdn.jsdelivr.net/gh/zbhochhalter/MTG_Glyphs@v0.1.0/manifest.json
https://cdn.jsdelivr.net/gh/zbhochhalter/MTG_Glyphs@v0.1.0/glyphs/subtypes/elk.svg
```

Pin a tag. Don't point at a branch, because files may be redrawn between releases.

### manifest.json

```json
{
  "version": "0.1.0",
  "cards":    { "<oracle_id>": { "name": "Sol Ring", "file": "glyphs/cards/<oracle_id>.svg" } },
  "subtypes": { "elk": "glyphs/subtypes/elk.svg" },
  "types":    { "creature": "glyphs/types/creature.svg" }
}
```

Subtype and type keys are lower case, with spaces as hyphens and apostrophes and full stops dropped: `assembly-worker`, `time-lord`, `urzas`, `ctan`, `bob`.

### Fallback order

Most cards have no glyph of their own. Consumers should look up glyphs in this order and use the first one that exists:

1. **Card:** `cards[oracle_id]`. Use the card's oracle id, not a printing id, so every printing shares one glyph. For multi-faced cards, use the card-level `oracle_id`; if that's missing, use the front face's.
2. **Subtype:** take the card's subtypes in type-line order and use the first that has a glyph. For "Legendary Creature — Elf Druid" that's `elf`.
3. **Type:** take the card types in type-line order and use the first that has a glyph. For "Artifact Creature" that's `artifact`. Tokens with no better match use `token`, and emblems use `emblem`.

### The file contract

Every glyph follows this contract. CI enforces it (`tools/validate.mjs`).

- The root element is exactly `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">`, with no `width`, `height` or `fill`. Add your own size.
- **Ink** shapes use `fill="#000"` or `stroke="#000"`, or have no fill and inherit it. Replace `#000` with your ink colour.
- **Accent** shapes carry `class="accent"` and no `fill`. Add `fill="<card colour>"` beside the class. Accents are always fills, never strokes.
- The library uses no other colours, gradients, opacity, filters, masks, clip paths, images, text, styles, scripts or external references.
- Left half mostly ink, right half mostly accent, split at x = 50.
- Each file is under 6 KB, with coordinates to at most one decimal place.

This is the Sketchbook renderer's recolouring, which the contact sheets and gallery use too:

```js
txt = txt.replace(/class="accent"/g, 'fill="' + accent + '" class="accent"');
txt = txt.replace(/fill="#000"/g, 'fill="' + ink + '"').replace(/stroke="#000"/g, 'stroke="' + ink + '"');
if (!/<svg[^>]*\sfill=/.test(txt)) txt = txt.replace("<svg", '<svg fill="' + ink + '"');
txt = txt.replace("<svg", '<svg width="800" height="800"');
```

Sketchbook's palette: ink `#2b3538`; accent / ground by card colour: green `#9bb99a` / `#f0ddd1`, red `#d98d78` / `#d5e8e3`, blue `#8fb2cf` / `#ede3d4`, black `#8a8094` / `#e3ead4`, white `#d2bb72` / `#e2e8f0`, multicolour `#d4b468` / `#e6dff0`, colourless `#c4c7ca` / `#efe9df`.

## Licence and attribution

- **Glyphs** (everything under `glyphs/`, `art/` and the copies in `docs/glyphs/`) are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Tools** (everything under `tools/`, the gallery page code and the CI workflow) are licensed under MIT.

See [LICENSE](LICENSE) for the full terms. When you use the glyphs, show this attribution somewhere a user can find it, such as an about page or a credits line:

> Sketchbook Glyphs by Zach Garcia-Hochhalter and contributors, CC BY 4.0, https://github.com/zbhochhalter/MTG_Glyphs

Magic: The Gathering is a trademark of Wizards of the Coast LLC. This is unofficial fan content, not approved or endorsed by Wizards. These glyphs are original artwork and contain no Wizards of the Coast imagery.

Card names and oracle ids come from [Scryfall](https://scryfall.com); popularity data comes from [EDHREC](https://edhrec.com).

## Working on the library

Node 20 or later.

```bash
npm ci
```

```bash
npm run build        # render art/ to glyphs/, rebuild manifest and gallery, validate
```

```bash
npm run contact -- --art art/cards-001.mjs --name cards   # review sheets in contact/
```

```bash
npm run todo         # what still lacks a glyph
```

Scripts in `tools/`:

| script | what it does |
| --- | --- |
| `render-art.mjs` | renders the glyph sources in `art/*.mjs` to `glyphs/` |
| `validate.mjs` | checks the contract, the rasterised ink/accent balance, the manifest, and oracle ids against Scryfall's bulk Oracle Cards file (cached in `.cache/` for a week) |
| `contact.mjs` | recoloured review sheets of 48, with a 20 mm strip and a greyscale strip |
| `build-manifest.mjs` | rebuilds `manifest.json` from the folders, naming cards from Scryfall |
| `gallery.mjs` | builds the searchable gallery in `docs/` |
| `fetch-data.mjs` | refreshes `data/catalogs.json` and `data/top-cards.json` |
| `todo.mjs` | lists missing subtypes, types and top cards |

The drawing style and its running log are in [STYLE.md](STYLE.md).

## Publishing

- **Releases** are semver tags (`v0.1.0` and so on). After tagging, check that `https://cdn.jsdelivr.net/gh/zbhochhalter/MTG_Glyphs@<tag>/manifest.json` returns the new version.
- **GitHub Pages:** the repository owner needs to enable Pages under Settings → Pages, with source "Deploy from a branch", branch `main`, folder `/docs`.

### Release log

| tag | contents | jsDelivr check |
| --- | --- | --- |
| v0.1.0 | 11 types, 535 subtypes, top 48 cards | tag not yet pushed (the build environment can't push tags); the release commit resolved through jsDelivr with `Access-Control-Allow-Origin: *` at `https://cdn.jsdelivr.net/gh/zbhochhalter/MTG_Glyphs@fd79b62998931ee56ff188da4daae012979d30bc/manifest.json` |
