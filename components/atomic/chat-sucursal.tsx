// components/atomic/chat-sucursal.tsx
'use client';

import { useState } from 'react';
import { useHabitat } from '@/domain/habitatcontext';

export default function ChatSucursal() {
  const { activeModule } = useHabitat();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([
    { remitente: 'sistema', texto: 'Bienvenido al chat de atención de la sucursal.' },
    { remitente: 'cliente', texto: 'Hola, tengo una consulta sobre mi pedido.' },
  ]);

  const enviarMensaje = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim()) return;
    setMensajes([...mensajes, { remitente: 'negocio', texto: mensaje }]);
    setMensaje('');
  };

  // Renderizado condicional del panel de automatización según el módulo activo exacto
  const renderModuleActions = () => {
    if (activeModule === 'farmaview') {
      return (
        <div className="my-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-indigo-400">Gestión Inteligente de Receta</p>
            <p className="text-[11px] text-slate-400">El cliente adjuntó la documentación médica.</p>
          </div>
          <button 
            onClick={() => alert("Procesando receta por IA, validando y generando ticket...")}
            className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
          >
            Validar y Facturar (F8)
          </button>
        </div>
      );
    }

    if (activeModule === 'restaurantview') {
      return (
        <div className="my-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-orange-400">Gestión de Delivery / Pedidos</p>
            <p className="text-[11px] text-slate-400">Verificar estado de envío y comandas.</p>
          </div>
          <button 
            onClick={() => alert("Verificando estado del pedido en cocina y delivery...")}
            className="py-1.5 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition shadow"
          >
            Chequear Pedido
          </button>
        </div>
      );
    }

    if (activeModule === 'libraryview') {
      return (
        <div className="my-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-sky-400">Gestión de Encargos</p>
            <p className="text-[11px] text-slate-400">Verificar disponibilidad de título o editorial.</p>
          </div>
          <button 
            onClick={() => alert("Verificando disponibilidad en catálogo...")}
            className="py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow"
          >
            Consultar Título
          </button>
        </div>
      );
    }

    return null;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-5 rounded-full shadow-lg flex items-center gap-2 transition z-50 text-sm"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
        Chat Sucursal
      </button>
    );
  }

  return (
    <>
      {isFullScreen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity" />
      )}

      <div
        className={`fixed z-50 bg-[#0b0f19] border border-slate-800 shadow-2xl flex flex-col transition-all duration-300 ${
          isFullScreen
            ? 'inset-6 md:inset-16 rounded-2xl max-w-7xl mx-auto my-auto h-[85vh]'
            : 'bottom-4 right-4 w-80 md:w-96 h-[480px] rounded-2xl'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#111827] px-4 py-3 rounded-t-2xl border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-bold text-white">Atención al Cliente - Sucursal</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-800 transition"
              title={isFullScreen ? "Reducir a burbuja" : "Pantalla completa"}
            >
              {isFullScreen ? "↙ Minimizar" : "↗ Expandir"}
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsFullScreen(false);
              }}
              className="text-slate-400 hover:text-white font-bold px-2.5 py-1 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition"
              title="Cerrar chat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="flex-1 flex overflow-hidden">
          {isFullScreen && (
            <div className="w-1/3 border-r border-slate-800 p-4 bg-[#07090e] hidden md:flex md:flex-col overflow-y-auto">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Conversaciones Activas</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-indigo-500/30 cursor-pointer">
                  <p className="text-sm font-semibold text-white">Juan Pérez</p>
                  <p className="text-xs text-slate-400 truncate">Consulta sobre estado de gestión...</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col justify-between p-4 bg-[#090d16] overflow-y-auto">
            <div className="space-y-3 overflow-y-auto flex-1 pr-2">
              {mensajes.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.remitente === 'negocio' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl text-sm ${
                      m.remitente === 'negocio'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : m.remitente === 'sistema'
                        ? 'bg-slate-800 text-slate-300 text-xs w-full text-center'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    {m.texto}
                  </div>
                </div>
              ))}
            </div>

            {/* Automatización contextual según el módulo activo */}
            {isFullScreen && renderModuleActions()}

            <form onSubmit={enviarMensaje} className="mt-3 flex gap-2">
              <input
                type="text"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribí tu respuesta..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
