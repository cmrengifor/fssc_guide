"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useProgress } from "@/lib/progress-context";
import { DATA } from "@/lib/data";

export default function WIDetailView({ id }: { id: string }) {
  const { lang, t, tf } = useLang();
  const { isStepDone, toggleStep, wiProgress, markVisited, hydrated } = useProgress();
  const w = DATA.workInstructions.find((x) => x.id === id);
  const [highlightedStep, setHighlightedStep] = useState<string | null>(null);

  useEffect(() => {
    function syncToHash() {
      const hash = window.location.hash.slice(1);
      if (!hash.startsWith("step-")) return;
      setHighlightedStep(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
      const timer = setTimeout(() => setHighlightedStep(null), 2400);
      return () => clearTimeout(timer);
    }
    const cleanup = syncToHash();
    window.addEventListener("hashchange", syncToHash);
    return () => {
      window.removeEventListener("hashchange", syncToHash);
      cleanup?.();
    };
  }, [id]);

  useEffect(() => {
    if (!hydrated) return;
    markVisited(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, hydrated]);

  if (!w) return <div className="content-inner">Not found</div>;
  const cat = DATA.wiCategories.find((x) => x.id === w.category);
  const region = DATA.wiRegions.find((x) => x.id === w.region);
  const steps = w.steps_es || w.steps_en;
  const tips = w.tips_es || w.tips_en;
  const progress = wiProgress(w.id, steps.length);

  return (
    <div className="content-inner">
      <Link href={`/wi/region/${w.region}`} className="back-link">
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
        {hydrated && progress.done > 0 && (
          <span className="wi-progress">
            {progress.done}/{progress.total} {t("progressStepsLabel")}
          </span>
        )}
      </div>
      {tips && tips.length > 0 && (
        <div className="tip-box">
          <span className="tip-box-icon" aria-hidden="true">
            💡
          </span>
          <div>
            <span className="tip-box-label">{t("tipBoxLabel")}</span>
            <ul>
              {tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <h2 className="section-label">{t("stepsLabel")}</h2>
      <ol className="steps-list">
        {steps.map((s, i) => (
          <li key={i} id={`step-${i + 1}`} className={highlightedStep === `step-${i + 1}` ? "step-highlighted" : ""}>
            <label className="step-check">
              <input
                type="checkbox"
                className="step-check-input"
                checked={isStepDone(w.id, i + 1)}
                onChange={() => toggleStep(w.id, i + 1)}
                aria-label={`${t("stepDoneAriaLabel")} ${i + 1}`}
              />
              <span>{s}</span>
            </label>
            {w.images && w.images[i] && w.images[i].length ? (
              w.images[i].map((src, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={`/${src}`}
                  alt={`${tf(w, "title")} — ${t("stepsLabel")} ${i + 1}${w.images[i].length > 1 ? `.${j + 1}` : ""}`}
                  className="wi-step-img"
                  loading="lazy"
                />
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
