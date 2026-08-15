import type { ReactNode } from "react";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { slugify } from "@/lib/slug";

interface InlineTermMatcher {
  key: string;
  href: string;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** One matcher per glossary term, split on " / " for compound entries like
 *  "GST / HST / PST" so each acronym matches independently against the same slug. */
const GLOSSARY_MATCHERS: InlineTermMatcher[] = (() => {
  const matchers: InlineTermMatcher[] = [];
  for (const g of DATA.glossary) {
    const slug = slugify(g.term_en);
    const stripped = g.term_en.replace(/\s*\([^)]*\)\s*/g, "").trim();
    const parts = stripped.includes(" / ") ? stripped.split(" / ") : [stripped];
    for (const part of parts) {
      const key = part.trim();
      if (key) matchers.push({ key, href: `/glossary#${slug}` });
    }
  }
  return matchers;
})();

/** Known Oracle hold codes, cross-linked to their /holds entry wherever they
 *  appear in WI step/tip text. "Price" is deliberately excluded — as a bare
 *  common word it collides too often with ordinary invoice-price prose to
 *  auto-link safely; it's still documented on the Holds page itself. */
const HOLD_MATCHERS: InlineTermMatcher[] = DATA.holds
  .filter((h) => h.code.toLowerCase() !== "price")
  .map((h) => ({ key: h.code, href: `/holds#${h.id}` }));

/** Combined glossary + hold-code matchers, sorted longest-key-first so a more
 *  specific term wins over a shorter one it contains. */
const INLINE_TERM_MATCHERS: InlineTermMatcher[] = [...GLOSSARY_MATCHERS, ...HOLD_MATCHERS].sort(
  (a, b) => b.key.length - a.key.length
);

const INLINE_TERM_REGEX = new RegExp(
  `\\b(${INLINE_TERM_MATCHERS.map((m) => escapeRegex(m.key)).join("|")})\\b`,
  "gi"
);

/** Oracle field/button names the source text already quotes consistently.
 *  Capped at 50 chars so an unusually long quoted aside stays plain text
 *  instead of becoming an oversized chip. */
const FIELD_REGEX = /"([^"]{1,50})"/g;

function highlightInlineTermsInSegment(text: string, seen: Set<string>, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let idx = 0;
  INLINE_TERM_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = INLINE_TERM_REGEX.exec(text)) !== null) {
    const matched = match[0];
    const start = match.index;
    const end = start + matched.length;
    if (lastIndex < start) nodes.push(text.slice(lastIndex, start));

    const matcher = INLINE_TERM_MATCHERS.find((m) => m.key.toLowerCase() === matched.toLowerCase());
    if (matcher && !seen.has(matcher.href)) {
      seen.add(matcher.href);
      nodes.push(
        <Link
          href={matcher.href}
          className="glossary-inline"
          key={`${keyBase}-g${idx++}`}
          onClick={(e) => e.stopPropagation()}
        >
          {matched}
        </Link>
      );
    } else {
      nodes.push(matched);
    }
    lastIndex = end;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

/** Renders a WI step or tip's text with two independent, automatic highlight
 *  layers:
 *  1. Quoted Oracle field/button names become `.oracle-field` chips.
 *  2. Within the remaining plain text, the FIRST occurrence per call of each
 *     known term (a glossary entry or an Oracle hold code) becomes a link to
 *     its `/glossary#<slug>` or `/holds#<slug>` entry.
 *  Field chips are resolved first so a quoted UI label (e.g. "Hold" as a tab
 *  name) never gets double-treated as a glossary link too — a quoted label
 *  names an on-screen element, which isn't always the same as the concept.
 *  Hold codes are the one exception: a quoted "Qty Rec" is never a UI label,
 *  it's always the hold reason itself, so an exact quoted match still links
 *  (rendered as the same chip shape, just clickable) instead of going plain. */
export function highlightStepText(text: string, keyBase: string): ReactNode[] {
  const seen = new Set<string>();
  const outer: ReactNode[] = [];
  let lastIndex = 0;
  let idx = 0;
  FIELD_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = FIELD_REGEX.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (lastIndex < start) {
      outer.push(...highlightInlineTermsInSegment(text.slice(lastIndex, start), seen, `${keyBase}-p${idx}`));
    }
    const quoted = match[1];
    const holdMatch = HOLD_MATCHERS.find((h) => h.key.toLowerCase() === quoted.toLowerCase());
    if (holdMatch && !seen.has(holdMatch.href)) {
      seen.add(holdMatch.href);
      outer.push(
        <Link
          href={holdMatch.href}
          className="oracle-field oracle-field-link"
          key={`${keyBase}-f${idx}`}
          onClick={(e) => e.stopPropagation()}
        >
          {quoted}
        </Link>
      );
    } else {
      outer.push(
        <span className="oracle-field" key={`${keyBase}-f${idx}`}>
          {quoted}
        </span>
      );
    }
    idx++;
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    outer.push(...highlightInlineTermsInSegment(text.slice(lastIndex), seen, `${keyBase}-p${idx}`));
  }
  return outer;
}

/** Wraps the first case-insensitive occurrence of `query` in `text` with a
 *  `<mark>` so a search match is visible exactly where it landed. Returns
 *  the plain text unchanged when there's no match or no query. Uses plain
 *  indexOf (not a dynamic RegExp) since `query` is raw user input. */
export function highlightQuery(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-match">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

/** Extracts a short excerpt of `text` centered on the first match of `query`,
 *  with ellipses where the excerpt was truncated. Used when a search result
 *  matched on a tag or definition that isn't otherwise shown, so the reader
 *  can still see *why* it matched. Returns null when there's no match. */
export function buildSnippet(text: string, query: string, radius = 40): string | null {
  const q = query.trim();
  if (!q) return null;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return null;
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + q.length + radius);
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}
