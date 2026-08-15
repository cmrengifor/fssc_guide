"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useSidebar } from "@/lib/sidebar-context";
import SearchBox from "@/components/SearchBox";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";
import AccountMenu from "@/components/AccountMenu";

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
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3c2.95 2.05 4.8 5.35 4.8 9s-1.85 6.95-4.8 9c-2.95-2.05-4.8-5.35-4.8-9S9.05 5.05 12 3Z" />
          </svg>
        </div>
        <div className="brand-text">
          <b>{t("brandTitle")}</b>
          <span>{t("brandSub")}</span>
        </div>
      </Link>
      <SearchBox />
      <div className="topbar-right">
        <AccountMenu />
        <LangToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
