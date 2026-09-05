// components/atomic/checkout-summary.tsx
"use client";

import { useState } from "react";

interface CheckoutSummaryProps {
  cart: any[];
  onCheckoutComplete?: () => void;
  obraSocial?: string;
  isValidatedOS?: boolean;
}

export function CheckoutSummary({ cart, onCheckoutComplete, obraSocial, isValidatedOS }: CheckoutSummaryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateItemPrice = (item: any) => {
    const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
    const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
    return Number(innerObj?.identificacion?.precio?.[0]?.valor || innerObj?.precio_lista || 0);
  };

  const subtotal = cart.reduce((acc, curr) => {
    const price = calculateItemPrice(curr);
    const qty = curr.cantidad || 1;
    return acc + (price * qty);
  }, 0);

  const discount = isValidatedOS ? subtotal * 0.40 : 0;
  const total = subtotal - discount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between shadow-lg space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resumen del Ticket</h4>
          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
            {cart.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">Sin ítems en el ticket actual...</p>
            ) : (
              cart.map((item, idx) => {
                const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
                const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
                const name = innerObj?.identificacion?.nombre || item.nombre || `Ítem #${idx + 1}`;
                const unitPrice = calculateItemPrice(item);
                const qty = item.cantidad || 1;
                const itemTotal = unitPrice * qty;

                return (
                  <div key={idx} className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/60 pb-1">
                    <div className="truncate max-w-[130px]">
                      <span className="font-medium text-white">{name}</span>
                      <span className="text-[10px] text-slate-500 block">Cant: {qty}</span>
                    </div>
                    <span className="font-semibold text-white">${itemTotal.toFixed(2)}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-medium text-sm">Total a Pagar</span>
            <span className="text-2xl font-bold text-white">
              ${total.toFixed(2)}
            </span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.99] text-sm"
          >
            PAGAR (F8)
          </button>
        </div>
      </div>

      {/* Modal interno integrado en el componente (Cero pop-ups flotantes) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl flex flex-col space-y-6">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Liquidación del Ticket</h3>
                <p className="text-xs text-slate-400">Resumen de cobro y emisión de comprobante</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm font-bold px-3 py-1 bg-slate-800 rounded-xl transition"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {cart.map((item, idx) => {
                const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
                const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
                const name = innerObj?.identificacion?.nombre || item.nombre || `Ítem #${idx + 1}`;
                const unitPrice = calculateItemPrice(item);
                const qty = item.cantidad || 1;
                const itemTotal = unitPrice * qty;

                return (
                  <div key={idx} className="flex justify-between items-center text-sm text-slate-300 border-b border-slate-800/50 pb-2">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{name}</span>
                      <span className="text-xs text-slate-500">Cant: {qty} x ${unitPrice.toFixed(2)}</span>
                    </div>
                    <span className="font-bold text-emerald-400">${itemTotal.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal Bruto</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {isValidatedOS && obraSocial && (
                <div className="flex justify-between text-xs text-emerald-400">
                  <span>Cobertura Obra Social ({obraSocial.toUpperCase()})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-lg font-bold text-white">
                <span>Total a Cobrar</span>
                <span className="text-2xl text-emerald-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={handlePrint}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm transition"
              >
                🖨️ Imprimir Ticket
              </button>
              <button 
                onClick={() => {
                  alert("¡Cobro registrado con éxito!");
                  setIsModalOpen(false);
                  if (onCheckoutComplete) onCheckoutComplete();
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-900/30"
              >
                Confirmar Cobro
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
