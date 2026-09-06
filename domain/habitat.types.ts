// domain/habitat.types.ts
import { LucideIcon } from "lucide-react";

export type SubActionConfig = {
  label: string;
  component: string;
  icon: LucideIcon;
  roles: string[];
};

export type DomainConfig = {
  label: string;
  icon: LucideIcon;
  defaultAction: string;
  roles: string[];
  subActions: Record<string, SubActionConfig>;
};

// Tipo para el nodo de identidad / sucursal que maneja el servicio y el browser
export type HabitatNode = {
  id: string;
  name: string;
  domain: string;
  metadata?: Record<string, any>;
  roles?: string[];
  [key: string]: any;
};
