// components/atomic/cart-table.tsx
"use client";

interface CartTableProps {
  cart: any[];
}

export function CartTable({ cart }: CartTableProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="text-emerald-500 uppercase border-b border-slate-800">
              <th className="pb-3 font-semibold">Producto</th>
              <th className="pb-3 text-center font-semibold">Cant (Shift+Num=Frac)</th>
              <th className="pb-3 font-semibold">Precio Unit.</th>
              <th className="pb-3 font-semibold">Desc. OS</th>
              <th className="pb-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {cart.length > 0 ? (
              cart.map((item, index) => {
                const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
                const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
                const name = innerObj?.identificacion?.nombre || innerObj?.identificacion?.titulo || item.raw_text || "Producto";
                const price = Number(innerObj?.identificacion?.precio?.[0]?.valor || innerObj?.precio_lista || 0);

                return (
                  <tr key={index}>
                    <td className="py-4 font-medium text-white">{name}</td>
                    <td className="text-center py-4">
                      <input 
                        type="number" 
                        defaultValue={1} 
                        className="w-16 bg-slate-950 border border-slate-700 rounded p-1 text-center text-white text-sm focus:outline-none focus:border-emerald-500" 
                      />
                    </td>
                    <td className="py-4">${price.toFixed(2)}</td>
                    <td className="py-4 text-emerald-400">-$0.00</td>
                    <td className="py-4 font-bold text-white">${price.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="py-6 text-slate-500 text-center" colSpan={5}>No hay productos agregados...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
