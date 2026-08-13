---
name: FSSC AP Training Guide
description: A precise, procedural reference for SGS Accounts Payable work instructions in Oracle Applications.
colors:
  bg: "#F5F6F9"
  surface: "#FFFFFF"
  surface-alt: "#EEF1F5"
  ink: "#1A2333"
  ink-soft: "#5B6478"
  ink-faint: "#8A93A3"
  border: "#DCE1E8"
  ledger-blue: "#2C5FA8"
  ledger-blue-soft: "#E8EFF9"
  verification-teal: "#0F7D8C"
  verification-teal-soft: "#E4F3F4"
  confirmed-green: "#1F7A4D"
  confirmed-green-soft: "#E8F3ED"
  flagged-amber: "#B5651D"
  flagged-amber-soft: "#FBEEE1"
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
rounded:
  sm: "8px"
  md: "10px"
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
    rounded: "{rounded.md}"
    padding: "20px 22px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "9px 12px"
  nav-item-active:
    backgroundColor: "{colors.ledger-blue-soft}"
    textColor: "{colors.ledger-blue}"
    rounded: "{rounded.sm}"
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

## Colors

A four-color semantic system on a near-monochrome neutral base — each accent owns exactly one meaning and is never reused decoratively.

### Primary
- **Ledger Blue** (`#2C5FA8`, dark: `#6C9CE0`): The interactive/navigational color. Active nav items, links, search-input focus ring, active language toggle, the primary flow-diagram node border, and the numbered step-badge fill. If it's clickable or "you are here," it's this blue.

### Secondary
- **Verification Teal** (`#0F7D8C`, dark: `#4FC7D3`): The informational/decision accent. Glossary term headwords, flow-diagram decision diamonds, and region badges. Reserved for "this is a defined concept or a branch point," never for primary navigation.

### Tertiary
- **Confirmed Green** (`#1F7A4D`, dark: `#57C08A`): The completion/category accent. Category labels, case category pills, and checklist item markers. Signals "grouped" or "satisfied," never used for calls to action.

### Neutral
- **Ink** (`#1A2333`, dark: `#E7EAF0`): Primary text.
- **Ink Soft** (`#5B6478`, dark: `#A7AFBF`): Secondary text — subtitles, nav labels, body copy inside cards.
- **Ink Faint** (`#8A93A3`, dark: `#6B7385`): Tertiary text — placeholders, captions, disabled/pending states.
- **Border** (`#DCE1E8`, dark: `#2B3244`): All surface dividers and 1px card outlines.
- **Surface** (`#FFFFFF`, dark: `#1A2030`): Card, sidebar, and topbar background.
- **Surface Alt** (`#EEF1F5`, dark: `#212838`): Recessed backgrounds — search input, tags, hover states.
- **Bg** (`#F5F6F9`, dark: `#12161F`): Page background, one step further back than Surface.

### Status accent (used alongside the above)
- **Flagged Amber** (`#B5651D`, dark: `#E5A05E`): The caution/incomplete accent — the "DEMO" badge, error cards, and anything the guide hasn't finished documenting yet. It is not part of the Primary/Secondary/Tertiary interactive hierarchy; it exists to interrupt, not to guide.

### Named Rules
**The One Meaning Rule.** Blue means interactive, teal means informational/decision, green means completion/category, amber means incomplete/caution. A color never borrows another color's meaning to fill a gap in the palette.

## Typography

**Display Font:** Segoe UI Semibold (with -apple-system, Helvetica Neue, Arial fallback)
**Body Font:** Segoe UI (with -apple-system, system-ui, Helvetica Neue, Arial fallback)
**Label/Mono Font:** ui-monospace (with SFMono-Regular, Consolas, Liberation Mono, Menlo fallback)

**Character:** A humanist system sans for reading, paired with monospace wherever precision or scanability matters more than warmth — the same instinct that puts a monospace font in a terminal or a spec sheet.

