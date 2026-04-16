import { DetailPesanan } from "./detail_pesanan_types";
import {
  InputReadonly,
  TextareaReadonly,
  UploadPreviewReadonly,
} from "./detail_pesanan_fields";

export default function DetailDesainNailArt({
  data,
}: {
  data?: DetailPesanan | null;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <InputReadonly label="Bagian Kuku" value={data?.bagianKuku} />
      <InputReadonly label="Layanan Tambahan" value={data?.layananTambahan} />
      <UploadPreviewReadonly
        label="Gambar Referensi"
        src={data?.gambarReferensi}
        alt="Gambar Referensi Nail Art"
      />
      <TextareaReadonly label="Catatan" value={data?.catatan} rows={5} />
    </div>
  );
}