// components/atomic/cart-table.tsx
"use client";

interface CartTableProps {
  cart: any[];
}

export function CartTable({ cart }: CartTableProps) {
  return (
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
          {cart.length > 0 ? (
            cart.map((item, index) => {
              const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
              const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
              const name = innerObj?.identificacion?.nombre || innerObj?.identificacion?.titulo || item.raw_text || "Producto";
              const price = Number(innerObj?.identificacion?.precio?.[0]?.valor || innerObj?.precio_lista || 0);

              return (
                <tr key={index} className="border-b border-slate-800/50">
                  <td className="py-4 font-medium text-white">{name}</td>
                  <td className="text-center">
                    <input 
                      type="number" 
                      defaultValue={1} 
                      className="w-16 bg-slate-950 border border-slate-700 rounded p-1 text-center text-white text-sm focus:outline-none focus:border-emerald-500" 
                    />
                  </td>
                  <td>${price.toFixed(2)}</td>
                  <td className="text-emerald-400">-$0.00</td>
                  <td className="font-bold text-white">${price.toFixed(2)}</td>
                </tr>
              );
            })
          ) : (
            <tr className="border-b border-slate-800/50">
              <td className="py-4 text-slate-500 text-center" colSpan={5}>No hay productos agregados...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
