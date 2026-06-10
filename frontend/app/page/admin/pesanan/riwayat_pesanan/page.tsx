"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import Tabel_Pesanan from "../components/tabel_pesanan";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Filter_Pesanan from "../components/filter_pesanan";
import ModalDetailPesanan from "../components/modal_detail_pesanan";
import { getRiwayatPesananAdmin } from "@/app/lib/pesanan";
import { getCurrentUser } from "@/app/lib/auth";
import { DetailPesanan } from "../components/detail_pesanan/detail_pesanan_types";

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    menunggu_konfirmasi: "Menunggu Konfirmasi",
    terjadwal: "Terjadwal",
    diproses: "Diproses",
    selesai: "Selesai",
    dibatalkan: "Dibatalkan",
  };

  return statusMap[status] || status;
};

export default function RiwayatPesananPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [dataPesanan, setDataPesanan] = useState<DetailPesanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState({ layanan: "Layanan", status: "Status"});
  const [openModal, setOpenModal] = useState(false);
  
  const [selectedPesanan, setSelectedPesanan] = useState<DetailPesanan | null>(null);

  useEffect(() => {
    const cekAuthDanFetchRiwayatPesanan = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.push("/auth/login");
          return;
        }

        if (user.role !== "admin") {
          router.push("/auth/login");
          return;
        }

        setIsCheckingAuth(false);
        setLoading(true);

        const result = await getRiwayatPesananAdmin();

        const mappedData: DetailPesanan[] = result.map(
          (item: any, index: number) => ({
            no: index + 1,
            id_pesanan: item.id_pesanan,

            kode: item.kode_pesanan,

            pelanggan:
              item.pengguna?.nama_pengguna || "-",

            layanan:
              item.layanan?.nama_layanan || "-",

            tanggal:
              item.tanggal_pesanan || "-",

            jam:
              item.jam_pesanan || "-",

            status: formatStatus(item.status),

            bagianKuku:
              item.detail_nail_art?.bagian_kuku ||
              item.detail_remove?.bagian_kuku ||
              "-",

            layananTambahan:
              item.detail_nail_art?.layanan_tambahan || "-",

            gambarReferensi:
              item.detail_nail_art?.url_gambar_inspo ||
              item.detail_press_on?.url_gambar_inspo ||
              undefined,

            jenisLash:
              item.detail_eyelash?.jenis_lash || "-",

            areaWaxing:
              item.detail_layanan_tambahan?.area_waxing || "-",

            fotoJariKanan:
              item.detail_press_on?.url_foto_jari_kanan ||
              undefined,

            fotoJempolKanan:
              item.detail_press_on?.url_foto_jempol_kanan ||
              undefined,

            fotoJariKiri:
              item.detail_press_on?.url_foto_jari_kiri ||
              undefined,

            fotoJempolKiri:
              item.detail_press_on?.url_foto_jempol_kiri ||
              undefined,

            shapeKuku:
              item.detail_press_on?.shape_kuku || "-",

            metodePengambilan:
              item.detail_press_on?.metode_pengambilan === "antar"
                ? "Diantar ke rumah"
                : item.detail_press_on?.metode_pengambilan === "ambil"
                ? "Ambil ke studio"
                : "-",

            alamatPengiriman:
              item.detail_press_on?.alamat_pengiriman || "-",

            catatan:
              item.detail_nail_art?.catatan ||
              item.detail_press_on?.catatan ||
              item.detail_eyelash?.catatan ||
              item.detail_remove?.catatan ||
              item.detail_layanan_tambahan?.catatan ||
              "-",

            kodePembayaran:
              item.pembayaran?.kode_pembayaran || "-",

            nominalPembayaran:
              item.pembayaran?.nominal_pembayaran || "-",

            hargaFinal:
              item.harga_final || "-",

            statusPembayaran:
              item.pembayaran?.status_verifikasi
                ? item.pembayaran.status_verifikasi
                    .replaceAll("_", " ")
                    .replace(/\b\w/g, (char: string) =>
                      char.toUpperCase()
                    )
                : "-",

            tanggalPembayaran:
              item.pembayaran?.tanggal_pembayaran
                ? item.pembayaran.tanggal_pembayaran.split(" ")[0]
                : "-",

            tanggalVerifikasi:
              item.pembayaran?.tanggal_verifikasi
                ? item.pembayaran.tanggal_verifikasi.split(" ")[0]
                : "-",

            catatanAdmin:
              item.catatan_admin || "-",

            buktiTransfer:
              item.pembayaran?.url_bukti_pembayaran || undefined,
          })
        );

        setDataPesanan(mappedData);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data riwayat pesanan");
      } finally {
        setLoading(false);
      }
    };

    cekAuthDanFetchRiwayatPesanan();
  }, [router]);

  const filteredData = dataPesanan.filter((item) => {
    const matchLayanan =
      filter.layanan === "Layanan" ||
      item.layanan === filter.layanan;

    const matchStatus =
      filter.status === "Status" ||
      item.status === filter.status;

    return matchLayanan && matchStatus;
  })
  .map((item, index) => ({
    ...item,
    no: index + 1,
  }));

  if (isCheckingAuth) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-semibold text-[#7D344B]">
          Memeriksa akses...
        </p>
      </section>
    );
  }

  return (
    <>
      <section>
        {loading && (
          <p className="mb-4 text-sm text-gray-500">
            Memuat data pesanan...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Judul halaman */}
        <Judul_Halaman title="Riwayat Pesanan" />

        {/* Filter data */}
        <Filter_Pesanan 
          layananOptions={["Layanan", "Nail Art", "Press On", "Remove", "Eyelash", "Behel", "Waxing", "Diamond Gigi", "Catok"]}
          statusOptions={["Status", "Selesai", "Dibatalkan"]}
          onFilterChange={(newFilter) =>
            setFilter((prev) => ({
              ...prev,
              ...newFilter,
            }))
          }
        />

        {/* Tabel daftar riwayat pesanan */}
        <Tabel_Pesanan
          data={filteredData}
          renderActions={(item) => (
            <div className="items-center justify-center gap-0.5 sm:flex-row sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedPesanan(item);
                  setOpenModal(true);
                }}
                className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1 py-0.5 text-[8px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:gap-1 sm:px-2 sm:py-1 sm:text-sm shadow-soft-text">
                <Eye size={12} className="sm:w-[15px] sm:h-[15px]" /> Detail 
              </button>
            </div>
          )}
        />
      </section>

      <ModalDetailPesanan
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        data={selectedPesanan}
        variant="riwayat"
      />
    </>
  );
}