"use client";

import { useState } from "react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Kelola_Layanan, {type Baris_Kelola_Layanan} from "./components/tabel_kelola_layanan";
import ModalEditLayanan from "./components/modal_edit_layanan";
import Card_Keunggulan_Beranda from "./components/card_keunggulan_beranda";
import Card_Galeri_Beranda from "./components/card_galeri_beranda";
import Card_Kontak_Beranda from "./components/card_kontak_beranda";

export default function KelolaLayananPage() {
    const data: Baris_Kelola_Layanan[] = [
        {
            no: 1,
            layanan: "Nail Art",
            deskripsi: "Layanan nail art dengan desain cantik dan stylish yang bisa disesuaikan dengan keinginanmu. Dikerjakan dengan detail dan bahan berkualitas untuk hasil yang tahan lama dan cocok untuk berbagai acara.",
            estimasiHarga: 80000,
            durasi: 120,
            gambar1: "/galeri 1.jpeg",
            gambar2: "/galeri 6.jpeg",
            gambar3: "/galeri 9.jpeg",
            gambar4: "/galeri 8.jpeg",
            statusLayanan: "Aktif",
        },
        {
            no: 2,
            layanan: "Press On",
            deskripsi: "Press-on nails praktis dengan desain menarik dan bisa custom sesuai style kamu. Mudah dipakai dan tetap memberikan tampilan kuku yang cantik tanpa perlu ke salon.",
            estimasiHarga: 75000,
            durasi: 60,
            gambar1: "/galeri 2.jpeg",
            gambar2: "/galeri 3.jpeg",
            gambar3: "/galeri 7.jpeg",
            gambar4: "/galeri 8.jpeg",
            statusLayanan: "Aktif",
        },
        {
            no: 3,
            layanan: "Eyelash",
            deskripsi: "Layanan remove untuk melepas nail art, gel, atau eyelash extension dengan aman tanpa merusak kuku.",
            estimasiHarga: 85000,
            durasi: 120,
            gambar1: "/galeri 5.jpeg",
            gambar2: "/galeri 5.jpeg",
            gambar3: "/galeri 4.jpeg",
            gambar4: "/galeri 4.jpeg",
            statusLayanan: "Aktif",
        },
        {
            no: 4,
            layanan: "Remove",
            deskripsi: "Layanan eyelash extension untuk tampilan mata yang lebih cantik dan on point. Tersedia berbagai style mulai dari natural hingga bold, dengan hasil ringan, nyaman, dan tahan lama.",
            estimasiHarga: 50000,
            durasi: 60,
            gambar1: "/galeri 10.jpeg",
            gambar2: "/galeri 10.jpeg",
            gambar3: "/galeri 10.jpeg",
            gambar4: "/galeri 10.jpeg",
            statusLayanan: "Aktif",
        },
        {
            no: 5,
            layanan: "Course",
            deskripsi: "Lorem ipsum",
            estimasiHarga: 250000,
            durasi: 240,
            gambar1: "/galeri 11.jpeg",
            gambar2: "/galeri 11.jpeg",
            gambar3: "/galeri 11.jpeg",
            gambar4: "/galeri 11.jpeg",
            statusLayanan: "Nonaktif",
        },
    ];
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState<Baris_Kelola_Layanan | null>(null);

    function handleBukaModalEdit(item: Baris_Kelola_Layanan) {
        setDataEdit(item);
        setIsModalEditOpen(true);
    }

    function handleTutupModalEdit() {
        setIsModalEditOpen(false);
        setDataEdit(null);
    }

    return (
        <>
            <section>
                {/* Judul halaman */}
                <Judul_Halaman title="Kelola Layanan" />

                {/* Tabel kelola layanan */}
                <Tabel_Kelola_Layanan
                    data={data}
                    onEdit={handleBukaModalEdit}
                />
            </section>

            <section className="mt-10 space-y-5">
                <Judul_Halaman title="Kelola Beranda" />

                <Card_Keunggulan_Beranda />
                <Card_Galeri_Beranda />
                <Card_Kontak_Beranda />
            </section>

            <ModalEditLayanan
                isOpen={isModalEditOpen}
                onClose={handleTutupModalEdit}
                data={dataEdit}
                onSubmit={() => handleTutupModalEdit()}
            />
        </>
    );
}