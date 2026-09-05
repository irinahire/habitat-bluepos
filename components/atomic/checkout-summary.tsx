// components/atomic/checkout-summary.tsx
"use client";

interface CheckoutSummaryProps {
  cart: any[];
  onCheckout: () => void;
}

export function CheckoutSummary({ cart, onCheckout }: CheckoutSummaryProps) {
  const total = cart.reduce((acc, curr) => {
    const parsedData = typeof curr.data === 'string' ? JSON.parse(curr.data) : curr.data;
    const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
    const price = Number(innerObj?.identificacion?.precio?.[0]?.valor || innerObj?.precio_lista || 0);
    return acc + price;
  }, 0);

  return (
    <div className="mt-auto border-t border-slate-800 pt-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-slate-400">Total a Pagar</span>
        <span className="text-3xl font-bold text-white">
          ${total.toFixed(2)}
        </span>
      </div>
      <button 
        onClick={onCheckout}
        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
      >
        PAGAR (F8)
      </button>
    </div>
  );
}
