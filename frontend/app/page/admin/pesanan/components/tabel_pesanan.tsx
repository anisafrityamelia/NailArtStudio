import { ReactNode } from "react";
import { DetailPesanan } from "../components/detail_pesanan/detail_pesanan_types";

export type Baris_Pesanan = DetailPesanan;

type Props_Tabel_Pesanan = {
  data: Baris_Pesanan[];
  renderActions: (item: Baris_Pesanan) => ReactNode;
  highlightMenungguKonfirmasi?: boolean;
};

export default function Tabel_Pesanan({ data, renderActions, highlightMenungguKonfirmasi = false }: Props_Tabel_Pesanan) {
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

              <th className="w-[5%] border border-[#c88ca1] px-1 py-2 md:w-[4%] md:px-3">
                No
              </th>

              {/* Kode Pesanan hanya desktop */}
              <th className="w-[14%] border border-[#c88ca1] px-1 py-2 text-center leading-tight md:table-cell md:w-[11%]">
                Kode Pesanan
              </th>

              <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:w-[14%] md:px-3">
                Pelanggan
              </th>

              <th className="w-[16%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                Layanan
              </th>

              {/* Jadwal khusus mobile */}
              <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:hidden">
                Jadwal
              </th>

              {/* Tanggal hanya desktop */}
              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[10%] md:px-3">
                Tanggal
              </th>

              {/* Jam hanya desktop */}
              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[8%] md:px-3">
                Jam
              </th>

              <th className="w-[16%] border border-[#c88ca1] px-1 py-2 md:w-[15%] md:px-3">
                Status
              </th>

              {/* Aksi khusus desktop */}
              <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[14%] md:px-3">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/70 text-[#7d344b] font-medium">
            {data.map((item) => {
              const isMenungguKonfirmasi =
                highlightMenungguKonfirmasi &&
                item.status === "Menunggu Konfirmasi";

              return (
                <tr
                  key={item.kode}
                  className={
                    isMenungguKonfirmasi
                      ? "bg-[#F7D8DE]"
                      : ""
                  }
                >
                  {/* Aksi khusus mobile */}
                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:hidden">
                    <div className="flex justify-center">
                      {renderActions(item)}
                    </div>
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                    {item.no}
                  </td>

                  {/* Kode Pesanan hanya desktop */}
                  <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                    <p className="line-clamp-2 break-words leading-tight">
                      {item.kode}
                    </p>
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                    <p className="line-clamp-2 break-words leading-tight">
                      {item.pelanggan}
                    </p>
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 align-top md:px-3">
                    <p className="line-clamp-2 break-words leading-tight">
                      {item.layanan}
                    </p>
                  </td>

                  {/* Jadwal khusus mobile */}
                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:hidden">
                    <span className="text-[10px] leading-tight">
                      {!item.tanggal ||
                      item.tanggal === "-" ||
                      !item.jam ||
                      item.jam === "-"
                        ? "-"
                        : `${item.tanggal} - ${item.jam}`}
                    </span>
                  </td>

                  {/* Tanggal hanya desktop */}
                  <td className="hidden border border-[#e2b6c4] px-2 py-2 text-center align-top break-words md:table-cell md:px-3">
                    {item.tanggal}
                  </td>

                  {/* Jam hanya desktop */}
                  <td className="hidden border border-[#e2b6c4] px-2 py-2 text-center align-top break-words md:table-cell md:px-3">
                    {item.jam}
                  </td>

                  <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                    <span className="text-[10px] leading-tight md:text-sm">
                      {item.status}
                    </span>
                  </td>

                  {/* Aksi khusus desktop */}
                  <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell md:px-2">
                    <div className="flex justify-center">
                      {renderActions(item)}
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