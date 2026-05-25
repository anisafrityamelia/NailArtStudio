"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./reveal";
import { getBerandaLanding, getStorageUrl } from "@/app/lib/beranda";

type ItemGaleri = {
  id: number;
  src: string;
  alt: string;
  className: string;
};

const layoutGaleri = [
  {
    urutan: 1,
    alt: "Galeri studio 1",
    className: `
      col-start-1 col-end-2 row-start-1 row-end-2
      md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-2
      lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2
    `,
  },
  {
    urutan: 2,
    alt: "Galeri studio 2",
    className: `
      col-start-2 col-end-3 row-start-1 row-end-2
      md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-2
      lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2
    `,
  },
  {
    urutan: 3,
    alt: "Galeri studio 3",
    className: `
      col-start-1 col-end-3 row-start-2 row-end-3
      md:col-start-1 md:col-end-4 md:row-start-2 md:row-end-3
      lg:col-start-3 lg:col-end-5 lg:row-start-1 lg:row-end-3
    `,
  },
  {
    urutan: 4,
    alt: "Galeri studio 4",
    className: `
      col-start-1 col-end-2 row-start-3 row-end-5
      md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-5
      lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4
    `,
  },
  {
    urutan: 5,
    alt: "Galeri studio 5",
    className: `
      col-start-2 col-end-3 row-start-3 row-end-4
      md:col-start-2 md:col-end-4 md:row-start-3 md:row-end-4
      lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3
    `,
  },
  {
    urutan: 6,
    alt: "Galeri studio 6",
    className: `
      col-start-2 col-end-3 row-start-4 row-end-5
      md:col-start-2 md:col-end-3 md:row-start-4 md:row-end-5
      lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4
    `,
  },
  {
    urutan: 7,
    alt: "Galeri studio 7",
    className: `
      col-start-1 col-end-2 row-start-5 row-end-6
      md:col-start-3 md:col-end-4 md:row-start-4 md:row-end-5
      lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4
    `,
  },
  {
    urutan: 8,
    alt: "Galeri studio 8",
    className: `
      col-start-2 col-end-3 row-start-5 row-end-6
      md:hidden
      lg:block lg:col-start-4 lg:col-end-5 lg:row-start-3 lg:row-end-4
    `,
  },
];

export default function Galeri() {
  const [daftarGaleri, setDaftarGaleri] = useState<ItemGaleri[]>([]);

  useEffect(() => {
    async function fetchGaleri() {
      try {
        const data = await getBerandaLanding();

        const galeriDatabase = data?.galeri || [];

        const hasilMapping = layoutGaleri
          .map((layout) => {
            const itemDatabase = galeriDatabase.find(
              (item: any) => Number(item.urutan_tampil) === layout.urutan
            );

            if (!itemDatabase?.path_gambar) {
              return null;
            }

            return {
              id: layout.urutan,
              src: getStorageUrl(itemDatabase.path_gambar),
              alt: layout.alt,
              className: layout.className,
            };
          })
          .filter(Boolean) as ItemGaleri[];

        setDaftarGaleri(hasilMapping);
      } catch (error) {
        console.error("Gagal mengambil galeri:", error);
      }
    }

    fetchGaleri();
  }, []);

  if (daftarGaleri.length === 0) {
    return null;
  }

  return (
    <section
      id="galeri"
      className="scroll-mt-20 relative overflow-hidden py-[40px] md:py-[48px] lg:py-[72px]"
    >
      <div
        className="absolute inset-[-10px] z-0 scale-[1.04] bg-cover bg-center bg-no-repeat blur-[10px]"
        style={{ backgroundImage: "url('/bg 1.jpg')" }}
      />

      <div className="absolute inset-0 z-[1] bg-black/20" />

      <div className="container-landing relative z-[2] px-5 sm:px-8 lg:px-12 xl:px-20">
        <Reveal>
          <h2 className="mb-5 text-left text-[28px] font-bold text-white drop-shadow-sm md:mb-7 md:text-[36px] lg:text-[41px]">
            Galeri Studio
          </h2>
        </Reveal>

        <Reveal
          delay={0.3}
          className="grid grid-cols-2 grid-rows-[105px_190px_145px_105px_105px] gap-3 
          min-[421px]:grid-rows-[115px_205px_150px_110px_110px] min-[421px]:gap-[14px] md:grid-cols-3
          md:grid-rows-[120px_180px_120px_120px] md:gap-4 lg:grid-cols-[1.4fr_0.7fr_1.25fr_1.25fr]
          lg:grid-rows-[110px_160px_110px] lg:gap-[18px]"
        >
          {daftarGaleri.map((item) => (
            <Reveal
              delay={0.1}
              key={item.id}
              className={`group relative overflow-hidden rounded-[16px] bg-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.22)]
              transition-all duration-300 ease-out hover:-translate-y-[6px] hover:shadow-[0_18px_34px_rgba(0,0,0,0.3)]
              md:rounded-[18px] lg:rounded-[22px]
              ${item.className}
              `}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.06] group-hover:saturate-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}