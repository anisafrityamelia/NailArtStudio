export type DetailPesanan = {
  no?: number;
  kode?: string;
  pelanggan?: string;
  layanan?: string;
  tanggal?: string;
  jam?: string;
  status?: string;

  // Nail Art
  gambarReferensi?: string | null;
  bagianKuku?: string;
  layananTambahan?: string;

  // Press On
  fotoJariKanan?: string | null;
  fotoJempolKanan?: string | null;
  fotoJariKiri?: string | null;
  fotoJempolKiri?: string | null;
  shapeKuku?: string;
  metodePengambilan?: string;
  alamatPengiriman?: string;

  // Eyelash
  jenisLash?: string;

  // Umum
  catatan?: string;

  // Pembayaran
  kodePembayaran?: string;
  nominalPembayaran?: string;
  hargaFinal?: string;
  statusPembayaran?: string;
  tanggalPembayaran?: string;
  tanggalVerifikasi?: string;
  catatanPembayaran?: string;
  buktiTransfer?: string | null;
};