import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { SidebarProvider } from "@/lib/sidebar-context";
import { ProgressProvider } from "@/lib/progress-context";
import { IncidentsProvider } from "@/lib/incidents-context";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Guía de Entrenamiento AP · Oracle Applications",
  description: "Guía de entrenamiento AP para procesos de cuentas por pagar en Oracle Applications.",
};

const THEME_INIT_SCRIPT = `try{var m=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",m?"dark":"light");}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <LangProvider>
          <ProgressProvider>
            <IncidentsProvider>
              <SidebarProvider>
                <div id="app">
                  <TopBar />
                  <div className="layout">
                    <Sidebar />
                    <main>{children}</main>
                  </div>
                </div>
              </SidebarProvider>
            </IncidentsProvider>
          </ProgressProvider>
        </LangProvider>
      </body>
    </html>
  );
}
