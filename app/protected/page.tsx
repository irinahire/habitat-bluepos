import { MainView } from "@/components/layout/mainview";
import { HabitatBrowser } from "@/components/habitat-browser"; // Mantenemos el import

export default function ProtectedPage() {
  return (
    <MainView>
        {/* Aquí pegás tu estructura de grillas que tenías en el page.tsx original */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">Sales & Billing</h1>
        {/* ... el resto de tu grid de 2 columnas ... */}
    </MainView>
  );
}
