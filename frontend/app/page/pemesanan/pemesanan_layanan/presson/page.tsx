"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { bookingPressOn } from "@/app/lib/pesanan";

function PanduanPreview({
    label,
    src,
    alt,
    onClick,
}: {
    label: string;
    src: string;
    alt: string;
    onClick: () => void;
}) {
    return (
        <div>
            <p className="font-semibold">{label}</p>

            <button
                type="button"
                onClick={onClick}
                className="mt-2 inline-block cursor-pointer overflow-hidden rounded-md"
            >
                <img
                    src={src}
                    alt={alt}
                    className="h-24 w-auto max-w-full rounded-md object-contain shadow-soft-text"
                />
            </button>

            <p className="mt-1 text-[11px] text-red-500">
                *Klik gambar untuk melihat dengan lebih jelas
            </p>
        </div>
    );
}

export default function PemesananPressOn() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idLayanan = searchParams.get("id_layanan");
    const [gambarInspo, setGambarInspo] = useState<File | null>(null);
    const [fotoJariKanan, setFotoJariKanan] = useState<File | null>(null);
    const [fotoJempolKanan, setFotoJempolKanan] = useState<File | null>(null);
    const [fotoJariKiri, setFotoJariKiri] = useState<File | null>(null);
    const [fotoJempolKiri, setFotoJempolKiri] = useState<File | null>(null);
    const [shapeKuku, setShapeKuku] = useState("Almond");
    const [metode, setMetode] = useState("antar");
    const [alamat, setAlamat] = useState("");
    const [catatan, setCatatan] = useState("");
    const [previewGambar, setPreviewGambar] = useState<string | null>(null);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");

        if (!idLayanan) {
            setError("ID layanan tidak ditemukan");
            return;
        }

        if (!fotoJariKanan || !fotoJempolKanan || !fotoJariKiri || !fotoJempolKiri) {
            setError("Semua foto jari wajib diunggah");
            return;
        }

        if (metode === "antar" && !alamat) {
            setError("Alamat pengiriman wajib diisi");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("id_layanan", idLayanan);

            if (gambarInspo) {
                formData.append("gambar_inspo", gambarInspo);
            }

            formData.append("foto_jari_kanan", fotoJariKanan);
            formData.append("foto_jempol_kanan", fotoJempolKanan);
            formData.append("foto_jari_kiri", fotoJariKiri);
            formData.append("foto_jempol_kiri", fotoJempolKiri);

            formData.append("shape_kuku", shapeKuku);
            formData.append("metode_pengambilan", metode);
            formData.append("alamat_pengiriman", alamat);
            formData.append("catatan", catatan);

            const result = await bookingPressOn(formData);

            const idPesanan = result.data.id_pesanan;

            router.push(`/page/pemesanan/pembayaran?id=${idPesanan}`);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                            className="cursor-pointer rounded-full p-1 text-[#7D344B] hover:bg-[#f8dfe8]"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <h1 className="flex-1 text-center text-sm font-semibold text-[#7d344b] sm:text-base">
                            Pemesanan Press On
                        </h1>

                        <div className="w-[18px]" />
                    </div>
          
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 px-5 py-4 text-xs text-[#7D344B] sm:text-sm"
                    >
                        <div>
                            <label className="font-semibold">Layanan</label>
                            <input
                                type="text"
                                value="Press On"
                                readOnly
                                className="mt-2 w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Unggah Gambar Referensi</label>
                            <div className="mt-2 flex">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setGambarInspo(e.target.files[0]);
                                        }
                                    }}
                                    className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#dd98ad] file:cursor-pointer"
                                />
                            </div>
                        </div>

                        <PanduanPreview
                            label="Panduan Foto Jari"
                            src="/contoh-foto.jpeg"
                            alt="Panduan Foto Jari"
                            onClick={() => setPreviewGambar("/contoh-foto.jpeg")}
                        />

                        <div>
                            <label className="font-semibold">Unggah Foto Jari Kanan</label>
                            <div className="mt-2 flex">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFotoJariKanan(e.target.files[0]);
                                        }
                                    }}
                                    className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#dd98ad] file:cursor-pointer"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-semibold">Unggah Foto Jempol Kanan</label>
                            <div className="mt-2 flex">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFotoJempolKanan(e.target.files[0]);
                                        }
                                    }}
                                    className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#dd98ad] file:cursor-pointer"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-semibold">Unggah Foto Jari Kiri</label>
                            <div className="mt-2 flex">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFotoJariKiri(e.target.files[0]);
                                        }
                                    }}
                                    className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#dd98ad] file:cursor-pointer"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-semibold">Unggah Foto Jempol Kiri</label>
                            <div className="mt-2 flex">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFotoJempolKiri(e.target.files[0]);
                                        }
                                    }}
                                    className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#d88fa5] file:px-3 file:py-1 file:text-white file:bg-[#e6b1c2] hover:file:bg-[#dd98ad] file:cursor-pointer"
                                />
                            </div>
                        </div>

                        <PanduanPreview
                            label="Panduan Shape Kuku"
                            src="/shape-kuku.jpeg"
                            alt="Panduan Shape Kuku"
                            onClick={() => setPreviewGambar("/shape-kuku.jpeg")}
                        />

                        <div>
                            <label className="font-semibold">Shape Kuku</label>
                            <select
                                value={shapeKuku}
                                onChange={(e) => setShapeKuku(e.target.value)}
                                className="mt-2 w-full cursor-pointer rounded-md border border-[#dd98ad] bg-white px-3 py-1.5 text-xs text-[#7D344B] outline-none transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm shadow-soft-text"
                            >
                                <option>Almond</option>
                                <option>Square</option>
                                <option>Oval</option>
                                <option>Coffin</option>
                                <option>Stiletto</option>
                                <option>Round</option>
                            </select>
                        </div>

                        <div>
                            <p className="font-semibold">Metode Pengambilan</p>

                            <div className="mt-2 flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="metode"
                                    value="ambil"
                                    checked={metode === "ambil"}
                                    onChange={(e) => setMetode(e.target.value)}
                                    className="h-4 w-4 accent-[#7D344B] cursor-pointer"
                                />
                                <span>Ambil ke studio</span>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="metode"
                                    value="antar"
                                    checked={metode === "antar"}
                                    onChange={(e) => setMetode(e.target.value)}
                                    className="h-4 w-4 accent-[#7D344B] cursor-pointer"
                                />
                                <span>Diantar ke rumah (ongkir menyesuaikan jarak)</span>
                            </div>
                        </div>

                        {/* alamat */}
                        {metode === "antar" && (
                            <div>
                                <label className="font-semibold">Alamat Pengiriman</label>
                                <textarea
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    rows={3}
                                    className="mt-2 w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                                />
                            </div>
                        )}

                        {/* Catatan */}
                        <div>
                            <label className="font-semibold">Catatan (Opsional)</label>
                            <textarea
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                                rows={3}
                                placeholder="Masukkan catatan tambahan jika ada"
                                className="mt-2 w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm"
                            />
                        </div>

                        {error && (
                            <p className="text-center text-sm font-medium text-red-600">
                                {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-1 cursor-pointer w-full rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-1.5 text-xs font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm mb-2 disabled:opacity-60"
                        >
                            {loading ? "Memproses..." : "Pesan"}
                        </button>
                    </form>
                </section>
            </div>

            {/* modal preview */}
            {previewGambar && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
                    <div className="relative w-full max-w-4xl rounded-lg bg-white p-3 shadow-2xl">
                        <button
                            onClick={() => setPreviewGambar(null)}
                            className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1 text-[#7D344B] hover:bg-[#f8dfe8] cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex max-h-[80vh] items-center justify-center p-4">
                            <img
                                src={previewGambar}
                                className="max-h-[72vh] w-auto max-w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}