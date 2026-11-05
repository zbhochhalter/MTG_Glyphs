// Builds the static gallery in docs/ for GitHub Pages: docs/index.html,
// docs/glyphs.json (every glyph's SVG text and labels) and docs/glyphs/**
// (copies of the raw files).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, INK, COLOURS, readJSON, writeJSON, keyOf } from './lib/common.mjs';

const man = readJSON(path.join(ROOT, 'manifest.json'));
const cats = readJSON(path.join(ROOT, 'data/catalogs.json'), {});
const subName = {}, subGroup = {};
for (const [g, list] of Object.entries(cats)) for (const n of list) { subName[keyOf(n)] = n; subGroup[keyOf(n)] = g; }
const typeNames = { creature: 'Creature', instant: 'Instant', sorcery: 'Sorcery', enchantment: 'Enchantment', artifact: 'Artifact', land: 'Land', planeswalker: 'Planeswalker', battle: 'Battle', kindred: 'Kindred', token: 'Token', emblem: 'Emblem' };
const REPO = 'zbhochhalter/MTG_Glyphs';

const docs = path.join(ROOT, 'docs');
fs.rmSync(path.join(docs, 'glyphs'), { recursive: true, force: true });
const items = [];
const add = (kind, key, name, group, file) => {
  const dst = path.join(docs, file);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(path.join(ROOT, file), dst);
  items.push({ k: kind, key, n: name, g: group, f: file, s: fs.readFileSync(path.join(ROOT, file), 'utf8').trim() });
};
for (const [k, f] of Object.entries(man.types)) add('type', k, typeNames[k] || k, 'type', f);
for (const [k, f] of Object.entries(man.subtypes)) add('subtype', k, subName[k] || k, subGroup[k] || 'other', f);
for (const [k, v] of Object.entries(man.cards)) add('card', k, v.name || k, 'card', v.file);
writeJSON(path.join(docs, 'glyphs.json'), { version: man.version, items });
fs.writeFileSync(path.join(docs, '.nojekyll'), '');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sketchbook Glyphs</title>
<meta name="description" content="An open library of original two-tone SVG glyphs for Magic: The Gathering playtest proxies.">
<style>
:root{--ink:${INK};--bg:#faf8f4;--fg:#2b3538;--muted:#6b7478;--line:#dcd6cc}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif}
header,main,footer{max-width:1200px;margin:0 auto;padding:16px}
h1{font-size:24px;margin:8px 0 4px}p{margin:4px 0}a{color:inherit}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;position:sticky;top:0;background:var(--bg);padding:10px 16px;z-index:2;border-bottom:1px solid var(--line);max-width:1200px;margin:0 auto}
input,select{font:inherit;padding:6px 10px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--fg)}
input{flex:1 1 200px;min-width:0}
.sw{display:flex;gap:4px}.sw button{width:26px;height:26px;border-radius:50%;border:2px solid transparent;cursor:pointer}
.sw button[aria-pressed=true]{border-color:var(--fg)}
#count{color:var(--muted);font-size:13px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}
.t{border-radius:8px;padding:10px 8px 8px;text-align:center;font-size:13px}
.t svg{width:100%;height:auto;display:block}
.t .n{font-weight:600;margin-top:4px;overflow-wrap:anywhere}.t .m{font-size:11px;color:var(--muted)}
.t .m a{color:var(--muted)}
footer{color:var(--muted);font-size:13px;border-top:1px solid var(--line);margin-top:24px}
code{font-size:13px}
</style></head><body>
<header>
<h1>Sketchbook Glyphs</h1>
<p>Original two-tone SVG glyphs for Magic: The Gathering playtest proxies: one per card type, one per subtype, and per-card glyphs for the most-played cards.</p>
<p>Fetch them at a release tag: <code>https://cdn.jsdelivr.net/gh/${REPO}@v${man.version}/manifest.json</code>. Source and contract: <a href="https://github.com/${REPO}">github.com/${REPO}</a>.</p>
</header>
<div class="bar">
<input id="q" type="search" placeholder="Search by name, subtype or type" aria-label="Search">
<select id="kind" aria-label="Kind"><option value="">All kinds</option><option value="type">Types</option><option value="subtype">Subtypes</option><option value="card">Cards</option></select>
<select id="group" aria-label="Subtype group"><option value="">All groups</option>${Object.keys(cats).map(g => `<option>${g}</option>`).join('')}</select>
<div class="sw" id="sw">${Object.entries(COLOURS).map(([n, [a]], i) => `<button title="${n}" aria-label="${n}" aria-pressed="${i === 0}" data-c="${n}" style="background:${a}"></button>`).join('')}</div>
<span id="count"></span>
</div>
<main><div class="grid" id="grid"></div></main>
<footer>
<p>Glyphs &copy; Zach Garcia-Hochhalter and contributors, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Tools under the MIT licence. Attribution: &ldquo;Sketchbook Glyphs by Zach Garcia-Hochhalter and contributors, CC BY 4.0&rdquo;.</p>
<p>Magic: The Gathering is a trademark of Wizards of the Coast LLC. This is unofficial fan content, not approved or endorsed by Wizards. These glyphs are original artwork and contain no Wizards of the Coast imagery.</p>
<p>Card names and oracle ids come from <a href="https://scryfall.com">Scryfall</a>; popularity from <a href="https://edhrec.com">EDHREC</a>. Version ${man.version}.</p>
</footer>
<script>
const COLOURS=${JSON.stringify(COLOURS)},INK="${INK}",RAW="https://raw.githubusercontent.com/${REPO}/main/";
let items=[],colour="green";
const recolour=(t,ink,acc)=>{t=t.replace(/class="accent"/g,'fill="'+acc+'" class="accent"');t=t.replace(/fill="#000"/g,'fill="'+ink+'"').replace(/stroke="#000"/g,'stroke="'+ink+'"');if(!/<svg[^>]*\\sfill=/.test(t))t=t.replace("<svg",'<svg fill="'+ink+'"');return t.replace("<svg",'<svg role="img" aria-hidden="true"')};
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function draw(){const q=document.getElementById("q").value.trim().toLowerCase(),k=document.getElementById("kind").value,g=document.getElementById("group").value;const [acc,ground]=COLOURS[colour];
const list=items.filter(i=>(!k||i.k===k)&&(!g||i.g===g)&&(!q||i.n.toLowerCase().includes(q)||i.key.includes(q)||i.g.includes(q)));
document.getElementById("count").textContent=list.length+" of "+items.length;
document.getElementById("grid").innerHTML=list.map(i=>'<div class="t" style="background:'+ground+'">'+recolour(i.s,INK,acc)+'<div class="n">'+esc(i.n)+'</div><div class="m">'+i.k+(i.k==="subtype"?" &middot; "+i.g:"")+' &middot; <a href="'+i.f+'">svg</a> &middot; <a href="'+RAW+i.f+'">raw</a></div></div>').join("")}
fetch("glyphs.json").then(r=>r.json()).then(j=>{items=j.items;draw()});
for(const id of ["q","kind","group"])document.getElementById(id).addEventListener("input",draw);
document.getElementById("sw").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;colour=b.dataset.c;for(const x of document.querySelectorAll("#sw button"))x.setAttribute("aria-pressed",x===b);draw()});
</script>
</body></html>
`;
fs.writeFileSync(path.join(docs, 'index.html'), html);
console.log(`gallery: ${items.length} glyphs`);
