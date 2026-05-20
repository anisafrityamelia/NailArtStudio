"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Tabel_Pesanan from "../components/tabel_pesanan";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Filter_Pesanan from "../components/filter_pesanan";
import ModalDetailPesanan from "../components/modal_detail_pesanan";
import ModalUbahStatusPesanan from "../components/modal_ubah_status_pesanan";
import {
  getPesananAktifAdmin,
  updateStatusPesananAktif,
} from "@/app/lib/pesanan";
import { DetailPesanan } from "../components/detail_pesanan/detail_pesanan_types";

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    menunggu_konfirmasi: "Menunggu Konfirmasi",
    terjadwal: "Terjadwal",
    diproses: "Diproses",
    siap_diambil: "Siap Diambil",
    selesai: "Selesai",
    dibatalkan: "Dibatalkan",
  };

  return statusMap[status] || status;
};

const getRadioOptions = (
  status?: string,
  layanan?: string
) => {
  if (status === "Menunggu Konfirmasi") {
    return layanan === "Press On"
      ? ["Diproses", "Dibatalkan"]
      : ["Terjadwal", "Dibatalkan"];
  }

  if (status === "Terjadwal") {
    return ["Selesai", "Dibatalkan"];
  }

  if (status === "Diproses") {
    return layanan === "Press On"
      ? ["Siap Diambil", "Dibatalkan"]
      : ["Selesai", "Dibatalkan"];
  }

  if (status === "Siap Diambil") {
    return ["Selesai", "Dibatalkan"];
  }

  return [];
};

const sortPesananAktif = (data: DetailPesanan[]) => {
  const statusOrder: Record<string, number> = {
    "Menunggu Konfirmasi": 1,
    Terjadwal: 2,
    Diproses: 3,
    "Siap Diambil": 4,
  };

  return [...data].sort((a, b) => {
    const statusA = statusOrder[a.status || ""] || 99;
    const statusB = statusOrder[b.status || ""] || 99;

    // urut status
    if (statusA !== statusB) {
      return statusA - statusB;
    }

    // urutkan tanggal booking
    const tanggalA = a.tanggal || "9999-12-31";
    const tanggalB = b.tanggal || "9999-12-31";

    if (tanggalA !== tanggalB) {
      return tanggalA.localeCompare(tanggalB);
    }

    // urutkan jam booking
    const jamA = a.jam || "23:59:59";
    const jamB = b.jam || "23:59:59";

    return jamA.localeCompare(jamB);
  });
};

