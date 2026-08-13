"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { useSidebar } from "@/lib/sidebar-context";
import { DATA } from "@/lib/data";

export default function Sidebar() {
  const { t } = useLang();
  const pathname = usePathname();
  const { open, close } = useSidebar();

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={close} />}
      <nav className={`sidebar ${open ? "open" : ""}`} id="sidebar-nav">
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
        {DATA.wiRegions.map((region) => (
          <Link
            key={region.id}
            href={`/flow/region/${region.id}`}
            className={`nav-item ${pathname === `/flow/region/${region.id}` ? "active" : ""}`}
          >
            <span className="nav-icon">⋔</span>
            {t("navFlow")} – {region.id.toUpperCase()}
          </Link>
        ))}
        {DATA.wiRegions.map((region) => (
          <Link
            key={region.id}
            href={`/wi/region/${region.id}`}
            className={`nav-item ${pathname === `/wi/region/${region.id}` ? "active" : ""}`}
          >
            <span className="nav-icon">▤</span>
            {t("navWI")} – {region.id.toUpperCase()}
          </Link>
        ))}
        <Link href="/glossary" className={`nav-item ${pathname === "/glossary" ? "active" : ""}`}>
          <span className="nav-icon">§</span>
          {t("navGlossary")}
        </Link>
      </div>
      </nav>
    </>
  );
}
