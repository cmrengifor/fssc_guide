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

  function toggle() {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      className={`theme-toggle ${mode === "dark" ? "is-dark" : "is-light"}`}
      onClick={toggle}
      aria-label={t("themeToggleLabel")}
      aria-pressed={mode === "dark"}
    >
      <span aria-hidden="true">{mode === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}
