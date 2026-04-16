type Props_Judul_Halaman = {
    title: string;
}

export default function Judul_Halaman({ title }: Props_Judul_Halaman) {
    return <h1 className="text-xl font-semibold text-[#7d344b] sm:text-2xl lg:text-3xl mb-6">{title}</h1>
}