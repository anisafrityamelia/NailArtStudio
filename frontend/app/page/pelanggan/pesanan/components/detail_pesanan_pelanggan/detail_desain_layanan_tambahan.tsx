import { DetailPesananPelanggan } from "./detail_pesanan_types";
import {
  InputReadonly,
  TextareaReadonly,
} from "./detail_pesanan_fields";

export default function DetailDesainLayananTambahan({
  data,
}: {
  data?: DetailPesananPelanggan | null;
}) {
  const isWaxing = data?.layanan?.toLowerCase() === "waxing";

  return (
    <div className="space-y-3">
      {isWaxing && (
        <InputReadonly
          label="Area Waxing"
          value={data?.areaWaxing || "-"}
        />
      )}

      <TextareaReadonly
        label="Catatan"
        value={data?.catatan || "-"}
        rows={5}
      />
    </div>
  );
}