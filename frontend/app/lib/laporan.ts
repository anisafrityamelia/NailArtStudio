import API_BASE_URL from "./api";
import { getToken } from "./auth";

export type LayananType = string;

export type StatistikLaporan = {
  id: number;
  judul: string;
  nilai: string;
  keterangan: string;
};

export type BarisLaporan = {
  id: number;
  kodePesanan: string;
  tanggal: string;
  pelanggan: string;
  layanan: string;
  hargaFinal: string;
  dp: string;
  pelunasan: string;
  status: string;
};

export type LayananTerlaris = {
  id: number;
  nama: string;
  total: string;
  persen: number;
};

export type FilterLaporan = {
  tanggalMulai: string;
  tanggalSampai: string;
  layanan: LayananType;
};

export type ResponseLaporan = {
  message: string;
  data: BarisLaporan[];
  statistik: StatistikLaporan[];
  layananTerlaris: LayananTerlaris[];
};

export const getLaporanAdmin = async (
  filter: FilterLaporan
): Promise<ResponseLaporan> => {
  const token = getToken();

  const params = new URLSearchParams();

  if (filter.tanggalMulai) {
    params.append("tanggal_mulai", filter.tanggalMulai);
  }

  if (filter.tanggalSampai) {
    params.append("tanggal_sampai", filter.tanggalSampai);
  }

  if (filter.layanan !== "Semua") {
    params.append("layanan", filter.layanan);
  }

  const response = await fetch(
    `${API_BASE_URL}/admin/laporan?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil laporan");
  }

  return result;
};