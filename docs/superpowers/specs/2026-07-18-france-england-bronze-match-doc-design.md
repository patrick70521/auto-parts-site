# France vs England Bronze Match Stats Document — Design

**Date:** 2026-07-18  
**Status:** Approved for planning  
**Deliverable:** Standalone colorful HTML match document

## Goal

Create a single self-contained HTML page documenting player stats and graphics for the FIFA World Cup 2026 bronze medal match: **France vs England**, Saturday 18 July 2026, Miami Stadium.

The match has not kicked off at document-authoring time. Content uses **tournament stats through the semi-finals** plus **predicted starting XIs**, clearly labeled as such.

## Non-goals

- Do not modify the existing Asia Pacific Trading auto-parts Next.js site pages or branding.
- Do not require a build step, npm install, or live API for viewing the document.
- Do not wait for full-time match stats (out of scope for this version).
- Do not use player photos (licensing); use initials + shirt number avatars instead.

## Approach

**Single self-contained HTML file** at repo root:

`france-vs-england-bronze-2026.html`

- Embedded CSS and minimal JS
- SVG pitch graphics (inline)
- Optional Google Fonts link (degrades gracefully offline)
- No Chart.js or other chart CDN libraries

## Page structure

1. **Hero header**  
   Title: FIFA World Cup 2026 · Bronze Medal Match  
   Subhead: France vs England  
   Meta: Saturday 18 July 2026 · Miami Stadium · Kick-off 22:00 local / 10:00 PM BST  
   Brand-forward team names as hero-level signals with national color accents.

2. **Match context strip**  
   Side-by-side FRA / ENG panels with tournament form context (e.g. goals scored in tournament, pathway note: France lost SF to Spain; England lost SF to Argentina). Not a live scoreboard.

3. **Predicted XIs (graphics)**  
   Two SVG football pitches side by side (stack on mobile).  
   - France: blue pitch accents / navy jersey markers  
   - England: red / white / navy jersey markers  
   Each marker: shirt number + short surname.  
   Label: “Predicted XI”.

4. **Star performers (cards)**  
   6–8 highlight cards for top contributors, including at minimum:  
   - France: Kylian Mbappé, Ousmane Dembélé, Michael Olise  
   - England: Harry Kane, Jude Bellingham, plus one creator (e.g. Anthony Gordon or Bukayo Saka)  
   Each card: initials avatar, team accent stripe, Apps / Goals / Assists / Minutes, CSS bar visualization for goals & assists.

5. **Full squad tables**  
   Two tables (France, England), columns:  
   `# · Player · Pos · Apps · G · A · Mins`  
   Sorted by minutes played descending.  
   Visual tint for top goal/assist rows.  
   Include full published World Cup squads (~26 per side).

6. **Footer**  
   Data disclaimer, sources, “Predicted XI / tournament stats through SF” note.

## Predicted lineups (baseline)

Subject to late team news; document must label as predicted.

**France (approx. 4-3-3 / 4-2-3-1 hybrid as published in previews):**  
Maignan; Koundé, Saliba, Upamecano, Digne; Tchouaméni, (midfield partner as available — prefer Kanté/Rabiot/Koné over unavailable names); Olise, Dembélé, Barcola; Mbappé.

Note: Some preview sources list Camavinga; he is **not** in the published France WC2026 squad used here. Prefer squad-accurate midfielders (Tchouaméni, Kanté, Rabiot, Koné, Zaïre-Emery).

**England (approx. 4-2-3-1):**  
Pickford; James, Stones, Guéhi, Spence; Rice, Bellingham; Saka, Rogers, Gordon; Kane.

Rotation for the bronze match is possible; keep the predicted XI note visible.

## Data rules

- Prefer recent public sources: FIFA.com goal-contribution figures, England Football match centre, Stats Zone squad lists.
- Confirmed headline figures to include where sources agree (as of pre-bronze reporting):
  - Mbappé: 8 goals, 3 assists
  - Dembélé: 5 goals, 2 assists
  - Olise: 0 goals, 5 assists (tournament assist leader)
  - Kane: 6 goals, 1 assist
  - Bellingham: treat carefully — FIFA mid-tournament list showed 4G/1A; later England reporting cites 6 goals. Prefer the most recent reputable source available at implementation time and footnote if sources diverge.
- For squad players without published minutes, use best-available public figures or “—” rather than inventing precision.
- Never present predicted XIs as confirmed team sheets.

## Visual design

### Color system (CSS variables)

| Token | Value | Use |
|-------|-------|-----|
| `--fra-navy` | `#002395` | France primary |
| `--fra-red` | `#ED2939` | France accent |
| `--eng-red` | `#CF081F` | England primary |
| `--eng-navy` | `#012169` | England secondary |
| `--pitch` | soft green gradient | Pitch backgrounds |
| `--ink` | deep navy/near-black | Body text |
| `--paper` | cool off-white with subtle gradient/pattern | Page atmosphere |

Avoid: purple-indigo AI cliché theme, warm cream+terracotta cliché, broadsheet hairline-dense layout, Inter/Roboto/Arial stacks, flat single-color page, card-heavy hero, hero overlays/badges.

### Typography

- Display: distinctive serif or sports-display Google Font (e.g. Bebas Neue / Oswald / similar) for team names and section titles  
- Body: readable humanist sans (e.g. Source Sans 3 / DM Sans) — not Inter/Roboto/system-only

### Motion

At least 2–3 intentional motions:

1. Section fade/slide-in on load (respect `prefers-reduced-motion`)
2. Star-card stat bars animate width on view/load
3. Subtle pitch marker pop or header color wash

### Layout rules

- First viewport: brand/match identity, one headline, one short supporting line, team color presence — no clutter of stats strips in the hero.
- Cards only where they aid interaction/scanning (star performers); tables are tables, not nested card grids.
- Mobile: single column; pitches stack; tables scroll horizontally if needed.
- Print stylesheet: hide motion, preserve colors reasonably, avoid cutting player rows awkwardly.

## Technical constraints

- One HTML file; open via `file://` or any static host.
- Valid semantic HTML (`header`, `main`, `section`, `table`, `footer`).
- Accessible contrast for text on colored backgrounds.
- No dependency on the Next.js app runtime.

## Acceptance criteria

1. Opening `france-vs-england-bronze-2026.html` in a browser shows a complete colorful match document.
2. Both predicted XIs render as pitch graphics with names/numbers.
3. Star cards show goals/assists/minutes with visible bars.
4. Full squad tables list both squads with Apps/G/A/Mins columns.
5. Footer states data is tournament-through-SF and XIs are predicted.
6. Page is usable on a phone-width viewport.
7. Existing auto-parts site remains unchanged.

## Out of scope / later

- Post-match live stats update after full time
- PDF export tooling
- Embedding into the Next.js marketing site
