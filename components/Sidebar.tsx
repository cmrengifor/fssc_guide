"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { DATA } from "@/lib/data";

export default function Sidebar() {
  const { t, tf } = useLang();
  const pathname = usePathname();

  return (
    <nav className="sidebar">
      <div className="nav-section">
        <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
          <span className="nav-icon">⌂</span>
          {t("navHome")}
        </Link>
        <Link href="/demo" className={`nav-item ${pathname === "/demo" ? "active" : ""}`}>
          <span className="nav-icon">▸</span>
          {t("navDemo")}
          <span className="badge-demo">{t("demoBadge")}</span>
        </Link>
        <Link href="/flow" className={`nav-item ${pathname === "/flow" ? "active" : ""}`}>
          <span className="nav-icon">⋔</span>
          {t("navFlow")}
        </Link>
        <Link href="/wi" className={`nav-item ${pathname === "/wi" ? "active" : ""}`}>
          <span className="nav-icon">▤</span>
          {t("navWI")}
        </Link>
        <Link href="/glossary" className={`nav-item ${pathname === "/glossary" ? "active" : ""}`}>
          <span className="nav-icon">§</span>
          {t("navGlossary")}
        </Link>
      </div>

      <div className="nav-divider" />
      <div className="nav-caption">{t("navCasesCaption")}</div>
      {DATA.categories.map((cat) => {
        const cases = DATA.cases.filter((c) => c.category === cat.id);
        return (
          <div key={cat.id}>
            <div className="nav-cat-label">{tf(cat, "name")}</div>
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/case/${c.id}`}
                className={`nav-item ${pathname === `/case/${c.id}` ? "active" : ""}`}
              >
                <span className="nav-icon">›</span>
                {tf(c, "title")}
              </Link>
            ))}
          </div>
        );
      })}

      <div className="nav-divider" />
      <div className="nav-caption">{t("navWI")}</div>
      <div className="nav-caption" style={{ marginTop: 0 }}>
        {t("navRegionCaption")}
      </div>
      {DATA.wiRegions.map((region) => (
        <div key={region.id}>
          <div className="nav-cat-label" style={{ color: "var(--teal)" }}>
            {tf(region, "name")}
          </div>
          {DATA.wiCategories.map((cat) => {
            const items = DATA.workInstructions.filter((w) => w.region === region.id && w.category === cat.id);
            if (!items.length) return null;
            return (
              <div key={cat.id}>
                <div className="nav-cat-label" style={{ marginLeft: 8, fontSize: 10 }}>
                  {tf(cat, "name")}
                </div>
                {items.map((w) => (
                  <Link
                    key={w.id}
                    href={`/wi/${w.id}`}
                    className={`nav-item ${pathname === `/wi/${w.id}` ? "active" : ""}`}
                    style={{ paddingLeft: 20 }}
                  >
                    <span className="nav-icon">›</span>
                    {tf(w, "title")}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
