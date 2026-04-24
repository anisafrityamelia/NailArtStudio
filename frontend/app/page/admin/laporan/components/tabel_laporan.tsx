import type { BarisLaporanType } from "./data_dummy";

interface TabelLaporanProps {
  data: BarisLaporanType[];
}

export default function TabelLaporan({ data }: TabelLaporanProps) {
  return (
    <section className="rounded-xl border border-[#dd98ad] bg-[#fdf0f4] p-4 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:p-5">
      {/* judul section tabel */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#7d344b]">
          Detail Laporan Pendapatan
        </h2>
        <p className="mt-1 text-sm text-[#b17e8e]">
          Tabel ini menampilkan transaksi detail sesuai filter dari tanggal, sampai tanggal, dan layanan.
        </p>
      </div>

      {/* wrapper tabel supaya aman di mobile */}
      <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
        <div className="max-h-[330px] overflow-auto sm:max-h-[350px] xl:max-h-[360px]">
          <table className="min-w-[900px] w-full table-fixed border-collapse text-xs sm:text-sm">
            <thead className="sticky top-0 z-10 bg-[#dd98ad] text-[#7d344b]">
              <tr className="text-center">
                <th className="w-[6%] border border-[#c88ca1] px-2 py-2 sm:w-[5%] sm:px-3">
                  No
                </th>
                <th className="w-[15%] border border-[#c88ca1] px-2 py-2 sm:w-[14%] sm:px-3">
                  Kode Pesanan
                </th>
                <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">
                  Tanggal
                </th>
                <th className="w-[18%] border border-[#c88ca1] px-2 py-2 sm:w-[18%] sm:px-3">
                  Pelanggan
                </th>
                <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">
                  Layanan
                </th>
                <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">
                  Harga Final
                </th>
                <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">
                  DP
                </th>
                <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">
                  Pelunasan
                </th>
                <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[8%] sm:px-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white/70 font-medium text-[#7d344b]">
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">
                    {index + 1}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.kodePesanan}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">
                    {item.tanggal}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.pelanggan}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.layanan}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.hargaFinal}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.dp}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">
                    {item.pelunasan}
                  </td>

                  <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top sm:px-3">
                      {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}