"use client";

import { useHabitat } from "@/domain/habitatcontext";
import Link from "next/link";

export function Header() {
  const { activeView, setActiveView } = useHabitat();

  return (
    <header className="w-full border-b border-white/10 p-4 bg-card/80 backdrop-blur-md flex justify-between items-center">
      <div className="flex flex-col">
        <Link href="/protected" className="font-bold text-lg text-primary">BluePOS</Link>
        <span className="text-[10px] text-muted-foreground uppercase">Blueprint Lab</span>
      </div>

      {activeView !== 'billing' && (
        <button 
          onClick={() => setActiveView('billing')}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-all"
        >
          VENDER
        </button>
      )}
    </header>
  );
}
