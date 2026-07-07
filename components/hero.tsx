export function Hero() {
  return (
    <div className="flex flex-col gap-8 items-center py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-500">
          Fractal
        </h1>
        <p className="text-xl text-slate-400">
          Gestión Inteligente de Farmacia
        </p>
      </div>

      <p className="text-lg text-slate-300 max-w-xl text-center">
        Bienvenido al sistema. Desde aquí podrás acceder a los módulos de 
        facturación, stock, cuentas corrientes y gestión de magistrales.
      </p>

      {/* Aquí podremos agregar botones de acceso rápido más adelante */}
      <div className="flex gap-4 mt-4">
        <div className="px-4 py-2 bg-emerald-900/30 border border-emerald-800 rounded-lg text-emerald-300 text-sm">
          Sistema Operativo
        </div>
        <div className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 text-sm">
          Estado: Conectado
        </div>
      </div>
      
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
