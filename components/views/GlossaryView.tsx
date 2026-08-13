"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";
import { slugify } from "@/lib/slug";

export default function GlossaryView() {
  const { t, tf } = useLang();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    function syncToHash() {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      setHighlighted(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
      const timer = setTimeout(() => setHighlighted(null), 2400);
      return () => clearTimeout(timer);
    }
    const cleanup = syncToHash();
    window.addEventListener("hashchange", syncToHash);
    return () => {
      window.removeEventListener("hashchange", syncToHash);
      cleanup?.();
    };
  }, []);

  return (
    <div className="content-inner">
      <h1 className="page-title">{t("glossaryTitle")}</h1>
      <p className="page-sub">{t("glossarySub")}</p>
      {DATA.glossary.map((g) => {
        const slug = slugify(g.term_en);
        return (
          <div
            className={`glossary-item ${highlighted === slug ? "step-highlighted" : ""}`}
            id={slug}
            key={g.term_en}
          >
            <b>{tf(g, "term")}</b>
            <p>{tf(g, "def")}</p>
          </div>
        );
      })}
    </div>
  );
}
