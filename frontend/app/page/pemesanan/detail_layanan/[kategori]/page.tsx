"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import API_BASE_URL from "@/app/lib/api";

type GambarLayanan = {
  id_gambar: number;
  id_layanan: number;
  path_gambar: string;
  url_gambar: string;
};

type Layanan = {
  id_layanan: number;
  nama_layanan: string;
  harga_dasar: number;
  deskripsi_layanan: string;
  kategori_layanan: string;
  durasi_menit: number;
  status_layanan: string;
  gambar: GambarLayanan[];
};

export default function DetailLayananPage() {
  const router = useRouter();
  const params = useParams();

  const kategori = params.kategori as string;

  const [layanan, setLayanan] = useState<Layanan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatRupiah = (harga: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  useEffect(() => {
    const fetchDetailLayanan = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/layanan/kategori/${kategori}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Detail layanan tidak ditemukan");
          return;
        }

        setLayanan(result.data);
      } catch (error) {
        setError("Gagal terhubung ke server");
      } finally {
        setLoading(false);
      }
    };

    if (kategori) {
      fetchDetailLayanan();
    }
  }, [kategori]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#ffecf2] text-[#7D344B]">
        Memuat detail layanan...
      </main>
    );
  }

  if (error || !layanan) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#ffecf2] text-[#7D344B]">
        {error || "Data layanan tidak tersedia"}
      </main>
    );
  }

  const daftarGambar =
    layanan.gambar && layanan.gambar.length > 0
      ? layanan.gambar.map((item) => item.url_gambar)
      : ["/galeri 1.jpeg", "/galeri 6.jpeg", "/galeri 9.jpeg", "/galeri 8.jpeg"];

  return (
    <main className="relative min-h-screen overflow-y-auto px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background (burgundy).png')" }}
      />

      <div className="fixed inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <section className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-[#ffecf2] shadow-[0_12px_35px_rgba(125,52,75,0.20)] shadow-soft-text">
          <div className="sticky top-0 z-10 flex items-center border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-3 shadow-soft-text">
            <button
              type="button"
              onClick={() => router.back()}
              className="cursor-pointer rounded-full p-1 text-[#7D344B] transition hover:bg-[#f8dfe8]"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="flex-1 text-center text-sm font-semibold text-[#7d344b] sm:text-base">
              Detail Layanan
            </h1>

            <div className="w-[18px]" />
          </div>

          <div className="space-y-4 px-5 py-4 text-xs text-[#7D344B] sm:text-sm">
            <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
              <h2 className="mb-3 text-base font-semibold text-[#7D344B]">
                {layanan.nama_layanan}
              </h2>

              <p className="text-justify text-[#7D344B]">
                {layanan.deskripsi_layanan}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {daftarGambar.map((gambar, index) => (
                <img
                  key={index}
                  src={gambar}
                  alt={`${layanan.nama_layanan} ${index + 1}`}
                  className="h-32 w-full rounded-md object-cover shadow-soft-text sm:h-36"
                />
              ))}
            </div>

            <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
              <div className="space-y-1 text-[#7D344B]">
                <p className="text-sm font-semibold">Estimasi Harga:</p>
                <p className="text-xl font-semibold tracking-wide">
                  {formatRupiah(layanan.harga_dasar)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/page/pemesanan/pemesanan_layanan/${layanan.kategori_layanan}`
                )
              }
              className="mb-2 mt-1 w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm"
            >
              Pesan Sekarang
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}