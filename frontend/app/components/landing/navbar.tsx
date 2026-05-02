"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", href: "#beranda" },
    { label: "Keunggulan", href: "#keunggulan" },
    { label: "Galeri", href: "#galeri" },
    { label: "Layanan", href: "#layanan" },
    { label: "Ulasan", href: "#ulasan" },
    { label: "Kontak", href: "#kontak" },
  ];

  const scrollKeSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);

    if (!element) return;

    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 96 : 72;

    const posisi = element.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: posisi,
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#7d344b] text-white shadow-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Image
            src="/logo full alia oye (putih).png"
            alt="Alia Oye Logo"
            width={230}
            height={80}
            className="h-auto w-[138px] object-contain sm:w-[210px]"/>
        </div>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {menuItems.map((item) =>
            item.href.startsWith("#") ? (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollKeSection(item.href)}
                className="text-[15px] font-semibold transition hover:text-[#f8d7e1]">
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] font-semibold transition hover:text-[#f8d7e1]">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-[15px] font-semibold 
            text-[#7d344b] shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:bg-[#fce7ee]">
            <LogIn size={18} />
            Masuk
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            className="rounded-md p-2 transition hover:bg-white/10 active:scale-95 md:hidden">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <div className="border-t border-white/10 bg-[#7d344b] px-4 pb-4 pt-3">
          <nav className="flex flex-col">
            {menuItems.map((item) =>
              item.href.startsWith("#") ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollKeSection(item.href)}
                  className="group flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-[15px] 
                  font-medium transition-all duration-200 hover:bg-white/10 active:scale-[0.98]">
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={18}
                    className="opacity-60 transition-transform duration-200 group-hover:translate-x-1"/>
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium 
                  transition-all duration-200 hover:bg-white/10 active:scale-[0.98]">
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {item.label}
                  </span>
                  <ChevronRight
                    size={18}
                    className="opacity-60 transition-transform duration-200 group-hover:translate-x-1"/>
                </Link>
              )
            )}

            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-[15px] 
              font-semibold text-[#7d344b] transition-all duration-200 hover:bg-[#fce7ee] active:scale-[0.98]">
              <LogIn size={18} />
              Masuk
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}