export function LibraryView() {
  const books = [
    { id: 1, title: "Cien años de soledad", price: 22000 },
    { id: 2, title: "Sapiens", price: 18500 },
    { id: 3, title: "El nombre del viento", price: 25000 },
    { id: 4, title: "Dune", price: 28000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-6 bg-blue-950/20 border border-blue-500/20 rounded-3xl">
        <h2 className="text-3xl font-bold text-blue-400">Catálogo de Libros</h2>
        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">
          Nuevo Libro
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-4 bg-card border border-border rounded-2xl hover:border-blue-500 transition-colors">
            <div className="h-32 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center font-bold text-blue-400">
              PORTADA
            </div>
            <h3 className="font-bold text-lg mb-1">{book.title}</h3>
            <p className="text-blue-500 font-bold text-xl">${book.price.toLocaleString()}</p>
            <button className="w-full mt-4 py-2 bg-secondary rounded-lg font-medium hover:bg-blue-900/40">
              Ver detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
