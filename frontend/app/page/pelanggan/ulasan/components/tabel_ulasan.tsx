"use client";

import { MessageSquarePlus, Pencil, Trash2 } from "lucide-react";

export type Baris_Ulasan_Pelanggan = {
  no: number;
  id_pesanan: number;
  id_ulasan?: number | null;
  kode: string;
  layanan: string;
  tanggal: string;
  ulasan: string;
  rating: number | string;
  gambar: string;
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
    <div className="overflow-hidden rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm">
      <div className="w-full overflow-x-auto md:overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-[11px] sm:text-xs md:min-w-[820px] md:text-sm">
          <thead className="bg-[#dd98ad] text-[#7d344b]">
            <tr className="text-center">
              <th className="w-[15%] border border-[#c88ca1] px-1 py-2 md:hidden">
                Aksi
              </th>

              <th className="w-[8%] border border-[#c88ca1] px-1 py-2 md:w-[5%] md:px-3">
                No
              </th>

              <th className="w-[22%] border border-[#c88ca1] px-1 py-2 md:w-[15%] md:px-3">
                Kode Pesanan
              </th>

              <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:w-[12%] md:px-3">
                Layanan
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[11%] md:px-3">
                Tanggal
              </th>

              <th className="w-[20%] border border-[#c88ca1] px-1 py-2 md:w-[26%] md:px-3">
                Ulasan
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[10%] md:px-3">
                Rating
              </th>

              <th className="w-[17%] border border-[#c88ca1] px-1 py-2 md:w-[14%] md:px-3">
                Gambar
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[16%] md:px-3">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/70 font-medium text-[#7d344b]">
            {data.map((item) => {
              const sudahUlasan =
                !!item.ulasan?.trim() &&
                item.ulasan !== "-" &&
                Number(item.rating) > 0;

              return (
                <tr key={item.kode}>
                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:hidden">
                    <div className="flex flex-col items-center gap-1">
                      {sudahUlasan ? (
                        <>
                          <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-[2px] bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1 py-0.5 text-[9px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:gap-1 sm:rounded sm:px-2 sm:py-1 sm:text-sm"
                          >
                            <Pencil size={10} className="sm:hidden" />
                            <Pencil size={15} className="hidden sm:block" />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => onDelete(item)}
                            className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-[2px] bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1 py-0.5 text-[9px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:gap-1 sm:rounded sm:px-2 sm:py-1 sm:text-sm"
                          >
                            <Trash2 size={10} className="sm:hidden" />
                            <Trash2 size={15} className="hidden sm:block" />
                            Hapus
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onBeriUlasan(item)}
                          className="flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-[2px] bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1 py-0.5 text-[9px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:gap-1 sm:rounded sm:px-2 sm:py-1 sm:text-sm"
                        >
                          <MessageSquarePlus size={10} className="sm:hidden" />
                          <MessageSquarePlus
                            size={15}
                            className="hidden sm:block"
                          />
                          Ulasan
                        </button>
                      )}
                    </div>
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                    {item.no}
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                    <p className="break-all leading-tight md:break-words">
                      {item.kode}
                    </p>
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                    <p className="line-clamp-2 leading-tight">{item.layanan}</p>
                  </td>

                  <td className="hidden border border-[#e2b6c4] px-2 py-2 text-center align-top break-words md:table-cell md:px-3">
                    {item.tanggal}
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                    <p className="line-clamp-3 break-words text-[10px] leading-tight md:text-sm">
                      {item.ulasan && item.ulasan !== "-" ? item.ulasan : ""}
                    </p>
                  </td>

                  <td className="hidden border border-[#e2b6c4] px-2 py-2 text-center align-top break-words md:table-cell md:px-3">
                    {item.rating}
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                    {item.gambar ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {item.gambar.split(",").map((gambar, index) => (
                          <img
                            key={index}
                            src={gambar.trim()}
                            alt={`${item.layanan} ${index + 1}`}
                            className="h-7 w-7 rounded bg-white object-cover shadow-soft-text md:h-12 md:w-12"
                          />
                        ))}
                      </div>
                    ) : null}
                  </td>

                  <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell md:px-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      {sudahUlasan ? (
                        <>
                          <button
                            type="button"
                            onClick={() => onEdit(item)}
                            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-sm text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => onDelete(item)}
                            className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-sm text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer"
                          >
                            <Trash2 size={15} />
                            Hapus
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onBeriUlasan(item)}
                          className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-sm text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer"
                        >
                          <MessageSquarePlus size={15} />
                          Beri Ulasan
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
  );
}
