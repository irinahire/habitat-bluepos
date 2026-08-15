"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    
    // Redirige a la raíz del subdominio actual en lugar de al login
    router.push("/");
    router.refresh();
  };

  return <Button onClick={logout}>Logout</Button>;
}
