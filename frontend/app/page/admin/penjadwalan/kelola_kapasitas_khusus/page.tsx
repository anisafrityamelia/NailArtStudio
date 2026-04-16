"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Kapasitas_Khusus from "./components/tabel_kapasitas_khusus";
import ModalTambahKapasitasKhusus from "./components/modal_tambah_kapasitas_khusus";
import ModalEditKapasitasKhusus from "./components/modal_edit_kapasitas_khusus";
import Modal_Hapus from "@/app/components/ui/modal_hapus";

type KapasitasKhusus = {
  no: number;
  tanggal: string;
  jumlahKaryawan: number;
  catatan: string;
};

export default function KelolaKapasitasKhususPage() {
    // Data sementara untuk isi tabel
    const data: KapasitasKhusus[] = [
        {
            no: 1,
            tanggal: "2025-11-12",
            jumlahKaryawan: 1,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 2,
            tanggal: "2025-11-12",
            jumlahKaryawan: 2,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 3,
            tanggal: "2025-11-12",
            jumlahKaryawan: 3,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 4,
            tanggal: "2025-11-12",
            jumlahKaryawan: 4,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 5,
            tanggal: "2025-11-12",
            jumlahKaryawan: 5,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 6,
            tanggal: "2025-11-12",
            jumlahKaryawan: 6,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 7,
            tanggal: "2025-11-12",
            jumlahKaryawan: 7,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 8,
            tanggal: "2025-11-12",
            jumlahKaryawan: 8,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 9,
            tanggal: "2025-11-12",
            jumlahKaryawan: 9,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 10,
            tanggal: "2025-11-12",
            jumlahKaryawan: 10,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 11,
            tanggal: "2025-11-12",
            jumlahKaryawan: 11,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 12,
            tanggal: "2025-11-12",
            jumlahKaryawan: 12,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 13,
            tanggal: "2025-11-12",
            jumlahKaryawan: 13,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
        {
            no: 14,
            tanggal: "2025-11-12",
            jumlahKaryawan: 14,
            catatan: "Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia Anisa Frity Amelia  ",
        },
    ];

    const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);
 
    const [dataEdit, setDataEdit] = useState<KapasitasKhusus | null>(null);
    const [dataHapus, setDataHapus] = useState<KapasitasKhusus | null>(null);

    function handleBukaModalEdit(item: KapasitasKhusus) {
        setDataEdit(item);
        setIsModalEditOpen(true);
    }

    function handleTutupModalEdit() {
        setIsModalEditOpen(false);
        setDataEdit(null);
    }
    
    function handleBukaModalHapus(item: KapasitasKhusus) {
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
                <Judul_Halaman title="Kelola Kapasitas Khusus" />
    
                {/* Tombol tambah */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setIsModalTambahOpen(true)}
                        className="flex items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-xs text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-3 sm:py-1.5 sm:text-sm shadow-soft-text"
                    >
                        <Plus size={15} /> Tambah
                    </button>
                </div>
    
                {/* Tabel */}
                <Tabel_Kapasitas_Khusus 
                    data={data}
                    onEdit={handleBukaModalEdit}
                    onDelete={handleBukaModalHapus} 
                />
            </section>

            <ModalTambahKapasitasKhusus
                isOpen={isModalTambahOpen}
                onClose={() => setIsModalTambahOpen(false)}
                onSubmit={() => {
                    setIsModalTambahOpen(false);
                }}
            />

            <ModalEditKapasitasKhusus
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