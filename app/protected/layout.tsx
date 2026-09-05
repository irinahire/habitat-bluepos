// app/protected/layout.tsx
import { HabitatProvider } from "@/domain/habitatcontext";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <HabitatProvider>
      <main className="min-h-screen flex flex-col relative bg-[radial-gradient(circle_at_top_center,#0f172a_0%,#090d16_100%)] text-slate-100">
        {/* Espacio para el Login - Flotante arriba a la derecha */}
        <div className="absolute top-4 right-4 z-50">
          <Suspense fallback={<div className="w-20 h-6 animate-pulse bg-secondary rounded" />}>
            <AuthButton />
          </Suspense>
        </div>

        <Header />
        
        <div className="flex-1 flex flex-col w-full">
          {children}
        </div>
        
        <Footer />
      </main>
    </HabitatProvider>
  );
}
