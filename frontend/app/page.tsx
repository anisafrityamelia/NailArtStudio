import Link from "next/link";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Circle,
  LogIn,
  MessageCircle,
  MoreVertical,
  Music,
  Star,
} from "lucide-react";

const galleryImages = [
  { alt: "Palet dan perlengkapan beauty", image: "/kuku/010.jpg", className: "md:col-[1/3] md:row-[1/2] aspect-[2.15/1]" },
  { alt: "Detail kuku hitam glossy", image: "/kuku/009.jpg", className: "md:col-[3/4] md:row-[1/2] aspect-square" },
  { alt: "Proses nail treatment studio", image: "/kuku/001.jpg", className: "md:col-[4/6] md:row-[1/3] aspect-[1.6/1] md:h-full md:aspect-auto" },
  { alt: "Nail polish pink", image: "/kuku/002.jpg", className: "md:col-[1/2] md:row-[2/4] aspect-[0.85/1] md:h-full md:aspect-auto" },
  { alt: "Soft nail set abu-pink", image: "/kuku/003.jpg", className: "md:col-[2/4] md:row-[2/3] aspect-[2.12/1]" },
  { alt: "Kuku nude elegan", image: "/kuku/004.jpg", className: "md:col-[3/5] md:row-[3/4] aspect-[2.12/1]" },
  { alt: "Hasil eyelash extension", image: "/eye/001.jpg", className: "md:col-[2/3] md:row-[3/4] aspect-square" },
  { alt: "Kuku maroon design", image: "/kuku/005.jpg", className: "md:col-[5/6] md:row-[3/4] aspect-square" },
];

