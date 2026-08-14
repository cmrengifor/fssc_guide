"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useProgress } from "@/lib/progress-context";
import { DATA } from "@/lib/data";

export default function WIListView({ regionFilter }: { regionFilter?: string }) {
  const { t, tf } = useLang();
  const { wiProgress, hydrated } = useProgress();
  const regions = regionFilter ? DATA.wiRegions.filter((r) => r.id === regionFilter) : DATA.wiRegions;
  const title = regionFilter
    ? `${t("wiListTitle")} — ${regionFilter.toUpperCase()}`
    : t("wiListTitle");

  return (
    <div className="content-inner">
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">{t("wiListSub")}</p>
      {regions.map((region) => (
        <div className="category-block" key={region.id}>
          <h2 className="category-title" style={{ color: "var(--teal)", borderBottom: "2px solid var(--teal-soft)" }}>
            {tf(region, "name")}
          </h2>
          {DATA.wiCategories.map((cat) => {
            const items = DATA.workInstructions.filter((w) => w.region === region.id && w.category === cat.id);
            if (!items.length) return null;
            return (
              <div key={cat.id}>
                <h3 className="category-title" style={{ fontSize: 11, marginLeft: 10 }}>
                  {tf(cat, "name")}
                </h3>
                {items.map((w) => {
                  const progress = wiProgress(w.id, w.stepCount);
                  return (
                    <Link href={`/wi/${w.id}`} className="case-card" key={w.id}>
                      <div>
                        <h4>{tf(w, "title")}</h4>
                        <div className="case-tags">
                          {w.tags.map((tag) => (
                            <span className="tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="case-card-trailing">
                        {hydrated && progress.done > 0 && (
                          <span className="progress-badge">
                            {progress.done}/{progress.total}
                          </span>
                        )}
                        <span className="chevron">›</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
