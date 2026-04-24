export type LayananType = "Semua" | "Nail Art" | "Press On" | "Eyelash" | "Remove" | "Kursus";

export const pilihanLayanan: LayananType[] = [
  "Semua",
  "Nail Art",
  "Press On",
  "Eyelash",
  "Remove",
  "Kursus",
];

{/* dummy card statistik */}
export const dummyStatistik = [
  {
    id: 1,
    judul: "Total Pesanan",
    nilai: "45",
    keterangan: "Akumulasi dari Jan-Des 2026",
  },
  {
    id: 2,
    judul: "Pesanan Selesai",
    nilai: "42",
    keterangan: "93% dari total pesanan",
  },
  {
    id: 3,
    judul: "DP Masuk",
    nilai: "Rp2.100.000",
    keterangan: "42 pembayaran tervalidasi",
  },
  {
    id: 4,
    judul: "Total Uang Masuk",
    nilai: "Rp6.000.000",
    keterangan: "DP + Pelunasan",
  },
  {
    id: 5,
    judul: "Nilai Pesanan",
    nilai: "Rp5.900.000",
    keterangan: "Dari harga final",
  },
  {
    id: 6,
    judul: "Sisa Pelunasan",
    nilai: "Rp100.000",
    keterangan: "1 pesanan belum lunas",
  },
];

{/* type data tabel dummy */}
export interface BarisLaporanType {
  id: number;
  kodePesanan: string;
  tanggal: string;
  pelanggan: string;
  layanan: string;
  hargaFinal: string;
  dp: string;
  pelunasan: string;
  status: string;
}

{/* dummy data tabel laporan */}
export const dummyTabelLaporan: BarisLaporanType[] = [
  {
    id: 1,
    kodePesanan: "ORD01023",
    tanggal: "03-Nov-25",
    pelanggan: "Widayy",
    layanan: "Remove",
    hargaFinal: "Rp150.000",
    dp: "Rp50.000",
    pelunasan: "Rp50.000",
    status: "Selesai",
  },
  {
    id: 2,
    kodePesanan: "ORD01024",
    tanggal: "04-Nov-25",
    pelanggan: "Anann",
    layanan: "Eyelash",
    hargaFinal: "Rp127.000",
    dp: "Rp50.000",
    pelunasan: "Rp77.000",
    status: "Selesai",
  },
  {
    id: 3,
    kodePesanan: "ORD01025",
    tanggal: "04-Nov-25",
    pelanggan: "Raniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
    layanan: "Press On",
    hargaFinal: "Rp125.000",
    dp: "Rp50.000",
    pelunasan: "Rp75.000",
    status: "Selesai",
  },
  {
    id: 4,
    kodePesanan: "ORD01026",
    tanggal: "08-Nov-25",
    pelanggan: "Anisa Frity Amelia",
    layanan: "Nail Art",
    hargaFinal: "Rp300.000",
    dp: "Rp50.000",
    pelunasan: "Rp250.000",
    status: "Selesai",
  },
  {
    id: 5,
    kodePesanan: "ORD01027",
    tanggal: "10-Nov-25",
    pelanggan: "Latifa",
    layanan: "Kursus",
    hargaFinal: "Rp450.000",
    dp: "Rp50.000",
    pelunasan: "Rp350.000",
    status: "Selesai",
  },
  {
    id: 6,
    kodePesanan: "ORD01028",
    tanggal: "12-Nov-25",
    pelanggan: "Fitria",
    layanan: "Press On",
    hargaFinal: "Rp180.000",
    dp: "Rp80.000",
    pelunasan: "Rp100.000",
    status: "Selesai",
  },
  {
    id: 7,
    kodePesanan: "ORD01028",
    tanggal: "12-Nov-25",
    pelanggan: "Fitria",
    layanan: "Press On",
    hargaFinal: "Rp180.000",
    dp: "Rp80.000",
    pelunasan: "Rp100.000",
    status: "Selesai",
  },
  {
    id: 8,
    kodePesanan: "ORD01028",
    tanggal: "12-Nov-25",
    pelanggan: "Fitria",
    layanan: "Press On",
    hargaFinal: "Rp180.000",
    dp: "Rp80.000",
    pelunasan: "Rp100.000",
    status: "Selesai",
  },
  {
    id: 9,
    kodePesanan: "ORD01028",
    tanggal: "12-Nov-25",
    pelanggan: "Fitria",
    layanan: "Press On",
    hargaFinal: "Rp180.000",
    dp: "Rp80.000",
    pelunasan: "Rp100.000",
    status: "Selesai",
  },
  {
    id: 10,
    kodePesanan: "ORD01028",
    tanggal: "12-Nov-25",
    pelanggan: "Fitria",
    layanan: "Press On",
    hargaFinal: "Rp180.000",
    dp: "Rp80.000",
    pelunasan: "Rp100.000",
    status: "Selesai",
  },
  {
    id: 11,
    kodePesanan: "ORD01028",
    tanggal: "12-Nov-25",
    pelanggan: "Fitria",
    layanan: "Press On",
    hargaFinal: "Rp180.000",
    dp: "Rp80.000",
    pelunasan: "Rp100.000",
    status: "Selesai",
  },
  {
    id: 12,
    kodePesanan: "ORD01028",
    tanggal: "12-Nov-25",
    pelanggan: "Fitria",
    layanan: "Press On",
    hargaFinal: "Rp180.000",
    dp: "Rp80.000",
    pelunasan: "Rp100.000",
    status: "Selesai",
  },
];

{/* dummy data layanan terlaris */}
export const dummyLayananTerlaris = [
  { id: 1, nama: "Nail Art", total: "4 Pesanan", persen: 100 },
  { id: 2, nama: "Press On", total: "3 Pesanan", persen: 75 },
  { id: 3, nama: "Eyelash", total: "2 Pesanan", persen: 50 },
  { id: 4, nama: "Remove", total: "2 Pesanan", persen: 50 },
  { id: 5, nama: "Kursus", total: "1 Pesanan", persen: 25 },
];