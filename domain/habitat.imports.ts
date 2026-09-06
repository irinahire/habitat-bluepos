// domain/habitat.imports.ts
import dynamic from 'next/dynamic';

export const MODULE_IMPORTS: Record<string, React.ComponentType<any>> = {
  restaurantview: dynamic(() => import("@/components/modules/restaurantview").then(mod => mod.RestaurantView)),
  libraryview: dynamic(() => import("@/components/modules/libraryview").then(mod => mod.LibraryView)),
  farmaview: dynamic(() => import("@/components/modules/farmaview").then(mod => mod.Farmaview)),
  // Mañana agregás una línea más acá para cada rubro nuevo:
  // hardwarestoreview: dynamic(() => import("@/components/modules/hardware-store-view").then(mod => mod.HardwareStoreView)),
};
