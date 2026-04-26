"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function NotifBerhasil() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-y-auto px-4 sm:px-6">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background (burgundy).png')" }}
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <section className="w-full max-w-[320px] rounded-lg bg-[#ffecf2] px-5 py-6 shadow-[0_12px_35px_rgba(125,52,75,0.22)] sm:max-w-[380px] sm:px-6 sm:py-7 md:max-w-[390px] md:px-7 md:py-8 lg:max-w-[410px]">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo full 1 alia oye (burgundy).png"
              alt="Alia Oye Studio"
              width={260}
              height={260}
              className="h-auto w-[150px] object-contain sm:w-[180px] md:w-[190px] lg:w-[200px]"
              priority
            />
          </div>

          {/* Text */}
          <div className="mt-5 text-center text-[#7d344b]">
            <p className="text-sm font-semibold leading-snug sm:text-base md:text-[15px] lg:text-[16px]">
              Bukti transfer sudah kami terima!
            </p>
            <p className="text-sm font-semibold leading-snug sm:text-base md:text-[15px] lg:text-[16px]">
              Kami akan segera memverifikasi pembayaran Anda.
            </p>
          </div>

          {/* Button */}
          <div className="mt-6 sm:mt-7">
            <button
              type="button"
              onClick={() => router.push("/page/pelanggan/pesanan")}
              className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 shadow-soft-text"
            >
              Selesai
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}