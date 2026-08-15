"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";
import type { HoldCategory } from "@/lib/types";

const CATEGORIES: { id: HoldCategory; labelKey: string }[] = [
  { id: "procurement", labelKey: "holdsCategoryProcurement" },
  { id: "invoice-processing", labelKey: "holdsCategoryInvoiceProcessing" },
];

export default function HoldsView() {
  const { t, tf } = useLang();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    function syncToHash() {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      setHighlighted(hash);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(hash)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
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
      <h1 className="page-title">{t("holdsTitle")}</h1>
      <p className="page-sub">{t("holdsSub")}</p>
      <p className="pending-note">{t("holdsPendingNote")}</p>
      {CATEGORIES.map((cat) => {
        const items = DATA.holds.filter((h) => h.category === cat.id);
        if (!items.length) return null;
        return (
          <div className="category-block" key={cat.id}>
            <h2 className="category-title">{t(cat.labelKey)}</h2>
            {items.map((h) => (
              <div
                className={`glossary-item ${highlighted === h.id ? "step-highlighted" : ""}`}
                id={h.id}
                key={h.id}
              >
                <b>{h.code}</b>
                <p>{tf(h, "def")}</p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
