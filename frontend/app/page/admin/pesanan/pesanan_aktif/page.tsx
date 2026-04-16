"use client";

import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Tabel_Pesanan from "../components/tabel_pesanan";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Filter_Pesanan from "../components/filter_pesanan";
import ModalDetailPesanan from "../components/modal_detail_pesanan";
import ModalUbahStatusPesanan from "../components/modal_ubah_status_pesanan";

export default function PesananAktifPage() {
  // Data sementara untuk isi tabel pesanan aktif
  const data = [
    {
      no: 1,
      kode: "ORD01023",
      pelanggan: "widayy",
      layanan: "Nail Art",
      tanggal: "06-Nov-25",
      jam: "11:00",
      status: "Terbooking",
      gambarReferensi: "/V.jfif",
      bagianKuku: "Jari tangan",
      layananTambahan: "Extension",
      catatan: "Warna pink nude",
      kodePembayaran: "DP01023",
      nominalPembayaran: "Rp50.000",
      hargaFinal: "Rp150.000",
      statusPembayaran: "Valid",
      tanggalPembayaran: "05-Nov-25",
      tanggalVerifikasi: "07-Nov-25",
      catatanPembayaran: "-",
      buktiTransfer: "/V1.jfif",
    },
    {
      no: 2,
      kode: "ORD03024",
      pelanggan: "anann",
      layanan: "Eyelash",
      tanggal: "06-Nov-25",
      jam: "15:00",
      status: "Terbooking",
    },
    {
      no: 3,
      kode: "ORD02025",
      pelanggan: "Rani",
      layanan: "Press On",
      tanggal: "-",
      jam: "-",
      status: "Diproses",
    },
    {
      no: 4,
      kode: "ORD01026",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 5,
      kode: "ORD01027",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 6,
      kode: "ORD01028",
      pelanggan: "anisa fitriy amelia",
      layanan: "Remove",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 7,
      kode: "ORD01029",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 8,
      kode: "ORD010230",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 9,
      kode: "ORD01031",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 10,
      kode: "ORD01032",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 11,
      kode: "ORD01033",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 12,
      kode: "ORD01034",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 13,
      kode: "ORD01035",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 14,
      kode: "ORD01036",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
    {
      no: 15,
      kode: "ORD01037",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Terbooking",
    },
  ];
  const statusOptions = ["Status"];
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState<any>(null);

  return (
    <>
      <section>
        {/* Judul halaman */}
        <Judul_Halaman title="Pesanan Aktif" />

        {/* Filter data */}
        <Filter_Pesanan statusOptions={statusOptions} />

        {/* Tabel daftar pesanan aktif */}
        <Tabel_Pesanan 
          data={data} 
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
        variant="aktif"
      />

      <ModalUbahStatusPesanan
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        data={selectedPesanan}
        radioOptions={["Selesai", "Dibatalkan"]}
        onSubmit={(payload) => {
          console.log("Submit pesanan aktif:", payload);
        }}
      />
    </>
  );
}