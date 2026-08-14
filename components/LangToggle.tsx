"use client";

import { useLang } from "@/lib/lang-context";

export default function LangToggle() {
  const { lang, setLang, t } = useLang();

  function toggle() {
    setLang(lang === "es" ? "en" : "es");
  }

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label={t("langToggleLabel")}
      aria-pressed={lang === "en"}
    >
      {lang === "es" ? "ES" : "EN"}
    </button>
  );
}
