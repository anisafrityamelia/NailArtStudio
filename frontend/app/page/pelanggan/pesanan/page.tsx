"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import TabPesanan from "./components/tab_pesanan_pelanggan";
import TabelPesananPelanggan from "./components/tabel_pesanan_pelanggan";
import ModalDetailPesananPelanggan from "./components/modal_detail_pesanan_pelanggan";
import { DetailPesananPelanggan } from "./components/detail_pesanan_pelanggan/detail_pesanan_types";

const statusAktif = ["Menunggu Konfirmasi", "Terbooking", "Diproses"];
const statusRiwayat = ["Selesai", "Dibatalkan"];

const dataPesanan: DetailPesananPelanggan[] = [
    {
        no: 1,
        kode: "ORD001",
        layanan: "Nail Art",
        tanggal: "10-Nov-25",
        jam: "10:00",
        status: "Menunggu Konfirmasi",
        bagianKuku: "Jari tangan",
        layananTambahan: "Extension",
        gambarReferensi: "/galeri 6.jpeg",
        catatan: "Warna pink nude",
        buktiTransfer: "/bukti-transfer.jfif",
    },
    {
        no: 2,
        kode: "ORD002",
        layanan: "Press On",
        tanggal: "-",
        jam: "-",
        status: "Diproses",
        gambarReferensi: "/galeri 2.jpeg",
        fotoJariKanan: "/galeri 2.jpeg",
        fotoJempolKanan: "/galeri 2.jpeg",
        fotoJariKiri: "/galeri 2.jpeg",
        fotoJempolKiri: "/galeri 2.jpeg",
        alamatPengiriman: "Nusa Jaya",
        shapeKuku: "Almond",
        metodePengambilan: "Diantar ke rumah",
        catatan: "-",
        buktiTransfer: "/bukti-transfer.jfif",
    },
    {
        no: 3,
        kode: "ORD003",
        layanan: "Eyelash",
        tanggal: "11-Nov-25",
        jam: "13:00",
        status: "Terbooking",
        jenisLash: "Korean Lash",
        catatan: "-",
        buktiTransfer: "/bukti-transfer.jfif",
    },
    {
        no: 4,
        kode: "ORD004",
        layanan: "Nail Art",
        tanggal: "05-Nov-25",
        jam: "09:00",
        status: "Selesai",
        bagianKuku: "Jari tangan",
        layananTambahan: "Extension",
        gambarReferensi: "/galeri 6.jpeg",
        catatan: "Warna pink nude",
        buktiTransfer: "/bukti-transfer.jfif",
    },
    {
        no: 5,
        kode: "ORD005",
        layanan: "Remove",
        tanggal: "06-Nov-25",
        jam: "14:00",
        status: "Dibatalkan",
        bagianKuku: "Jari Tangan",
        catatan: "-",
        buktiTransfer: "/bukti-transfer.jfif",
    },
];

export default function PesananSayaPage() {
    const [activeTab, setActiveTab] = useState<"aktif" | "riwayat">("aktif");
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedPesanan, setSelectedPesanan] = useState<DetailPesananPelanggan | null>(null);

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