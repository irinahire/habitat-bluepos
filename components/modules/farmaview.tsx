// components/modules/farmaview.tsx
"use client";

import { useState, useEffect } from "react";
import { GlobalSearch } from "@/components/atomic/global-search";
import { CartTable } from "@/components/atomic/cart-table";
import { ClientPanel } from "@/components/atomic/client-panel";
import { ObraSocialPanel } from "@/components/atomic/obra-social-panel";
import { CheckoutSummary } from "@/components/atomic/checkout-summary";
import { ExtendedSearchModal } from "@/components/atomic/extended-search-modal";
import MagistralesView from "@/components/atomic/magistrales-view";
import CashboxView from "@/components/atomic/cashbox-view";

export function Farmaview() {
  const [activeTab, setActiveTab] = useState<'pos' | 'magistrates' | 'stock' | 'patients' | 'cashbox'>('pos');
  const [cart, setCart] = useState<any[]>([]);
  const [obraSocial, setObraSocial] = useState(""); 
  const [isValidatedOS, setIsValidatedOS] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const agregarAlCarrito = (producto: any) => {
    setCart((prev) => {
      const productoId = producto.id || producto.codigo || JSON.stringify(producto);
      const indexExistente = prev.findIndex((item) => {
        const itemId = item.id || item.codigo || JSON.stringify(item);
        return itemId === productoId;
      });

      if (indexExistente >= 0) {
        const nuevoCart = [...prev];
        const itemActual = nuevoCart[indexExistente];
        const cantidadActual = itemActual.cantidad || 1;
        
        nuevoCart[indexExistente] = {
          ...itemActual,
          cantidad: cantidadActual + 1
        };
        return nuevoCart;
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const handleValidateOS = () => {
    setIsValidatedOS(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    <div className="relative h-full p-4 flex flex-col gap-4">
      {/* Barra de solapas internas de Farmacia sincronizada con el menú superior */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button 
          onClick={() => setActiveTab('pos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'pos' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Facturador POS
        </button>
        <button 
          onClick={() => setActiveTab('magistrates')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'magistrates' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Magistrales
        </button>
        <button 
          onClick={() => setActiveTab('stock')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'stock' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Stock
        </button>
        <button 
          onClick={() => setActiveTab('patients')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'patients' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Clientes / Pacientes
        </button>
        <button 
          onClick={() => setActiveTab('cashbox')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'cashbox' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          Caja
        </button>
      </div>

      {/* Renderizado condicional según la solapa activa */}
      {activeTab === 'magistrates' ? (
        <MagistralesView />
      ) : activeTab === 'stock' ? (
        <div className="p-8 text-slate-400 text-center bg-[#0b0f19] border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-2">Módulo de Stock</h3>
          <p className="text-xs">Gestión y control de inventario de farmacia en desarrollo...</p>
        </div>
      ) : activeTab === 'patients' ? (
        <div className="p-8 text-slate-400 text-center bg-[#0b0f19] border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-2">Gestión de Clientes y Pacientes</h3>
          <p className="text-xs">Padrón unificado de clientes y obras sociales...</p>
        </div>
      ) : activeTab === 'cashbox' ? (
        <CashboxView />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          {/* Columna Izquierda: Buscador y Grilla del Carrito */}
          <div className="xl:col-span-2 space-y-4 flex flex-col h-full">
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

            <div className="flex-1 flex flex-col">
              <CartTable cart={cart} />
            </div>
          </div>

          {/* Columna Derecha: Panel de Cliente, Obra Social y Resumen de Pago */}
          <aside className="flex flex-col gap-4">
            <ClientPanel 
              selectedClient={selectedClient}
              onSelectClient={setSelectedClient}
            />

            <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
              <ObraSocialPanel 
                obraSocial={obraSocial} 
                setObraSocial={(val) => {
                  setObraSocial(val);
                  setIsValidatedOS(false);
                }} 
                onValidate={handleValidateOS}
                isValidated={isValidatedOS}
              />
            </div>

            <CheckoutSummary 
              cart={cart} 
              obraSocial={obraSocial}
              isValidatedOS={isValidatedOS}
              onCheckoutComplete={() => setCart([])}
            />
          </aside>
        </div>
      )}

      <ExtendedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={agregarAlCarrito} 
      />
    </div>
  );
}
