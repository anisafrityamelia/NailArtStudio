import { DetailPesanan } from "./detail_pesanan_types";
import {
  InputReadonly,
  TextareaReadonly,
} from "./detail_pesanan_fields";

export default function DetailDesainRemove({
  data,
}: {
  data?: DetailPesanan | null;
}) {
  return (
    <div className="space-y-3">
      <InputReadonly label="Bagian Kuku" value={data?.bagianKuku} />
      <TextareaReadonly label="Catatan" value={data?.catatan} rows={3} />
    </div>
  );
}