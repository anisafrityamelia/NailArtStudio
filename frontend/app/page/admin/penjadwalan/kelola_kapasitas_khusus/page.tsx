"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Kapasitas_Khusus from "./components/tabel_kapasitas_khusus";
import ModalTambahKapasitasKhusus from "./components/modal_tambah_kapasitas_khusus";
import ModalEditKapasitasKhusus from "./components/modal_edit_kapasitas_khusus";
import Modal_Hapus from "@/app/components/ui/modal_hapus";
import { getKapasitasKhususAdmin, tambahKapasitasKhususAdmin, updateKapasitasKhususAdmin, hapusKapasitasKhususAdmin, type KapasitasKhusus as KapasitasKhususApi } from "@/app/lib/kapasitas_khusus";
import { getCurrentUser } from "@/app/lib/auth";

type KapasitasKhusus = {
  id_kapasitas: number;
  no: number;
  tanggal: string;
  jumlahKaryawan: number;
  catatan: string;
};

export default function KelolaKapasitasKhususPage() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [data, setData] = useState<KapasitasKhusus[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);
 
    const [dataEdit, setDataEdit] = useState<KapasitasKhusus | null>(null);
    const [dataHapus, setDataHapus] = useState<KapasitasKhusus | null>(null);

    useEffect(() => {
        const cekAuthDanAmbilKapasitasKhusus = async () => {
            const user = await getCurrentUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            if (user.role !== "admin") {
                router.push("/auth/login");
                return;
            }

            setIsCheckingAuth(false);
            ambilKapasitasKhusus();
        };

        cekAuthDanAmbilKapasitasKhusus();
    }, [router]);

    async function ambilKapasitasKhusus() {
        try {
            setIsLoading(true);

            const result = await getKapasitasKhususAdmin();

            const mappedData = result.map(
                (item: KapasitasKhususApi, index: number) => ({
                    id_kapasitas: item.id_kapasitas,
                    no: index + 1,
                    tanggal: item.tanggal,
                    jumlahKaryawan: item.jumlah_karyawan,
                    catatan: item.catatan || "-",
                })
            );

            setData(mappedData);
        } catch (error) {
            console.error("Gagal mengambil kapasitas khusus:", error);
        } finally {
            setIsLoading(false);
        }
    }

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

    async function handleTambahKapasitas(payload: {
        tanggal: string;
        jumlahKaryawan: number;
        catatan: string;
    }) {
        if (!payload.tanggal || payload.jumlahKaryawan < 1) {
            return;
        }

        try {
            await tambahKapasitasKhususAdmin({
                tanggal: payload.tanggal,
                jumlah_karyawan: payload.jumlahKaryawan,
                catatan: payload.catatan,
            });

            setIsModalTambahOpen(false);
            await ambilKapasitasKhusus();
        } catch (error) {
            console.error("Gagal menambah kapasitas khusus:", error);
        }
    }

    async function handleEditKapasitas(payload: {
        no: number;
        tanggal: string;
        jumlahKaryawan: number;
        catatan: string;
    }) {
        if (!dataEdit) return;

        if (!payload.tanggal || payload.jumlahKaryawan < 1) {
            return;
        }

        try {
            await updateKapasitasKhususAdmin(dataEdit.id_kapasitas, {
                tanggal: payload.tanggal,
                jumlah_karyawan: payload.jumlahKaryawan,
                catatan: payload.catatan,
            });

            handleTutupModalEdit();
            await ambilKapasitasKhusus();
        } catch (error) {
            console.error("Gagal memperbarui kapasitas khusus:", error);
        }
    }

    async function handleKonfirmasiHapus() {
        if (!dataHapus) return;

        try {
            await hapusKapasitasKhususAdmin(dataHapus.id_kapasitas);

            handleTutupModalHapus();
            await ambilKapasitasKhusus();
        } catch (error) {
            console.error("Gagal menghapus kapasitas khusus:", error);
        }
    }

    if (isCheckingAuth) {
        return (
            <section className="flex min-h-screen items-center justify-center">
                <p className="text-sm font-semibold text-[#7D344B]">
                    Memeriksa akses...
                </p>
            </section>
        );
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

                {isLoading ? (
                <section className="rounded-md border border-[#d3a0b0] bg-white/40 p-5 text-sm text-[#7D344B] shadow-sm">
                    Memuat kapasitas khusus...
                </section>
                ) : (
                    <Tabel_Kapasitas_Khusus 
                        data={data}
                        onEdit={handleBukaModalEdit}
                        onDelete={handleBukaModalHapus} 
                    />
                )}
            </section>

            <ModalTambahKapasitasKhusus
                isOpen={isModalTambahOpen}
                onClose={() => setIsModalTambahOpen(false)}
                onSubmit={handleTambahKapasitas}
            />

            <ModalEditKapasitasKhusus
                isOpen={isModalEditOpen}
                onClose={handleTutupModalEdit}
                data={dataEdit}
                onSubmit={handleEditKapasitas}
            />

            <Modal_Hapus
                isOpen={isModalHapusOpen}
                onClose={handleTutupModalHapus}
                onConfirm={handleKonfirmasiHapus}
            />
        </>
    );
}