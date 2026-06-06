"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Jadwal_Khusus from "./components/tabel_jadwal_khusus";
import ModalTambahJadwalKhusus from "./components/modal_tambah_jadwal_khusus";
import ModalEditJadwalKhusus from "./components/modal_edit_jadwal_khusus";
import Modal_Hapus from "@/app/components/ui/modal_hapus";
import { getJadwalKhususAdmin, tambahJadwalKhususAdmin, updateJadwalKhususAdmin, hapusJadwalKhususAdmin, type JadwalKhusus as JadwalKhususApi } from "@/app/lib/jadwal_khusus";
import { getCurrentUser } from "@/app/lib/auth";

type JadwalKhusus = {
  id_jadwal: number;
  no: number;
  tanggal: string;
  status: string;
  jamBuka: string;
  jamTutup: string;
  catatan: string;
};

function formatJam(jam?: string | null) {
  if (!jam) return "-";
  return jam.slice(0, 5);
}

export default function KelolaJadwalKhususPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [data, setData] = useState<JadwalKhusus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);

  const [dataEdit, setDataEdit] = useState<JadwalKhusus | null>(null);
  const [dataHapus, setDataHapus] = useState<JadwalKhusus | null>(null);

  const [errorJamTambah, setErrorJamTambah] = useState("");
  const [errorJamEdit, setErrorJamEdit] = useState("");
  const [errorTanggalTambah, setErrorTanggalTambah] = useState("");
  const [errorTanggalEdit, setErrorTanggalEdit] = useState("");

  useEffect(() => {
    const cekAuthDanAmbilJadwalKhusus = async () => {
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
      ambilJadwalKhusus();
    };

    cekAuthDanAmbilJadwalKhusus();
  }, [router]);

  async function ambilJadwalKhusus() {
    try {
      setIsLoading(true);

      const result = await getJadwalKhususAdmin();

      const mappedData = result.map((item: JadwalKhususApi, index: number) => ({
        id_jadwal: item.id_jadwal,
        no: index + 1,
        tanggal: item.tanggal,
        status: item.status_buka,
        jamBuka: formatJam(item.jam_buka),
        jamTutup: formatJam(item.jam_tutup),
        catatan: item.catatan || "-",
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Gagal mengambil jadwal khusus:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleBukaModalEdit(item: JadwalKhusus) {
    setDataEdit(item);
    setErrorJamEdit("");
    setErrorTanggalEdit("");
    setIsModalEditOpen(true);
  }

  function handleTutupModalEdit() {
    setIsModalEditOpen(false);
    setDataEdit(null);
    setErrorJamEdit("");
    setErrorTanggalEdit("");
  }

  function handleBukaModalHapus(item: JadwalKhusus) {
    setDataHapus(item);
    setIsModalHapusOpen(true);
  }

  function handleTutupModalHapus() {
    setIsModalHapusOpen(false);
    setDataHapus(null);
  }

  async function handleTambahJadwal(payload: {
    tanggal: string;
    status: string;
    jamBuka: string;
    jamTutup: string;
    catatan: string;
  }) {
    const tanggalSudahAda = data.some(
      (item) => item.tanggal === payload.tanggal
    );

    if (tanggalSudahAda) {
      setErrorTanggalTambah("Tanggal ini sudah memiliki jadwal khusus");
      return;
    }

    setErrorTanggalTambah("");

    if (payload.status === "Buka" && payload.jamTutup <= payload.jamBuka) {
      setErrorJamTambah("Jam tutup harus lebih besar dari jam buka");
      return;
    }
    setErrorJamTambah("");

    try {
      await tambahJadwalKhususAdmin({
        tanggal: payload.tanggal,
        status_buka: payload.status as "Buka" | "Tutup",
        jam_buka: payload.status === "Buka" ? payload.jamBuka : null,
        jam_tutup: payload.status === "Buka" ? payload.jamTutup : null,
        catatan: payload.catatan,
      });

      setIsModalTambahOpen(false);
      await ambilJadwalKhusus();
    } catch (error) {
      console.error("Gagal menambah jadwal khusus:", error);
    }
  }

  async function handleEditJadwal(payload: {
    no: number;
    tanggal: string;
    status: string;
    jamBuka: string;
    jamTutup: string;
    catatan: string;
  }) {
    if (!dataEdit) return;

    const tanggalSudahAda = data.some(
      (item) =>
        item.tanggal === payload.tanggal &&
        item.id_jadwal !== dataEdit.id_jadwal
    );

    if (tanggalSudahAda) {
      setErrorTanggalEdit("Tanggal ini sudah memiliki jadwal khusus");
      return;
    }

    setErrorTanggalEdit("");

    if (payload.status === "Buka" && payload.jamTutup <= payload.jamBuka) {
      setErrorJamEdit("Jam tutup harus lebih besar dari jam buka");
      return;
    }
    setErrorJamEdit("");

    try {
      await updateJadwalKhususAdmin(dataEdit.id_jadwal, {
        tanggal: payload.tanggal,
        status_buka: payload.status as "Buka" | "Tutup",
        jam_buka: payload.status === "Buka" ? payload.jamBuka : null,
        jam_tutup: payload.status === "Buka" ? payload.jamTutup : null,
        catatan: payload.catatan,
      });

      handleTutupModalEdit();
      await ambilJadwalKhusus();
    } catch (error) {
      console.error("Gagal memperbarui jadwal khusus:", error);
    }
  }

  async function handleKonfirmasiHapus() {
    if (!dataHapus) return;

    try {
      await hapusJadwalKhususAdmin(dataHapus.id_jadwal);

      handleTutupModalHapus();
      await ambilJadwalKhusus();
    } catch (error) {
      console.error("Gagal menghapus jadwal khusus:", error);
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
        <Judul_Halaman title="Kelola Jadwal Khusus" />

        {/* Tombol tambah */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setErrorJamTambah("");
              setErrorTanggalTambah("");
              setIsModalTambahOpen(true);
            }}
            className="flex items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-2 text-xs text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-3 sm:py-1.5 sm:text-sm shadow-soft-text"
          >
            <Plus size={15} /> Tambah
          </button>
        </div>

        {isLoading ? (
          <section className="rounded-md border border-[#d3a0b0] bg-white/40 p-5 text-sm text-[#7D344B] shadow-sm">
            Memuat jadwal khusus...
          </section>
        ) : (
          <Tabel_Jadwal_Khusus
            data={data}
            onEdit={handleBukaModalEdit}
            onDelete={handleBukaModalHapus}
          />
        )}
      </section>

      <ModalTambahJadwalKhusus
        isOpen={isModalTambahOpen}
        onClose={() => {
          setErrorJamTambah("");
          setErrorTanggalTambah("");
          setIsModalTambahOpen(false);
        }}
        onSubmit={handleTambahJadwal}
        errorJam={errorJamTambah}
        errorTanggal={errorTanggalTambah}
        clearErrorTanggal={() => setErrorTanggalTambah("")}
        clearErrorJam={() => setErrorJamTambah("")}
      />

      <ModalEditJadwalKhusus
        isOpen={isModalEditOpen}
        onClose={handleTutupModalEdit}
        data={dataEdit}
        onSubmit={handleEditJadwal}
        errorJam={errorJamEdit}
        errorTanggal={errorTanggalEdit}
        clearErrorTanggal={() => setErrorTanggalEdit("")}
        clearErrorJam={() => setErrorJamEdit("")}
      />

      <Modal_Hapus
        isOpen={isModalHapusOpen}
        onClose={handleTutupModalHapus}
        onConfirm={handleKonfirmasiHapus}
      />
    </>
  );
}