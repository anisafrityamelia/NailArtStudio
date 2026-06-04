"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingRemove, getSlotBooking, SlotBooking } from "@/app/lib/pesanan";

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
  const [slotBooking, setSlotBooking] = useState<SlotBooking[]>([]);
  const [isLoadingSlot, setIsLoadingSlot] = useState(false);
  const [statusJadwal, setStatusJadwal] = useState<"Default" | "Buka" | "Tutup">("Default");
  const [catatanJadwal, setCatatanJadwal] = useState<string | null>(null);
  const [errorJam, setErrorJam] = useState("");
  const [errorBagianKuku, setErrorBagianKuku] = useState("");

  const pilihanBagianKuku = ["Jari tangan", "Jari kaki"];

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

  useEffect(() => {
    async function ambilSlotBooking() {
      if (!tanggalPesanan || !layanan?.id_layanan) {
        setSlotBooking([]);
        setStatusJadwal("Default");
        setCatatanJadwal(null);
        return;
      }

      try {
        setIsLoadingSlot(true);

        const data = await getSlotBooking(
          tanggalPesanan,
          layanan.id_layanan
        );

        setSlotBooking(data.slots);
        setStatusJadwal(data.status_jadwal);
        setCatatanJadwal(data.catatan_jadwal);
      } catch (error) {
        console.error("Gagal mengambil slot booking:", error);
        setSlotBooking([]);
        setStatusJadwal("Default");
        setCatatanJadwal(null);
      } finally {
        setIsLoadingSlot(false);
      }
    }

    ambilSlotBooking();
  }, [tanggalPesanan, layanan?.id_layanan]);

  const handleSubmitRemove = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorJam("");
    setErrorBagianKuku("");

    if (!jamPesanan) {
      setErrorJam("Silakan pilih jam terlebih dahulu");
      return;
    }

    if (bagianKuku.length === 0) {
      setErrorBagianKuku("Silakan pilih bagian kuku");
      return;
    }

    if (statusJadwal === "Tutup") {
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
    } catch (error) {
      console.error("Booking remove gagal:", error);
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
            min={new Date().toISOString().split("T")[0]}
            required
            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
          />

          <p className="text-[11px] text-[#7D344B]/70">
            Pilih tanggal booking terlebih dahulu.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#7D344B]">
            Jam
          </label>

          {isLoadingSlot ? (
            <p className="text-[11px] text-[#7D344B]/70">
              Memuat jam tersedia...
            </p>
          ) : statusJadwal === "Tutup" ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-[11px] font-medium text-red-500">
                Studio tutup pada tanggal ini.
              </p>

              {catatanJadwal && (
                <p className="mt-1 text-[11px] text-red-500">
                  Catatan: {catatanJadwal}
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              {slotBooking.map((slot) => (
                <button
                  key={slot.jam}
                  type="button"
                  disabled={!tanggalPesanan || !slot.tersedia}
                  onClick={() => {
                    setJamPesanan(slot.jam);
                    setErrorJam("");
                  }}
                  className={`rounded-md border px-3 py-2 text-xs font-medium transition ${
                    jamPesanan === slot.jam
                      ? "border-[#E45082] bg-[#f8dfe8] text-[#7D344B]"
                      : slot.tersedia
                      ? "border-[#dd98ad] bg-white text-[#7D344B]"
                      : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                  }`}
                >
                  {slot.jam}
                </button>
              ))}
            </div>
          )}

          {!tanggalPesanan && (
            <p className="text-[11px] text-[#7D344B]/70">
              Jam tersedia akan muncul setelah memilih tanggal.
            </p>
          )}
          {tanggalPesanan && !isLoadingSlot && statusJadwal !== "Tutup" && slotBooking.length === 0 && (
            <p className="text-[11px] text-red-500">
              Belum ada slot tersedia untuk tanggal ini.
            </p>
          )}
        </div>
        {errorJam && (
          <p className="text-[11px] text-red-500">
            {errorJam}
          </p>
        )}
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
                onChange={() => {
                  handleCheckboxChange(item, bagianKuku, setBagianKuku);
                  setErrorBagianKuku("");
                }}
                className="accent-[#E45082]"
              />
              {item}
            </label>
          ))}
        </div>
        {errorBagianKuku && (
          <p className="text-[11px] text-red-500">
            {errorBagianKuku}
          </p>
        )}
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
          className="rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || statusJadwal === "Tutup"}
        className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-xs font-medium text-white shadow-soft-text disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
      >
        {isSubmitting ? "Memproses..." : "Lanjut ke Pembayaran"}
      </button>
    </form>
  );
}