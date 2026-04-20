import { DetailPesananPelanggan } from "./detail_pesanan_types";
import {
  InputReadonly,
  TextareaReadonly,
} from "./detail_pesanan_fields";

export default function DetailDesainEyelash({
  data,
}: {
  data?: DetailPesananPelanggan | null;
}) {
  return (
    <div className="space-y-3">
      <InputReadonly label="Jenis Lash" value={data?.jenisLash} />
      <TextareaReadonly label="Catatan" value={data?.catatan} rows={3} />
    </div>
  );
}