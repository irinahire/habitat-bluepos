// components/modules/dieteticaview.tsx
"use client";

import { useHabitat } from "@/domain/habitatcontext";
import { Wallet, Package, Users } from "lucide-react";

interface DieteticaViewProps {
  activeTab: string;
  domainConfig: any;
}

export function DieteticaView({ activeTab }: DieteticaViewProps) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dietética & Naturales</h1>
          <p className="text-sm text-muted-foreground">Gestión de granel, suplementos y control de stock</p>
        </div>
        <div className="text-xs px-3 py-1 bg-primary/10 text-primary font-semibold rounded-full uppercase tracking-wider">
          Módulo Activo: {activeTab}
        </div>
      </div>

      <div className="grid gap-6">
        {activeTab === "pos" && (
          <div className="p-6 rounded-xl border border-border bg-card/50 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="size-5 text-primary" /> Facturador de Dietética (POS)
            </h2>
            <p className="text-sm text-muted-foreground">
              Utiliza componentes atómicos como tu carrito de compras, pesaje de granel y cobro rápido.
            </p>
          </div>
        )}

        {activeTab === "stock" && (
          <div className="p-6 rounded-xl border border-border bg-card/50 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Package className="size-5 text-primary" /> Control de Stock y Granel
            </h2>
            <p className="text-sm text-muted-foreground">
              Seguimiento de lotes, vencimientos cortos y control de mermas por fraccionamiento.
            </p>
          </div>
        )}

        {activeTab === "clients" && (
          <div className="p-6 rounded-xl border border-border bg-card/50 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="size-5 text-primary" /> Panel de Clientes y Fidelización
            </h2>
            <p className="text-sm text-muted-foreground">
              Historial de compras frecuentes y descuentos para socios del club saludable.
            </p>
          </div>
        )}

        {activeTab === "cashbox" && (
          <div className="p-6 rounded-xl border border-border bg-card/50 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="size-5 text-primary" /> Gestión de Caja
            </h2>
            <p className="text-sm text-muted-foreground">
              Apertura, arqueo y cierre de caja diario.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
