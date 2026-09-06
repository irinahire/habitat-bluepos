// domain/habitat.domains.ts
import { 
  LayoutGrid, 
  UtensilsCrossed, 
  ClipboardList, 
  Users, 
  LibraryBig, 
  Package, 
  FlaskConical, 
  Wallet,
  LucideIcon 
} from "lucide-react";

export type SubActionConfig = {
  label: string;
  component: string;
  icon: LucideIcon;
  roles: string[]; // Ej: ['admin', 'cashier', 'none']
};

export type DomainConfig = {
  label: string;
  icon: LucideIcon;
  defaultAction: string;
  roles: string[];
  subActions: Record<string, SubActionConfig>;
};

export const HABITAT_DOMAINS: Record<string, DomainConfig> = {
  restaurantview: {
    label: "Restaurante",
    icon: LayoutGrid,
    defaultAction: "tables",
    roles: ["none"],
    subActions: {
      tables: { label: "mesas", component: "TablesView", icon: LayoutGrid, roles: ["none"] },
      orders: { label: "comanda", component: "OrdersView", icon: UtensilsCrossed, roles: ["none"] },
      kitchen: { label: "cocina", component: "KitchenView", icon: ClipboardList, roles: ["none"] },
    },
  },
  libraryview: {
    label: "Librería",
    icon: LibraryBig,
    defaultAction: "catalog",
    roles: ["none"],
    subActions: {
      catalog: { label: "catálogo", component: "CatalogView", icon: LibraryBig, roles: ["none"] },
      loans: { label: "préstamos", component: "LoansView", icon: ClipboardList, roles: ["none"] },
      members: { label: "socios", component: "MembersView", icon: Users, roles: ["none"] },
    },
  },
  farmaview: {
    label: "Farmacia",
    icon: Package,
    defaultAction: "pos",
    roles: ["none"],
    subActions: {
      pos: { label: "facturador", component: "Farmaview", icon: Wallet, roles: ["none"] },
      stock: { label: "stock", component: "StockView", icon: Package, roles: ["none"] },
      patients: { label: "clientes", component: "ClientPanel", icon: Users, roles: ["none"] },
      magistrates: { label: "magistrales", component: "MagistralesView", icon: FlaskConical, roles: ["none"] },
      cashbox: { label: "caja", component: "CashboxView", icon: Wallet, roles: ["none"] },
    },
  },
};
