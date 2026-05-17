"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InputReadonly, TextareaReadonly, UploadPreviewReadonly } from "../components/detail_pesanan_fields";
import { getDetailPesanan } from "@/app/lib/pesanan";
import { uploadPembayaran } from "@/app/lib/pembayaran";

export default function PembayaranNailArt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idPesanan = searchParams.get("id");
  const [pesanan, setPesanan] = useState<any>(null);
  const [buktiPembayaran, setBuktiPembayaran] =
    useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!idPesanan) return;

    const fetchPesanan = async () => {

      try {

        const data = await getDetailPesanan(idPesanan);

        setPesanan(data);

      } catch (err: any) {

        setError(err.message);
      }
    };

    fetchPesanan();

  }, [idPesanan]);


  const handleSubmitPembayaran = async () => {

    if (!buktiPembayaran) {
      setError("Bukti pembayaran wajib diunggah");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "id_pesanan",
        String(idPesanan)
      );

      formData.append(
        "bukti_pembayaran",
        buktiPembayaran
      );

      await uploadPembayaran(formData);

      router.push("/page/pemesanan/notif_berhasil");

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };

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
              className="cursor-pointer rounded-full p-1 text-[#7D344B] hover:bg-[#f8dfe8]"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="flex-1 text-center text-sm font-semibold text-[#7d344b] sm:text-base">
              Pembayaran
            </h1>

            <div className="w-[18px]" />
          </div>

          <div className="space-y-4 px-5 py-4 text-xs text-[#7D344B] sm:text-sm">
            <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
              <h2 className="mb-4 text-sm font-semibold sm:text-base">
                Detail Pesanan
              </h2>

              <div className="space-y-3">
                <InputReadonly label="Kode Pesanan" value={pesanan?.kode_pesanan || "-"} />
                <InputReadonly label="Nama Pelanggan" value={pesanan?.user?.nama_pengguna || "-"} />
                <InputReadonly label="Layanan" value={pesanan?.layanan?.nama_layanan || "-"} />
                <InputReadonly label="Tanggal" value={pesanan?.tanggal_pesanan || "-"} />
                <InputReadonly label="Jam" value={pesanan?.jam_pesanan || "-"} />
                <UploadPreviewReadonly
                  label="Gambar Referensi"
                  src={
                    pesanan?.detail_nail_art?.url_gambar_inspo
                  }
                  alt="Gambar Referensi"
                />
                <InputReadonly label="Bagian Kuku" value={pesanan?.detail_nail_art?.bagian_kuku || "-"} />
                <InputReadonly label="Layanan Tambahan" value={pesanan?.detail_nail_art?.layanan_tambahan || "-"} />
                <TextareaReadonly label="Catatan" value={pesanan?.detail_nail_art?.catatan || "-"} />
              </div>
            </div>

            <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
              <h2 className="mb-4 text-sm font-semibold sm:text-base">
                Detail Pembayaran
              </h2>

              <p className="mb-4 text-xs font-medium leading-relaxed sm:text-sm">
                Silakan lakukan pembayaran DP sebesar Rp50.000 melalui transfer ke rekening
                berikut, kemudian unggah bukti transfer Anda untuk verifikasi.
              </p>

              <div className="space-y-3">
                <InputReadonly label="BCA" value="1234567890" />
                <InputReadonly label="BNI" value="9876543210" />
                <InputReadonly label="Mandiri" value="1122334455" />
              </div>
            </div>

            <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
              <h2 className="mb-4 text-sm font-semibold sm:text-base">
                Unggah Bukti Transfer
              </h2>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                  if (
                    e.target.files &&
                    e.target.files[0]
                  ) {
                    setBuktiPembayaran(
                      e.target.files[0]
                    );
                  }
                }}
                className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#e6b1c2] file:px-3 file:py-1 file:text-white hover:file:bg-[#dd98ad]"
              />
            </div>

            {error && (
              <p className="text-center text-sm text-red-600">
                {error}
              </p>
            )}
            
            <button
              type="button"
              onClick={handleSubmitPembayaran}
              className="mt-1 cursor-pointer w-full rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm mb-2"
            >
              {loading ? "Memproses..." : "Kirim"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}