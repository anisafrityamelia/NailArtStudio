"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type DataPesanan = {
  no?: number;
  kode?: string;
  pelanggan?: string;
  layanan?: string;
  tanggal?: string;
  jam?: string;
  status?: string;
};

type PropsModalUbahStatusPesanan = {
  isOpen: boolean;
  onClose: () => void;
  data?: DataPesanan | null;
  radioOptions: string[];
  onSubmit?: (payload: {
    kode?: string;
    hargaFinal: string;
    status: string;
    catatanAdmin: string;
  }) => void;
};

function InputReadonly({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[#7D344B] sm:text-sm">
        {label}
      </label>
      <input
        type="text"
        value={value ?? ""}
        readOnly
        className="w-full rounded-md border border-[#dd98ad] shadow-soft-text bg-white px-3 py-2 text-xs text-[#7D344B] outline-none sm:text-sm"
      />
    </div>
  );
}

export default function ModalUbahStatusPesanan({
  isOpen,
  onClose,
  data,
  radioOptions,
  onSubmit,
}: PropsModalUbahStatusPesanan) {
  const currentStatus = data?.status?.trim();

  const opsiStatus =
    currentStatus && !radioOptions.includes(currentStatus)
      ? [currentStatus, ...radioOptions]
      : radioOptions;

  const [hargaFinal, setHargaFinal] = useState("");
  const [statusPesanan, setStatusPesanan] = useState("");
  const [statusAwal, setStatusAwal] = useState("");
  const [catatanAdmin, setCatatanAdmin] = useState("");

  useEffect(() => {
    if (isOpen) {
      setHargaFinal("");
      setStatusPesanan(data?.status ?? "");
      setStatusAwal(data?.status ?? "");
      setCatatanAdmin("");
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (statusPesanan === statusAwal) {
      alert("Status pesanan wajib diubah ke pilihan lain.");
      return;
    }

    onSubmit?.({
      kode: data?.kode,
      hargaFinal,
      status: statusPesanan,
      catatanAdmin,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-[#ffecf2] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4 shadow-soft-text">
          <h2 className="text-base font-semibold text-[#7D344B] sm:text-lg">
            Ubah Status Pesanan
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-[#7D344B] transition hover:bg-[#f8dfe8]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-5 py-5">
          <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
            <h3 className="mb-4 text-sm font-semibold text-[#7D344B] sm:text-base">
              Detail Pesanan
            </h3>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputReadonly label="Kode Pesanan" value={data?.kode} />
              <InputReadonly label="Nama Pelanggan" value={data?.pelanggan} />
              <InputReadonly label="Layanan" value={data?.layanan} />
              <InputReadonly label="Tanggal" value={data?.tanggal} />
              <InputReadonly label="Jam" value={data?.jam} />
              <InputReadonly label="Status Saat Ini" value={data?.status} />
            </div>
          </div>

          <div className="rounded-lg border border-[#dd98ad] bg-[#ffecf2] p-4 shadow-soft-text">
            <h3 className="mb-4 text-sm font-semibold text-[#7D344B] sm:text-base">
              Ubah Status
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#7D344B] sm:text-sm">
                  Harga Final
                </label>
                <input
                  type="text"
                  value={hargaFinal}
                  onChange={(e) => setHargaFinal(e.target.value)}
                  placeholder="Masukkan harga final"
                  required
                  className="w-full rounded-md border border-[#dd98ad] shadow-soft-text bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm cursor-text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium text-[#7D344B] sm:text-sm">Status Pesanan</p>

                <div className="flex flex-col gap-2">
                  {opsiStatus.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-xs text-[#7D344B] sm:text-sm cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="status_pesanan"
                        value={option}
                        checked={statusPesanan === option}
                        onChange={(e) => setStatusPesanan(e.target.value)}
                        className="h-4 w-4 accent-[#7D344B] cursor-pointer"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#7D344B] sm:text-sm">
                  Catatan
                </label>
                <textarea
                  value={catatanAdmin}
                  onChange={(e) => setCatatanAdmin(e.target.value)}
                  placeholder="Berikan catatan jika pesanan dibatalkan"
                  rows={4}
                  className="w-full resize-none rounded-md border border-[#dd98ad] shadow-soft-text bg-white px-3 py-2 text-xs text-[#7D344B] outline-none transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:text-sm cursor-text"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-xs font-medium text-white transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm shadow-soft-text"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}