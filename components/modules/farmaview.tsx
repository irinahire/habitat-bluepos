"use client";

import { useState, useEffect } from "react";

export function Farmaview() {
  const [cart, setCart] = useState([]);
  // Corregido: Inicializamos como string vacío en lugar de null
  const [obraSocial, setObraSocial] = useState(""); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F8') { alert("Cobrando..."); }
      if (e.key === 'b' && e.ctrlKey) { 
        e.preventDefault(); // Evitamos que abra el buscador del navegador
        document.getElementById("search-input")?.focus(); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full p-4">
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="search-input" className="flex-1 bg-transparent text-white outline-none" placeholder="Ctrl+B para buscar..." />
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-900/50 flex flex-col">
        <h3 className="text-xl font-bold text-emerald-400 mb-4">Carrito</h3>
        
        <select 
          value={obraSocial}
          onChange={(e) => setObraSocial(e.target.value)} 
          className="w-full bg-slate-950 p-2 rounded-lg text-sm text-slate-300 border border-slate-800 mb-4"
        >
          <option value="">Particular</option>
          <option value="osde">OSDE</option>
          <option value="ioma">IOMA</option>
        </select>

        {/* Ahora evaluamos si es distinto de string vacío */}
        {obraSocial !== "" && (
          <button className="w-full mb-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Validar Obra Social
          </button>
        )}

        <button className="w-full mt-auto py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500">
          PAGAR (F8)
        </button>
      </div>
    </div>
  );
}
