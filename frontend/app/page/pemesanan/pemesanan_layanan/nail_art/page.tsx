"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { bookingNailArt } from "@/app/lib/pesanan";

type JadwalAdmin = {
  jamBuka: string;
  jamTutup: string;
  durasiSlot: string;
  jumlahKaryawan: string;
};

const jadwalAdminDummy: JadwalAdmin = {
  jamBuka: "09:00",
  jamTutup: "22:00",
  durasiSlot: "30",
  jumlahKaryawan: "2",
};

function generateSlotJam(
  jamBuka: string,
  jamTutup: string,
  durasiSlotMenit: number
) {
  const hasil: string[] = [];

  const [bukaJam, bukaMenit] = jamBuka.split(":").map(Number);
  const [tutupJam, tutupMenit] = jamTutup.split(":").map(Number);

  let waktuMulai = bukaJam * 60 + bukaMenit;
  const waktuSelesai = tutupJam * 60 + tutupMenit;

  while (waktuMulai < waktuSelesai) {
    const jam = Math.floor(waktuMulai / 60);
    const menit = waktuMulai % 60;

    hasil.push(
      `${String(jam).padStart(2, "0")}:${String(menit).padStart(2, "0")}`
    );

    waktuMulai += durasiSlotMenit;
  }

  return hasil;
}

export default function PemesananNailArt() {
  const router = useRouter();

  const [tanggal, setTanggal] = useState("");
  const [jamDipilih, setJamDipilih] = useState("");
  const [catatan, setCatatan] = useState("");
  const [gambarInspo, setGambarInspo] = useState<File | null>(null);
  const [bagianKuku, setBagianKuku] = useState<string[]>([]);
  const [layananTambahan, setLayananTambahan] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBagianKuku = (value: string) => {
    setBagianKuku((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleLayananTambahan = (value: string) => {
    setLayananTambahan((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const daftarJam = generateSlotJam(
    jadwalAdminDummy.jamBuka,
    jadwalAdminDummy.jamTutup,
    Number(jadwalAdminDummy.durasiSlot)
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();

      // id layanan nail art
      formData.append("id_layanan", "1");

      formData.append("tanggal_pesanan", tanggal);

      formData.append("jam_pesanan", jamDipilih);

      formData.append(
        "bagian_kuku",
        bagianKuku.join(", ")
      );

      formData.append(
        "layanan_tambahan",
        layananTambahan.join(", ")
      );

      formData.append("catatan", catatan);

      if (gambarInspo) {
        formData.append("gambar_inspo", gambarInspo);
      }

      const result = await bookingNailArt(formData);

      const idPesanan = result.data.id_pesanan;

      router.push(
        `/page/pemesanan/pembayaran/nail_art?id=${idPesanan}`
      );

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-y-auto px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background (burgundy).png')" }}
      />

      <div className="fixed inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <section className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-[#ffecf2] shadow-[0_12px_35px_rgba(125,52,75,0.20)] shadow-soft-text">
          <div className="sticky top-0 z-10 flex items-center border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-3 shadow-soft-text">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-[#7D344B] cursor-pointer rounded-full p-1 transition hover:bg-[#f8dfe8]"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="flex-1 text-center text-sm font-semibold text-[#7d344b] sm:text-base">
              Pemesanan Nail Art
            </h1>

            <div className="w-[18px]" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 px-5 py-4 text-xs text-[#7D344B] sm:text-sm"
          >
            <div>
              <label className="font-semibold">Layanan</label>
              <input
                type="text"
                value="Nail Art"
                readOnly
                className="mt-2 w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
              />
            </div>

            <div>
              <label className="font-semibold">Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="mt-2 w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="font-semibold">Jam</label>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {daftarJam.map((jam) => (
                  <button
                    key={jam}
                    type="button"
                    onClick={() => setJamDipilih(jam)}
                    className={`rounded-md border border-[#dd98ad] px-3 py-1.5 text-xs font-medium shadow-soft-text cursor-pointer transition ${
                      jamDipilih === jam
                        ? "bg-[#dd98ad] text-white"
                        : "bg-white text-[#7D344B]"
                    }`}
                  >
                    {jam}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold">Unggah Gambar Referensi</label>
              <div className="mt-2 flex">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setGambarInspo(e.target.files[0]);
                    }
                  }}
                  className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#dd98ad] file:cursor-pointer"
                />
              </div>
            </div>

            <div>
              <p className="font-semibold">Bagian Kuku</p>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bagianKuku.includes("Jari Tangan")}
                  onChange={() => handleBagianKuku("Jari Tangan")}
                  className="h-4 w-4 accent-[#7D344B] cursor-pointer"
                />
                <span>Jari Tangan</span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bagianKuku.includes("Jari Kaki")}
                  onChange={() => handleBagianKuku("Jari Kaki")}
                  className="h-4 w-4 accent-[#7D344B] cursor-pointer"
                />
                <span>Jari Kaki</span>
              </div>
            </div>

            <div>
              <p className="font-semibold">Layanan Tambahan</p>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={layananTambahan.includes("Remove")}
                  onChange={() => handleLayananTambahan("Remove")}
                  className="h-4 w-4 accent-[#7D344B] cursor-pointer"
                />
                <span>Remove</span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={layananTambahan.includes("Extension")}
                  onChange={() => handleLayananTambahan("Extension")}
                  className="h-4 w-4 accent-[#7D344B] cursor-pointer"
                />
                <span>Extension</span>
              </div>
            </div>

            <div>
              <label className="font-semibold">Catatan (Opsional)</label>
              <textarea
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={3}
                placeholder="Masukkan catatan tambahan jika ada"
                className="mt-2 w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
              />
            </div>

            {error && (
              <p className="text-center text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 cursor-pointer w-full rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm mb-2"
            >
              {loading ? "Memproses..." : "Pesan"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}