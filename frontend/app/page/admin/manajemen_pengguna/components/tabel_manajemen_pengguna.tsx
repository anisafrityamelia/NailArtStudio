"use client";

import { Pencil, Trash2 } from "lucide-react";

export type Baris_Manajemen_Pengguna = {
  id_pengguna: number;
  no: number;
  nama: string,
  email: string,
  noHP: string,
  role: string,
};

type Props_Tabel_Manajemen_Pengguna = {
  data: Baris_Manajemen_Pengguna[];
  onEdit: (item: Baris_Manajemen_Pengguna) => void;
  onDelete: (item: Baris_Manajemen_Pengguna) => void;
};

export default function Tabel_Manajemen_Pengguna({ 
    data,
    onEdit,
    onDelete,
}: Props_Tabel_Manajemen_Pengguna) {

    return (
        <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-[820px] w-full table-fixed border-collapse text-xs sm:min-w-0 sm:text-sm">
                    <thead className="bg-[#dd98ad] text-[#7d344b]">
                        <tr className="text-center">
                            <th className="w-[6%] border border-[#c88ca1] px-2 py-2 sm:w-[4%] sm:px-3">No</th>
                            <th className="w-[18%] border border-[#c88ca1] px-2 py-2 sm:w-[17%] sm:px-3">Nama Pengguna</th>
                            <th className="w-[18%] border border-[#c88ca1] px-2 py-2 sm:w-[17%] sm:px-3">Email</th>
                            <th className="w-[11%] border border-[#c88ca1] px-2 py-2 sm:w-[11%] sm:px-3">No HP</th>
                            <th className="w-[11%] border border-[#c88ca1] px-2 py-2 sm:w-[11%] sm:px-3">Role</th>
                            <th className="w-[15%] border border-[#c88ca1] px-2 py-2 sm:w-[13%] sm:px-3">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white/70 text-[#7d344b] font-medium">
                        {data.map((item) => (
                            <tr key={item.id_pengguna}>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.no}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.nama}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-all sm:px-3">{item.email}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.noHP}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-all sm:px-3">{item.role}</td>

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
    );
}