import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  // Obtenemos los datos completos del usuario (incluyendo metadata)
  const { data: { user } } = await supabase.auth.getUser();
  
  // O bien si usabas claims:
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  // Extraemos la información real del usuario
  const userEmail = user?.email || claims?.email || "Usuario";
  const userName = userEmail.split('@')[0];
  
  // Buscamos la foto real en los metadatos de Supabase (Google/GitHub/etc. la guardan acá)
  const userAvatar = user?.user_metadata?.avatar_url || 
                     user?.user_metadata?.picture || 
                     `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`;

  return user || claims ? (
    <div className="user-profile">
      <img 
        src={userAvatar} 
        alt="Avatar" 
        className="user-avatar" 
      />
      <span className="user-name">{userName}</span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
