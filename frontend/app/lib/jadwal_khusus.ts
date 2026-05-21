import API_BASE_URL from "./api";
import { getToken } from "./auth";

export type JadwalKhusus = {
  id_jadwal: number;
  tanggal: string;
  status_buka: "Buka" | "Tutup";
  jam_buka: string | null;
  jam_tutup: string | null;
  catatan: string | null;
};

export type PayloadJadwalKhusus = {
  tanggal: string;
  status_buka: "Buka" | "Tutup";
  jam_buka: string | null;
  jam_tutup: string | null;
  catatan: string;
};

export const getJadwalKhususAdmin = async (): Promise<JadwalKhusus[]> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/jadwal-khusus`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil jadwal khusus");
  }

  return result.data;
};

export const tambahJadwalKhususAdmin = async (
  payload: PayloadJadwalKhusus
) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/jadwal-khusus`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal menambah jadwal khusus");
  }

  return result.data;
};

export const updateJadwalKhususAdmin = async (
  id: number,
  payload: PayloadJadwalKhusus
) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/jadwal-khusus/${id}`, {
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
    throw new Error(result.message || "Gagal memperbarui jadwal khusus");
  }

  return result.data;
};

export const hapusJadwalKhususAdmin = async (id: number) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/jadwal-khusus/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal menghapus jadwal khusus");
  }

  return result;
};