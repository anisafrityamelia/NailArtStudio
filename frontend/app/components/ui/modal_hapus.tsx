"use client";

import { Trash2, X } from "lucide-react";

type Props_Modal_Hapus = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function Modal_Hapus({
    isOpen,
    onClose,
    onConfirm,
}: Props_Modal_Hapus) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 px-4">
            <div className="relative w-[85%] max-w-sm rounded-lg bg-[#ffecf2] px-5 py-6 shadow-[0_6px_20px_rgba(0,0,0,0.2)] sm:px-8 sm:py-10">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full p-1 absolute right-4 top-4 text-[#7d344b] cursor-pointer transition hover:bg-[#f8dfe8]"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <h2 className="text-md sm:text-lg font-semibold text-[#7d344b] shadow-soft-text">
                        Apakah Anda yakin ingin menghapus?
                    </h2>
                    <div className="mt-7 flex items-center justify-center gap-7">
                        <button
                            type="button"
                            onClick={onClose}
                            className="min-w-[80px] sm:min-w-[100px] rounded-md bg-gradient-to-r from-[#d9d9d9] to-[#dd98ad] px-3 py-1.5 text-xs font-semibold text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:text-sm"
                        >
                            Batal
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className="flex min-w-[80px] sm:min-w-[100px] items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-3 py-1.5 text-xs font-semibold text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:text-sm"
                        >
                            <Trash2 size={15} /> Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

