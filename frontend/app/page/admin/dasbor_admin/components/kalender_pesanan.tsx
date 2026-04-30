"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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

    const [tanggal_dipilih, set_tanggal_dipilih] = useState<{
        nomor_tanggal: number;
        key_tanggal: string;
        daftar_pesanan: Pesanan[];
    } | null>(null);

    return (
        <section className="rounded-[12px] border border-[#dd98ad] bg-[#fdf0f4] p-5 shadow-[0_3px_8px_rgba(160,84,108,0.18)]">
            <h2 className="mb-5 text-[16px] font-semibold text-[#7d344b]">
                Kalender
            </h2>

            <div className="mb-5 grid grid-cols-[32px_160px_32px] items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={on_bulan_sebelumnya}
                    className="flex h-8 w-8 items-center justify-center text-[#7d344b] transition hover:opacity-80 cursor-pointer"
                >
                    <ChevronLeft className="h-[20px] w-[20px]" strokeWidth={2.4} />
                </button>

                <div className="rounded-[4px] bg-[#dd98ad] px-4 py-1.5 text-center text-[13px] sm:text-[14px] font-medium text-[#7d344b]">
                    {nama_bulan[bulan_aktif]} {tahun_aktif}
                </div>

                <button
                    type="button"
                    onClick={on_bulan_berikutnya}
                    className="flex h-8 w-8 items-center justify-center text-[#7d344b] transition hover:opacity-80 cursor-pointer"
                >
                    <ChevronRight className="h-[20px] w-[20px]" strokeWidth={2.4} />
                </button>
            </div>

            {/* tampilan kalender versi mobile */}
            <div className="block sm:hidden">
                <div className="grid grid-cols-7 text-center text-[13px] text-[#7d344b]">
                    {nama_hari.map((hari) => (
                        <div key={hari}>{hari.slice(0, 3)}</div>
                    ))}
                </div>

                <div className="mt-3 grid grid-cols-7 gap-y-3 text-center">
                    {sel_kosong.map((_, index) => (
                        <div key={`mobile-kosong-${index}`} />
                    ))}

                    {daftar_tanggal.map((item) => {
                        const punya_pesanan = item.daftar_pesanan.length > 0;
                        const aktif = tanggal_dipilih?.key_tanggal === item.key_tanggal;

                        return (
                            <button
                                key={item.key_tanggal}
                                type="button"
                                onClick={() => {
                                    if (punya_pesanan) {
                                        set_tanggal_dipilih(item);
                                    }
                                }}
                                className="flex min-h-[42px] flex-col items-center justify-center text-[#7d344b]"
                            >
                                <span
                                    className={`flex h-[32px] w-[32px] items-center justify-center rounded-full text-[15px] ${
                                        aktif ? "bg-[#7d344b] text-white" : ""
                                    }`}
                                >
                                    {item.nomor_tanggal}
                                </span>

                                {punya_pesanan && (
                                    <span className="mt-1 h-[6px] w-[6px] rounded-full bg-[#7d344b]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* tampilan kalender versi desktop */}
            <div className="hidden overflow-x-auto sm:block">
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

                                        {item.daftar_pesanan.length > 3 && (
                                            <p className="text-[11px] font-medium text-[#7d344b]">
                                                +{item.daftar_pesanan.length - 3} lainnya
                                            </p>
                                        )}
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

            {/* modal pesanan muncul saat tanggal di kalender mobile diklik */}
            {tanggal_dipilih && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
                    <div className="w-full max-w-[360px] rounded-lg bg-white p-4 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <p className="text-[13px] text-[#b06d82]">
                                    {nama_bulan[bulan_aktif]} {tahun_aktif}
                                </p>

                                <h3 className="text-[16px] font-semibold text-[#7d344b]">
                                    Tanggal {tanggal_dipilih.nomor_tanggal}
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={() => set_tanggal_dipilih(null)}
                                className="flex h-7 w-7 items-center justify-center cursor-pointer rounded-full p-1 text-[#7D344B] transition hover:bg-[#f8dfe8]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[300px] space-y-2 overflow-y-auto pr-1">
                            {tanggal_dipilih.daftar_pesanan.map((pesanan, index) => (
                                <div
                                    key={`${pesanan.kode || tanggal_dipilih.key_tanggal}-${index}`}
                                    className="rounded-md bg-[#ffecf2] p-3 text-[13px] text-[#7d344b]"
                                >
                                    <p className="font-semibold">
                                        {pesanan.pelanggan || "Tanpa nama"}
                                    </p>

                                    <p className="mt-1 text-[#b06d82]">
                                        {pesanan.jam || "-"} • {pesanan.layanan || "-"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}