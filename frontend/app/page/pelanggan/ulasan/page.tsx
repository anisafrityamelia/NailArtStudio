"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Ulasan, { type Baris_Ulasan_Pelanggan } from "./components/tabel_ulasan";
import Modal_Hapus from "@/app/components/ui/modal_hapus";
import ModalTambahUlasanPelanggan from "./components/modal_tambah_ulasan_pelanggan";
import ModalEditUlasanPelanggan from "./components/modal_edit_ulasan_pelanggan";
import { getUlasanSaya, tambahUlasan, updateUlasan, hapusUlasan } from "@/app/lib/ulasan";
import { getCurrentUser } from "@/app/lib/auth";

export default function UlasanPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isModalTambahUlasanOpen, setIsModalTambahUlasanOpen] = useState(false);
  const [isModalEditUlasanOpen, setIsModalEditUlasanOpen] = useState(false);
  const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);

  const [dataUlasan, setDataUlasan] = useState<Baris_Ulasan_Pelanggan | null>(null);
  const [dataHapus, setDataHapus] = useState<Baris_Ulasan_Pelanggan | null>(null);

  const [data, setData] = useState<Baris_Ulasan_Pelanggan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUlasan = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getUlasanSaya();

      const mappedData: Baris_Ulasan_Pelanggan[] = result.map(
        (item: any, index: number) => ({
          no: index + 1,
          id_pesanan: item.id_pesanan,
          id_ulasan: item.ulasan?.id_ulasan || null,
          kode: item.kode_pesanan,
          layanan: item.layanan?.nama_layanan || "-",
          tanggal: item.tanggal_pesanan || "-",
          ulasan: item.ulasan?.ulasan || "",
          rating: item.ulasan?.rating || "",
          gambar: item.ulasan?.url_gambar_ulasan || "",
        })
      );

      setData(mappedData);
    } catch (err: any) {
      setError(err.message || "Gagal memuat data ulasan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cekAuthPelanggan = async () => {
      const user = await getCurrentUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      if (user.role !== "pelanggan") {
        router.push("/auth/login");
        return;
      }

      setIsCheckingAuth(false);
      fetchUlasan();
    };

    cekAuthPelanggan();
  }, [router]);

  function handleBukaModalTambahUlasan(item: Baris_Ulasan_Pelanggan) {
    setDataUlasan(item);
    setIsModalTambahUlasanOpen(true);
  }

  function handleBukaModalEditUlasan(item: Baris_Ulasan_Pelanggan) {
    setDataUlasan(item);
    setIsModalEditUlasanOpen(true);
  }

  function handleBukaModalHapus(item: Baris_Ulasan_Pelanggan) {
    setDataHapus(item);
    setIsModalHapusOpen(true);
  }

  function handleTutupModalTambahUlasan() {
    setIsModalTambahUlasanOpen(false);
    setDataUlasan(null);
  }

  function handleTutupModalEditUlasan() {
    setIsModalEditUlasanOpen(false);
    setDataUlasan(null);
  }

  function handleTutupModalHapus() {
    setIsModalHapusOpen(false);
    setDataHapus(null);
  }

  async function handleKonfirmasiHapus() {
    if (!dataHapus?.id_ulasan) return;

    try {
      await hapusUlasan(dataHapus.id_ulasan);
      handleTutupModalHapus();
      fetchUlasan();
    } catch (error) {
      console.error("Gagal menghapus ulasan:", error);
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
      <section>
        <Judul_Halaman title="Ulasan Saya" />

        {loading && (
          <p className="mb-4 text-sm text-gray-500">
            Memuat data ulasan...
          </p>
        )}

        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        <Tabel_Ulasan
          data={data}
          onEdit={handleBukaModalEditUlasan}
          onBeriUlasan={handleBukaModalTambahUlasan}
          onDelete={handleBukaModalHapus}
        />
      </section>

      <ModalTambahUlasanPelanggan
        isOpen={isModalTambahUlasanOpen}
        onClose={handleTutupModalTambahUlasan}
        data={dataUlasan}
        onSubmit={async (payload) => {
          try {
            const formData = new FormData();

            formData.append("id_pesanan", String(payload.id_pesanan));
            formData.append("rating", String(payload.rating));
            formData.append("ulasan", payload.ulasan);

            if (payload.gambar) {
              formData.append("gambar_ulasan", payload.gambar);
            }

            await tambahUlasan(formData);
            handleTutupModalTambahUlasan();
            fetchUlasan();
          } catch (error) {
              console.error("Gagal menyimpan ulasan:", error);
          }
        }}
      />

      <ModalEditUlasanPelanggan
        isOpen={isModalEditUlasanOpen}
        onClose={handleTutupModalEditUlasan}
        data={dataUlasan}
        onSubmit={async (payload) => {
          if (!payload.id_ulasan) return;

          try {
            const formData = new FormData();

            formData.append("rating", String(payload.rating));
            formData.append("ulasan", payload.ulasan);

            if (payload.gambar) {
              formData.append("gambar_ulasan", payload.gambar);
            }

            await updateUlasan(payload.id_ulasan, formData);
            handleTutupModalEditUlasan();
            fetchUlasan();
          } catch (error) {
            console.error("Gagal memperbarui ulasan:", error);
          }
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