const services = [
  { title: "Nail Art", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80" },
  { title: "Press On Nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80" },
  { title: "Eyelash", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80" },
];

const reviews = [
  { name: "anantha", review: "Hasil nail art soft dan bersih.", image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80" },
  { name: "anisa frity amelia", review: "Detailnya rapi dan sesuai request.", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80" },
  { name: "widayy", review: "Warnanya manis dan finishing-nya halus.", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#7D344B]">
      <Navbar />

      {/* Hero section */}
      <section id="beranda" className="bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.78),transparent_34%),linear-gradient(90deg,#f8dadd_0%,#f7ecf0_44%,#f1c5d3_100%)]">
        <div className="mx-auto flex min-h-[calc(100vh-5.4rem)] w-full max-w-[1400px] flex-col items-center justify-center px-4 py-16 text-center lg:px-8">
          <img src="/logo full 1 alia oye (putih).png" alt="Alia Oye Studio" className="w-[18rem] max-w-full drop-shadow-[0_10px_14px_rgba(125,52,75,0.28)] md:w-[28rem] lg:w-[32rem]" />
        </div>
      </section>

      {/* About section */}
      <section id="keunggulan" className="bg-white py-16">
        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:px-6">
          <div className="flex justify-center">
            <img src="/logo.png" alt="Logo keunggulan Alia Oye Studio" className="w-[14rem] max-w-full drop-shadow-[0_10px_18px_rgba(141,59,91,0.18)] md:w-[19rem]" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Keunggulan dari Kami</h2>
            <p className="mx-auto max-w-xl text-lg font-semibold leading-8 text-[#8d3b5b] md:mx-0">Alia Oye Studio menawarkan nail art custom sesuai keinginan, dikerjakan oleh nail artist berpengalaman dengan hasil rapi dan tahan lama. Didukung produk berkualitas, standar kebersihan terjaga, serta booking yang mudah dan pelayanan ramah, kami siap memberikan pengalaman yang nyaman dan memuaskan.</p>
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section id="galeri" className="relative overflow-hidden bg-[url('/background/galeri-background.png')] bg-cover bg-center py-12 text-white">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1.5px]" />
        <div className="relative mx-auto max-w-[1100px] px-4 lg:px-6">
          <h2 className="mb-6 text-[2rem] font-semibold">Galeri Studio</h2>
          <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_45px_rgba(72,14,36,0.25)] backdrop-blur-[2px]">
            <div className="grid gap-4 md:grid-cols-5 md:grid-rows-3 md:auto-rows-[7rem]">
              {galleryImages.map((item) => (
                <GalleryTile key={item.alt} image={item.image} alt={item.alt} className={item.className} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section id="layanan" className="bg-[#f8dfe7] py-14">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Layanan Kami</h2>
          <div className="grid items-center gap-6 md:grid-cols-[40px_1fr_40px]">
            <button className="hidden justify-self-start rounded-full text-[#8d3b5b] md:block"><ChevronLeft /></button>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((item) => (
                <ServiceCard key={item.title} title={item.title} image={item.image} />
              ))}
            </div>
            <button className="hidden justify-self-end rounded-full text-[#8d3b5b] md:block"><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* Reviews section */}
      <section id="ulasan" className="bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.56),transparent_18%),linear-gradient(180deg,#d78ea6_0%,#cc7b97_100%)] py-16">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-6">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Ulasan</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((item) => (
              <ReviewCard key={item.name} name={item.name} review={item.review} image={item.image} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/auth/register" className="inline-flex rounded-md bg-[linear-gradient(90deg,#e44d84_0%,#823851_100%)] px-5 py-2 text-sm font-semibold text-white shadow-md">Tampilkan lebih banyak</Link>
          </div>
        </div>
      </section>

      {/* Education section */}
      <section id="info-edukasi" className="bg-white py-16">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-6">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Info & Edukasi</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <InfoCard key={item} title={`Tips Perawatan ${item}`} description="Panduan singkat untuk menjaga hasil nail art, press on, atau eyelash tetap cantik dan tahan lebih lama." />
            ))}
          </div>
        </div>
      </section>

      {/* Footer spacer section */}
      <section id="kontak" className="bg-[#7D344B] py-4" />
      <Footer />
    </div>
  );
}


const navItems = ["Beranda", "Keunggulan", "Galeri", "Layanan", "Ulasan", "Info & Edukasi", "Kontak"];

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#7D344B] text-white shadow-[0_14px_28px_rgba(75,16,41,0.28)]">
      <div className="flex h-[5.4rem] w-full items-center justify-between gap-6 px-5 lg:px-14 xl:px-20">
        <div className="flex min-w-fit items-center -ml-1 lg:-ml-3">
          <img src="/logo full alia oye (putih).png" alt="Alia Oye Studio" className="h-10 w-auto lg:h-12" />
        </div>

        <div className="hidden items-center gap-8 text-[1.02rem] font-semibold lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(" ", "-").replaceAll("&", "")}`}
              className="transition duration-200 hover:text-[#d889a4]"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="mr-1 flex items-center gap-2 lg:mr-3 lg:gap-2.5">
          <Link href="/auth/login" className="rounded-full p-2.5 transition hover:bg-white/10" aria-label="login">
            <LogIn className="h-5 w-5" />
          </Link>
          <button className="rounded-full p-2.5 transition hover:bg-white/10" aria-label="notif">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2.5 transition hover:bg-white/10" aria-label="theme">
            <Circle className="h-5 w-5 fill-white" />
          </button>
          <button className="rounded-full p-2.5 transition hover:bg-white/10" aria-label="lainnya">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#7D344B] px-4 py-12 text-white lg:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div className="h-40 rounded-[1.4rem] bg-white/95 shadow-[0_18px_30px_rgba(53,8,28,0.18)]" />

        <div className="space-y-5 text-right">
          <div className="flex justify-end gap-3">
            <a href="#" className="rounded-md bg-white px-2.5 py-2 text-[#7D344B]"><Music className="h-4 w-4" /></a>
            <a href="#" className="rounded-md bg-white px-2.5 py-2 text-[#7D344B]"><MessageCircle className="h-4 w-4" /></a>
          </div>

          <div className="space-y-2 text-sm text-[#ffe6ef]">
            <p>Instagram: @aliaoyestudio</p>
            <p>TikTok: @aliaoyestudio</p>
            <p>WhatsApp: 08xx-xxxx-xxxx</p>
            <p>Studio appointment only, booking via DM atau WhatsApp.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

type GalleryTileProps = {
  image: string;
  alt: string;
  className?: string;
};

function GalleryTile({ image, alt, className = "" }: GalleryTileProps) {
  return (
    <div className={`group relative overflow-hidden rounded-[1.15rem] shadow-[0_18px_40px_rgba(82,27,50,0.24)] ${className}`}>
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-[#4d1630]/0 transition duration-300 group-hover:bg-[#4d1630]/22" />
    </div>
  );
}

type ServiceCardProps = {
  title: string;
  image: string;
};

function ServiceCard({ title, image }: ServiceCardProps) {
  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-[#ebb9ca] bg-[#f5d9e3] p-3 shadow-[0_12px_24px_rgba(125,52,75,0.16)]">
      <div className="group relative overflow-hidden rounded-[0.9rem]">
        <img src={image} alt={title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[#4d1630]/0 transition duration-300 group-hover:bg-[#4d1630]/14" />
      </div>

      <div className="px-1 pb-1 pt-3 text-[#7D344B]">
        <h3 className="text-[1.05rem] font-semibold">{title}</h3>
        <Link href="/auth/register" className="mt-4 inline-flex w-full items-center justify-center rounded-[0.35rem] bg-[linear-gradient(90deg,#e65088_0%,#7d344b_100%)] px-4 py-1.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105">
          Detail
        </Link>
      </div>
    </div>
  );
}

type ReviewCardProps = {
  name: string;
  review: string;
  image: string;
};

function ReviewCard({ name, review, image }: ReviewCardProps) {
  return (
    <div className="overflow-hidden rounded-[1.1rem] bg-[#8b3658] shadow-[0_18px_34px_rgba(98,32,58,0.24)]">
      <div className="space-y-4 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/30">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <p className="text-sm font-semibold lowercase">{name}</p>
        </div>

        <div className="space-y-2">
          <div className="h-2.5 w-14 rounded-full bg-white" />
          <div className="h-2.5 w-24 rounded-full bg-white" />
          <div className="h-2.5 w-20 rounded-full bg-white" />
        </div>

        <div className="flex gap-1 text-[#ffe2eb]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={15} className="fill-current" />
          ))}
        </div>
      </div>

      <div className="group relative h-40 overflow-hidden">
        <img src={image} alt={review} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-[#5c1f39]/10 transition duration-300 group-hover:bg-[#5c1f39]/24" />
      </div>
    </div>
  );
}

type InfoCardProps = {
  title: string;
  description: string;
};

function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="grid min-h-32 grid-cols-[0.8fr_1.2fr] overflow-hidden rounded-[1rem] bg-[#de97b0] shadow-[0_14px_28px_rgba(125,52,75,0.12)]">
      <div className="bg-[#c6c6c6]" />

      <div className="flex flex-col justify-center gap-3 p-5 text-white">
        <div className="h-3 w-16 rounded-full bg-white" />
        <div className="h-3 w-24 rounded-full bg-white" />
        <div className="h-3 w-20 rounded-full bg-white" />
        <span className="sr-only">{title} {description}</span>
      </div>
    </div>
  );
}