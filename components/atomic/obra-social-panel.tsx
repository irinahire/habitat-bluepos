// components/atomic/obra-social-panel.tsx
"use client";

interface ObraSocialPanelProps {
  obraSocial: string;
  setObraSocial: (val: string) => void;
  onValidate: () => void;
  isValidated: boolean;
}

export function ObraSocialPanel({ obraSocial, setObraSocial, onValidate, isValidated }: ObraSocialPanelProps) {
  return (
    <div className="space-y-3 pt-2 border-t border-slate-800/80">
      <h5 className="text-[11px] font-bold text-slate-400 uppercase">Cobertura / Obra Social</h5>
      <select 
        value={obraSocial}
        onChange={(e) => setObraSocial(e.target.value)} 
        className="w-full bg-slate-950 p-2 rounded-lg text-sm text-slate-300 border border-slate-800 focus:outline-none focus:border-emerald-500"
      >
        <option value="">Particular</option>
        <option value="osde">OSDE</option>
        <option value="ioma">IOMA</option>
      </select>

      {obraSocial !== "" && !isValidated && (
        <button 
          onClick={onValidate}
          className="w-full py-2 bg-indigo-600 text-white text-xs rounded-lg font-bold hover:bg-indigo-500 transition"
        >
          Validar Obra Social
        </button>
      )}

      {isValidated && (
        <div className="w-full py-2 bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs rounded-lg text-center font-semibold">
          ✓ Obra Social Validada (Descuento aplicado)
        </div>
      )}
    </div>
  );
}
