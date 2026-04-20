export type DetailPesananPelanggan = {
  no?: number;
  kode?: string;
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
  buktiTransfer?: string | null;
};