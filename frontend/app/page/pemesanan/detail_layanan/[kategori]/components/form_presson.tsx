"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import { bookingPressOn } from "@/app/lib/pesanan";

type Layanan = {
  id_layanan: number;
  nama_layanan: string;
};

type Props = {
  layanan: Layanan;
};

export default function FormPressOn({ layanan }: Props) {
  const router = useRouter();

  const [gambarInspo, setGambarInspo] = useState<File | null>(null);
  const [fotoJariKanan, setFotoJariKanan] = useState<File | null>(null);
  const [fotoJempolKanan, setFotoJempolKanan] = useState<File | null>(null);
  const [fotoJariKiri, setFotoJariKiri] = useState<File | null>(null);
  const [fotoJempolKiri, setFotoJempolKiri] = useState<File | null>(null);

  const [shapeKuku, setShapeKuku] = useState("Almond");
  const [metodePengambilan, setMetodePengambilan] = useState("antar");
  const [alamatPengiriman, setAlamatPengiriman] = useState("");
  const [catatan, setCatatan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewGambar, setPreviewGambar] = useState<string | null>(null);

  const pilihanShapeKuku = [
    "Almond",
    "Square",
    "Oval",
    "Coffin",
    "Stiletto",
    "Round",
  ];

  const handleSubmitPressOn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fotoJariKanan ||
      !fotoJempolKanan ||
      !fotoJariKiri ||
      !fotoJempolKiri
    ) {
      alert("Semua foto jari wajib diunggah");
      return;
    }

    if (metodePengambilan === "antar" && !alamatPengiriman) {
      alert("Alamat pengiriman wajib diisi");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("id_layanan", String(layanan.id_layanan));

      if (gambarInspo) {
        formData.append("gambar_inspo", gambarInspo);
      }

      formData.append("foto_jari_kanan", fotoJariKanan);
      formData.append("foto_jempol_kanan", fotoJempolKanan);
      formData.append("foto_jari_kiri", fotoJariKiri);
      formData.append("foto_jempol_kiri", fotoJempolKiri);

      formData.append("shape_kuku", shapeKuku);
      formData.append("metode_pengambilan", metodePengambilan);
      formData.append("alamat_pengiriman", alamatPengiriman);
      formData.append("catatan", catatan);

      const result = await bookingPressOn(formData);

      router.push(`/page/pemesanan/pembayaran?id=${result.data.id_pesanan}`);
    } catch (error: any) {
      alert(error.message || "Booking press on gagal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitPressOn} className="space-y-4 px-5 py-5 md:px-7">
        <InputFile
          label="Unggah Gambar Referensi"
          optional
          onChange={setGambarInspo}
        />

        <PanduanPreview
          label="Panduan Foto Jari"
          src="/contoh-foto.jpeg"
          alt="Panduan Foto Jari"
          onClick={() => setPreviewGambar("/contoh-foto.jpeg")}
        />

        <InputFile
          label="Unggah Foto Jari Kanan"
          onChange={setFotoJariKanan}
        />

        <InputFile
          label="Unggah Foto Jempol Kanan"
          onChange={setFotoJempolKanan}
        />

        <InputFile
          label="Unggah Foto Jari Kiri"
          onChange={setFotoJariKiri}
        />

        <InputFile
          label="Unggah Foto Jempol Kiri"
          onChange={setFotoJempolKiri}
        />

        <PanduanPreview
          label="Panduan Shape Kuku"
          src="/shape-kuku.jpeg"
          alt="Panduan Shape Kuku"
          onClick={() => setPreviewGambar("/shape-kuku.jpeg")}
        />

        <div>
          <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
            Shape Kuku
          </label>

          <select
            value={shapeKuku}
            onChange={(e) => setShapeKuku(e.target.value)}
            className="mt-2 w-full cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
          >
            {pilihanShapeKuku.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#7D344B] sm:text-sm">
            Metode Pengambilan
          </p>

          <label className="mt-2 flex items-center gap-2 text-xs text-[#7D344B] sm:text-sm">
            <input
              type="radio"
              name="metodePengambilan"
              value="ambil"
              checked={metodePengambilan === "ambil"}
              onChange={(e) => setMetodePengambilan(e.target.value)}
              className="h-4 w-4 cursor-pointer accent-[#7D344B]"
            />
            Ambil ke studio
          </label>

          <label className="mt-2 flex items-center gap-2 text-xs text-[#7D344B] sm:text-sm">
            <input
              type="radio"
              name="metodePengambilan"
              value="antar"
              checked={metodePengambilan === "antar"}
              onChange={(e) => setMetodePengambilan(e.target.value)}
              className="h-4 w-4 cursor-pointer accent-[#7D344B]"
            />
            Diantar ke rumah (ongkir menyesuaikan jarak)
          </label>
        </div>

        {metodePengambilan === "antar" && (
          <div>
            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
              Alamat Pengiriman
            </label>

            <textarea
              value={alamatPengiriman}
              onChange={(e) => setAlamatPengiriman(e.target.value)}
              rows={3}
              className="mt-2 w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
            />
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
            Catatan (Opsional)
          </label>

          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows={3}
            placeholder="Masukkan catatan tambahan jika ada"
            className="mt-2 w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 mb-2 w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 disabled:opacity-60 sm:text-sm"
        >
          {isSubmitting ? "Memproses..." : "Pesan"}
        </button>
      </form>

      {previewGambar && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="relative w-full max-w-4xl rounded-lg bg-white p-3 shadow-2xl">
            <button
              type="button"
              onClick={() => setPreviewGambar(null)}
              className="absolute right-3 top-3 z-10 cursor-pointer rounded-full bg-white/90 p-1 text-[#7D344B] hover:bg-[#f8dfe8]"
            >
              <X size={20} />
            </button>

            <div className="flex max-h-[80vh] items-center justify-center p-4">
              <img
                src={previewGambar}
                alt="Preview panduan"
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PanduanPreview({
  label,
  src,
  alt,
  onClick,
}: {
  label: string;
  src: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#7D344B] sm:text-sm">
        {label}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-2 inline-block cursor-pointer overflow-hidden rounded-md"
      >
        <img
          src={src}
          alt={alt}
          className="h-24 w-auto max-w-full rounded-md object-contain shadow-soft-text"
        />
      </button>

      <p className="mt-1 text-[11px] text-red-500">
        *Klik gambar untuk melihat dengan lebih jelas
      </p>
    </div>
  );
}

function InputFile({
  label,
  optional = false,
  onChange,
}: {
  label: string;
  optional?: boolean;
  onChange: (file: File | null) => void;
}) {
  const [fileName, setFileName] = useState("");

  return (
    <div>
      <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
        {label} {optional && <span className="font-normal"></span>}
      </label>

      <div className="mt-2 flex">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            onChange(file);
            setFileName(file?.name || "");
          }}
          className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#e6b1c2] file:px-3 file:py-1 file:text-white hover:file:bg-[#dd98ad] sm:text-sm"
        />
      </div>

      {fileName && (
        <p className="mt-1 text-[11px] text-[#7D344B]/70">
          File: {fileName}
        </p>
      )}
    </div>
  );
}