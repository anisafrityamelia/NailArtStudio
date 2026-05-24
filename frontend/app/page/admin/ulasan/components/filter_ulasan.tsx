type Props_Filter_Ulasan = {
  layananOptions: string[];
  ratingOptions: string[];
  layananTerpilih: string;
  ratingTerpilih: string;
  onChangeLayanan: (value: string) => void;
  onChangeRating: (value: string) => void;
};

export default function Filter_Ulasan({
  layananOptions,
  ratingOptions,
  layananTerpilih,
  ratingTerpilih,
  onChangeLayanan,
  onChangeRating,
}: Props_Filter_Ulasan) {
  return (
    <div className="mb-5 flex flex-wrap gap-3">
      <select
        value={layananTerpilih}
        onChange={(event) => onChangeLayanan(event.target.value)}
        className="h-8 cursor-pointer rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs font-semibold text-[#7d344b] outline-none sm:px-4 sm:text-sm"
      >
        {layananOptions.map((option) => (
          <option key={option} value={option} className="bg-white">
            {option}
          </option>
        ))}
      </select>

      <select
        value={ratingTerpilih}
        onChange={(event) => onChangeRating(event.target.value)}
        className="h-8 cursor-pointer rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs font-semibold text-[#7d344b] outline-none sm:px-4 sm:text-sm"
      >
        {ratingOptions.map((option) => (
          <option key={option} value={option} className="bg-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}