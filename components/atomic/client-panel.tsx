// components/atomic/client-panel.tsx
"use client";

interface ClientPanelProps {
  obraSocial: string;
  setObraSocial: (val: string) => void;
}

export function ClientPanel({ obraSocial, setObraSocial }: ClientPanelProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase">Datos del Cliente</h4>
        <div className="grid grid-cols-2 gap-3">
          <input className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Nombre" />
          <input className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="Apellido" />
        </div>
        <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" placeholder="DNI / CUIT / Carnet" />
      </div>

      <select 
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)} 
        className="w-full bg-slate-950 p-2 rounded-lg text-sm text-slate-300 border border-slate-800 focus:outline-none focus:border-emerald-500"
      >
        <option value="">Particular</option>
        <option value="osde">OSDE</option>
        <option value="ioma">IOMA</option>
      </select>

      {obraSocial !== "" && (
        <button className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition">
          Validar Obra Social
        </button>
      )}
    </div>
  );
}
