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
            catatan: "Nisa dan Anan cuti",
        },
        {
            no: 2,
            tanggal: "2025-11-12",
            jumlahKaryawan: 2,
            catatan: "Widay cuti",
        },
        {
            no: 3,
            tanggal: "2025-11-12",
            jumlahKaryawan: 2,
            catatan: "Anan cuti",
        },
        {
            no: 4,
            tanggal: "2025-11-12",
            jumlahKaryawan: 1,
            catatan: "Widay dan Anan cuti",
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
                        className="flex items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-2 text-xs text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-3 sm:py-1.5 sm:text-sm shadow-soft-text"
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