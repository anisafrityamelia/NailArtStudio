type Props_Filter_Pesanan = {
  layananOptions?: string[];
  statusOptions?: string[];
  onFilterChange?: (filter: {
    layanan?: string;
    status?: string;
  }) => void;
};

export default function Filter_Pesanan({
  layananOptions = [],
  statusOptions = [],
  onFilterChange,
}: Props_Filter_Pesanan) {
  const handleLayananChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange?.({
      layanan: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange?.({
      status: e.target.value,
    });
  };
  
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      {layananOptions.length > 0 && (
        <select
          onChange={handleLayananChange}
          className="h-8 rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs text-[#7d344b] font-semibold outline-none cursor-pointer sm:px-4 sm:text-sm">
          {layananOptions.map((option) => (
            <option key={option} className="bg-white">{option}</option>
          ))}
        </select>
      )}
      {statusOptions.length > 0 && (
        <select
          onChange={handleStatusChange}
          className="h-8 rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs text-[#7d344b] font-semibold outline-none cursor-pointer sm:px-4 sm:text-sm">
          {statusOptions.map((option) => (
            <option key={option} className="bg-white">{option}</option>
          ))}
        </select>
      )}
    </div>
  );
}