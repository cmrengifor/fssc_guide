# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: new hires on SGS's Accounts Payable team, at the point of onboarding into Oracle Applications (Oracle EBS via the internal "BOSS" portal). Secondary: bilingual (Spanish/English) staff and English-native staff who are new to Oracle AP terminology and need a glossary to bridge the gap.

## Product Purpose

A searchable, bilingual (ES/EN) training reference for SGS's Accounts Payable procedures in Oracle Applications. Ported from a single-file HTML training document into a navigable app so a new hire can look up one specific process by keyword, region, or category instead of scrolling one long document. Success = a new hire finds the exact step of the exact procedure for their region without asking a colleague.

## Positioning

N/A — internal training tool, not a market-facing product with competitors.

## Operating Context

Users work live inside Oracle Applications (via the internal BOSS portal, https://BOSS.sgs.net/) while consulting the guide side-by-side. Procedures reference real Oracle screens, "Responsibility" login roles, and third-party systems staff also touch day-to-day: Citibank/CitiDirect, WinSCP, Xerox OCR invoice import, Egencia (travel booking), DocuSign. Work is organized around three regions — United States (US), Canada (CA), and North America multi-country (NAM) — each with its own set of Work Instructions and, for some processes, its own flow diagram.

## Capabilities and Constraints

- 71 authored Work Instructions (real, non-placeholder step-by-step Oracle procedures), each tagged by region (us/ca/nam) and category (Supplier Management, Banking & Payments, Travel & Expense, Payroll & Tax, Invoice Processing, Close & Reporting), with ~1,354 real screenshots.
- Full-text search across Work Instruction titles/tags and glossary term names + definitions.
- 41-term glossary of Oracle/AP-specific vocabulary and internal system names, aimed at readers who are either non-native English speakers or English-native but new to Oracle AP.
- Interactive flow diagrams whose nodes deep-link to the exact step of the exact Work Instruction for the viewer's region — one diagram per real business process, not one diagram per region: the 3-way invoice match process (CA and US, sharing a single diagram since both regions follow the same PO-matching flow) and, separately, NAM's manual utility-invoice process (a genuinely different, non-PO-driven flow, its own diagram). Deliberate rules govern them: (a) content resolves per-region — a node with no equivalent procedure in a given region renders as a non-clickable "pending" state rather than guessing or borrowing another region's steps; (b) not every Work Instruction has Spanish steps yet — those show the English steps with a "translation pending" note rather than blocking; (c) the original raster flowchart images the diagrams were modeled on have been removed from the app now that every region has a fully interactive equivalent — they were reference material for building the diagrams, not a shipped feature.
- Learning Path: a curated, region-aware onboarding sequence of real Work Instructions (not the full 71-item catalog — a suggested subset per region), reachable at `/demo/region/<id>`. Replaced an earlier "Wave 1 Demo" scaffold that pointed at 3 thin placeholder pages; those placeholder pages and their underlying data model have been deleted outright, not just unlinked.
- Interactive per-step checklist on every Work Instruction: each step has a real checkbox: completing steps updates a visible progress indicator (e.g. "5/8"), surfaced again on Work Instruction list cards, Home's region cards, and the Learning Path's own step markers (a completed WI shows a checkmark instead of its sequence number).
- Home "Reminders" panel: a "continue where you left off" card (last-visited, still-incomplete WI, deep-linking to the next unchecked step) plus a "pending items" list of other in-progress WIs. Renders nothing for first-time visitors with no progress yet — no empty/placeholder state.
- A small set of high-traffic Work Instructions carry curated "tip" callouts — short reminders grounded in that WI's own step text (never invented advice), rendered above the steps list.
- Progress/checklist state persists in the browser via `localStorage`, scoped strictly to that data — the one deliberate exception to the app's otherwise session-only design. Language stays session-only by original design (no persistence across reloads). Theme also doesn't persist, but reads the OS's `prefers-color-scheme` as a one-time initial value each load (via a blocking inline script, so there's no light-mode flash before switching) — an initial read is not persistence, so it doesn't conflict with the session-only rule.
- Client data is split by weight: `DATA` (glossary, flow diagrams, regions, and a lightweight per-WI slice — id/title/tags/category/step-count) ships to every route, while the actual step text, screenshots, and tips for all 71 Work Instructions (~575KB) load only on the WI detail page that needs them, via a separate module (`lib/wi-detail.ts`) never imported from `lib/data.ts`. Home and every list/catalog view compute counts and progress from `stepCount` alone, never the full step content.
- Deployment target undecided — user will deploy manually later; no hosting/intranet constraint confirmed yet.

## Brand Commitments

Organization: SGS. No formal brand system (logo, typography, color palette) was supplied — the app inherited the neutral blue/teal/green palette and Segoe UI-based type from the original single-file HTML document it was ported from. No naming, tagline, or visual identity beyond that has been confirmed as binding.

## Evidence on Hand

- 71 real Work Instructions with original source `.docx` filenames preserved per entry, and ~1,354 real Oracle screenshots (`public/assets/<wi-id>/stepN_M.png`).
- 3 original process flowchart images were extracted from source documents during development and used to model the interactive flow diagrams (3-way match/CA, CAD taxes reference, manual utility invoice/NAM); the raster images themselves have since been removed — the interactive diagrams now cover CA, US, and NAM.
- No testimonials, pricing, or marketing claims apply — this is an internal operations tool.

## Product Principles

1. Real content over placeholders — where a real Work Instruction exists, link to it; never fabricate a procedure or guess a step number.
2. Region correctness over completeness — a missing region's content shows as pending, not as a borrowed or incorrect region's steps.
3. Bilingual by default, not bolted on — every user-facing string ships in both ES and EN from the start; partial translation is flagged, not hidden.
4. Findability first — search and the region/category structure exist so a new hire can find one specific procedure fast, not to showcase the full catalog.
5. Persistence is the exception, not the default — only progress/checklist state survives a reload; every other preference (language, theme) stays session-only unless a future decision explicitly extends that.

## Accessibility & Inclusion

No formal requirement (e.g. WCAG level target) was ever specified, but a real, verified baseline has been built and audited over the course of development, not left as an open gap: WCAG AA contrast checked computationally (not eyeballed) for every color pairing in both themes; full keyboard operability including the search combobox's arrow/Enter/Escape handling and a real `aria-activedescendant`-tracked listbox; 44px touch targets under `pointer:coarse`; `inert` on the off-canvas mobile sidebar when closed; `prefers-reduced-motion` respected everywhere motion exists; real semantic headings (not styled `div`s) throughout, including sidebar navigation; and `aria-label`/`aria-pressed` on icon-only controls like the theme toggle.
