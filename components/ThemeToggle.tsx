"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  function apply(next: "light" | "dark") {
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <div className="theme-toggle">
      <button
        className={`is-light ${mode === "light" ? "active" : ""}`}
        onClick={() => apply("light")}
        title="Modo claro"
      >
        ☀
      </button>
      <button
        className={`is-dark ${mode === "dark" ? "active" : ""}`}
        onClick={() => apply("dark")}
        title="Modo oscuro"
      >
        ☾
      </button>
    </div>
  );
}
