// components/atomic/client-panel.tsx
"use client";

import { useState } from "react";

interface ClientPanelProps {
  selectedClient: { nombre: string; apellido: string; documento: string } | null;
  onSelectClient: (client: any) => void;
}

export function ClientPanel({ selectedClient, onSelectClient }: ClientPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Lista simulada de clientes para búsqueda rápida en línea
  const mockClients = [
    { id: 1, nombre: "Juan", apellido: "Pérez", documento: "20-33445566-9" },
    { id: 2, nombre: "María", apellido: "Gómez", documento: "27-22111444-4" },
    { id: 3, nombre: "Carlos", apellido: "López", documento: "20-11223344-5" },
  ];

  const filteredClients = mockClients.filter(c => 
    `${c.nombre} ${c.apellido} ${c.documento}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3 shadow-lg">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cliente</h4>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline"
        >
          {isExpanded ? "Cerrar" : selectedClient ? "Cambiar" : "Buscar / Nuevo"}
        </button>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-300">
        {selectedClient ? (
          <div>
            <p className="font-semibold text-white">{selectedClient.nombre} {selectedClient.apellido}</p>
            <p className="text-xs text-slate-400">Doc: {selectedClient.documento}</p>
          </div>
        ) : (
          <span className="text-slate-500 italic">Consumidor Final</span>
        )}
      </div>

      {/* Sección desplegable integrada en la tarjeta (Cero pop-ups) */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
          <input 
            type="text"
            placeholder="Escribí para buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            autoFocus
          />
          <div className="max-h-36 overflow-y-auto space-y-1">
            {filteredClients.map((client) => (
              <div 
                key={client.id}
                onClick={() => {
                  onSelectClient(client);
                  setIsExpanded(false);
                  setSearchTerm("");
                }}
                className="p-2 hover:bg-slate-900 rounded-lg cursor-pointer text-xs text-slate-300 flex justify-between items-center transition"
              >
                <span>{client.nombre} {client.apellido}</span>
                <span className="text-slate-500">{client.documento}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
