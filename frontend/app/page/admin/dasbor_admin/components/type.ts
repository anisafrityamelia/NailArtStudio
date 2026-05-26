export type Pesanan = {
    kode?: string;
    pelanggan?: string;
    layanan?: string;
    tanggal?: string;
    jam?: string;
};

export type StatistikDasbor = {
    jumlah_pelanggan: number;
    pesanan_aktif: number;
    pesanan_selesai: number;
};