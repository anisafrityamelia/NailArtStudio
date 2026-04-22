import type { Pesanan, StatistikDasbor } from "./type";

export const data_statistik_dummy: StatistikDasbor = {
    jumlah_pelanggan: 52,
    pesanan_masuk: 12,
    pesanan_selesai: 73,
};

export const data_pesanan_dummy: Pesanan[] = [
    {   
        kode: "ORD01023",
        pelanggan: "widay",
        layanan: "Nail Art",
        tanggal: "2025-11-06",
        jam: "11:00",
    },
    {   
        kode: "ORD01024",
        pelanggan: "anan",
        layanan: "Eyelash",
        tanggal: "2025-11-06",
        jam: "15:00",
    },
    {
        kode: "ORD01025",
        pelanggan: "anisa frity amelia",
        layanan: "Nail Art",
        tanggal: "2025-11-10",
        jam: "17:00",
    },
    {
        kode: "ORD01026",
        pelanggan: "anisa frity amelia",
        layanan: "Nail Art",
        tanggal: "2027-11-10",
        jam: "17:00",
    },
];