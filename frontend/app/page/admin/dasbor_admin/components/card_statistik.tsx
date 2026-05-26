import { UserRound, ShoppingCart, BadgeCheck } from "lucide-react";
import type { StatistikDasbor } from "./type";

type Props = {
    data: StatistikDasbor;
};

export default function Card_Statistik({ data }: Props) {

    return (
        <section className="grid grid-cols-3 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
            {/* Jumlah pelanggan */}
            <div className="rounded-[12px] border border-[#DD98AD] bg-[#fdf0f4] px-2 py-3 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] font-semibold leading-tight text-[#7D344B] sm:text-[16px]">
                        Jumlah Pelanggan
                    </p>
                    <UserRound className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#7D344B] sm:h-[19px] sm:w-[19px]" />
                </div>
                <div className="mt-3 flex justify-end">
                    <p className="text-[34px] font-bold leading-none tracking-tight text-[#7D344B] sm:text-[58px]">
                        {data.jumlah_pelanggan}
                    </p>
                </div>
            </div>

            {/* Jumlah pesanan aktif */}
            <div className="rounded-[12px] border border-[#DD98AD] bg-[#fdf0f4] px-2 py-3 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] font-semibold leading-tight text-[#7D344B] sm:text-[16px]">
                        Pesanan Aktif
                    </p>
                    <ShoppingCart className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#7D344B] sm:h-[19px] sm:w-[19px]" />
                </div>
                <div className="mt-3 flex justify-end">
                    <p className="text-[34px] font-bold leading-none tracking-tight text-[#7D344B] sm:text-[58px]">
                        {data.pesanan_aktif}
                    </p>
                </div>
            </div>

            {/* Jumlah pesanan selesai */}
            <div className="rounded-[12px] border border-[#DD98AD] bg-[#fdf0f4] px-2 py-3 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] font-semibold leading-tight text-[#7D344B] sm:text-[16px]">
                        Pesanan Selesai
                    </p>
                    <BadgeCheck className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#7D344B] sm:h-[19px] sm:w-[19px]" />
                </div>
                <div className="mt-3 flex justify-end">
                    <p className="text-[34px] font-bold leading-none tracking-tight text-[#7D344B] sm:text-[58px]">
                        {data.pesanan_selesai}
                    </p>
                </div>
            </div>
        </section>
    );
}