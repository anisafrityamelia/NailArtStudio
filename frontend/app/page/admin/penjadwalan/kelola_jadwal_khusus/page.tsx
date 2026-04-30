"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Jadwal_Khusus from "./components/tabel_jadwal_khusus";
import ModalTambahJadwalKhusus from "./components/modal_tambah_jadwal_khusus";
import ModalEditJadwalKhusus from "./components/modal_edit_jadwal_khusus";
import Modal_Hapus from "@/app/components/ui/modal_hapus";

type JadwalKhusus = {
  no: number;
  tanggal: string;
  status: string;
  jamBuka: string;
  jamTutup: string;
  catatan: string;
};

export default function KelolaJadwalKhususPage() {
  // Data sementara untuk isi tabel
  const data: JadwalKhusus[] = [
    {
      no: 1,
      tanggal: "2025-11-01",
      status: "Tutup",
      jamBuka: "-",
      jamTutup: "-",
      catatan: "Hari ini libur dulu",
    },
    {
      no: 2,
      tanggal: "2025-11-02",
      status: "Buka",
      jamBuka: "10:00",
      jamTutup: "22:00",
      catatan: "Buka mulai dari jam 10 pagi",
    },
    {
      no: 3,
      tanggal: "2025-11-03",
      status: "Buka",
      jamBuka: "11:00",
      jamTutup: "22:00",
      catatan: "Buka mulai dari jam 11 pagi",
    },
    {
      no: 4,
      tanggal: "2025-11-04",
      status: "Buka",
      jamBuka: "12:00",
      jamTutup: "22:00",
      catatan: "Buka mulai dari jam 12 siang",
    },
  ];
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);

  const [dataEdit, setDataEdit] = useState<JadwalKhusus | null>(null);
  const [dataHapus, setDataHapus] = useState<JadwalKhusus | null>(null);

  function handleBukaModalEdit(item: JadwalKhusus) {
    setDataEdit(item);
    setIsModalEditOpen(true);
  }

  function handleTutupModalEdit() {
    setIsModalEditOpen(false);
    setDataEdit(null);
  }

  function handleBukaModalHapus(item: JadwalKhusus) {
    setDataHapus(item);
    setIsModalHapusOpen(true);
  }

  function handleTutupModalHapus() {
    setIsModalHapusOpen(false);
    setDataHapus(null);
  }

  function handleKonfirmasiHapus() {
    handleTutupModalHapus();
  }

  return (
    <>
      <section className="space-y-4">
        {/* Judul halaman */}
        <Judul_Halaman title="Kelola Jadwal Khusus" />

        {/* Tombol tambah */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsModalTambahOpen(true)}
            className="flex items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-2 text-xs text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-3 sm:py-1.5 sm:text-sm shadow-soft-text"
          >
            <Plus size={15} /> Tambah
          </button>
        </div>

        {/* Tabel */}
        <Tabel_Jadwal_Khusus 
          data={data} 
          onEdit={handleBukaModalEdit}
          onDelete={handleBukaModalHapus}
        />
      </section>

      <ModalTambahJadwalKhusus
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
        onSubmit={() => {
          setIsModalTambahOpen(false);
        }}
      />

      <ModalEditJadwalKhusus
        isOpen={isModalEditOpen}
        onClose={handleTutupModalEdit}
        data={dataEdit}
        onSubmit={() => {
          handleTutupModalEdit();
        }}
      />

      <Modal_Hapus
        isOpen={isModalHapusOpen}
        onClose={handleTutupModalHapus}
        onConfirm={handleKonfirmasiHapus}
      />
    </>
  );
}