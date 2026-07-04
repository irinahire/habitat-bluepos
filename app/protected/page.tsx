import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense } from "react";
import { HabitatBrowser } from "@/components/habitat-browser";

// Mantenemos esta función tal cual para no romper la lógica interna
async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }
  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-6 p-2 md:p-6">
      
      {/* Título Principal */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Sales & Billing</h1>

      {/* GRILLA PRINCIPAL - 2 COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col gap-6">
          {/* Arriba Izquierda: Buscador */}

          
          <section className="bg-card p-6 rounded-3xl border border-white/10 min-h-[350px] shadow-2xl">
  <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
    Product/Medication Search
    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full uppercase">Módulo activo</span>
  </h2>
  
  {/* AQUÍ VA EL CAMBIO */}
  <div className="relative">
    <HabitatBrowser />
  </div>

  <div className="mt-6 grid grid-cols-3 gap-4 opacity-20 italic text-xs">
     <div className="bg-background aspect-square rounded-xl border border-dashed border-white/10 flex items-center justify-center">Producto A</div>
     <div className="bg-background aspect-square rounded-xl border border-dashed border-white/10 flex items-center justify-center">Producto B</div>
     <div className="bg-background aspect-square rounded-xl border border-dashed border-white/10 flex items-center justify-center">Producto C</div>
  </div>
</section>
          

          {/* Abajo Izquierda: Transacciones */}
          <section className="bg-card p-6 rounded-3xl border border-white/10 flex-1 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-3 opacity-30 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Jun 26, 2026 - Item A</span> <span>$14.50</span></div>
              <div className="flex justify-between border-b border-white/10 pb-2"><span>Jun 25, 2026 - Item B</span> <span>$22.00</span></div>
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col gap-6">
          {/* Arriba Derecha: Pacientes */}
          <section className="bg-card p-6 rounded-3xl border border-white/10 min-h-[250px] shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-primary">Patient/Customer</h2>
            <div className="grid grid-cols-2 gap-4">
               <div className="h-10 bg-background rounded-lg border border-white/10"></div>
               <div className="h-10 bg-background rounded-lg border border-white/10"></div>
            </div>
          </section>

          {/* Abajo Derecha: Billing */}
          <section className="bg-card p-6 rounded-3xl border border-white/10 flex-1 shadow-2xl bg-gradient-to-br from-card to-card/50">
            <h2 className="text-xl font-bold mb-4">Current Bill</h2>
            <div className="flex flex-col h-full">
               <div className="flex-1 opacity-20 italic py-10 text-center">Lista de cobro vacía</div>
               <div className="border-t border-white/10 pt-4 mt-auto">
                  <div className="flex justify-between text-2xl font-black mb-4">
                     <span>TOTAL:</span>
                     <span className="text-primary">$0.00</span>
                  </div>
                  <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:opacity-90 transition-all uppercase tracking-widest">
                     Pay & Print
                  </button>
               </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mantenemos lógica oculta para que el build no falle */}
      <footer className="mt-10 opacity-0 h-0 overflow-hidden">
        <Suspense><UserDetails /></Suspense>
        <FetchDataSteps />
      </footer>
    </div>
  );
}
