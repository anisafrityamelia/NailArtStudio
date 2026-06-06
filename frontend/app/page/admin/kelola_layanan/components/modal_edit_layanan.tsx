"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

type GambarLayanan = {
  id_gambar: number;
  id_layanan: number;
  path_gambar: string;
  url_gambar: string;
};

type KategoriHargaLayanan = {
  id_kategori_harga: number;
  id_layanan: number;
  nama_kategori: string;
  deskripsi_kategori: string | null;
  estimasi_harga: number;
  gambar_kategori: string | null;
  url_gambar_kategori: string | null;
  urutan: number;
  status: "aktif" | "nonaktif";
};

type DataLayanan = {
  id_layanan: number;
  layanan: string;
  kategori_layanan: string;
  deskripsi: string;
  estimasiHarga: number;
  durasi: number;
  gambar: GambarLayanan[];
  kategoriHarga: KategoriHargaLayanan[];
  statusLayanan: string;
};

export type PayloadEditLayanan = {
  id_layanan: number;
  layanan: string;
  kategori_layanan: string;
  deskripsi: string;
  estimasiHarga: number;
  durasi: number;
  statusLayanan: string;
  fileGambar1: File | null;
  fileGambar2: File | null;
  fileGambar3: File | null;
  fileGambar4: File | null;
};

export type PayloadKategoriHarga = {
  nama_kategori: string;
  deskripsi_kategori: string;
  estimasi_harga: number;
  urutan: number;
  status: "aktif" | "nonaktif";
  file_gambar_kategori: File | null;
};

type PropsModalEditLayanan = {
  isOpen: boolean;
  onClose: () => void;
  data: DataLayanan | null;
  onSubmit: (payload: PayloadEditLayanan) => void;
  onTambahKategoriHarga: (
    id_layanan: number,
    payload: PayloadKategoriHarga
  ) => Promise<KategoriHargaLayanan>;
  onUpdateKategoriHarga: (
    id_kategori_harga: number,
    payload: PayloadKategoriHarga
  ) => Promise<KategoriHargaLayanan>;
  onHapusKategoriHarga: (id_kategori_harga: number) => Promise<void>;
};

