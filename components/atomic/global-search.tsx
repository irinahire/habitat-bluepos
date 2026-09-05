// components/atomic/global-search.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useHabitat } from "@/domain/habitatcontext";

interface GlobalSearchProps {
  onSelect?: (item: any) => void;
  placeholder?: string;
  id?: string; // <-- Agregado aquí
}

export function GlobalSearch({ onSelect, placeholder, id }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { activeModule } = useHabitat();
  const supabase = createClient();

  const getTargetTipo = () => {
    if (activeModule === 'libraryview') return '!libro';
    if (activeModule === 'restaurantview') return '!plato';
    if (activeModule === 'farmaview') return '!medicamento';
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

  const handleItemClick = (item: any) => {
    if (onSelect) {
      onSelect(item);
    }
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <span className="absolute left-3 text-emerald-500 text-sm">🔍</span>
        <input
          id={id} // <-- Pasado al input nativo
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder || "Escribí para buscar..."}
          className="w-full bg-slate-900/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
        />
      </div>

      {query.trim() && (
        <div className="absolute top-full mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-xl z-[999] overflow-hidden">
          {loading ? (
            <div className="p-3 text-center text-xs text-slate-400">Buscando...</div>
          ) : results.length > 0 ? (
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-800">
              {results.map((item) => {
                const parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
                const innerObj = parsedData?.[Object.keys(parsedData)[0]] || {};
                const nameOrTitle = innerObj?.identificacion?.titulo || innerObj?.identificacion?.nombre || item.raw_text || "Resultado";
                const price = innerObj?.identificacion?.precio?.[0]?.valor || innerObj?.precio_lista;

                return (
                  <div 
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="p-3 hover:bg-emerald-900/40 cursor-pointer transition-colors flex flex-col gap-0.5"
                  >
                    <div className="text-sm font-medium text-white flex justify-between items-center">
                      <span>{nameOrTitle}</span>
                      {price && (
                        <span className="text-emerald-400 font-semibold">${price}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 truncate">
                      {innerObj?.vista_cliente?.descripcion || item.raw_text}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-slate-400">No se encontraron resultados.</div>
          )}
        </div>
      )}
    </div>
  );
}
