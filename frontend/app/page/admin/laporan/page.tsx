"use client";

import { useEffect, useState } from "react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import FilterLaporan from "./components/filter_laporan";
import CardStatistik from "./components/card_statistik";
import TabelLaporan from "./components/tabel_laporan";
import LayananTerlaris from "./components/layanan_terlaris";
import {
  getLaporanAdmin,
  type LayananType,
  type BarisLaporan,
  type StatistikLaporan,
  type LayananTerlaris as LayananTerlarisType,
} from "@/app/lib/laporan";

export default function LaporanPage() {
  const [dataLaporan, setDataLaporan] = useState<BarisLaporan[]>([]);
  const [statistik, setStatistik] = useState<StatistikLaporan[]>([]);
  const [layananTerlaris, setLayananTerlaris] = useState<LayananTerlarisType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");
  const [layanan, setLayanan] = useState<LayananType>("Semua");

  async function ambilLaporan() {
    try {
      setIsLoading(true);

      const result = await getLaporanAdmin({
        tanggalMulai,
        tanggalSampai,
        layanan,
      });

      setDataLaporan(result.data ?? []);
      setStatistik(result.statistik ?? []);
      setLayananTerlaris(result.layananTerlaris ?? []);
    } catch (error: any) {
      alert(error.message || "Gagal mengambil data laporan");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    ambilLaporan();
  }, []);
  
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
        loading={isLoading}
        setTanggalMulai={setTanggalMulai}
        setTanggalSampai={setTanggalSampai}
        setLayanan={setLayanan}
        onTerapkan={ambilLaporan}
        onExport={handleExport}
      />

      {/* card statistik */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 xl:grid-cols-3 mt-6">
        {statistik.map((item) => (
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
        {isLoading ? (
          <section className="rounded-xl border border-[#dd98ad] bg-[#fdf0f4] p-5 text-sm text-[#7d344b] shadow-[0_3px_8px_rgba(160,84,108,0.18)]">
            Memuat laporan...
          </section>
        ) : (
          <TabelLaporan data={dataLaporan} />
        )}
        <LayananTerlaris data={layananTerlaris} />
      </div>
    </section>
  );
}