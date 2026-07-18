import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const file = resolve("france-vs-england-bronze-2026.html");
const errors = [];

function assert(cond, msg) {
  if (!cond) errors.push(msg);
}

assert(existsSync(file), "missing france-vs-england-bronze-2026.html");
const html = existsSync(file) ? readFileSync(file, "utf8") : "";

for (const id of ["hero", "context", "lineups", "stars", "squads", "footer"]) {
  assert(html.includes(`id="${id}"`), `missing section id=${id}`);
}

assert(/Predicted XI/i.test(html), "missing Predicted XI label");
assert(
  /tournament through/i.test(html) || /through the semi/i.test(html),
  "missing tournament-through-SF disclaimer"
);
assert(html.includes("--fra-navy"), "missing --fra-navy CSS variable");
assert(html.includes("--eng-red"), "missing --eng-red CSS variable");
assert(
  html.includes("Bebas Neue") || html.includes("bebas-neue"),
  "missing Bebas Neue font"
);
assert(
  html.includes("Source Sans 3") || html.includes("source-sans-3"),
  "missing Source Sans 3 font"
);

assert(
  (html.match(/class="[^"]*pitch/g) || []).length >= 2,
  "need at least 2 pitch graphics"
);
assert(
  (html.match(/class="[^"]*star-card/g) || []).length >= 6,
  "need at least 6 star cards"
);

assert(
  /Mbapp/i.test(html) &&
    /Kane/i.test(html) &&
    /Bellingham/i.test(html) &&
    /Olise/i.test(html),
  "missing key star names"
);

const fraTable =
  html.includes('id="france-squad"') || html.includes("France squad");
const engTable =
  html.includes('id="england-squad"') || html.includes("England squad");
assert(fraTable && engTable, "missing France and England squad tables");

const trCount = (html.match(/<tr[\s>]/g) || []).length;
assert(trCount >= 40, `expected many squad rows, found ${trCount} <tr>`);

assert(/prefers-reduced-motion/.test(html), "missing reduced-motion handling");
assert(/@media print/.test(html), "missing print stylesheet");

if (errors.length) {
  console.error("FAIL:\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log("PASS: match doc structure OK");
