"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/lang-context";

export default function Sidebar() {
  const { t } = useLang();
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
    </nav>
  );
}
