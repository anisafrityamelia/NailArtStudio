"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type DataKapasitasKhusus = {
    no: number;
    tanggal: string;
    jumlahKaryawan: number;
    catatan: string;
};

type PropsModalEditKapasitasKhusus = {
    isOpen: boolean;
    onClose: () => void;
    data: DataKapasitasKhusus | null;
    onSubmit: (payload: {
        no: number;
        tanggal: string;
        jumlahKaryawan: number;
        catatan: string;
    }) => void;
};

export default function ModalEditKapasitasKhusus({
    isOpen,
    onClose,
    data,
    onSubmit,
}: PropsModalEditKapasitasKhusus) {
    const [tanggal, setTanggal] = useState("");
    const [jumlahKaryawan, setJumlahKaryawan] = useState("");
    const [catatan, setCatatan] = useState("");

    useEffect(() => {
        if (isOpen && data) {
            setTanggal(data.tanggal);
            setJumlahKaryawan(data.jumlahKaryawan.toString());
            setCatatan(data.catatan);
        }
    }, [isOpen, data]);

    if (!isOpen || !data) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            no: data.no,
            tanggal,
            jumlahKaryawan: Number(jumlahKaryawan),
            catatan,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md overflow-hidden rounded-lg bg-[#ffecf2] shadow-xl">
                <div className="flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
                    <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Edit Kapasitas Khusus
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

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Jumlah Karyawan
                        </label>
                        <input
                            type="number"
                            value={jumlahKaryawan}
                            onChange={(e) => setJumlahKaryawan(e.target.value)}
                            placeholder="Masukkan jumlah karyawan"
                            required
                            min={1}
                            className="w-full cursor-text rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Catatan (Opsional)
                        </label>
                        <textarea
                            value={catatan}
                            onChange={(e) => setCatatan(e.target.value)}
                            placeholder="Masukkan catatan"
                            rows={4}
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

