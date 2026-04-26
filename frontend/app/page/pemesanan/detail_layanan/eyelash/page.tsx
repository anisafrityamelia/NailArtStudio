"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function DetailLayananEyelash() {
    const router = useRouter();

    const dataLayanan = {
        layanan: "Eyelash",
        deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        estimasiHarga: 100000,
        gambar1: "/galeri 5.jpeg",
        gambar2: "/galeri 5.jpeg",
        gambar3: "/galeri 4.jpeg",
        gambar4: "/galeri 4.jpeg",
        pesanUrl: "/page/pemesanan/pemesanan_layanan/eyelash",
    };

    const daftarGambar = [
        dataLayanan.gambar1,
        dataLayanan.gambar2,
        dataLayanan.gambar3,
        dataLayanan.gambar4,
    ];

    const formatRupiah = (harga: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(harga);
    };

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
                            className="cursor-pointer rounded-full p-1 text-[#7D344B] transition hover:bg-[#f8dfe8]"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <h1 className="flex-1 text-center text-sm font-semibold text-[#7d344b] sm:text-base">
                            Detail Layanan
                        </h1>

                        <div className="w-[18px]" />
                    </div>

                    <div className="space-y-4 px-5 py-4 text-xs text-[#7D344B] sm:text-sm">
                        <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
                            <h2 className="mb-3 text-base font-semibold text-[#7D344B]">
                                {dataLayanan.layanan}
                            </h2>

                            <p className=" text-[#7D344B] text-justify">
                                {dataLayanan.deskripsi}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {daftarGambar.map((gambar, index) => (
                                <img
                                    key={index}
                                    src={gambar}
                                    alt={`${dataLayanan.layanan} ${index + 1}`}
                                    className="h-32 w-full rounded-md object-cover shadow-soft-text sm:h-36"
                                />
                            ))}
                        </div>

                        <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
                            <div className="space-y-1 text-[#7D344B]">
                                <p className="text-sm font-semibold">
                                    Estimasi Harga:
                                </p>
                                <p className="text-xl font-semibold tracking-wide">
                                    {formatRupiah(dataLayanan.estimasiHarga)}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.push(dataLayanan.pesanUrl)}
                            className="mt-1 cursor-pointer w-full rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm mb-2"
                        >
                            Pesan Sekarang
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}