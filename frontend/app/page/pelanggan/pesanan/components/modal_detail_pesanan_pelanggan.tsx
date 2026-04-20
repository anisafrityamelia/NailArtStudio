"use client";

import { X } from "lucide-react";
import { DetailPesananPelanggan } from "./detail_pesanan_pelanggan/detail_pesanan_types";
import {
    InputReadonly,
    UploadPreviewReadonly,
} from "./detail_pesanan_pelanggan/detail_pesanan_fields";
import DetailDesainNailArt from "./detail_pesanan_pelanggan/detail_desain_nail_art";
import DetailDesainPressOn from "./detail_pesanan_pelanggan/detail_desain_presson";
import DetailDesainRemove from "./detail_pesanan_pelanggan/detail_desain_remove";
import DetailDesainEyelash from "./detail_pesanan_pelanggan/detail_desain_eyelash";

type PropsModalDetailPesananPelanggan = {
    isOpen: boolean;
    onClose: () => void;
    data?: DetailPesananPelanggan | null;
};

function RenderDetailDesain({
    layanan,
    data,
}: {
    layanan?: string;
    data?: DetailPesananPelanggan | null;
}) {
    switch (layanan?.toLowerCase()) {
        case "nail art":
            return <DetailDesainNailArt data={data} />;

        case "press on":
        case "presson":
            return <DetailDesainPressOn data={data} />;

        case "remove":
            return <DetailDesainRemove data={data} />;

        case "eyelash":
            return <DetailDesainEyelash data={data} />;

        default:
            return (
                <div className="rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-sm text-[#7D344B]">
                    Detail desain belum tersedia.
                </div>
            );
    }
}

export default function ModalDetailPesananPelanggan({
  isOpen,
  onClose,
  data,
}: PropsModalDetailPesananPelanggan) {
  if (!isOpen) return null;

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
            <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-[#ffecf2] shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] shadow-soft-text bg-[#ffecf2] px-5 py-4">
                    <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
                        Detail Pesanan
                    </h2>
                    <button
                        onClick={onClose}
                        type="button"
                        className="rounded-full p-1 text-[#7D344B] transition hover:bg-[#f8dfe8] cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6 px-5 py-5">
                    <div className="rounded-lg border border-[#dd98ad] shadow-soft-text bg-[#ffecf2] p-4">
                        <h3 className="mb-4 text-sm font-semibold text-[#7D344B] sm:text-base">
                            Detail Pesanan
                        </h3>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <InputReadonly label="Kode Pesanan" value={data?.kode} />
                            <InputReadonly label="Layanan" value={data?.layanan} />
                            <InputReadonly label="Tanggal" value={data?.tanggal} />
                            <InputReadonly label="Jam" value={data?.jam} />
                            <InputReadonly label="Status" value={data?.status} />
                        </div>
                    </div>

                    <div className="rounded-lg border border-[#dd98ad] shadow-soft-text bg-[#ffecf2] p-4">
                        <h3 className="mb-4 text-sm font-semibold text-[#7D344B] sm:text-base">
                            Detail Desain
                        </h3>
                        <RenderDetailDesain layanan={data?.layanan} data={data} />
                    </div>

                    <div className="rounded-lg border border-[#dd98ad] shadow-soft-text bg-[#ffecf2] p-4">
                        <h3 className="mb-4 text-sm font-semibold text-[#7D344B] sm:text-base">
                            Detail Pembayaran
                        </h3>

                        <div className="grid grid-cols-1 gap-3">
                            <UploadPreviewReadonly
                                label="Bukti Transfer"
                                src={data?.buktiTransfer}
                                alt="Bukti Transfer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}