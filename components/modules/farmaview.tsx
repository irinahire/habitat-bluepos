"use client"; // Importante porque usaremos algo de interactividad visual luego

import { Search, Barcode, Pill, Stethoscope, Trash2 } from "lucide-react";

export function Farmaview() {
  // Catálogo de ejemplo (datos estáticos para la visual)
  const medications = [
    { id: 1, name: "Ibuprofeno 400mg", price: 35.50, icon: Pill },
    { id: 2, name: "Amoxicilina 500mg", price: 14.80, icon: Pill },
    { id: 3, name: "Vitamina C 1000mg", price: 25.00, icon: Pill },
    { id: 4, name: "Crema Hidratante", price: 18.99, icon: Stethoscope },
    { id: 5, name: "Paracetamol 1g", price: 9.50, icon: Pill },
    { id: 6, name: "Suplemento Vitamínico", price: 45.00, icon: Pill },
  ];

  // Carrito de ejemplo
  const cart = [
    { id: 1, name: "Amoxicilina 500mg", qty: 1, price: 14.80 },
    { id: 4, name: "Crema Hidratante", qty: 2, price: 18.99 },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
      {/* Columna Izquierda: Buscador y Catálogo */}
      <div className="xl:col-span-2 flex flex-col gap-6">
        {/* Buscador */}
        <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-inner">
          <Search className="size-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar medicamento o producto... (ej. Ibuprofeno)" 
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80">
            <Barcode className="size-5 text-foreground" />
          </button>
        </div>

        {/* Catálogo de Productos */}
        <div className="flex-1 p-6 bg-card border border-border rounded-3xl">
          <h3 className="text-xl font-bold text-emerald-500 mb-5">Catálogo de Medicamentos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {medications.map(med => (
              <button key={med.id} className="flex flex-col items-center p-4 bg-background border border-border rounded-2xl hover:border-emerald-500 transition hover:shadow-lg">
                <med.icon className="size-10 text-emerald-500 mb-3" />
                <span className="text-sm font-medium text-foreground text-center">{med.name}</span>
                <span className="text-lg font-bold text-emerald-600 mt-1">${med.price.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Columna Derecha: Carrito y Resumen */}
      <div className="flex flex-col gap-6 p-6 bg-card border border-emerald-500/20 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-emerald-500">Carrito Actual</h3>
        
        {/* Lista del Carrito */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-background rounded-xl border border-border">
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground">Cant: {item.qty} @ ${item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-emerald-600">${(item.qty * item.price).toFixed(2)}</span>
                <button className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md bg-secondary">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
           {cart.length === 0 && (
            <p className="text-center text-muted-foreground py-10">El carrito está vacío</p>
           )}
        </div>

        {/* Resumen de Pago */}
        <div className="mt-auto border-t border-border pt-6 space-y-5">
            <div className="flex justify-between text-lg text-muted-foreground">
                <span>Subtotal</span>
                <span>$33.79</span>
            </div>
             <div className="flex justify-between text-lg text-muted-foreground">
                <span>IVA (21%)</span>
                <span>$7.10</span>
            </div>
            <div className="flex justify-between items-center p-5 bg-emerald-950/50 border border-emerald-500 rounded-xl">
                <span className="text-2xl font-bold text-emerald-100">TOTAL</span>
                <span className="text-4xl font-extrabold text-emerald-300">$40.89</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <button className="w-full py-3 px-4 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition">Desc. (Farma)</button>
                 <button className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition">COBRAR</button>
            </div>
        </div>
      </div>
    </div>
  );
}
