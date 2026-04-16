"use client";

import { Pencil, Trash2 } from "lucide-react";

export type Baris_Kapasitas_Khusus = {
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
                <div className="overflow-x-auto">
                    <table className="min-w-[820px] w-full table-fixed border-collapse text-xs sm:min-w-0 sm:text-sm">
                        <thead className="bg-[#dd98ad] text-[#7d344b]">
                            <tr className="text-center">
                                <th className="w-[4%] border border-[#c88ca1] px-2 py-2 sm:w-[3%] sm:px-3">No</th>
                                <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Tanggal</th>
                                <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Jumlah Karyawan</th>
                                <th className="w-[28%] border border-[#c88ca1] px-2 py-2 sm:w-[28%] sm:px-3">Catatan</th>
                                <th className="w-[14%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white/70 text-[#7d344b] font-medium">
                            {data.map((item) => (
                                <tr key={item.no}>
                                    <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.no}</td>
                                    <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.tanggal}</td>
                                    <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.jumlahKaryawan}</td>
                                    <td className="border border-[#e2b6c4] px-2 py-2 align-top break-all sm:px-3">{item.catatan}</td>

                                    <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-2">
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