export default function ModalEditLayanan({
  isOpen,
  onClose,
  data,
  onSubmit,
  onTambahKategoriHarga,
  onUpdateKategoriHarga,
  onHapusKategoriHarga,
}: PropsModalEditLayanan) {
  const [layanan, setLayanan] = useState("");
  const [kategoriLayanan, setKategoriLayanan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [estimasiHarga, setEstimasiHarga] = useState("");
  const [durasi, setDurasi] = useState("");
  const [statusLayanan, setStatusLayanan] = useState("Aktif");

  const [gambar1, setGambar1] = useState("");
  const [gambar2, setGambar2] = useState("");
  const [gambar3, setGambar3] = useState("");
  const [gambar4, setGambar4] = useState("");

  const [fileGambar1, setFileGambar1] = useState<File | null>(null);
  const [fileGambar2, setFileGambar2] = useState<File | null>(null);
  const [fileGambar3, setFileGambar3] = useState<File | null>(null);
  const [fileGambar4, setFileGambar4] = useState<File | null>(null);

  const [previewGambar1, setPreviewGambar1] = useState("");
  const [previewGambar2, setPreviewGambar2] = useState("");
  const [previewGambar3, setPreviewGambar3] = useState("");
  const [previewGambar4, setPreviewGambar4] = useState("");

  const [kategoriHarga, setKategoriHarga] = useState<KategoriHargaLayanan[]>([]);
  const [isFormKategoriOpen, setIsFormKategoriOpen] = useState(false);
  const [modeKategori, setModeKategori] = useState<"tambah" | "edit">("tambah");
  const [kategoriEdit, setKategoriEdit] = useState<KategoriHargaLayanan | null>(null);

  const [namaKategori, setNamaKategori] = useState("");
  const [deskripsiKategori, setDeskripsiKategori] = useState("");
  const [estimasiHargaKategori, setEstimasiHargaKategori] = useState("");
  const [urutanKategori, setUrutanKategori] = useState("");
  const [statusKategori, setStatusKategori] = useState<"aktif" | "nonaktif">("aktif");
  const [fileGambarKategori, setFileGambarKategori] = useState<File | null>(null);
  const [previewGambarKategori, setPreviewGambarKategori] = useState("");

  const [errorNamaKategori, setErrorNamaKategori] = useState("");
  const [errorEstimasiHarga, setErrorEstimasiHarga] = useState("");

  const formatRupiah = (harga: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga);
  };

  useEffect(() => {
    if (isOpen && data) {
      setLayanan(data.layanan);
      setKategoriLayanan(data.kategori_layanan);
      setDeskripsi(data.deskripsi);
      setEstimasiHarga(String(data.estimasiHarga));
      setDurasi(String(data.durasi));
      setStatusLayanan(data.statusLayanan);

      setFileGambar1(null);
      setFileGambar2(null);
      setFileGambar3(null);
      setFileGambar4(null);

      setGambar1(data.gambar[0]?.path_gambar || "");
      setGambar2(data.gambar[1]?.path_gambar || "");
      setGambar3(data.gambar[2]?.path_gambar || "");
      setGambar4(data.gambar[3]?.path_gambar || "");

      setPreviewGambar1(data.gambar[0]?.url_gambar || "");
      setPreviewGambar2(data.gambar[1]?.url_gambar || "");
      setPreviewGambar3(data.gambar[2]?.url_gambar || "");
      setPreviewGambar4(data.gambar[3]?.url_gambar || "");

      setKategoriHarga(data.kategoriHarga || []);
      resetFormKategori();
    }
  }, [isOpen, data]);

  if (!isOpen || !data) return null;

  function resetFormKategori() {
    setIsFormKategoriOpen(false);
    setModeKategori("tambah");
    setKategoriEdit(null);
    setNamaKategori("");
    setDeskripsiKategori("");
    setEstimasiHargaKategori("");
    setUrutanKategori("");
    setStatusKategori("aktif");
    setFileGambarKategori(null);
    setPreviewGambarKategori("");
    setErrorNamaKategori("");
    setErrorEstimasiHarga("");
  }

  const handleChangeFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void,
    setNamaFile: (nama: string) => void,
    setPreview: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);
    setNamaFile(file.name);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      id_layanan: data.id_layanan,
      layanan,
      kategori_layanan: kategoriLayanan,
      deskripsi,
      estimasiHarga: Number(estimasiHarga),
      durasi: Number(durasi),
      statusLayanan,
      fileGambar1,
      fileGambar2,
      fileGambar3,
      fileGambar4,
    });
  };

  const handleBukaTambahKategori = () => {
    resetFormKategori();
    setIsFormKategoriOpen(true);
    setModeKategori("tambah");
  };

  const handleBukaEditKategori = (item: KategoriHargaLayanan) => {
    setIsFormKategoriOpen(true);
    setModeKategori("edit");
    setKategoriEdit(item);
    setNamaKategori(item.nama_kategori);
    setDeskripsiKategori(item.deskripsi_kategori || "");
    setEstimasiHargaKategori(String(item.estimasi_harga));
    setUrutanKategori(String(item.urutan));
    setStatusKategori(item.status);
    setFileGambarKategori(null);
    setPreviewGambarKategori(item.url_gambar_kategori || "");
  };

  const handleSimpanKategori = async () => {
    setErrorNamaKategori("");
    setErrorEstimasiHarga("");

    let valid = true;

    if (!namaKategori.trim()) {
      setErrorNamaKategori("Nama kategori wajib diisi");
      valid = false;
    }

    if (!estimasiHargaKategori.trim()) {
      setErrorEstimasiHarga("Estimasi harga wajib diisi");
      valid = false;
    }

    if (!valid) return;

    try {
      const payload: PayloadKategoriHarga = {
        nama_kategori: namaKategori,
        deskripsi_kategori: deskripsiKategori,
        estimasi_harga: Number(estimasiHargaKategori),
        urutan: Number(urutanKategori || 0),
        status: statusKategori,
        file_gambar_kategori: fileGambarKategori,
      };

      if (modeKategori === "tambah") {
        const kategoriBaru = await onTambahKategoriHarga(data.id_layanan, payload);
        setKategoriHarga((prev) => [...prev, kategoriBaru]);
      } else if (kategoriEdit) {
        const kategoriUpdate = await onUpdateKategoriHarga(
          kategoriEdit.id_kategori_harga,
          payload
        );

        setKategoriHarga((prev) =>
          prev.map((item) =>
            item.id_kategori_harga === kategoriEdit.id_kategori_harga
              ? kategoriUpdate
              : item
          )
        );

      }

      resetFormKategori();
    } catch (error) {
      console.error("Gagal menyimpan kategori harga:", error);
    }
  };

  const handleHapusKategori = async (item: KategoriHargaLayanan) => {
    try {
      await onHapusKategoriHarga(item.id_kategori_harga);

      setKategoriHarga((prev) =>
        prev.filter(
          (kategori) => kategori.id_kategori_harga !== item.id_kategori_harga
        )
      );

    } catch (error) {
      console.error("Gagal menghapus kategori harga:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-4 sm:px-4 sm:py-6">
      <div className="max-h-[94vh] w-full max-w-[330px] overflow-y-auto rounded-xl bg-[#ffecf2] shadow-[0_15px_45px_rgba(125,52,75,0.25)] sm:max-w-md sm:rounded-2xl md:max-w-4xl lg:max-w-6xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-4 py-3 shadow-soft-text sm:px-5 sm:py-4 md:px-7">
          <h2 className="text-sm font-semibold text-[#7D344B] sm:text-lg">
            Edit Layanan
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-[#7D344B] transition hover:bg-[#f8dfe8]"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 px-3 py-3 sm:space-y-5 sm:px-5 sm:py-5 md:px-7 lg:px-8"
        >
          <div className="grid gap-3 sm:gap-5 lg:grid-cols-2">
            <div className="rounded-md border border-[#dd98ad] bg-[#ffecf2] p-2.5 shadow-soft-text sm:rounded-lg sm:p-3 md:p-4">
              <h3 className="mb-2 text-xs font-semibold text-[#7D344B] sm:mb-3 sm:text-sm">
                Informasi Layanan
              </h3>

              <div className="space-y-2 sm:space-y-3">
                <InputText label="Nama Layanan" value={layanan} onChange={setLayanan} />

                <InputText
                  label="Deskripsi Layanan"
                  value={deskripsi}
                  onChange={setDeskripsi}
                />

                <InputText
                  label="Estimasi Harga"
                  value={estimasiHarga}
                  onChange={(value) => setEstimasiHarga(value.replace(/\D/g, ""))}
                />

                <InputText
                  label="Durasi Pengerjaan Layanan (Menit)"
                  value={durasi}
                  onChange={(value) => setDurasi(value.replace(/\D/g, ""))}
                />

                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label className="text-[11px] font-semibold text-[#7D344B] sm:text-sm">
                    Status Layanan
                  </label>

                  <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
                    <label className="flex items-center gap-2 rounded-md border border-[#dd98ad] bg-white px-2.5 py-1.5 text-[11px] text-[#7D344B] sm:px-3 sm:py-2 sm:text-sm">
                      <input
                        type="radio"
                        name="statusLayanan"
                        value="Aktif"
                        checked={statusLayanan === "Aktif"}
                        onChange={(e) => setStatusLayanan(e.target.value)}
                        className="accent-[#c75b82]"
                      />
                      Aktif
                    </label>

                    <label className="flex items-center gap-2 rounded-md border border-[#dd98ad] bg-white px-2.5 py-1.5 text-[11px] text-[#7D344B] sm:px-3 sm:py-2 sm:text-sm">
                      <input
                        type="radio"
                        name="statusLayanan"
                        value="Nonaktif"
                        checked={statusLayanan === "Nonaktif"}
                        onChange={(e) => setStatusLayanan(e.target.value)}
                        className="accent-[#c75b82]"
                      />
                      Nonaktif
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-[#dd98ad] bg-[#ffecf2] p-2.5 shadow-soft-text sm:rounded-lg sm:p-3 md:p-4">
              <h3 className="mb-2 text-xs font-semibold text-[#7D344B] sm:mb-3 sm:text-sm">
                Gambar Layanan
              </h3>

              <div className="grid gap-2 sm:gap-3 md:grid-cols-2 md:gap-4">
                {[
                  {
                    label: "Gambar 1",
                    gambar: gambar1,
                    preview: previewGambar1,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeFile(e, setFileGambar1, setGambar1, setPreviewGambar1),
                  },
                  {
                    label: "Gambar 2",
                    gambar: gambar2,
                    preview: previewGambar2,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeFile(e, setFileGambar2, setGambar2, setPreviewGambar2),
                  },
                  {
                    label: "Gambar 3",
                    gambar: gambar3,
                    preview: previewGambar3,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeFile(e, setFileGambar3, setGambar3, setPreviewGambar3),
                  },
                  {
                    label: "Gambar 4",
                    gambar: gambar4,
                    preview: previewGambar4,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChangeFile(e, setFileGambar4, setGambar4, setPreviewGambar4),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex min-w-0 flex-col gap-1">
                    <label className="text-[11px] font-semibold text-[#7D344B] sm:text-sm">
                      {item.label}
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={item.onChange}
                      className="w-full min-w-0 rounded-md border border-[#dd98ad] bg-white px-2 py-1 text-[10px] text-[#7D344B] outline-none shadow-soft-text file:mr-2 file:cursor-pointer file:rounded file:border-0 file:bg-[#e6b1c2] file:px-2 file:py-1 file:text-[10px] file:text-white hover:file:bg-[#d996ad] sm:px-3 sm:py-1.5 sm:text-sm sm:file:mr-3 sm:file:px-3 sm:file:text-xs"
                    />

                    {item.gambar && (
                      <p className="max-w-full truncate text-[10px] text-[#7D344B]/80 sm:text-[11px]">
                        File: {item.gambar}
                      </p>
                    )}

                    {item.preview && (
                      <img
                        src={item.preview}
                        alt={`Preview ${item.label}`}
                        className="mt-1 h-16 w-16 rounded-md border border-[#dd98ad] object-cover sm:mt-2 sm:h-24 sm:w-full md:h-28"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-md border border-[#dd98ad] bg-white/50 p-2.5 sm:rounded-lg sm:p-3 md:p-4">
            <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3 sm:gap-3">
              <h3 className="text-xs font-semibold text-[#7D344B] sm:text-sm">
                Kategori Harga Layanan
              </h3>

              <button
                type="button"
                onClick={handleBukaTambahKategori}
                className="flex cursor-pointer items-center gap-1 rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-[10px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-[11px]"
              >
                <Plus size={13} />
                Tambah 
              </button>
            </div>

            <div className="grid gap-2 sm:gap-3 lg:grid-cols-2">
              {kategoriHarga.length === 0 && (
                <p className="rounded-md border border-dashed border-[#dd98ad] p-3 text-center text-xs text-[#7D344B]/70 lg:col-span-2">
                  Belum ada kategori harga
                </p>
              )}

              {kategoriHarga.map((item) => (
                <div
                  key={item.id_kategori_harga}
                  className="rounded-md border border-[#dd98ad] bg-[#ffecf2] p-2.5 shadow-soft-text sm:p-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    {item.url_gambar_kategori ? (
                      <img
                        src={item.url_gambar_kategori}
                        alt={item.nama_kategori}
                        className="h-20 w-full rounded-md object-cover sm:h-24 sm:w-24 md:h-28 md:w-28"
                      />
                    ) : (
                      <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-md bg-white text-center text-[10px] text-[#7D344B]/60 sm:h-24 sm:w-24 md:h-28 md:w-28">
                        Tidak ada gambar
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-[#7D344B] sm:text-sm">
                            {item.nama_kategori}
                          </p>
                          <p className="text-xs font-semibold text-[#E45082] sm:text-sm">
                            {formatRupiah(item.estimasi_harga)}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] text-[#7D344B]">
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-1 line-clamp-2 text-[11px] text-[#7D344B]/80 sm:text-xs">
                        {item.deskripsi_kategori || "-"}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleBukaEditKategori(item)}
                          className="flex cursor-pointer items-center gap-1 rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-[10px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[1px] hover:opacity-95 sm:text-[11px]"
                        >
                          <Pencil size={12} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleHapusKategori(item)}
                          className="flex cursor-pointer items-center gap-1 rounded bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2 py-1 text-[10px] text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[1px] hover:opacity-95 sm:text-[11px]"
                        >
                          <Trash2 size={12} />
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isFormKategoriOpen && (
              <div className="mt-3 rounded-md border border-[#dd98ad] bg-[#ffecf2] p-2.5 sm:mt-4 sm:p-3 md:p-4">
                <h4 className="mb-2 text-xs font-semibold text-[#7D344B] sm:mb-3 sm:text-sm">
                  {modeKategori === "tambah"
                    ? "Tambah Kategori Harga"
                    : "Edit Kategori Harga"}
                </h4>

                <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                  <InputText
                    label="Nama Kategori"
                    value={namaKategori}
                    onChange={(value) => {
                      setNamaKategori(value);
                      setErrorNamaKategori("");
                    }}
                    error={errorNamaKategori}
                  />

                  <InputText
                    label="Estimasi Harga"
                    value={estimasiHargaKategori}
                    onChange={(value) => {
                      setEstimasiHargaKategori(value.replace(/\D/g, ""));
                      setErrorEstimasiHarga("");
                    }}
                    error={errorEstimasiHarga}
                  />

                  <div className="md:col-span-2">
                    <InputText
                      label="Deskripsi"
                      value={deskripsiKategori}
                      onChange={setDeskripsiKategori}
                    />
                  </div>

                  <InputText
                    label="Urutan"
                    value={urutanKategori}
                    onChange={(value) =>
                      setUrutanKategori(value.replace(/\D/g, ""))
                    }
                  />

                  <div className="flex min-w-0 flex-col gap-1">
                    <label className="text-[11px] font-semibold text-[#7D344B] sm:text-sm">
                      Gambar Kategori
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleChangeFile(
                          e,
                          setFileGambarKategori,
                          () => {},
                          setPreviewGambarKategori
                        )
                      }
                      className="w-full min-w-0 rounded-md border border-[#dd98ad] bg-white px-2 py-1 text-[10px] text-[#7D344B] outline-none shadow-soft-text file:mr-2 file:cursor-pointer file:rounded file:border-0 file:bg-[#e6b1c2] file:px-2 file:py-1 file:text-[10px] file:text-white hover:file:bg-[#d996ad] sm:px-3 sm:py-1.5 sm:text-sm sm:file:mr-3 sm:file:px-3 sm:file:text-xs"
                    />

                    {previewGambarKategori && (
                      <img
                        src={previewGambarKategori}
                        alt="Preview kategori"
                        className="mt-1 h-20 w-full rounded-md border border-[#dd98ad] object-cover sm:mt-2 sm:h-24 sm:w-24"
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 sm:gap-2 md:col-span-2">
                    <label className="text-[11px] font-semibold text-[#7D344B] sm:text-sm">
                      Status Kategori
                    </label>

                    <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
                      <label className="flex items-center gap-2 rounded-md border border-[#dd98ad] bg-white px-2.5 py-1.5 text-[11px] text-[#7D344B] sm:px-3 sm:py-2 sm:text-sm">
                        <input
                          type="radio"
                          name="statusKategori"
                          value="aktif"
                          checked={statusKategori === "aktif"}
                          onChange={() => setStatusKategori("aktif")}
                          className="accent-[#c75b82]"
                        />
                        Aktif
                      </label>

                      <label className="flex items-center gap-2 rounded-md border border-[#dd98ad] bg-white px-2.5 py-1.5 text-[11px] text-[#7D344B] sm:px-3 sm:py-2 sm:text-sm">
                        <input
                          type="radio"
                          name="statusKategori"
                          value="nonaktif"
                          checked={statusKategori === "nonaktif"}
                          onChange={() => setStatusKategori("nonaktif")}
                          className="accent-[#c75b82]"
                        />
                        Nonaktif
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2 md:col-span-2">
                    <button
                      type="button"
                      onClick={handleSimpanKategori}
                      className="flex-1 cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-3 py-1.5 text-[11px] font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:py-2 sm:text-xs"
                    >
                      Simpan Kategori
                    </button>

                    <button
                      type="button"
                      onClick={resetFormKategori}
                      className="flex-1 cursor-pointer rounded-md bg-gradient-to-r from-[#d9d9d9] to-[#dd98ad] px-3 py-1.5 text-[11px] font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:py-2 sm:text-xs"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-4 py-2 text-[11px] font-medium text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:text-sm"
          >
            Simpan Perubahan Layanan
          </button>
        </form>
      </div>
    </div>
  );
}

function InputText({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-[#7D344B] sm:text-sm">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-[#dd98ad] bg-white px-2.5 py-1.5 text-[11px] text-[#7D344B] outline-none shadow-soft-text transition focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0] sm:px-3 sm:py-2 sm:text-sm"
      />

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}