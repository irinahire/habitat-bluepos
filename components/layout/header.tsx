// components/layout/header.tsx
"use client";

import { useHabitat } from "@/domain/habitatcontext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { HABITAT_DOMAINS } from "@/domain/habitat.domains";
import { GlobalSearch } from "@/components/atomic/global-search";

export function Header() {
  const { 
    activeView, 
    setActiveView, 
    setActiveModule, 
    activeModule, 
    activeSubAction, 
    setActiveSubAction 
  } = useHabitat();

  const currentDomain = activeModule ? HABITAT_DOMAINS[activeModule] : null;
  const DomainIcon = currentDomain?.icon;

  return (
    <header className="w-full border-b border-border p-4 bg-card/80 backdrop-blur-md flex items-center gap-6">
      <div className="flex flex-col">
        <Link href="/protected" className="font-bold text-lg text-primary leading-none">BluePOS</Link>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Blueprint Lab</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="gap-2 capitalize">
            {DomainIcon && <DomainIcon className="size-4" />}
            {currentDomain ? currentDomain.label : 'seleccionar'}
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {Object.entries(HABITAT_DOMAINS).map(([key, domain]) => {
            const Icon = domain.icon;
            return (
              <DropdownMenuItem 
                key={key} 
                onClick={() => {
                  setActiveModule(key);
                  setActiveSubAction(domain.defaultAction);
                }}
              >
                <Icon className="mr-2 size-4" /> {domain.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-3 pl-6 border-l border-border/50 bg-transparent">
        {currentDomain && Object.entries(currentDomain.subActions).map(([actionKey, subAction]) => {
          const Icon = subAction.icon;
          const isActive = activeSubAction === actionKey;
          return (
            <Button 
              key={actionKey} 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveSubAction(actionKey)}
              className={`gap-2 text-xs capitalize transition-colors ${
                isActive 
                  ? 'bg-white/15 text-foreground font-bold shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
              }`}
            >
              <Icon className="size-4" /> 
              <span>{subAction.label}</span>
            </Button>
          );
        })}
      </div>
      
      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-md">
          <GlobalSearch />
        </div>
      </div>

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
