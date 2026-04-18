"use client";

import { useState } from "react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Kelola_Layanan, {type Baris_Kelola_Layanan} from "./components/tabel_kelola_layanan";
import ModalEditLayanan from "./components/modal_edit_layanan";
import Card_Keunggulan_Beranda from "./components/card_keunggulan_beranda";

export default function KelolaLayananPage() {
    const data: Baris_Kelola_Layanan[] = [
        {
            no: 1,
            layanan: "Nail Art",
            deskripsi: "Lorem ipsum",
            estimasiHarga: 80000,
            durasi: 120,
            gambar: "/V.jfif",
            statusLayanan: "Aktif",
        },
        {
            no: 2,
            layanan: "Press On",
            deskripsi: "Lorem ipsum",
            estimasiHarga: 75000,
            durasi: 60,
            gambar: "/V1.jfif",
            statusLayanan: "Aktif",
        },
        {
            no: 3,
            layanan: "Eyelash",
            deskripsi: "Lorem ipsum",
            estimasiHarga: 85000,
            durasi: 120,
            gambar: "/V.jfif",
            statusLayanan: "Aktif",
        },
        {
            no: 4,
            layanan: "Remove",
            deskripsi: "Lorem ipsum",
            estimasiHarga: 50000,
            durasi: 60,
            gambar: "/V1.jfif",
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