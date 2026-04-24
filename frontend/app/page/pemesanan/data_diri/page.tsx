"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

export default function HalamanPemesanan() {
  const [lihatSandi, setLihatSandi] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [layanan, setLayanan] = useState("nail_art");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/page/pemesanan/pemesanan_layanan/${layanan}`);
  };

  return (
    <main className="relative min-h-screen overflow-y-auto px-4 sm:px-6">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background (burgundy).png')" }}
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" />

      {/* Wrapper */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <section className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-[#ffecf2] shadow-[0_12px_35px_rgba(125,52,75,0.20)] shadow-soft-text">
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-3 text-center shadow-soft-text">
            <p className="text-sm font-semibold text-[#7d344b] sm:text-base">
              Hai! Selamat Datang di
            </p>

            <div className="mt-2 flex justify-center">
              <img
                src="/logo full alia oye (burgundy).png"
                alt="Alia Oye Studio"
                className="h-auto w-[190px] object-contain sm:w-[250px]"
              />
            </div>
          </div>
          <p className="mt-3 text-center text-sm font-semibold text-[#7d344b] sm:text-base"> Yuk, isi data diri terlebih dahulu </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Nama
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan Nama Anda"
                className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none transition shadow-soft-text placeholder:text-[#b57f91] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email Anda"
                className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none transition shadow-soft-text placeholder:text-[#b57f91] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                No HP
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={noHp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNoHp(value);
                }}
                placeholder="Masukkan No HP (Aktif)"
                className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none transition shadow-soft-text placeholder:text-[#b57f91] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Kata Sandi
              </label>

              <div className="relative">
                <input
                  type={lihatSandi ? "text" : "password"}
                  value={kataSandi}
                  onChange={(e) => setKataSandi(e.target.value)}
                  placeholder="Minimal 6 Karakter"
                  className="hide-password-toggle w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 pr-10 text-xs text-[#7D344B] outline-none transition shadow-soft-text placeholder:text-[#b57f91] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:pr-11 sm:text-sm"
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  onClick={() => setLihatSandi((prev) => !prev)}
                  aria-label={
                    lihatSandi ? "Sembunyikan kata sandi" : "Lihat kata sandi"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#9f6b7e] transition hover:text-[#7d344b]"
                >
                  {lihatSandi ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Pilih Layanan Yang Diinginkan
              </label>

              <div className="relative">
                <select
                  value={layanan}
                  onChange={(e) => setLayanan(e.target.value)}
                  className="w-full appearance-none cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 pr-10 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                  required
                >
                  <option value="nail_art">Nail Art</option>
                  <option value="presson">Press On</option>
                  <option value="eyelash">Eyelash</option>
                  <option value="remove">Remove</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#7D344B]"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm mb-1"
              >
                Lanjut Pemesanan
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}