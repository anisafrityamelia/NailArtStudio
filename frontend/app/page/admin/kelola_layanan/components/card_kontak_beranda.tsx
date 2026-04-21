"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

type Data_Kontak = {
  alamat: string;
  jamOperasional: string;
  instagram: string;
  tiktok: string;
  whatsapp: string;
  googleMaps: string;
};

export default function Card_Kontak_Beranda() {
  const [isEdit, setIsEdit] = useState(false);

  // data yang ditampilkan di card
  const [dataKontak, setDataKontak] = useState<Data_Kontak | null>(null);

  // data form saat edit
  const [alamat, setAlamat] = useState("");
  const [jamOperasional, setJamOperasional] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [googleMaps, setGoogleMaps] = useState("");

  useEffect(() => {
    if (isEdit && dataKontak) {
      setAlamat(dataKontak.alamat);
      setJamOperasional(dataKontak.jamOperasional);
      setInstagram(dataKontak.instagram);
      setTiktok(dataKontak.tiktok);
      setWhatsapp(dataKontak.whatsapp);
      setGoogleMaps(dataKontak.googleMaps);
    }
  }, [isEdit, dataKontak]);

  function handleBukaEdit() {
    setIsEdit(true);
  }

  function handleBatalEdit() {
    setAlamat(dataKontak?.alamat || "");
    setJamOperasional(dataKontak?.jamOperasional || "");
    setInstagram(dataKontak?.instagram || "");
    setTiktok(dataKontak?.tiktok || "");
    setWhatsapp(dataKontak?.whatsapp || "");
    setGoogleMaps(dataKontak?.googleMaps || "");
    setIsEdit(false);
  }

  function handleSimpanEdit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Data_Kontak = {
      alamat: alamat.trim(),
      jamOperasional: jamOperasional.trim(),
      instagram: instagram.trim().replace(/^@/, ""),
      tiktok: tiktok.trim().replace(/^@/, ""),
      whatsapp: whatsapp.trim(),
      googleMaps: googleMaps.trim(),
    };

    console.log("Payload kontak:", payload);

    // dummy disimpan ke state dulu
    setDataKontak(payload);
    setIsEdit(false);
  }

  return (
    <section className="rounded-xl border border-[#d3a0b0] bg-white/40 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#7D344B] sm:text-lg">Kontak</h3>

        {!isEdit ? (
          <button
            type="button"
            onClick={handleBukaEdit}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
          >
            <Pencil size={16} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBatalEdit}
              className="cursor-pointer rounded-md bg-gradient-to-r from-[#d9d9d9] to-[#dd98ad] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
            >
              Batal
            </button>

            <button
              type="submit"
              form="form-kontak-beranda"
              className="cursor-pointer rounded-md bg-gradient-to-r from-[#E45082] to-[#7D344B] px-2.5 py-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-xs text-white shadow-soft-text transition-all duration-200 ease-out hover:-translate-y-[2px] hover:opacity-95"
            >
              Simpan
            </button>
          </div>
        )}
      </div>

      <form id="form-kontak-beranda" onSubmit={handleSimpanEdit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
              Jam Operasional
            </label>
            <input
              type="text"
              value={isEdit ? jamOperasional : dataKontak?.jamOperasional || ""}
              onChange={(e) => setJamOperasional(e.target.value)}
              readOnly={!isEdit}
              placeholder={isEdit ? "Masukkan jam operasional" : ""}
              className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                isEdit
                  ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                  : "text-gray-400 bg-white/70"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
              Instagram
            </label>
            <input
              type="text"
              value={isEdit ? instagram : dataKontak?.instagram || ""}
              onChange={(e) => setInstagram(e.target.value)}
              readOnly={!isEdit}
              placeholder={isEdit ? "Contoh: username (tanpa @)" : ""}
              className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                isEdit
                  ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                  : "text-gray-400 bg-white/70"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
              Tiktok
            </label>
            <input
              type="text"
              value={isEdit ? tiktok : dataKontak?.tiktok || ""}
              onChange={(e) => setTiktok(e.target.value)}
              readOnly={!isEdit}
              placeholder={isEdit ? "Contoh: username (tanpa @)" : ""}
              className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                isEdit
                  ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                  : "text-gray-400 bg-white/70"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
              No WhatsApp Admin
            </label>
            <input
              type="text"
              value={isEdit ? whatsapp : dataKontak?.whatsapp || ""}
              onChange={(e) => setWhatsapp(e.target.value)}
              readOnly={!isEdit}
              placeholder={isEdit ? "Contoh: 0812xxxxxxxx" : ""}
              className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                isEdit
                  ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                  : "text-gray-400 bg-white/70"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
              Alamat
            </label>
            <textarea
              value={isEdit ? alamat : dataKontak?.alamat || ""}
              onChange={(e) => setAlamat(e.target.value)}
              readOnly={!isEdit}
              rows={4}
              placeholder={isEdit ? "Masukkan alamat" : ""}
              className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                isEdit
                  ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                  : "text-gray-400 bg-white/70"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#7D344B] sm:text-sm">
              Link Google Maps
            </label>
            <input
              type="text"
              value={isEdit ? googleMaps : dataKontak?.googleMaps || ""}
              onChange={(e) => setGoogleMaps(e.target.value)}
              readOnly={!isEdit}
              placeholder={isEdit ? "Masukkan link google maps" : ""}
              className={`w-full rounded-md border border-[#dd98ad] px-3 py-2 text-xs text-[#7D344B] outline-none transition shadow-soft-text sm:text-sm ${
                isEdit
                  ? "bg-white focus:border-[#c75b82] focus:ring-2 focus:ring-[#e9a9c0]"
                  : "text-gray-400 bg-white/70"
              }`}
            />
          </div>
        </div>
      </form>
    </section>
  );
}