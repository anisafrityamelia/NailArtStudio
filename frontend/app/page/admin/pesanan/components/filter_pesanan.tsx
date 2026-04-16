type Props_Filter_Pesanan = {
  layananOptions?: string[];
  statusOptions: string[];
};

export default function Filter_Pesanan({
  layananOptions = ["Layanan", "Press On"],
  statusOptions,
}: Props_Filter_Pesanan) {
  return (
    <div className="flex flex-wrap gap-3 mb-5">
        <select className="h-8 rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs text-[#7d344b] font-semibold outline-none cursor-pointer sm:px-4 sm:text-sm">
            {layananOptions.map((option) => (
                <option key={option} className="bg-white">{option}</option>
            ))}
        </select>

        <select className="h-8 rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs text-[#7d344b] font-semibold outline-none cursor-pointer sm:px-4 sm:text-sm">
          {statusOptions.map((option) => (
                <option key={option} className="bg-white">{option}</option>
            ))}
        </select>
    </div>
  );
}