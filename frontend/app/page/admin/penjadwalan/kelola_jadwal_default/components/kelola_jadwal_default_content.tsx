"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

type Data_Jadwal_Default = {
  jamBuka: string;
  jamTutup: string;
  durasiSlot: string;
  jumlahKaryawan: string;
};

export default function Kelola_Jadwal_Default_Content() {
  const [isEdit, setIsEdit] = useState(false);

  // data yang ditampilkan di form
  const [dataJadwal, setDataJadwal] = useState<Data_Jadwal_Default | null>(null);

  // draft form saat edit
  const [jamBuka, setJamBuka] = useState("");
  const [jamTutup, setJamTutup] = useState("");
  const [durasiSlot, setDurasiSlot] = useState("");
  const [jumlahKaryawan, setJumlahKaryawan] = useState("");

  useEffect(() => {
    if (isEdit && dataJadwal) {
      setJamBuka(dataJadwal.jamBuka);
      setJamTutup(dataJadwal.jamTutup);
      setDurasiSlot(dataJadwal.durasiSlot);
      setJumlahKaryawan(dataJadwal.jumlahKaryawan);
    }
  }, [isEdit, dataJadwal]);

  function handleBukaEdit() {
    setIsEdit(true);
  }

  function handleBatalEdit() {
    setJamBuka(dataJadwal?.jamBuka || "");
    setJamTutup(dataJadwal?.jamTutup || "");
    setDurasiSlot(dataJadwal?.durasiSlot || "");
    setJumlahKaryawan(dataJadwal?.jumlahKaryawan || "");
    setIsEdit(false);
  }

  function handleSimpanEdit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Data_Jadwal_Default = {
      jamBuka,
      jamTutup,
      durasiSlot: durasiSlot.trim(),
      jumlahKaryawan: jumlahKaryawan.trim(),
    };

    console.log("Payload jadwal default:", payload);

    // dummy disimpan ke state dulu
    setDataJadwal(payload);
    setIsEdit(false);
  }

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_1fr]">
      {/* card from */}
      <section className="rounded-lg border border-[#d3a0b0] bg-white/40 p-4 shadow-sm sm:p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
              Form Jadwal Default
            </h3>
            <p className="text-xs text-[#b17e8e] sm:text-sm">
              Isi pengaturan waktu operasional standar studio.
            </p>
          </div>

          {!isEdit ? (
            <button
              type="button"
              onClick={handleBukaEdit}
              className="flex w-fit items-center gap-2 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm cursor-pointer"
            >
              <Pencil size={16} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBatalEdit}
                className="rounded-md bg-gradient-to-r from-[#d9d9d9] to-[#dd98ad] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                form="form-jadwal-default"
                className="rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm cursor-pointer"
              >
                Simpan
              </button>
            </div>
          )}
        </div>

        <form id="form-jadwal-default" onSubmit={handleSimpanEdit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Jam Buka
              </label>
              <input
                type="time"
                min="09:00"
                max="22:00"
                value={isEdit ? jamBuka : dataJadwal?.jamBuka || ""}
                onChange={(e) => setJamBuka(e.target.value)}
                readOnly={!isEdit}
                className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                  isEdit
                    ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                    : "bg-white/70 text-gray-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Jam Tutup
              </label>
              <input
                type="time"
                min="09:00"
                max="22:00"
                value={isEdit ? jamTutup : dataJadwal?.jamTutup || ""}
                onChange={(e) => setJamTutup(e.target.value)}
                readOnly={!isEdit}
                className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                  isEdit
                    ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                    : "bg-white/70 text-gray-400"
                }`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Durasi Antar Slot
              </label>
              <div className="flex overflow-hidden rounded-md border border-[#dd98ad] shadow-soft-text">
                <input
                  type="number"
                  min="1"
                  value={isEdit ? durasiSlot : dataJadwal?.durasiSlot || ""}
                  onChange={(e) => setDurasiSlot(e.target.value)}
                  readOnly={!isEdit}
                  placeholder={isEdit ? "Contoh: 30" : ""}
                  className={`w-full px-3 py-2 text-xs text-[#7D344B] outline-none sm:text-sm ${
                    isEdit ? "bg-white" : "bg-white/70 text-gray-400"
                  }`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Jumlah Karyawan
              </label>
              <input
                type="number"
                min="1"
                value={isEdit ? jumlahKaryawan : dataJadwal?.jumlahKaryawan || ""}
                onChange={(e) => setJumlahKaryawan(e.target.value)}
                readOnly={!isEdit}
                placeholder={isEdit ? "Contoh: 2" : ""}
                className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                  isEdit
                    ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                    : "bg-white/70 text-gray-400"
                }`}
              />
            </div>

            <div className="sm:col-span-2">
              <div className="rounded-md border border-[#dd98ad] bg-white/70 px-4 py-3 shadow-soft-text">
                <p className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                  Catatan
                </p>
                <p className="mt-1 text-xs text-[#b17e8e] sm:text-sm">
                  Jadwal default akan digunakan untuk hari normal. Jika ada hari
                  libur atau jam berbeda, admin bisa mengaturnya di menu jadwal
                  khusus.
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* sebelah kanan */}
      <div className="space-y-4">
        {/* card preview jadwal */}
        <section className="rounded-lg border border-[#d3a0b0] bg-white/40 p-4 shadow-sm sm:p-5">
          <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
            Preview Jadwal
          </h3>
          <p className="text-xs text-[#b17e8e] sm:text-sm">
            Ringkasan pengaturan yang sedang aktif.
          </p>

          <div className="mt-4 rounded-xl bg-[#dd98ad] p-4 shadow-soft-text">
            <p className="text-xs text-[#7D344B] sm:text-sm">Jam Operasional</p>
            <p className="mt-1 text-xl font-semibold text-[#7D344B] sm:text-2xl">
              {dataJadwal
                ? `${dataJadwal.jamBuka || "-"} - ${dataJadwal.jamTutup || "-"}`
                : "-"}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#dd98ad] bg-white/70 p-4 shadow-soft-text">
              <p className="text-xs text-[#7D344B] sm:text-sm">Slot</p>
              <p className="mt-1 text-xl font-semibold text-[#7D344B] sm:text-2xl">
                {dataJadwal?.durasiSlot || "-"}{" "}
                <span className="text-sm font-medium">Menit</span>
              </p>
            </div>

            <div className="rounded-xl border border-[#dd98ad] bg-white/70 p-4 shadow-soft-text">
              <p className="text-xs text-[#7D344B] sm:text-sm">Karyawan</p>
              <p className="mt-1 text-xl font-semibold text-[#7D344B] sm:text-2xl">
                {dataJadwal?.jumlahKaryawan || "-"}{" "}
                <span className="text-sm font-medium">Orang</span>
              </p>
            </div>
          </div>
        </section>

        {/* card estimasi kapasitas */}
        <section className="rounded-lg border border-[#d3a0b0] bg-white/40 p-4 shadow-sm sm:p-5">
          <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
            Estimasi Kapasitas
          </h3>
          <p className="text-xs text-[#b17e8e] sm:text-sm">
            Perkiraan jumlah slot booking per hari.
          </p>

          <div className="mt-4 rounded-xl bg-[#dd98ad] p-4 shadow-soft-text">
            <p className="text-xs text-[#7D344B] sm:text-sm">
              Total Slot Tersedia
            </p>
            <p className="mt-1 text-xl font-semibold text-[#7D344B] sm:text-2xl">
              66
            </p>
            <p className="mt-2 text-xs text-[#7D344B] sm:text-sm">
              Berdasarkan jam operasional dan jumlah karyawan aktif.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}