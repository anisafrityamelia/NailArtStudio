"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="fixed inset-0 overflow-hidden bg-[radial-gradient(circle_at_top_left,_#FFECF2_0%,_#FFECF2_30%,_transparent_58%),radial-gradient(circle_at_top_right,_rgba(221,152,173,0.4)_0%,_rgba(221,152,173,0.4)_30%,_transparent_60%),radial-gradient(circle_at_bottom_left,_rgba(221,152,173,0.88)_0%,_rgba(221,152,173,0.72)_26%,_transparent_58%),radial-gradient(circle_at_bottom_right,_#FFECF2_0%,_#FFECF2_30%,_transparent_58%),linear-gradient(135deg,_#fff6f9_0%,_#f7dce5_45%,_#fbeff4_100%)] flex items-end justify-center">
      <section className="flex h-[580px] w-full max-w-[530px] flex-col items-center rounded-t-[260px] border border-white/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(237,191,206,0.22)_42%,rgba(214,152,171,0.28)_100%)] px-10 pt-20 pb-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-1px_0_rgba(255,255,255,0.08),0_22px_50px_rgba(125,52,75,0.22)] backdrop-blur-[14px] sm:h-[590px] [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:mt-5 [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:h-[520px] [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:px-8 [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:pt-14 [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:pb-8">
        <div className="flex h-full w-full flex-col items-center [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:justify-end [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:pb-3">
          <div className="mb-14 text-center [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:mb-10">
            <Image
              src="/logo full 2 alia oye (putih).png"
              alt="AO Logo"
              width={300}
              height={200}
              className="h-auto w-[300px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:w-[250px]"
            />
          </div>

          <form className="w-full flex flex-col items-center">
            <div className="mb-4 flex h-10 w-[300px] items-center rounded-md border border-white/80 bg-transparent px-3 transition duration-200 hover:border-white hover:bg-white/10 hover:shadow-[0_8px_18px_rgba(125,52,75,0.18)] focus-within:border-white focus-within:bg-white/15 focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.18)]">
              <input
                type="email"
                placeholder="Email"
                className="h-full w-full bg-transparent pr-2 text-[15px] font-semibold text-white outline-none [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] placeholder:text-white/80 placeholder:[text-shadow:0_1px_2px_rgba(0,0,0,0.18)] cursor-text"
              />
            </div>

            <div className="mb-6 flex h-10 w-[300px] items-center rounded-md border border-white/80 bg-transparent px-3 transition duration-200 hover:border-white hover:bg-white/10 hover:shadow-[0_8px_18px_rgba(125,52,75,0.18)] focus-within:border-white focus-within:bg-white/15 focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.18)]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi"
                className="h-full w-full bg-transparent pr-2 text-[15px] font-semibold text-white outline-none [text-shadow:0_1px_2px_rgba(0,0,0,0.2)] placeholder:text-white/80 placeholder:[text-shadow:0_1px_2px_rgba(0,0,0,0.18)] cursor-text"
              />

              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} className="flex h-8 w-8 items-center justify-center text-white/90 transition hover:text-white focus:outline-none cursor-pointer">
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <Link
              href="/pages/admin/dashboard"
              className="flex h-10 w-[300px] items-center justify-center rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] text-[15px] font-bold text-white shadow-md transition duration-200 hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_12px_24px_rgba(125,52,75,0.28)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] active:translate-y-0 text-shadow-soft"
            >
              Masuk
            </Link>
          </form>

          <div className="mt-10 mb-4 h-px w-[78%] bg-white/80 [@media(min-width:768px)_and_(max-height:820px)_and_(max-width:1280px)]:mt-7" />

          <p className="font-semibold text-[15px] text-white text-shadow-soft">
            Belum punya akun?{" "}
            <Link
              href="/auth/registrasi"
              className="font-semibold text-[#7D344B] transition-all duration-200 ease-out hover:-translate-y-[2px] text-shadow-soft inline-block"
            >
              Daftar disini!
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}