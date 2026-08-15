"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";

/** The sign-in screen renders standalone, without the app's own chrome —
 *  someone who hasn't signed in yet shouldn't see the sidebar/nav at all. */
export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/signin") {
    return <>{children}</>;
  }

  return (
    <div id="app">
      <TopBar />
      <div className="layout">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
