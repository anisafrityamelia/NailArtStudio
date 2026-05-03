"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Reveal from "./reveal";
import API_BASE_URL from "@/app/lib/api";

type GambarLayanan = {
  id_gambar: number;
  id_layanan: number;
  path_gambar: string;
  url_gambar: string | null;
};

type LayananBackend = {
  id_layanan: number;
  nama_layanan: string;
  harga_dasar: number;
  deskripsi_layanan: string | null;
  kategori_layanan: string;
  durasi_menit: number;
  status_layanan: string;
  gambar: GambarLayanan[];
};

type LayananLanding = {
  id: number;
  nama: string;
  gambar: string;
  alt: string;
  detailUrl: string;
};

const getDetailUrl = (kategori: string) => {
  const kategoriLower = kategori.toLowerCase();

  if (kategoriLower === "nail_art") {
    return "/page/pemesanan/detail_layanan/nail_art";
  }

  if (kategoriLower === "presson") {
    return "/page/pemesanan/detail_layanan/presson";
  }

  if (kategoriLower === "eyelash") {
    return "/page/pemesanan/detail_layanan/eyelash";
  }

  if (kategoriLower === "remove") {
    return "/page/pemesanan/detail_layanan/remove";
  }

  if (kategoriLower === "course") {
    return "/page/pemesanan/detail_layanan/course";
  }

  return "/page/pemesanan";
};

type ArahAnimasi = "next" | "prev";
type StatusAnimasi = "idle" | "keluar" | "masuk";

