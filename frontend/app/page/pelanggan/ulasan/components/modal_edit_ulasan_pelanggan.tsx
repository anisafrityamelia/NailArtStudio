"use client";

import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import type { Baris_Ulasan_Pelanggan } from "./tabel_ulasan";

type PropsModalEditUlasanPelanggan = {
  isOpen: boolean;
  onClose: () => void;
  data: Baris_Ulasan_Pelanggan | null;
  onSubmit: (payload: {
    kode: string;
    layanan: string;
    tanggal: string;
    rating: number;
    ulasan: string;
    gambar: File | null;
  }) => void;
};

export default function ModalEditUlasanPelanggan({
  isOpen,
  onClose,
  data,
  onSubmit,
}: PropsModalEditUlasanPelanggan) {
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [gambar, setGambar] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [previewGambar, setPreviewGambar] = useState("");

   useEffect(() => {
    if (isOpen && data) {
      setRating(Number(data.rating) > 0 ? Number(data.rating) : 0);
      setUlasan(data.ulasan && data.ulasan !== "-" ? data.ulasan : "");
      setGambar(data.gambar || "");
      setFileGambar(null);
      setPreviewGambar(data.gambar || "");
    } else {
      setRating(0);
      setUlasan("");
      setGambar("");
      setFileGambar(null);
      setPreviewGambar("");
    }
  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileGambar(file);
    setGambar(file.name);

    const imageUrl = URL.createObjectURL(file);
    setPreviewGambar(imageUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1) return;

    onSubmit({
        kode: data.kode,
        layanan: data.layanan,
        tanggal: data.tanggal,
        rating,
        ulasan,
        gambar: fileGambar,
    });

    onClose();
  };

   return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-6">
        <div className="flex min-h-full items-center justify-center">
            <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-[#ffecf2] shadow-xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
                    <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Edit Rating & Ulasan
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-1 text-[#7D344B] transition hover:bg-[#f8dfe8]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Kode Pesanan
                        </label>
                        <input
                            type="text"
                            value={data.kode}
                            readOnly
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Layanan
                        </label>
                        <input
                            type="text"
                            value={data.layanan}
                            readOnly
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Tanggal
                        </label>
                        <input
                            type="text"
                            value={data.tanggal}
                            readOnly
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Ulasan
                        </label>
                        <textarea
                            value={ulasan}
                            onChange={(e) => setUlasan(e.target.value)}
                            placeholder="Masukkan ulasan Anda"
                            rows={3}
                            required
                            className="w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Rating
                        </label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((bintang) => (
                                <button
                                    key={bintang}
                                    type="button"
                                    onClick={() => setRating(bintang)}
                                    className="cursor-pointer transition hover:scale-105"
                                >
                                    <Star
                                        size={24}
                                        className={
                                            bintang <= rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-[#d3a0b0]"
                                        }
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Gambar
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeFile}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#d996ad] file:cursor-pointer"
                        />

                        {gambar && (
                            <p className="text-[11px] text-[#7D344B]/80">
                                File dipilih: {gambar}
                            </p>
                        )}

                        {previewGambar && (
                            <img
                                src={previewGambar}
                                alt="Preview gambar ulasan"
                                className="mt-2 h-24 w-24 rounded-md border border-[#dd98ad] object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}
        

