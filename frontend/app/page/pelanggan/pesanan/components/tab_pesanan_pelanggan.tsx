type PropsTabPesananPelanggan = {
  activeTab: "aktif" | "riwayat";
  onChangeTab: (tab: "aktif" | "riwayat") => void;
};

export default function TabPesanan({
  activeTab,
  onChangeTab,
}: PropsTabPesananPelanggan) {
  const baseClass = "rounded border px-2 py-1.5 sm:px-3 text-xs font-medium transition-all duration-200 sm:text-sm hover:opacity-90 cursor-pointer";
  const activeClass = "border-[#c88ca1] bg-[#dd98ad] text-[#7d344b] shadow-soft-text";
  const inactiveClass = "border-[#d8a4b4] bg-white text-[#a0516b] hover:bg-[#fde6ee]";

  return (
    <div className="mb-5 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onChangeTab("aktif")}
        className={`${baseClass} ${activeTab === "aktif" ? activeClass : inactiveClass}`}
      >
        Pesanan Aktif
      </button>

      <button
        type="button"
        onClick={() => onChangeTab("riwayat")}
        className={`${baseClass} ${activeTab === "riwayat" ? activeClass : inactiveClass}`}
      >
        Riwayat Pesanan
      </button>
    </div>
  );
}