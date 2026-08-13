"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";
import type { WIRegion } from "@/lib/types";

function RegionCard({ region }: { region: WIRegion }) {
  const { t, tf } = useLang();
  const count = DATA.workInstructions.filter((w) => w.region === region.id).length;
  return (
    <Link href={`/wi/region/${region.id}`} className="case-card">
      <div>
        <h3>{tf(region, "name")}</h3>
        <p className="page-sub" style={{ margin: "2px 0 0", fontSize: 13 }}>
          {count} {t("homeCatalogCount")}
        </p>
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
      <div className="category-block" style={{ marginTop: 30 }}>
        <h2 className="category-title">{t("homeCatalogTitle")}</h2>
        <p className="page-sub" style={{ marginTop: -4 }}>
          {t("homeCatalogSub")}
        </p>
        {DATA.wiRegions.map((region) => (
          <RegionCard region={region} key={region.id} />
        ))}
      </div>
    </div>
  );
}
