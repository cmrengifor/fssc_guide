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
        <h4>{tf(c, "title")}</h4>
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
          <h4>{t("qgSearchTitle")}</h4>
          <p>{t("qgSearchBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon">☰</span>
          <h4>{t("qgIndexTitle")}</h4>
          <p>{t("qgIndexBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon">⋔</span>
          <h4>{t("qgFlowTitle")}</h4>
          <p>{t("qgFlowBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon">§</span>
          <h4>{t("qgGlossaryTitle")}</h4>
          <p>{t("qgGlossaryBody")}</p>
        </div>
      </div>
      {DATA.categories.map((cat) => (
        <div className="category-block" style={{ marginTop: 30 }} key={cat.id}>
          <div className="category-title">{tf(cat, "name")}</div>
          {DATA.cases.filter((c) => c.category === cat.id).map((c) => (
            <CaseCard c={c} key={c.id} />
          ))}
        </div>
      ))}
    </div>
  );
}
