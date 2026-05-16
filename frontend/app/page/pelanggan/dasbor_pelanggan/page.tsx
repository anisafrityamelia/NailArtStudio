"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Save } from "lucide-react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import { getCurrentUser, updateProfile, updateFotoProfil, } from "@/app/lib/auth";

export default function DashboardPelangganPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
      setNama(user.nama_pengguna || "");
      setNoHp(user.no_hp || "");
      setEmail(user.email || "");
      setFotoProfil(user.url_profil_foto || "");
      
      setIsCheckingAuth(false);
    };

    cekAuthPelanggan();
  }, [router]);

  const handleButtonClick = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const updatedUser = await updateProfile({
        nama_pengguna: nama,
        email,
        no_hp: noHp,
      });

      setNama(updatedUser.nama_pengguna || "");
      setEmail(updatedUser.email || "");
      setNoHp(updatedUser.no_hp || "");

      alert("Profil berhasil diperbarui");

      setIsEditing(false);
    } catch (error: any) {
      alert(error.message || "Gagal memperbarui profil");
    }
  };

  const handleFotoChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const result = await updateFotoProfil(file);

      setFotoProfil(result.url_foto);

      alert("Foto profil berhasil diperbarui");
    } catch (error: any) {
      alert(error.message || "Gagal upload foto profil");
    }
  };

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
    <section className="w-full">
      {/* Judul halaman */}
      <Judul_Halaman title="Dasbor Pelanggan" />

      <div className="relative mx-auto w-full max-w-[420px] overflow-visible sm:max-w-[570px]">
        {/* Banner atas */}
        <img
          src="/background-dasbor.jfif"
          alt="Background Profil"
          className="h-[110px] w-full rounded-[12px] object-cover sm:h-[145px] sm:rounded-[14px]"
        />

        {/* Foto profil */}
        <div className="absolute left-1/2 top-full z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[86px] w-[86px] overflow-hidden rounded-full border-[4px] border-[#ffecf2] bg-white shadow-[0_6px_18px_rgba(125,52,75,0.16)] sm:h-[100px] sm:w-[100px] sm:border-[6px]">
            <Image
              src={fotoProfil || "/profile-default.jfif"}
              alt="Foto Profil Pelanggan"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <label className="absolute bottom-[2px] right-[0px] z-20 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#E45082] to-[#7D344B] shadow-[0_6px_16px_rgba(125,52,75,0.28)] sm:h-9 sm:w-9">
            <Pencil size={14} className="text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto mt-16 w-full max-w-[420px] sm:mt-20 sm:max-w-[570px]">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#7D344B] sm:text-base">
              Nama
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              disabled={!isEditing}
              placeholder="Masukkan Nama Anda"
              className="w-full rounded-md border border-[#dd98ad] bg-transparent px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text placeholder:text-[#b57f91] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm disabled:opacity-60 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#7D344B] sm:text-base">
              Nomor HP
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value.replace(/\D/g, ""))}
              placeholder="Masukkan Nomor HP Anda"
              disabled={!isEditing}
              className="w-full rounded-md border border-[#dd98ad] bg-transparent px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text placeholder:text-[#b57f91] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm disabled:opacity-60 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#7D344B] sm:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email Anda"
              disabled={!isEditing}
              className="w-full rounded-md border border-[#dd98ad] bg-transparent px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text placeholder:text-[#b57f91] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm disabled:opacity-60 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-4 sm:py-2 sm:text-sm"
          >
            {isEditing ? <Save size={16} /> : <Pencil size={16} />}
            {isEditing ? "Simpan" : "Edit"}
          </button>
        </div>
      </div>
    </section>
  );
}