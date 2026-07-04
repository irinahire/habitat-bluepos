// domain/habitatcontext.tsx
"use client";
import { createContext, useContext, useState } from 'react';

const HabitatContext = createContext<any>(null);

export function HabitatProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<string>('billing'); // 'billing', 'inventory', etc.
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <HabitatContext.Provider value={{ activeView, setActiveView, activeModule, setActiveModule }}>
      {children}
    </HabitatContext.Provider>
  );
}

export const useHabitat = () => useContext(HabitatContext);
