"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

type Data_Keunggulan = {
    deskripsi: string;
}

export default function Card_Keunggulan_Beranda() {
    const [isEdit, setIsEdit] = useState(false);

    // data yang ditampilkan di card
    const [dataKeunggulan, setDataKeunggulan] = useState<Data_Keunggulan | null>(null);

    // data form saat edit
    const [deskripsi, setDeskripsi] = useState("");

    useEffect(() => {
        if (isEdit && dataKeunggulan) {
            setDeskripsi(dataKeunggulan?.deskripsi);
        }
    }, [isEdit, dataKeunggulan]);

    function handleBukaEdit() {
        setIsEdit(true);
    }

    function handleBatalEdit() {
        setDeskripsi(dataKeunggulan?.deskripsi || "");
        setIsEdit(false);
    }

    function handleSimpanEdit(e: React.FormEvent) {
        e.preventDefault();

        const payload: Data_Keunggulan = {
            deskripsi: deskripsi.trim(),
        };

        console.log("Payload keunggulan:", payload);

        // dummy disimpan ke state dulu
        setDataKeunggulan(payload);
        setIsEdit(false);
    }

    return (
        <section className="rounded-xl border border-[#d3a0b0] bg-white/40 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                    Keunggulan Kami
                </h3>

                {!isEdit ? (
                <button
                    type="button"
                    onClick={handleBukaEdit}
                    className="flex cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                >
                    <Pencil size={16} /> Edit
                </button>
                ) : (
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleBatalEdit}
                        className="cursor-pointer rounded-md bg-gradient-to-r from-[#d9d9d9] to-[#dd98ad] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        form="form-keunggulan-beranda"
                        className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                    >
                        Simpan
                    </button>
                </div>
                )}
            </div>

            <form id="form-keunggulan-beranda" onSubmit={handleSimpanEdit}>
                <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                    Deskripsi Keunggulan
                </label>

                <textarea
                    value={isEdit ? deskripsi : dataKeunggulan?.deskripsi || ""}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    readOnly={!isEdit}
                    placeholder={isEdit ? "Masukkan deskripsi keunggulan" : ""}
                    rows={5}
                    className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                    isEdit
                        ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                        : "text-gray-400 bg-white/70"
                    }`}
                />
                </div>
            </form>
        </section>
    );
}