import { DetailPesananPelanggan } from "./detail_pesanan_types";
import {
  InputReadonly,
  TextareaReadonly,
  UploadPreviewReadonly,
} from "./detail_pesanan_fields";

export default function DetailDesainPresson({
  data,
}: {
  data?: DetailPesananPelanggan | null;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <UploadPreviewReadonly
        label="Gambar Referensi"
        src={data?.gambarReferensi}
        alt="Gambar Referensi Press On"
      />
      <UploadPreviewReadonly
        label="Foto Jari Kanan"
        src={data?.fotoJariKanan}
        alt="Foto Jari Kanan"
      />
      <UploadPreviewReadonly
        label="Foto Jempol Kanan"
        src={data?.fotoJempolKanan}
        alt="Foto Jempol Kanan"
      />
      <UploadPreviewReadonly
        label="Foto Jari Kiri"
        src={data?.fotoJariKiri}
        alt="Foto Jari Kiri"
      />
      <UploadPreviewReadonly
        label="Foto Jempol Kiri"
        src={data?.fotoJempolKiri}
        alt="Foto Jempol Kiri"
      />
      <TextareaReadonly label="Alamat Pengiriman" value={data?.alamatPengiriman} rows={5} />
      <InputReadonly label="Shape Kuku" value={data?.shapeKuku} />
      <InputReadonly label="Metode Pengambilan" value={data?.metodePengambilan} />
      <TextareaReadonly label="Catatan" value={data?.catatan} rows={5} />    
    </div>
  );
}