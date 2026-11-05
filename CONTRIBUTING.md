# Contributing

Thanks for helping. The library grows in batches of about 40 glyphs, and every batch goes through the same loop.

## Ground rules

- **Your own drawing only.** Don't trace, reproduce or closely imitate Wizards of the Coast card art, set symbols, mana symbols, the planeswalker sigil, frames or logos, and don't adapt game-icons.net or any other icon set. By contributing, you license your glyphs under CC BY 4.0 and your tool changes under MIT (see [LICENSE](LICENSE)).
- **Follow the contract** in the README, and the look in [STYLE.md](STYLE.md).
- **Draw the subject or the effect:** a bolt for Lightning Bolt, a ring for Sol Ring. Avoid puns and portraits.

## The batch loop

1. Pick the next cards:

   ```bash
   npm run todo -- --cards 200
   ```

   `data/top-cards.json` holds EDHREC's top 1,000 with oracle ids. To refresh it, run `npm run fetch-data -- --top 2000`.
2. Draw them. Either:
   - add entries to a new source file, `art/cards-NNN.mjs`, keyed by exact card name (see `art/cards-001.mjs`); `render-art` resolves the oracle id. Or
   - hand-draw an SVG and save it as `glyphs/cards/<oracle_id>.svg`. Files that no `art/` source defines are never overwritten.
3. Build and validate:

   ```bash
   npm run build
   ```

4. Render and **look at** the contact sheet:

   ```bash
   npm run contact -- --art art/cards-NNN.mjs --name cards-NNN
   ```

   Redraw anything that doesn't read at 20 mm or in greyscale, that breaks the house style, or that's too like another glyph.
5. Note any new motif or rule in the STYLE.md log.
6. Commit the glyphs, the source, `manifest.json` and `docs/`, then open a pull request. CI runs `validate` and must pass.

Contact sheets go in `contact/`, which is gitignored.

## Oracle ids

Key cards by Scryfall **oracle id**, so all printings share one glyph. The tools take ids from Scryfall's bulk "Oracle Cards" file, cached in `.cache/` for a week. If you query Scryfall yourself, stay under 10 requests a second, and fewer for searches, with a descriptive User-Agent that carries no personal contact details.

## Releases (maintainers)

1. Bump `version` in `package.json`.
2. Run `npm run build` and commit.
3. Tag: `git tag vX.Y.Z && git push origin vX.Y.Z`.
4. Check `https://cdn.jsdelivr.net/gh/zbhochhalter/MTG_Glyphs@vX.Y.Z/manifest.json` returns the new version, and add a line to the release log in the README.
