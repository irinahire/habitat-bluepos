import { 
  LayoutGrid, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  LibraryBig, 
  LucideIcon, 
  Pill, 
  Stethoscope, 
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
    { label: "medicamentos", icon: Pill, action: "medicines" },
    { label: "pacientes", icon: Stethoscope, action: "patients" },
    { label: "historial", icon: Activity, action: "history" },
  ],
};
