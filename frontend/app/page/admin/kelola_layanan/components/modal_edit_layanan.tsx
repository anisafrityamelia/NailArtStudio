"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type GambarLayanan = {
    id_gambar: number;
    id_layanan: number;
    path_gambar: string;
    url_gambar: string;
};

type DataLayanan = {
    id_layanan: number;
    layanan: string;
    kategori_layanan: string;
    deskripsi: string;
    estimasiHarga: number;
    durasi: number;
    gambar: GambarLayanan[];
    statusLayanan: string;
};

export type PayloadEditLayanan = {
  id_layanan: number;
  layanan: string;
  kategori_layanan: string;
  deskripsi: string;
  estimasiHarga: number;
  durasi: number;
  statusLayanan: string;
  fileGambar1: File | null;
  fileGambar2: File | null;
  fileGambar3: File | null;
  fileGambar4: File | null;
};

type PropsModalEditLayanan = {
    isOpen: boolean;
    onClose: () => void;
    data: DataLayanan | null;
    onSubmit: (payload: PayloadEditLayanan) => void;
};

export default function PropsModalEditLayanan({
    isOpen,
    onClose,
    data,
    onSubmit,
}: PropsModalEditLayanan) {
    const [layanan, setLayanan] = useState("");
    const [kategoriLayanan, setKategoriLayanan] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [estimasiHarga, setEstimasiHarga] = useState("");
    const [durasi, setDurasi] = useState("");
    const [gambar1, setGambar1] = useState("");
    const [gambar2, setGambar2] = useState("");
    const [gambar3, setGambar3] = useState("");
    const [gambar4, setGambar4] = useState("");

    const [fileGambar1, setFileGambar1] = useState<File | null>(null);
    const [fileGambar2, setFileGambar2] = useState<File | null>(null);
    const [fileGambar3, setFileGambar3] = useState<File | null>(null);
    const [fileGambar4, setFileGambar4] = useState<File | null>(null);
    const [statusLayanan, setStatusLayanan] = useState("Aktif");

    const [previewGambar1, setPreviewGambar1] = useState("");
    const [previewGambar2, setPreviewGambar2] = useState("");
    const [previewGambar3, setPreviewGambar3] = useState("");
    const [previewGambar4, setPreviewGambar4] = useState("");

    useEffect(() => {
        if (isOpen && data) {
        setLayanan(data.layanan);
        setKategoriLayanan(data.kategori_layanan);
        setDeskripsi(data.deskripsi);
        setEstimasiHarga(String(data.estimasiHarga));
        setDurasi(String(data.durasi));
        setStatusLayanan(data.statusLayanan);

        setFileGambar1(null);
        setFileGambar2(null);
        setFileGambar3(null);
        setFileGambar4(null);

        setGambar1(data.gambar[0]?.path_gambar || "");
        setGambar2(data.gambar[1]?.path_gambar || "");
        setGambar3(data.gambar[2]?.path_gambar || "");
        setGambar4(data.gambar[3]?.path_gambar || "");

        setPreviewGambar1(data.gambar[0]?.url_gambar || "");
        setPreviewGambar2(data.gambar[1]?.url_gambar || "");
        setPreviewGambar3(data.gambar[2]?.url_gambar || "");
        setPreviewGambar4(data.gambar[3]?.url_gambar || "");
        }
    }, [isOpen, data]);
    
    if (!isOpen || !data) return null;

    const handleChangeFile1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar1(file);
        setGambar1(file.name);
        setPreviewGambar1(URL.createObjectURL(file));
    };

    const handleChangeFile2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar2(file);
        setGambar2(file.name);
        setPreviewGambar2(URL.createObjectURL(file));
    };

    const handleChangeFile3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar3(file);
        setGambar3(file.name);
        setPreviewGambar3(URL.createObjectURL(file));
    };

    const handleChangeFile4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar4(file);
        setGambar4(file.name);
        setPreviewGambar4(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            id_layanan: data.id_layanan,
            layanan,
            kategori_layanan: kategoriLayanan,
            deskripsi,
            estimasiHarga: Number(estimasiHarga),
            durasi: Number(durasi),
            statusLayanan,
            fileGambar1,
            fileGambar2,
            fileGambar3,
            fileGambar4,
        });
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-[#ffecf2] shadow-xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
                    <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Edit Layanan
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
                            Nama Layanan
                        </label>
                        <input
                            type="text"
                            value={layanan}
                            onChange={(e) => setLayanan(e.target.value)}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Deskripsi Layanan
                        </label>
                        <input
                            type="text"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Estimasi Harga
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={estimasiHarga}
                            onChange={(e) => setEstimasiHarga(e.target.value.replace(/\D/g, ""))}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Durasi Pengerjaan Layanan (Menit)
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={durasi}
                            onChange={(e) => setDurasi(e.target.value.replace(/\D/g, ""))}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    {[
                        { label: "Gambar1", gambar: gambar1, preview: previewGambar1, onChange: handleChangeFile1 },
                        { label: "Gambar2", gambar: gambar2, preview: previewGambar2, onChange: handleChangeFile2 },
                        { label: "Gambar3", gambar: gambar3, preview: previewGambar3, onChange: handleChangeFile3 },
                        { label: "Gambar4", gambar: gambar4, preview: previewGambar4, onChange: handleChangeFile4 },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            {item.label}
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={item.onChange}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#d996ad] file:cursor-pointer"
                        />

                        {item.gambar && (
                            <p className="text-[11px] text-[#7D344B]/80">
                            File: {item.gambar}
                            </p>
                        )}

                        {item.preview && (
                            <img
                            src={item.preview}
                            alt={`Preview ${item.label}`}
                            className="mt-2 h-24 w-24 rounded-md border border-[#dd98ad] object-cover"
                            />
                        )}
                        </div>
                    ))}

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Status Layanan
                        </label>

                        <label className="flex items-center gap-2 text-xs text-[#7D344B] sm:text-sm">
                            <input
                                type="radio"
                                name="statusLayanan"
                                value="Aktif"
                                checked={statusLayanan === "Aktif"}
                                onChange={(e) => setStatusLayanan(e.target.value)}
                                className="accent-[#c75b82]"
                            />
                            Aktif
                        </label>

                        <label className="flex items-center gap-2 text-xs text-[#7D344B] sm:text-sm">
                            <input
                                type="radio"
                                name="statusLayanan"
                                value="Nonaktif"
                                checked={statusLayanan === "Nonaktif"}
                                onChange={(e) => setStatusLayanan(e.target.value)}
                                className="accent-[#c75b82]"
                            />
                            Nonaktif
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
}
