// components/modules/farmaview.tsx
"use client";

import { useState, useEffect } from "react";
import { GlobalSearch } from "@/components/atomic/global-search";
import { CartTable } from "@/components/atomic/cart-table";
import { ClientPanel } from "@/components/atomic/client-panel";
import { ObraSocialPanel } from "@/components/atomic/obra-social-panel";
import { CheckoutSummary } from "@/components/atomic/checkout-summary";
import { ExtendedSearchModal } from "@/components/atomic/extended-search-modal";

export function Farmaview() {
  const [cart, setCart] = useState<any[]>([]);
  const [obraSocial, setObraSocial] = useState(""); 
  const [isValidatedOS, setIsValidatedOS] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  // Lógica para agrupar productos idénticos incrementando su cantidad en lugar de duplicar filas
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
    <div className="relative h-full p-4">
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

        {/* Columna Derecha: Panel de Cliente, Obra Social y Resumen de Pago con Modal Interno */}
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

      <ExtendedSearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSelect={agregarAlCarrito} 
      />
    </div>
  );
}
