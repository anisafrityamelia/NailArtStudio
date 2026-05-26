"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Card_Statistik from "./components/card_statistik";
import Jadwal_Bulanan from "./components/jadwal_bulanan";
import Kalender_Pesanan from "./components/kalender_pesanan";
import {
    getStatistikDasborAdmin,
    StatistikDasborAdmin,
    getJadwalBulananAdmin,
    JadwalBulananAdmin,
} from "@/app/lib/pesanan";
import { getCurrentUser } from "@/app/lib/auth";

export default function DasborAdminPage() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [statistikDasbor, setStatistikDasbor] = useState<StatistikDasborAdmin>({
        jumlah_pelanggan: 0,
        pesanan_aktif: 0,
        pesanan_selesai: 0,
    });

    const [loadingStatistik, setLoadingStatistik] = useState(true);

    const hari_ini = new Date();

    const daftar_tahun_final = [
        hari_ini.getFullYear() - 1,
        hari_ini.getFullYear(),
        hari_ini.getFullYear() + 1,
    ];

    const [bulan_aktif, set_bulan_aktif] = useState(hari_ini.getMonth());
    const [tahun_aktif, set_tahun_aktif] = useState(hari_ini.getFullYear());

    const [daftarPesananBulanan, setDaftarPesananBulanan] = useState<JadwalBulananAdmin[]>([]);
    const [loadingJadwalBulanan, setLoadingJadwalBulanan] = useState(true);

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

    useEffect(() => {
        const ambilStatistikDasbor = async () => {
            try {
                setLoadingStatistik(true);

                const data = await getStatistikDasborAdmin();

                setStatistikDasbor(data);
            } catch (error) {
                console.error("Gagal mengambil statistik dasbor:", error);
            } finally {
                setLoadingStatistik(false);
            }
        };

        if (!isCheckingAuth) {
            ambilStatistikDasbor();
        }
    }, [isCheckingAuth]);

    useEffect(() => {
        const ambilJadwalBulanan = async () => {
            try {
                setLoadingJadwalBulanan(true);

                const data = await getJadwalBulananAdmin(
                    bulan_aktif + 1,
                    tahun_aktif
                );

                setDaftarPesananBulanan(data);
            } catch (error) {
                console.error("Gagal mengambil jadwal bulanan:", error);
                setDaftarPesananBulanan([]);
            } finally {
                setLoadingJadwalBulanan(false);
            }
        };

        if (!isCheckingAuth) {
            ambilJadwalBulanan();
        }
    }, [isCheckingAuth, bulan_aktif, tahun_aktif]);

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

            {loadingStatistik ? (
                <p className="text-sm font-semibold text-[#7D344B]">
                    Memuat statistik...
                </p>
            ) : (
                <Card_Statistik data={statistikDasbor} />
            )}

            {loadingJadwalBulanan ? (
                <section className="rounded-[12px] border border-[#dd98ad] bg-[#fdf0f4] p-4 text-[13px] text-[#b06d82] shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:p-5">
                    Memuat jadwal bulanan...
                </section>
            ) : (
                <Jadwal_Bulanan
                    daftar_pesanan={daftarPesananBulanan}
                    bulan_aktif={bulan_aktif}
                    tahun_aktif={tahun_aktif}
                    daftar_tahun={daftar_tahun_final}
                    on_ganti_bulan={set_bulan_aktif}
                    on_ganti_tahun={set_tahun_aktif}
                />
            )}

            <Kalender_Pesanan
                bulan_aktif={bulan_aktif}
                tahun_aktif={tahun_aktif}
                daftar_pesanan={daftarPesananBulanan}
                on_bulan_sebelumnya={handle_bulan_sebelumnya}
                on_bulan_berikutnya={handle_bulan_berikutnya}
            />
        </section>
    );
}