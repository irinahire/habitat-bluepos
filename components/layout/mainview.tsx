// components/layout/mainview.tsx
"use client";

import { useHabitat } from "@/domain/habitatcontext";
import { HABITAT_DOMAINS } from "@/domain/habitat.domains";

// Importación de las vistas de los módulos
import { RestaurantView } from "@/components/modules/restaurantview";
import { LibraryView } from "@/components/modules/libraryview";
import { Farmaview } from "@/components/modules/farmaview";
// Si creas más vistas (StockView, CashboxView, etc.), las importas acá.

interface MainViewProps {
  children: React.ReactNode;
}

// Registro que mapea los strings del archivo de constantes con los componentes reales de React
const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  Farmaview,
  RestaurantView,
  LibraryView,
  // StockView, CashboxView, etc., se agregan acá a medida que se desarrollen
};

export function MainView({ children }: MainViewProps) {
  const { activeModule, activeSubAction } = useHabitat();

  // Obtenemos la configuración del dominio y la subacción actual
  const currentDomain = activeModule ? HABITAT_DOMAINS[activeModule] : null;
  const subActionConfig = currentDomain && activeSubAction 
    ? currentDomain.subActions[activeSubAction] 
    : null;

  // Resolvemos el componente dinámicamente desde el registro
  const ComponentToRender = subActionConfig 
    ? COMPONENT_REGISTRY[subActionConfig.component] 
    : null;

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-6 bg-transparent [&_div]:bg-transparent">
      {ComponentToRender ? (
        <ComponentToRender activeTab={activeSubAction} />
      ) : (
        children
      )}
    </main>
  );
}
