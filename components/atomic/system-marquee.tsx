// components/atomic/system-marquee.tsx
'use client';

import { useState, useEffect } from 'react';

const MESSAGES = [
  "⚠️ Aviso: Validador de OSDE operando con normalidad en la red.",
  "🚀 Novedad BluePOS: Procesamiento inteligente de recetas por IA habilitado.",
  "💡 Recordatorio: Verificá el stock crítico de monodrogas antes del cierre de turno.",
  "📢 Comunicado Central: Próxima actualización de padrones farmacéuticos programada para medianoche."
];

export default function SystemMarquee() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 max-w-2xl overflow-hidden whitespace-nowrap flex items-center h-6 text-xs text-slate-300 px-4 bg-slate-900/40 rounded-lg border border-slate-800/60">
      <span className="flex h-2 w-2 relative mr-3 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
      </span>
      <span className="transition-all duration-500 ease-in-out truncate">
        {MESSAGES[currentIndex]}
      </span>
    </div>
  );
}
