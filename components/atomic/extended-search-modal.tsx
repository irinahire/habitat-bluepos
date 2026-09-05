// components/atomic/extended-search-modal.tsx
"use client";

interface ExtendedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: any) => void;
}

export function ExtendedSearchModal({ isOpen, onClose }: ExtendedSearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 rounded-3xl">
      <div className="bg-slate-950 w-full max-w-4xl h-[80vh] rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15.1 18.1-1.3-1.3"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M7 11a4 4 0 0 1 4-4 4 4 0 0 1 4 4"/>
            </svg>
            Búsqueda Extendida / Catálogo
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        
        <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-900">
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-700">
            <input placeholder="Filtrar por término..." className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
            <input placeholder="Laboratorio / Marca" className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
            <input placeholder="Código / SKU" className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-950 p-6 text-center text-slate-400 text-sm">
            Utilizá los filtros superiores para explorar el repositorio polimórfico del hábitat.
          </div>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-950 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-slate-700 text-white rounded-xl font-medium text-sm hover:bg-slate-600 transition">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
