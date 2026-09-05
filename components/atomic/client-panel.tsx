// components/atomic/client-panel.tsx
"use client";

import { ObraSocialPanel } from "./obra-social-panel";

interface ClientPanelProps {
  obraSocial: string;
  setObraSocial: (val: string) => void;
  onValidateOS: () => void;
  isValidatedOS: boolean;
}

export function ClientPanel({ obraSocial, setObraSocial, onValidateOS, isValidatedOS }: ClientPanelProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4 shadow-lg">
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Datos del Cliente</h4>
        <div className="grid grid-cols-2 gap-2">
          <input className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Nombre" />
          <input className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Apellido" />
        </div>
        <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="DNI / CUIT / Carnet" />
      </div>

      <ObraSocialPanel 
        obraSocial={obraSocial} 
        setObraSocial={setObraSocial} 
        onValidate={onValidateOS} 
        isValidated={isValidatedOS} 
      />
    </div>
  );
}
