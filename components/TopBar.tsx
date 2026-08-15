"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useSidebar } from "@/lib/sidebar-context";
import SearchBox from "@/components/SearchBox";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";

export default function TopBar() {
  const { t } = useLang();
  const { open, toggle } = useSidebar();
  return (
    <header className="topbar">
      <button
        type="button"
        className="menu-toggle"
        onClick={toggle}
        aria-label={t("navMenuToggle")}
        aria-expanded={open}
        aria-controls="sidebar-nav"
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>
      <Link href="/" className="brand">
        <div className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="9.5" r="6.3" />
            <path d="M5.7 9.5h12.6" />
            <path d="M12 3.2c2.15 1.4 3.5 3.65 3.5 6.3s-1.35 4.9-3.5 6.3c-2.15-1.4-3.5-3.65-3.5-6.3S9.85 4.6 12 3.2Z" />
            <path d="M2.3 17.7c2.9-1.15 6.8-1.15 9.7 0M12 17.7c2.9-1.15 6.8-1.15 9.7 0" />
            <path d="M12 17.7v3.3" />
          </svg>
        </div>
        <div className="brand-text">
          <b>{t("brandTitle")}</b>
          <span>{t("brandSub")}</span>
        </div>
      </Link>
      <SearchBox />
      <div className="topbar-right">
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
