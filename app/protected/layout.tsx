import { HabitatProvider } from "@/domain/habitatcontext";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthButton } from "@/components/auth-button";
import { Suspense } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <HabitatProvider>
      <main className="min-h-screen flex flex-col relative">
        {/* Espacio para el Login - Flotante arriba a la derecha */}
        <div className="absolute top-4 right-4 z-50">
          <div className="bg-card/80 backdrop-blur-md border border-border px-4 py-2 rounded-full shadow-lg flex items-center">
            <Suspense fallback={<div className="w-20 h-6 animate-pulse bg-secondary rounded" />}>
              <AuthButton />
            </Suspense>
          </div>
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
