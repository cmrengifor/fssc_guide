"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useProgress } from "@/lib/progress-context";
import { DATA } from "@/lib/data";

export default function LearningPathView({ regionFilter }: { regionFilter?: string }) {
  const { t, tf } = useLang();
  const { progressMap, hydrated } = useProgress();
  const regions = regionFilter ? DATA.wiRegions.filter((r) => r.id === regionFilter) : DATA.wiRegions;
  const title = regionFilter
    ? `${t("learningPathTitle")} — ${regionFilter.toUpperCase()}`
    : t("learningPathTitle");

  return (
    <div className="content-inner">
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">{t("learningPathSub")}</p>
      {regions.map((region) => {
        const path = DATA.learningPath[region.id] ?? [];
        if (!path.length) return null;
        return (
          <div className="category-block" key={region.id}>
            <h2
              className="category-title"
              style={{ color: "var(--teal)", borderBottom: "2px solid var(--teal-soft)" }}
            >
              {tf(region, "name")}
            </h2>
            {path.map((id, i) => {
              const w = DATA.workInstructions.find((x) => x.id === id);
              if (!w) return null;
              const total = (w.steps_es || w.steps_en).length;
              const done = progressMap[id]?.length ?? 0;
              const complete = hydrated && total > 0 && done >= total;
              return (
                <Link
                  href={`/wi/${id}`}
                  className={`path-step${complete ? " path-step-done" : ""}`}
                  key={id}
                >
                  <div className="path-step-main">
                    <div className="path-index" aria-hidden="true">
                      {complete ? "✓" : i + 1}
                    </div>
                    <h3>{tf(w, "title")}</h3>
                  </div>
                  {hydrated && done > 0 && (
                    <span className="progress-badge">
                      {done}/{total}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
