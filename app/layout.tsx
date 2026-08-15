import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { SidebarProvider } from "@/lib/sidebar-context";
import { ProgressProvider } from "@/lib/progress-context";
import { IncidentsProvider } from "@/lib/incidents-context";
import AuthSessionProvider from "@/components/AuthSessionProvider";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "Knowledge Share Center · Financial Shared Services Center",
  description: "Knowledge Share Center para procesos de cuentas por pagar en Financial Shared Services Center.",
};

const THEME_INIT_SCRIPT = `try{var m=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",m?"dark":"light");}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <AuthSessionProvider>
          <LangProvider>
            <ProgressProvider>
              <IncidentsProvider>
                <SidebarProvider>
                  <AppShell>{children}</AppShell>
                </SidebarProvider>
              </IncidentsProvider>
            </ProgressProvider>
          </LangProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
