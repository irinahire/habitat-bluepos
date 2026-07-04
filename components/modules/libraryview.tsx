export function LibraryView() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Sistema de Librería</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-blue-500/30 p-6 rounded-lg bg-slate-900">
          <h2 className="text-xl font-bold">Catálogo</h2>
          <p className="text-gray-400">Gestión de inventario de libros.</p>
        </div>
        
        <div className="border border-blue-500/30 p-6 rounded-lg bg-slate-900">
          <h2 className="text-xl font-bold">Préstamos</h2>
          <p className="text-gray-400">Control de salidas y retornos.</p>
        </div>
      </div>
    </div>
  );
}
