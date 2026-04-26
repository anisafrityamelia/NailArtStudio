"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type DataLayanan = {
    layanan: string;
    deskripsi: string;
    estimasiHarga: number;
    durasi: number;
    gambar1: string;
    gambar2: string;
    gambar3: string;
    gambar4: string;
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
    const [gambar1, setGambar1] = useState("");
    const [gambar2, setGambar2] = useState("");
    const [gambar3, setGambar3] = useState("");
    const [gambar4, setGambar4] = useState("");
    const [statusLayanan, setStatusLayanan] = useState("Aktif");

    const [fileGambar, setFileGambar] = useState<File | null>(null);
    const [previewGambar1, setPreviewGambar1] = useState("");
    const [previewGambar2, setPreviewGambar2] = useState("");
    const [previewGambar3, setPreviewGambar3] = useState("");
    const [previewGambar4, setPreviewGambar4] = useState("");

    useEffect(() => {
        if (isOpen && data) {
            setLayanan(data.layanan);
            setDeskripsi(data.deskripsi);
            setEstimasiHarga(String(data.estimasiHarga));;
            setDurasi(String(data.durasi));
            setGambar1(data.gambar1);
            setGambar2(data.gambar2);
            setGambar3(data.gambar3);
            setGambar4(data.gambar4);
            setStatusLayanan(data.statusLayanan);
            setFileGambar(null);
            setPreviewGambar1(data.gambar1 || "");
            setPreviewGambar2(data.gambar2 || "");
            setPreviewGambar3(data.gambar3 || "");
            setPreviewGambar4(data.gambar4 || "");
        }
    }, [isOpen, data]);

    if (!isOpen || !data) return null;

    const handleChangeFile1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar(file);
        setGambar1(file.name);

        const imageUrl = URL.createObjectURL(file);
        setPreviewGambar1(imageUrl);
    };

    const handleChangeFile2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar(file);
        setGambar2(file.name);

        const imageUrl = URL.createObjectURL(file);
        setPreviewGambar2(imageUrl);
    };

    const handleChangeFile3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar(file);
        setGambar3(file.name);

        const imageUrl = URL.createObjectURL(file);
        setPreviewGambar3(imageUrl);
    };

    const handleChangeFile4 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileGambar(file);
        setGambar4(file.name);

        const imageUrl = URL.createObjectURL(file);
        setPreviewGambar4(imageUrl);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            layanan,
            deskripsi,
            estimasiHarga: Number(estimasiHarga),
            durasi: Number(durasi),
            gambar1,
            gambar2,
            gambar3,
            gambar4,
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
                            Durasi Pengerjaan Layanan (Menit)
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
                            Gambar1
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeFile1}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#d996ad] file:cursor-pointer"
                        />

                        {gambar1 && (
                            <p className="text-[11px] text-[#7D344B]/80">
                                File dipilih: {gambar1}
                            </p>
                        )}

                        {previewGambar1 && (
                            <img
                                src={previewGambar1}
                                alt="Preview gambar1"
                                className="mt-2 h-24 w-24 rounded-md border border-[#dd98ad] object-cover"
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Gambar2
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeFile2}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#d996ad] file:cursor-pointer"
                        />

                        {gambar2 && (
                            <p className="text-[11px] text-[#7D344B]/80">
                                File dipilih: {gambar2}
                            </p>
                        )}

                        {previewGambar2 && (
                            <img
                                src={previewGambar2}
                                alt="Preview gambar2"
                                className="mt-2 h-24 w-24 rounded-md border border-[#dd98ad] object-cover"
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Gambar3
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeFile3}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#d996ad] file:cursor-pointer"
                        />

                        {gambar3 && (
                            <p className="text-[11px] text-[#7D344B]/80">
                                File dipilih: {gambar3}
                            </p>
                        )}

                        {previewGambar3 && (
                            <img
                                src={previewGambar3}
                                alt="Preview gambar3"
                                className="mt-2 h-24 w-24 rounded-md border border-[#dd98ad] object-cover"
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Gambar4
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeFile4}
                            className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#d996ad] file:cursor-pointer"
                        />

                        {gambar4 && (
                            <p className="text-[11px] text-[#7D344B]/80">
                                File dipilih: {gambar4}
                            </p>
                        )}

                        {previewGambar4 && (
                            <img
                                src={previewGambar4}
                                alt="Preview gambar4"
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
