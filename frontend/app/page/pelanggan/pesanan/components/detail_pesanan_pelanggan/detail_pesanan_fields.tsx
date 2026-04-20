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
        className="w-full rounded-md border border-[#dd98ad] shadow-soft-text bg-white px-3 py-2 text-xs text-[#7D344B] outline-none sm:text-sm"
      />
    </div>
  );
}

export function TextareaReadonly({
  label,
  value,
  rows = 2
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
        className="w-full resize-none rounded-md border border-[#dd98ad] shadow-soft-text bg-white px-3 py-2 text-xs text-[#7D344B] outline-none sm:text-sm"
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6"
    >
      <div className="relative w-full max-w-4xl rounded-lg bg-white p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1 text-[#7D344B] hover:bg-[#f8dfe8] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex max-h-[80vh] min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-white p-4">
          <img
            src={src}
            alt={alt ?? "Preview Gambar"}
            className="max-h-[72vh] w-auto max-w-full object-contain"
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
          onClick={() => {
            if (src) setOpenPreview(true);
          }}
          className="flex h-29 w-full items-center justify-center overflow-hidden rounded-md border border-dashed border-[#dd98ad] shadow-soft-text bg-white p-2 text-xs text-[#b06a82] sm:text-sm cursor-pointer"
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