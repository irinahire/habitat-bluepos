"use client";

import { useState, useEffect } from "react";

export function Farmaview() {
  const [cart, setCart] = useState([]);
  const [obraSocial, setObraSocial] = useState(""); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F8') { alert("Procesando pago..."); }
      if (e.key === 'b' && e.ctrlKey) { 
        e.preventDefault();
        document.getElementById("search-input")?.focus(); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full p-4">
      {/* Columna Izquierda: Buscador y Detalle de Productos */}
      <div className="xl:col-span-2 space-y-6">
        {/* Buscador */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
          <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="search-input" className="flex-1 bg-transparent text-white outline-none" placeholder="Ctrl+B para buscar producto..." />
        </div>

        {/* Tabla de Detalles de Venta */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-hidden">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-emerald-500 uppercase border-b border-slate-800">
              <tr>
                <th className="pb-3">Producto</th>
                <th className="pb-3 text-center">Cant</th>
                <th className="pb-3 text-center">Frac.</th>
                <th className="pb-3">Precio</th>
                <th className="pb-3">Desc. OS</th>
                <th className="pb-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Ejemplo de fila - aquí mapearías tu estado cart */}
              <tr className="border-b border-slate-800/50">
                <td className="py-4 font-medium text-white">Ibuprofeno 400mg</td>
                <td className="text-center">1</td>
                <td className="text-center"><input type="checkbox" className="accent-emerald-500" /></td>
                <td>$35.50</td>
                <td className="text-emerald-400">-$10.00</td>
                <td className="font-bold text-white">$25.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Columna Derecha: Cliente y Checkout */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-900/50 flex flex-col gap-6">
        
        {/* Espacio para Cliente */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Cliente / Afiliado</h4>
          <input className="w-full bg-transparent border-b border-slate-700 text-white outline-none focus:border-emerald-500 pb-1" placeholder="DNI o Nombre..." />
        </div>

        {/* Selector de Obra Social */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Obra Social</h4>
          <select 
            value={obraSocial}
            onChange={(e) => setObraSocial(e.target.value)} 
            className="w-full bg-slate-950 p-2 rounded-lg text-sm text-slate-300 border border-slate-800"
          >
            <option value="">Particular</option>
            <option value="osde">OSDE</option>
            <option value="ioma">IOMA</option>
          </select>
        </div>

        {/* Botón de Validar Condicional */}
        {obraSocial !== "" && (
          <button className="w-full py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Validar Obra Social
          </button>
        )}

        {/* Sección de Pago final */}
        <div className="mt-auto border-t border-slate-800 pt-6">
            <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400">Total a Pagar</span>
                <span className="text-3xl font-bold text-white">$25.50</span>
            </div>
            <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20">
              PAGAR (F8)
            </button>
        </div>
      </div>
    </div>
  );
}
