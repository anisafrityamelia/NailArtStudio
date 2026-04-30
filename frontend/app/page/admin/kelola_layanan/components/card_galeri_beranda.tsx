"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

type Item_Galeri = {
  id: number;
  gambar: string;
};

const data: Item_Galeri[] = [
    { 
        id: 1, 
        gambar: "/galeri 1.jpeg",
    },
    { 
        id: 2, 
        gambar: "/galeri 2.jpeg",
    },
    { 
        id: 3, 
        gambar: "/galeri 7.jpeg",
    },
    { 
        id: 4, 
        gambar: "/galeri 6.jpeg",
    },
    { 
        id: 5, 
        gambar: "/galeri 5.jpeg",
    },
    { 
        id: 6, 
        gambar: "/galeri 4.jpeg",
    },
    { 
        id: 7, 
        gambar: "/galeri 8.jpeg", 
    },
    { 
        id: 8, 
        gambar: "", 
    },
];

export default function Card_Galeri_Beranda() {

    const [isEdit, setIsEdit] = useState(false);
    const [draftGaleri, setDraftGaleri] = useState<Item_Galeri[]>([]);

    useEffect(() => {
        if (isEdit) {
            setDraftGaleri(data);
        }
    }, [isEdit]);

    function handleBukaEdit() {
        setIsEdit(true);
    }

    function handleBatalEdit() {
        setDraftGaleri(data);
        setIsEdit(false);
    }

    function handleSimpanEdit() {
        const payload = draftGaleri;

        console.log("Payload galeri:", payload);

        setIsEdit(false);
    }

    function handleChangeFile(
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) {
        const file = e.target.files?.[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);

        setDraftGaleri((prev) =>
            prev.map((item) =>
                item.id === id
                ?   {
                        ...item,
                        gambar: imageUrl,
                    }
                : item
            )
        );
    }

    return (
        <section className="rounded-xl border border-[#d3a0b0] bg-white/40 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Galeri Studio
                    </h3>
                </div>

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
                            type="button"
                            onClick={handleSimpanEdit}
                            className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                        >
                            Simpan
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {(isEdit ? draftGaleri : data).map((item) => (
                    <div
                        key={item.id}
                        className="rounded-lg border border-[#dd98ad] bg-white p-2 shadow-soft-text"
                    >
                        {item.gambar ? (
                            <img
                                src={item.gambar}
                                alt={`Galeri ${item.id}`}
                                className="h-48 w-full rounded-md object-cover"
                            />
                        ) : (
                            <div className="flex h-48 w-full items-center justify-center rounded-md bg-[#fff7fa] text-xs sm:text-sm text-gray-400">
                                Belum ada gambar
                            </div>
                        )}

                        {isEdit && (
                            <div className="mt-2">
                                <label className="block w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-3 py-1 sm:py-2 text-center text-xs sm:text-sm text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95">
                                    Ganti
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleChangeFile(e, item.id)}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}