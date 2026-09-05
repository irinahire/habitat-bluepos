// components/hero.tsx
"use client";

import Link from "next/link";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 select-none animate-in fade-in duration-1000">
      {/* Espiral áurea (Proporción Fibonacci) - Intacta */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-16 group">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-emerald-500/40 group-hover:text-emerald-500/60 transition-colors duration-700"
        >
          {/* Rectángulos áureos de referencia */}
          <rect x="0" y="0" width="100" height="61.8" stroke="currentColor" strokeWidth="0.2" />
          <rect x="61.8" y="0" width="38.2" height="61.8" stroke="currentColor" strokeWidth="0.2" />
          <rect x="61.8" y="38.2" width="38.2" height="23.6" stroke="currentColor" strokeWidth="0.2" />
          
          {/* Path de la Espiral */}
          <path
            d="M0 61.8 C0 0 61.8 0 61.8 61.8 C61.8 100 100 100 100 61.8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
          />
          
          {/* Nodos de convergencia */}
          <circle cx="61.8" cy="61.8" r="0.8" fill="currentColor" />
          <circle cx="0" cy="61.8" r="0.5" fill="currentColor" />
        </svg>
      </div>

      {/* Contenido Comercial y de Conversión */}
      <div className="flex flex-col items-center space-y-8 text-center">
        <div className="h-px w-24 bg-emerald-500/20" />
        
        <p className="text-[10px] tracking-[0.8em] uppercase font-medium text-emerald-500/50">
          BluePOS Pharmacy Ecosystem
        </p>
        
        <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground/80 max-w-xl">
          El sistema de gestión modular de alta velocidad diseñado exclusivamente para farmacias modernas.
        </h2>
        
        {/* Botones de Acción: Coordinar Demostración y Contratar BluePOS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link 
            href="https://wa.me/tu-numero-de-contacto?text=Hola,%20quiero%20coordinar%20una%20demostración%20de%20BluePOS" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-200 rounded-full text-xs font-semibold tracking-wider transition-all shadow-lg"
          >
            Coordinar Demostración
          </Link>

          <Link 
            href="https://link.mercadopago.com.ar/tu-enlace-de-pago" // Reemplazá con tu link de pasarela de pago real
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-bold tracking-wider transition-all shadow-lg shadow-emerald-900/30 flex items-center gap-2"
          >
            <span>Contratar BluePOS</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="flex gap-2 pt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-emerald-500/20" />
          ))}
        </div>
      </div>
    </div>
  );
}
