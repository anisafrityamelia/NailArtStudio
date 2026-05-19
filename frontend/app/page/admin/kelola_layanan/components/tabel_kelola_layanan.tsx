"use client";

import { Pencil } from "lucide-react";

export type Gambar_Layanan = {
  id_gambar: number;
  id_layanan: number;
  path_gambar: string;
  url_gambar: string;
};

export type Kategori_Harga_Layanan = {
  id_kategori_harga: number;
  id_layanan: number;
  nama_kategori: string;
  deskripsi_kategori: string | null;
  estimasi_harga: number;
  gambar_kategori: string | null;
  url_gambar_kategori: string | null;
  urutan: number;
  status: "aktif" | "nonaktif";
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
  kategoriHarga: Kategori_Harga_Layanan[];
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
    <div className="overflow-hidden rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm">
      <div className="w-full overflow-x-auto md:overflow-x-auto">
        <table className="w-full border-collapse text-[11px] sm:text-xs md:min-w-[1100px] md:text-sm">
          <thead className="bg-[#dd98ad] text-[#7d344b]">
            <tr className="text-center">
              <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:hidden">
                Aksi
              </th>

              <th className="w-[10%] border border-[#c88ca1] px-1 py-2 md:w-[4%] md:px-2">
                No
              </th>

              <th className="w-[34%] border border-[#c88ca1] px-1 py-2 md:w-[13%] md:px-2">
                Nama Layanan
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[22%]">
                Deskripsi
              </th>

              <th className="w-[24%] border border-[#c88ca1] px-1 py-2 md:w-[11%] md:px-2">
                Harga
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[9%]">
                Durasi
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[15%]">
                Gambar
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[15%]">
                Kategori Harga
              </th>

              <th className="w-[14%] border border-[#c88ca1] px-1 py-2 md:w-[8%] md:px-2">
                Status
              </th>

              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[8%]">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/70 font-medium text-[#7d344b]">
            {data.map((item) => (
              <tr key={item.id_layanan}>
                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:hidden">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="mx-auto flex cursor-pointer items-center gap-1 rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-[10px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>
                </td>

                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-2">
                  {item.no}
                </td>

                <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-2">
                  <p className="line-clamp-2">{item.layanan}</p>
                </td>

                <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell">
                  <p className="line-clamp-3 text-justify">
                    {item.deskripsi || "-"}
                  </p>
                </td>

                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-2">
                  <span className="text-[10px] md:text-sm">
                    {formatRupiah(item.estimasiHarga)}
                  </span>
                </td>

                <td className="hidden border border-[#e2b6c4] px-2 py-2 text-center align-top md:table-cell">
                  {item.durasi} menit
                </td>

                <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell">
                  {item.gambar.length > 0 ? (
                    <div className="grid grid-cols-4 gap-1">
                      {item.gambar.slice(0, 4).map((gambar) => (
                        <img
                          key={gambar.id_gambar}
                          src={gambar.url_gambar}
                          alt={item.layanan}
                          className="h-10 w-10 rounded bg-white object-cover shadow-soft-text"
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="block text-center text-[11px] text-[#7D344B]/60">
                      Tidak ada
                    </span>
                  )}
                </td>

                <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell">
                  {item.kategoriHarga.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold">
                        {item.kategoriHarga.length} kategori
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {item.kategoriHarga.slice(0, 3).map((kategori) => (
                          <span
                            key={kategori.id_kategori_harga}
                            className="rounded-full bg-[#f8dfe8] px-2 py-0.5 text-[10px] text-[#7D344B]"
                          >
                            {kategori.nama_kategori}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="block text-center text-[11px] text-[#7D344B]/60">
                      Belum ada
                    </span>
                  )}
                </td>

                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-2">
                  <span className="text-[10px] md:text-sm">
                    {item.statusLayanan}
                  </span>
                </td>

                <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="flex shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-[10px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm"
                    >
                      <Pencil size={15} /> Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="border border-[#e2b6c4] px-3 py-6 text-center text-[#7D344B]/70"
                >
                  Data layanan belum tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}