"use client";

import { useHabitat } from "@/domain/habitatcontext";

export function MainView({ children }: { children: React.ReactNode }) {
  const { activeView } = useHabitat();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-6">
      {/* Aquí podrías renderizar contenido dinámico basado en activeView */}
      {children}
    </main>
  );
}
