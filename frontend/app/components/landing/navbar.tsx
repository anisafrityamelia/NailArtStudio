"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu, X, ChevronRight, MoreVertical, KeyRound, LogOut, Bell } from "lucide-react";
import ModalGantiPassword from "@/app/components/ui/modal-ganti-password";
import { getUser, logout } from "@/app/lib/auth";
import {
  getNotifikasiAdminNavbar,
  getNotifikasiPelangganNavbar,
  type NotifikasiNavbar,
} from "@/app/lib/pesanan";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuAkunOpen, setIsMenuAkunOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifikasi, setNotifikasi] = useState<NotifikasiNavbar[]>([]);
  const [notifSudahDilihat, setNotifSudahDilihat] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuAkunRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Beranda", href: "#beranda" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Galeri", href: "#galeri" },
    { label: "Layanan", href: "#layanan" },
    { label: "Ulasan", href: "#ulasan" },
    { label: "Kontak", href: "#kontak" },
  ];

  useEffect(() => {
    const user = getUser();

    if (user) {
      setIsUserLogin(true);
      setUserName(user.nama_pengguna || "");
      setFotoProfil(user.url_profil_foto || "");

      const roleUser =
        user.role || user.peran || user.tipe_pengguna || user.level || "";

      setIsAdmin(roleUser.toLowerCase() === "admin");
    }
  }, []);

  useEffect(() => {
    const fetchNotifikasi = async () => {
      try {

        const user = getUser();

        if (!user) return;

        const roleUser =
          user.role ||
          user.peran ||
          user.tipe_pengguna ||
          user.level ||
          "";

        if (roleUser.toLowerCase() === "admin") {

          const data = await getNotifikasiAdminNavbar();

          setNotifikasi(data);
          setNotifSudahDilihat(false);

        } else {

          const data = await getNotifikasiPelangganNavbar();

          setNotifikasi(data);
        }

      } catch (error) {

        setNotifikasi([]);
      }
    };

    fetchNotifikasi();

    const interval = setInterval(fetchNotifikasi, 30000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuAkunRef.current &&
        !menuAkunRef.current.contains(event.target as Node)
      ) {
        setIsMenuAkunOpen(false);
      }

      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollKeSection = (href: string) => {
    const id = href.replace("#", "");

    setIsOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);

      if (!element) return;

      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 72 : 72;

      const posisi =
        element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: posisi,
        behavior: "smooth",
      });
    }, 320);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#7d344b] text-white shadow-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <Image
              src="/logo full alia oye (putih).png"
              alt="Alia Oye Logo"
              width={230}
              height={80}
              className="h-auto w-[138px] object-contain sm:w-[210px]"
            />
          </div>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollKeSection(item.href)}
                className="text-[15px] font-semibold transition hover:text-[#f8d7e1]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isUserLogin ? (
              <div className="hidden items-center md:flex">
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
                    <Bell size={22} />

                    {notifikasi.length > 0 && !notifSudahDilihat && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dd98ad] px-1 text-[10px] font-bold text-white">
                        {notifikasi.length}
                      </span>
                    )}
                  </button>

                  {isNotifOpen && (
                    <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-[#dd98ad] bg-[#ffecf2] text-[#7d344b] shadow-soft-text">

                      <div className="border-b border-[#efcfd8] px-4 py-3">
                        <p className="text-sm font-semibold">
                          Notifikasi
                        </p>
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
                              <p className="text-sm font-semibold">
                                {item.judul}
                              </p>

                              <p className="mt-0.5 text-xs">
                                {item.deskripsi}
                              </p>

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

                {!isAdmin && (
                  <Link
                    href="/page/pelanggan/dasbor_pelanggan"
                    className="relative ml-1 h-7 w-7 overflow-hidden rounded-full transition hover:scale-105"
                  >
                    <Image
                      src={fotoProfil || "/profile-default.jfif"}
                      alt="Foto Profil Pelanggan"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </Link>
                )}

                <div className="relative" ref={menuAkunRef}>
                  <button
                    type="button"
                    onClick={() => setIsMenuAkunOpen((current) => !current)}
                    className="cursor-pointer rounded-md p-1.5 transition hover:bg-white/10"
                    aria-label="Opsi lainnya"
                  >
                    <MoreVertical size={22} />
                  </button>

                  {isMenuAkunOpen && (
                    <div className="absolute right-0 top-12 z-50 w-45 overflow-hidden rounded-2xl border border-[#dd98ad] bg-[#ffecf2] text-[#7d344b] shadow-soft-text">
                      <div className="border-b border-[#efcfd8] px-4 py-2">
                        {isAdmin ? (
                          <Link
                            href="/page/admin/dasbor_admin"
                            onClick={() => setIsMenuAkunOpen(false)}
                            className="block rounded-lg transition hover:text-[#a14d68]"
                          >
                            <p className="break-words text-[15px] font-semibold leading-snug">
                              {userName || "Admin"}
                            </p>
                          </Link>
                        ) : (
                          <p className="break-words text-[15px] font-semibold leading-snug">
                            {userName || "User"}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsMenuAkunOpen(false);
                            setIsPasswordModalOpen(true);
                          }}
                          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] font-medium transition hover:bg-[#f2dce3]"
                        >
                          <KeyRound size={18} />
                          <span className="shadow-soft-text">Ubah Sandi</span>
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            setIsMenuAkunOpen(false);
                            await logout();
                          }}
                          className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] font-medium transition hover:bg-[#f2dce3]"
                        >
                          <LogOut size={18} />
                          <span className="shadow-soft-text">Keluar</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden items-center gap-1.5 rounded-md bg-white px-4 py-2 text-[15px] font-semibold text-[#7d344b] shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#fce7ee] md:inline-flex"
              >
                <LogIn size={18} />
                Masuk
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              className="rounded-md p-2 transition hover:bg-white/10 active:scale-95 md:hidden"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-white/10 bg-[#7d344b] px-4 pb-4 pt-3">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollKeSection(item.href)}
                  className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[15px] font-medium transition-all duration-200 hover:bg-white/10 active:scale-[0.98]"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={18}
                    className="opacity-60 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              ))}

              {isUserLogin ? (
                <div className="mt-3 rounded-2xl bg-white/10 p-3">
                  {!isAdmin ? (
                    <Link
                      href="/page/pelanggan/dasbor_pelanggan"
                      onClick={() => setIsOpen(false)}
                      className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/10"
                    >
                      <div className="relative h-9 w-9 overflow-hidden rounded-full">
                        <Image
                          src={fotoProfil || "/profile-default.jfif"}
                          alt="Foto Profil Pelanggan"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      <p className="text-[15px] font-semibold">
                        {userName || "User"}
                      </p>
                    </Link>
                  ) : (
                    <Link
                      href="/page/admin/dasbor_admin"
                      onClick={() => setIsOpen(false)}
                      className="mb-3 block rounded-xl px-3 py-3 transition hover:bg-white/10"
                    >
                      <p className="break-words text-[15px] font-semibold">
                        {userName || "Admin"}
                      </p>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setIsPasswordModalOpen(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium transition hover:bg-white/10"
                  >
                    <KeyRound size={18} />
                    Ubah Sandi
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      setIsOpen(false);
                      await logout();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium transition hover:bg-white/10"
                  >
                    <LogOut size={18} />
                    Keluar
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-[15px] font-semibold text-[#7d344b] transition-all duration-200 hover:bg-[#fce7ee] active:scale-[0.98]"
                >
                  <LogIn size={18} />
                  Masuk
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      <ModalGantiPassword
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}