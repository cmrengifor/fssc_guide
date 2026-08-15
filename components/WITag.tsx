"use client";

import { useLang } from "@/lib/lang-context";
import type { WorkInstructionTag } from "@/lib/types";

/** Renders one WI keyword pill in the current language. When the term actually
 *  differs between languages, it's highlighted and hovering (or focusing, when
 *  `interactive`) reveals the other language's version as a quick translation. */
export default function WITag({
  tag,
  interactive = false,
}: {
  tag: WorkInstructionTag;
  interactive?: boolean;
}) {
  const { lang } = useLang();
  const display = lang === "es" ? tag.es : tag.en;
  const other = lang === "es" ? tag.en : tag.es;

  if (display === other) {
    return <span className="tag">{display}</span>;
  }

  return (
    <span
      className="tag tag-translated"
      data-tooltip={other}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${display} (${other})`}
    >
      {display}
    </span>
  );
}
