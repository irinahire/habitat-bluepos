// domain/habitat.imports.ts
import dynamic from 'next/dynamic';

// Cada módulo se carga bajo demanda (Lazy Loading) únicamente cuando se solicita
export const MODULE_IMPORTS: Record<string, React.ComponentType<any>> = {
  restaurantview: dynamic(() => import("@/components/modules/restaurantview").then(mod => mod.RestaurantView)),
  libraryview: dynamic(() => import("@/components/modules/libraryview").then(mod => mod.LibraryView)),
  farmaview: dynamic(() => import("@/components/modules/farmaview").then(mod => mod.Farmaview)),
  
  // Mañana podés tener 50 más acá y el impacto en la carga inicial es literalmente CERO:
  // hardwarestoreview: dynamic(() => import("@/components/modules/hardware-store-view").then(mod => mod.HardwareStoreView)),
};
