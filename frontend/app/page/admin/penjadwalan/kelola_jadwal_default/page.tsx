"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Kelola_Jadwal_Default_Content from "./components/kelola_jadwal_default_content";
import { getCurrentUser } from "@/app/lib/auth";

export default function KelolaJadwalDefaultPage() {
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
        <section className="space-y-4">
            {/* Judul halaman */}
            <Judul_Halaman title="Kelola Jadwal Default" />
            <Kelola_Jadwal_Default_Content />
        </section>
    );
}