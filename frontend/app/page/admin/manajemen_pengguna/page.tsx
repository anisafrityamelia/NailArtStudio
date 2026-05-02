"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Manajemen_Pengguna, {
    type Baris_Manajemen_Pengguna,
} from "./components/tabel_manajemen_pengguna";
import ModalTambahManajemenPengguna, {
    type PayloadTambahManajemenPengguna,
} from "./components/modal_tambah_manajemen_pengguna";
import ModalEditManajemenPengguna, {
    type PayloadEditManajemenPengguna,
} from "./components/modal_edit_manajemen_pengguna";
import Modal_Hapus from "@/app/components/ui/modal_hapus";
import API_BASE_URL from "@/app/lib/api";
import { getToken } from "@/app/lib/auth";

export default function ManajemenPenggunaPage() {
    const [data, setData] = useState<Baris_Manajemen_Pengguna[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [roleFilter, setRoleFilter] = useState("semua");
    const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);

    const [dataEdit, setDataEdit] = useState<Baris_Manajemen_Pengguna | null>(null);
    const [dataHapus, setDataHapus] = useState<Baris_Manajemen_Pengguna | null>(null);

    async function fetchPengguna() {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/admin/pengguna`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || "Gagal mengambil data pengguna");
                return;
            }

            const mappedData: Baris_Manajemen_Pengguna[] = result.data.map(
                (item: any, index: number) => ({
                    id_pengguna: item.id_pengguna,
                    no: index + 1,
                    nama: item.nama_pengguna,
                    email: item.email,
                    noHP: item.no_hp || "-",
                    role: item.role,
                })
            );

            setData(mappedData);
        } catch (error) {
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
    }

    async function handleTambahPengguna(payload: PayloadTambahManajemenPengguna) {
        try {
            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/admin/pengguna`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nama_pengguna: payload.nama,
                    email: payload.email,
                    no_hp: payload.noHP,
                    role: payload.role,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Gagal menambahkan pengguna");
                return;
            }

            await fetchPengguna();
            setIsModalTambahOpen(false);

            alert("Pengguna berhasil ditambahkan");
        } catch (error) {
            alert("Gagal terhubung ke server");
        }
    }

    async function handleEditPengguna(payload: PayloadEditManajemenPengguna) {
        try {
            const token = getToken();

            const response = await fetch(
                `${API_BASE_URL}/admin/pengguna/${payload.id_pengguna}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nama_pengguna: payload.nama,
                        email: payload.email,
                        no_hp: payload.noHP,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Gagal update pengguna");
                return;
            }

            await fetchPengguna();
            handleTutupModalEdit();

            alert("Berhasil update pengguna");
        } catch (error) {
            alert("Gagal terhubung ke server");
        }
    }

    async function handleResetPassword(id_pengguna: number) {
        try {
            const token = getToken();

            const response = await fetch(
                `${API_BASE_URL}/admin/pengguna/${id_pengguna}/reset-password`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Gagal reset password");
                return;
            }

            alert("Password direset ke 123456");
        } catch (error) {
            alert("Gagal terhubung ke server");
        }
    }

    async function handleHapusPengguna(id_pengguna: number) {
        try {
            const token = getToken();

            const response = await fetch(
                `${API_BASE_URL}/admin/pengguna/${id_pengguna}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Gagal menghapus pengguna");
                return;
            }

            await fetchPengguna();
            handleTutupModalHapus();

            alert("Pengguna berhasil dihapus");
        } catch (error) {
            alert("Gagal terhubung ke server");
        }
    }

    useEffect(() => {
        fetchPengguna();
    }, []);

    function handleBukaModalEdit(item: Baris_Manajemen_Pengguna) {
        setDataEdit(item);
        setIsModalEditOpen(true);
    }

    function handleTutupModalEdit() {
        setIsModalEditOpen(false);
        setDataEdit(null);
    }
        
    function handleBukaModalHapus(item: Baris_Manajemen_Pengguna) {
        setDataHapus(item);
        setIsModalHapusOpen(true);
    }
        
    function handleTutupModalHapus() {
        setIsModalHapusOpen(false);
        setDataHapus(null);
    }
        
    function handleKonfirmasiHapus() {
        if (!dataHapus) return;

        handleHapusPengguna(dataHapus.id_pengguna);
    }

    const dataFiltered =
        roleFilter === "semua"
            ? data
            : data.filter((item) => item.role === roleFilter);

    const dataTampil = dataFiltered.map((item, index) => ({
        ...item,
        no: index + 1,
    }));

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

                {loading && (
                    <p className="text-sm text-[#7D344B]">Memuat data pengguna...</p>
                )}
                
                {error && <p className="text-sm text-red-500">{error}</p>}
                
                {!loading && !error && (
                    <Tabel_Manajemen_Pengguna 
                        data={dataTampil} 
                        onEdit={handleBukaModalEdit}
                        onDelete={handleBukaModalHapus} 
                    />
                )}
            </section>

            <ModalTambahManajemenPengguna
                isOpen={isModalTambahOpen}
                onClose={() => setIsModalTambahOpen(false)}
                onSubmit={handleTambahPengguna}
            />

            <ModalEditManajemenPengguna
                isOpen={isModalEditOpen}
                onClose={handleTutupModalEdit}
                data={dataEdit} 
                onSubmit={handleEditPengguna}
                onResetPassword={handleResetPassword}
            />
            
            <Modal_Hapus
                isOpen={isModalHapusOpen}
                onClose={handleTutupModalHapus}
                onConfirm={handleKonfirmasiHapus}
            />
        </>
    );
}