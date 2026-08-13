"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      open,
      toggle: () => setOpen((o) => !o),
      close: () => setOpen(false),
    }),
    [open]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider");
  return ctx;
}
