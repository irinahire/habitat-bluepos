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
