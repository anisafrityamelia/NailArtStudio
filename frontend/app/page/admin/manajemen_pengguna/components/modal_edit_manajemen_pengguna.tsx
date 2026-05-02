"use client";

import { useEffect, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

type DataPengguna = {
    id_pengguna: number;
    nama: string;
    email: string;
    noHP: string;
    role: string;
}

export type PayloadEditManajemenPengguna = {
    id_pengguna: number,
    nama: string,
    email: string,
    noHP: string,
};

type PropsModalEditManajemenPengguna = {
    isOpen: boolean;
    onClose: () => void;
    data: DataPengguna | null;
    onSubmit: (payload: PayloadEditManajemenPengguna) => void;
    onResetPassword: (id_pengguna: number) => void;
};

export default function ModalEditManajemenPengguna({
    isOpen,
    onClose,
    data,
    onSubmit,
    onResetPassword,
}: PropsModalEditManajemenPengguna) {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [noHP, setNoHP] = useState("");
    const [role, setRole] = useState("");

    const [isPasswordReset, setIsPasswordReset] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen && data) {
            setNama(data.nama);
            setEmail(data.email);
            setNoHP(data.noHP);
            setRole(data.role);
            setIsPasswordReset(false);
            setShowPassword(false);
        }
    }, [isOpen, data]);

    if (!isOpen || !data) return null;

    const isPelanggan = data.role === "pelanggan";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            id_pengguna: data.id_pengguna,
            nama,
            email,
            noHP,
        });
    };

    const handleResetPassword = () => {
        onResetPassword(data.id_pengguna);
        setIsPasswordReset(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg bg-[#ffecf2] shadow-xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
                    <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Edit Pengguna
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
                            readOnly={isPelanggan}
                            className={`w-full cursor-text rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm
                                ${
                                    isPelanggan
                                    ? ""
                                    : "focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                                }
                            `}
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
                            readOnly={isPelanggan}
                            className={`w-full cursor-text rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm
                                ${
                                    isPelanggan
                                    ? ""
                                    : "focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                                }
                            `}
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
                                readOnly={isPelanggan}
                                className={`w-full cursor-text rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm
                                    ${
                                        isPelanggan
                                        ? ""
                                        : "focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                                    }
                                `}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                                Role
                            </label>
                            <input
                                type="text"
                                value={role}
                                readOnly
                                className="h-[38px] w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="rounded-md border border-[#dd98ad] bg-white/50 p-3 shadow-soft-text sm:p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                                    Reset Kata Sandi
                                </p>
                                <p className="mt-1 text-[10px] leading-relaxed text-[#7D344B]/70 sm:text-xs">
                                    Sekali klik, kata sandi pengguna akan direset otomatis ke kata sandi default sistem.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="shrink-0 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-3 py-1.5 text-[10px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-4 sm:py-2 sm:text-sm cursor-pointer"
                            >
                                Reset Kata Sandi
                            </button>
                        </div>

                        <div className="mt-3 flex flex-col gap-1">
                            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                                Kata Sandi Default
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={isPasswordReset ? "123456" : ""}
                                    readOnly
                                    className="w-full rounded-md border border-[#dd98ad] bg-[#fff7fa] px-3 py-2 pr-10 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#7D344B] transition hover:opacity-80"
                                >
                                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                            </div>

                            <p className="text-[10px] leading-relaxed text-[#7D344B]/70 sm:text-xs">
                                Kata sandi default ini digunakan setelah admin menekan tombol reset.
                            </p>
                        </div>
                    </div>        

                    {!isPelanggan && (
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm"
                        >
                            Simpan
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}