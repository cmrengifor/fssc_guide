---
target: Home page
total_score: 21
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
timestamp: 2026-08-13T06-41-34Z
slug: components-views-homeview-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Toggles and search-dropdown state are clear; nothing else on Home needs status. |
| 2 | Match Between System & Real World | 1 | "Explorar por categoría" claims cases are grouped by process type in the sidebar — the sidebar is a flat 9-link list with zero grouping. |
| 3 | User Control and Freedom | 3 | No traps; one-level-deep back-link exists. |
| 4 | Consistency and Standards | 2 | Card styling is internally consistent, but the sidebar violates DESIGN.md's own "grouped by section with a real h2/h3 heading" navigation rule. |
| 5 | Error Prevention | 1 | The three Home case cards route to pages that are 100% "Contenido pendiente" placeholder, with no warning on the card itself. |
| 6 | Recognition Rather Than Recall | 2 | Two incompatible taxonomies are both live at once (legacy "caso" categories vs. the real `wiCategories`/region system) with nothing reconciling them. |
| 7 | Flexibility and Efficiency of Use | 3 | Search is a properly built `combobox`/`listbox`, keyboard-operable end to end (confirmed in both assessments). |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely faithful to DESIGN.md's "Field Manual" restraint — flat, no ornament, mono labels used correctly. |
| 9 | Error Recovery | 1 | The placeholder case pages offer no path back to real content and no acknowledgment they're incomplete. |
| 10 | Help and Documentation | 2 | No cue distinguishing legacy demo content from the real 71-WI catalog. |
| **Total** | | **21/40** | **Acceptable — significant improvements needed** |

## Design Specificity Verdict

**Design review (Assessment A):** Partially grounded, undermined by its own content. The visual language — flat cards, monospace tags, the four-icon quick-guide grid — is specific enough to this product (it references search/category/flow/glossary, real features). But Home's actual body content is three legacy "Case" demo entries instead of any trace of the real product: 71 authored Work Instructions across three regions. A reader can't tell from Home that this tool is region-scoped at all.

**Deterministic scan (Assessment B):** `node detect.mjs --json app/ components/` → **0 findings, exit 0.** Clean. Accessibility tree confirms real semantic landmarks (`banner`/`navigation`/`main`), a clean h1→h2→h3 heading chain with no skips, and every interactive element is a genuine `<button>` or `<a href>` — no non-semantic click targets found on this page.

**The gap between these two results is the finding.** A mechanical antipattern scanner cannot detect "this card's copy describes a feature that doesn't exist" or "this content is a placeholder dead-end styled identically to real content" — those require judgment, and both are real, verified problems (confirmed by reading `Sidebar.tsx` and the `/case/*` routes directly). Detector-clean does not mean design-clean here.

**Overlay:** live-server injection succeeded (`[impeccable] Live variant mode ready`), but that's the interactive hover-to-pick editing tool, not an auto-scanning overlay — it added no additional findings beyond the Step 1 CLI scan.

## Overall Impression

The component-level craft is genuinely good — restrained, on-brand, accessible search, clean semantics, zero mechanical antipatterns. The failure is architectural: Home is still built around the three placeholder "Case" demos from before the real 71-Work-Instruction catalog existed, and nothing was updated when the product moved on. It reads as confident and finished right up until a new hire — the exact persona this page exists for — clicks its only concrete content and hits three walls of "Contenido pendiente" in a row.

## What's Working

1. **The quick-guide-grid earns its restraint.** Four cards, one icon glyph each, one sentence each, collapsing to 1 column under 767px — a real instantiation of DESIGN.md's "no illustration" rule, not a token gesture toward it.
2. **The search combobox is properly built.** `role="combobox"` + `aria-expanded`/`aria-controls`/`aria-autocomplete` wired to a real `listbox`/`option` structure — confirmed by both assessments independently (A by design review, B by accessibility-tree inspection) — genuinely keyboard-operable end to end.
3. **Bilingual parity is real.** Every string checked has a complete, natural ES/EN pair — the one place "bilingual by default" visibly holds up under inspection.

## Priority Issues

