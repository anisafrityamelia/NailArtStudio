"use client";

import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomSheetPemesanan({
  isOpen,
  title,
  subtitle,
  onClose,
  children,
}: Props) {
  return (
    <div
        onClick={onClose}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4 py-6 transition-all duration-200 ${
            isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[88vh] w-full max-w-md overflow-y-auto rounded-lg bg-[#ffecf2] shadow-xl transition-transform duration-200 md:max-w-2xl lg:max-w-3xl ${
            isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dd98ad] bg-[#ffecf2] px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-[#7D344B]">
              {title}
            </h2>

            {subtitle && (
              <p className="text-[11px] text-[#7D344B]/70">
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-1 text-[#7D344B] hover:bg-[#f8dfe8]"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}