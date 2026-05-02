"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Reveal from "./reveal";

const daftarUlasan = [
  {
    id: 1,
    nama: "anantha",
    avatar: "/avatar 1.jpg",
    fotoUlasan: "/ulasan 1.jpg",
    rating: 5,
  },
  {
    id: 2,
    nama: "anisa frity amelia",
    avatar: "/avatar 2.jpg",
    fotoUlasan: "/ulasan 2.jpg",
    rating: 5,
  },
  {
    id: 3,
    nama: "widayy",
    avatar: "/avatar 3.jpg",
    fotoUlasan: "/ulasan 3.jpg",
    rating: 5,
  },
  {
    id: 4,
    nama: "amelia putri",
    avatar: "/avatar 1.jpg",
    fotoUlasan: "/ulasan 1.jpg",
    rating: 5,
  },
  {
    id: 5,
    nama: "dinda ayu",
    avatar: "/avatar 2.jpg",
    fotoUlasan: "/ulasan 2.jpg",
    rating: 5,
  },
  {
    id: 6,
    nama: "salsa rahma",
    avatar: "/avatar 3.jpg",
    fotoUlasan: "/ulasan 3.jpg",
    rating: 5,
  },
  {
    id: 7,
    nama: "putri cahya",
    avatar: "/avatar 1.jpg",
    fotoUlasan: "/ulasan 1.jpg",
    rating: 5,
  },
  {
    id: 8,
    nama: "mutia zahra",
    avatar: "/avatar 2.jpg",
    fotoUlasan: "/ulasan 2.jpg",
    rating: 5,
  },
  {
    id: 9,
    nama: "naila khansa",
    avatar: "/avatar 3.jpg",
    fotoUlasan: "/ulasan 3.jpg",
    rating: 5,
  },
  {
    id: 10,
    nama: "icha oktavia",
    avatar: "/avatar 1.jpg",
    fotoUlasan: "/ulasan 1.jpg",
    rating: 5,
  },
  {
    id: 11,
    nama: "rara aulia",
    avatar: "/avatar 2.jpg",
    fotoUlasan: "/ulasan 2.jpg",
    rating: 5,
  },
  {
    id: 12,
    nama: "tiara melani",
    avatar: "/avatar 3.jpg",
    fotoUlasan: "/ulasan 3.jpg",
    rating: 5,
  },
];

