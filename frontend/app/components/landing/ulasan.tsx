"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./reveal";
import { getUlasanLanding } from "@/app/lib/ulasan";

type UlasanLanding = {
  id_ulasan: number;
  rating: number;
  ulasan: string;
  nama_pelanggan: string;
  foto_profil_url?: string | null;
  gambar_ulasan_url?: string | null;
};

export default function Ulasan() {
  const [isMobile, setIsMobile] = useState(false);
  const [jumlahTampil, setJumlahTampil] = useState(4);
  const [daftarUlasan, setDaftarUlasan] = useState<UlasanLanding[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const ambilUlasanLanding = async () => {
      try {
        setLoading(true);

        const data = await getUlasanLanding();
        setDaftarUlasan(data || []);
      } catch (error) {
        console.error("Gagal mengambil ulasan landing:", error);
        setDaftarUlasan([]);
      } finally {
        setLoading(false);
      }
    };

    ambilUlasanLanding();
  }, []);

  const jumlahTambah = isMobile ? 2 : 6;

  const ulasanTampil = useMemo(() => {
    return daftarUlasan.slice(0, jumlahTampil);
  }, [daftarUlasan, jumlahTampil]);

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

        {loading ? (
          <p className="text-center text-sm font-medium text-[#7d344b]">
            Memuat ulasan...
          </p>
        ) : ulasanTampil.length === 0 ? (
          <p className="text-center text-sm font-medium text-[#7d344b]">
            Belum ada ulasan pelanggan.
          </p>
        ) : (
          <Reveal
            delay={0.3}
            className="mx-auto grid w-fit grid-cols-4 gap-4 max-md:w-full max-md:grid-cols-2 max-md:gap-3 max-md:px-4"
          >
            {ulasanTampil.map((ulasan, index) => {
              const namaPelanggan =
                ulasan.nama_pelanggan || "pelanggan alia oye";

              const avatar =
                ulasan.foto_profil_url || `/avatar ${(index % 3) + 1}.jpg`;

              const fotoUlasan =
                ulasan.gambar_ulasan_url || "/ulasan-default.png";

              const rating = Number(ulasan.rating || 0);

              return (
                <article
                  key={ulasan.id_ulasan}
                  className="group w-full max-w-[320px] overflow-hidden rounded-[20px] bg-[#873752] shadow-[0_10px_22px_rgba(0,0,0,0.2)]
                  origin-center transition-[transform,box-shadow,border-color] duration-[260ms] ease-in-out hover:translate-y-0
                  max-md:w-full max-[420px]:rounded-[14px] supports-[hover:hover]:hover:translate-y-[-10px]
                  supports-[hover:hover]:hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)]"
                >
                  {/* DESKTOP */}
                  <div className="hidden md:flex md:h-full md:flex-col">
                    <div className="flex min-h-[165px] flex-col px-5 pt-[18px] pb-[10px]">
                      <div className="mb-[18px] flex items-center gap-3">
                        <div className="relative h-[38px] w-[38px] shrink-0 overflow-hidden rounded-full bg-[rgba(255,255,255,0.2)]">
                          <img
                            src={avatar}
                            alt={`Avatar ${namaPelanggan}`}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <span className="line-clamp-1 text-[18px] font-semibold lowercase text-white">
                          {namaPelanggan}
                        </span>
                      </div>

                      <p className="line-clamp-3 min-h-[72px] text-[15px] font-medium lowercase leading-[1.6] text-white">
                        {ulasan.ulasan}
                      </p>

                      <div
                        className="mt-auto flex items-center gap-1"
                        aria-label={`Rating ${rating} dari 5`}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className="text-[30px] leading-none text-[#ffe4ef]"
                            style={{
                              textShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
                              opacity: index < rating ? 1 : 0.35,
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative w-full overflow-hidden border-t border-[rgba(255,255,255,0.08)] aspect-[16/9.3]">
                      <img
                        src={fotoUlasan}
                        alt={`Foto hasil layanan dari ${namaPelanggan}`}
                        className="h-full w-full object-cover transition-[transform,filter] duration-[320ms] ease-in-out group-hover:scale-100
                        supports-[hover:hover]:group-hover:scale-[1.06] supports-[hover:hover]:group-hover:saturate-[1.06]"
                      />
                    </div>
                  </div>

                  {/* MOBILE */}
                  <div className="flex h-[108px] md:hidden">
                    <div className="flex h-full w-[58%] min-w-0 flex-col px-2 py-3">
                      <div className="mb-1.5 flex items-start gap-2">
                        <div className="relative h-[24px] w-[24px] shrink-0 overflow-hidden rounded-full bg-[rgba(255,255,255,0.2)]">
                          <img
                            src={avatar}
                            alt={`Avatar ${namaPelanggan}`}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <span className="line-clamp-2 min-w-0 break-words text-[10px] font-semibold lowercase leading-[1.15] text-white">
                          {namaPelanggan}
                        </span>
                      </div>

                      <div className="flex-1 overflow-hidden">
                        <p className="line-clamp-3 break-words text-[7px] font-medium lowercase leading-[1.35] text-white">
                          {ulasan.ulasan}
                        </p>
                      </div>

                      <div
                        className="mt-1 flex items-center gap-[2px]"
                        aria-label={`Rating ${rating} dari 5`}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className="text-[13px] leading-none text-[#ffe4ef]"
                            style={{
                              textShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
                              opacity: index < rating ? 1 : 0.35,
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative block h-full w-[42%] shrink-0 overflow-hidden bg-[#f7d7e1]">
                      <img
                        src={fotoUlasan}
                        alt={`Foto hasil layanan dari ${namaPelanggan}`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </Reveal>
        )}

        {!loading && masihAdaUlasan && (
          <Reveal
            delay={0.1}
            className="mt-[40px] flex justify-center max-md:mt-[22px]"
          >
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