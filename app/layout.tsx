import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { SidebarProvider } from "@/lib/sidebar-context";
import { ProgressProvider } from "@/lib/progress-context";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Guía de Entrenamiento AP · Oracle Applications",
  description: "Guía de entrenamiento AP para procesos de cuentas por pagar en Oracle Applications.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-lang="es">
      <body>
        <LangProvider>
          <ProgressProvider>
            <SidebarProvider>
              <div id="app">
                <TopBar />
                <div className="layout">
                  <Sidebar />
                  <main>{children}</main>
                </div>
              </div>
            </SidebarProvider>
          </ProgressProvider>
        </LangProvider>
      </body>
    </html>
  );
}
