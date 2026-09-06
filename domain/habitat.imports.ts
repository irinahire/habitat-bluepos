// domain/habitat.imports.ts (añadir la línea de petshopview)
import dynamic from 'next/dynamic';

export const MODULE_IMPORTS: Record<string, React.ComponentType<any>> = {
  restaurantview: dynamic(() => import("@/components/modules/restaurantview").then(mod => mod.RestaurantView)),
  libraryview: dynamic(() => import("@/components/modules/libraryview").then(mod => mod.LibraryView)),
  farmaview: dynamic(() => import("@/components/modules/farmaview").then(mod => mod.Farmaview)),
  petshopview: dynamic(() => import("@/components/modules/petshopview").then(mod => mod.PetShopView)),
};
