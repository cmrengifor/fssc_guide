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
- Full-text search across Work Instruction titles/tags, case titles, and glossary term names + definitions.
- 41-term glossary of Oracle/AP-specific vocabulary and internal system names, aimed at readers who are either non-native English speakers or English-native but new to Oracle AP.
- Interactive flow diagram (currently: the 3-way invoice match process) whose nodes deep-link to the exact step of the exact Work Instruction for the viewer's region. Three deliberate rules govern it: (a) content resolves per-region — a node with no equivalent procedure in a given region renders as a non-clickable "pending" state rather than guessing or borrowing another region's steps; (b) three older placeholder "Case" pages (Find Invoice / 3-Way Match / Sales Tax) are still reachable from Home, the Learning Path demo, and search, but are no longer linked from the flow diagram now that real content replaced them; (c) not every Work Instruction has Spanish steps yet — those show the English steps with a "translation pending" note rather than blocking.
- Bilingual ES/EN toggle and light/dark theme, both client-side/session-only by original design (no persistence across reloads).
- Deployment target undecided — user will deploy manually later; no hosting/intranet constraint confirmed yet.

## Brand Commitments

Organization: SGS. No formal brand system (logo, typography, color palette) was supplied — the app inherited the neutral blue/teal/green palette and Segoe UI-based type from the original single-file HTML document it was ported from. No naming, tagline, or visual identity beyond that has been confirmed as binding.

## Evidence on Hand

- 71 real Work Instructions with original source `.docx` filenames preserved per entry, and ~1,354 real Oracle screenshots (`public/assets/<wi-id>/stepN_M.png`).
- 3 original process flowchart images extracted from source documents (`public/assets/_flowcharts/`), one of which (3-way match, Canada) has been rebuilt as the interactive flow diagram.
- No testimonials, pricing, or marketing claims apply — this is an internal operations tool.

## Product Principles

1. Real content over placeholders — where a real Work Instruction exists, link to it; never fabricate a procedure or guess a step number.
2. Region correctness over completeness — a missing region's content shows as pending, not as a borrowed or incorrect region's steps.
3. Bilingual by default, not bolted on — every user-facing string ships in both ES and EN from the start; partial translation is flagged, not hidden.
4. Findability first — search and the region/category structure exist so a new hire can find one specific procedure fast, not to showcase the full catalog.

## Accessibility & Inclusion

No project-specific accessibility requirement has been established yet.
