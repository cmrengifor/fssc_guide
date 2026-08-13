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
        <div className="brand-mark">AP</div>
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
