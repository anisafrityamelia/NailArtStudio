"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const daftarLayanan = [
  {
    id: 1,
    nama: "Nail Art",
    gambar: "/galeri 1.jpeg",
    alt: "Layanan nail art",
  },
  {
    id: 2,
    nama: "Press On Nails",
    gambar: "/galeri 2.jpeg",
    alt: "Layanan press on nails",
  },
  {
    id: 3,
    nama: "Eyelash",
    gambar: "/galeri 5.jpeg",
    alt: "Layanan eyelash",
  },
  {
    id: 4,
    nama: "Remove",
    gambar: "/galeri 10.jpeg",
    alt: "Layanan remove nail art",
  },
  {
    id: 5,
    nama: "Kursus",
    gambar: "/galeri 11.jpeg",
    alt: "Layanan kursus nail art",
  },
];

type ArahAnimasi = "next" | "prev";
type StatusAnimasi = "idle" | "keluar" | "masuk";

export default function Layanan() {
  const [jumlahTampil, setJumlahTampil] = useState(3);
  const [indexAktif, setIndexAktif] = useState(0);
  const [arahAnimasi, setArahAnimasi] = useState<ArahAnimasi>("next");
  const [statusAnimasi, setStatusAnimasi] = useState<StatusAnimasi>("idle");

  const maxIndex = Math.max(daftarLayanan.length - jumlahTampil, 0);
  const indexTervalidasi = Math.min(indexAktif, maxIndex);

  useEffect(() => {
    const cekUkuranLayar = () => {
      if (window.innerWidth <= 768) {
        setJumlahTampil(1);
      } else {
        setJumlahTampil(3);
      }
    };

    cekUkuranLayar();
    window.addEventListener("resize", cekUkuranLayar);

    return () => window.removeEventListener("resize", cekUkuranLayar);
  }, []);

  useEffect(() => {
    setIndexAktif((prev) =>
      Math.min(prev, Math.max(daftarLayanan.length - jumlahTampil, 0)),
    );
  }, [jumlahTampil]);

  const jalankanSlide = (arah: ArahAnimasi) => {
    if (statusAnimasi !== "idle") return;

    setArahAnimasi(arah);
    setStatusAnimasi("keluar");

    window.setTimeout(() => {
      setIndexAktif((prev) => {
        const prevTervalidasi = Math.min(prev, maxIndex);

        if (arah === "prev") {
          return prevTervalidasi === 0 ? maxIndex : prevTervalidasi - 1;
        }

        return prevTervalidasi >= maxIndex ? 0 : prevTervalidasi + 1;
      });

      setStatusAnimasi("masuk");

      window.setTimeout(() => {
        setStatusAnimasi("idle");
      }, 220);
    }, 180);
  };

  const handlePrev = () => jalankanSlide("prev");
  const handleNext = () => jalankanSlide("next");

  const layananTampil = useMemo(() => {
    return daftarLayanan.slice(
      indexTervalidasi,
      indexTervalidasi + jumlahTampil,
    );
  }, [indexTervalidasi, jumlahTampil]);

  const kelasAnimasi = useMemo(() => {
    if (statusAnimasi === "idle") {
      return "opacity-100 translate-x-0 scale-100 blur-0";
    }

    if (statusAnimasi === "keluar") {
      return arahAnimasi === "next"
        ? "opacity-0 -translate-x-7 scale-[0.98] blur-[4px]"
        : "opacity-0 translate-x-7 scale-[0.98] blur-[4px]";
    }

    return arahAnimasi === "next"
      ? "opacity-0 translate-x-7 scale-[0.98] blur-[4px]"
      : "opacity-0 -translate-x-7 scale-[0.98] blur-[4px]";
  }, [statusAnimasi, arahAnimasi]);

  return (
    <section
      id="layanan"
      className="overflow-hidden bg-[linear-gradient(180deg,#ffecf2_0%,#f7e9ee_60%,#dd98ad_100%)] py-[clamp(48px,7vw,72px)] max-[420px]:py-10"
    >
      <div className="container-landing px-4 sm:px-6 lg:px-10">
        <h2 className="mb-15 text-center text-2xl font-bold text-[#7d344b] drop-shadow-sm sm:text-3xl md:text-4xl">
          Layanan Kami
        </h2>

        <div className="grid items-center gap-[18px] md:grid-cols-[56px_minmax(0,1fr)_56px] max-md:grid-cols-[40px_minmax(0,1fr)_40px] max-md:gap-[10px]">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Lihat layanan sebelumnya"
            className="inline-flex h-9 w-9 items-center justify-center self-center rounded-full border-none bg-transparent text-[34px] leading-none text-[#7d344b] transition-all duration-200 active:scale-95 md:h-12 md:w-12 md:text-[42px] hover:opacity-85 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
          >
            &#10094;
          </button>

          <div
            className={`grid grid-cols-1 gap-[18px] transition-all duration-[220ms] ease-out will-change-transform will-change-opacity md:grid-cols-3 ${kelasAnimasi}`}
          >
            {layananTampil.map((layanan) => (
              <article
                key={layanan.id}
                className="w-full max-md:mx-auto max-md:max-w-[260px] origin-center rounded-2xl border border-[rgba(138,62,85,0.14)] bg-[rgba(221,152,173,0.2)] p-[18px] shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-all duration-[260ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[10px] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)] max-[420px]:p-3"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={layanan.gambar}
                    alt={layanan.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-all duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:[&+img]:scale-105" />
                </div>

                <div className="flex flex-col gap-[14px] pt-[14px]">
                  <h3 className="text-[17px] font-semibold text-[#7d344b] transition-all duration-200 md:text-[18px] [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-px [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[#8a3e55]">
                    {layanan.nama}
                  </h3>

                  <button
                    type="button"
                    className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                  >
                    Detail
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Lihat layanan berikutnya"
            className="inline-flex h-9 w-9 items-center justify-center self-center rounded-full border-none bg-transparent text-[34px] leading-none text-[#7d344b] transition-all duration-200 active:scale-95 md:h-12 md:w-12 md:text-[42px] hover:opacity-85 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105 [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
          >
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
}
