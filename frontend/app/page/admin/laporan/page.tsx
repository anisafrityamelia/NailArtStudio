"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import FilterLaporan from "./components/filter_laporan";
import CardStatistik from "./components/card_statistik";
import TabelLaporan from "./components/tabel_laporan";
import LayananTerlaris from "./components/layanan_terlaris";
import {
  getLaporanAdmin,
  type BarisLaporan,
  type StatistikLaporan,
  type LayananTerlaris as LayananTerlarisType,
} from "@/app/lib/laporan";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getCurrentUser } from "@/app/lib/auth";
import API_BASE_URL from "@/app/lib/api";

type LayananOption = {
  id_layanan: number;
  nama_layanan: string;
};

export default function LaporanPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [dataLaporan, setDataLaporan] = useState<BarisLaporan[]>([]);
  const [statistik, setStatistik] = useState<StatistikLaporan[]>([]);
  const [layananTerlaris, setLayananTerlaris] = useState<LayananTerlarisType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSampai, setTanggalSampai] = useState("");
  const [layanan, setLayanan] = useState<string>("Semua");
  const [layananOptions, setLayananOptions] = useState<string[]>(["Semua"]);

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
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const cekAuthDanAmbilLaporan = async () => {
      const user = await getCurrentUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      if (user.role !== "admin") {
        router.push("/auth/login");
        return;
      }

      setIsCheckingAuth(false);
      ambilLaporan();
    };

    cekAuthDanAmbilLaporan();
  }, [router]);

  useEffect(() => {
    const ambilDataLayanan = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/layanan`, {
          headers: {
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok) return;

        const options = result.data.map(
          (item: LayananOption) => item.nama_layanan
        );

        setLayananOptions(["Semua", ...options]);
      } catch (error) {
        console.error("Gagal mengambil data layanan:", error);
        setLayananOptions(["Semua"]);
      }
    };

    if (!isCheckingAuth) {
      ambilDataLayanan();
    }
  }, [isCheckingAuth]);
  
  const handleExport = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    const warnaMaroon: [number, number, number] = [125, 52, 75];
    const warnaPinkMuda: [number, number, number] = [253, 240, 244];

    const tanggalCetak = new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const periode =
      tanggalMulai && tanggalSampai
        ? `${tanggalMulai} - ${tanggalSampai}`
        : "Semua periode";

    // Judul utama
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Laporan Pendapatan", pageWidth / 2, 15, {
      align: "center",
    });

    // Info laporan
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Tanggal Cetak", 14, 27);
    doc.text("Periode", 14, 34);
    doc.text("Layanan", 14, 41);

    doc.setFont("helvetica", "normal");
    doc.text(":", 40, 27);
    doc.text(":", 40, 34);
    doc.text(":", 40, 41);

    doc.text(tanggalCetak, 45, 27);
    doc.text(periode, 45, 34);
    doc.text(layanan, 45, 41);

    // Judul Ringkasan Statistik
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Ringkasan Statistik", 14, 54);

    autoTable(doc, {
      startY: 59,
      head: [["No", "Statistik", "Nilai", "Keterangan"]],
      body: statistik.map((item, index) => [
        index + 1,
        item.judul,
        item.nilai,
        item.keterangan,
      ]),
      headStyles: {
        fillColor: warnaMaroon,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: {
          halign: "center",
          cellWidth: 12,
        },
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: warnaPinkMuda,
      },
      styles: {
        fontSize: 9,
        lineColor: [221, 152, 173],
        lineWidth: 0.1,
      },
    });

    const afterStatistik = (doc as any).lastAutoTable.finalY + 10;

    // Judul Data Pesanan
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Data Pesanan", 14, afterStatistik);

    autoTable(doc, {
      startY: afterStatistik + 5,
      head: [[
        "No",
        "Kode",
        "Tanggal",
        "Pelanggan",
        "Layanan",
        "Harga Final",
        "DP",
        "Pelunasan",
        "Status",
      ]],
      body: dataLaporan.map((item, index) => [
        index + 1,
        item.kodePesanan,
        item.tanggal,
        item.pelanggan,
        item.layanan,
        item.hargaFinal,
        item.dp,
        item.pelunasan,
        item.status,
      ]),
      headStyles: {
        fillColor: warnaMaroon,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: {
          halign: "center",
          cellWidth: 12,
        },
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: warnaPinkMuda,
      },
      styles: {
        fontSize: 7,
        lineColor: [221, 152, 173],
        lineWidth: 0.1,
      },
    });

    const afterPesanan = (doc as any).lastAutoTable.finalY + 10;

    // Judul Layanan Terlaris
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Layanan Terlaris", 14, afterPesanan);

    autoTable(doc, {
      startY: afterPesanan + 5,
      head: [["No", "Layanan", "Total Pesanan", "Persentase"]],
      body: layananTerlaris.map((item, index) => [
        index + 1,
        item.nama,
        item.total,
        `${item.persen}%`,
      ]),
      headStyles: {
        fillColor: warnaMaroon,
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: {
          halign: "center",
          cellWidth: 12,
        },
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: warnaPinkMuda,
      },
      styles: {
        fontSize: 9,
        lineColor: [221, 152, 173],
        lineWidth: 0.1,
      },
    });

    doc.save("laporan-pendapatan.pdf");
  };

  if (isCheckingAuth) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-semibold text-[#7D344B]">
          Memeriksa akses...
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* Judul halaman */}
      <Judul_Halaman title="Laporan" />

      {/* filter laporan */}
      <FilterLaporan
        tanggalMulai={tanggalMulai}
        tanggalSampai={tanggalSampai}
        layanan={layanan}
        layananOptions={layananOptions}
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