# France vs England Bronze Match Doc Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single standalone colorful HTML document with predicted XIs, star player cards, and full squad tournament stats for France vs England (World Cup 2026 bronze medal match).

**Architecture:** One self-contained HTML file with embedded CSS/JS and inline SVG pitches. A small Node verification script asserts required structure and content without a browser. No Next.js changes.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, inline SVG, Google Fonts (Bebas Neue + Source Sans 3), Node.js for structure checks.

## Global Constraints

- Deliverable path: `france-vs-england-bronze-2026.html` at repo root only
- Do not modify existing Next.js auto-parts site pages, components, or `data/`
- No Chart.js / npm runtime deps for the document itself
- Label XIs as **Predicted XI**; stats as **tournament through semi-finals**
- No player photos — initials + shirt number avatars only
- France colors: `#002395` navy, `#ED2939` red; England: `#CF081F` red, `#012169` navy
- Fonts: Bebas Neue (display) + Source Sans 3 (body) — not Inter/Roboto/Arial
- Respect `prefers-reduced-motion`
- Spec: `docs/superpowers/specs/2026-07-18-france-england-bronze-match-doc-design.md`

## File Structure

| File | Responsibility |
|------|----------------|
| `france-vs-england-bronze-2026.html` | Entire match document (markup, styles, data, SVG, motion) |
| `scripts/verify-match-doc.mjs` | Structural acceptance checks for the HTML file |

---

### Task 1: Scaffold HTML + verification script

**Files:**
- Create: `france-vs-england-bronze-2026.html`
- Create: `scripts/verify-match-doc.mjs`

**Interfaces:**
- Consumes: none
- Produces: HTML shell with section ids `hero`, `context`, `lineups`, `stars`, `squads`, `footer`; verify script exit `0` only when all checks pass

- [ ] **Step 1: Write the failing verification script**

Create `scripts/verify-match-doc.mjs`:

```javascript
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
assert(/tournament through/i.test(html) || /through the semi/i.test(html), "missing tournament-through-SF disclaimer");
assert(html.includes("--fra-navy"), "missing --fra-navy CSS variable");
assert(html.includes("--eng-red"), "missing --eng-red CSS variable");
assert(html.includes("Bebas Neue") || html.includes("bebas-neue"), "missing Bebas Neue font");
assert(html.includes("Source Sans 3") || html.includes("source-sans-3"), "missing Source Sans 3 font");

assert((html.match(/class="[^"]*pitch/g) || []).length >= 2, "need at least 2 pitch graphics");
assert((html.match(/class="[^"]*star-card/g) || []).length >= 6, "need at least 6 star cards");

assert(/Mbapp/i.test(html) && /Kane/i.test(html) && /Bellingham/i.test(html) && /Olise/i.test(html), "missing key star names");

const fraTable = html.includes('id="france-squad"') || html.includes("France squad");
const engTable = html.includes('id="england-squad"') || html.includes("England squad");
assert(fraTable && engTable, "missing France and England squad tables");

// Rough squad size: at least 20 player rows per side inside tables
const trCount = (html.match(/<tr[\s>]/g) || []).length;
assert(trCount >= 40, `expected many squad rows, found ${trCount} <tr>`);

assert(/prefers-reduced-motion/.test(html), "missing reduced-motion handling");
assert(/@media print/.test(html), "missing print stylesheet");

if (errors.length) {
  console.error("FAIL:\n" + errors.map((e) => ` - ${e}`).join("\n"));
  process.exit(1);
}
console.log("PASS: match doc structure OK");
```

- [ ] **Step 2: Run script to verify it fails**

Run: `node scripts/verify-match-doc.mjs`  
Expected: FAIL with `missing france-vs-england-bronze-2026.html` (or missing sections)

- [ ] **Step 3: Create HTML scaffold**

