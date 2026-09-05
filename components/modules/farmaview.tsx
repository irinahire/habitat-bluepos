// components/modules/farmaview.tsx
"use client";

import { useState, useEffect } from "react";
import { GlobalSearch } from "@/components/atomic/global-search";
import { CartTable } from "@/components/atomic/cart-table";
import { ClientPanel } from "@/components/atomic/client-panel";
import { CheckoutSummary } from "@/components/atomic/checkout-summary";
import { ExtendedSearchModal } from "@/components/atomic/extended-search-modal";

export function Farmaview() {
  const [cart, setCart] = useState<any[]>([]);
  const [obraSocial, setObraSocial] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const agregarAlCarrito = (producto: any) => {
    setCart((prev) => [...prev, producto]);
  };

  // Captura de atajos de teclado globales
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F8') { 
        e.preventDefault();
        alert("Procesando pago..."); 
      }
      if (e.key === 'b' && e.ctrlKey) {  
        e.preventDefault();
        document.getElementById("search-input")?.focus();  
      }
      if (e.key === 'F9') {
        e.preventDefault();
        setIsModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative h-full p-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
        
        {/* Columna Izquierda: Buscador Global Atómico y Grilla de Ítems */}
        <div className="xl:col-span-2 space-y-4 flex flex-col h-full">
          {/* Fila superior de búsqueda: Input directo y limpio + Botón Extendido sin contenedor oscuro doble */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <GlobalSearch 
                id="search-input" 
                onSelect={agregarAlCarrito} 
                placeholder="Ctrl+B para buscar en el hábitat (comercial, genérico, monodroga)..." 
              />
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              title="Búsqueda Avanzada (F9)"
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-950/60 text-emerald-300 rounded-xl hover:bg-emerald-900 border border-emerald-800/80 text-xs font-medium transition-colors shrink-0 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15.1 18.1-1.3-1.3"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M7 11a4 4 0 0 1 4-4 4 4 0 0 1 4 4"/>
              </svg>
              Extendido (F9)
            </button>
          </div>

          {/* Tabla de carrito con diseño fluido */}
          <div className="flex-1 flex flex-col">
            <CartTable cart={cart} />
          </div>
        </div>

        {/* Columna Derecha: Panel de Cliente, Cobertura y Checkout */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <ClientPanel obraSocial={obraSocial} setObraSocial={setObraSocial} />
          <CheckoutSummary cart={cart} onCheckout={() => alert("Cobro realizado con éxito")} />
        </div>
      </div>

      <ExtendedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={agregarAlCarrito} 
      />
    </div>
  );
}
