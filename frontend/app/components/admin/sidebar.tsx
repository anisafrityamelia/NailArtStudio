"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  ShoppingCart,
  Settings,
  CalendarDays,
  Users,
  MessageSquareText,
  FileText,
  Menu,
  X,
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

// Daftar menu utama sidebar admin
const menuItems = [
  {
    title: "Dasbor Admin",
    href: "/page/admin/dasbor_admin",
    icon: LayoutDashboard,
  },
  {
    title: "Pesanan",
    icon: ShoppingCart,
    children: [
      { title: "Pesanan Masuk", href: "/page/admin/pesanan/pesanan_masuk" },
      { title: "Pesanan Aktif", href: "/page/admin/pesanan/pesanan_aktif" },
      { title: "Riwayat Pesanan", href: "/page/admin/pesanan/riwayat_pesanan" },
    ],
  },
  {
    title: "Kelola Layanan & Beranda",
    href: "/page/admin/kelola_layanan",
    icon: Settings,
  },
  {
    title: "Penjadwalan & Kapasitas",
    icon: CalendarDays,
    children: [
      { title: "Kelola Jadwal Default", href: "/page/admin/penjadwalan/kelola_jadwal_default" },
      { title: "Kelola Jadwal Khusus", href: "/page/admin/penjadwalan/kelola_jadwal_khusus" },
      { title: "Kelola kapasitas Khusus", href: "/page/admin/penjadwalan/kelola_kapasitas_khusus" },
    ],
  },
  {
    title: "Manajemen Pengguna",
    href: "/page/admin/manajemen_pengguna",
    icon: Users,
  },
  {
    title: "Ulasan Pengguna",
    href: "/page/admin/ulasan",
    icon: MessageSquareText,
  },
  {
    title: "Laporan",
    href: "/page/admin/laporan",
    icon: FileText,
  },
];

export default function Sidebar({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  // Mengatur buka/tutup dropdown menu "Pesanan"
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Pesanan: pathname.startsWith("/page/admin/pesanan"),
    "Penjadwalan & Kapasitas": pathname.startsWith("/page/admin/penjadwalan"),
  });

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
          <p className="text-sm font-semibold tracking-wide shadow-soft-text">Menu Admin</p>
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

            if (item.children) {
              // Mengecek apakah salah satu submenu sedang aktif
              const isActive = item.children.some((child) => pathname === child.href);

              if (isCollapsed) {
                return (
                  <button
                    key={index}
                    type="button"
                    title={item.title}
                    className={`flex w-full justify-center rounded-md px-2 py-2 font-medium transition ${isActive ? "bg-[#b85d7d]" : "hover:bg-[#c9859c]"}`}
                  >
                    <Icon size={16} className="shrink-0" />
                  </button>
                );
              }

              return (
                <details
                  key={index}
                  open={openMenus[item.title] || false}
                  onToggle={(event) => {
                    const isOpen = event.currentTarget.open;

                    setOpenMenus((prev) => ({
                      ...prev,
                      [item.title]: isOpen,
                    }));
                  }}
                  className="group space-y-2"
                >
                  {/* Tombol dropdown untuk menu yang punya submenu */}
                  <summary
                    className={`flex cursor-pointer list-none items-center justify-between gap-2 rounded-md px-2 py-2 font-medium transition`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon size={16} className="shrink-0" />
                      <span className="min-w-0 break-words shadow-soft-text">{item.title}</span>
                    </span>
                    <ChevronDown
                      size={16}
                      className="shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>

                  {/* Isi submenu "Pesanan" */}
                  <div className="ml-6 space-y-1">
                      {item.children.map((child, childIndex) => {
                        const isActive = pathname === child.href;

                        return (
                          <Link
                            key={childIndex}
                            href={child.href}
                            onClick={onClose}
                            className={`block rounded-md px-3 py-2 transition ${isActive ? "bg-[#c9859c] text-white" : "hover:bg-[#c9859c]"}`}
                          >
                            <span className="break-words shadow-soft-text">{child.title}</span>
                          </Link>
                        );
                      })}
                  </div>
                </details>
              );
            }

            // Mengecek menu biasa yang aktif
            const isActive = pathname === item.href;

            return (
              // Menu biasa tanpa submenu
              <Link
                key={index}
                href={item.href || "#"}
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