import API_BASE_URL from "./api";
import { getToken } from "./auth";

export type KapasitasKhusus = {
  id_kapasitas: number;
  tanggal: string;
  jumlah_karyawan: number;
  catatan: string | null;
};

export type PayloadKapasitasKhusus = {
  tanggal: string;
  jumlah_karyawan: number;
  catatan: string;
};

export const getKapasitasKhususAdmin = async (): Promise<KapasitasKhusus[]> => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/kapasitas-khusus`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil kapasitas khusus");
  }

  return result.data;
};

export const tambahKapasitasKhususAdmin = async (
  payload: PayloadKapasitasKhusus
) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/kapasitas-khusus`, {
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
    throw new Error(result.message || "Gagal menambah kapasitas khusus");
  }

  return result.data;
};

export const updateKapasitasKhususAdmin = async (
  id: number,
  payload: PayloadKapasitasKhusus
) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/kapasitas-khusus/${id}`, {
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
    throw new Error(result.message || "Gagal memperbarui kapasitas khusus");
  }

  return result.data;
};

export const hapusKapasitasKhususAdmin = async (id: number) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/kapasitas-khusus/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal menghapus kapasitas khusus");
  }

  return result;
};