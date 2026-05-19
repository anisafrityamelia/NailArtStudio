"use client";

type Props = {
  namaLayanan: string;
};

export default function FormPlaceholderLayanan({ namaLayanan }: Props) {
  return (
    <div className="px-5 py-5">
      <div className="rounded-md border border-dashed border-[#dd98ad] bg-white/60 p-4 text-center text-xs text-[#7D344B]">
        Form pemesanan untuk layanan {namaLayanan} akan dipindahkan ke halaman
        ini pada tahap berikutnya.
      </div>
    </div>
  );
}