export default function Layanan() {
  const [daftarLayanan, setDaftarLayanan] = useState<LayananLanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [jumlahTampil, setJumlahTampil] = useState(3);
  const [indexAktif, setIndexAktif] = useState(0);
  const [arahAnimasi, setArahAnimasi] = useState<ArahAnimasi>("next");
  const [statusAnimasi, setStatusAnimasi] = useState<StatusAnimasi>("idle");

  async function fetchLayanan() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/layanan`, {
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Gagal mengambil data layanan");
        return;
      }

      const mappedData: LayananLanding[] = result.data.map(
        (item: LayananBackend) => ({
          id: item.id_layanan,
          nama: item.nama_layanan,
          gambar: item.gambar?.[0]?.url_gambar || "/galeri 1.jpeg",
          alt: `Layanan ${item.nama_layanan}`,
          detailUrl: getDetailUrl(item.kategori_layanan),
        }),
      );

      setDaftarLayanan(mappedData);
    } catch (error) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLayanan();
  }, []);

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
  }, [jumlahTampil, daftarLayanan.length]);

  const jalankanSlide = (arah: ArahAnimasi) => {
    if (statusAnimasi !== "idle" || daftarLayanan.length === 0) return;

    setArahAnimasi(arah);
    setStatusAnimasi("keluar");

    window.setTimeout(() => {
      setIndexAktif((prev) => {
        if (arah === "prev") {
          return (
            (prev - jumlahTampil + daftarLayanan.length) %
            daftarLayanan.length
          );
        }

        return (prev + jumlahTampil) % daftarLayanan.length;
      });

      setStatusAnimasi("masuk");

      window.setTimeout(() => {
        setStatusAnimasi("idle");
      }, 260);
    }, 260);
  };

  const handlePrev = () => jalankanSlide("prev");
  const handleNext = () => jalankanSlide("next");

  const layananTampil = useMemo(() => {
    if (daftarLayanan.length === 0) return [];

    return Array.from(
      { length: Math.min(jumlahTampil, daftarLayanan.length) },
      (_, index) => daftarLayanan[(indexAktif + index) % daftarLayanan.length],
    );
  }, [daftarLayanan, indexAktif, jumlahTampil]);

  const kelasAnimasi = useMemo(() => {
    if (statusAnimasi === "idle") {
      return "opacity-100 translate-x-0 scale-100 blur-0";
    }

    if (statusAnimasi === "keluar") {
      return arahAnimasi === "next"
        ? "opacity-0 -translate-x-14 scale-[0.98] blur-[5px]"
        : "opacity-0 translate-x-14 scale-[0.98] blur-[5px]";
    }

    return arahAnimasi === "next"
      ? "opacity-0 translate-x-14 scale-[0.98] blur-[5px]"
      : "opacity-0 -translate-x-14 scale-[0.98] blur-[5px]";
  }, [statusAnimasi, arahAnimasi]);

  const router = useRouter();

  return (
    <section
      id="layanan"
      className="overflow-hidden bg-[linear-gradient(180deg,#ffecf2_0%,#f7e9ee_60%,#dd98ad_100%)] 
      py-[clamp(48px,7vw,72px)] max-[420px]:py-10"
    >
      <div className="container-landing px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="mb-15 text-center text-2xl font-bold text-[#7d344b] drop-shadow-sm sm:text-3xl md:text-4xl">
            Layanan Kami
          </h2>
        </Reveal>

        <div
          className="grid items-center gap-[18px] md:grid-cols-[56px_minmax(0,1fr)_56px] 
          max-md:grid-cols-1 max-md:gap-[10px]"
        >
          <Reveal delay={0.3}>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Lihat layanan sebelumnya"
              className="hidden h-9 w-9 items-center justify-center self-center rounded-full border-none 
            bg-transparent text-[34px] leading-none text-[#7d344b] transition-all duration-200 active:scale-95 
            md:inline-flex md:h-12 md:w-12 md:text-[42px] hover:opacity-85 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 
            [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105 
            [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
            >
              &#10094;
            </button>
          </Reveal>

          <Reveal
            delay={0.3}
            className={`max-md:flex max-md:gap-[18px] max-md:overflow-x-auto max-md:scroll-smooth max-md:snap-x max-md:snap-mandatory 
            max-md:px-1 max-md:pb-4 max-md:[&::-webkit-scrollbar]:hidden max-md:[-ms-overflow-style:none] max-md:[scrollbar-width:none]
            md:grid md:grid-cols-3 md:gap-[18px] md:transition-all md:duration-[520ms] 
            md:ease-[cubic-bezier(0.22,1,0.36,1)] md:will-change-transform md:will-change-opacity ${kelasAnimasi}`}
          >
            {loading && (
              <p className="text-center text-sm font-medium text-[#7d344b]">
                Memuat layanan...
              </p>
            )}

            {error && (
              <p className="text-center text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            {!loading && !error && daftarLayanan.length === 0 && (
              <p className="text-center text-sm font-medium text-[#7d344b]">
                Belum ada layanan aktif.
              </p>
            )}

            {!loading &&
              !error &&
              (jumlahTampil === 1 ? daftarLayanan : layananTampil).map((layanan) => (
                <article
                  key={jumlahTampil === 1 ? layanan.id : `${layanan.id}-${indexAktif}`}
                  className="w-full max-md:mx-auto max-md:min-w-[260px] max-md:max-w-[260px] max-md:snap-center origin-center rounded-2xl border 
                  border-[rgba(138,62,85,0.14)] bg-[rgba(221,152,173,0.2)] p-[18px] shadow-[0_6px_14px_rgba(0,0,0,0.18)] 
                  transition-all duration-[260ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[10px] 
                  [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_18px_38px_rgba(0,0,0,0.2)] max-[420px]:p-3"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                    <img
                      src={layanan.gambar}
                      alt={layanan.alt}
                      className="h-full w-full object-cover transition-all duration-300 ease-out 
                      [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 transition-all duration-300 ease-out 
                      [@media(hover:hover)_and_(pointer:fine)]:hover:[&+img]:scale-105"
                    />
                  </div>

                  <div className="flex flex-col gap-[14px] pt-[14px]">
                    <h3
                      className="text-[17px] font-semibold text-[#7d344b] transition-all duration-200 md:text-[18px] 
                      [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-px 
                      [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-[#8a3e55]"
                    >
                      {layanan.nama}
                    </h3>

                    <button
                      type="button"
                      onClick={() => router.push(layanan.detailUrl)}
                      className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] 
                      to-[#7D344B] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text 
                      transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                    >
                      Detail
                    </button>
                  </div>
                </article>
              ))}
          </Reveal>

          <Reveal delay={0.3}>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Lihat layanan berikutnya"
              className="hidden h-9 w-9 items-center justify-center self-center rounded-full 
            border-none bg-transparent text-[34px] leading-none text-[#7d344b] transition-all duration-200 
            active:scale-95 md:inline-flex md:h-12 md:w-12 md:text-[42px] hover:opacity-85 
            [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105 
            [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]"
            >
              &#10095;
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}