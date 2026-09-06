// domain/habitatcontext.tsx
"use client";
import { createContext, useContext, useState } from 'react';
import { HABITAT_DOMAINS } from './habitat.domains';

const HabitatContext = createContext<any>(null);

export function HabitatProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<string>('billing'); 
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeSubAction, setActiveSubAction] = useState<string>('pos');

  // Helper para obtener la configuración del dominio actual de manera limpia
  const currentDomainConfig = activeModule ? HABITAT_DOMAINS[activeModule] : null;

  return (
    <HabitatContext.Provider 
      value={{ 
        activeView, 
        setActiveView, 
        activeModule, 
        setActiveModule, 
        activeSubAction, 
        setActiveSubAction,
        currentDomainConfig,
        domains: HABITAT_DOMAINS 
      }}
    >
      {children}
    </HabitatContext.Provider>
  );
}

export const useHabitat = () => useContext(HabitatContext);
