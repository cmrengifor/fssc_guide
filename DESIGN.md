---
name: FSSC AP Training Guide
description: A precise, procedural reference for SGS Accounts Payable work instructions in Oracle Applications.
colors:
  bg: "#F5F6F9"
  surface: "#FFFFFF"
  surface-alt: "#EEF1F5"
  ink: "#1A2333"
  ink-soft: "#5B6478"
  ink-faint: "#677183"
  border: "#DCE1E8"
  ledger-blue: "#2C5FA8"
  ledger-blue-soft: "#E8EFF9"
  on-blue: "#FFFFFF"
  verification-teal: "#0E7785"
  verification-teal-soft: "#E4F3F4"
  confirmed-green: "#1F7A4D"
  confirmed-green-soft: "#E8F3ED"
  flagged-amber: "#A35B1A"
  flagged-amber-soft: "#FBEEE1"
  scrim: "rgba(10,14,22,.45)"
typography:
  display:
    fontFamily: "'Segoe UI Semibold', 'Segoe UI', -apple-system, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.2px"
  body:
    fontFamily: "'Segoe UI', -apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.5px"
  scale:
    step-9-5: "9.5px"
    step-10: "10px"
    step-10-5: "10.5px"
    step-11: "11px"
    step-11-5: "11.5px"
    step-12: "12px"
    step-12-5: "12.5px"
    step-13: "13px"
    step-13-5: "13.5px"
    step-14: "14px"
    step-14-5: "14.5px"
    step-15: "15px"
    step-16: "16px"
    step-26: "26px"
rounded:
  xs: "4px"
  sm: "5px"
  base: "6px"
  md: "8px"
  lg: "10px"
  full: "20px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "28px"
components:
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px 22px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "9px 12px"
  nav-item-active:
    backgroundColor: "{colors.ledger-blue-soft}"
    textColor: "{colors.ledger-blue}"
    rounded: "{rounded.md}"
    padding: "9px 12px"
  tag:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
---

# Design System: FSSC AP Training Guide

## Overview

**Creative North Star: "The Field Manual"**

This is a technical field manual, not a marketing surface: a reference a new SGS Accounts Payable hire keeps open next to Oracle while they work, built to be scanned under pressure rather than admired. The system is precise and quietly confident — it earns trust through consistency and restraint, not through decoration. Every visual decision optimizes for one question: can someone who has never seen this screen before find the exact step they need in seconds?

The palette stays cool and procedural (Ledger Blue, Verification Teal, Confirmed Green, Flagged Amber) with a near-total absence of ornament: no illustration, no gradients beyond a single small brand mark, no shadows except where content genuinely floats above the page. Monospace type is used deliberately and everywhere status matters — tags, captions, region codes, step counters — so machine-like, verifiable information reads as distinct from prose the instant your eye lands on it. Rejected explicitly: anything playful, anything that feels like a marketing landing page, anything that would look out of place printed and taped to a cubicle wall.

**Key Characteristics:**
- Cool, restrained four-color semantic palette (blue/teal/green/amber), each color owning one meaning and never used decoratively
- Monospace for every label, tag, code, and status string; humanist sans for everything a person reads as prose
- Flat by default — 1px borders delineate surfaces; shadows appear only on floating/overlay content
- Numbered, connected steps (a literal spine with counter badges) as the primary content pattern, not paragraphs
- Every color/background pairing is verified to WCAG AA (4.5:1 for text at its actual rendered size); dedicated `on-*` tokens exist wherever a fixed light/dark text color would fail against a theme-swapping accent

## Colors

A four-color semantic system on a near-monochrome neutral base — each accent owns exactly one meaning and is never reused decoratively. Every pairing below is contrast-checked (WCAG relative luminance) against its actual background at its actual rendered size, not eyeballed.

### Primary
- **Ledger Blue** (`#2C5FA8`, dark: `#6C9CE0`): The interactive/navigational color. Active nav items, links, search-input focus ring, the primary flow-diagram node border, and the numbered step-badge fill. If it's clickable or "you are here," it's this blue.
- **On Blue** (`#FFFFFF`, dark: `#1A2030`): Dedicated text/icon color for content painted *on top of* `--blue` (active language toggle, brand mark, step-number badge). Exists because white only reads on the light-mode blue (6.35:1) — dark mode's blue is a light pastel (`#6C9CE0`) and needs dark text (`#1A2030` on it = 5.78:1) instead. Never hardcode `#fff` on a `--blue` background; use this token so both themes stay legible.

