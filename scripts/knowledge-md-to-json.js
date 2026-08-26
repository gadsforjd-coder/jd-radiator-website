// One-off/utility: convert an operations-supplied bilingual knowledge article
// markdown (EN/RU split by "# ===== XX (xx) =====" markers) into the
// KnowledgeArticle JSON shape consumed by lib/knowledge.ts.
//
// Usage: node scripts/knowledge-md-to-json.js <input.md> <slug> <category> <date>
// Appends/updates the article in lib/knowledge-articles.json.
const fs = require("fs");
const path = require("path");

const [, , inFile, slug, category, date] = process.argv;
if (!inFile || !slug || !category || !date) {
  console.error("Usage: node scripts/knowledge-md-to-json.js <input.md> <slug> <category> <date>");
  process.exit(1);
}

const raw = fs.readFileSync(inFile, "utf8");

// Split into locale blocks on the "# ===== EN (en) =====" style markers.
const markerRe = /^#\s*=====\s*[^(]*\(([a-z]{2})\)\s*=====\s*$/gm;
const blocks = [];
let m, last = null;
while ((m = markerRe.exec(raw)) !== null) {
  if (last) last.end = m.index;
  last = { locale: m[1], start: markerRe.lastIndex };
  blocks.push(last);
}
if (last) last.end = raw.length;
if (blocks.length === 0) {
  console.error("No '# ===== xx (locale) =====' markers found.");
  process.exit(1);
}

function paras(text) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseBlock(text) {
  // Title = first "# " line.
  const lines = text.split("\n");
  let title = "";
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.startsWith("# ")) {
      title = t.slice(2).trim();
      bodyStart = i + 1;
      break;
    }
  }
  const rest = lines.slice(bodyStart).join("\n");

  // Split off the FAQ section ("## FAQ...").
  const faqIdx = rest.search(/^##\s*FAQ.*$/m);
  const mainRaw = faqIdx >= 0 ? rest.slice(0, faqIdx) : rest;
  const faqRaw = faqIdx >= 0 ? rest.slice(faqIdx) : "";

  const mainParas = paras(mainRaw);
  // First paragraph = excerpt; the rest = body (headings kept as "## "/"### ").
  const excerpt = mainParas[0] || "";
  const body = mainParas.slice(1);

  // Parse FAQ: "**Qn: question?**" then answer paragraph(s) until next **Q or ---.
  const faq = [];
  if (faqRaw) {
    const faqParas = paras(faqRaw.replace(/^##\s*FAQ.*$/m, ""));
    for (const p of faqParas) {
      // Accept any short label prefix: "Q1:", "В1:", "Q1 :", etc., or none.
      const qm = p.match(/^\*\*\s*(?:[A-Za-zА-Яа-я]{1,4}\s*\d+\s*[:：.)]\s*)?(.+?)\s*\*\*\s*([\s\S]*)$/);
      if (qm) {
        const q = qm[1].trim();
        const a = qm[2].trim();
        if (a) faq.push({ q, a });
        else faq.push({ q, a: "" });
      } else if (faq.length && !faq[faq.length - 1].a && !p.startsWith("---") && !p.startsWith("*")) {
        faq[faq.length - 1].a = p.trim();
      }
    }
  }

  const content = { title, excerpt, body };
  if (faq.length) content.faq = faq.filter((f) => f.q && f.a);
  return content;
}

const article = { slug, date, category, content: {} };
for (const b of blocks) {
  article.content[b.locale] = parseBlock(raw.slice(b.start, b.end));
}

// Merge into lib/knowledge-articles.json (replace by slug if present).
const outPath = path.join(__dirname, "..", "lib", "knowledge-articles.json");
let all = [];
if (fs.existsSync(outPath)) {
  try { all = JSON.parse(fs.readFileSync(outPath, "utf8")); } catch { all = []; }
}
all = all.filter((a) => a.slug !== slug);
all.push(article);
all.sort((a, b) => (a.date < b.date ? 1 : -1));
fs.writeFileSync(outPath, JSON.stringify(all, null, 2) + "\n");

const locs = Object.keys(article.content);
console.log(`OK: ${slug} [${locs.join(",")}]`);
for (const l of locs) {
  const c = article.content[l];
  console.log(`  ${l}: title="${c.title.slice(0, 50)}..." body=${c.body.length}p faq=${(c.faq || []).length}`);
}