**[P0] Home's only concrete content links to placeholder dead-ends with no warning**
- **Why it matters**: The three case cards (`/case/buscar-invoice`, `/case/match-3way`, `/case/sales-tax`) resolve entirely to "Contenido pendiente" text and "🖼 Imagen pendiente" boxes — styled identically to real content, so a user can't tell before clicking. This directly contradicts the product's own stated Principle #1 ("real content over placeholders").
- **Fix**: Remove these three cards from Home (they're already unlinked from the flow diagram for the same reason), or badge them with the existing `.badge-demo` treatment already used for "Learning Path."
- **Suggested command**: `/impeccable distill`

**[P0] "Explorar por categoría" describes a sidebar feature that doesn't exist**
- **Why it matters**: The copy claims cases are "grouped by process type in the side menu"; `Sidebar.tsx` renders one flat 9-link list with zero grouping. This is the app actively misdirecting a new hire in the specific card whose job is orientation.
- **Fix**: Either build the heading-grouped nav DESIGN.md already specifies, or rewrite the copy to describe what the sidebar actually offers.
- **Suggested command**: `/impeccable clarify`

**[P1] Home never surfaces the real product (71 Work Instructions, 3 regions)**
- **Why it matters**: That information lives only in sidebar link labels. For "Findability first" to hold at the entry point, Home needs to name the real catalog instead of standing in three unrelated legacy demos for it.
- **Fix**: Replace or supplement the category blocks with a region picker or a "browse the 71 Work Instructions" card routing into the real `wiCategories` taxonomy.
- **Suggested command**: `/impeccable shape`

**[P1] Several topbar touch targets fall under the 44×44px minimum, uncovered by the existing coarse-pointer rule**
- **Why it matters**: Measured directly via `getBoundingClientRect()` at 375px width: `.menu-toggle` 38×38, `.brand` 34×34, `.search-input` height 41, language-toggle buttons 41×31, and the theme-toggle icon buttons as narrow as **8×31** and 13×31. `globals.css`'s `@media (pointer:coarse){ min-height:44px }` rule only targets `.nav-item,.case-card,.path-step,.sr-item` — the topbar controls were missed in the earlier adapt pass.
- **Fix**: Extend the coarse-pointer rule (or add explicit sizing) to `.menu-toggle`, `.lang-toggle button`, `.theme-toggle button`, and `.search-input`.
- **Suggested command**: `/impeccable adapt`

**[P2] Sidebar drawer links stay in tab order while off-screen on mobile**
- **Why it matters**: At 375px with the drawer closed, `#sidebar-nav` sits at `translateX(-260px)` but its links reportedly retain `tabIndex 0` and a live `offsetParent` (Assessment A's finding — not independently re-verified by Assessment B, worth confirming before fixing). If accurate, a keyboard user tabbing from search tabs through 9 invisible links before reaching page content.
- **Fix**: Add `inert` (or toggle `tabindex="-1"`) on the drawer while closed.
- **Suggested command**: `/impeccable harden`

**[P3] Decorative glyphs lack `aria-hidden`**
- **Why it matters**: `⌕ ☰ ⋔ §` (Home) and `⌂ ▸ ⋔ ▤ §` (sidebar) have no `aria-hidden="true"` — screen readers may announce raw Unicode characters next to otherwise-clean labels.
- **Fix**: Add `aria-hidden="true"` to every `.qg-icon`/`.nav-icon` span.
- **Suggested command**: `/impeccable harden`

**[P3] Search input has no associated `<label>` element**
- **Why it matters**: `aria-label` is present and satisfies WCAG 4.1.2 (Assessment B confirmed `labels.length === 0` but the aria-label covers the accessible name) — this is belt-and-suspenders polish, not a real gap.
- **Fix**: Optional — add a visually-hidden `<label>` if a future contributor wants defense-in-depth.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

**Jordan (first-timer) — most relevant persona for this page.** Reads all four quick-guide cards in good faith, believes "Explorar por categoría" describes the sidebar, clicks the first case card expecting a real procedure, lands on "Contenido pendiente" three times in a row. The worst possible first impression for the exact persona this page is designed for.

**Riley (stress-tester, consulting mid-task on a live Oracle screen).** Searches "invoice" from the topbar; results split into a "Casos" group and a "Work Instructions" group for what should be one concept — Riley now has to guess which of two same-sounding results is the real, complete procedure, adding a decision under exactly the pressure this tool exists to relieve.

**Sam (accessibility-dependent).** Two independent, measurable regressions from the "fully keyboard-operable" standard: (1) 9 reportedly-tabbable phantom off-screen sidebar links on mobile between search and page content, and (2) several sub-44px topbar touch targets confirmed via direct measurement, with the theme-toggle icons at 8×31px being the most severe.

## Minor Observations

- Zero-result search state ("Sin resultados para tu búsqueda") is a flat dead end with no next step (e.g. "try browsing by region").
- The quick-guide-grid and the case-card pattern below it share near-identical visual weight (same title size, same body color, same card silhouette) — nothing distinguishes "orientation UI" from "actual content," which compounds the P0 placeholder issue.
- `CaseCard` truncates tags to 4 (`c.tags.slice(0, 4)`); `WIListView`'s equivalent row shows all tags unbounded — a small inconsistency in the same component pattern reused two different ways.
- Dark-mode CSS rule and the search-input `:focus` outline rule were both confirmed present and correctly scoped in source, but Assessment B could not visually confirm either renders under real user interaction — a known limitation of this session's headless browser pane (`:focus` doesn't engage on programmatic `.focus()` calls here), not evidence of a defect.

## Questions to Consider

1. If the three legacy Case pages are demonstrably incomplete and no longer linked from the flow diagram, what is Home's actual argument for keeping them as its only concrete content?
2. What would Home look like rebuilt from the search index itself — "34 US Work Instructions, 29 CA, 8 NAM" as the first thing a new hire sees — instead of explaining features and demonstrating one that's still unwritten?
3. DESIGN.md already specifies grouped, headinged sidebar navigation; the implementation ships a flat list instead. Would fixing the sidebar alone resolve more of this critique than anything on the Home component itself?
