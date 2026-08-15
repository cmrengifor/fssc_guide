"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";

/** Search-and-select field for linking one real Work Instruction by id.
 *  Filters the live catalog (title + tags, both languages) as you type —
 *  reuses the same result-row styling as the topbar SearchBox. */
export default function WIPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (wiId: string | undefined) => void;
}) {
  const { t, tf } = useLang();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = value ? DATA.workInstructions.find((w) => w.id === value) : undefined;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const q = query.trim().toLowerCase();
  const matches = q
    ? DATA.workInstructions
        .filter((w) => {
          const title = `${w.title_es} ${w.title_en}`.toLowerCase();
          const tags = w.tags.map((tag) => `${tag.es} ${tag.en}`).join(" ").toLowerCase();
          return title.includes(q) || tags.includes(q);
        })
        .slice(0, 8)
    : [];

  if (selected) {
    return (
      <div className="wi-picker-selected">
        <span>
          {t("incidentLinkedWiLabel")}: <strong>{tf(selected, "title")}</strong>
        </span>
        <button type="button" className="wi-picker-clear" onClick={() => onChange(undefined)} aria-label={t("wiPickerClear")}>
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="search-wrap wi-picker" ref={wrapRef}>
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        placeholder={t("wiPickerPlaceholder")}
        aria-label={t("wiPickerPlaceholder")}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
      />
      {open && q && (
        <div className="search-results open">
          {matches.length === 0 ? (
            <div className="sr-empty">{t("wiPickerNoResults")}</div>
          ) : (
            matches.map((w) => (
              <button
                type="button"
                className="sr-item"
                key={w.id}
                onClick={() => {
                  onChange(w.id);
                  setQuery("");
                  setOpen(false);
                }}
              >
                <b>{tf(w, "title")}</b>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
