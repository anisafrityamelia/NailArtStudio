"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Tabel_Pesanan from "../components/tabel_pesanan";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Filter_Pesanan from "../components/filter_pesanan";
import ModalDetailPesanan from "../components/modal_detail_pesanan";
import ModalUbahStatusPesanan from "../components/modal_ubah_status_pesanan";
import { getPesananMasukAdmin, updateStatusPesanan } from "@/app/lib/pesanan";
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

export default function PesananMasukPage() {
  const [dataPesanan, setDataPesanan] = useState<DetailPesanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState({ layanan: "Layanan"});
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const [selectedPesanan, setSelectedPesanan] = useState<DetailPesanan | null>(null);

  useEffect(() => {
    const fetchPesananMasuk = async () => {
      try {
        setLoading(true);

        const result = await getPesananMasukAdmin();

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

            // Detail Nail Art
            bagianKuku:
              item.detail_nail_art?.bagian_kuku || "-",

            layananTambahan:
              item.detail_nail_art?.layanan_tambahan || "-",

            gambarReferensi:
              item.detail_nail_art?.gambar_inspo
                ? `http://localhost:8000/storage/${item.detail_nail_art.gambar_inspo}`
                : undefined,

            catatan:
              item.detail_nail_art?.catatan || "-",

            // Pembayaran
            kodePembayaran:
              item.pembayaran?.kode_pembayaran || "-",

            nominalPembayaran:
              item.pembayaran?.nominal_pembayaran || "-",

            hargaFinal:
              item.harga_final || "",

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

            buktiTransfer:
              item.pembayaran?.url_bukti_pembayaran || undefined,
          })
        );

        setDataPesanan(mappedData);
      } catch (err: any) {
        setError(
          err.message || "Gagal memuat data pesanan masuk"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPesananMasuk();
  }, []);

  const filteredData = dataPesanan.filter((item) => {
    const matchLayanan =
      filter.layanan === "Layanan" ||
      item.layanan === filter.layanan;

    return matchLayanan;
  })
  .map((item, index) => ({
    ...item,
    no: index + 1,
  }));

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
        <Judul_Halaman title="Pesanan Masuk" />

        {/* Filter data */}
        <Filter_Pesanan 
          layananOptions={["Layanan", "Nail Art", "Press On", "Remove", "Eyelash"]}
           onFilterChange={(newFilter) =>
            setFilter((prev) => ({
              ...prev,
              ...newFilter,
            }))
          }
        />

        {/* Tabel daftar pesanan masuk */}
        <Tabel_Pesanan 
          data={filteredData} 
          renderActions={(item) => (
            <div className="flex flex-nowrap items-center justify-center gap-1 sm:gap-2">
              <button 
                type="button"
                onClick={() => {
                  setSelectedPesanan(item);
                  setOpenModalDetail(true);
                }} 
                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text">
                <Eye size={15} /> Detail 
              </button>

              <button 
                type="button"
                onClick={() => {
                  setSelectedPesanan(item);
                  setOpenModalEdit(true);
                }} 
                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text">
                <Pencil size={15} /> Edit 
              </button>
            </div>
          )}
        />
      </section>

      <ModalDetailPesanan
        isOpen={openModalDetail}
        onClose={() => setOpenModalDetail(false)}
        data={selectedPesanan}
        variant="masuk"
      />

      <ModalUbahStatusPesanan
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        data={selectedPesanan}
        radioOptions={
          selectedPesanan?.layanan === "Press On"
          ? ["Diproses", "Dibatalkan"]
          : ["Terjadwal", "Dibatalkan"]
        }
        onSubmit={async (payload) => {
          try {
            await updateStatusPesanan(
              selectedPesanan?.id_pesanan || 0,
              {
                harga_final: payload.hargaFinal,
                status: payload.status,
                catatan_admin: payload.catatanAdmin,
              }
            );

            alert("Status pesanan berhasil diubah");

            setDataPesanan((prev) =>
              prev.filter(
                (item) => item.kode !== payload.kode
              )
            );

            setOpenModalEdit(false);
          } catch (err: any) {
            alert(
              err.message ||
              "Gagal mengubah status pesanan"
            );
          }
        }}
      />
    </>
  );
}