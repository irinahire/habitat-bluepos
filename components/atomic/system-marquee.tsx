// components/atomic/system-marquee.tsx
'use client';

import { useState, useEffect } from 'react';
import { useHabitat } from '@/domain/habitatcontext';

export default function SystemMarquee() {
  const { activeModule } = useHabitat();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mensajes segmentados según los identificadores reales del sistema
  const getMessages = () => {
    switch (activeModule) {
      case 'farmaview':
        return [
          "⚠️ Aviso: Validador de OSDE y PAMI operando con normalidad.",
          "🚀 Novedad BluePOS: Procesamiento inteligente de recetas por IA habilitado.",
          "💡 Recordatorio: Verificá el stock crítico de monodrogas antes del cierre."
        ];
      case 'restaurantview':
        return [
          "🍽️ Estado de Red: Integración con pasarelas de delivery sincronizada.",
          "🚀 Novedad BluePOS: Impresión automática de comandas en cocina activa.",
          "💡 Recordatorio: Controlá el arqueo de caja por turno de salón."
        ];
      case 'libraryview':
        return [
          "📚 Estado de Red: Catálogo de editoriales y ISBN actualizado.",
          "🚀 Novedad BluePOS: Búsqueda extendida por autor y género optimizada.",
          "💡 Recordatorio: Revisá los encargo de libros pendientes de retiro."
        ];
      default:
        return [
          "Sistema operativo y sincronizado con BluePOS v2.6.",
          "Escáner QR de clientes activo en pasarela principal.",
          "Supabase Realtime escuchando canales de sucursal."
        ];
    }
  };

  const messages = getMessages();

  useEffect(() => {
    setCurrentIndex(0); // Reiniciar índice al cambiar de módulo
  }, [activeModule]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex-1 max-w-3xl overflow-hidden whitespace-nowrap flex items-center h-6 text-xs text-slate-300 px-4 bg-slate-900/40 rounded-lg border border-slate-800/60">
      <span className="flex h-2 w-2 relative mr-3 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
      </span>
      <span className="transition-all duration-500 ease-in-out truncate">
        {messages[currentIndex]}
      </span>
    </div>
  );
}
