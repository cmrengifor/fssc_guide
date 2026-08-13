"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";

export default function WIListView() {
  const { t, tf } = useLang();
  return (
    <div className="content-inner">
      <h1 className="page-title">{t("wiListTitle")}</h1>
      <p className="page-sub">{t("wiListSub")}</p>
      {DATA.wiRegions.map((region) => (
        <div className="category-block" key={region.id}>
          <div className="category-title" style={{ color: "var(--teal)", borderBottom: "2px solid var(--teal-soft)" }}>
            {tf(region, "name")}
          </div>
          {DATA.wiCategories.map((cat) => {
            const items = DATA.workInstructions.filter((w) => w.region === region.id && w.category === cat.id);
            if (!items.length) return null;
            return (
              <div key={cat.id}>
                <div className="category-title" style={{ fontSize: 11, marginLeft: 10 }}>
                  {tf(cat, "name")}
                </div>
                {items.map((w) => (
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
                    <span className="chevron">›</span>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
