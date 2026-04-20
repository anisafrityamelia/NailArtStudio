import { ReactNode } from "react";
import { DetailPesananPelanggan } from "./detail_pesanan_pelanggan/detail_pesanan_types";

type PropsTabelPesananPelanggan = {
    data: DetailPesananPelanggan[];
    renderActions: (item: DetailPesananPelanggan) => ReactNode;
};

export default function TabelPesananPelanggan({ data, renderActions }: PropsTabelPesananPelanggan) {
    return (
        <div className="rounded-md border border-[#d3a0b0] bg-white/40 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-[820px] w-full table-fixed border-collapse text-xs sm:min-w-0 sm:text-sm">
                    <thead className="bg-[#dd98ad] text-[#7d344b]">
                        <tr className="text-center">
                            <th className="w-[6%] border border-[#c88ca1] px-2 py-2 sm:w-[4%] sm:px-3">No</th>
                            <th className="w-[14%] border border-[#c88ca1] px-2 py-2 sm:w-[11%] sm:px-2">Kode Pesanan</th>
                            <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Layanan</th>
                            <th className="w-[14%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">Tanggal</th>
                            <th className="w-[10%] border border-[#c88ca1] px-2 py-2 sm:w-[10%] sm:px-3">Jam</th>
                            <th className="w-[16%] border border-[#c88ca1] px-2 py-2 sm:w-[16%] sm:px-3">Status</th>
                            <th className="w-[12%] border border-[#c88ca1] px-2 py-2 sm:w-[12%] sm:px-3">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white/70 text-[#7d344b] font-medium">
                        {data.map((item) => (
                            <tr key={item.kode}>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.no}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-all sm:px-3 sm:break-words">{item.kode}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.layanan}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-words sm:px-3">{item.tanggal}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 text-center align-top break-words sm:px-3">{item.jam}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top break-all sm:px-3 sm:break-words">{item.status}</td>
                                <td className="border border-[#e2b6c4] px-2 py-2 align-top sm:px-2">{renderActions(item)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}