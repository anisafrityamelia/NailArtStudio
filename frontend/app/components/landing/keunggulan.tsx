"use client";

import Image from "next/image";

export default function Keunggulan() {
  return (
    <section
      id="keunggulan"
      className="bg-[#f4f4f4] py-16 sm:py-20"
    >
      <div className="container-landing px-4 sm:px-6">
        
        {/* Judul */}
        <h2 className="text-center text-2xl font-bold text-[#7d344b] drop-shadow-sm sm:text-3xl md:text-4xl">
          Keunggulan dari Kami
        </h2>

        {/* Content */}
        <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
          
          {/* Gambar */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Logo Alia Oye"
              width={420}
              height={420}
              className="h-auto w-[220px] object-contain transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-105 sm:w-[300px] md:w-[360px] lg:w-[420px]"
            />
          </div>

          {/* Teks */}
          <div className="text-center md:text-right md:-ml-10 md:pr-35">
            <p className="text-[18px] font-bold leading-relaxed tracking-wide text-[#7d344b] sm:text-[16px] md:text-[20px]">
              Alia Oye Studio menawarkan nail art custom sesuai keinginan,
              dikerjakan oleh nail artist berpengalaman dengan hasil rapi dan
              tahan lama. Didukung produk berkualitas, standar kebersihan
              terjaga, serta booking yang mudah dan pelayanan ramah, kami siap
              memberikan pengalaman yang nyaman dan memuaskan.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}