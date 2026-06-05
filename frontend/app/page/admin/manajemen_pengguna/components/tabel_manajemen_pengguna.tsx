"use client";

import { Pencil, Trash2 } from "lucide-react";

export type Baris_Manajemen_Pengguna = {
  id_pengguna: number;
  no: number;
  nama: string;
  email: string;
  noHP: string;
  role: string;
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
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse table-fixed text-[10px] sm:text-xs md:min-w-[820px] md:text-sm">
          <thead className="bg-[#dd98ad] text-[#7d344b]">
            <tr className="text-center">
              {/* Aksi khusus mobile */}
              <th className="w-[13%] border border-[#c88ca1] px-1 py-2 md:hidden">
                Aksi
              </th>

              <th className="w-[7%] border border-[#c88ca1] px-1 py-2 md:w-[4%] md:px-3">
                No
              </th>

              <th className="w-[20%] border border-[#c88ca1] px-1 py-2 md:w-[17%] md:px-3">
                Nama Pengguna
              </th>

              <th className="w-[24%] border border-[#c88ca1] px-1 py-2 md:w-[17%] md:px-3">
                Email
              </th>

              <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:w-[11%] md:px-3">
                No HP
              </th>

              <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:w-[11%] md:px-3">
                Role
              </th>

              {/* Aksi khusus desktop */}
              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[13%] md:px-3">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/70 text-[#7d344b] font-medium">
            {data.map((item) => (
              <tr key={item.id_pengguna}>
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

                <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                  <p className="line-clamp-2 break-words leading-tight md:line-clamp-none">
                    {item.nama}
                  </p>
                </td>

                <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                  <p className="line-clamp-2 break-all leading-tight md:line-clamp-none">
                    {item.email}
                  </p>
                </td>

                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                  <p className="break-words leading-tight">{item.noHP}</p>
                </td>

                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                  <p className="break-words leading-tight">{item.role}</p>
                </td>

                {/* Aksi khusus desktop */}
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
  );
}
