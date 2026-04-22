import type { Pesanan } from "./type";

type Props = {
    daftar_pesanan: Pesanan[];
    bulan_aktif: number;
    tahun_aktif: number;
    daftar_tahun: number[];
    on_ganti_bulan: (bulan: number) => void;
    on_ganti_tahun: (tahun: number) => void;
};

const nama_bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
];

const nama_hari_lengkap = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
];

{ /* mengubah format tanggal menjadi lebih enak dibaca */}
function format_judul_tanggal(tanggal: string) {
    const parsed = new Date(tanggal);
    const nama_hari = nama_hari_lengkap[parsed.getDay()];
    const tanggal_angka = parsed.getDate();
    const nama_bulan_full = nama_bulan[parsed.getMonth()];
    const tahun = parsed.getFullYear();

    return `${nama_hari}, ${tanggal_angka} ${nama_bulan_full} ${tahun}`;
}

export default function Jadwal_Bulanan({
    daftar_pesanan,
    bulan_aktif,
    tahun_aktif,
    daftar_tahun,
    on_ganti_bulan,
    on_ganti_tahun,
}: Props) {
    {/* mengubah data pesanan jadi dikelompokkan pertanggal */}
    const grup_per_tanggal = daftar_pesanan.reduce<Record<string, Pesanan[]>>(
        (hasil, item) => {
            if (!item.tanggal) return hasil;

            if (!hasil[item.tanggal]) {
                hasil[item.tanggal] = [];
            }

            hasil[item.tanggal].push(item);
            return hasil;
        },
        {}
    );

    const daftar_tanggal = Object.keys(grup_per_tanggal).sort((a, b) =>
        a.localeCompare(b)
    );

    return (
        <section className="rounded-[12px] border border-[#dd98ad] bg-[#fdf0f4] p-4 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:p-5">
            <div className="mb-5 grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:items-center">
                <select
                    value={bulan_aktif}
                    onChange={(e) => on_ganti_bulan(Number(e.target.value))}
                    className="h-[32px] w-full rounded-[4px] border border-[#c88ca1] bg-[#dd98ad] px-3 text-[13px] text-[#7d344b] outline-none cursor-pointer sm:w-fit sm:text-[14px]"
                >
                    {nama_bulan.map((bulan, index) => (
                        <option key={bulan} value={index}>
                            {bulan}
                        </option>
                    ))}
                </select>

                <select
                    value={tahun_aktif}
                    onChange={(e) => on_ganti_tahun(Number(e.target.value))}
                    className="h-[32px] w-full rounded-[4px] border border-[#c88ca1] bg-[#dd98ad] px-3 text-[13px] text-[#7d344b] outline-none cursor-pointer sm:w-fit sm:text-[14px]"
                >
                    {daftar_tahun.map((tahun) => (
                        <option key={tahun} value={tahun}>
                            {tahun}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                {daftar_tanggal.length > 0 ? (
                    daftar_tanggal.map((tanggal) => (
                        <div
                            key={tanggal}
                            className="border-t border-[#dd98ad] pt-4"
                        >
                            <h3 className="text-[14px] font-semibold text-[#7d344b] sm:text-[15px]">
                                {format_judul_tanggal(tanggal)}
                            </h3>

                            <ul className="mt-2 space-y-1.5">
                                {grup_per_tanggal[tanggal]
                                    .sort((a, b) => (a.jam || "").localeCompare(b.jam || ""))
                                    .map((item, index) => (
                                        <li
                                            key={item.kode}
                                            className="flex items-start gap-2 text-[12px] text-[#b06d82] sm:text-[13px]"
                                        >
                                            <span className="mt-[4px] h-[8px] w-[8px] shrink-0 rounded-full bg-[#7d344b]" />
                                            <span>
                                                <span className="font-medium">{item.jam}</span> |{" "}
                                                {item.pelanggan} | {item.layanan}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <div className="border-t border-[#dd98ad] pt-4 text-[13px] text-[#b06d82]">
                        Belum ada jadwal pada bulan dan tahun yang dipilih.
                    </div>
                )}
            </div>
        </section>
    );
}