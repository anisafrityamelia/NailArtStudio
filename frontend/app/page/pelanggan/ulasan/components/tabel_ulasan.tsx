"use client";

import { MessageSquarePlus, Pencil, Trash2 } from "lucide-react";

export type Baris_Ulasan_Pelanggan = {
  no: number;
  kode: string,
  layanan: string,
  tanggal: string;
  ulasan: string,
  rating: number | string;
  gambar: string,
};

type Props_Tabel_Ulasan = {
  data: Baris_Ulasan_Pelanggan[];
  onEdit: (item: Baris_Ulasan_Pelanggan) => void;
  onDelete: (item: Baris_Ulasan_Pelanggan) => void;
  onBeriUlasan: (item: Baris_Ulasan_Pelanggan) => void;
};

export default function Tabel_Ulasan({ 
    data,
    onEdit,
    onDelete,
    onBeriUlasan,
}: Props_Tabel_Ulasan) {

    return (
        <>
            <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-[820px] w-full table-fixed border-collapse text-xs sm:min-w-0 sm:text-sm">
                        <thead className="bg-[#dd98ad] text-[#7d344b]">
                            <tr className="text-center">
                                <th className="w-[7%] border border-[#c88ca1] px-2 py-2 sm:w-[5%] sm:px-3">No</th>
                                <th className="w-[16%] border border-[#c88ca1] px-2 py-2 sm:w-[15%] sm:px-3">Kode Pesanan</th>
                                <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">Layanan</th>
                                <th className="w-[13%] border border-[#c88ca1] px-2 py-2 sm:w-[11%] sm:px-3">Tanggal</th>
                                <th className="w-[24%] border border-[#c88ca1] px-2 py-2 sm:w-[26%] sm:px-3">Ulasan</th>
                                <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Rating</th>
                                <th className="w-[14%] border border-[#c88ca1] px-2 py-2 sm:w-[14%] sm:px-3">Gambar</th>
                                <th className="w-[20%] border border-[#c88ca1] px-2 py-2 sm:w-[16%] sm:px-3">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white/70 text-[#7d344b] font-medium">
                            {data.map((item) => {
                                const sudahUlasan =
                                    !!item.ulasan?.trim() &&
                                    item.ulasan !== "-" &&
                                    Number(item.rating) > 0;

                                return (
                                    <tr key={item.kode}>
                                        <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.no}</td>
                                        <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.kode}</td>
                                        <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.layanan}</td>
                                        <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.tanggal}</td>
                                        <td className="border border-[#e2b6c4] px-2 py-2 align-top break-all sm:px-3">{item.ulasan}</td>
                                        <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.rating}</td>
                                        <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-3">
                                            {item.gambar ? (
                                                <img
                                                    src={item.gambar}
                                                    alt={item.layanan}
                                                    className="mx-auto h-15 w-15 rounded bg-white object-contain"
                                                />
                                            ) : (
                                                " "
                                            )}
                                        </td>

                                        <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-2">
                                            <div className="flex flex-wrap justify-center gap-1">
                                                {sudahUlasan ? (
                                                    <>
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
                                                    </>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => onBeriUlasan(item)}
                                                        className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
                                                    >
                                                        <MessageSquarePlus size={15} /> Beri Ulasan
                                                    </button>
                                                )}   
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}