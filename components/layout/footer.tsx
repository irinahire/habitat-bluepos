// components/layout/footer.tsx
"use client";

import { useState } from "react";

export function Footer() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    { sender: "system", text: "Bienvenido al chat de atención de la sucursal." }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = { sender: "client", text: inputMessage };
    setMessages((prev) => [...prev, newMsg]);
    setInputMessage("");

    // Simulación de respuesta automática de la farmacia
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "pharmacy", text: "Recibido, en un momento te atendemos." }]);
    }, 1000);
  };

  return (
    <>
      <footer className="w-full border-t border-white/10 p-4 flex justify-between items-center bg-card relative">
        <span className="text-xs text-muted-foreground">Marquesina de estado del sistema...</span>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-green-700 transition flex items-center gap-2 shadow-lg shadow-green-900/20"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          Chat Sucursal
        </button>
      </footer>

      {/* Panel de Chat Integrado (Desplegable nativo desde el footer, sin pop-ups flotantes del navegador) */}
      {isChatOpen && (
        <div className="absolute bottom-16 right-4 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Cabecera del chat */}
          <div className="bg-slate-950 p-3 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Atención al Cliente</span>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg transition"
            >
              ✕
            </button>
          </div>

          {/* Listado de mensajes */}
          <div className="h-64 p-3 overflow-y-auto space-y-2 flex flex-col bg-slate-900/50 text-xs">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`p-2 rounded-xl max-w-[85%] ${
                  msg.sender === "client" 
                    ? "ml-auto bg-emerald-600 text-white" 
                    : "mr-auto bg-slate-800 text-slate-300"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input para escribir */}
          <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 bg-slate-950 flex gap-2">
            <input 
              type="text"
              placeholder="Escribí tu consulta..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              autoFocus
            />
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl font-bold text-xs transition"
            >
              Enviar
            </button>
          </form>

        </div>
      )}
    </>
  );
}
