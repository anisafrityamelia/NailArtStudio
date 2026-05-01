"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Card_Statistik from "./components/card_statistik";
import Jadwal_Bulanan from "./components/jadwal_bulanan";
import Kalender_Pesanan from "./components/kalender_pesanan";
import { data_pesanan_dummy, data_statistik_dummy } from "./components/data_dummy";
import { getCurrentUser } from "@/app/lib/auth";

export default function DasborAdminPage() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const hari_ini = new Date();

    {/* ambil semua tahun yang ada di database */}
    const semua_tahun = data_pesanan_dummy
        .map((item) => {
            if (!item.tanggal) return null;
            const parsed = new Date(item.tanggal);
            if (Number.isNaN(parsed.getTime())) return null;
            return parsed.getFullYear();
        })
        .filter((tahun): tahun is number => tahun !== null);
    
    {/* hapus tahun duplikat, urutkan dari terkecil */}
    const daftar_tahun = Array.from(new Set(semua_tahun)).sort((a, b) => a - b);

    {/* daftar tahun kosong, pakai tahun hari ini */}
    const daftar_tahun_final =
        daftar_tahun.length > 0 ? daftar_tahun : [hari_ini.getFullYear()];

    const [bulan_aktif, set_bulan_aktif] = useState(10);
    const [tahun_aktif, set_tahun_aktif] = useState(2025);

    useEffect(() => {
        const cekAuthAdmin = async () => {
            const user = await getCurrentUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            if (user.role !== "admin") {
                router.push("/auth/login");
                return;
            }

            setIsCheckingAuth(false);
        };

        cekAuthAdmin();
    }, [router]);

    {/* ambil pesanan sesuai bulan dan tahun terpilih */}
    const daftar_pesanan_terfilter = data_pesanan_dummy.filter((item) => {
        if (!item.tanggal) return false;

        const parsed = new Date(item.tanggal);
        if (Number.isNaN(parsed.getTime())) return false;

        return (
            parsed.getMonth() === bulan_aktif &&
            parsed.getFullYear() === tahun_aktif
        );
    });

    function handle_bulan_sebelumnya() {
        if (bulan_aktif === 0) {
            const index_tahun = daftar_tahun_final.indexOf(tahun_aktif);

            if (index_tahun > 0) {
                set_bulan_aktif(11);
                set_tahun_aktif(daftar_tahun_final[index_tahun - 1]);
            }
            return;
        }

        set_bulan_aktif((prev) => prev - 1);
    }

    function handle_bulan_berikutnya() {
        if (bulan_aktif === 11) {
            const index_tahun = daftar_tahun_final.indexOf(tahun_aktif);

            if (index_tahun < daftar_tahun_final.length - 1) {
                set_bulan_aktif(0);
                set_tahun_aktif(daftar_tahun_final[index_tahun + 1]);
            }
            return;
        }

        set_bulan_aktif((prev) => prev + 1);
    }

    if (isCheckingAuth) {
        return (
            <section className="flex min-h-screen items-center justify-center">
                <p className="text-sm font-semibold text-[#7D344B]">
                    Memeriksa akses...
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-5">
            <Judul_Halaman title="Dasbor Admin" />

            <Card_Statistik data={data_statistik_dummy} />

            <Jadwal_Bulanan
                daftar_pesanan={daftar_pesanan_terfilter}
                bulan_aktif={bulan_aktif}
                tahun_aktif={tahun_aktif}
                daftar_tahun={daftar_tahun_final}
                on_ganti_bulan={set_bulan_aktif}
                on_ganti_tahun={set_tahun_aktif}
            />

            <Kalender_Pesanan
                bulan_aktif={bulan_aktif}
                tahun_aktif={tahun_aktif}
                daftar_pesanan={daftar_pesanan_terfilter}
                on_bulan_sebelumnya={handle_bulan_sebelumnya}
                on_bulan_berikutnya={handle_bulan_berikutnya}
            />
        </section>
    );
}