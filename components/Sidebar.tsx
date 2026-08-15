"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang-context";
import { useSidebar } from "@/lib/sidebar-context";
import { DATA } from "@/lib/data";

export default function Sidebar() {
  const { t } = useLang();
  const pathname = usePathname();
  const { open, close } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const offCanvas = isMobile && !open;

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={close} />}
      <nav
        className={`sidebar ${open ? "open" : ""}`}
        id="sidebar-nav"
        inert={offCanvas ? true : undefined}
      >
      <div className="nav-section">
        <Link href="/" className={`nav-item ${pathname === "/" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">⌂</span>
          {t("navHome")}
        </Link>
        <Link href="/incidents" className={`nav-item ${pathname === "/incidents" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">●</span>
          {t("navIncidents")}
        </Link>
        <Link href="/holds" className={`nav-item ${pathname === "/holds" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">⛔</span>
          {t("navHolds")}
        </Link>
      </div>

      <div className="nav-section" role="group" aria-labelledby="nav-group-demo">
        <h3 className="nav-caption" id="nav-group-demo">
          {t("navDemo")}
        </h3>
        {DATA.wiRegions.map((region) => (
          <Link
            key={region.id}
            href={`/demo/region/${region.id}`}
            className={`nav-item ${pathname === `/demo/region/${region.id}` ? "active" : ""}`}
          >
            <span className="nav-icon" aria-hidden="true">▸</span>
            {region.id.toUpperCase()}
          </Link>
        ))}
        <Link href="/demo" className={`nav-item ${pathname === "/demo" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">▸</span>
          {t("navAllRegions")}
        </Link>
      </div>

      <div className="nav-section" role="group" aria-labelledby="nav-group-flow">
        <h3 className="nav-caption" id="nav-group-flow">
          {t("navFlow")}
        </h3>
        {DATA.wiRegions.map((region) => (
          <Link
            key={region.id}
            href={`/flow/region/${region.id}`}
            className={`nav-item ${pathname === `/flow/region/${region.id}` ? "active" : ""}`}
          >
            <span className="nav-icon" aria-hidden="true">⋔</span>
            {region.id.toUpperCase()}
          </Link>
        ))}
        <Link href="/flow" className={`nav-item ${pathname === "/flow" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">⋔</span>
          {t("navAllRegions")}
        </Link>
      </div>

      <div className="nav-section" role="group" aria-labelledby="nav-group-wi">
        <h3 className="nav-caption" id="nav-group-wi">
          {t("navWI")}
        </h3>
        {DATA.wiRegions.map((region) => (
          <Link
            key={region.id}
            href={`/wi/region/${region.id}`}
            className={`nav-item ${pathname === `/wi/region/${region.id}` ? "active" : ""}`}
          >
            <span className="nav-icon" aria-hidden="true">▤</span>
            {region.id.toUpperCase()}
          </Link>
        ))}
        <Link href="/wi" className={`nav-item ${pathname === "/wi" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">▤</span>
          {t("navAllRegions")}
        </Link>
      </div>

      <div className="nav-section">
        <Link href="/glossary" className={`nav-item ${pathname === "/glossary" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">§</span>
          {t("navGlossary")}
        </Link>
      </div>
      </nav>
    </>
  );
}