Create `france-vs-england-bronze-2026.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>France vs England — World Cup 2026 Bronze Medal Match</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --fra-navy: #002395;
      --fra-red: #ED2939;
      --eng-red: #CF081F;
      --eng-navy: #012169;
      --ink: #0b1220;
      --paper: #eef2f7;
      --pitch-a: #1f7a3a;
      --pitch-b: #176330;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Source Sans 3", sans-serif;
      color: var(--ink);
      background:
        radial-gradient(1200px 600px at 10% -10%, rgba(0, 35, 149, 0.18), transparent 55%),
        radial-gradient(1000px 500px at 100% 0%, rgba(207, 8, 31, 0.14), transparent 50%),
        linear-gradient(180deg, #f7f9fc 0%, var(--paper) 100%);
    }
    h1, h2, .display { font-family: "Bebas Neue", sans-serif; letter-spacing: 0.03em; }
    section { padding: 2.5rem 1.25rem; max-width: 1100px; margin: 0 auto; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation: none !important; transition: none !important; }
    }
    @media print {
      body { background: white; }
      .star-card .bar > i { transition: none; }
    }
  </style>
</head>
<body>
  <header id="hero"></header>
  <main>
    <section id="context"></section>
    <section id="lineups"></section>
    <section id="stars"></section>
    <section id="squads"></section>
  </main>
  <footer id="footer"></footer>
</body>
</html>
```

- [ ] **Step 4: Re-run verification (still fails on content checks)**

Run: `node scripts/verify-match-doc.mjs`  
Expected: FAIL on pitches / star cards / squads / disclaimer (scaffold only)

- [ ] **Step 5: Commit**

```bash
git add france-vs-england-bronze-2026.html scripts/verify-match-doc.mjs docs/superpowers/plans/2026-07-18-france-england-bronze-match-doc.md
git commit -m "scaffold: bronze match HTML shell and verify script"
```

---

### Task 2: Hero + match context strip

**Files:**
- Modify: `france-vs-england-bronze-2026.html`

**Interfaces:**
- Consumes: CSS variables from Task 1
- Produces: filled `#hero` and `#context` with match identity and tournament pathway notes

- [ ] **Step 1: Implement hero**

Replace empty `#hero` with a full-bleed composition (not a card grid):

```html
<header id="hero">
  <p class="eyebrow">FIFA World Cup 2026 · Bronze Medal Match</p>
  <div class="hero-teams" aria-label="France versus England">
    <h1 class="team fra">France</h1>
    <span class="vs">vs</span>
    <h1 class="team eng">England</h1>
  </div>
  <p class="hero-sub">One more night in Miami — pride, bronze, and a final World Cup statement.</p>
  <p class="hero-meta">Saturday 18 July 2026 · Miami Stadium · 5:00 PM EDT / 10:00 PM BST</p>
</header>
```

Style `#hero` with split navy/red atmosphere, large Bebas Neue team names as the dominant brand signal, short supporting sentence, no stats strips or floating badges.

- [ ] **Step 2: Implement context strip**

```html
<section id="context" aria-label="Tournament context">
  <div class="context-grid">
    <article class="side fra">
      <h2>France</h2>
      <p>Semi-final: lost to Spain. Tournament attack among the tournament’s strongest before the SF shutout.</p>
      <ul>
        <li>Goals scored (tournament): ~16*</li>
        <li>Clean sheets: 4*</li>
        <li>Deschamps’ final match in charge</li>
      </ul>
    </article>
    <article class="side eng">
      <h2>England</h2>
      <p>Semi-final: lost 2–1 to Argentina after leading. Chasing a first-ever World Cup bronze.</p>
      <ul>
        <li>Goals scored (tournament): 14</li>
        <li>Wins this World Cup: 5</li>
        <li>Prior 3rd-place record: 0–2</li>
      </ul>
    </article>
  </div>
  <p class="note">*Team totals from public previews; individual tables below are the detail view.</p>
</section>
```

- [ ] **Step 3: Manual spot-check**

Open the file (or `python3 -m http.server` and browse). Confirm hero reads as one composition with France/England as hero-level brands.

- [ ] **Step 4: Commit**

```bash
git add france-vs-england-bronze-2026.html
git commit -m "feat: add bronze match hero and context strip"
```

---

