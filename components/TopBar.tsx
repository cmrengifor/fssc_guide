"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import SearchBox from "@/components/SearchBox";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";

export default function TopBar() {
  const { t } = useLang();
  return (
    <header className="topbar">
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
