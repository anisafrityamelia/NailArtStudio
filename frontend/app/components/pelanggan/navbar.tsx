"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, KeyRound, LogOut, Menu, MoreVertical } from "lucide-react";
import ModalGantiPassword from "@/app/components/ui/modal-ganti-password";
import Image from "next/image";
import { logout } from "@/app/lib/auth";
import { getUser } from "@/app/lib/auth";
import Link from "next/link";
import { getNotifikasiPelangganNavbar, type NotifikasiNavbar } from "@/app/lib/pesanan";

type NavbarProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  // Mengatur buka tutup dropdown dari ikon titik tiga
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifikasi, setNotifikasi] = useState<NotifikasiNavbar[]>([]);
  const [notifSudahDilihat, setNotifSudahDilihat] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = getUser();

    if (user) {
      setUserName(user.nama_pengguna || "");
      setFotoProfil(user.url_profil_foto || "");
    }
  }, []);

  useEffect(() => {
    const fetchNotifikasi = async () => {
      try {
        const data = await getNotifikasiPelangganNavbar();
        setNotifikasi(data);
        setNotifSudahDilihat(false);
      } catch (error) {
        setNotifikasi([]);
      }
    };

    fetchNotifikasi();

    const interval = setInterval(fetchNotifikasi, 30000);

    return () => clearInterval(interval);
  }, []);

  // Menutup dropdown saat klik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }

      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header utama pelanggan */}
      <header className="flex h-16 w-full shrink-0 items-center justify-between bg-[#7d344b] px-3 text-white shadow-md sm:px-6">
        {/* Bagian kiri: tombol menu mobile dan logo */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-md p-2 transition hover:bg-white/10 md:hidden"
            aria-label="Buka menu">
            <Menu size={20} />
          </button>

          <Image
            src="/logo full alia oye (putih).png"
            alt="Alia Oye Logo"
            width={230}
            height={80}
            className="h-auto w-[138px] object-contain sm:w-[210px]"
            priority/>
        </div>

        {/* Bagian kanan: ikon notifikasi, foto profil dan opsi */}
        <div className="flex items-center">
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setIsNotifOpen((current) => !current);

                setNotifSudahDilihat(true);
              }}
              className="relative cursor-pointer rounded-md p-1.5 transition hover:bg-white/10"
              aria-label="Notifikasi"
            >
              <Bell size={18} className="sm:hidden" />
              <Bell size={22} className="hidden sm:block" />

              {notifikasi.length > 0 && !notifSudahDilihat && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dd98ad] px-1 text-[10px] font-bold text-white">
                  {notifikasi.length}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-[#dd98ad] bg-[#ffecf2] text-[#7d344b] shadow-soft-text">
                <div className="border-b border-[#efcfd8] px-4 py-3">
                  <p className="text-sm font-semibold">Notifikasi</p>
                </div>

                <div className="max-h-80 overflow-y-auto px-3 py-2">
                  {notifikasi.length === 0 ? (
                    <p className="px-2 py-3 text-sm text-[#7d344b]/70">
                      Belum ada notifikasi.
                    </p>
                  ) : (
                    notifikasi.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsNotifOpen(false)}
                        className="block rounded-xl px-3 py-2 transition hover:bg-[#f2dce3]"
                      >
                        <p className="text-sm font-semibold">{item.judul}</p>
                        <p className="mt-0.5 text-xs">{item.deskripsi}</p>
                        <p className="mt-1 text-[11px] font-medium text-[#a14d68]">
                          {item.status}
                        </p>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Foto profil pelanggan */}
          <div className="relative ml-1 h-6 w-6 overflow-hidden rounded-full sm:h-7 sm:w-7">
            <Image
                src={fotoProfil || "/profile-default.jfif"}
                alt="Foto Profil Pelanggan"
                fill
                unoptimized
                className="object-cover"
            />
          </div>

          {/* Dropdown menu akun */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="cursor-pointer rounded-md p-1.5 transition hover:bg-white/10"
              aria-label="Opsi lainnya">
              <MoreVertical size={18} className="sm:hidden" />
              <MoreVertical size={22} className="hidden sm:block" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-45 overflow-hidden rounded-2xl border border-[#dd98ad] bg-[#ffecf2] text-[#7d344b] shadow-soft-text">
                <div className="border-b border-[#efcfd8] px-4 py-2">
                  <p className="break-words text-[15px] font-semibold leading-snug">
                    {userName || "User"}
                  </p>
                </div>

                <div className="space-y-1 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPasswordModalOpen(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] font-medium transition hover:bg-[#f2dce3] cursor-pointer">
                    <KeyRound size={18} />
                    <span className="shadow-soft-text">Ubah Sandi</span>
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      setIsMenuOpen(false);
                      await logout();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] font-medium transition hover:bg-[#f2dce3] cursor-pointer">
                    <LogOut size={18} />
                    <span className="shadow-soft-text">Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <ModalGantiPassword
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)} />
    </>
  );
}