"use client";

export function LibraryView() {
  return (
    <div className="p-6 bg-slate-950 rounded-3xl border border-blue-900/50">
      <div className="flex items-center gap-3 mb-6">
        {/* SVG de Libro */}
        <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        <h2 className="text-3xl font-bold text-blue-400">Sistema de Librería</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900 rounded-2xl border border-blue-800">
          <h3 className="font-bold text-white">Catálogo</h3>
          <p className="text-blue-300 text-sm">Gestiona tus ejemplares</p>
        </div>
        <div className="p-4 bg-slate-900 rounded-2xl border border-blue-800">
          <h3 className="font-bold text-white">Préstamos</h3>
          <p className="text-blue-300 text-sm">Control de movimientos</p>
        </div>
      </div>
    </div>
  );
}