### Task 3: Predicted XI pitch graphics

**Files:**
- Modify: `france-vs-england-bronze-2026.html`

**Interfaces:**
- Consumes: squad numbers below
- Produces: two `.pitch` SVGs inside `#lineups`, each with 11 markers

**Predicted XIs (label clearly):**

France (4-2-3-1):  
Maignan (16); Koundé (5), Saliba (17), Upamecano (4), Digne (3); Tchouaméni (8), Rabiot (14); Olise (11), Dembélé (7), Barcola (12); Mbappé (10)

England (4-2-3-1):  
Pickford (1); James (24), Stones (5), Guéhi (6), Spence (25); Rice (4), Bellingham (10); Saka (7), Rogers (17), Gordon (18); Kane (9)

- [ ] **Step 1: Add lineups section shell**

```html
<section id="lineups">
  <h2 class="display">Predicted XIs</h2>
  <p class="section-sub">Not official team sheets — based on recent starts and bronze-match preview reports. Rotation possible.</p>
  <div class="pitches">
    <!-- France pitch SVG -->
    <!-- England pitch SVG -->
  </div>
</section>
```

- [ ] **Step 2: Build reusable SVG pitch pattern**

Each pitch: viewBox `0 0 360 480`, green gradient field, white lines (halfway, center circle, boxes). Place players as `<g class="player-marker">` with circle + number + surname `<text>`.

Approximate Y bands for 4-2-3-1 (goalkeeper at bottom for attacking-up pitch):

| Band | Y | France | England |
|------|---|--------|---------|
| GK | 430 | Maignan 16 | Pickford 1 |
| DEF | 340 | Digne 3, Upa 4, Saliba 17, Koundé 5 | Spence 25, Guéhi 6, Stones 5, James 24 |
| DM | 260 | Rabiot 14, Tchouaméni 8 | Rice 4, Bellingham 10 |
| AM | 170 | Barcola 12, Dembélé 7, Olise 11 | Gordon 18, Rogers 17, Saka 7 |
| ST | 80 | Mbappé 10 | Kane 9 |

France markers fill `var(--fra-navy)`; England markers fill `var(--eng-red)` with white text (England navy stroke optional).

- [ ] **Step 3: Add marker entrance motion**

CSS:

