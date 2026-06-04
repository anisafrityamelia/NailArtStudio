"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { updateBerandaAdmin } from "@/app/lib/beranda";

type Props = {
  dataBeranda: any;
  onRefresh: () => Promise<void>;
};

export default function Card_Kontak_Beranda({ dataBeranda, onRefresh }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alamat, setAlamat] = useState("");
  const [jamOperasional, setJamOperasional] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [googleMaps, setGoogleMaps] = useState("");

  useEffect(() => {
    setAlamat(dataBeranda?.alamat_studio || "");
    setJamOperasional(dataBeranda?.jam_buka || "");
    setInstagram(dataBeranda?.akun_ig || "");
    setTiktok(dataBeranda?.akun_tiktok || "");
    setWhatsapp(dataBeranda?.no_wa || "");
    setGoogleMaps(dataBeranda?.link_lokasi || "");
  }, [dataBeranda]);

  function handleBukaEdit() {
    setIsEdit(true);
  }

  function handleBatalEdit() {
    setAlamat(dataBeranda?.alamat_studio || "");
    setJamOperasional(dataBeranda?.jam_buka || "");
    setInstagram(dataBeranda?.akun_ig || "");
    setTiktok(dataBeranda?.akun_tiktok || "");
    setWhatsapp(dataBeranda?.no_wa || "");
    setGoogleMaps(dataBeranda?.link_lokasi || "");
    setIsEdit(false);
  }

  async function handleSimpanEdit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateBerandaAdmin({
        alamat_studio: alamat.trim(),
        jam_buka: jamOperasional.trim(),
        akun_ig: instagram.trim().replace(/^@/, ""),
        akun_tiktok: tiktok.trim().replace(/^@/, ""),
        no_wa: whatsapp.trim(),
        link_lokasi: googleMaps.trim(),
      });

      await onRefresh();
      setIsEdit(false);
    } catch (error) {
      console.error("Gagal memperbarui kontak:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-[#d3a0b0] bg-white/40 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">
          Kontak
        </h3>

        {!isEdit ? (
          <button
            type="button"
            onClick={handleBukaEdit}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            <Pencil size={16} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBatalEdit}
              disabled={loading}
              className="cursor-pointer rounded-md bg-gradient-to-r from-[#d9d9d9] to-[#dd98ad] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              Batal
            </button>

            <button
              type="submit"
              form="form-kontak-beranda"
              disabled={loading}
              className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        )}
      </div>

      <form id="form-kontak-beranda" onSubmit={handleSimpanEdit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputKontak
            label="Jam Operasional"
            value={jamOperasional}
            setValue={setJamOperasional}
            isEdit={isEdit}
            placeholder="Masukkan jam operasional"
          />

          <InputKontak
            label="Instagram"
            value={instagram}
            setValue={setInstagram}
            isEdit={isEdit}
            placeholder="Contoh: username tanpa @"
          />

          <InputKontak
            label="Tiktok"
            value={tiktok}
            setValue={setTiktok}
            isEdit={isEdit}
            placeholder="Contoh: username tanpa @"
          />

          <InputKontak
            label="No WhatsApp Admin"
            value={whatsapp}
            setValue={setWhatsapp}
            isEdit={isEdit}
            placeholder="Contoh: 0812xxxxxxxx"
          />

          <TextareaKontak
            label="Alamat"
            value={alamat}
            setValue={setAlamat}
            isEdit={isEdit}
            placeholder="Masukkan alamat"
          />

          <InputKontak
            label="Link Google Maps"
            value={googleMaps}
            setValue={setGoogleMaps}
            isEdit={isEdit}
            placeholder="Masukkan link google maps"
          />
        </div>
      </form>
    </section>
  );
}

function InputKontak({
  label,
  value,
  setValue,
  isEdit,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  isEdit: boolean;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        readOnly={!isEdit}
        placeholder={isEdit ? placeholder : ""}
        className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] shadow-soft-text outline-none transition sm:text-sm ${
          isEdit
            ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
            : "bg-white/70 text-gray-400"
        }`}
      />
    </div>
  );
}

function TextareaKontak({
  label,
  value,
  setValue,
  isEdit,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  isEdit: boolean;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        readOnly={!isEdit}
        rows={4}
        placeholder={isEdit ? placeholder : ""}
        className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] shadow-soft-text outline-none transition sm:text-sm ${
          isEdit
            ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
            : "bg-white/70 text-gray-400"
        }`}
      />
    </div>
  );
}