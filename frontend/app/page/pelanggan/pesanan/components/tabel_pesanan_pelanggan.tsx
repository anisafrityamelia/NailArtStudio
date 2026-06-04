import { ReactNode } from "react";
import { DetailPesananPelanggan } from "./detail_pesanan_pelanggan/detail_pesanan_types";

type PropsTabelPesananPelanggan = {
    data: DetailPesananPelanggan[];
    renderActions: (item: DetailPesananPelanggan) => ReactNode;
};

export default function TabelPesananPelanggan({ data, renderActions }: PropsTabelPesananPelanggan) {
    return (
        <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto md:overflow-x-auto">
                <table className="w-full border-collapse table-fixed text-[11px] sm:text-xs md:min-w-[820px] md:text-sm">
                    <thead className="bg-[#dd98ad] text-[#7d344b]">
                        <tr className="text-center">
                            <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:hidden">
                                Aksi
                            </th>

                            <th className="w-[9%] border border-[#c88ca1] px-1 py-2 md:w-[4%] md:px-3">
                                No
                            </th>

                            <th className="w-[28%] border border-[#c88ca1] px-1 py-2 md:w-[11%] md:px-2">
                                Kode Pesanan
                            </th>

                            <th className="w-[21%] border border-[#c88ca1] px-1 py-2 md:w-[10%] md:px-3">
                                Layanan
                            </th>

                            <th className="w-[18%] border border-[#c88ca1] px-1 py-2 md:hidden">
                                Jadwal
                            </th>

                            <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[12%] md:px-3">
                                Tanggal
                            </th>

                            <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[10%] md:px-3">
                                Jam
                            </th>

                            <th className="w-[24%] border border-[#c88ca1] px-1 py-2 md:w-[16%] md:px-3">
                                Status
                            </th>

                            <th className="hidden border border-[#c88ca1] px-2 py-2 md:table-cell md:w-[12%] md:px-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white/70 text-[#7d344b] font-medium">
                        {data.map((item) => (
                            <tr key={item.kode}>
                                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:hidden">
                                    <div className="flex justify-center">
                                        {renderActions(item)}
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
                                    <p className="line-clamp-2 leading-tight">
                                        {item.layanan}
                                    </p>
                                </td>
                                
                                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:hidden">
                                    <span className="text-[10px] leading-tight">
                                        {(!item.tanggal || item.tanggal === "-" || !item.jam || item.jam === "-")
                                            ? "-"
                                            : `${new Date(item.tanggal).toLocaleDateString("id-ID")} - ${item.jam}`}
                                    </span>
                                </td>

                                <td className="hidden border border-[#e2b6c4] px-2 py-2 text-center align-top break-words md:table-cell md:px-3">
                                    {item.tanggal}
                                </td>

                                <td className="hidden border border-[#e2b6c4] px-2 py-2 text-center align-top break-words md:table-cell md:px-3">
                                    {item.jam}
                                </td>

                                <td className="border border-[#e2b6c4] px-1 py-2 text-center align-top md:px-3">
                                    <span className="text-[10px] leading-tight md:text-sm">
                                        {item.status}
                                    </span>
                                </td>

                                <td className="hidden border border-[#e2b6c4] px-2 py-2 align-top md:table-cell md:px-2">
                                    <div className="flex justify-center">
                                        {renderActions(item)}
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