### Hierarchy
- **Display** (600, 26px, 1.2, -0.2px tracking): Page titles only (`h1.page-title`). One per page.
- **Body** (400, 15px base / 13–14.5px in dense contexts, 1.55): All prose — descriptions, step text, definitions, card copy.
- **Label** (600, 10–12.5px, uppercase, 0.4–0.6px tracking, monospace): Every non-prose string — nav captions, section labels, tags, category titles, glossary headwords, flow-node codes, region badges, toggle buttons. If it's a status, a code, or a category, it's this treatment, not body copy at a smaller size.

There is no distinct headline/title tier between Display and Body — component headers (card titles, case names) are set in Body at 14–14.5px with visual weight coming from color and position, not a larger size.

### Named Rules
**The Label-Is-Mono Rule.** Any string that names a status, category, code, or system value renders in the Label treatment (monospace, uppercase, tracked), never as smaller Body text. This is what lets a reader distinguish "data about the process" from "explanation of the process" at a glance.

## Layout

Single max-width reading column (`max-width: 840px`, centered) inside a fixed three-region app shell: a topbar (brand, search, language/theme toggles), a 260px fixed sidebar (region-scoped navigation), and a scrollable main content area (`padding: 28px 40px 60px`). The shell itself does not scroll — only `.sidebar` and `main` scroll independently, each full-height.

Spacing follows a loose 4px-rooted rhythm rather than a strict token scale: 8px (tight, within a component), 12px (related elements), 16px (component internal padding), 20px (card padding, section gaps), 28px+ (major section separation). Card lists stack with 8px between siblings; page sections separate with 26–30px.

Responsive behavior is not yet defined — the shell was built and verified at desktop width; mobile/tablet breakpoints are an open gap, not a confirmed decision.

## Elevation & Depth

Flat by default. Surfaces are separated by a single 1px `border` color, not by shadow — this is a deliberate choice, confirmed for this pass, not a placeholder. Shadow is reserved for content that is genuinely floating above the page flow: the search-results dropdown and embedded step screenshots, both of which need to read as "on top of," not "part of," the surface beneath them.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 10px 30px rgba(20,30,50,.12)`): The floating search-results dropdown. The only UI chrome shadow in the system.
- **Embedded media** (`box-shadow: 0 2px 8px rgba(20,30,50,.08)`): Step screenshots (`.wi-step-img`) — a light lift so a pasted image reads as a distinct artifact from the surrounding card.

### Named Rules
**The Flat-Unless-Floating Rule.** A shadow appears only when content overlaps something else in the same view (a dropdown over content, an image embedded in a step). Everything else — cards, nav, flow nodes — sits flush and is separated by border alone.

## Shapes

Two radius steps carry the whole system: `8px` (small controls — search input, toggles, nav items, the brand mark) and `10px` (`--radius`, the system's one named token — cards, flow nodes, decision diamonds). A third, `20px`/full-round, is reserved exclusively for pill shapes (tags, badges, the demo badge) and true circles (step-number badges, the path-index circle in Learning Path) — anything meant to read as a compact, self-contained label rather than a container.

Borders are 1–1.5px solid in the semantic accent or neutral border color, with one deliberate exception: `.flow-node.pending` switches to a **dashed** border. Dash-style is the system's one reserved signal for "not yet available" — it is not used for any other purpose, so a dashed border always means the same thing everywhere it appears.

## Components

### Buttons
This system has no generic button component — every action surface is either a full clickable row/card, a flow-diagram node, or a segmented toggle. There is no `<button class="primary">` pattern to extend; new actionable elements should adopt the Card, Flow Node, or Toggle patterns below rather than introduce a new button style.

### Toggles (language / theme)
- **Shape:** Segmented control, `8px` radius on the outer group, 1px border, no radius on internal dividers.
- **Style:** Each segment is a plain button (`Surface` background, `Ink Soft` text, Label typography); the active segment fills with `Ledger Blue` + white text (language) or `Surface Alt` + role color (theme — amber sun for light, blue moon for dark).
- **Hover / Focus:** No distinct hover state currently defined beyond the active-segment fill — an open gap for a future pass.

### Tags / Pills / Badges
- **Style:** `Surface Alt` background, `Ink Soft` text, `full` (20px) radius, Label typography, tight padding (`2px 8px`).
- **Variants:** plain tag (keyword chips), category pill (`Confirmed Green` text on `Confirmed Green Soft`), region pill (`Verification Teal` text on `Verification Teal Soft`), demo badge (`Flagged Amber` text on `Flagged Amber Soft`).
- **State:** Static — pills do not carry interactive states; they are labels, not controls.

### Cards / Containers
- **Corner Style:** `10px` (`--radius`).
- **Background:** `Surface`, 1px `Border` outline.
- **Shadow Strategy:** None (see Elevation & Depth) — border only.
- **Internal Padding:** `20px 22px` for generic cards; `14–18px` for list-row cards (case cards, path steps).
- **Interactive variant:** List-row cards (case list, Work Instruction list, Learning Path steps) swap the border to `Ledger Blue` on hover — no background or shadow change, so the border-color shift alone signals interactivity.

### Inputs / Fields
- **Style:** `Surface Alt` fill, 1px `Border` outline, `8px` radius, 38px left padding to clear an inline search icon.
- **Focus:** Border shifts to `Ledger Blue`, fill lightens to pure white (`#fff`) regardless of theme — the one place the system breaks its own light/dark token pairing, to make focus unmistakable.
- **Error / Disabled:** Not yet defined — an open gap.

