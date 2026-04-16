"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type PropsModalTambahJadwalKhusus = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: {
        tanggal: string;
        status: string;
        jamBuka: string;
        jamTutup: string;
        catatan: string;
    }) => void;
};

export default function ModalTambahJadwalKhusus({
    isOpen,
    onClose,
    onSubmit,
}: PropsModalTambahJadwalKhusus) {
    const [tanggal, setTanggal] = useState("");
    const [status, setStatus] = useState("Buka");
    const [jamBuka, setJamBuka] = useState("");
    const [jamTutup, setJamTutup] = useState("");
    const [catatan, setCatatan] = useState("");

    useEffect(() => {
        if (isOpen) {
            setTanggal("");
            setStatus("Buka");
            setJamBuka("");
            setJamTutup("");
            setCatatan("");
        }
    }, [isOpen]);

    useEffect(() => {
        if (status === "Tutup") {
            setJamBuka("");
            setJamTutup("");
        }
    }, [status]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            tanggal,
            status,
            jamBuka,
            jamTutup,
            catatan,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md overflow-hidden rounded-lg bg-[#ffecf2] shadow-xl">
                <div className="flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
                    <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Tambah Jadwal Khusus
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
                            Tanggal
                        </label>
                        <input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            required
                            className="w-full cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Status
                        </label>
                        <div className="flex items-center gap-6">
                            <label className="flex cursor-pointer items-center gap-2 text-xs text-[#7D344B] sm:text-sm">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Buka"
                                    checked={status === "Buka"}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="h-4 w-4 cursor-pointer accent-[#7D344B]"
                                />
                                <span>Buka</span>
                            </label>
                            <label className="flex cursor-pointer items-center gap-2 text-xs text-[#7D344B] sm:text-sm">
                                <input
                                    type="radio"
                                    name="status"
                                    value="Tutup"
                                    checked={status === "Tutup"}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="h-4 w-4 cursor-pointer accent-[#7D344B]"
                                />
                                <span>Tutup</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                                Jam Buka
                            </label>
                            <input
                                type="time"
                                value={jamBuka}
                                onChange={(e) => setJamBuka(e.target.value)}
                                required={status === "Buka"}
                                disabled={status === "Tutup"}
                                className="w-full cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] disabled:cursor-not-allowed disabled:bg-[#f5dfe7] disabled:text-[#b57b8d] sm:text-sm"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                                Jam Tutup
                            </label>
                            <input
                                type="time"
                                value={jamTutup}
                                onChange={(e) => setJamTutup(e.target.value)}
                                required={status === "Buka"}
                                disabled={status === "Tutup"}
                                className="w-full cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] disabled:cursor-not-allowed disabled:bg-[#f5dfe7] disabled:text-[#b57b8d] sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Catatan
                        </label>
                        <textarea
                            value={catatan}
                            onChange={(e) => setCatatan(e.target.value)}
                            placeholder="Masukkan catatan"
                            rows={3}
                            className="w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm cursor-text"
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
    );
}