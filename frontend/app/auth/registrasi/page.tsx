"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function RegistrasiPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (kataSandi !== konfirmasiKataSandi) {
      setError("Kata sandi dan konfirmasi sandi tidak sama!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nama_pengguna: nama,
          email: email,
          no_hp: noHp,
          password: kataSandi,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const firstError = Object.values(result.errors)[0] as string[];
          setError(firstError[0]);
        } else {
          setError(result.message || "Registrasi gagal.");
        }
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      alert("Registrasi berhasil!");
      router.push("/auth/login");
    } catch (error) {
      setError("Tidak bisa terhubung ke server. Pastikan backend Laravel sudah berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#FFECF2_0%,_#FFECF2_30%,_transparent_58%),radial-gradient(circle_at_top_right,_rgba(221,152,173,0.4)_0%,_rgba(221,152,173,0.4)_30%,_transparent_60%),radial-gradient(circle_at_bottom_left,_rgba(221,152,173,0.88)_0%,_rgba(221,152,173,0.72)_26%,_transparent_58%),radial-gradient(circle_at_bottom_right,_#FFECF2_0%,_#FFECF2_30%,_transparent_58%),linear-gradient(135deg,_#fff6f9_0%,_#f7dce5_45%,_#fbeff4_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <section className="grid w-full max-w-[720px] overflow-hidden rounded-2xl border border-white/40 bg-white/20 shadow-[0_20px_50px_rgba(125,52,75,0.16)] backdrop-blur-[10px] md:grid-cols-[1fr_1fr]">
          {/* Card kiri */}
          <div className="bg-[linear-gradient(135deg,rgba(255,236,242,0.88),rgba(243,199,213,0.86)_42%,rgba(231,178,196,0.82)_100%)] px-4 py-6 sm:px-6 md:px-4 shadow-soft-text">
            <div className="mx-auto w-full max-w-[260px]">
              <h1 className="mb-5 text-center text-[22px] font-semibold text-[#7D344B] sm:text-[26px]">
                Membuat Akun
              </h1>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#7D344B]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email Anda"
                    className="h-9 w-full rounded-md border border-[#dd98ad] bg-[#f7dbe4]/80 px-3 text-sm text-[#7D344B] outline-none transition placeholder:text-[#a97084] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e8b2c4] shadow-soft-text"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#7D344B]">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan Nama Anda"
                    className="h-9 w-full rounded-md border border-[#dd98ad] bg-[#f7dbe4]/80 px-3 text-sm text-[#7D344B] outline-none transition placeholder:text-[#a97084] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e8b2c4] shadow-soft-text"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#7D344B]">
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
                    className="h-9 w-full rounded-md border border-[#dd98ad] bg-[#f7dbe4]/80 px-3 text-sm text-[#7D344B] outline-none transition placeholder:text-[#a97084] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e8b2c4] shadow-soft-text"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#7D344B]">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={kataSandi}
                      onChange={(e) => setKataSandi(e.target.value)}
                      placeholder="Minimal 6 Karakter"
                      minLength={6}
                      className="h-9 w-full rounded-md border border-[#dd98ad] bg-[#f7dbe4]/80 px-3 text-sm text-[#7D344B] outline-none transition placeholder:text-[#a97084] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e8b2c4] shadow-soft-text"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a6377] transition hover:text-[#7D344B] cursor-pointer"
                    >
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#7D344B]">
                    Konfirmasi Kata Sandi
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={konfirmasiKataSandi}
                      onChange={(e) => setKonfirmasiKataSandi(e.target.value)}
                      placeholder="Konfirmasi Kata Sandi Anda"
                      className="h-9 w-full rounded-md border border-[#dd98ad] bg-[#f7dbe4]/80 px-3 text-sm text-[#7D344B] outline-none transition placeholder:text-[#a97084] focus:border-[#c75b82] focus:ring-2 focus:ring-[#e8b2c4] shadow-soft-text"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Sembunyikan konfirmasi kata sandi"
                          : "Tampilkan konfirmasi kata sandi"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a6377] transition hover:text-[#7D344B] cursor-pointer"
                    >
                      {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="rounded-md bg-red-100 px-3 py-2 text-xs font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex h-9 w-full items-center justify-center rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_12px_24px_rgba(125,52,75,0.28)] focus:outline-none focus:shadow-[0_0_0_4px_rgba(255,255,255,0.2)] active:translate-y-0 text-shadow-soft cursor-pointer"
                >
                  {loading ? "Memproses..." : "Buat Akun"}
                </button>
              </form>

              <p className="mt-5 mb-2 text-center text-sm font-semibold text-[#7D344B] sm:text-[15px]">
                Sudah punya akun?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-[2px] text-shadow-soft inline-block"
                >
                  Ayo Masuk!
                </Link>
              </p>
            </div>
          </div>

          {/* Card kanan */}
          <div className="hidden md:flex items-center justify-center bg-white px-6 py-10 md:min-h-full md:px-10">
            <div className="relative flex w-full max-w-[170px] items-center justify-center md:max-w-[190px] lg:max-w-[240px]">
              <Image
                src="/logo1.png"
                alt="Logo Registrasi"
                width={220}
                height={220}
                className="h-auto w-full object-contain drop-shadow-[0_10px_20px_rgba(125,52,75,0.18)]"
                priority
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}