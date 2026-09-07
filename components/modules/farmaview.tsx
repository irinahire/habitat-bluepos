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

interface FarmaviewProps {
  activeTab?: string;
}

export function Farmaview({ activeTab = 'pos' }: FarmaviewProps) {
  const [cart, setCart] = useState<any[]>([]);
  const [obraSocial, setObraSocial] = useState(""); 
  const [isValidatedOS, setIsValidatedOS] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  // Estados para los nuevos modales discretos de Cliente y Obra Social
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isOsModalOpen, setIsOsModalOpen] = useState(false);

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
    setIsOsModalOpen(false);
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
      // Atajos rápidos nuevos para cliente (F2) y obra social (F3)
      if (e.key === 'F2') {
        e.preventDefault();
        setIsClientModalOpen(prev => !prev);
      }
      if (e.key === 'F3') {
        e.preventDefault();
        setIsOsModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative h-full p-4 flex flex-col gap-4">
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

            <div className="w-full">
              <CartTable cart={cart} />
            </div>
          </div>

          {/* Columna Derecha: Exclusiva para el Resumen del Facturador, con leyendas discretas arriba */}
          <aside className="flex flex-col gap-4">
            {/* Leyenda discreta de Cliente (F2) */}
            <div 
              onClick={() => setIsClientModalOpen(true)}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-3 cursor-pointer transition flex items-center justify-between text-xs text-slate-400 group shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Cliente (F2)</span>
                <span className="text-white font-medium">
                  {selectedClient?.nombre || selectedClient?.name || "Consumidor Final"}
                </span>
              </div>
              <span className="text-emerald-400 opacity-60 group-hover:opacity-100 transition text-[11px]">Cambiar ⚙️</span>
            </div>

            {/* Leyenda discreta de Obra Social (F3) */}
            <div 
              onClick={() => setIsOsModalOpen(true)}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-xl px-4 py-3 cursor-pointer transition flex items-center justify-between text-xs text-slate-400 group shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Obra Social / Cobertura (F3)</span>
                <span className={`font-medium ${isValidatedOS ? 'text-emerald-400' : 'text-white'}`}>
                  {obraSocial ? `${obraSocial.toUpperCase()} ${isValidatedOS ? '✓ (Validada)' : '(Sin validar)'}` : "Particular / Ninguna"}
                </span>
              </div>
              <span className="text-emerald-400 opacity-60 group-hover:opacity-100 transition text-[11px]">Gestionar 🛡️</span>
            </div>

            {/* Columna dedicada únicamente al Resumen del Facturador */}
            <CheckoutSummary 
              cart={cart} 
              obraSocial={obraSocial}
              isValidatedOS={isValidatedOS}
              onCheckoutComplete={() => {
                setCart([]);
                setSelectedClient(null);
                setObraSocial("");
                setIsValidatedOS(false);
              }}
            />
          </aside>
        </div>
      )}

      {/* Modal Búsqueda Extendida (F9) */}
      <ExtendedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={agregarAlCarrito} 
      />

      {/* Modal Selector de Cliente (F2) */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Seleccionar Cliente (F2)</h3>
              <button onClick={() => setIsClientModalOpen(false)} className="text-slate-400 hover:text-white text-xs">✕ Cerrar</button>
            </div>
            <div className="py-2">
              <ClientPanel 
                selectedClient={selectedClient}
                onSelectClient={(client) => {
                  setSelectedClient(client);
                  setIsClientModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Validador de Obra Social (F3) */}
      {isOsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Validación de Obra Social (F3)</h3>
              <button onClick={() => setIsOsModalOpen(false)} className="text-slate-400 hover:text-white text-xs">✕ Cerrar</button>
            </div>
            <div className="py-2">
              <ObraSocialPanel 
                obraSocial={obraSocial} 
                setObraSocial={setObraSocial} 
                onValidate={handleValidateOS}
                isValidated={isValidatedOS}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
