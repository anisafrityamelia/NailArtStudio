"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./reveal";
import { getBerandaLanding } from "@/app/lib/beranda";

export default function Keunggulan() {
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBeranda() {
      try {
        setLoading(true);

        const data = await getBerandaLanding();

        setDeskripsi(data?.deskripsi || "");
      } catch (error) {
        console.error("Gagal mengambil keunggulan:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBeranda();
  }, []);

  return (
    <section id="keunggulan" className="bg-[#f4f4f4] py-16 sm:py-20">
      <div className="container-landing px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center text-2xl font-bold text-[#7d344b] drop-shadow-sm sm:text-3xl md:text-4xl">
            Keunggulan dari Kami
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          <Reveal delay={0.15} className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo Alia Oye"
              width={420}
              height={420}
              className="h-auto w-[220px] object-contain transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-105 sm:w-[300px] md:w-[360px] lg:w-[420px]"
            />
          </Reveal>

          <Reveal
            delay={0.3}
            className="text-center md:-ml-10 md:pr-35 md:text-right"
          >
            <p className="text-[18px] font-bold leading-relaxed tracking-wide text-[#7d344b] sm:text-[16px] md:text-[20px]">
              {loading
                ? "Memuat keunggulan..."
                : deskripsi ||
                  "Alia Oye Studio menawarkan layanan kecantikan kuku dengan hasil rapi, nyaman, dan berkualitas."}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}