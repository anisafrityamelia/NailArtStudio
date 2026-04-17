"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    House,
    ShoppingCart,
    MessageSquareText,
    Menu,
    X,
} from "lucide-react";

type SidebarProps = {
    isOpen: boolean;
    isCollapsed: boolean;
    onClose: () => void;
    onToggleCollapse: () => void;
};

// Daftar menu utama sidebar pelanggan
const menuItems = [
    {
        title: "Dasbor Pelanggan",
        href: "/page/pelanggan/dasbor_pelanggan",
        icon: LayoutDashboard,
    },
    {
        title: "Halaman Utama",
        href: "/",
        icon: House,
    },
    {
        title: "Pesanan Saya",
        href: "/page/pelanggan/pesanan",
        icon: ShoppingCart,
    },
    {
        title: "Ulasan",
        href: "/page/pelanggan/ulasan",
        icon: MessageSquareText,
    },
];

export default function Sidebar({
    isOpen,
    isCollapsed,
    onClose,
    onToggleCollapse,
}: SidebarProps) {
    const pathname = usePathname();

    // Lebar sidebar saat mode normal dan saat collapse di desktop
    const sidebarClass = isCollapsed ? "md:w-[72px]" : "md:w-[240px]";
    // Posisi sidebar saat mobile dibuka atau ditutup
    const mobileClass = isOpen ? "translate-x-0" : "-translate-x-full";

     return (
        <>
            {/* Overlay gelap saat sidebar mobile dibuka */}
            <div
                className={`fixed inset-0 z-30 bg-black/30 transition-opacity md:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar utama: mode drawer di mobile, mode tetap di desktop */}
            <aside
                className={`fixed left-0 top-16 bottom-0 z-40 flex w-[82vw] max-w-[280px] flex-col bg-[#dd98ad] text-white shadow-md transition-transform duration-300 md:static md:h-full md:max-w-none md:translate-x-0 md:shadow-none ${sidebarClass} ${mobileClass}`}
            >
                {/* Header sidebar khusus mobile */}
                <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 md:hidden">
                    <p className="text-sm font-semibold tracking-wide shadow-soft-text">Menu Pelanggan</p>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 transition hover:bg-white/10"
                        aria-label="Tutup menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tombol garis tiga untuk collapse sidebar di desktop */}
                <div
                    className={`hidden px-4 py-4 md:flex ${isCollapsed ? "justify-center" : "justify-start"}`}
                    >
                    <button
                        type="button"
                        onClick={onToggleCollapse}
                        className="cursor-pointer rounded-md p-2 transition hover:bg-white/10"
                        aria-label={
                            isCollapsed ? "Perluas sidebar desktop" : "Ciutkan sidebar desktop"
                        }
                    >
                        <Menu size={16} />
                    </button>
                </div>

                {/* Daftar menu sidebar */}
                <nav className="flex-1 space-y-2 px-4 text-sm">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            // Menu biasa tanpa submenu
                            <Link
                                key={index}
                                href={item.href}
                                onClick={onClose}
                                title={isCollapsed ? item.title : undefined}
                                className={`rounded-md px-2 py-2 transition ${isActive ? "bg-[#c9859c]" : "hover:bg-[#c9859c]"} ${isCollapsed ? "flex justify-center" : "flex items-start gap-2"}`}
                            >
                                <Icon size={16} className="mt-0.5 shrink-0" />
                                {!isCollapsed && (
                                    <span className="min-w-0 break-words shadow-soft-text">{item.title}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}