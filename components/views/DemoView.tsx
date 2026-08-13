"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";

export default function DemoView() {
  const { lang, t, tf } = useLang();
  return (
    <div className="content-inner">
      <h1 className="page-title">{t("demoTitle")}</h1>
      <div className="demo-banner">⚠ {t("demoBannerText")}</div>
      {DATA.demoPath.map((id, i) => {
        const c = DATA.cases.find((x) => x.id === id);
        if (!c) return null;
        const cat = DATA.categories.find((x) => x.id === c.category);
        return (
          <Link href={`/case/${id}`} className="path-step" key={id}>
            <div className="path-index">{i + 1}</div>
            <div>
              <h2 style={{ margin: "0 0 2px", fontSize: 14.5 }}>{tf(c, "title")}</h2>
              <small style={{ color: "var(--ink-faint)" }}>
                {cat ? (lang === "es" ? cat.name_es : cat.name_en) : ""}
              </small>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
