import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/protected";

  if (!code) {
    console.error("Fallo silencioso Auth: No se encontró el código en los parámetros de la URL.");
    return NextResponse.redirect(new URL("/login?error=missing_code", requestUrl.origin));
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error("Error detallado al intercambiar el código por sesión:", error.message, error);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin));
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin));
  } catch (err: any) {
    console.error("Excepción no capturada en el callback de auth:", err?.message || err);
    return NextResponse.redirect(new URL("/login?error=server_exception", requestUrl.origin));
  }
}
