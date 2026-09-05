// components/auth-button.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [claims, setClaims] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const isProtectedPage = pathname?.includes("/protected");

  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        const { data } = await supabase.auth.getClaims();
        setClaims(data?.claims);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [supabase]);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err) {
      console.error("Error en login con Google:", err);
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return <div className="text-xs text-gray-400">Cargando...</div>;
  }

  const userEmail = user?.email || claims?.email || "Usuario";
  
  const displayName = user?.user_metadata?.full_name || 
                      user?.user_metadata?.name || 
                      user?.user_metadata?.display_name || 
                      userEmail.split('@')[0];
  
  const userAvatar = user?.user_metadata?.avatar_url || 
                     user?.user_metadata?.picture || 
                     `https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`;

  // Elemento del Modal separado para el Portal
  const modalContent = isModalOpen && mounted ? createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-gray-950 p-8 shadow-2xl">
        
        {/* Botón de cierre (X) */}
        <button 
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Bienvenido</h3>
          <p className="text-sm text-gray-400">Inicia sesión o regístrate con tu cuenta de Google</p>
        </div>

        {/* Botón de Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full py-6 rounded-xl border-white/20 bg-white text-gray-950 hover:bg-gray-100 font-medium flex items-center justify-center gap-3 shadow-lg transition-all"
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          {isLoggingIn ? "Conectando..." : "Ingresar con Google"}
        </Button>

      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {user || claims ? (
        <div className="flex items-center gap-4 p-1.5 px-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-md shadow-sm mr-6">
          <div className="flex items-center gap-3">
            <img 
              src={userAvatar} 
              alt="Avatar" 
              className="user-avatar w-8 h-8 rounded-full object-cover border border-white/20" 
            />
            <span className="user-name text-sm font-medium text-gray-200">{displayName}</span>
          </div>

          {!isProtectedPage && (
            <Link 
              href="/protected"
              className="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold text-gray-950 transition-all duration-300 bg-gradient-to-b from-[#b2f5ea] via-[#81e6d9] to-[#319795] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_0_20px_rgba(129,230,217,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_0_25px_rgba(129,230,217,0.8)] hover:scale-105 active:scale-95 border border-teal-200/50"
            >
              Ir a mi panel
            </Link>
          )}

          <LogoutButton />
        </div>
      ) : (
        <div className="flex items-center gap-3 mr-6">
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="sm" 
            variant="outline"
            className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 transition-all px-6 py-2"
          >
            Ingresar
          </Button>
        </div>
      )}

      {modalContent}
    </>
  );
}
