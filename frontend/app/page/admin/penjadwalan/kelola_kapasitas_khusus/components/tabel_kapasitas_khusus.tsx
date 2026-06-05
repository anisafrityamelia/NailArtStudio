"use client";

import { Pencil, Trash2 } from "lucide-react";

export type Baris_Kapasitas_Khusus = {
  id_kapasitas: number;
  no: number;
  tanggal: string;
  jumlahKaryawan: number;
  catatan: string;
};

type Props_Tabel_Kapasitas_Khusus = {
  data: Baris_Kapasitas_Khusus[];
  onEdit: (item: Baris_Kapasitas_Khusus) => void;
  onDelete: (item: Baris_Kapasitas_Khusus) => void;
};

export default function Tabel_Kapasitas_Khusus({ 
    data,
    onEdit,
    onDelete, 
}: Props_Tabel_Kapasitas_Khusus) {

    return (
        <>
            <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse table-fixed text-[10px] sm:text-xs md:min-w-[820px] md:text-sm">
                        <thead className="bg-[#dd98ad] text-[#7d344b]">
                            <tr className="text-center">
                                {/* Aksi khusus mobile */}
                                <th className="w-[15%] border border-[#c88ca1] px-1 py-2 md:hidden">
                                    Aksi
                                </th>

                                <th className="w-[8%] border border-[#c88ca1] px-1 py-2 md:w-[3%] md:px-3">
                                    No
                                </th>

                                <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                                    Tanggal
                                </th>

                                <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                                    Jumlah Karyawan
                                </th>

                                <th className="w-[41%] border border-[#c88ca1] px-1 py-2 md:w-[28%] md:px-3">
                                    Catatan
                                </th>

                                {/* Aksi desktop */}
                                <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[12%] md:px-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white/70 text-[#7d344b] font-medium">
                            {data.map((item) => (
                                <tr key={item.id_kapasitas}>
                                    {/* Aksi Mobile */}
                                    <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:hidden">
                                        <div className="flex flex-col items-center justify-center gap-0.5">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(item)}
                                                className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1 py-0.5 text-[8px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer shadow-soft-text"
                                            >
                                                <Pencil size={11} />
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onDelete(item)}
                                                className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1 py-0.5 text-[8px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer shadow-soft-text"
                                            >
                                                <Trash2 size={11} />
                                                Hapus
                                            </button>
                                        </div>
                                    </td>

                                    <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                                        {item.no}
                                    </td>

                                    <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                                        {item.tanggal}
                                    </td>

                                    <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                                        {item.jumlahKaryawan}
                                    </td>

                                    <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                                        <p className="line-clamp-3 break-words leading-tight md:line-clamp-none">
                                            {item.catatan || "-"}
                                        </p>
                                    </td>

                                    {/* Aksi Desktop */}
                                    <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell md:px-2">
                                        <div className="flex flex-nowrap items-center justify-center gap-1 sm:gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onEdit(item)}
                                                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
                                            >
                                                <Pencil size={15} /> Edit
                                            </button>

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
        </>
    );
}