"use client"; 

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
    InputReadonly,
    TextareaReadonly,
} from "../components/detail_pesanan_fields";

export default function PembayaranRemove() {
    const router = useRouter();

    return (
        <main className="relative min-h-screen overflow-y-auto px-4 sm:px-6">
            <div
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/background (burgundy).png')" }}
            />
            <div className="fixed inset-0 bg-black/40" />

            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <section className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-[#ffecf2] shadow-[0_12px_35px_rgba(125,52,75,0.20)] shadow-soft-text">
                    <div className="sticky top-0 z-10 flex items-center border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-3 shadow-soft-text">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="cursor-pointer rounded-full p-1 text-[#7D344B] hover:bg-[#f8dfe8]"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <h1 className="flex-1 text-center text-sm font-semibold text-[#7d344b] sm:text-base">
                            Pembayaran
                        </h1>

                        <div className="w-[18px]" />
                    </div>

                    <div className="space-y-4 px-5 py-4 text-xs text-[#7D344B] sm:text-sm">
                        <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
                            <h2 className="mb-4 text-sm font-semibold sm:text-base">
                                Detail Pesanan
                            </h2>

                            <div className="space-y-3">
                                <InputReadonly label="Kode Pesanan" value="ORD003" />
                                <InputReadonly label="Nama Pelanggan" value="Widayy" />
                                <InputReadonly label="Layanan" value="Remove" />
                                <InputReadonly label="Tanggal" value="2 September 2025" />
                                <InputReadonly label="Jam" value="14:00" />
                                <InputReadonly label="Bagian Kuku" value="Jari Tangan" />
                                <TextareaReadonly label="Catatan" value="-" />
                            </div>
                        </div>

                        <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
                            <h2 className="mb-4 text-sm font-semibold sm:text-base">
                                Detail Pembayaran
                            </h2>

                            <p className="mb-4 text-xs font-medium leading-relaxed sm:text-sm">
                                Silakan lakukan pembayaran DP sebesar Rp50.000 melalui transfer ke rekening
                                berikut, kemudian unggah bukti transfer Anda untuk verifikasi.
                            </p>

                            <div className="space-y-3">
                                <InputReadonly label="BCA" value="1234567890" />
                                <InputReadonly label="BNI" value="9876543210" />
                                <InputReadonly label="Mandiri" value="1122334455" />
                            </div>
                        </div>

                        <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
                            <h2 className="mb-4 text-sm font-semibold sm:text-base">
                                Unggah Bukti Transfer
                            </h2>

                            <input
                                type="file"
                                className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#e6b1c2] file:px-3 file:py-1 file:text-white hover:file:bg-[#dd98ad]"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push("/page/pemesanan/notif_berhasil")}
                            className="mt-1 cursor-pointer w-full rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm mb-2"
                            >
                            Kirim
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}