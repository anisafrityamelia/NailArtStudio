"use client";

import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import type { Baris_Ulasan_Pelanggan } from "./tabel_ulasan";

type PropsModalTambahUlasanPelanggan = {
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

export default function ModalTambahUlasanPelanggan({
  isOpen,
  onClose,
  data,
  onSubmit,
}: PropsModalTambahUlasanPelanggan) {
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);

   useEffect(() => {
    if (isOpen) {
      setRating(0);
      setUlasan("");
      setGambar(null);
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1) return;

    onSubmit({
      kode: data.kode,
      layanan: data.layanan,
      tanggal: data.tanggal,
      rating,
      ulasan,
      gambar,
    });

    onClose();
  };

   return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-6">
      <div className="flex min-h-full items-center justify-center">
        <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-[#ffecf2] shadow-xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
            <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
              Beri Rating & Ulasan
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
                Unggah Gambar
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setGambar(file);
                }}
                className="w-full cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text file:mr-3 file:rounded-md file:border-0 file:bg-[#e6b1c2] file:px-3 file:py-1 file:text-xs file:text-[#7D344B] hover:file:bg-[#d996ad] sm:text-sm"
              />
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
        

