// components/layout/mainview.tsx
"use client";

import { useHabitat } from "@/domain/habitatcontext";
import { HABITAT_DOMAINS } from "@/domain/habitat.domains";
import { MODULE_IMPORTS } from "@/domain/habitat.imports";

interface MainViewProps {
  children: React.ReactNode;
}

export function MainView({ children }: MainViewProps) {
  const { activeModule, activeSubAction } = useHabitat();

  const currentDomain = activeModule ? HABITAT_DOMAINS[activeModule] : null;
  const ActiveModuleComponent = activeModule ? MODULE_IMPORTS[activeModule] : null;

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-6 bg-transparent [&_div]:bg-transparent">
      {ActiveModuleComponent && currentDomain ? (
        <ActiveModuleComponent 
          activeTab={activeSubAction} 
          domainConfig={currentDomain} 
        />
      ) : (
        children
      )}
    </main>
  );
}
