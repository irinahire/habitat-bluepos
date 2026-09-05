// components/layout/mainview.tsx
"use client";

import { useHabitat } from "@/domain/habitatcontext";
import { RestaurantView } from "@/components/modules/restaurantview";
import { LibraryView } from "@/components/modules/libraryview";
import { Farmaview } from "@/components/modules/farmaview";

interface MainViewProps {
  children: React.ReactNode;
}

export function MainView({ children }: MainViewProps) {
  const { activeModule } = useHabitat();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto p-6 bg-transparent [&_div]:bg-transparent">
      {activeModule === 'restaurantview' && <RestaurantView />}
      {activeModule === 'libraryview' && <LibraryView />}
      {activeModule === 'farmaview' && <Farmaview />}
      
      {!activeModule && children}
    </main>
  );
}
