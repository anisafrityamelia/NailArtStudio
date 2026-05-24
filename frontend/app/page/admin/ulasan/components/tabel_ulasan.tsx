"use client";

import { Eye, EyeOff } from "lucide-react";
import { UlasanAdmin } from "../page";

type Props_Tabel_Ulasan = {
  data: UlasanAdmin[];
  onDelete: (item: UlasanAdmin) => void;
  onTampilkan: (item: UlasanAdmin) => void;
};

export default function Tabel_Ulasan({
  data,
  onDelete,
  onTampilkan,
}: Props_Tabel_Ulasan) {
  return (
    <div className="overflow-hidden rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] table-fixed border-collapse text-xs sm:min-w-0 sm:text-sm">
          <thead className="bg-[#dd98ad] text-[#7d344b]">
            <tr className="text-center">
              <th className="w-[5%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                No
              </th>
              <th className="w-[14%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                Kode Pesanan
              </th>
              <th className="w-[16%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                Nama Pelanggan
              </th>
              <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                Layanan
              </th>
              <th className="w-[24%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                Ulasan
              </th>
              <th className="w-[8%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                Rating
              </th>
              <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                Foto
              </th>
              <th className="w-[18%] border border-[#c88ca1] px-1 py-2 text-[11px] sm:w-[12%] sm:px-3 sm:text-sm">
                Status
              </th>
              <th className="w-[13%] border border-[#c88ca1] px-2 py-2 sm:px-3">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/70 font-medium text-[#7d344b]">
            {data.map((item, index) => (
                <tr key={item.id_ulasan}>
                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-middle sm:px-3">
                    {index + 1}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.kode_pesanan}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.nama_pelanggan}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.nama_layanan}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.ulasan || "-"}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top sm:px-3">
                    {item.rating}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-3">
                    {item.gambar_ulasan_url ? (
                      <img
                        src={item.gambar_ulasan_url}
                        alt={`Foto ulasan ${item.nama_pelanggan}`}
                        className="mx-auto h-16 w-16 rounded bg-white object-cover"
                      />
                    ) : (
                      <span className="block text-center">-</span>
                    )}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top sm:px-3">
                    <span
                      className={`inline-flex items-center justify-center rounded-full px-1.5 py-1 text-[9px] leading-none font-semibold whitespace-nowrap sm:px-2 sm:text-[11px] ${
                        item.status_tampil === "ditampilkan"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status_tampil === "ditampilkan"
                        ? "Ditampilkan"
                        : "Disembunyikan"}
                    </span>
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-2">
                    <div className="flex justify-center">
                      {item.status_tampil === "ditampilkan" ? (
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
                        >
                          <EyeOff size={15} />
                          Hide
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onTampilkan(item)}
                          className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-1.5 py-1 text-[10px] text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 cursor-pointer sm:px-2 sm:text-sm shadow-soft-text"
                        >
                          <Eye size={15} />
                          Tampilkan
                        </button>
                      )}
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