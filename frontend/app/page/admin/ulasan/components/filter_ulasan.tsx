type Props_Filter_Ulasan = {
    layananOptions: string[];
    ratingOptions: string[];
};

export default function Filter_Ulasan({
    layananOptions,
    ratingOptions,
}: Props_Filter_Ulasan) {
    return (
        <div className="flex flex-wrap gap-3 mb-5">
            <select className="h-8 rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs text-[#7d344b] font-semibold outline-none cursor-pointer sm:px-4 sm:text-sm">
                {layananOptions.map((option) => (
                    <option key={option} className="bg-white">{option}</option>
                ))}
            </select>

            <select className="h-8 rounded border border-[#c88ca1] bg-[#dd98ad] px-2 text-xs text-[#7d344b] font-semibold outline-none cursor-pointer sm:px-4 sm:text-sm">
                {ratingOptions.map((option) => (
                    <option key={option} className="bg-white">{option}</option>
                ))}
            </select>
        </div>
    );
}