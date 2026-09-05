// components/header/global-search.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  // Manejo de atajos de teclado (Ctrl+B o F9 para enfocar el buscador)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'b') || e.key === 'F9') {
        e.preventDefault();
        const inputElement = document.getElementById('global-search-input');
        inputElement?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Función de búsqueda contextual
  const handleSearch = async (searchTerm: string) => {
    setQuery(searchTerm);
    if (!searchTerm.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    try {
      // Llamamos a la función RPC que filtra por service='bluepos' y usa FTS/texto
      const { data, error } = await supabase.rpc('search_habitat', {
        search_query: searchTerm,
        target_service: 'bluepos',
        match_count: 5
      });

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error("Error en búsqueda contextual:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-4">
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-400 text-sm">🔍</span>
        <input
          id="global-search-input"
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Ctrl+B para buscar (comercial, genérico o síntoma)..."
          className="w-full bg-gray-900/80 border border-white/15 rounded-xl pl-9 pr-24 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-all shadow-inner"
        />
        <div className="absolute right-2 flex items-center gap-1">
          <span className="text-[10px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded border border-white/10">
            F9 / Ctrl+B
          </span>
        </div>
      </div>

      {/* Dropdown de resultados contextuales */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-gray-950 border border-white/15 rounded-xl shadow-2xl backdrop-blur-xl z-[999] overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-xs text-gray-400">Buscando en el habitat...</div>
          ) : results.length > 0 ? (
            <div className="max-h-60 overflow-y-auto divide-y divide-white/10">
              {results.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => {
                    // Acción al seleccionar un producto o cliente (ej: agregar al carrito)
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="p-3 hover:bg-white/5 cursor-pointer transition-colors flex flex-col gap-0.5"
                >
                  <div className="text-sm font-medium text-white flex justify-between items-center">
                    <span>{item.data?.name || item.raw_text || "Elemento sin nombre"}</span>
                    {item.data?.price && (
                      <span className="text-teal-400 font-semibold">${item.data.price}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 truncate">
                    {item.data?.description || item.metadata?.category || "Registro de BluePOS"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-gray-400">No se encontraron resultados para &quot;{query}&quot;</div>
          )}
        </div>
      )}
    </div>
  );
}
