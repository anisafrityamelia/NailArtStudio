"use client";

import { useEffect, useState } from "react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Kelola_Layanan, {
  type Baris_Kelola_Layanan,
} from "./components/tabel_kelola_layanan";
import ModalEditLayanan, {
  type PayloadEditLayanan,
  type PayloadKategoriHarga,
} from "./components/modal_edit_layanan";
import Card_Keunggulan_Beranda from "./components/card_keunggulan_beranda";
import Card_Galeri_Beranda from "./components/card_galeri_beranda";
import Card_Kontak_Beranda from "./components/card_kontak_beranda";
import API_BASE_URL from "@/app/lib/api";
import { getToken } from "@/app/lib/auth";
import { getBerandaAdmin } from "@/app/lib/beranda";

export default function KelolaLayananPage() {
    const [data, setData] = useState<Baris_Kelola_Layanan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState<Baris_Kelola_Layanan | null>(null);
    const [dataBeranda, setDataBeranda] = useState<any>(null);
    const [loadingBeranda, setLoadingBeranda] = useState(true);
    async function fetchLayanan() {
        try {
            setLoading(true);

            const token = getToken();

            const response = await fetch(`${API_BASE_URL}/admin/layanan`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message || "Gagal mengambil data layanan");
                return;
            }

            const mappedData: Baris_Kelola_Layanan[] = result.data.map(
                (item: any, index: number) => ({
                    id_layanan: item.id_layanan,
                    no: index + 1,
                    layanan: item.nama_layanan,
                    kategori_layanan: item.kategori_layanan,
                    deskripsi: item.deskripsi_layanan || "",
                    estimasiHarga: item.harga_dasar,
                    durasi: item.durasi_menit,
                    gambar: item.gambar || [],
                    kategoriHarga: item.kategori_harga || [],
                    statusLayanan:
                        item.status_layanan === "aktif" ? "Aktif" : "Nonaktif",
                })
            );

            setData(mappedData);
        } catch (error) {
            setError("Gagal terhubung ke server");
        } finally {
            setLoading(false);
        }
    }

    async function fetchBeranda() {
        try {
            setLoadingBeranda(true);

            const result = await getBerandaAdmin();

            setDataBeranda(result);
        } catch (error) {
            console.error("Gagal mengambil data beranda:", error);
        } finally {
            setLoadingBeranda(false);
        }
    }

    useEffect(() => {
        fetchLayanan();
        fetchBeranda();
    }, []);

    function handleBukaModalEdit(item: Baris_Kelola_Layanan) {
        setDataEdit(item);
        setIsModalEditOpen(true);
    }

    function handleTutupModalEdit() {
        setIsModalEditOpen(false);
        setDataEdit(null);
    }

    async function handleUpdateLayanan(payload: PayloadEditLayanan) {
        try {
            const token = getToken();

            const response = await fetch(
                `${API_BASE_URL}/admin/layanan/${payload.id_layanan}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        nama_layanan: payload.layanan,
                        harga_dasar: payload.estimasiHarga,
                        deskripsi_layanan: payload.deskripsi,
                        kategori_layanan: payload.kategori_layanan,
                        durasi_menit: payload.durasi,
                        status_layanan:
                            payload.statusLayanan === "Aktif" ? "aktif" : "nonaktif",
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Gagal update layanan");
                return;
            }

            const gambarLama = dataEdit?.gambar || [];

            const daftarGambar = [
                {
                    file: payload.fileGambar1,
                    id_gambar: gambarLama[0]?.id_gambar,
                },
                {
                    file: payload.fileGambar2,
                    id_gambar: gambarLama[1]?.id_gambar,
                },
                {
                    file: payload.fileGambar3,
                    id_gambar: gambarLama[2]?.id_gambar,
                },
                {
                    file: payload.fileGambar4,
                    id_gambar: gambarLama[3]?.id_gambar,
                },
            ];

            for (const item of daftarGambar) {
                if (!item.file) continue;

                const formData = new FormData();
                formData.append("gambar", item.file);

                if (item.id_gambar) {
                    await fetch(
                        `${API_BASE_URL}/admin/gambar-layanan/${item.id_gambar}/replace`,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: formData,
                        }
                    );
                } else {
                    await fetch(
                        `${API_BASE_URL}/admin/layanan/${payload.id_layanan}/gambar`,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: formData,
                        }
                    );
                }
            }
            await fetchLayanan();
            handleTutupModalEdit();
            alert("Layanan berhasil diperbarui");
        } catch (error) {
            alert("Gagal terhubung ke server");
        }
    }

    async function handleTambahKategoriHarga(
        id_layanan: number,
        payload: PayloadKategoriHarga
    ) {
        const token = getToken();

        const formData = new FormData();
        formData.append("nama_kategori", payload.nama_kategori);
        formData.append("deskripsi_kategori", payload.deskripsi_kategori);
        formData.append("estimasi_harga", String(payload.estimasi_harga));
        formData.append("urutan", String(payload.urutan));
        formData.append("status", payload.status);

        if (payload.file_gambar_kategori) {
            formData.append("gambar_kategori", payload.file_gambar_kategori);
        }

        const response = await fetch(
            `${API_BASE_URL}/admin/layanan/${id_layanan}/kategori-harga`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Gagal menambah kategori harga");
        }

        await fetchLayanan();

        return result.data;
    }

    async function handleUpdateKategoriHarga(
        id_kategori_harga: number,
        payload: PayloadKategoriHarga
    ) {
        const token = getToken();

        const formData = new FormData();
        formData.append("nama_kategori", payload.nama_kategori);
        formData.append("deskripsi_kategori", payload.deskripsi_kategori);
        formData.append("estimasi_harga", String(payload.estimasi_harga));
        formData.append("urutan", String(payload.urutan));
        formData.append("status", payload.status);

        if (payload.file_gambar_kategori) {
            formData.append("gambar_kategori", payload.file_gambar_kategori);
        }

        const response = await fetch(
            `${API_BASE_URL}/admin/kategori-harga-layanan/${id_kategori_harga}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Gagal update kategori harga");
        }

        await fetchLayanan();

        return result.data;
    }

    async function handleHapusKategoriHarga(id_kategori_harga: number) {
        const token = getToken();

        const response = await fetch(
            `${API_BASE_URL}/admin/kategori-harga-layanan/${id_kategori_harga}`,
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
            throw new Error(result.message || "Gagal hapus kategori harga");
        }

        await fetchLayanan();
    }

    return (
        <>
            <section>
                {/* Judul halaman */}
                <Judul_Halaman title="Kelola Layanan" />

                {loading && (
                <p className="text-sm text-[#7D344B]">Memuat data layanan...</p>
                )}

                {error && <p className="text-sm text-red-500">{error}</p>}

                {!loading && !error && (
                <Tabel_Kelola_Layanan data={data} onEdit={handleBukaModalEdit} />
                )}
            </section>

            <section className="mt-10 space-y-5">
                <Judul_Halaman title="Kelola Beranda" />

                {loadingBeranda ? (
                    <p className="text-sm text-[#7D344B]">Memuat data beranda...</p>
                ) : (
                    <>
                        <Card_Keunggulan_Beranda
                        dataBeranda={dataBeranda}
                        onRefresh={fetchBeranda}
                        />

                        <Card_Galeri_Beranda
                        dataBeranda={dataBeranda}
                        onRefresh={fetchBeranda}
                        />

                        <Card_Kontak_Beranda
                        dataBeranda={dataBeranda}
                        onRefresh={fetchBeranda}
                        />
                    </>
                )}
            </section>

            <ModalEditLayanan
                isOpen={isModalEditOpen}
                onClose={handleTutupModalEdit}
                data={dataEdit}
                onSubmit={handleUpdateLayanan}
                onTambahKategoriHarga={handleTambahKategoriHarga}
                onUpdateKategoriHarga={handleUpdateKategoriHarga}
                onHapusKategoriHarga={handleHapusKategoriHarga}
            />
        </>
    );
}