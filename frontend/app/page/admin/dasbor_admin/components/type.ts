export type Pesanan = {
    kode?: string;
    pelanggan?: string;
    layanan?: string;
    tanggal?: string;
    jam?: string;
};

export type StatistikDasbor = {
    jumlah_pelanggan: number;
    pesanan_masuk: number;
    pesanan_selesai: number;
};