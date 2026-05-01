"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type PayloadTambahManajemenPengguna = {
    nama: string,
    email: string,
    noHP: string,
    role: string,
};

type PropsModalTambahManajemenPengguna = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: PayloadTambahManajemenPengguna) => void;
};

export default function ModalTambahManajemenPengguna({
    isOpen,
    onClose,
    onSubmit,
}: PropsModalTambahManajemenPengguna) {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noHP, setNoHP] = useState("");
    const [role, setRole] = useState("pelanggan");

    useEffect(() => {
        if (isOpen) {
            setNama("");
            setEmail("");
            setNoHP("");
            setRole("pelanggan");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            nama,
            email,
            noHP,
            role,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md overflow-hidden rounded-lg bg-[#ffecf2] shadow-xl">
                <div className="flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
                    <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Tambah Pengguna
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
                            Nama
                        </label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan nama pengguna"
                            required
                            className="w-full cursor-text rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email"
                            required
                            className="w-full cursor-text rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                                No HP
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={noHP}
                                onChange={(e) => setNoHP(e.target.value.replace(/\D/g, ""))}
                                placeholder="Masukkan nomor HP"
                                required
                                className="w-full cursor-text rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                                Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                className="h-[38px] w-full cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                            >
                                <option value="admin">Admin</option>
                                <option value="pelanggan">Pelanggan</option>
                            </select>
                        </div>
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