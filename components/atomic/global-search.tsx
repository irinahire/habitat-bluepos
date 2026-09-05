// components/header/global-search.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useHabitat } from "@/domain/habitatcontext";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { activeModule } = useHabitat();
  const supabase = createClient();

  // Derivamos el tipo de entidad esperado según el módulo activo (ej: 'libraryview' -> '!libro', 'restaurantview' -> '!plato')
  const getTargetTipo = () => {
    if (activeModule === 'libraryview') return '!libro';
    if (activeModule === 'restaurantview') return '!plato';
    if (activeModule === 'farmaview') return '!medicamento'; // o el tipo que corresponda
    return null;
  };

  const handleSearch = async (searchTerm: string) => {
    setQuery(searchTerm);
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('search_habitat', {
        search_query: searchTerm,
        target_tipo: getTargetTipo(),
        match_count: 5
      });

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error("Error en búsqueda polimórfica:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-4">
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Escribí para buscar..."
          className="w-full bg-gray-900/80 border border-white/15 rounded-xl pl-9 pr-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-all shadow-inner"
        />
      </div>

      {query.trim() && (
        <div className="absolute top-full mt-2 w-full bg-gray-950 border border-white/15 rounded-xl shadow-2xl backdrop-blur-xl z-[999] overflow-hidden">
          {loading ? (
            <div className="p-3 text-center text-xs text-gray-400">Buscando...</div>
          ) : results.length > 0 ? (
            <div className="max-h-60 overflow-y-auto divide-y divide-white/10">
              {results.map((item) => {
                // Extracción agnóstica del título o nombre según la estructura interna
                const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
                const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
                const nameOrTitle = innerObj?.identificacion?.titulo || innerObj?.identificacion?.nombre || item.raw_text || "Resultado";
                const price = innerObj?.identificacion?.precio?.[0]?.valor;

                return (
                  <div 
                    key={item.id}
                    className="p-3 hover:bg-white/5 cursor-pointer transition-colors flex flex-col gap-0.5"
                  >
                    <div className="text-sm font-medium text-white flex justify-between items-center">
                      <span>{nameOrTitle}</span>
                      {price && (
                        <span className="text-teal-400 font-semibold">${price}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 truncate">
                      {innerObj?.vista_cliente?.descripcion || item.raw_text}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-gray-400">No se encontraron resultados.</div>
          )}
        </div>
      )}
    </div>
  );
}