```css
.player-marker {
  opacity: 0;
  transform: translateY(8px);
  animation: markerIn 0.55s ease forwards;
}
.player-marker:nth-child(1) { animation-delay: 0.05s; }
/* stagger remaining markers */
@keyframes markerIn {
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 4: Responsive stack**

```css
.pitches { display: grid; gap: 1.5rem; grid-template-columns: 1fr; }
@media (min-width: 800px) {
  .pitches { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 5: Commit**

```bash
git add france-vs-england-bronze-2026.html
git commit -m "feat: add predicted XI pitch graphics for FRA and ENG"
```

---

### Task 4: Star performer cards

**Files:**
- Modify: `france-vs-england-bronze-2026.html`

**Interfaces:**
- Consumes: headline stats below
- Produces: ≥6 `.star-card` elements with `.bar` fills inside `#stars`

**Star data (tournament through SF; footnote Bellingham if needed):**

| Player | Team | Apps | G | A | Mins |
|--------|------|------|---|---|------|
| Kylian Mbappé | FRA | 6 | 8 | 3 | 517 |
| Ousmane Dembélé | FRA | 6 | 5 | 2 | 462 |
| Michael Olise | FRA | 6 | 0 | 5 | 488 |
| Harry Kane | ENG | 5+ | 6 | 1 | 443+ |
| Jude Bellingham | ENG | 5+ | 6 | 1 | — if mins uncertain; else best available |
| Anthony Gordon | ENG | — | 1+ | 3+ | recent-form note OK |
| Bukayo Saka | ENG | include if mins/G/A available else still card with known G/A |

Use FIFA figures for Mbappé/Dembélé/Olise/Kane minutes where available. For Bellingham goals prefer latest England reporting (6) with footer note that an earlier FIFA list showed 4G/1A mid-tournament.

- [ ] **Step 1: Markup pattern**

```html
<section id="stars">
  <h2 class="display">Star performers</h2>
  <p class="section-sub">Tournament stats through the semi-finals.</p>
  <div class="stars-grid">
    <article class="star-card fra">
      <div class="avatar" aria-hidden="true">10<span>KM</span></div>
      <h3>Kylian Mbappé</h3>
      <p class="meta">France · Forward</p>
      <dl>
        <div><dt>Apps</dt><dd>6</dd></div>
        <div><dt>Goals</dt><dd>8</dd></div>
        <div><dt>Assists</dt><dd>3</dd></div>
        <div><dt>Mins</dt><dd>517</dd></div>
      </dl>
      <div class="bars" aria-hidden="true">
        <div class="bar goals"><i style="--v:8"></i><span>G</span></div>
        <div class="bar assists"><i style="--v:3"></i><span>A</span></div>
      </div>
    </article>
    <!-- repeat for remaining stars -->
  </div>
</section>
```

- [ ] **Step 2: Bar animation CSS/JS**

```css
.bar > i {
  display: block;
  height: 8px;
  width: 0;
  background: currentColor;
  border-radius: 999px;
  transition: width 0.8s ease;
}
.bar.is-on > i { width: calc(var(--v) * 10%); max-width: 100%; }
```

```javascript
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.classList.add("is-on");
  }
}, { threshold: 0.4 });
document.querySelectorAll(".bar").forEach((el) => io.observe(el));
```

Scale: goals bar uses `--v` against max 8 (Mbappé); assists against max 5 (Olise). Compute width in CSS as `calc(var(--v) / 8 * 100%)` for goals and `/ 5` for assists via separate classes.

- [ ] **Step 3: Commit**

```bash
git add france-vs-england-bronze-2026.html
git commit -m "feat: add star performer cards with animated stat bars"
```

---

### Task 5: Full squad tables

**Files:**
- Modify: `france-vs-england-bronze-2026.html`

**Interfaces:**
- Consumes: squad number lists below
- Produces: `#france-squad` and `#england-squad` tables, columns `# · Player · Pos · Apps · G · A · Mins`, sorted by minutes desc (unknown mins at bottom)

**England numbers (official):**  
1 Pickford GK · 2 Konsa DEF · 3 O’Reilly DEF · 4 Rice MID · 5 Stones DEF · 6 Guéhi DEF · 7 Saka FWD · 8 Anderson MID · 9 Kane FWD · 10 Bellingham MID · 11 Rashford FWD · 12 Chalobah DEF · 13 D. Henderson GK · 14 J. Henderson MID · 15 Burn DEF · 16 Mainoo MID · 17 Rogers MID · 18 Gordon MID · 19 Watkins FWD · 20 Madueke MID · 21 Eze MID · 22 Toney FWD · 23 Trafford GK · 24 James DEF · 25 Spence DEF · 26 Quansah DEF

**France numbers (published roster):**  
1 Samba GK · 2 Gusto DEF · 3 Digne DEF · 4 Upamecano DEF · 5 Koundé DEF · 6 Koné MID · 7 Dembélé FWD · 8 Tchouaméni MID · 9 Thuram FWD · 10 Mbappé FWD · 11 Olise FWD · 12 Barcola FWD · 13 Kanté MID · 14 Rabiot MID · 15 Konaté DEF · 16 Maignan GK · 17 Saliba DEF · 18 Zaïre-Emery MID · 19 T. Hernández DEF · 20 Doué FWD · 21 L. Hernández DEF · 22 Mateta FWD · 23 Risser GK · 24 Cherki FWD · 25 Akliouche FWD · 26 Lacroix DEF

- [ ] **Step 1: Embed player data as a JS array (or static `<tbody>` rows)**

For known stars, fill Apps/G/A/Mins from Task 4. For others: use best public figures when found during implementation; otherwise `—` for Apps/Mins and `0` only when confidently goalless is known — prefer `—` over invented minutes (per spec).

Example row:

```html
<tr class="has-goals">
  <td>10</td><td>Kylian Mbappé</td><td>FWD</td><td>6</td><td>8</td><td>3</td><td>517</td>
</tr>
```

Tint rows with `G > 0` or `A > 0` using class `has-goals` / `has-assists`.

- [ ] **Step 2: Table chrome**

```html
<section id="squads">
  <h2 class="display">Squad tournament stats</h2>
  <p class="section-sub">Apps, goals, assists, minutes — tournament through SF. Em dash = not published in sources used.</p>
  <div class="tables">
    <div>
      <h3>France</h3>
      <div class="table-scroll">
        <table id="france-squad">...</table>
      </div>
    </div>
    <div>
      <h3>England</h3>
      <div class="table-scroll">
        <table id="england-squad">...</table>
      </div>
    </div>
  </div>
</section>
```

Horizontal scroll wrapper for mobile.

- [ ] **Step 3: Commit**

```bash
git add france-vs-england-bronze-2026.html
git commit -m "feat: add France and England full squad stats tables"
```

---

### Task 6: Footer, polish, verification pass

**Files:**
- Modify: `france-vs-england-bronze-2026.html`
- Modify: `scripts/verify-match-doc.mjs` (only if checks need tightening after real markup)

**Interfaces:**
- Consumes: completed sections from Tasks 2–5
- Produces: document that passes `node scripts/verify-match-doc.mjs`

- [ ] **Step 1: Footer disclaimer**

```html
<footer id="footer">
  <p><strong>Data note:</strong> Tournament player stats through the semi-finals. Lineups are <em>predicted</em>, not confirmed team sheets.</p>
  <p>Sources: FIFA.com goal-contribution figures, England Football match centre, FFF/Sporting News France roster numbers, Stats Zone squad lists, match previews (18 Jul 2026).</p>
  <p>Bellingham goal total: prefer latest England reporting (6); an earlier FIFA mid-tournament list showed 4 goals / 1 assist.</p>
</footer>
```

- [ ] **Step 2: Section fade-in motion**

```css
main > section {
  opacity: 0;
  transform: translateY(12px);
  animation: sectionIn 0.7s ease forwards;
}
main > section:nth-of-type(1) { animation-delay: 0.05s; }
main > section:nth-of-type(2) { animation-delay: 0.12s; }
main > section:nth-of-type(3) { animation-delay: 0.18s; }
main > section:nth-of-type(4) { animation-delay: 0.24s; }
@keyframes sectionIn {
  to { opacity: 1; transform: none; }
}
```

(Already covered by `prefers-reduced-motion` from Task 1.)

- [ ] **Step 3: Run verification**

Run: `node scripts/verify-match-doc.mjs`  
Expected: `PASS: match doc structure OK`

- [ ] **Step 4: Visual check**

Open `france-vs-england-bronze-2026.html` in a browser (or local static server). Confirm:

1. Hero brand-forward France / England  
2. Two pitches with 11 markers each  
3. ≥6 star cards with bars  
4. Full squad tables  
5. Mobile stack works at ~390px width  

- [ ] **Step 5: Final commit**

```bash
git add france-vs-england-bronze-2026.html scripts/verify-match-doc.mjs
git commit -m "feat: finish bronze match doc footer, motion, and verify pass"
```

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Standalone HTML at repo root | 1 |
| Hero with match identity | 2 |
| Context strip (not live score) | 2 |
| Predicted XI pitch graphics | 3 |
| Star cards with bars | 4 |
| Full squad tables | 5 |
| Footer disclaimer + sources | 6 |
| National colors + fonts | 1–2 |
| Motion + reduced-motion + print | 1, 4, 6 |
| No Next.js site changes | Global |
| Acceptance via open-in-browser + structure script | 6 |

## Placeholder / consistency self-review

- No TBD steps; squad numbers and star stats embedded above  
- Camavinga excluded (not in France roster); Rabiot paired with Tchouaméni  
- England #12 = Chalobah (England Football list), not Livramento  
- Verify script class names (`.pitch`, `.star-card`) match markup instructions in Tasks 3–4
