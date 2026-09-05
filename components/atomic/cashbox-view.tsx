// components/atomic/cashbox-view.tsx
'use client';

import { useState } from 'react';

export default function CashboxView() {
  const [cashState, setCashState] = useState({
    montoInicial: 15000,
    ingresosEfectivo: 45000,
    ingresosTarjetas: 120000,
    retiros: 10000,
  });

  const totalCalculado = cashState.montoInicial + cashState.ingresosEfectivo - cashState.retiros;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#0b0f19] border border-slate-800 rounded-2xl shadow-xl text-white">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold">Arqueo y Control de Caja</h2>
          <p className="text-xs text-slate-400">Gestión de turnos, ingresos y balance de caja actual.</p>
        </div>
        <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 py-1 px-3 rounded-full font-semibold">
          Turno Abierto #402
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-1">Monto Inicial (Fondo)</p>
          <p className="text-lg font-bold text-slate-200">${cashState.montoInicial.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-1">Ingresos en Efectivo</p>
          <p className="text-lg font-bold text-emerald-400">+${cashState.ingresosEfectivo.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-400 mb-1">Total Tarjetas / Electrónico</p>
          <p className="text-lg font-bold text-indigo-400">${cashState.ingresosTarjetas.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-white">Efectivo Esperado en Caja</h3>
          <p className="text-xs text-slate-400">Calculado automáticamente (Fondo + Ingresos - Retiros)</p>
        </div>
        <div className="text-2xl font-black text-emerald-400">
          ${totalCalculado.toLocaleString()}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        <button 
          onClick={() => alert("Registrando movimiento o retiro de efectivo...")}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 px-5 rounded-xl text-xs transition border border-slate-700"
        >
          Registrar Retiro / Gasto
        </button>
        <button 
          onClick={() => alert("Iniciando proceso de cierre de caja...")}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition shadow-lg"
        >
          Realizar Cierre de Turno
        </button>
      </div>
    </div>
  );
}
