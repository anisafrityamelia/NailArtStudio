"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "./reveal";
import { getBerandaLanding } from "@/app/lib/beranda";

type DataKontak = {
  alamat_studio: string;
  link_lokasi: string;
  jam_buka: string;
  akun_ig: string;
  akun_tiktok: string;
  no_wa: string;
};

function formatWhatsAppLink(noWa?: string) {
  if (!noWa) return "#";

  let nomor = noWa.replace(/\D/g, "");

  if (nomor.startsWith("0")) {
    nomor = "62" + nomor.slice(1);
  }

  return `https://wa.me/${nomor}`;
}

function formatInstagramLink(username?: string) {
  if (!username) return "#";

  if (username.startsWith("http")) {
    return username;
  }

  return `https://www.instagram.com/${username.replace(/^@/, "")}`;
}

function formatTiktokLink(username?: string) {
  if (!username) return "#";

  if (username.startsWith("http")) {
    return username;
  }

  return `https://www.tiktok.com/@${username.replace(/^@/, "")}`;
}

function formatGoogleMapsEmbed(link?: string, alamat?: string) {
  if (link && link.includes("/embed")) {
    return link;
  }

  if (alamat) {
    return `https://www.google.com/maps?q=${encodeURIComponent(
      alamat
    )}&z=16&output=embed`;
  }

  return "";
}

export default function Kontak() {
  const [dataKontak, setDataKontak] = useState<DataKontak | null>(null);

  useEffect(() => {
    async function fetchKontak() {
      try {
        const data = await getBerandaLanding();

        setDataKontak({
          alamat_studio: data?.alamat_studio || "",
          link_lokasi: data?.link_lokasi || "",
          jam_buka: data?.jam_buka || "",
          akun_ig: data?.akun_ig || "",
          akun_tiktok: data?.akun_tiktok || "",
          no_wa: data?.no_wa || "",
        });
      } catch (error) {
        console.error("Gagal mengambil kontak:", error);
      }
    }

    fetchKontak();
  }, []);

  const alamat =
    dataKontak?.alamat_studio ||
    "Harapan 2 kampung bawean, Baloi No.14 Blok A, Sungai Panas, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29457";

  const jamBuka = dataKontak?.jam_buka || "Senin - Minggu (09:00 - 22:00)";

  const linkMaps = formatGoogleMapsEmbed(dataKontak?.link_lokasi, alamat);
  const linkInstagram = formatInstagramLink(dataKontak?.akun_ig);
  const linkTiktok = formatTiktokLink(dataKontak?.akun_tiktok);
  const linkWhatsapp = formatWhatsAppLink(dataKontak?.no_wa);

  return (
    <section
      id="kontak"
      className="relative overflow-hidden bg-[#84344f] pb-[clamp(40px,6vw,64px)] max-[420px]:pb-9"
    >
      <div className="mb-[clamp(34px,5vw,56px)] h-[14px] w-full max-md:mb-7 max-md:h-2.5" />

      <div className="container-landing px-4 sm:px-6 lg:px-25">
        <div className="grid grid-cols-[minmax(320px,1fr)_minmax(320px,1.05fr)] items-center gap-[clamp(28px,4vw,52px)] max-[991px]:grid-cols-1 max-[991px]:gap-7">
          <Reveal
            delay={0.3}
            className="min-h-[270px] overflow-hidden rounded-3xl bg-[#f6f6f6] shadow-[0_10px_24px_rgba(0,0,0,0.22)] 
          max-[991px]:mx-auto max-[991px]:w-full max-[991px]:max-w-[720px] 
          max-md:min-h-[240px] max-md:rounded-[20px] 
          max-[420px]:min-h-[220px] max-[420px]:rounded-[18px]"
          >
            {linkMaps ? (
              <iframe
                title="Lokasi Alia Oye Studio"
                src={linkMaps}
                className="block h-full min-h-[270px] w-full border-0 max-md:min-h-[240px] max-[420px]:min-h-[220px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full min-h-[270px] items-center justify-center text-sm text-[#84344f]">
                Lokasi belum tersedia
              </div>
            )}
          </Reveal>

          <div
            className="flex flex-col items-end text-right text-white 
          max-[991px]:mx-auto max-[991px]:max-w-[760px] 
          max-md:items-center max-md:text-center"
          >
            <Reveal className="mb-[22px]">
              <h2 className="mb-3.5 text-[clamp(28px,3.5vw,30px)] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.22)] max-md:mb-3">
                Ikuti Kami
              </h2>

              <Reveal
                delay={0.3}
                className="flex items-center justify-end gap-4 max-md:justify-center max-md:gap-3"
              >
                {[
                  {
                    href: linkInstagram,
                    label: "Instagram",
                    icon: (
                      <>
                        <rect
                          x="3.25"
                          y="3.25"
                          width="17.5"
                          height="17.5"
                          rx="5.25"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="4.1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <circle
                          cx="17.2"
                          cy="6.8"
                          r="1.2"
                          fill="currentColor"
                        />
                      </>
                    ),
                  },
                  {
                    href: linkTiktok,
                    label: "TikTok",
                    icon: (
                      <path d="M14.2 4.2c.7 2 2.1 3.3 4 3.9v2.8c-1.4-.1-2.7-.6-3.9-1.3v5.4c0 2.8-2.3 5.1-5.1 5.1S4.1 17.8 4.1 15s2.3-5.1 5.1-5.1c.3 0 .6 0 .9.1v3c-.3-.1-.6-.2-.9-.2-1.2 0-2.1 1-2.1 2.2s.9 2.2 2.1 2.2 2.2-1 2.2-2.2V4.2h2.8Z" />
                    ),
                  },
                  {
                    href: linkWhatsapp,
                    label: "WhatsApp",
                    icon: (
                      <>
                        <path d="M12 3.2a8.77 8.77 0 0 0-7.56 13.2L3.2 20.8l4.51-1.18A8.8 8.8 0 1 0 12 3.2Zm0 15.77a7 7 0 0 1-3.58-.98l-.26-.15-2.68.7.72-2.61-.17-.27A6.99 6.99 0 1 1 12 18.97Z" />
                        <path d="M9.16 8.48c-.22 0-.46.08-.64.28-.29.31-.75.76-.75 1.86 0 .96.62 1.88.9 2.25 1.44 2.08 3.25 3.65 5.85 4.28.83.2 1.5.05 2.05-.31.67-.44 1.04-1.25 1.12-1.77.03-.18.02-.28-.1-.34l-1.86-.87c-.12-.06-.29-.04-.38.09l-.77.97c-.08.1-.23.14-.35.09a7.28 7.28 0 0 1-3.77-3.41c-.06-.11-.05-.25.03-.35l.66-.8c.08-.1.11-.24.06-.36l-.78-1.97c-.08-.2-.26-.31-.47-.31h-.8Z" />
                      </>
                    ),
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-[14px] bg-white text-[#84344f] shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 max-md:h-12 max-md:w-12 max-md:rounded-xl"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                      {item.icon}
                    </svg>
                  </Link>
                ))}
              </Reveal>
            </Reveal>

            <Reveal
              delay={0.3}
              className="flex flex-col items-end gap-5 max-md:items-center"
            >
              <p className="text-[18px] font-bold leading-[1.5]">
                {alamat}
              </p>

              <Reveal delay={0.2}>
                <p className="text-[18px] font-bold">Open : {jamBuka}</p>
              </Reveal>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-6 text-xs text-white/85 max-md:mt-5">
                Proyek PBL Teknik Informatika Polibatam
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}