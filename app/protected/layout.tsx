import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
// NUEVOS IMPORTS
import { HabitatProvider } from "@/domain/habitatcontext"; 
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <HabitatProvider>
      <main className="min-h-screen flex flex-col">
        <Header /> {/* Reemplaza el nav original */}
        
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>

        <Footer /> {/* Reemplaza el footer original */}
      </main>
    </HabitatProvider>
  );
}
