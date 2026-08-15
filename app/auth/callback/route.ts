import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  
  // Captura opcionalmente un parámetro 'next' si se envía, por defecto va a '/protected'
  const next = requestUrl.searchParams.get("next") ?? "/protected";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Redirige manteniendo el subdominio exacto de origen (ej: pos.bluelab.online/protected)
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Si algo falla con el código, redirige al login con un parámetro de error
  return NextResponse.redirect(new URL("/login?error=auth_callback_error", requestUrl.origin));
}
