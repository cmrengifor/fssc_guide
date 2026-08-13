"use client";

import { useLang } from "@/lib/lang-context";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle">
      <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")}>
        ES
      </button>
      <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}
