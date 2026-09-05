// components/atomic/client-panel.tsx
"use client";

interface ClientPanelProps {
  onOpenClientModal?: () => void;
  selectedClient?: { nombre: string; apellido: string; documento: string } | null;
}

export function ClientPanel({ onOpenClientModal, selectedClient }: ClientPanelProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-lg">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cliente</h4>
        <button 
          onClick={onOpenClientModal}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline"
        >
          {selectedClient ? "Cambiar" : "Buscar / Nuevo"}
        </button>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300">
        {selectedClient ? (
          <div>
            <p className="font-semibold text-white">{selectedClient.nombre} {selectedClient.apellido}</p>
            <p className="text-xs text-slate-400">Doc: {selectedClient.documento}</p>
          </div>
        ) : (
          <span className="text-slate-500 italic">Consumidor Final</span>
        )}
      </div>
    </div>
  );
}
