import Navbar from "./components/landing/navbar";
import Beranda from "./components/landing/beranda";
import Keunggulan from "./components/landing/keunggulan";
import Galeri from "./components/landing/galeri";
import Layanan from "./components/landing/layanan";
import Ulasan from "./components/landing/ulasan";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Beranda />
      <Keunggulan />
      <Galeri />
      <Layanan />
      <Ulasan />
    </main>
  );
}