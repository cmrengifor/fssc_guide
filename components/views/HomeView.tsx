"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useProgress } from "@/lib/progress-context";
import { DATA } from "@/lib/data";
import type { WIRegion } from "@/lib/types";
import ReminderPanel from "@/components/ReminderPanel";

function RegionCard({ region }: { region: WIRegion }) {
  const { t, tf } = useLang();
  const { progressMap, hydrated } = useProgress();
  const regionWIs = DATA.workInstructions.filter((w) => w.region === region.id);
  const inProgressCount = regionWIs.filter((w) => {
    const done = progressMap[w.id]?.length ?? 0;
    const total = (w.steps_es || w.steps_en).length;
    return done > 0 && done < total;
  }).length;
  return (
    <Link href={`/wi/region/${region.id}`} className="case-card">
      <div>
        <h3>{tf(region, "name")}</h3>
        <span className="case-card-count">
          {regionWIs.length} {t("homeCatalogCount")}
          {hydrated && inProgressCount > 0 && ` · ${inProgressCount} ${t("progressInProgressLabel")}`}
        </span>
      </div>
      <span className="chevron" aria-hidden="true">
        ›
      </span>
    </Link>
  );
}

export default function HomeView() {
  const { t } = useLang();
  return (
    <div className="content-inner">
      <h1 className="page-title">{t("homeTitle")}</h1>
      <p className="page-sub">{t("homeSub")}</p>
      <ReminderPanel />
      <div className="quick-guide-grid">
        <div className="qg-card">
          <span className="qg-icon" aria-hidden="true">
            ⌕
          </span>
          <h2>{t("qgSearchTitle")}</h2>
          <p>{t("qgSearchBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon" aria-hidden="true">
            ☰
          </span>
          <h2>{t("qgIndexTitle")}</h2>
          <p>{t("qgIndexBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon" aria-hidden="true">
            ⋔
          </span>
          <h2>{t("qgFlowTitle")}</h2>
          <p>{t("qgFlowBody")}</p>
        </div>
        <div className="qg-card">
          <span className="qg-icon" aria-hidden="true">
            §
          </span>
          <h2>{t("qgGlossaryTitle")}</h2>
          <p>{t("qgGlossaryBody")}</p>
        </div>
      </div>
      <div className="category-block">
        <h2 className="category-title">{t("homeCatalogTitle")}</h2>
        <p className="category-sub">{t("homeCatalogSub")}</p>
        {DATA.wiRegions.map((region) => (
          <RegionCard region={region} key={region.id} />
        ))}
      </div>
    </div>
  );
}
