export function LibraryView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center p-6 bg-blue-950/20 border border-blue-500/20 rounded-3xl">
        <h2 className="text-3xl font-bold text-blue-400">Catálogo de Libros</h2>
        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">
          Nuevo Libro
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Libro 1 */}
        <div className="p-4 bg-card border border-border rounded-2xl">
          <div className="h-32 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center font-bold text-blue-400">PORTADA</div>
          <h3 className="font-bold text-lg mb-1">Cien años de soledad</h3>
          <p className="text-blue-500 font-bold text-xl">$22.000</p>
          <button className="w-full mt-4 py-2 bg-secondary rounded-lg font-medium">Ver detalles</button>
        </div>

        {/* Libro 2 */}
        <div className="p-4 bg-card border border-border rounded-2xl">
          <div className="h-32 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center font-bold text-blue-400">PORTADA</div>
          <h3 className="font-bold text-lg mb-1">Sapiens</h3>
          <p className="text-blue-500 font-bold text-xl">$18.500</p>
          <button className="w-full mt-4 py-2 bg-secondary rounded-lg font-medium">Ver detalles</button>
        </div>

        {/* Libro 3 */}
        <div className="p-4 bg-card border border-border rounded-2xl">
          <div className="h-32 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center font-bold text-blue-400">PORTADA</div>
          <h3 className="font-bold text-lg mb-1">El nombre del viento</h3>
          <p className="text-blue-500 font-bold text-xl">$25.000</p>
          <button className="w-full mt-4 py-2 bg-secondary rounded-lg font-medium">Ver detalles</button>
        </div>

        {/* Libro 4 */}
        <div className="p-4 bg-card border border-border rounded-2xl">
          <div className="h-32 bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center font-bold text-blue-400">PORTADA</div>
          <h3 className="font-bold text-lg mb-1">Dune</h3>
          <p className="text-blue-500 font-bold text-xl">$28.000</p>
          <button className="w-full mt-4 py-2 bg-secondary rounded-lg font-medium">Ver detalles</button>
        </div>
      </div>
    </div>
  );
}
