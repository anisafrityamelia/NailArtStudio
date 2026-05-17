"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import TabPesanan from "./components/tab_pesanan_pelanggan";
import TabelPesananPelanggan from "./components/tabel_pesanan_pelanggan";
import ModalDetailPesananPelanggan from "./components/modal_detail_pesanan_pelanggan";
import { DetailPesananPelanggan } from "./components/detail_pesanan_pelanggan/detail_pesanan_types";
import { getPesananSaya } from "@/app/lib/pesanan";

const statusAktif = ["Menunggu Konfirmasi", "Terjadwal", "Diproses"];
const statusRiwayat = ["Selesai", "Dibatalkan"];

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

export default function PesananSayaPage() {
    const [activeTab, setActiveTab] = useState<"aktif" | "riwayat">("aktif");
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedPesanan, setSelectedPesanan] = useState<DetailPesananPelanggan | null>(null);
    const [dataPesanan, setDataPesanan] = useState<DetailPesananPelanggan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPesanan = async () => {
            try {
            setLoading(true);

            const result = await getPesananSaya();

            const mappedData: DetailPesananPelanggan[] = result.map(
                (item: any, index: number) => ({
                no: index + 1,
                id_pesanan: item.id_pesanan,
                kode: item.kode_pesanan,
                layanan: item.layanan?.nama_layanan || "-",
                tanggal: item.tanggal_pesanan || "-",
                jam: item.jam_pesanan || "-",
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
                buktiTransfer:
                    item.pembayaran?.url_bukti_pembayaran || undefined,
                })
            );

            setDataPesanan(mappedData);
        } catch (err: any) {
            setError(err.message || "Gagal memuat data pesanan");
        } finally {
            setLoading(false);
        }
    };

    fetchPesanan();
    }, []);

    const filteredData = dataPesanan.filter((item) => {
        if (activeTab === "aktif") {
            return statusAktif.includes(item.status ?? "");
        } else {
            return statusRiwayat.includes(item.status ?? "");
        }
    });

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
                <Judul_Halaman title="Pesanan Saya" />

                <TabPesanan activeTab={activeTab} onChangeTab={setActiveTab} />

                <TabelPesananPelanggan
                    data={filteredData}
                    renderActions={(item) => (
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedPesanan(item);
                                    setOpenModalDetail(true);
                                }}
                                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
                            >
                                <Eye size={15} />
                                Detail
                            </button>
                        </div>
                    )}
                />
            </section>

            {/* Modal detail pesanan */}
            <ModalDetailPesananPelanggan
                isOpen={openModalDetail}
                onClose={() => setOpenModalDetail(false)}
                data={selectedPesanan}
            />
        </>
    );
}