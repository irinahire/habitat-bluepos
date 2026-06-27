import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Header Modificado */}
        <nav className="w-full flex justify-center border-b border-b-border h-16 bg-card/80 backdrop-blur-md">
          <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
            {/* Marca BluePOS */}
            <div className="flex flex-col">
              <Link href={"/protected"} className="font-bold text-lg text-primary leading-none">
                BluePOS
              </Link>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Blueprint Integrations Lab
              </span>
            </div>

            {/* Navegación Central */}
            <div className="hidden md:flex gap-6 text-muted-foreground font-medium">
              <span className="text-foreground">Sales</span>
              <span>Inventory</span>
              <span>Customers</span>
              <span>Insurance</span>
              <span>Billing</span>
            </div>

            {/* Acciones derecha */}
            <div className="flex items-center gap-4">
              {!hasEnvVars ? (
                <EnvVarWarning />
              ) : (
                <Suspense>
                  <AuthButton />
                </Suspense>
              )}
              <div className="h-4 w-[1px] bg-border" />
              <ThemeSwitcher />
            </div>
          </div>
        </nav>

        {/* Contenedor de contenido */}
        <div className="flex-1 flex flex-col w-full max-w-7xl p-5">
          {children}
        </div>

        {/* Footer Minimalista */}
        <footer className="w-full flex items-center justify-center border-t border-border mx-auto text-center text-xs gap-8 py-8 mt-auto">
          <p className="text-muted-foreground">
            © 2026 BluePOS - Blueprint Integrations Lab
          </p>
        </footer>
      </div>
    </main>
  );
}
