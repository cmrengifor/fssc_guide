"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

export default function ThemeToggle() {
  const { t } = useLang();
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") setMode(current);
  }, []);

  function apply(next: "light" | "dark") {
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <div className="theme-toggle">
      <button
        className={`is-light ${mode === "light" ? "active" : ""}`}
        onClick={() => apply("light")}
        aria-label={t("themeLightLabel")}
        aria-pressed={mode === "light"}
      >
        ☀
      </button>
      <button
        className={`is-dark ${mode === "dark" ? "active" : ""}`}
        onClick={() => apply("dark")}
        aria-label={t("themeDarkLabel")}
        aria-pressed={mode === "dark"}
      >
        ☾
      </button>
    </div>
  );
}