export default function Ulasan() {
  const [isMobile, setIsMobile] = useState(false);
  const [jumlahTampil, setJumlahTampil] = useState(4);

  useEffect(() => {
    const cekUkuranLayar = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      setJumlahTampil((current) => {
        const minimum = mobile ? 1 : 3;
        return current < minimum ? minimum : current;
      });
    };

    cekUkuranLayar();
    window.addEventListener("resize", cekUkuranLayar);

    return () => window.removeEventListener("resize", cekUkuranLayar);
  }, []);

  const jumlahTambah = isMobile ? 2 : 6;

  const ulasanTampil = useMemo(() => {
    return daftarUlasan.slice(0, jumlahTampil);
  }, [jumlahTampil]);

  const masihAdaUlasan = jumlahTampil < daftarUlasan.length;

  const handleTampilkanLebihBanyak = () => {
    setJumlahTampil((prev) => {
      const totalBaru = prev + jumlahTambah;
      return totalBaru > daftarUlasan.length ? daftarUlasan.length : totalBaru;
    });
  };

  return (
    <section
      id="ulasan"
      className="bg-[linear-gradient(180deg,#dd98ad_0%,#e5b2c2_58%,#ffffff_100%)] py-[clamp(48px,7vw,72px)] max-[420px]:py-10"
    >
      <div className="container-landing">
        <Reveal>
          <h2 className="mb-8 text-center text-2xl font-bold text-[#7d344b] drop-shadow-sm sm:mb-15 sm:text-3xl md:mb-15 md:text-4xl">
            Ulasan
          </h2>
        </Reveal>

        <Reveal delay={0.3} className="mx-auto grid w-fit grid-cols-4 gap-4 max-md:grid-cols-1 max-md:gap-4">
          {ulasanTampil.map((ulasan) => (
            <article
              key={ulasan.id}
              className="group w-full max-w-[320px] overflow-hidden rounded-[20px] bg-[#873752] shadow-[0_10px_22px_rgba(0,0,0,0.2)]
              origin-center transition-[transform,box-shadow,border-color] duration-[260ms] ease-in-out hover:translate-y-0
              max-md:mx-auto max-md:w-full max-[420px]:rounded-[18px] supports-[hover:hover]:hover:translate-y-[-10px]
              supports-[hover:hover]:hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)]"
            >
              {/* DESKTOP */}
              <div className="hidden md:block">
                <div className="px-5 pt-[18px] pb-[10px]">
                  <div className="mb-[18px] flex items-center gap-3">
                    <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full bg-[rgba(255,255,255,0.2)]">
                      <Image
                        src={ulasan.avatar}
                        alt={`Avatar ${ulasan.nama}`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="text-[18px] font-semibold lowercase text-white">
                      {ulasan.nama}
                    </span>
                  </div>
                  <div className="mb-[14px] flex flex-col gap-3">
                    <p className="text-[15px] font-medium lowercase text-white">
                      bagus bangett bagus bangett bagus bangett bagus bangett
                      bagus bangett
                    </p>
                  </div>

                  <div
                    className="mb-[2px] flex items-center gap-1"
                    aria-label={`Rating ${ulasan.rating} dari 5`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className="text-[30px] leading-none text-[#ffe4ef]"
                        style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.18)" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative w-full overflow-hidden border-t border-[rgba(255,255,255,0.08)] aspect-[16/9.3]">
                  <Image
                    src={ulasan.fotoUlasan}
                    alt={`Foto hasil layanan dari ${ulasan.nama}`}
                    fill
                    className="object-cover transition-[transform,filter] duration-[320ms] ease-in-out group-hover:scale-100
                  supports-[hover:hover]:group-hover:scale-[1.06] supports-[hover:hover]:group-hover:saturate-[1.06]"
                  />
                </div>
              </div>

              {/* MOBILE */}
              <div className="flex min-h-[160px] md:hidden">
                <div className="flex flex-1 flex-col justify-between px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full bg-[rgba(255,255,255,0.2)]">
                      <Image
                        src={ulasan.avatar}
                        alt={`Avatar ${ulasan.nama}`}
                        fill
                        className="object-cover"
                        sizes="38px"
                      />
                    </div>
                    <span className="text-[16px] font-semibold lowercase text-white leading-tight">
                      {ulasan.nama}
                    </span>
                  </div>

                  <div>
                    <p className="mb-3 line-clamp-3 text-[12px] font-medium lowercase leading-[1.35] text-white">
                      bagus bangett bagus bangett bagus bangett bagus bangett
                      bagus bangett
                    </p>

                    <div
                      className="flex items-center gap-1"
                      aria-label={`Rating ${ulasan.rating} dari 5`}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span
                          key={index}
                          className="text-[22px] leading-none text-[#ffe4ef]"
                          style={{
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative w-[42%] min-w-[120px] overflow-hidden border-l border-[rgba(255,255,255,0.08)]">
                  <Image
                    src={ulasan.fotoUlasan}
                    alt={`Foto hasil layanan dari ${ulasan.nama}`}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        {masihAdaUlasan && (
          <Reveal delay={0.1} className="mt-[40px] flex justify-center max-md:mt-[22px]">
            <button
              type="button"
              onClick={handleTampilkanLebihBanyak}
              className="min-h-[44px] rounded-[6px] border-none px-[18px] py-[10px] text-[16px] font-medium text-white cursor-pointer
            w-auto max-md:w-full max-md:max-w-[280px] max-md:text-[15px] transition-[transform,opacity,box-shadow,filter,background-color]
            duration-[220ms] ease-in-out active:scale-[0.96] hover:translate-y-0 hover:opacity-100 bg-[linear-gradient(90deg,#f05b91_0%,#973c5c_100%)]
            shadow-[0_10px_20px_rgba(151,60,92,0.25)] supports-[hover:hover]:hover:translate-y-[-2px] supports-[hover:hover]:hover:brightness-[0.88]
            supports-[hover:hover]:hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
            >
              Tampilkan lebih banyak
            </button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
