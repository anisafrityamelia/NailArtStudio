"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pesanan } from "./type";

type Props = {
    bulan_aktif: number;
    tahun_aktif: number;
    daftar_pesanan: Pesanan[];
    on_bulan_sebelumnya: () => void;
    on_bulan_berikutnya: () => void;
};

const nama_hari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
];

const nama_bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

function ambil_jumlah_hari_dalam_bulan(tahun: number, bulan: number) {
    return new Date(tahun, bulan + 1, 0).getDate();
}

function ambil_index_hari_pertama(tahun: number, bulan: number) {
    const hari = new Date(tahun, bulan, 1).getDay();
    return hari === 0 ? 6 : hari - 1;
}

function buat_key_tanggal(tahun: number, bulan: number, tanggal: number) {
    return `${tahun}-${String(bulan + 1).padStart(2, "0")}-${String(tanggal).padStart(2, "0")}`;
}

export default function Kalender_Pesanan({
    bulan_aktif,
    tahun_aktif,
    daftar_pesanan,
    on_bulan_sebelumnya,
    on_bulan_berikutnya,
}: Props) {
    const jumlah_hari = ambil_jumlah_hari_dalam_bulan(tahun_aktif, bulan_aktif);
    const index_hari_pertama = ambil_index_hari_pertama(tahun_aktif, bulan_aktif);

    const pesanan_per_tanggal = daftar_pesanan.reduce<Record<string, Pesanan[]>>(
        (hasil, item) => {
            if (!item.tanggal) return hasil;

            if (!hasil[item.tanggal]) {
                hasil[item.tanggal] = [];
            }

            hasil[item.tanggal].push(item);
            return hasil;
        },
        {}
    );

    const sel_kosong = Array.from({ length: index_hari_pertama });

    const daftar_tanggal = Array.from({ length: jumlah_hari }, (_, index) => {
        const nomor_tanggal = index + 1;
        const key_tanggal = buat_key_tanggal(tahun_aktif, bulan_aktif, nomor_tanggal);

        return {
            nomor_tanggal,
            key_tanggal,
            daftar_pesanan: pesanan_per_tanggal[key_tanggal] || [],
        };
    });

    const sisa_kotak =
        (7 - ((sel_kosong.length + daftar_tanggal.length) % 7)) % 7;

    return (
        <section className="rounded-[12px] border border-[#dd98ad] bg-[#fdf0f4] p-5 shadow-[0_3px_8px_rgba(160,84,108,0.18)]">
            <h2 className="mb-5 text-[16px] font-semibold text-[#7d344b]">
                Kalender
            </h2>

            <div className="mb-5 flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={on_bulan_sebelumnya}
                    className="text-[#7d344b] transition hover:opacity-80 cursor-pointer"
                >
                    <ChevronLeft className="h-[20px] w-[20px]" strokeWidth={2.4} />
                </button>

                <div className="rounded-[4px] bg-[#dd98ad] px-4 py-1.5 text-[13px] sm:text-[14px] font-medium text-[#7d344b]">
                    {nama_bulan[bulan_aktif]} {tahun_aktif}
                </div>

                <button
                    type="button"
                    onClick={on_bulan_berikutnya}
                    className="text-[#7d344b] transition hover:opacity-80 cursor-pointer"
                >
                    <ChevronRight className="h-[20px] w-[20px]" strokeWidth={2.4} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[980px] overflow-hidden rounded-[10px] border border-[#7d344b]">
                    {/* Header nama hari */}
                    <div className="grid grid-cols-7">
                        {nama_hari.map((hari, index) => (
                            <div
                                key={hari}
                                className={`bg-[#DD98AD] px-3 py-2 text-center text-[13px] sm:text-[14px] font-medium text-[#7d344b] ${
                                    index !== nama_hari.length - 1 ? "border-r border-[#7d344b]" : ""
                                }`}
                            >
                                {hari}
                            </div>
                        ))}
                    </div>

                    {/* Isi tanggal */}
                    <div className="grid grid-cols-7 border-t border-[#7d344b]">
                        {sel_kosong.map((_, index) => {
                            const kolom_terakhir = (index + 1) % 7 === 0;

                            return (
                                <div
                                    key={`kosong-${index}`}
                                    className={`min-h-[92px] bg-[#fdf0f4] p-2 ${
                                        !kolom_terakhir ? "border-r border-[#7d344b]" : ""
                                    } border-b border-[#7d344b]`}
                                />
                            );
                        })}

                        {daftar_tanggal.map((item, index) => {
                            const posisi = index + sel_kosong.length;
                            const kolom_terakhir = (posisi + 1) % 7 === 0;

                            return (
                                <div
                                    key={item.key_tanggal}
                                    className={`min-h-[92px] bg-[#fdf0f4] p-2 ${
                                        !kolom_terakhir ? "border-r border-[#7d344b]" : ""
                                    } border-b border-[#7d344b]`}
                                >
                                    <p className="text-[13px] font-semibold text-[#7d344b]">
                                        {item.nomor_tanggal}
                                    </p>

                                    <div className="mt-1 space-y-1">
                                        {item.daftar_pesanan.slice(0, 3).map((pesanan, idx) => (
                                            <div
                                                key={`${pesanan.kode || item.key_tanggal}-${idx}`}
                                                className="truncate text-[11px] leading-tight text-[#b06d82]"
                                                title={`${pesanan.jam || ""} | ${pesanan.pelanggan || ""} | ${pesanan.layanan || ""}`}
                                            >
                                                <span className="mr-1 inline-block h-[7px] w-[7px] rounded-full bg-[#7d344b]" />
                                                {pesanan.jam} | {pesanan.pelanggan}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {Array.from({ length: sisa_kotak }).map((_, index) => {
                            const posisi = sel_kosong.length + daftar_tanggal.length + index;
                            const kolom_terakhir = (posisi + 1) % 7 === 0;

                            return (
                                <div
                                    key={`akhir-kosong-${index}`}
                                    className={`min-h-[92px] bg-[#fdf0f4] p-2 ${
                                        !kolom_terakhir ? "border-r border-[#7d344b]" : ""
                                    } border-b border-[#7d344b]`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}