export default function PesananAktifPage() {
  const [dataPesanan, setDataPesanan] = useState<DetailPesanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState({ layanan: "Layanan", status: "Status" });

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState<DetailPesanan | null>(null);

  useEffect(() => {
    const fetchPesananAktif = async () => {
      try {
        setLoading(true);

        const result = await getPesananAktifAdmin();

        const mappedData: DetailPesanan[] = result.map(
          (item: any, index: number) => ({
            no: index + 1,
            id_pesanan: item.id_pesanan,

            kode: item.kode_pesanan,

            pelanggan: item.pengguna?.nama_pengguna || "-",

            layanan: item.layanan?.nama_layanan || "-",

            tanggal: item.tanggal_pesanan || "-",

            jam: item.jam_pesanan || "-",

            status: formatStatus(item.status),

            // detail nail art
            bagianKuku: item.detail_nail_art?.bagian_kuku || "-",
            layananTambahan: item.detail_nail_art?.layanan_tambahan || "-",

            // gambar referensi (nail art, press on)
            gambarReferensi:
              item.detail_nail_art?.url_gambar_inspo ||
              item.detail_press_on?.url_gambar_inspo ||
              undefined,

            // detail eyelash
            jenisLash:
              item.detail_eyelash?.jenis_lash || "-",

            // detail press on
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

            shapeKuku: item.detail_press_on?.shape_kuku || "-",

            metodePengambilan:
              item.detail_press_on?.metode_pengambilan === "antar"
                ? "Diantar ke rumah"
                : item.detail_press_on?.metode_pengambilan === "ambil"
                ? "Ambil ke studio"
                : "-",

            alamatPengiriman: item.detail_press_on?.alamat_pengiriman || "-",

            // catatan (nail art, press on, eyelash)
            catatan:
              item.detail_nail_art?.catatan ||
              item.detail_press_on?.catatan ||
              item.detail_eyelash?.catatan ||
              "-",

            // pembayaran
            kodePembayaran: item.pembayaran?.kode_pembayaran || "-",

            nominalPembayaran: item.pembayaran?.nominal_pembayaran || "-",

            hargaFinal: item.harga_final || "",

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

            catatanAdmin: item.catatan_admin || "-",

            buktiTransfer: item.pembayaran?.url_bukti_pembayaran || undefined,
          })
        );

        setDataPesanan(mappedData);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data pesanan aktif");
      } finally {
        setLoading(false);
      }
    };

    fetchPesananAktif();
  }, []);

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

  return (
    <>
      <section>
        {loading && (
          <p className="mb-4 text-sm text-gray-500">
            Memuat data pesanan...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-500">{error}</p>
        )}

        {/* Judul halaman */}
        <Judul_Halaman title="Pesanan Aktif" />

        {/* Filter data */}
        <Filter_Pesanan
          layananOptions={["Layanan", "Nail Art", "Press On", "Remove", "Eyelash"]}
          statusOptions={["Status", "Menunggu Konfirmasi", "Terjadwal", "Diproses", "Siap Diambil"]}
          onFilterChange={(newFilter) =>
            setFilter((prev) => ({
              ...prev,
              ...newFilter,
            }))
          }
        />

        {/* Tabel daftar pesanan aktif */}
        <Tabel_Pesanan
          data={filteredData}
          highlightMenungguKonfirmasi={true}
          renderActions={(item) => (
            <div className="flex flex-nowrap items-center justify-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedPesanan(item);
                  setOpenModalDetail(true);
                }}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
              >
                <Eye size={15} /> Detail
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPesanan(item);
                  setOpenModalEdit(true);
                }}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
              >
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
        variant={
          selectedPesanan?.status === "Menunggu Konfirmasi"
            ? "masuk"
            : "aktif"
        }
      />

      <ModalUbahStatusPesanan
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        data={selectedPesanan}
        radioOptions={getRadioOptions(
          selectedPesanan?.status,
          selectedPesanan?.layanan
        )}
        isReadonlyHargaFinal={
          selectedPesanan?.status !== "Menunggu Konfirmasi"
        }
        onSubmit={async (payload) => {
          try {
            const payloadUpdate: {
              status: string;
              catatan_admin: string;
              harga_final?: string;
            } = {
              status: payload.status,
              catatan_admin: payload.catatanAdmin,
            };

            if (selectedPesanan?.status === "Menunggu Konfirmasi") {
              payloadUpdate.harga_final = payload.hargaFinal;
            }

            const updatedData = await updateStatusPesananAktif(
              selectedPesanan?.id_pesanan || 0,
              payloadUpdate
            );

            alert("Status pesanan berhasil diubah");

            const statusBaru = formatStatus(updatedData.status);

            if (statusBaru === "Selesai" || statusBaru === "Dibatalkan") {
              setDataPesanan((prev) =>
                prev.filter(
                  (item) =>
                    item.id_pesanan !== selectedPesanan?.id_pesanan
                )
              );
            } else {
              setDataPesanan((prev) =>
                sortPesananAktif(
                  prev.map((item) =>
                    item.id_pesanan === selectedPesanan?.id_pesanan
                      ? {
                          ...item,
                          status: statusBaru,
                          hargaFinal: updatedData.harga_final || "",
                          tanggalVerifikasi:
                            updatedData.pembayaran?.tanggal_verifikasi
                              ? updatedData.pembayaran.tanggal_verifikasi.split(" ")[0]
                              : "-",
                          statusPembayaran:
                            updatedData.pembayaran?.status_verifikasi
                              ? updatedData.pembayaran.status_verifikasi
                                  .replaceAll("_", " ")
                                  .replace(/\b\w/g, (char: string) =>
                                    char.toUpperCase()
                                  )
                              : "-",
                          catatanAdmin: updatedData.catatan_admin || "-",
                        }
                      : item
                  )
                )
              );
            }

            setOpenModalEdit(false);
          } catch (err: any) {
            alert(err.message || "Gagal mengubah status pesanan");
          }
        }}
      />
    </>
  );
}