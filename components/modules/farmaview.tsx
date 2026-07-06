"use client";

import { useState, useEffect } from "react";
import { farmaService } from "@/domain/farmaService";

export function Farmaview() {
  const [cart, setCart] = useState([]);
  const [obraSocial, setObraSocial] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);

  // Lógica de búsqueda con Debounce (300ms) para no saturar
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        const data = await farmaService.buscarProducto(searchTerm);
        setResultados(data);
      } else {
        setResultados([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Captura de atajos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F8') { alert("Procesando pago..."); }
      // Ctrl + B para enfocar el buscador
      if (e.key === 'b' && e.ctrlKey) { 
        e.preventDefault();
        document.getElementById("search-input")?.focus(); 
      }
      // F9 para abrir la búsqueda extendida
      if (e.key === 'F9') {
        e.preventDefault();
        setIsModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative h-full p-4"> {/* Añadido relative para posicionar el modal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
        {/* Columna Izquierda: Buscador y Tabla */}
        <div className="xl:col-span-2 space-y-6">
          {/* Buscador Modificado */}
          <div className="relative bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-inner">
            <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              id="search-input" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none text-sm" 
              placeholder="Ctrl+B para buscar (comercial o genérico)..." 
            />
            
            {/* Dropdown de Resultados */}
            {resultados.length > 0 && (
              <div className="absolute top-16 left-0 w-full bg-slate-950 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                {resultados.map((res: any) => (
                  <div key={res.id} className="p-3 hover:bg-emerald-900/50 cursor-pointer text-white flex justify-between border-b border-slate-800">
                    <span className="font-medium">{res.data.nombre}</span>
                    <span className="text-emerald-400 font-bold">${res.data.precio_lista}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Botón de Búsqueda Extendida */}
            <button 
              onClick={() => setIsModalOpen(true)}
              title="Búsqueda Avanzada (F9)"
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/50 text-emerald-300 rounded-lg hover:bg-emerald-900 border border-emerald-800 text-xs font-medium transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15.1 18.1-1.3-1.3"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M7 11a4 4 0 0 1 4-4 4 4 0 0 1 4 4"/>
              </svg>
              Extendido (F9)
            </button>
          </div>

          {/* Tabla de Detalles de Venta */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-[calc(100%-80px)] overflow-y-auto">
            <table className="w-full text-left text-sm text-slate-300">
                 <thead className="text-emerald-500 uppercase border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
                  <tr>
                    <th className="pb-3">Producto</th>
                    <th className="pb-3 text-center">Cant (Shift+Num=Frac)</th>
                    <th className="pb-3">Precio Unit.</th>
                    <th className="pb-3">Desc. OS</th>
                    <th className="pb-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800/50">
                    <td className="py-4 font-medium text-white">Ibuprofeno 400mg</td>
                    <td className="text-center">
                      <input type="number" className="w-16 bg-slate-950 border border-slate-700 rounded p-1 text-center text-white text-sm" placeholder="1" />
                    </td>
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
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase">Datos del Cliente</h4>
            <div className="grid grid-cols-2 gap-3">
              <input className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" placeholder="Nombre" />
              <input className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" placeholder="Apellido" />
            </div>
            <input className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white" placeholder="DNI / CUIT / Carnet" />
          </div>

          <select 
            value={obraSocial}
            onChange={(e) => setObraSocial(e.target.value)} 
            className="w-full bg-slate-950 p-2 rounded-lg text-sm text-slate-300 border border-slate-800"
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

          <div className="mt-auto border-t border-slate-800 pt-6">
              <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-400">Total a Pagar</span>
                  <span className="text-3xl font-bold text-white">$25.50</span>
              </div>
              <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all">
                PAGAR (F8)
              </button>
          </div>
        </div>
      </div>

      {/* --- MODAL DE BÚSQUEDA EXTENDIDA --- */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 rounded-3xl">
          <div className="bg-slate-950 w-full max-w-4xl h-[80vh] rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-5 border-b border-slate-700">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-3">
                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m15.1 18.1-1.3-1.3"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M7 11a4 4 0 0 1 4-4 4 4 0 0 1 4 4"/>
                </svg>
                Búsqueda Extendida / Vademécum
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            
            {/* Cuerpo del Modal (Filtros y Resultados) */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-900">
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-700">
                 <input placeholder="Monodroga (ej. Paracetamol)" className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white" />
                 <input placeholder="Laboratorio" className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white" />
                 <input placeholder="Troquel" className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white" />
              </div>

              {/* Área de Resultados */}
              <div className="border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-emerald-500 uppercase border-b border-slate-700 bg-slate-900">
                    <tr>
                      <th className="p-4">Nombre Comercial</th>
                      <th className="p-4">Presentación</th>
                      <th className="p-4">Monodroga</th>
                      <th className="p-4">Laboratorio</th>
                      <th className="p-4 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="p-4 font-medium text-white">Ibupirac 400mg</td>
                          <td className="p-4">Comprimidos x 10</td>
                          <td className="p-4">Ibuprofeno</td>
                          <td className="p-4">Pfizer</td>
                          <td className="p-4 text-center">
                            <button className="px-3 py-1 bg-emerald-600 rounded-lg text-white font-semibold text-xs hover:bg-emerald-500">AGREGAR</button>
                          </td>
                      </tr>
                       <tr className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="p-4 font-medium text-white">Sertal Compuesto</td>
                          <td className="p-4">Gotas x 20ml</td>
                          <td className="p-4">Propinoxato + Paracetamol</td>
                          <td className="p-4">Roemmers</td>
                          <td className="p-4 text-center">
                             <button className="px-3 py-1 bg-emerald-600 rounded-lg text-white font-semibold text-xs hover:bg-emerald-500">AGREGAR</button>
                          </td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="p-4 border-t border-slate-700 bg-slate-950 text-right">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-slate-700 text-white rounded-xl font-medium text-sm hover:bg-slate-600">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
