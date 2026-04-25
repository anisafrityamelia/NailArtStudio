"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function InputReadonly({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[#7D344B] sm:text-sm">
        {label}
      </label>
      <input
        type="text"
        value={value ?? ""}
        readOnly
        className="w-full rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
      />
    </div>
  );
}

export function TextareaReadonly({
  label,
  value,
  rows = 2,
}: {
  label: string;
  value?: string | number;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-[#7D344B] sm:text-sm">
        {label}
      </label>
      <textarea
        value={value ?? ""}
        readOnly
        rows={rows}
        className="w-full resize-none rounded-md border border-[#dd98ad] bg-white px-3 py-2 text-xs text-[#7D344B] outline-none shadow-soft-text sm:text-sm"
      />
    </div>
  );
}

function ModalPreviewGambar({
  isOpen,
  onClose,
  src,
  alt,
}: {
  isOpen: boolean;
  onClose: () => void;
  src?: string | null;
  alt?: string;
}) {
  if (!isOpen || !src) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="relative flex max-h-[85vh] w-full max-w-sm flex-col rounded-lg bg-white p-3 shadow-2xl sm:max-w-2xl md:max-w-4xl">
        <div className="mb-2 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#ffecf2] text-[#7D344B] hover:bg-[#f8dfe8]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-lg bg-white sm:min-h-[300px]">
          <img
            src={src}
            alt={alt ?? "Preview Gambar"}
            className="max-h-[70vh] w-auto max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export function UploadPreviewReadonly({
  label,
  src,
  alt,
}: {
  label: string;
  src?: string | null;
  alt?: string;
}) {
  const [openPreview, setOpenPreview] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-[#7D344B] sm:text-sm">
          {label}
        </label>

        <button
          type="button"
          onClick={() => src && setOpenPreview(true)}
          className="flex h-28 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-[#dd98ad] bg-white p-2 text-xs text-[#b06a82] shadow-soft-text sm:h-32 sm:text-sm"
        >
          {src ? (
            <img
              src={src}
              alt={alt ?? label}
              className="h-full w-full object-contain"
            />
          ) : (
            "Preview Gambar"
          )}
        </button>

        {src && (
          <p className="text-[11px] text-red-500 sm:text-xs">
            *Klik gambar untuk melihat dengan lebih jelas
          </p>
        )}
      </div>

      <ModalPreviewGambar
        isOpen={openPreview}
        onClose={() => setOpenPreview(false)}
        src={src}
        alt={alt}
      />
    </>
  );
}