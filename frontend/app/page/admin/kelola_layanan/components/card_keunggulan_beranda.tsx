"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { updateBerandaAdmin } from "@/app/lib/beranda";

type Props = {
  dataBeranda: any;
  onRefresh: () => Promise<void>;
};

export default function Card_Keunggulan_Beranda({
  dataBeranda,
  onRefresh,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDeskripsi(dataBeranda?.deskripsi || "");
  }, [dataBeranda]);

  function handleBukaEdit() {
    setIsEdit(true);
  }

  function handleBatalEdit() {
    setDeskripsi(dataBeranda?.deskripsi || "");
    setIsEdit(false);
  }

  async function handleSimpanEdit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateBerandaAdmin({
        deskripsi: deskripsi.trim(),
      });

      await onRefresh();

      setIsEdit(false);
    } catch (error) {
      console.error("Gagal memperbarui keunggulan:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-[#d3a0b0] bg-white/40 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
          Keunggulan Kami
        </h3>

        {!isEdit ? (
          <button
            type="button"
            onClick={handleBukaEdit}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            <Pencil size={16} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBatalEdit}
              disabled={loading}
              className="cursor-pointer rounded-md bg-gradient-to-r from-[#d9d9d9] to-[#dd98ad] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              Batal
            </button>

            <button
              type="submit"
              form="form-keunggulan-beranda"
              disabled={loading}
              className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        )}
      </div>

      <form id="form-keunggulan-beranda" onSubmit={handleSimpanEdit}>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
            Deskripsi Keunggulan
          </label>

          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            readOnly={!isEdit}
            placeholder={isEdit ? "Masukkan deskripsi keunggulan" : ""}
            rows={5}
            className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] shadow-soft-text outline-none transition sm:text-sm ${
              isEdit
                ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                : "bg-white/70 text-gray-400"
            }`}
          />
        </div>
      </form>
    </section>
  );
}