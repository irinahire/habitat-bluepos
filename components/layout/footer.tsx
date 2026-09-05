// components/layout/footer.tsx
"use client";

import SystemMarquee from "@/components/atomic/system-marquee";
import ChatSucursal from "@/components/atomic/chat-sucursal";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 p-4 flex justify-between items-center bg-card relative">
      <SystemMarquee />
      <ChatSucursal />
    </footer>
  );
}
