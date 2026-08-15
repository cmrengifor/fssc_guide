"use client";

import { signOut } from "next-auth/react";
import { useLang } from "@/lib/lang-context";

export default function SignOutButton() {
  const { t } = useLang();

  return (
    <button
      type="button"
      className="signout-btn"
      onClick={() => signOut({ callbackUrl: "/signin" })}
      aria-label={t("signOutLabel")}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="17" height="17" aria-hidden="true">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5" />
        <path d="M21 12H9" />
      </svg>
    </button>
  );
}