### Secondary
- **Verification Teal** (`#0E7785`, dark: `#4FC7D3`): The informational/decision accent. Glossary term headwords, flow-diagram decision diamonds, and region badges. Reserved for "this is a defined concept or a branch point," never for primary navigation.

### Tertiary
- **Confirmed Green** (`#1F7A4D`, dark: `#57C08A`): The completion/category accent. Category labels, category pills, the interactive step checkbox, and the step-progress badge (e.g. "5/8"). Signals "grouped" or "satisfied," never used for calls to action.

### Neutral
- **Ink** (`#1A2333`, dark: `#E7EAF0`): Primary text.
- **Ink Soft** (`#5B6478`, dark: `#A7AFBF`): Secondary text — subtitles, nav labels, body copy inside cards.
- **Ink Faint** (`#677183`, dark: `#808899`): Tertiary text — placeholders, captions, disabled/pending states. Tuned to clear 4.5:1 against both `--bg` and `--surface` in both themes at its smallest real usage size (10–11px); the original values (`#8A93A3`/`#6B7385`) fell to 2.9–3.8:1 at that size and have been retired.
- **Border** (`#DCE1E8`, dark: `#2B3244`): All surface dividers and 1px card outlines.
- **Surface** (`#F7F9FC`, dark: `#1A2030`): Card, sidebar, and topbar background. A cool, dimmed off-white rather than pure `#FFFFFF` — stark white read as too bright/glary across large card areas; this keeps the same "lightest surface" role without the harsh jump.
- **Surface Alt** (`#EEF1F5`, dark: `#212838`): Recessed backgrounds — search input, tags, hover states.
- **Bg** (`#F1F3F7`, dark: `#12161F`): Page background, one step further back than Surface. Nudged down alongside Surface's dimming so the two layers stay visually distinct instead of the gap between them shrinking.
- **Scrim** (`rgba(10,14,22,.45)`, same value in both themes): The dimming backdrop behind the mobile off-canvas sidebar drawer. Theme-independent by design — it dims whatever is behind it regardless of light/dark, so it doesn't need a paired value.

### Status accent (used alongside the above)
- **Flagged Amber** (`#A35B1A`, dark: `#E5A05E`): The caution/incomplete accent — the tip-box callout and anything the guide hasn't finished documenting yet. Not part of the Primary/Secondary/Tertiary interactive hierarchy; it exists to interrupt, not to guide. Darkened slightly from the original `#B5651D` (3.80:1 on `--amber-soft`, failing AA) to `#A35B1A` (4.53:1).
- **Danger Red** (`#B3261E`, dark: `#E8756D`): The critical accent — reserved for the Incidents priority semaphore's "red" level and its delete action's hover state. The first use of red anywhere in the system; introduced deliberately rather than reused from an existing token, since nothing before Incidents needed a "this is critical" signal distinct from amber's "this is incomplete."

### Named Rules
**The One Meaning Rule.** Blue means interactive, teal means informational/decision, green means completion/category, amber means incomplete/caution, red means critical. A color never borrows another color's meaning to fill a gap in the palette.

**The No Hardcoded Text-on-Accent Rule.** Any text or icon painted on a semantic accent background uses that accent's dedicated `on-*` token (currently `--on-blue`), never a literal `#fff` or `#000`. A literal white passed a contrast check once, in one theme, and silently broke in the other — that failure mode is exactly what this rule exists to prevent.

## Typography

**Display Font:** Segoe UI Semibold (with -apple-system, Helvetica Neue, Arial fallback)
**Body Font:** Segoe UI (with -apple-system, system-ui, Helvetica Neue, Arial fallback)
**Label/Mono Font:** ui-monospace (with SFMono-Regular, Consolas, Liberation Mono, Menlo fallback)

**Character:** A humanist system sans for reading, paired with monospace wherever precision or scanability matters more than warmth — the same instinct that puts a monospace font in a terminal or a spec sheet.

