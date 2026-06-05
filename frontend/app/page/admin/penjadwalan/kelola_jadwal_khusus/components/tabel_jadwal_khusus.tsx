"use client";

import { Pencil, Trash2 } from "lucide-react";

export type Baris_Jadwal_Khusus = {
  id_jadwal: number;
  no: number;
  tanggal: string;
  status: string;
  jamBuka: string;
  jamTutup: string;
  catatan: string;
};

type Props_Tabel_Jadwal_Khusus = {
  data: Baris_Jadwal_Khusus[];
  onEdit: (item: Baris_Jadwal_Khusus) => void;
  onDelete: (item: Baris_Jadwal_Khusus) => void;
};

export default function Tabel_Jadwal_Khusus({ 
  data, 
  onEdit, 
  onDelete,
}: Props_Tabel_Jadwal_Khusus) {
  
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

                <th className="w-[7%] border border-[#c88ca1] px-1 py-2 md:w-[4%] md:px-3">
                  No
                </th>

                <th className="w-[16%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                  Tanggal
                </th>

                <th className="w-[13%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                  Status
                </th>

                <th className="w-[13%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                  Jam Buka
                </th>

                <th className="w-[13%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                  Jam Tutup
                </th>

                <th className="w-[23%] border border-[#c88ca1] px-1 py-2 md:w-[26%] md:px-3">
                  Catatan
                </th>

                {/* Aksi khusus desktop */}
                <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[14%] md:px-3">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="bg-white/70 text-[#7d344b] font-medium">
              {data.map((item) => (
                <tr key={item.no}>
                  {/* Aksi khusus mobile */}
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
                    <p className="break-words leading-tight">{item.tanggal}</p>
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                    <p className="break-words leading-tight">{item.status}</p>
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                    {item.jamBuka}
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                    {item.jamTutup}
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                    <p className="line-clamp-3 break-words leading-tight md:line-clamp-none">
                      {item.catatan || "-"}
                    </p>
                  </td>

                  {/* Aksi khusus desktop */}
                  <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell md:px-2">
                    <div className="flex flex-nowrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-sm text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer shadow-soft-text"
                      >
                        <Pencil size={15} /> Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-sm text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer shadow-soft-text"
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