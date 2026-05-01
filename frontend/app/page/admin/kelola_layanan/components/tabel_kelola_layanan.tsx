"use client";

import { Pencil } from "lucide-react";

export type Gambar_Layanan = {
  id_gambar: number;
  id_layanan: number;
  path_gambar: string;
  url_gambar: string;
};

export type Baris_Kelola_Layanan = {
  id_layanan: number;
  no: number;
  layanan: string;
  kategori_layanan: string;
  deskripsi: string;
  estimasiHarga: number;
  durasi: number;
  gambar: Gambar_Layanan[];
  statusLayanan: string;
};

type Props_Tabel_Kelola_Layanan = {
  data: Baris_Kelola_Layanan[];
  onEdit: (item: Baris_Kelola_Layanan) => void;
};

export default function Tabel_Kelola_Layanan({ 
    data,
    onEdit,
}: Props_Tabel_Kelola_Layanan) {
    const formatRupiah = (harga: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(harga);
    };

    return (
        <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
                <table className="min-w-[1400px] border-collapse text-xs sm:text-sm">
                    <thead className="bg-[#dd98ad] text-[#7d344b]">
                        <tr className="text-center">
                            <th className="w-[4%] border border-[#c88ca1] px-2 py-2 sm:w-[4%] sm:px-3">No</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Nama Layanan</th>
                            <th className="w-[18%] border border-[#c88ca1] px-2 py-2 sm:w-[17%] sm:px-3">Deskripsi</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[11%] sm:px-3">Estimasi Harga</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[11%] sm:px-3">Durasi (Menit)</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Gambar1</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Gambar2</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Gambar3</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Gambar4</th>
                            <th className="w-[13%] border border-[#c88ca1] px-2 py-2 sm:w-[18%] sm:px-3">Status Layanan</th>
                            <th className="w-[13%] border border-[#c88ca1] px-2 py-2 sm:w-[11%] sm:px-3">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white/70 text-[#7d344b] font-medium">
                        {data.map((item) => (
                             <tr key={item.id_layanan}>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.no}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.layanan}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.deskripsi}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{formatRupiah(item.estimasiHarga)}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-all sm:px-3">{item.durasi}</td>
                                {[0, 1, 2, 3].map((index) => (
                                <td
                                    key={index}
                                    className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3"
                                >
                                    {item.gambar[index]?.url_gambar ? (
                                    <img
                                        src={item.gambar[index].url_gambar}
                                        alt={item.layanan}
                                        className="mx-auto h-14 w-14 object-cover rounded bg-white"
                                    />
                                    ) : (
                                    <span className="block text-center text-[11px] text-[#7D344B]/60">
                                        Tidak ada
                                    </span>
                                    )}
                                </td>
                                ))}<td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-all sm:px-3">{item.statusLayanan}</td>

                                <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-2">
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => onEdit(item)}
                                            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
                                        >
                                            <Pencil size={15} /> Edit
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