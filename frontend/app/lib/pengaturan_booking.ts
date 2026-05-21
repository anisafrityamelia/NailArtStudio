import API_BASE_URL from "./api";
import { getToken } from "./auth";

export type PengaturanBooking = {
  id_pengaturan_booking?: number;
  jam_buka: string;
  jam_tutup: string;
  durasi_slot: number;
  jumlah_karyawan: number;
};

export const getPengaturanBookingAdmin = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/pengaturan-booking`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil pengaturan booking");
  }

  return result.data;
};

export const updatePengaturanBookingAdmin = async (
  payload: PengaturanBooking
) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/pengaturan-booking`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal memperbarui pengaturan booking");
  }

  return result.data;
};