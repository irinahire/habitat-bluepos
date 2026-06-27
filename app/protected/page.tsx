import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return redirect("/auth/login");
  }

  return (
    <div className="flex flex-col h-full gap-6 p-6">
      {/* HEADER DE GESTION */}
      <header className="flex justify-between items-center bg-card p-4 rounded-xl border border-border">
        <h1 className="text-2xl font-bold">Sales & Billing</h1>
      </header>

      {/* GRILLA PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col gap-6">
          <section className="bg-card p-6 rounded-2xl border border-border h-[400px]">
            <h2 className="text-xl font-bold mb-4">Product/Medication Search</h2>
            {/* Aquí irán los items */}
          </section>
          <section className="bg-card p-6 rounded-2xl border border-border flex-1">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          </section>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col gap-6">
          <section className="bg-card p-6 rounded-2xl border border-border h-[300px]">
            <h2 className="text-xl font-bold mb-4">Patient/Customer</h2>
          </section>
          <section className="bg-card p-6 rounded-2xl border border-border flex-1">
            <h2 className="text-xl font-bold mb-4">Current Bill</h2>
          </section>
        </div>
      </div>
    </div>
  );
}
