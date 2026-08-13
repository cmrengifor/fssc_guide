"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";

export default function WIDetailView({ id }: { id: string }) {
  const { lang, t, tf } = useLang();
  const w = DATA.workInstructions.find((x) => x.id === id);
  if (!w) return <div className="content-inner">Not found</div>;
  const cat = DATA.wiCategories.find((x) => x.id === w.category);
  const region = DATA.wiRegions.find((x) => x.id === w.region);
  const steps = w.steps_es || w.steps_en;

  return (
    <div className="content-inner">
      <Link href="/wi" className="back-link">
        ← {t("backToCases")}
      </Link>
      <div className="case-header">
        {region && (
          <span className="case-cat-pill" style={{ background: "var(--teal-soft)", color: "var(--teal)" }}>
            {tf(region, "name")}
          </span>
        )}
        {cat && <span className="case-cat-pill">{tf(cat, "name")}</span>}
        <h1 className="page-title">{tf(w, "title")}</h1>
        <p className="page-sub">{tf(w, "objective")}</p>
        <p className="pending-note">
          {t("wiSourceLabel")}: {w.sourceDoc}
        </p>
        {!w.steps_es && lang === "es" && <p className="pending-note">{t("wiPendingTranslation")}</p>}
        <div className="case-tags">
          {w.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="section-label">{t("stepsLabel")}</div>
      <ol className="steps-list">
        {steps.map((s, i) => (
          <li key={i}>
            {s}
            {w.images && w.images[i] && w.images[i].length ? (
              w.images[i].map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={`/${src}`} alt="" className="wi-step-img" loading="lazy" />
              ))
            ) : (
              <div className="img-placeholder">🖼 {t("wiImageNote")}</div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
