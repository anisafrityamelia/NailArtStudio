"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  getStorageUrl,
  hapusGaleriBeranda,
  uploadGaleriBeranda,
} from "@/app/lib/beranda";

type Item_Galeri = {
  id_galeri?: number;
  gambar: string;
  file?: File | null;
  urutan_tampil: number;
};

type Props = {
  dataBeranda: any;
  onRefresh: () => Promise<void>;
};

export default function Card_Galeri_Beranda({ dataBeranda, onRefresh }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [draftGaleri, setDraftGaleri] = useState<Item_Galeri[]>([]);
  const [loading, setLoading] = useState(false);

  function mappingGaleri(): Item_Galeri[] {
    const galeriDatabase = dataBeranda?.galeri || [];

    return Array.from({ length: 8 }, (_, index) => {
      const urutan = index + 1;
      const item = galeriDatabase.find(
        (galeri: any) => Number(galeri.urutan_tampil) === urutan
      );

      return {
        id_galeri: item?.id_galeri,
        gambar: item?.path_gambar ? getStorageUrl(item.path_gambar) : "",
        file: null,
        urutan_tampil: urutan,
      };
    });
  }

  useEffect(() => {
    setDraftGaleri(mappingGaleri());
  }, [dataBeranda]);

  function handleBukaEdit() {
    setDraftGaleri(mappingGaleri());
    setIsEdit(true);
  }

  function handleBatalEdit() {
    setDraftGaleri(mappingGaleri());
    setIsEdit(false);
  }

  function handleChangeFile(
    e: React.ChangeEvent<HTMLInputElement>,
    urutan_tampil: number
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setDraftGaleri((prev) =>
      prev.map((item) =>
        item.urutan_tampil === urutan_tampil
          ? {
              ...item,
              gambar: imageUrl,
              file,
            }
          : item
      )
    );
  }

  async function handleSimpanEdit() {
    try {
      setLoading(true);

      const gambarYangDiubah = draftGaleri.filter((item) => item.file);

      for (const item of gambarYangDiubah) {
        if (!item.file) continue;
        await uploadGaleriBeranda(item.file, item.urutan_tampil);
      }

      await onRefresh();
      setIsEdit(false);
    } catch (error) {
      console.error("Gagal memperbarui galeri:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleHapusGambar(item: Item_Galeri) {
    if (!item.id_galeri) {
      setDraftGaleri((prev) =>
        prev.map((galeri) =>
          galeri.urutan_tampil === item.urutan_tampil
            ? {
                ...galeri,
                gambar: "",
                file: null,
              }
            : galeri
        )
      );
      return;
    }

    try {
      setLoading(true);

      await hapusGaleriBeranda(item.id_galeri);
      await onRefresh();

      setDraftGaleri(mappingGaleri());
    } catch (error) {
      console.error("Gagal menghapus gambar:", error);
    } finally {
      setLoading(false);
    }
  }

  const dataTampil = isEdit ? draftGaleri : mappingGaleri();

  return (
    <section className="rounded-xl border border-[#d3a0b0] bg-white/40 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
            Galeri Studio
          </h3>
        </div>

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
              type="button"
              onClick={handleSimpanEdit}
              disabled={loading}
              className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {dataTampil.map((item) => (
          <div
            key={item.urutan_tampil}
            className="rounded-lg border border-[#dd98ad] bg-white p-2 shadow-soft-text"
          >
            {item.gambar ? (
              <img
                src={item.gambar}
                alt={`Galeri ${item.urutan_tampil}`}
                className="h-48 w-full rounded-md object-cover"
              />
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-md bg-[#fff7fa] text-xs text-gray-400 sm:text-sm">
                Belum ada gambar
              </div>
            )}

            {isEdit && (
              <div className="mt-2 flex gap-2">
                <label className="block w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-3 py-1 text-center text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:py-2 sm:text-sm">
                  Ganti
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChangeFile(e, item.urutan_tampil)}
                    className="hidden"
                  />
                </label>

                {item.gambar && (
                  <button
                    type="button"
                    onClick={() => handleHapusGambar(item)}
                    disabled={loading}
                    className="flex cursor-pointer items-center justify-center rounded-md bg-red-500 px-2 text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}