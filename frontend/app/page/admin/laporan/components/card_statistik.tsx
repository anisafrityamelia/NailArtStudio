interface CardStatistikProps {
  judul: string;
  nilai: string;
  keterangan: string;
}

export default function CardStatistik({
  judul,
  nilai,
  keterangan,
}: CardStatistikProps) {
  return (
    <div className="rounded-xl border border-[#dd98ad] bg-[#fdf0f4] p-4 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:p-5">
      {/* judul card */}
      <h3 className="text-base font-semibold text-[#7d344b]">{judul}</h3>

      {/* nilai */}
      <p className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-[#7b304b] sm:text-[2rem]">
        {nilai}
      </p>

      {/* Keterangan */}
      <p className="mt-2 text-xs sm:text-sm text-[#b17e8e]">{keterangan}</p>
    </div>
  );
}