// components/atomic/checkout-summary.tsx
"use client";

interface CheckoutSummaryProps {
  cart: any[];
  onCheckout: () => void;
}

export function CheckoutSummary({ cart, onCheckout }: CheckoutSummaryProps) {
  const calculateItemPrice = (item: any) => {
    const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
    const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
    return Number(innerObj?.identificacion?.precio?.[0]?.valor || innerObj?.precio_lista || 0);
  };

  const total = cart.reduce((acc, curr) => acc + calculateItemPrice(curr), 0);

  return (
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
              const name = innerObj?.identificacion?.nombre || item.nombre || `Ítems #${idx + 1}`;
              const price = calculateItemPrice(item);

              return (
                <div key={idx} className="flex justify-between items-center text-xs text-slate-300 border-b border-slate-800/60 pb-1">
                  <span className="truncate max-w-[140px]">{name}</span>
                  <span className="font-semibold text-white">${price.toFixed(2)}</span>
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
          onClick={onCheckout}
          className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.99] text-sm"
        >
          PAGAR (F8)
        </button>
      </div>
    </div>
  );
}
