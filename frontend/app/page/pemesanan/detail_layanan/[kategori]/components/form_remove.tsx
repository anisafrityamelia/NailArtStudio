"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { bookingRemove } from "@/app/lib/pesanan";

type Layanan = {
  id_layanan: number;
  nama_layanan: string;
};

type Props = {
  layanan: Layanan;
};

export default function FormRemove({ layanan }: Props) {
  const router = useRouter();

  const [tanggalPesanan, setTanggalPesanan] = useState("");
  const [jamPesanan, setJamPesanan] = useState("");
  const [bagianKuku, setBagianKuku] = useState<string[]>([]);
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pilihanBagianKuku = ["Jari tangan", "Jari kaki"];

  const pilihanJamBooking = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const handleCheckboxChange = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSubmitRemove = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tanggalPesanan || !jamPesanan || bagianKuku.length === 0) {
      alert("Tanggal, jam, dan bagian kuku wajib diisi");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("id_layanan", String(layanan.id_layanan));
      formData.append("tanggal_pesanan", tanggalPesanan);
      formData.append("jam_pesanan", jamPesanan);
      formData.append("bagian_kuku", bagianKuku.join(", "));
      formData.append("catatan", catatan);

      const result = await bookingRemove(formData);

      router.push(`/page/pemesanan/pembayaran?id=${result.data.id_pesanan}`);
    } catch (error: any) {
      alert(error.message || "Booking remove gagal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitRemove}
      className="space-y-4 px-5 py-5 md:px-7"
    >
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#7D344B]">
            Tanggal
          </label>

          <input
            type="date"
            value={tanggalPesanan}
            onChange={(e) => {
              setTanggalPesanan(e.target.value);
              setJamPesanan("");
            }}
            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text"
          />

          <p className="text-[11px] text-[#7D344B]/70">
            Pilih tanggal booking terlebih dahulu.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#7D344B]">
            Jam
          </label>

          <div className="grid grid-cols-5 gap-2">
            {pilihanJamBooking.map((jam) => (
              <button
                key={jam}
                type="button"
                disabled={!tanggalPesanan}
                onClick={() => setJamPesanan(jam)}
                className={`rounded-md border px-3 py-2 text-xs font-medium transition ${
                  jamPesanan === jam
                    ? "border-[#E45082] bg-[#f8dfe8] text-[#7D344B]"
                    : "border-[#dd98ad] bg-white text-[#7D344B]"
                } disabled:cursor-not-allowed disabled:bg-white/50 disabled:text-[#7D344B]/40`}
              >
                {jam}
              </button>
            ))}
          </div>

          {!tanggalPesanan && (
            <p className="text-[11px] text-[#7D344B]/70">
              Jam tersedia akan muncul setelah memilih tanggal.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#7D344B]">
          Bagian Kuku
        </label>

        <div className="grid grid-cols-2 gap-2">
          {pilihanBagianKuku.map((item) => (
            <label
              key={item}
              className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-xs ${
                bagianKuku.includes(item)
                  ? "border-[#E45082] bg-[#f8dfe8]"
                  : "border-[#dd98ad] bg-white"
              }`}
            >
              <input
                type="checkbox"
                checked={bagianKuku.includes(item)}
                onChange={() =>
                  handleCheckboxChange(item, bagianKuku, setBagianKuku)
                }
                className="accent-[#E45082]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-[#7D344B]">
          Catatan
        </label>

        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          placeholder="Contoh: remove gel polish / nail art lama"
          rows={3}
          className="rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-xs font-medium text-white shadow-soft-text disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}
      </button>
    </form>
  );
}