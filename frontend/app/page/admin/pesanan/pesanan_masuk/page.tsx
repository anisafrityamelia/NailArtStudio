"use client";

import { useState } from "react";
import { Eye, Pencil } from "lucide-react";
import Tabel_Pesanan from "../components/tabel_pesanan";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Filter_Pesanan from "../components/filter_pesanan";
import ModalDetailPesanan from "../components/modal_detail_pesanan";
import ModalUbahStatusPesanan from "../components/modal_ubah_status_pesanan";

export default function PesananMasukPage() {
  // Data sementara untuk isi tabel pesanan masuk
  const data = [
    {
      no: 1,
      kode: "ORD01023",
      pelanggan: "widayy",
      layanan: "Nail Art",
      tanggal: "06-Nov-25",
      jam: "11:00",
      status: "Menunggu Konfirmasi",
      statusPembayaran: "Menunggu Verifikasi",
    },
    {
      no: 2,
      kode: "ORD03024",
      pelanggan: "anann",
      layanan: "Eyelash",
      tanggal: "06-Nov-25",
      jam: "15:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 3,
      kode: "ORD02025",
      pelanggan: "Rani",
      layanan: "Press On",
      tanggal: "-",
      jam: "-",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 4,
      kode: "ORD01026",
      pelanggan: "anisa fitriy amelia",
      layanan: "Remove",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 5,
      kode: "ORD01027",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 6,
      kode: "ORD01028",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 7,
      kode: "ORD01029",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 8,
      kode: "ORD01030",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 9,
      kode: "ORD01031",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 10,
      kode: "ORD01032",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 11,
      kode: "ORD01033",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 12,
      kode: "ORD01034",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 13,
      kode: "ORD01035",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 14,
      kode: "ORD01036",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
    },
    {
      no: 15,
      kode: "ORD01037",
      pelanggan: "anisa fitriy amelia",
      layanan: "Nail Art",
      tanggal: "10-Nov-25",
      jam: "17:00",
      status: "Menunggu Konfirmasi",
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
        <Judul_Halaman title="Pesanan Masuk" />

        {/* Filter data */}
        <Filter_Pesanan statusOptions={statusOptions} />

        {/* Tabel daftar pesanan masuk */}
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
        variant="masuk"
      />

      <ModalUbahStatusPesanan
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        data={selectedPesanan}
        radioOptions={
          selectedPesanan?.layanan === "Press On"
          ? ["Diproses", "Dibatalkan"]
          : ["Terbooking", "Dibatalkan"]
        }
        onSubmit={(payload) => {
          console.log("Submit pesanan masuk:", payload);
        }}
      />
    </>
  );
}