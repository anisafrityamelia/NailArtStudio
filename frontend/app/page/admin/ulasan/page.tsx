"use client";

import { useState } from "react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Filter_Ulasan from "./components/filter_ulasan";
import Tabel_Ulasan from "./components/tabel_ulasan";
import Modal_Hapus from "@/app/components/ui/modal_hapus";

type Ulasan = {
  no: number;
  kode: string,
  pelanggan: string;
  layanan: string,
  ulasan: string,
  rating: number;
  foto: string,
};

export default function UlasanPage() {
  // Data sementara untuk isi tabel ulasan
    const data: Ulasan[] = [
        {
            no: 1,
            kode: "ORD01023",
            pelanggan: "widayy",
            layanan: "Nail Art",
            ulasan: "bagus",
            rating: 4,
            foto: "/galeri 6.jpeg",
        },
        {
            no: 2,
            kode: "ORD03024",
            pelanggan: "anann",
            layanan: "Eyelash",
            ulasan: "bagus",
            rating: 4,
            foto: "/galeri 4.jpeg",
        },
        {
            no: 3,
            kode: "ORD02025",
            pelanggan: "Rani",
            layanan: "Press On",
            ulasan: "bagus",
            rating: 4,
            foto: "/galeri 2.jpeg",
        },
        {
            no: 4,
            kode: "ORD01026",
            pelanggan: "anisa fitriy amelia",
            layanan: "Remove",
            ulasan: "bagus",
            rating: 4,
            foto: "/galeri 10.jpeg",
        },
    ];

    const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);
    const [dataHapus, setDataHapus] = useState<Ulasan | null>(null);
    
    function handleBukaModalHapus(item: Ulasan) {
        setDataHapus(item);
        setIsModalHapusOpen(true);
    }
    
    function handleTutupModalHapus() {
        setIsModalHapusOpen(false);
        setDataHapus(null);
    }
    
    function handleKonfirmasiHapus() {
        handleTutupModalHapus();
    }

    return (
        <>
            <section>
                {/* Judul halaman */}
                <Judul_Halaman title="Kelola Ulasan" />

                {/* Filter data */}
                <Filter_Ulasan 
                    layananOptions={["Layanan", "Nail Art", "Eyelash", "Press On"]}
                    ratingOptions={["Rating", "1", "2", "3", "4", "5"]}
                />

                {/* Tabel daftar ulasan */}
                <Tabel_Ulasan 
                    data={data} 
                    onDelete={handleBukaModalHapus}
                />
            </section>

            <Modal_Hapus
                isOpen={isModalHapusOpen}
                onClose={handleTutupModalHapus}
                onConfirm={handleKonfirmasiHapus}
            />
        </>
    );
}