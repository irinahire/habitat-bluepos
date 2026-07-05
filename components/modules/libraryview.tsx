"use client";

import { Search, BookOpen, Bookmark, Trash2, Tag } from "lucide-react";

export function LibraryView() {
  // Catálogo de libros de ejemplo
  const books = [
    { id: 1, title: "Cien años de soledad", author: "García Márquez", price: 22000 },
    { id: 2, title: "Sapiens", author: "Yuval Harari", price: 18500 },
    { id: 3, title: "El nombre del viento", author: "Patrick Rothfuss", price: 25000 },
    { id: 4, title: "Dune", author: "Frank Herbert", price: 28000 },
  ];

  // Carrito de préstamos de ejemplo
  const loanList = [
    { id: 1, title: "Cien años de soledad", price: 22000 },
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
            placeholder="Buscar libros por título o autor..." 
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Catálogo de Libros */}
        <div className="flex-1 p-6 bg-card border border-border rounded-3xl">
          <h3 className="text-xl font-bold text-blue-500 mb-5">Catálogo de Libros</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map(book => (
              <button key={book.id} className="flex flex-col items-center p-4 bg-background border border-border rounded-2xl hover:border-blue-500 transition hover:shadow-lg">
                <BookOpen className="size-10 text-blue-500 mb-3" />
                <span className="text-sm font-medium text-foreground text-center">{book.title}</span>
                <span className="text-xs text-muted-foreground">{book.author}</span>
                <span className="text-lg font-bold text-blue-600 mt-2">${book.price.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Columna Derecha: Préstamos y Resumen */}
      <div className="flex flex-col gap-6 p-6 bg-card border border-blue-500/20 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-blue-500">Préstamo Actual</h3>
        
        {/* Lista de Libros en Préstamo */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {loanList.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-background rounded-xl border border-border">
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-blue-600">${item.price.toLocaleString()}</span>
                <button className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md bg-secondary">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen Final */}
        <div className="mt-auto border-t border-border pt-6 space-y-5">
            <div className="flex justify-between items-center p-5 bg-blue-950/50 border border-blue-500 rounded-xl">
                <span className="text-2xl font-bold text-blue-100">TOTAL</span>
                <span className="text-4xl font-extrabold text-blue-300">$22.000</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                <button className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">CONFIRMAR PRÉSTAMO</button>
            </div>
        </div>
      </div>
    </div>
  );
}
