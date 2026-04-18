"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type DataLayanan = {
    layanan: string;
    deskripsi: string;
    estimasiHarga: number;
    durasi: number;
    gambar: string;
    statusLayanan: string;
}

type PropsModalEditLayanan = {
    isOpen: boolean;
    onClose: () => void;
    data: DataLayanan | null;
    onSubmit: (payload: DataLayanan) => void;
};

export default function PropsModalEditLayanan({
    isOpen,
    onClose,
    data,
    onSubmit,
}: PropsModalEditLayanan) {
    const [layanan, setLayanan] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [estimasiHarga, setEstimasiHarga] = useState("");
    const [durasi, setDurasi] = useState("");
    const [gambar, setGambar] = useState("");
    const [statusLayanan, setStatusLayanan] = useState("Aktif");

    const [fileGambar, setFileGambar] = useState<File | null>(null);
    const [previewGambar, setPreviewGambar] = useState("");

    useEffect(() => {
        if (isOpen && data) {
            setLayanan(data.layanan);
            setDeskripsi(data.deskripsi);
            setEstimasiHarga(String(data.estimasiHarga));;
            setDurasi(String(data.durasi));
            setGambar(data.gambar);
            setStatusLayanan(data.statusLayanan);
            setFileGambar(null);
            setPreviewGambar(data.gambar || "");
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

        onSubmit({
            layanan,
            deskripsi,
            estimasiHarga: Number(estimasiHarga),
            durasi: Number(durasi),
            gambar,
            statusLayanan,
        });

        onClose();
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
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setEstimasiHarga(value);
                            }}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Durasi (Menit)
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            value={durasi}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setDurasi(value);
                            }}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
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
                                alt="Preview gambar layanan"
                                className="mt-2 h-24 w-24 rounded-md border border-[#dd98ad] object-cover"
                            />
                        )}
                    </div>

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
