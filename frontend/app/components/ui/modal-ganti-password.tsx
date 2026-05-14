"use client";

import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import API_BASE_URL from "@/app/lib/api";
import { getToken } from "@/app/lib/auth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalGantiPassword({ isOpen, onClose }: Props) {
  const [sandiLama, setSandiLama] = useState("");
  const [sandiBaru, setSandiBaru] = useState("");
  const [konfirmasiSandi, setKonfirmasiSandi] = useState("");

  const [lihatSandiLama, setLihatSandiLama] = useState(false);
  const [lihatSandiBaru, setLihatSandiBaru] = useState(false);
  const [lihatKonfirmasiSandi, setLihatKonfirmasiSandi] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setSandiLama("");
    setSandiBaru("");
    setKonfirmasiSandi("");
    setLihatSandiLama(false);
    setLihatSandiBaru(false);
    setLihatKonfirmasiSandi(false);
  };

  const handleCloseAndReset = () => {
    resetForm();
    onClose();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sandiBaru !== konfirmasiSandi) {
      alert("Konfirmasi kata sandi tidak cocok");
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `${API_BASE_URL}/change-password`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sandi_lama: sandiLama,
            sandi_baru: sandiBaru,
            sandi_baru_confirmation: konfirmasiSandi,
          }),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal mengubah kata sandi");
        return;
      }

      alert(result.message || "Kata sandi berhasil diubah");

      handleCloseAndReset();
    } catch (error) {
      alert("Gagal terhubung ke server");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-lg bg-[#ffecf2] p-6 shadow-[0_12px_35px_rgba(125,52,75,0.20)] shadow-soft-text">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between border-b border-[#dd98ad] pb-3">
          <h2 className="text-xl font-semibold text-[#7d344b]">Ubah Sandi</h2>

          <button
            type="button"
            onClick={handleCloseAndReset}
            aria-label="Tutup modal"
            className="rounded-full p-2 text-[#7d344b] transition hover:bg-[#f8dfe8] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sandi Lama */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#7d344b]">
              Sandi Lama
            </label>

            <div className="relative">
              <input
                type={lihatSandiLama ? "text" : "password"}
                value={sandiLama}
                onChange={(e) => setSandiLama(e.target.value)}
                autoComplete="current-password"
                className="hide-password-toggle w-full rounded-lg border border-[#dd98ad] bg-white px-4 py-2 pr-11 text-sm text-[#7d344b] outline-none transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] cursor-text shadow-soft-text"
                placeholder="Masukkan sandi lama"
                required
              />

              <button
                type="button"
                onClick={() => setLihatSandiLama((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9f6b7e] transition hover:text-[#7d344b] cursor-pointer"
                aria-label={
                  lihatSandiLama ? "Sembunyikan sandi lama" : "Lihat sandi lama"
                }
              >
                {lihatSandiLama ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Sandi Baru */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#7d344b]">
              Sandi Baru
            </label>

            <div className="relative">
              <input
                type={lihatSandiBaru ? "text" : "password"}
                value={sandiBaru}
                onChange={(e) => setSandiBaru(e.target.value)}
                autoComplete="new-password"
                className="hide-password-toggle w-full rounded-lg border border-[#dd98ad] bg-white px-4 py-2 pr-11 text-sm text-[#7d344b] outline-none transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] cursor-text shadow-soft-text"
                placeholder="Masukkan sandi baru"
                required
              />

              <button
                type="button"
                onClick={() => setLihatSandiBaru((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9f6b7e] transition hover:text-[#7d344b] cursor-pointer"
                aria-label={
                  lihatSandiBaru ? "Sembunyikan sandi baru" : "Lihat sandi baru"
                }
              >
                {lihatSandiBaru ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#7d344b]">
              Konfirmasi Sandi Baru
            </label>

            <div className="relative">
              <input
                type={lihatKonfirmasiSandi ? "text" : "password"}
                value={konfirmasiSandi}
                onChange={(e) => setKonfirmasiSandi(e.target.value)}
                autoComplete="new-password"
                className="hide-password-toggle w-full rounded-lg border border-[#dd98ad] bg-white px-4 py-2 pr-11 text-sm text-[#7d344b] outline-none transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] cursor-text shadow-soft-text"
                placeholder="Ulangi sandi baru"
                required
              />

              <button
                type="button"
                onClick={() => setLihatKonfirmasiSandi((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9f6b7e] transition hover:text-[#7d344b] cursor-pointer"
                aria-label={
                  lihatKonfirmasiSandi
                    ? "Sembunyikan konfirmasi sandi"
                    : "Lihat konfirmasi sandi"
                }
              >
                {lihatKonfirmasiSandi ? (
                  <Eye size={18} />
                ) : (
                  <EyeOff size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Tombol */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#E45082] to-[#7D344B] px-5 py-2 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-[2px] hover:opacity-95 cursor-pointer shadow-soft-text"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}