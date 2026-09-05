// domain/menurubro.ts
import { 
  LayoutGrid, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  LibraryBig, 
  LucideIcon, 
  Package, 
  FlaskConical, 
  Activity 
} from "lucide-react";

export type menuitem = {
  label: string;
  icon: LucideIcon;
  action: string;
};

export const menurubro: Record<string, menuitem[]> = {
  restaurantview: [
    { label: "mesas", icon: LayoutGrid, action: "tables" },
    { label: "comanda", icon: UtensilsCrossed, action: "orders" },
    { label: "cocina", icon: ClipboardList, action: "kitchen" },
  ],
  libraryview: [
    { label: "catalogo", icon: LibraryBig, action: "catalog" },
    { label: "prestamos", icon: ClipboardList, action: "loans" },
    { label: "socios", icon: Users, action: "members" },
  ],
  farmaview: [
    { label: "stock", icon: Package, action: "stock" },
    { label: "clientes", icon: Users, action: "patients" },
    { label: "magistrales", icon: FlaskConical, action: "magistrates" },
  ],
};
