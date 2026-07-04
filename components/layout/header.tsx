"use client";

import { useHabitat } from "@/domain/habitatcontext";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Store, BookOpen } from "lucide-react";

export function Header() {
  const { activeView, setActiveView, setActiveModule, activeModule } = useHabitat();

  return (
    <header className="w-full border-b border-border p-4 bg-card/80 backdrop-blur-md flex items-center gap-6">
      {/* Marca */}
      <div className="flex flex-col">
        <Link href="/protected" className="font-bold text-lg text-primary leading-none">BluePOS</Link>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Blueprint Lab</span>
      </div>

      {/* ThemeSwitcher movido a la izquierda */}
      <ThemeSwitcher />

      {/* Selector de Rubros */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="gap-2">
            {activeModule === 'restaurantview' ? <Store className="size-4" /> : <BookOpen className="size-4" />}
            {activeModule === 'restaurantview' ? 'Restaurante' : 'Librería'}
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setActiveModule('restaurantview')}>
            <Store className="mr-2 size-4" /> Restaurante
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveModule('libraryview')}>
            <BookOpen className="mr-2 size-4" /> Librería
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Espacio vacío para empujar las acciones restantes a la derecha */}
      <div className="flex-1" />

      {/* Acciones (VENDER queda a la derecha, lejos de la burbuja de login) */}
      <div className="flex items-center gap-4">
        {activeView !== 'billing' && (
          <Button onClick={() => setActiveView('billing')} className="font-bold">
            VENDER
          </Button>
        )}
      </div>
    </header>
  );
}
