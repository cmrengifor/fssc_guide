"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { useIncidents } from "@/lib/incidents-context";
import { SEARCH_INDEX, buildIncidentSearchItems, type SearchIndexItem } from "@/lib/search";
import { highlightQuery, buildSnippet } from "@/lib/highlight";

export default function SearchBox() {
  const { lang, t } = useLang();
  const router = useRouter();
  const { incidents } = useIncidents();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Incidents live in localStorage, not the static DATA SEARCH_INDEX is built
  // from — merged in per-render so newly created/edited incidents show up live.
  const fullIndex = useMemo(
    () => [...SEARCH_INDEX, ...buildIncidentSearchItems(incidents)],
    [incidents]
  );

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
  const matches: SearchIndexItem[] = q
    ? fullIndex.filter((item) => {
        const label = (lang === "es" ? item.label_es : item.label_en).toLowerCase();
        const tags = (item.tags || []).join(" ").toLowerCase();
        return label.includes(q) || tags.includes(q);
      })
    : [];

  const groups: Array<{ key: SearchIndexItem["type"]; label: string }> = [
    { key: "incident", label: t("srIncidents") },
    { key: "wi", label: t("srWI") },
    { key: "glossary", label: t("srGlossary") },
  ];

  // Flat, top-to-bottom order matching the rendered groups, so arrow-key
  // navigation and aria-activedescendant agree with what's on screen.
  const orderedMatches = groups.flatMap((g) => matches.filter((m) => m.type === g.key));

  function goTo(path: string) {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
    router.push(path);
  }

  function handleClick(m: SearchIndexItem) {
    if (m.type === "glossary") goTo(`/glossary#${m.id}`);
    else if (m.type === "incident") goTo(`/incidents#${m.id}`);
    else goTo(`/wi/${m.id}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || orderedMatches.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, orderedMatches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && orderedMatches[activeIndex]) {
        e.preventDefault();
        handleClick(orderedMatches[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="search-wrap" ref={wrapRef}>
      <span className="search-icon">⌕</span>
      <input
        type="text"
        className="search-input"
        placeholder={t("searchPlaceholder")}
        aria-label={t("searchPlaceholder")}
        role="combobox"
        aria-expanded={open && !!q}
        aria-controls="search-results-listbox"
        aria-autocomplete="list"
        aria-activedescendant={activeIndex >= 0 ? `sr-opt-${activeIndex}` : undefined}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {open && q && (
        <div className="search-results open" role="listbox" id="search-results-listbox">
          {matches.length === 0 ? (
            <div className="sr-empty">{t("srEmpty")}</div>
          ) : (
            groups.map((g) => {
              const items = matches.filter((m) => m.type === g.key);
              if (!items.length) return null;
              return (
                <div key={g.key} role="group" aria-label={g.label}>
                  <div className="sr-group-label">{g.label}</div>
                  {items.map((m) => {
                    const flatIndex = orderedMatches.indexOf(m);
                    const label = lang === "es" ? m.label_es : m.label_en;
                    const labelMatches = label.toLowerCase().includes(q);
                    const matchingTag = !labelMatches
                      ? (m.tags || []).find((tag) => tag.toLowerCase().includes(q))
                      : undefined;
                    const snippet = matchingTag ? buildSnippet(matchingTag, q) : null;
                    return (
                      <button
                        type="button"
                        className={`sr-item ${activeIndex === flatIndex ? "active" : ""}`}
                        role="option"
                        id={`sr-opt-${flatIndex}`}
                        aria-selected={activeIndex === flatIndex}
                        key={`${g.key}-${flatIndex}`}
                        onClick={() => handleClick(m)}
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                      >
                        <b>
                          {m.priority && (
                            <span className={`nav-icon-priority-${m.priority}`} aria-hidden="true">
                              ●{" "}
                            </span>
                          )}
                          {labelMatches ? highlightQuery(label, q) : label}
                        </b>
                        {snippet && <small>{highlightQuery(snippet, q)}</small>}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
