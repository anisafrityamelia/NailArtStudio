"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Judul_Halaman from "@/app/components/ui/judul_halaman";
import Filter_Ulasan from "./components/filter_ulasan";
import Tabel_Ulasan from "./components/tabel_ulasan";
import Modal_Hide from "@/app/components/ui/modal_hide";
import {
  getUlasanAdmin,
  updateStatusTampilUlasan,
} from "@/app/lib/ulasan";
import API_BASE_URL from "@/app/lib/api";
import { getCurrentUser } from "@/app/lib/auth";

export type UlasanAdmin = {
  id_ulasan: number;
  kode_pesanan: string;
  nama_pelanggan: string;
  nama_layanan: string;
  ulasan: string;
  rating: number;
  gambar_ulasan_url: string | null;
  status_tampil: "ditampilkan" | "disembunyikan";
};

type LayananOption = {
  id_layanan: number;
  nama_layanan: string;
};

export default function UlasanPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [data, setData] = useState<UlasanAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const [layananOptions, setLayananOptions] = useState<string[]>([
    "Layanan",
  ]);

  const [filter, setFilter] = useState({
    layanan: "Layanan",
    rating: "Rating",
  });

  const [isModalHideOpen, setIsModalHideOpen] = useState(false);

  const [dataHide, setDataHide] =
    useState<UlasanAdmin | null>(null);

  const ratingOptions = [
    "Rating",
    "1",
    "2",
    "3",
    "4",
    "5",
  ];

  const ambilDataUlasan = async () => {
    try {
      setLoading(true);

      const result = await getUlasanAdmin();

      setData(result || []);
    } catch (error) {
      console.error(
        "Gagal mengambil data ulasan admin:",
        error
      );

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cekAuthDanAmbilDataUlasan = async () => {
      const user = await getCurrentUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      if (user.role !== "admin") {
        router.push("/auth/login");
        return;
      }

      setIsCheckingAuth(false);
      ambilDataUlasan();
    };

    cekAuthDanAmbilDataUlasan();
  }, [router]);

  useEffect(() => {
    const ambilDataLayanan = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/layanan`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          return;
        }

        const options = result.data.map(
          (item: LayananOption) => item.nama_layanan
        );

        setLayananOptions([
          "Layanan",
          ...options,
        ]);
      } catch (error) {
        console.error(
          "Gagal mengambil data layanan:",
          error
        );

        setLayananOptions(["Layanan"]);
      }
    };

    if (!isCheckingAuth) {
      ambilDataLayanan();
    }
  }, [isCheckingAuth]);

  const filteredData = data
    .filter((item) => {
      const matchLayanan =
        filter.layanan === "Layanan" ||
        item.nama_layanan === filter.layanan;

      const matchRating =
        filter.rating === "Rating" ||
        item.rating === Number(filter.rating);

      return matchLayanan && matchRating;
    })
    .map((item, index) => ({
      ...item,
      no: index + 1,
    }));

  function handleBukaModalHide(
    item: UlasanAdmin
  ) {
    setDataHide(item);
    setIsModalHideOpen(true);
  }

  function handleTutupModalHide() {
    setIsModalHideOpen(false);
    setDataHide(null);
  }

  async function handleKonfirmasiHide() {
    if (!dataHide) return;

    try {
      await updateStatusTampilUlasan(
        dataHide.id_ulasan,
        "disembunyikan"
      );

      await ambilDataUlasan();

      handleTutupModalHide();
    } catch (error) {
      console.error(
        "Gagal menyembunyikan ulasan:",
        error
      );
    }
  }

  async function handleTampilkan(
    item: UlasanAdmin
  ) {
    try {
      await updateStatusTampilUlasan(
        item.id_ulasan,
        "ditampilkan"
      );

      await ambilDataUlasan();
    } catch (error) {
      console.error(
        "Gagal menampilkan ulasan:",
        error
      );
    }
  }

  if (isCheckingAuth) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-semibold text-[#7D344B]">
          Memeriksa akses...
        </p>
      </section>
    );
  }

  return (
    <>
      <section>
        <Judul_Halaman title="Kelola Ulasan" />

        <Filter_Ulasan
          layananOptions={layananOptions}
          ratingOptions={ratingOptions}
          layananTerpilih={filter.layanan}
          ratingTerpilih={filter.rating}
          onChangeLayanan={(value) =>
            setFilter((prev) => ({
              ...prev,
              layanan: value,
            }))
          }
          onChangeRating={(value) =>
            setFilter((prev) => ({
              ...prev,
              rating: value,
            }))
          }
        />

        {loading ? (
          <p className="text-sm font-medium text-[#7d344b]">
            Memuat data ulasan...
          </p>
        ) : (
          <Tabel_Ulasan
            data={filteredData}
            onDelete={handleBukaModalHide}
            onTampilkan={handleTampilkan}
          />
        )}
      </section>

      <Modal_Hide
        isOpen={isModalHideOpen}
        onClose={handleTutupModalHide}
        onConfirm={handleKonfirmasiHide}
      />
    </>
  );
}