### Hierarchy
- **Display** (600, 26px, 1.2, -0.2px tracking): Page titles only (`h1.page-title`). One per page.
- **Body** (400, 15px base / 13–16px in dense contexts, 1.55 light / 1.6 dark): All prose — descriptions, step text, definitions, card copy.
- **Label** (600, 9.5–12.5px, uppercase, 0.3–0.6px tracking, monospace): Every non-prose string — nav captions, section labels, tags, category titles, glossary headwords, flow-node codes, region badges, toggle buttons. If it's a status, a code, or a category, it's this treatment, not body copy at a smaller size.

There is no distinct headline/title tier between Display and Body — component headers (card titles, case names) are set in Body at 14–14.5px with visual weight coming from color and position, not a larger size.

### Micro-scale
The system does not follow a strict ratio-based type scale — sizes were hand-tuned per component in half-pixel steps rather than snapped to a generated ramp. The full set of 14 sizes in actual use, smallest to largest, is declared in this file's frontmatter under `typography.scale` (`step-9-5` through `step-26`) so every one of them is recognized as intentional rather than drift. Roughly: **9.5–12.5px** is the Label range, **13–16px** is the Body range, **26px** is Display. New UI should reuse an existing step rather than introduce a 15th.

### Named Rules
**The Label-Is-Mono Rule.** Any string that names a status, category, code, or system value renders in the Label treatment (monospace, uppercase, tracked), never as smaller Body text. This is what lets a reader distinguish "data about the process" from "explanation of the process" at a glance.

**The 70ch Measure Rule.** Any element carrying actual reading prose (`.page-sub`, `.step-check` step text, `.glossary-item p` definitions, `.tip-box` copy) caps at `max-width:70ch` — measured live, not eyeballed: unconstrained Body text at this system's 840px column ran 90–105 characters per line, well past the 45–75ch comfortable-reading range. Never applied to `.content-inner` itself or to non-prose containers (cards, the flow diagram, list rows) — those correctly use the full column width; the cap belongs on the text run, not the shell around it.

**Dark-mode type compensation.** `--body-line-height` (1.55 light / 1.6 dark) and `--body-letter-spacing` (normal / .1px) are theme tokens, not fixed values — light text on a dark surface reads slightly tighter than dark text on light at the same metrics, so dark mode opens both up a notch. Font-weight was considered and deliberately left alone: contrast ratios are already independently verified per theme (see Colors), so the weight axis wasn't needed on top of it.

## Layout

Single max-width reading column (`max-width: 840px`, centered) inside a fixed three-region app shell: a topbar (brand, search, language/theme toggles), a 260px sidebar (region-scoped navigation), and a scrollable main content area. Above 767px the shell does not scroll as a whole — only `.sidebar` and `main` scroll independently, each full-height.

Spacing follows a loose 4px-rooted rhythm rather than a strict token scale: 8px (tight, within a component), 12px (related elements), 16px (component internal padding), 20px (card padding, section gaps), 28px+ (major section separation). Card lists stack with 8px between siblings; page sections separate with 26–30px.

