import type { ReactNode } from "react";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { slugify } from "@/lib/slug";

interface GlossaryMatcher {
  key: string;
  slug: string;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** One matcher per glossary term, split on " / " for compound entries like
 *  "GST / HST / PST" so each acronym matches independently against the same slug.
 *  Sorted longest-first so a more specific term wins over a shorter one it contains. */
const GLOSSARY_MATCHERS: GlossaryMatcher[] = (() => {
  const matchers: GlossaryMatcher[] = [];
  for (const g of DATA.glossary) {
    const slug = slugify(g.term_en);
    const stripped = g.term_en.replace(/\s*\([^)]*\)\s*/g, "").trim();
    const parts = stripped.includes(" / ") ? stripped.split(" / ") : [stripped];
    for (const part of parts) {
      const key = part.trim();
      if (key) matchers.push({ key, slug });
    }
  }
  return matchers.sort((a, b) => b.key.length - a.key.length);
})();

const GLOSSARY_REGEX = new RegExp(`\\b(${GLOSSARY_MATCHERS.map((m) => escapeRegex(m.key)).join("|")})\\b`, "gi");

/** Oracle field/button names the source text already quotes consistently.
 *  Capped at 50 chars so an unusually long quoted aside stays plain text
 *  instead of becoming an oversized chip. */
const FIELD_REGEX = /"([^"]{1,50})"/g;

function highlightGlossaryInSegment(text: string, seen: Set<string>, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let idx = 0;
  GLOSSARY_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = GLOSSARY_REGEX.exec(text)) !== null) {
    const matched = match[0];
    const start = match.index;
    const end = start + matched.length;
    if (lastIndex < start) nodes.push(text.slice(lastIndex, start));

    const matcher = GLOSSARY_MATCHERS.find((m) => m.key.toLowerCase() === matched.toLowerCase());
    if (matcher && !seen.has(matcher.slug)) {
      seen.add(matcher.slug);
      nodes.push(
        <Link
          href={`/glossary#${matcher.slug}`}
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

/** Renders a WI step's text with two independent, automatic highlight layers:
 *  1. Quoted Oracle field/button names become `.oracle-field` chips.
 *  2. Within the remaining plain text, the FIRST occurrence per step of each
 *     glossary term becomes a link to its `/glossary#<slug>` entry.
 *  Field chips are resolved first so a quoted UI label (e.g. "Hold" as a tab
 *  name) never gets double-treated as a glossary link too. */
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
      outer.push(...highlightGlossaryInSegment(text.slice(lastIndex, start), seen, `${keyBase}-p${idx}`));
    }
    outer.push(
      <span className="oracle-field" key={`${keyBase}-f${idx}`}>
        {match[1]}
      </span>
    );
    idx++;
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    outer.push(...highlightGlossaryInSegment(text.slice(lastIndex), seen, `${keyBase}-p${idx}`));
  }
  return outer;
}
