"use client";

import { useState } from "react";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Tabel_Ulasan, {type Baris_Ulasan_Pelanggan} from "./components/tabel_ulasan";
import Modal_Hapus from "@/app/components/ui/modal_hapus";
import ModalTambahUlasanPelanggan from "./components/modal_tambah_ulasan_pelanggan";
import ModalEditUlasanPelanggan from "./components/modal_edit_ulasan_pelanggan";

export default function UlasanPage() {
    const data: Baris_Ulasan_Pelanggan[] = [
        {
            no: 1,
            kode: "ORD03012",
            layanan: "Eyelash",
            tanggal: "06-Jul-25",
            ulasan: "Good mantap",
            rating: 5,
            gambar: "/galeri 4.jpeg",
        },
        {
            no: 2,
            kode: "ORD02018",
            layanan: "Press On",
            tanggal: "",
            ulasan: "",
            rating: "",
            gambar: "",
        },
        {
            no: 3,
            kode: "ORD01021",
            layanan: "Nail Art",
            tanggal: "17-Okt-25",
            ulasan: "",
            rating: "",
            gambar: "",
        },
        {
            no: 4,
            kode: "ORD01022",
            layanan: "Remove",
            tanggal: "18-Okt-25",
            ulasan: "",
            rating: "",
            gambar: "",
        },
    ];

    const [isModalTambahUlasanOpen, setIsModalTambahUlasanOpen] = useState(false);
    const [isModalEditUlasanOpen, setIsModalEditUlasanOpen] = useState(false);
    const [isModalHapusOpen, setIsModalHapusOpen] = useState(false);

    const [dataUlasan, setDataUlasan] = useState<Baris_Ulasan_Pelanggan | null>(null);
    const [dataHapus, setDataHapus] = useState<Baris_Ulasan_Pelanggan | null>(null);

    function handleBukaModalTambahUlasan(item: Baris_Ulasan_Pelanggan) {
        setDataUlasan(item);
        setIsModalTambahUlasanOpen(true);
    }

    function handleBukaModalEditUlasan(item: Baris_Ulasan_Pelanggan) {
        setDataUlasan(item);
        setIsModalEditUlasanOpen(true);
    }
        
    function handleBukaModalHapus(item: Baris_Ulasan_Pelanggan) {
        setDataHapus(item);
        setIsModalHapusOpen(true);
    }

    function handleTutupModalTambahUlasan() {
        setIsModalTambahUlasanOpen(false);
        setDataUlasan(null);
    }

    function handleTutupModalEditUlasan() {
        setIsModalEditUlasanOpen(false);
        setDataUlasan(null);
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
                <Judul_Halaman title="Ulasan Saya" />

                {/* Tabel daftar ulasan */}
                <Tabel_Ulasan 
                    data={data}
                    onEdit={handleBukaModalEditUlasan}
                    onBeriUlasan={handleBukaModalTambahUlasan}
                    onDelete={handleBukaModalHapus}
                />
            </section>

            <ModalTambahUlasanPelanggan
                isOpen={isModalTambahUlasanOpen}
                onClose={handleTutupModalTambahUlasan}
                data={dataUlasan}
                onSubmit={(payload) => {
                    console.log("Simpan ulasan:", payload);
                }}
            />

            <ModalEditUlasanPelanggan
                isOpen={isModalEditUlasanOpen}
                onClose={handleTutupModalEditUlasan}
                data={dataUlasan}
                onSubmit={(payload) => {
                    console.log("Update ulasan:", payload);
                }}
            />

            <Modal_Hapus
                isOpen={isModalHapusOpen}
                onClose={handleTutupModalHapus}
                onConfirm={handleKonfirmasiHapus}
            />
        </>
    );
}