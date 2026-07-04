"use client";

import { useHabitat } from "@/domain/habitatcontext";
import { RestaurantView } from "@/components/modules/restaurantview";
import { LibraryView } from "@/components/modules/libraryview";

export function MainView() {
  const { activeModule } = useHabitat();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-6">
      {activeModule === 'restaurant' && <RestaurantView />}
      {activeModule === 'library' && <LibraryView />}
      
      {/* Mensaje por defecto si no hay nada seleccionado */}
      {!activeModule && (
        <div className="text-center py-20 opacity-50">
          Selecciona un rubro en el menú superior para comenzar.
        </div>
      )}
    </main>
  );
}
