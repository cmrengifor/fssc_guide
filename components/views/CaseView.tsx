"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";

export default function CaseView({ id }: { id: string }) {
  const { lang, t, tf } = useLang();
  const c = DATA.cases.find((x) => x.id === id);
  if (!c) return <div className="content-inner">Not found</div>;
  const cat = DATA.categories.find((x) => x.id === c.category);

  return (
    <div className="content-inner">
      <Link href="/" className="back-link">
        ← {t("backToCases")}
      </Link>
      <div className="case-header">
        {cat && <span className="case-cat-pill">{tf(cat, "name")}</span>}
        <h1 className="page-title">{tf(c, "title")}</h1>
        <div className="case-tags">
          {c.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h2 className="section-label">{t("stepsLabel")}</h2>
      <ol className="steps-list">
        {(lang === "es" ? c.steps_es : c.steps_en).map((s, i) => (
          <li key={i}>
            {s}
            <div className="img-placeholder">🖼 {t("imgPending")}</div>
          </li>
        ))}
      </ol>

      <h2 className="section-label">{t("checklistLabel")}</h2>
      <div className="card">
        <ul className="checklist">
          {(lang === "es" ? c.checklist_es : c.checklist_en).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <h2 className="section-label">{t("errorsLabel")}</h2>
      {c.errors.length ? (
        c.errors.map((err) => (
          <div className="error-card" key={err.id}>
            <h3>⚠ {tf(err, "title")}</h3>
            <ol className="steps-list">
              {(lang === "es" ? err.steps_es : err.steps_en).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        ))
      ) : (
        <p className="pending-note">{t("contentPendingNote")}</p>
      )}
    </div>
  );
}
