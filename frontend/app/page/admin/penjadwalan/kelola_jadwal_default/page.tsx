"use client";

import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Kelola_Jadwal_Default_Content from "./components/kelola_jadwal_default_content";

export default function KelolaJadwalDefaultPage() {
    return (
        <section className="space-y-4">
            {/* Judul halaman */}
            <Judul_Halaman title="Kelola Jadwal Default" />
            <Kelola_Jadwal_Default_Content />
        </section>
    );
}