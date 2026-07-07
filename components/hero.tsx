export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 select-none animate-in fade-in duration-1000">
      {/* Espiral áurea (Proporción Fibonacci) */}
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

      {/* Contenido Conceptualmente Abstracto */}
      <div className="flex flex-col items-center space-y-8 text-center">
        <div className="h-px w-24 bg-emerald-500/20" />
        
        <p className="text-[10px] tracking-[0.8em] uppercase font-medium text-emerald-500/50">
          Recursive Genesis
        </p>
        
        <h2 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground/70 max-w-xl">
          Everything that scales is already contained within its origin.
        </h2>
        
        <div className="flex gap-2 pt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-emerald-500/20" />
          ))}
        </div>
      </div>
    </div>
  );
}
