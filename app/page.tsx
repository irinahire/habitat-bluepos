// app/page.tsx
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[radial-gradient(circle_at_top_center,#0f172a_0%,#090d16_100%)]">
      <div className="flex-1 w-full flex flex-col items-center">
        <nav className="w-full flex justify-center border-b border-white/10 h-16 backdrop-blur-md">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold text-white">
              <Link href={"/"}>FRACTAL</Link>
            </div>
            {!hasEnvVars ? null : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        
        <div className="flex-1 flex flex-col gap-10 max-w-5xl p-5 w-full">
          <Hero />
        </div>

        <footer className="w-full flex items-center justify-center border-t border-white/10 mx-auto text-center text-xs text-slate-400 gap-8 py-10">
          <p>© 2026 Fractal - Gestión Inteligente</p>
        </footer>
      </div>
    </main>
  );
}
