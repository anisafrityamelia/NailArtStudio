"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/pelanggan/navbar";
import Sidebar from "@/app/components/pelanggan/sidebar";

export default function PelangganLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    // Mengatur buka tutup sidebar mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Mengatur mode sidebar desktop: penuh atau hanya icon
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Menutup sidebar mobile otomatis saat pindah halaman
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    return (
        // Kerangka utama halaman pelanggan
        <div className="flex h-[100svh] flex-col overflow-hidden bg-[#ffecf2]">
            <Navbar onMenuClick={() => setIsSidebarOpen((current) => !current)} />
  
            {/* Area isi pelanggan: sidebar di kiri, konten di kanan */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    isOpen={isSidebarOpen}
                    isCollapsed={isSidebarCollapsed}
                    onClose={() => setIsSidebarOpen(false)}
                    onToggleCollapse={() =>
                        setIsSidebarCollapsed((current) => !current)
                    }
                />
  
                {/* Konten halaman yang bisa di-scroll */}
                <main className="flex-1 min-w-0 min-h-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10 lg:py-8 shadow-soft-text">
                    {children}
                </main>
            </div>
        </div>
    );
}