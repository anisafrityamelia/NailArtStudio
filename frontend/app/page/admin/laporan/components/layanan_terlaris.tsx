interface ItemLayananTerlaris {
  id: number;
  nama: string;
  total: string;
  persen: number;
}

interface LayananTerlarisProps {
  data: ItemLayananTerlaris[];
}

export default function LayananTerlaris({
  data,
}: LayananTerlarisProps) {
  return (
    <section className="rounded-xl border border-[#dd98ad] bg-[#fdf0f4] p-4 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:p-5">
      {/* judul layanan terlaris */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#7d344b]">
          Layanan Terlaris
        </h2>
        <p className="mt-1 text-sm text-[#b17e8e]">
          Ringkasan kontribusi layanan berdasarkan data yang lolos dari filter tanggal dan layanan.
        </p>
      </div>

      <div className="space-y-4 xl:space-y-6 mb-3">
        {data.map((item) => (
          <div key={item.id}>
            {/* nama layanan dan jumlah */}
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[#7d344b]">
                {item.nama}
              </span>
              <span className="text-xs font-medium text-[#b17e8e]">
                {item.total}
              </span>
            </div>

            {/* progress bar */}
            <div className="h-2.5 xl:h-3 rounded-full bg-[#dd98ad]">
              <div
                className="h-2.5 xl:h-3 rounded-full bg-[#7d344b] transition-all duration-500"
                style={{ width: `${item.persen}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}