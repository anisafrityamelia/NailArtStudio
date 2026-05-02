"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function Beranda() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-br from-[#DD98AD] to-[#F7D8DE]">
      {/* Blur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-60px] h-56 w-56 animate-pulse rounded-full bg-white/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="absolute right-[-100px] top-[20%] h-64 w-64 animate-[float_6s_ease-in-out_infinite] rounded-full bg-pink-200/30 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute bottom-[-100px] left-1/2 h-60 w-60 -translate-x-1/2 animate-[float_8s_ease-in-out_infinite] rounded-full bg-rose-100/30 blur-3xl sm:h-80 sm:w-80" />
      </div>

      {/* Sparkle */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[20%] top-[30%] h-2 w-2 animate-ping rounded-full bg-white opacity-70"></span>
        <span className="absolute left-[70%] top-[40%] h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-60 [animation-delay:1s]"></span>
        <span className="absolute left-[50%] top-[70%] h-2 w-2 animate-ping rounded-full bg-white opacity-50 [animation-delay:2s]"></span>
        <span className="absolute left-[30%] top-[60%] h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-60 [animation-delay:1.5s]"></span>
        <span className="absolute left-[10%] top-[50%] h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-50 [animation-delay:0.5s]"></span>
        <span className="absolute left-[80%] top-[20%] h-2 w-2 animate-ping rounded-full bg-white opacity-70 [animation-delay:1.2s]"></span>
        <span className="absolute left-[60%] top-[15%] h-1 w-1 animate-ping rounded-full bg-white opacity-60 [animation-delay:2.5s]"></span>
        <span className="absolute left-[40%] top-[85%] h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-50 [animation-delay:1.8s]"></span>
        <span className="absolute left-[75%] top-[65%] h-2 w-2 animate-ping rounded-full bg-white opacity-60 [animation-delay:0.8s]"></span>
        <span className="absolute left-[15%] top-[75%] h-1 w-1 animate-ping rounded-full bg-white opacity-50 [animation-delay:2.2s]"></span>
      </div>

      <div className="container-landing relative z-10">
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-8">
          <div className="flex w-full items-center justify-center">
            <Image
              src="/logo full 1 alia oye (putih).png"
              alt="Logo Alia Oye Studio"
              width={500}
              height={500}
              className="h-auto w-[300px] object-contain sm:w-[400px] md:w-[400px] lg:w-[400px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] animate-[float_5s_ease-in-out_infinite]"
              priority/>
          </div>
        </div>
      </div>
    </section>
  );
}
