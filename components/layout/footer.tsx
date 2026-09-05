// components/layout/footer.tsx
"use client";

import ChatSucursal from "@/components/atomic/chat-sucursal";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 p-4 flex justify-between items-center bg-card relative">
      <span className="text-xs text-muted-foreground">Marquesina de estado del sistema...</span>
      
      {/* Componente atómico de Chat Sucursal (Burbuja + Modal Completo) */}
      <ChatSucursal />
    </footer>
  );
}
