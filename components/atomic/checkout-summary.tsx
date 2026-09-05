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
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-400 font-medium">Total a Pagar</span>
        <span className="text-3xl font-bold text-white">
          ${total.toFixed(2)}
        </span>
      </div>
      <button 
        onClick={onCheckout}
        className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.99]"
      >
        PAGAR (F8)
      </button>
    </div>
  );
}
