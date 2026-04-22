"use client";

import { Trash2 } from "lucide-react";

export type Baris_Ulasan = {
  no: number;
  kode: string,
  pelanggan: string;
  layanan: string,
  ulasan: string,
  rating: number;
  foto: string,
};

type Props_Tabel_Ulasan = {
  data: Baris_Ulasan[];
  onDelete: (item: Baris_Ulasan) => void;
};

export default function Tabel_Ulasan({ 
    data,
    onDelete,
}: Props_Tabel_Ulasan) {

    return (
        <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-[820px] w-full table-fixed border-collapse text-xs sm:min-w-0 sm:text-sm">
                    <thead className="bg-[#dd98ad] text-[#7d344b]">
                        <tr className="text-center">
                            <th className="w-[6%] border border-[#c88ca1] px-2 py-2 sm:w-[5%] sm:px-3">No</th>
                            <th className="w-[16%] border border-[#c88ca1] px-2 py-2 sm:w-[15%] sm:px-3">Kode Pesanan</th>
                            <th className="w-[18%] border border-[#c88ca1] px-2 py-2 sm:w-[17%] sm:px-3">Nama Pelanggan</th>
                            <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">Layanan</th>
                            <th className="w-[26%] border border-[#c88ca1] px-2 py-2 sm:w-[28%] sm:px-3">Ulasan</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Rating</th>
                            <th className="w-[14%] border border-[#c88ca1] px-2 py-2 sm:w-[14%] sm:px-3">Foto</th>
                            <th className="w-[14%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white/70 text-[#7d344b] font-medium">
                        {data.map((item) => (
                            <tr key={item.no}>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.no}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.kode}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.pelanggan}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.layanan}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-all sm:px-3">{item.ulasan || "-"}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.rating}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-3">
                                    {item.foto ? (
                                        <img
                                        src={item.foto}
                                        alt={item.layanan}
                                        className="mx-auto h-16 w-16 object-contain rounded bg-white"
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </td>

                                <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-2">
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => onDelete(item)}
                                            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
                                        >
                                            <Trash2 size={15} /> Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}