"use client";

import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";

export default function GlossaryView() {
  const { t, tf } = useLang();
  return (
    <div className="content-inner">
      <h1 className="page-title">{t("glossaryTitle")}</h1>
      <p className="page-sub">{t("glossarySub")}</p>
      {DATA.glossary.map((g) => (
        <div className="glossary-item" key={g.term_en}>
          <b>{tf(g, "term")}</b>
          <p>{tf(g, "def")}</p>
        </div>
      ))}
    </div>
  );
}
