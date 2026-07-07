export function Hero() {
  const features = [
    { title: "Gestión Inteligente", desc: "Arquitectura modular que crece con tu farmacia." },
    { title: "Sincronización Total", desc: "Precios y catálogos al día con laboratorios." },
    { title: "Control Fiscal", desc: "Emisión automática CAE/CAEA integrada." },
    { title: "Recetario Magistral", desc: "Trazabilidad completa de fórmulas a medida." },
  ];

  return (
    <div className="flex flex-col gap-12 items-center py-16 px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black tracking-tighter text-emerald-500">
          FRACTAL
        </h1>
        <p className="text-xl text-slate-400 font-light italic">
          La evolución en la gestión farmacéutica.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {features.map((f, i) => (
          <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all">
            <h3 className="text-emerald-400 font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-slate-400">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-slate-500">Sistema en fase de optimización operativa.</p>
      </div>
    </div>
  );
}
