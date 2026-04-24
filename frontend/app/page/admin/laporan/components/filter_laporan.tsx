"use client";

import { ExternalLink } from "lucide-react";
import { pilihanLayanan, type LayananType } from "./data_dummy";

interface FilterLaporanProps {
  tanggalMulai: string;
  tanggalSampai: string;
  layanan: LayananType;
  setTanggalMulai: (value: string) => void;
  setTanggalSampai: (value: string) => void;
  setLayanan: (value: LayananType) => void;
  onTerapkan: () => void;
  onExport: () => void;
}

export default function FilterLaporan({
  tanggalMulai,
  tanggalSampai,
  layanan,
  setTanggalMulai,
  setTanggalSampai,
  setLayanan,
  onTerapkan,
  onExport,
}: FilterLaporanProps) {
  return (
    <div className="flex flex-col-reverse gap-4 xl:flex-row xl:items-end xl:justify-between">
      {/* area input filter */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4 items-end">
        {/* Input dari tanggal */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#7d344b]">Dari Tanggal</label>
          <input
            type="date"
            value={tanggalMulai}
            onChange={(e) => setTanggalMulai(e.target.value)}
            className="h-8 rounded border border-[#dd98ad] bg-[#dd98ad] px-3 text-sm text-[#7d344b] outline-none"
          />
        </div>

        {/* Input sampai tanggal */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#7d344b]">Sampai Tanggal</label>
          <input
            type="date"
            value={tanggalSampai}
            onChange={(e) => setTanggalSampai(e.target.value)}
            className="h-8 rounded border border-[#dd98ad] bg-[#dd98ad] px-3 text-sm text-[#7d344b] outline-none"
          />
        </div>

        {/* Dropdown layanan */}
        <div className="col-span-2 flex flex-col gap-2 xl:col-span-1">
          <label className="text-sm font-medium text-[#7d344b]">Layanan</label>
          <select
            value={layanan}
            onChange={(e) => setLayanan(e.target.value as LayananType)}
            className="h-8 rounded border border-[#dd98ad] bg-[#dd98ad] px-3 text-sm text-[#7d344b] outline-none cursor-pointer"
          >
            {pilihanLayanan.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Tombol terapkan */}
        <div className="col-span-2 mt-2 flex flex-col justify-end xl:col-span-1">
          <button
            type="button"
            onClick={onTerapkan}
            className="h-8 rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-5 text-sm font-medium text-white hover:opacity-95 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[2px] shadow-soft-text"
          >
            Terapkan
          </button>
        </div>
      </div>

      {/* Tombol export */}
      <div>
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1 h-8 rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-3 text-sm font-medium text-white hover:opacity-95 cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[2px] shadow-soft-text"
        >
          <ExternalLink size={16} strokeWidth={2.5} />
          Ekspor
        </button>
      </div>
    </div>
  );
}