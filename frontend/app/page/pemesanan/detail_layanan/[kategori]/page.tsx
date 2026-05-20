"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import API_BASE_URL from "@/app/lib/api";
import BottomSheetPemesanan from "./components/bottom_sheet_pemesanan";
import FormNailArt from "./components/form_nail_art";
import FormPlaceholderLayanan from "./components/form_placeholder_layanan";
import FormPressOn from "./components/form_presson";
import FormEyelash from "./components/form_eyelash";

type GambarLayanan = {
  id_gambar: number;
  id_layanan: number;
  path_gambar: string;
  url_gambar: string;
};

type KategoriHargaLayanan = {
  id_kategori_harga: number;
  id_layanan: number;
  nama_kategori: string;
  deskripsi_kategori: string | null;
  estimasi_harga: number;
  gambar_kategori: string | null;
  url_gambar_kategori: string | null;
  urutan: number;
  status: "aktif" | "nonaktif";
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
  kategori_harga: KategoriHargaLayanan[];
};

export default function DetailLayananPage() {
  const router = useRouter();
  const params = useParams();

  const kategori = params.kategori as string;

  const [layanan, setLayanan] = useState<Layanan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

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

  const daftarKategoriHarga =
    layanan.kategori_harga?.filter((item) => item.status === "aktif") || [];

  return (
    <main className="relative min-h-screen overflow-y-auto px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background (burgundy).png')" }}
      />

      <div className="fixed inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-2 py-6 md:px-6">
        <section className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[#ffecf2] shadow-[0_12px_35px_rgba(125,52,75,0.20)] shadow-soft-text md:max-w-3xl lg:max-w-5xl">
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

          <div className="space-y-4 px-5 py-4 pb-6 text-xs text-[#7D344B] sm:text-sm">
            <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
              <h2 className="mb-3 text-base font-semibold text-[#7D344B]">
                {layanan.nama_layanan}
              </h2>

              <p className="text-justify text-[#7D344B]">
                {layanan.deskripsi_layanan}
              </p>

              <div className="mt-3 rounded-md bg-white/60 px-3 py-2">
                <p className="text-xs font-semibold text-[#7D344B]">
                  Estimasi mulai dari
                </p>

                <p className="text-lg font-semibold text-[#E45082]">
                  {formatRupiah(layanan.harga_dasar)}
                </p>

                <p className="text-[11px] text-[#7D344B]/70">
                  Harga akhir dapat menyesuaikan tingkat kesulitan desain.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-[#7D344B]">
                  Kategori Harga Layanan
                </h3>

                <p className="mt-1 text-[11px] text-[#7D344B]/70 sm:text-xs">
                  Kami menyediakan beberapa kategori dengan estimasi harga
                  sebagai berikut.
                </p>
              </div>

              {daftarKategoriHarga.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {daftarKategoriHarga.map((item) => (
                    <div
                      key={item.id_kategori_harga}
                      className="overflow-hidden rounded-lg border border-[#dd98ad] bg-white/60 shadow-soft-text"
                    >
                      {item.url_gambar_kategori ? (
                        <img
                          src={item.url_gambar_kategori}
                          alt={item.nama_kategori}
                          className="h-36 w-full object-cover md:h-48"
                        />
                      ) : (
                        <div className="flex h-28 w-full items-center justify-center bg-white text-xs text-[#7D344B]/60">
                          Belum ada gambar kategori
                        </div>
                      )}

                      <div className="space-y-2 p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-semibold text-[#7D344B]">
                              {item.nama_kategori}
                            </h4>

                            <p className="text-base font-semibold text-[#E45082]">
                              {formatRupiah(item.estimasi_harga)}
                            </p>
                          </div>

                          <span className="rounded-full bg-[#f8dfe8] px-2 py-1 text-[10px] font-medium text-[#7D344B]">
                            Estimasi
                          </span>
                        </div>

                        <p className="text-justify text-xs leading-relaxed text-[#7D344B]/85 sm:text-sm">
                          {item.deskripsi_kategori ||
                            "Belum ada deskripsi kategori."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-dashed border-[#dd98ad] bg-white/50 p-3 text-center text-xs text-[#7D344B]/70">
                  Belum ada kategori harga untuk layanan ini.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <button
        type="button"
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#E45082] to-[#7D344B] text-white shadow-[0_10px_25px_rgba(125,52,75,0.35)] transition-all duration-200 hover:-translate-y-1 hover:opacity-95"
      >
        <Plus size={26} />
      </button>

      <BottomSheetPemesanan
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={`Form Pemesanan ${layanan.nama_layanan}`}
        subtitle="Isi detail pesanan sesuai layanan yang dipilih"
      >
        {layanan.kategori_layanan === "nail_art" && (
          <FormNailArt layanan={layanan} />
        )}

        {layanan.kategori_layanan === "presson" && (
          <FormPressOn layanan={layanan} />
        )}

        {layanan.kategori_layanan === "eyelash" && (
          <FormEyelash layanan={layanan} />
        )}

        {layanan.kategori_layanan !== "nail_art" &&
          layanan.kategori_layanan !== "presson" &&
          layanan.kategori_layanan !== "eyelash" && (
            <FormPlaceholderLayanan namaLayanan={layanan.nama_layanan} />
          )}
      </BottomSheetPemesanan>
    </main>
  );
}