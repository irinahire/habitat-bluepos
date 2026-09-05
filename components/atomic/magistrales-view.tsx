// components/atomic/magistrales-view.tsx
'use client';

import { useState } from 'react';

export default function MagistralesView() {
  const [formula, setFormula] = useState({
    paciente: '',
    medico: '',
    formaFarmaceutica: 'Cápsulas',
    cantidadUnidades: 30,
    componentes: [
      { principioActivo: '', cantidad: '', unidad: 'g' }
    ]
  });

  const agregarComponente = () => {
    setFormula({
      ...formula,
      componentes: [...formula.componentes, { principioActivo: '', cantidad: '', unidad: 'g' }]
    });
  };

  const handleComponenteChange = (index: number, field: string, value: string) => {
    const nuevosComponentes = [...formula.componentes];
    nuevosComponentes[index] = { ...nuevosComponentes[index], [field]: value };
    setFormula({ ...formula, componentes: nuevosComponentes });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-xl text-white">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold">Preparación de Recetas Magistrales</h2>
          <p className="text-xs text-slate-400">Formulación magistral a medida y cálculo de principios activos.</p>
        </div>
        <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-800 py-1 px-3 rounded-full font-semibold">
          Módulo Exclusivo - Farmacia
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Paciente</label>
          <input 
            type="text" 
            placeholder="Buscar o ingresar nombre del paciente..." 
            value={formula.paciente}
            onChange={(e) => setFormula({...formula, paciente: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Médico Prescriptor</label>
          <input 
            type="text" 
            placeholder="Nombre y matrícula del médico..." 
            value={formula.medico}
            onChange={(e) => setFormula({...formula, medico: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Forma Farmacéutica</label>
          <select 
            value={formula.formaFarmaceutica}
            onChange={(e) => setFormula({...formula, formaFarmaceutica: e.target.value})}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value="Cápsulas">Cápsulas</option>
            <option value="Crema">Crema / Ungüento</option>
            <option value="Jarabe">Jarabe / Solución</option>
            <option value="Pociones">Loción</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Cantidad / Unidades a Preparar</label>
          <input 
            type="number" 
            value={formula.cantidadUnidades}
            onChange={(e) => setFormula({...formula, cantidadUnidades: Number(e.target.value)})}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-slate-300">Composición de Principios Activos y Excipientes</h3>
          <button 
            onClick={agregarComponente}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-indigo-400 font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            + Agregar Componente
          </button>
        </div>

        <div className="space-y-3">
          {formula.componentes.map((comp, idx) => (
            <div key={idx} className="flex gap-3 items-center bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <input 
                type="text" 
                placeholder="Principio activo / Monodroga" 
                value={comp.principioActivo}
                onChange={(e) => handleComponenteChange(idx, 'principioActivo', e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
              <input 
                type="text" 
                placeholder="Cantidad" 
                value={comp.cantidad}
                onChange={(e) => handleComponenteChange(idx, 'cantidad', e.target.value)}
                className="w-28 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
              />
              <select 
                value={comp.unidad}
                onChange={(e) => handleComponenteChange(idx, 'unidad', e.target.value)}
                className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white outline-none"
              >
                <option value="g">g</option>
                <option value="mg">mg</option>
                <option value="ml">ml</option>
                <option value="UI">UI</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        <button 
          onClick={() => alert("Guardando fórmula magistral en el hábitat...")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition shadow-lg"
        >
          Guardar y Calcular Fórmula
        </button>
      </div>
    </div>
  );
}
