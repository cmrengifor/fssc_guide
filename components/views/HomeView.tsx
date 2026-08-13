"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";
import type { Case } from "@/lib/types";

function CaseCard({ c }: { c: Case }) {
  const { tf } = useLang();
  return (
    <Link href={`/case/${c.id}`} className="case-card">
      <div>
        <h3>{tf(c, "title")}</h3>
        <div className="case-tags">
          {c.tags.slice(0, 4).map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <span className="chevron">›</span>
    </Link>
  );
}

export default function HomeView() {
  const { t, tf } = useLang();
  return (
    <div className="content-inner">
      <h1 className="page-title">{t("homeTitle")}</h1>
      <p className="page-sub">{t("homeSub")}</p>
      <div className="quick-guide-grid">
        <div className="qg-card">
          <span className="qg-icon">⌕</span>
          <h2>{t("qgSearchTitle")}</h2>
          <p>{t("qgSearchBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon">☰</span>
          <h2>{t("qgIndexTitle")}</h2>
          <p>{t("qgIndexBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon">⋔</span>
          <h2>{t("qgFlowTitle")}</h2>
          <p>{t("qgFlowBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon">§</span>
          <h2>{t("qgGlossaryTitle")}</h2>
          <p>{t("qgGlossaryBody")}</p>
        </div>
      </div>
      {DATA.categories.map((cat) => (
        <div className="category-block" style={{ marginTop: 30 }} key={cat.id}>
          <h2 className="category-title">{tf(cat, "name")}</h2>
          {DATA.cases.filter((c) => c.category === cat.id).map((c) => (
            <CaseCard c={c} key={c.id} />
          ))}
        </div>
      ))}
    </div>
  );
}
