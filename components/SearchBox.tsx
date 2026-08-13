"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { SEARCH_INDEX, type SearchIndexItem } from "@/lib/search";

export default function SearchBox() {
  const { lang, t } = useLang();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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
    ? SEARCH_INDEX.filter((item) => {
        const label = (lang === "es" ? item.label_es : item.label_en).toLowerCase();
        const tags = (item.tags || []).join(" ").toLowerCase();
        return label.includes(q) || tags.includes(q);
      })
    : [];

  function goTo(path: string) {
    setOpen(false);
    setQuery("");
    router.push(path);
  }

  function handleClick(m: SearchIndexItem) {
    if (m.type === "glossary") goTo(`/glossary#${m.id}`);
    else goTo(`/wi/${m.id}`);
  }

  const groups: Array<{ key: SearchIndexItem["type"]; label: string }> = [
    { key: "wi", label: t("srWI") },
    { key: "glossary", label: t("srGlossary") },
  ];

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
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => query && setOpen(true)}
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
                  {items.map((m, i) => (
                    <button
                      type="button"
                      className="sr-item"
                      role="option"
                      aria-selected="false"
                      key={`${g.key}-${i}`}
                      onClick={() => handleClick(m)}
                    >
                      <b>{lang === "es" ? m.label_es : m.label_en}</b>
                    </button>
                  ))}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
