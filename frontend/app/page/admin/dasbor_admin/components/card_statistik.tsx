import { UserRound, ShoppingCart, BadgeCheck } from "lucide-react";
import type { StatistikDasbor } from "./type";

type Props = {
    data: StatistikDasbor;
};

export default function Card_Statistik({ data }: Props) {

    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {/* Jumlah pelanggan */}
            <div className="rounded-[12px] border border-[#DD98AD] bg-[#fdf0f4] px-4 py-3 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-[#7D344B] sm:text-[16px]">
                        Jumlah Pelanggan
                    </p>
                    <UserRound className="mt-0.5 h-[19px] w-[19px] text-[#7D344B]" />
                </div>
                <div className="mt-3 flex justify-end">
                    <p className="text-[50px] font-bold leading-none tracking-tight text-[#7D344B] sm:text-[58px]">
                        {data.jumlah_pelanggan}
                    </p>
                </div>
            </div>

            {/* Jumlah pesanan masuk */}
            <div className="rounded-[12px] border border-[#DD98AD] bg-[#fdf0f4] px-4 py-3 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-[#7D344B] sm:text-[16px]">
                        Pesanan Masuk
                    </p>
                    <ShoppingCart className="mt-0.5 h-[19px] w-[19px] text-[#7D344B]" />
                </div>
                <div className="mt-3 flex justify-end">
                    <p className="text-[50px] font-bold leading-none tracking-tight text-[#7D344B] sm:text-[58px]">
                        {data.pesanan_masuk}
                    </p>
                </div>
            </div>

            {/* Jumlah pesanan selesai */}
            <div className="rounded-[12px] border border-[#DD98AD] bg-[#fdf0f4] px-4 py-3 shadow-[0_3px_8px_rgba(160,84,108,0.18)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-semibold text-[#7D344B] sm:text-[16px]">
                        Pesanan Selesai
                    </p>
                    <BadgeCheck className="mt-0.5 h-[19px] w-[19px] text-[#7D344B]" />
                </div>
                <div className="mt-3 flex justify-end">
                    <p className="text-[50px] font-bold leading-none tracking-tight text-[#7D344B] sm:text-[58px]">
                        {data.pesanan_selesai}
                    </p>
                </div>
            </div>
        </section>
    );
}