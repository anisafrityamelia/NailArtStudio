"use client";

import { useState } from "react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import FilterLaporan from "./components/filter_laporan";
import CardStatistik from "./components/card_statistik";
import TabelLaporan from "./components/tabel_laporan";
import LayananTerlaris from "./components/layanan_terlaris";
import {
  dummyStatistik,
  dummyTabelLaporan,
  dummyLayananTerlaris,
  type LayananType,
} from "./components/data_dummy";

export default function LaporanPage() {
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");
  const [layanan, setLayanan] = useState<LayananType>("Semua");

  const handleTerapkan = () => {};
  
  const handleExport = () => {};

  return (
    <section>
      {/* Judul halaman */}
      <Judul_Halaman title="Laporan" />

      {/* filter laporan */}
      <FilterLaporan
        tanggalMulai={tanggalMulai}
        tanggalSampai={tanggalSampai}
        layanan={layanan}
        setTanggalMulai={setTanggalMulai}
        setTanggalSampai={setTanggalSampai}
        setLayanan={setLayanan}
        onTerapkan={handleTerapkan}
        onExport={handleExport}
      />

      {/* card statistik */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
        {dummyStatistik.map((item) => (
          <CardStatistik
            key={item.id}
            judul={item.judul}
            nilai={item.nilai}
            keterangan={item.keterangan}
          />
        ))}
      </div>

      {/* tabel dan layanan terlaris */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_320px] mt-6">
        <TabelLaporan data={dummyTabelLaporan} />
        <LayananTerlaris data={dummyLayananTerlaris} />
      </div>
    </section>
  );
}