### Navigation
- **Style:** Vertical list of `nav-item` rows, Body-weight text at reduced size (13.5px), `8px` radius, `9px 12px` padding.
- **Default:** `Ink Soft` text, transparent background.
- **Hover:** `Surface Alt` background, `Ink` text.
- **Active:** `Ledger Blue Soft` background, `Ledger Blue` text, 600 weight — the only nav state that changes font weight, so "current page" is legible even at a glance or in peripheral vision.
- **Structure:** Grouped by section with a Label-styled caption above each group; no mobile-specific treatment defined yet.

### Flow Node (signature component)
The interactive process-diagram building block introduced this session — the system's most distinctive component, since it's the only one that encodes a state machine (available vs. not-yet-documented) directly into its border style.
- **Default (linked):** `Surface` background, `1.5px` solid `Ledger Blue` border, `10px` radius, centered Label-weight text plus a smaller monospace "source code" caption underneath (e.g. `wi-3way-match-ca · step 9`) naming exactly which document and step it points to.
- **Hover:** Background shifts to `Ledger Blue Soft`; no movement, no shadow.
- **Pending variant:** Dashed `Ink Faint` border, `Ink Faint` text, not clickable, cursor stays default. This is the system's only dashed-border usage — see Shapes.
- **Decision variant:** `Verification Teal` fill (`Verification Teal Soft` background), used only for yes/no branch points, never for a regular step.

## Do's and Don'ts

### Do:
- **Do** put any status, code, category, or tag in the Label treatment (monospace, uppercase, tracked) — never render it as small Body text.
- **Do** use a dashed border exclusively to mean "not yet available." Never use it for decoration or for a different kind of emphasis.
- **Do** keep shadows reserved for content that visually floats over other content (dropdowns, embedded images). A card sitting in normal flow never gets a shadow.
- **Do** let a color's assigned meaning constrain its use: Ledger Blue for interactive/navigational, Verification Teal for informational/decision, Confirmed Green for completion/category, Flagged Amber for caution/incomplete.

### Don't:
- **Don't** introduce a generic filled "primary button" component — this system routes every action through a card, a flow node, or a toggle segment instead.
- **Don't** add illustration, photography, or gradients beyond the existing small two-color brand mark. The system is text- and structure-led.
- **Don't** use Confirmed Green or Flagged Amber for navigation or emphasis outside their assigned meaning (completion/category, and caution/incomplete, respectively) — that's what makes them legible as signals rather than decoration.