### Responsive (below 767px)
- The sidebar becomes a fixed, full-height off-canvas drawer (`transform: translateX(-100%)` at rest, `translateX(0)` when `.open`, 0.2s ease), triggered by a hamburger button that appears only at this width, with a dismissible backdrop (`rgba(10,14,22,.45)`) behind it. Opening it sets `aria-expanded`; navigating or dismissing the backdrop closes it.
- The topbar drops the brand wordmark (keeps only the icon mark) and the search input's `max-width` constraint, so the search field gets the room the sidebar and toggles leave it.
- `main` padding drops from `28px 40px 60px` to `16px 16px 40px`; `.content-inner` drops its `max-width` cap.
- Two-column layouts (`.quick-guide-grid`, the flow diagram's `.flow-branches`) collapse to a single column.
- `@media (pointer: coarse)` bumps `nav-item`/`case-card`/`path-step`/search-result-row minimum height to 44px, independent of the width breakpoint (a touch-capable desktop gets the same floor).

## Elevation & Depth

Flat by default. Surfaces are separated by a single 1px `border` color, not by shadow — this is a deliberate choice, confirmed for this pass, not a placeholder. Shadow is reserved for content that is genuinely floating above the page flow: the search-results dropdown, the mobile sidebar drawer, and embedded step screenshots — all of which need to read as "on top of," not "part of," the surface beneath them.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 10px 30px rgba(20,30,50,.12)`): The floating search-results dropdown.
- **Drawer** (`box-shadow: 0 10px 30px rgba(20,30,50,.18)`): The mobile off-canvas sidebar, at the same size as Overlay but slightly heavier — it displaces more of the screen.
- **Embedded media** (`box-shadow: 0 2px 8px rgba(20,30,50,.08)`): Step screenshots (`.wi-step-img`) — a light lift so a pasted image reads as a distinct artifact from the surrounding card.

### Named Rules
**The Flat-Unless-Floating Rule.** A shadow appears only when content overlaps something else in the same view (a dropdown or drawer over content, an image embedded in a step). Everything else — cards, nav, flow nodes — sits flush and is separated by border alone.

## Motion

Motion here is strictly functional: it acknowledges an action or confirms a state change, never decoration or page-load choreography. Two tiers:

- **Feedback (100–150ms):** the immediate-action tier. Row-card hover (`.case-card`, `.flow-node`, `.path-step` — border/background, 0.15s) and the step checkbox's checkmark (opacity + `rotate(45deg) scale()`, 0.15s each, `cubic-bezier(0.16,1,0.3,1)`) all live here — the smallest change that makes cause and result unmistakable. The checkmark's `::after` pseudo-element always exists at `opacity:0;scale(0)`, toggled by `:checked`, rather than being conditionally generated — the standard technique for a reliably-animating checkbox mark across browsers (a `:checked::after{content:""}`-only approach has no "from" state to transition from).
- **Continuity (2.4s):** the `step-highlight` keyframe (blue-soft flash fading to transparent) that confirms which step a hash-link landed on — shared by WI steps and glossary terms, paired with a JS `scrollIntoView({behavior:"smooth"})`.

No entrance/reveal animation exists anywhere (Reminders panel appearing post-hydration, tip-box, cards on scroll) — deliberately: this is an "Operate + Read" surface where routine transitions should be fast and content should never make a user wait through arrival choreography.

**Reduced motion:** a global `prefers-reduced-motion: reduce` query collapses all `animation`/`transition` durations to near-zero and forces `scroll-behavior:auto`; the two `scrollIntoView` calls also check the media query directly and fall back to `"auto"` scroll. One accepted trade-off: the `step-highlight` flash's *purpose* (which step did I land on) is lost for reduced-motion users along with its timing, since the keyframe's own end-state is transparent — the scroll-to-position still happens, just without the flash cue.

## Shapes

Six radius steps carry the whole system, all declared in the frontmatter `rounded` scale: `4px`/`5px`/`6px` (compact inline marks — the checklist checkbox, the inline Oracle-field code chip, the small quick-guide icon badge), `8px` (small controls — search input, toggles, nav items, the brand mark), `10px` (`--radius`, the system's primary token — cards, flow nodes, decision diamonds), and `20px`/full-round (pill shapes and true circles — tags, badges, step-number and path-index circles) — anything meant to read as a compact, self-contained label rather than a container.

Borders are 1–1.5px solid in the semantic accent or neutral border color, with one deliberate exception: `.flow-node.pending` switches to a **dashed** border. Dash-style is the system's one reserved signal for "not yet available" — it is not used for any other purpose, so a dashed border always means the same thing everywhere it appears.

## Components

### Buttons
This system has no generic button component — every action surface is either a full clickable row/card, a flow-diagram node, or a segmented toggle. There is no `<button class="primary">` pattern to extend; new actionable elements should adopt the Card, Flow Node, or Toggle patterns below rather than introduce a new button style.

### Toggles (language / theme)
- **Shape:** Single icon-style button, `38×38px`, `8px` radius, 1px border — matching `.menu-toggle`'s established square icon-button footprint, not a two-segment control. Both toggles are binary (ES/EN, light/dark), so only the currently-active state renders; there's no second option sitting beside it to compare against.
- **Style:** `Surface` background, `Ink Soft` text/icon by default. Theme's icon tints by state — amber sun for light, blue moon for dark, via `var(--amber)`/`var(--blue)` so both stay in sync with any future palette change. Language shows the active code (`ES`/`EN`) in Label typography, no color coding (no semantic color maps to "which language," so it stays neutral per the One Meaning Rule).
- **Interaction:** A real toggle button — `aria-pressed` reflects state (`true` = dark for theme, `true` = EN for language, an arbitrary but consistent anchor since neither pair has an inherent on/off direction), one constant `aria-label` names the control itself ("Toggle dark mode" / "Change language") rather than per-state text, since there's only one button to label now.
- **Hover:** `Surface Alt` background, `0.15s` transition, matching every other row-level hover in the system.

### Tags / Pills / Badges
- **Style:** `Surface Alt` background, `Ink Soft` text, `full` (20px) radius, Label typography, tight padding (`2px 8px`).
- **Variants:** plain tag (keyword chips), category pill (`Confirmed Green` text on `Confirmed Green Soft`), region pill (`Verification Teal` text on `Verification Teal Soft`), progress badge (`Confirmed Green` text on `Confirmed Green Soft`, e.g. "5/8" — appears only once a Work Instruction has at least one checked step, never at zero).
- **State:** Mostly static — pills are labels, not controls. The one exception is a translated keyword tag (below), which is genuinely interactive.

### Translated keyword tags (`WITag`)
- **What it is:** every Work Instruction keyword (`WorkInstructionTag`) now carries both `en` and `es` forms. The pill shows whichever matches the app's current language; when the two forms actually differ, the pill gets the `Verification Teal` outline+tint (the same "defined concept" role `.glossary-inline` uses) and a `cursor:help`, signaling there's a translation to see. Tags whose form is identical either way (acronyms, tool names — "BOSS", "WinSCP", "ACH") render as a plain, untinted tag, since there's nothing to reveal.
- **Reveal:** hovering (or, where the tag is `interactive`, focusing) shows a small dark tooltip above the pill with the other language's term — a quick translation without navigating away or switching the whole page's language. `aria-label` carries both forms together for screen readers, since the visible tag text alone only shows one.
- **Where it's interactive:** only on the Work Instruction detail page, where a single set of ~4–5 tags renders once. On the list/catalog cards the same highlight and hover both work, but the pill isn't a tab stop — with dozens of cards on one page, making every tag individually focusable would bloat keyboard navigation for a secondary, decorative affordance.

### Cards / Containers
- **Corner Style:** `10px` (`--radius`).
- **Background:** `Surface`, 1px `Border` outline.
- **Shadow Strategy:** None (see Elevation & Depth) — border only.
- **Internal Padding:** `20px 22px` for generic cards; `14–18px` for list-row cards (Work Instruction cards, path steps, Reminders panel rows — all the same pattern).
- **Interactive variant:** List-row cards (Work Instruction list, Learning Path steps, Home's region and Reminders cards) swap the border to `Ledger Blue` on hover — no background or shadow change, so the border-color shift alone signals interactivity.

### Checklist / Progress
- **Step checkbox:** A real `<input type="checkbox">`, visually a `16px` square with `4px` radius and a `2px` `Confirmed Green` outline (no fill) — matches the shape token already reserved for compact inline marks. Checked state draws a green checkmark via `::after`, not a filled background, keeping the flat/no-heavy-fill discipline consistent with the rest of the system. Sits inline with each step's text inside a `<label>` so clicking the text also toggles it.
- **Progress badge:** See Tags/Pills/Badges above — the same "5/8" mono chip appears on the Work Instruction detail page, its list-row card, Home's region cards (as an aggregate "N en progreso"), and the Learning Path (a fully-checked item shows ✓ instead of its sequence number, and its index circle switches from Ledger Blue to Confirmed Green).
- **Tip box:** An amber-soft callout (`Flagged Amber` border, `Flagged Amber Soft` background) above a Work Instruction's steps list, used only when that WI has curated tips. Same visual language the retired "DEMO" banner used — repurposed, not duplicated, once the Learning Path stopped needing it.
- **Reminders panel:** Plain `category-block`/`case-card` reuse on Home — a "continue where you left off" card and a short "pending items" list. Renders nothing at all (not an empty state) until the visitor has real progress to show.

### Image modal (`ZoomableImage`)
- **Trigger:** every real screenshot in a Work Instruction (`.wi-step-img`) renders inside a borderless `<button>` (`.zoomable-image-trigger`, `cursor:zoom-in`) instead of a bare `<img>` — one reusable component, used everywhere the app shows a real screenshot, so this is the only place the enlarge behavior needs to be built.
- **Backdrop:** full-screen `rgba(6,8,14,.9)` scrim, `cursor:zoom-out` — deliberately darker than `.sidebar-backdrop`'s dimming value, since here the image itself is the entire point of the surface and needs to read as the sole focus, not a layer above still-visible page content.
- **Layout:** true full-screen — the image scales up to fill the viewport (`max-width/max-height:100%` within a `32px` padded flex-centered backdrop), not a fixed-size centered card. Image corners at the system's `--radius` (10px). `role="dialog"` + `aria-modal="true"` + `aria-label` set to the image's own alt text live on the backdrop itself. The image sits in a shrink-wrapped `.image-modal-frame` (sized to the rendered image, not the viewport) so the close button — `position:absolute; top:-16px; right:-16px` on that frame — always sits right at the image's own corner, regardless of the image's size or aspect ratio, rather than floating disconnected in a viewport corner.
- **Motion:** backdrop fades in/out (`.22s`/`.18s` ease) and the image scales in from `.94→1` / out to `.96` on a slightly snappier curve — both driven by real CSS `@keyframes`, not just an opacity toggle, so open and close read as one continuous motion rather than an instant swap. Unmounting is deferred until the exit `animationend` fires (via an internal `closing` state), so the close animation actually gets to play instead of being cut off by React unmounting the node immediately; a timeout fallback force-closes it if that event never fires. Automatically collapses to near-zero under `prefers-reduced-motion` via the existing global kill-switch — no special-casing needed.
- **Interaction:** click the trigger to open, click the backdrop or close button (or press Escape) to close; clicking the enlarged image itself does nothing (`stopPropagation` on the frame, since it's not also a dismiss target). Background content (`#app`) gets `inert` while open, and `body` scroll locks — both reverse on close. Focus moves to the close button on open and returns to the trigger on close.
- **Portal:** rendered via `createPortal` directly into `document.body`, not inline where the trigger lives. The trigger sits inside `#app`, so an inline-rendered modal would itself become a descendant of `#app` — and since `inert` disables real pointer/keyboard interaction for an entire subtree with no way to exempt a nested part of it, inerting `#app` while the modal was open silently disabled the modal's own close button along with everything else. Portaling out of `#app` is what makes the "hide the background, not the modal" split actually hold.

### Inline step highlighting
Three independent, fully automatic layers applied to Work Instruction step *and tip* text (`lib/highlight.tsx`) — never hand-tagged, since editorial judgment over ~1,400 steps doesn't scale and isn't objective:
- **Oracle field/button chip:** any text the source already wraps in straight double-quotes — "Actions", "Validate", "Pay Group" — renders as an `.oracle-field` chip (mono, `Surface Alt` fill, `Border` outline, `5px` radius — the system's original, previously-unused inline-code-chip token, now finally wired up). Distinguishes "what I do" from "where I click" at a glance. Capped at 50 characters so a stray long quoted aside stays plain text instead of an oversized pill.
- **Glossary term link:** within the text *not* already claimed by a field chip, the first occurrence per call of a glossary term becomes a `.glossary-inline` link (`Verification Teal`, dotted underline — the palette's existing "defined concept" role, not a new color) to `/glossary#<slug>`. First-occurrence-*per-step-or-tip*, not per-page, since a reader can land directly on any step via a flow-diagram deep link and shouldn't lose the link just because an earlier step already used it.
- **Precedence matters:** field chips resolve first, so a quoted UI label that happens to share a glossary term's name (e.g. the "Holds" *tab*) stays a plain chip rather than also linking to the "Hold" *concept* — confirmed on `wi-3way-match-ca` step 15, where quoted "Holds" is a chip and the later, unquoted "On Hold" links to the glossary.
- **Hold codes are the one exception to that precedence:** a quoted `"Qty Rec"` or `"Line Variance"` is never referring to an on-screen tab or button the way "Holds" is — it's always the hold reason itself — so it still resolves to a link (`.oracle-field-link`, same chip shape, clickable, teal on hover) to `/holds#<slug>` even though it's quoted. Unquoted hold-code mentions link the same way `.glossary-inline` does. `Price` is deliberately excluded from this matching — as a bare common word it collides with ordinary invoice-price prose far too often to auto-link safely, so it's documented on `/holds` but never auto-linked from step/tip text.
- The glossary/hold link sits inside the same `<label>` that toggles the step's checkbox (so clicking anywhere on a step still checks it off); its `onClick` calls `stopPropagation()` so clicking the link navigates without also toggling the checkbox — a nested-interactive-element inside a native label is otherwise ambiguous across browsers.

### Holds reference
A small, static reference page (`/holds`) expanding the glossary's `Hold` entry, which used to end in "(Definition pending expansion)" — that parenthetical is gone now that the expansion exists, replaced with a `.glossary-see-also` link pointing here. Entries render as `.glossary-item` cards (same shape as the Glossary page) grouped under two category headings (Procurement / Invoice Processing). Reachable three ways: a flat sidebar link directly under Home (no region/priority sub-grouping — holds aren't organized by either), the global search index, and inline from any WI step/tip that mentions a hold code (see above).

### Search-match highlighting
Search results wrap the matched substring in `<mark class="search-match">` — `Ledger Blue` text on `Ledger Blue Soft`, `4px` radius. Not a new color decision: it's the exact pairing `nav-item-active` already uses for "this is where you are," applied to "this is what you found" — the same underlying meaning (you asked for it, here it is), so reusing the token instead of introducing a traditional yellow highlighter respects the One Meaning Rule.
- Highlights the label first when the query matches it directly.
- When a result matched on a tag or glossary definition that isn't otherwise visible (e.g. searching "netting" surfaces "TCC" — the match lives in TCC's definition, not its headword), a `<small>` snippet line shows ~40 characters of context around the match, ellipsis-truncated, with the same `<mark>` treatment — so a result never highlights nothing and leaves the reader to guess why it matched.

### Inputs / Fields
- **Style:** `Surface Alt` fill, 1px `Border` outline, `8px` radius, 38px left padding to clear an inline search icon. Carries `role="combobox"` + `aria-expanded`/`aria-controls`/`aria-autocomplete`, wired to a real `aria-activedescendant`-tracked `role="listbox"` (results as `role="option"` buttons) — ArrowDown/ArrowUp move the active option, Enter activates it, Escape closes the dropdown, so the ARIA pattern it declares is the pattern it actually implements, not just Tab-reachability.
- **Focus:** Border shifts to `Ledger Blue`, fill becomes `Surface` (theme-aware — this used to hardcode pure white, which made typed text unreadable against dark-mode's light `--ink`; fixed), plus a `2px solid var(--blue)` outline at 2px offset so focus is visible without relying on the border-color shift alone.
- **Error / Disabled:** Not yet defined — an open gap.

### Navigation
- **Style:** Vertical list of `nav-item` rows, Body-weight text at reduced size (13.5px), `8px` radius, `9px 12px` padding.
- **Default:** `Ink Soft` text, transparent background.
- **Hover:** `Surface Alt` background, `Ink` text.
- **Active:** `Ledger Blue Soft` background, `Ledger Blue` text, 600 weight — the only nav state that changes font weight, so "current page" is legible even at a glance or in peripheral vision.
- **Structure:** Grouped by section with a real `<h2>`/`<h3>` heading above each group (not a styled `<div>` — screen-reader heading navigation now finds "Steps," "Banking & Payments," etc. directly), Label-styled visually either way. The sidebar itself follows the same rule: Learning Path, Flow Diagram, and Work Instructions each get a real `<h3 className="nav-caption">` (`role="group"`/`aria-labelledby` on the wrapping section), with the 3 region links plus an "All regions" link underneath — region link text is now just the region code ("US"/"CA"/"NAM"), since the heading already establishes what group it's in; repeating the group name on every link was pure redundancy once grouping existed. Not every nav destination needs this treatment, though — Home, Incidents, Holds, and Glossary are flat single links with no sub-dimension to group by, so they sit directly in a `nav-section` with no caption. Below 767px the whole nav becomes an off-canvas drawer — see Layout.

### Flow Node (signature component)
The interactive process-diagram building block — the system's most distinctive component, since it's the only one that encodes a state machine (available vs. not-yet-documented) directly into its border style.
- **Default (linked):** `Surface` background, `1.5px` solid `Ledger Blue` border, `10px` radius, centered Label-weight text plus a smaller monospace "source code" caption underneath (e.g. `wi-3way-match-ca · step 9`) naming exactly which document and step it points to.
- **Hover:** Background shifts to `Ledger Blue Soft`; no movement, no shadow.
- **Pending variant:** Dashed `Ink Faint` border, `Ink Faint` text, not clickable, cursor stays default. This is the system's only dashed-border usage — see Shapes.
- **Decision variant:** `Verification Teal` fill (`Verification Teal Soft` background), used only for yes/no branch points, never for a regular step.

### Incidents (priority semaphore)
A single-user operational log — created entirely client-side, persisted to `localStorage` (`fssc-incidents-v1`), the same pattern as step progress. No backend: this app is fully static and has no database, so an incident only exists in the browser that created it.
- **Card:** `Surface` background, `1px Border` outline, `4px` left border in the incident's priority color (`Danger Red` / `Flagged Amber` / `Confirmed Green`) — a colored spine rather than a filled background, so a long list of incidents scans by color without turning into a wall of tinted blocks. Anchors by `id`, so a search result can deep-link straight to it (`:target` gets the same `step-highlight` glow used for step/glossary anchors).
- **Priority badge:** Same pill shape as Tags/Pills/Badges, colored per priority — this is the one place `Danger Red` appears as a fill (`Red Soft` background, `Red` text), since nothing before this feature needed "critical" as a distinct meaning from `Flagged Amber`'s "incomplete."
- **Priority meaning:** each color names an actual triage level, not just a badge color — Red = High risk ("contact a senior analyst for assistance"), Yellow = Medium risk ("you may contact a senior analyst for assistance if needed"), Green = Low risk ("a junior analyst should be able to solve it with quick, simple steps"). The full sentence is the rubric the original scaffold's README left as an open decision — it's now real copy, not a TODO. A `PriorityLegend` block (reusing `.incident-form`'s bordered-card treatment) surfaces all three at the top of the page, and the create-form's priority picker echoes the selected color's sentence live underneath the chips, so the guidance is visible exactly when you're deciding which color to pick.
- **Bilingual by design, not by translation:** every other piece of bilingual content in this app was translated once by a content author ahead of time. An incident is typed by the user in the moment, so there's no automatic translation step — the form asks for the Spanish and English title/description as two explicit fields rather than pretending one language can stand in for the other.
- **WI link:** optional, via `WIPicker` — a scoped reuse of the topbar `SearchBox`'s result-list styling (`.search-results`/`.sr-item`) filtered to the live WI catalog only, so linking an incident to a real Work Instruction doesn't require inventing a second dropdown pattern.
- **Nav placement:** a single link directly under Home — not grouped/sub-divided in the sidebar the way Work Instructions/Flow/Learning Path are, since this feature reads as one destination, not a set of regional variants. Priority and status filtering both live inside the page itself (two plain `<select>`s), the same in-page-filter pattern already used for status alone before priority filtering moved here from a now-removed `/incidents/priority/[priority]` route.

## Do's and Don'ts

### Do:
- **Do** put any status, code, category, or tag in the Label treatment (monospace, uppercase, tracked) — never render it as small Body text.
- **Do** use a dashed border exclusively to mean "not yet available." Never use it for decoration or for a different kind of emphasis.
- **Do** keep shadows reserved for content that visually floats over other content (dropdowns, the mobile drawer, embedded images). A card sitting in normal flow never gets a shadow.
- **Do** let a color's assigned meaning constrain its use: Ledger Blue for interactive/navigational, Verification Teal for informational/decision, Confirmed Green for completion/category, Flagged Amber for caution/incomplete.
- **Do** use `var(--on-blue)` (never a literal `#fff`/`#000`) for any text or icon painted on a `--blue` background — the two themes need opposite text colors there.
- **Do** give real content (a screenshot showing an actual step, an original flowchart) real, specific `alt` text; reserve `alt=""` for genuinely decorative images only.
- **Do** promote a visually-styled section label to a real heading (`<h2>`/`<h3>`, styled via the same class) instead of a `<div>` — the Label visual treatment and heading semantics are independent choices.

### Don't:
- **Don't** introduce a generic filled "primary button" component — this system routes every action through a card, a flow node, or a toggle segment instead.
- **Don't** add illustration, photography, or gradients beyond the existing small two-color brand mark. The system is text- and structure-led.
- **Don't** use Confirmed Green or Flagged Amber for navigation or emphasis outside their assigned meaning (completion/category, and caution/incomplete, respectively) — that's what makes them legible as signals rather than decoration.
- **Don't** remove an `outline`/focus indicator without replacing it with something at least as visible — a border-color shift alone is a weak signal for keyboard users.
