"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Manajemen_Pengguna from "./components/tabel_manajemen_pengguna";
import ModalTambahManajemenPengguna from "./components/modal_tambah_manajemen_pengguna";
import ModalEditManajemenPengguna from "./components/modal_edit_manajemen_pengguna";
import Modal_Hapus from "@/app/components/ui/modal_hapus";

type ManajemenPengguna = {
  no: number;
  nama: string,
  email: string,
  noHP: string,
  role: string,
};

export default function ManajemenPenggunaPage() {
  // Data sementara untuk isi tabel manajemen pengguna
    const data: ManajemenPengguna[] = [
        {
            no: 1,
            nama: "Admin",
            email: "aliaoye@gmail.com",
            noHP: "081378780866",
            role: "admin",
        },
        {
            no: 2,
            nama: "Ahyun",
            email: "ahyun@gmail.com",
            noHP: "081378780867",
            role: "pelanggan",
        },
        {
            no: 3,
            nama: "Anisa Frity Amelia",
            email: "anisa@gmail.com",
            noHP: "081378780868",
            role: "pelanggan",
        },
        {
            no: 4,
            nama: "widayy",
            email: "widay@gmail.com",
            noHP: "081378780869",
            role: "pelanggan",
        },
        {
            no: 5,
            nama: "Amelia",
            email: "amel@gmail.com",
            noHP: "081378780870",
            role: "pelanggan",
        },
    ];

    const [roleFilter, setRoleFilter] = useState("semua");
    const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);

    const [dataEdit, setDataEdit] = useState<ManajemenPengguna | null>(null);
    const [dataHapus, setDataHapus] = useState<ManajemenPengguna | null>(null);

    function handleBukaModalEdit(item: ManajemenPengguna) {
        setDataEdit(item);
        setIsModalEditOpen(true);
    }

    function handleTutupModalEdit() {
        setIsModalEditOpen(false);
        setDataEdit(null);
    }
        
    function handleBukaModalHapus(item: ManajemenPengguna) {
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

    const dataTampil =
        roleFilter === "semua"
            ? data
            : data.filter((item) => item.role === roleFilter);

    return (
        <>
            <section>
                {/* Judul halaman */}
                <Judul_Halaman title="Manajemen Pengguna" />

                <div className="mb-5 flex items-center justify-between gap-3">
                    {/* Dropdown role */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="h-8 rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs text-[#7d344b] font-semibold outline-none cursor-pointer sm:px-4 sm:text-sm"
                    >
                        <option value="semua" className="bg-white">Role</option>
                        <option value="admin" className="bg-white">Admin</option>
                        <option value="pelanggan" className="bg-white">Pelanggan</option>
                    </select>

                    {/* Tombol tambah */}
                    <button
                        type="button"
                        onClick={() => setIsModalTambahOpen(true)}
                        className="flex items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-2 text-xs text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-3 sm:py-1.5 sm:text-sm shadow-soft-text"
                    >
                        <Plus size={15} /> Tambah
                    </button>
                </div>
    
                {/* Tabel daftar manajemen pengguna */}
                <Tabel_Manajemen_Pengguna 
                    data={dataTampil} 
                    onEdit={handleBukaModalEdit}
                    onDelete={handleBukaModalHapus}
                />
            </section>

            <ModalTambahManajemenPengguna
                isOpen={isModalTambahOpen}
                onClose={() => setIsModalTambahOpen(false)}
                onSubmit={() => setIsModalTambahOpen(false)}
            />

            <ModalEditManajemenPengguna
                isOpen={isModalEditOpen}
                onClose={handleTutupModalEdit}
                data={dataEdit}
                onSubmit={() => handleTutupModalEdit()}
            />

            <Modal_Hapus
                isOpen={isModalHapusOpen}
                onClose={handleTutupModalHapus}
                onConfirm={handleKonfirmasiHapus}
            />
        </>
    );
}