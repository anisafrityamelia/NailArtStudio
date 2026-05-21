import API_BASE_URL from "./api";
import { getToken } from "./auth";

export const bookingNailArt = async (formData: FormData) => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/pesanan/nail-art`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Booking gagal");
  }

  return result;
};

export const bookingPressOn = async (formData: FormData) => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/pesanan/press-on`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Booking press on gagal");
  }

  return result;
};

export const bookingEyelash = async (formData: FormData) => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/pesanan/eyelash`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Booking eyelash gagal");
  }

  return result;
};

export const bookingRemove = async (formData: FormData) => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/pesanan/remove`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Booking remove gagal");
  }

  return result;
};

export const getDetailPesanan = async (
  id: string
) => {

  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/pesanan/${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal mengambil detail pesanan"
    );
  }

  return result.data;
};

export const getPesananSaya = async () => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/pesanan`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal mengambil data pesanan"
    );
  }

  return result.data;
};

export const getPesananAktifAdmin = async () => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/admin/pesanan/aktif`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal mengambil data pesanan aktif"
    );
  }

  return result.data;
};

export const updateStatusPesananAktif = async (
  id: number,
  payload: {
    status: string;
    catatan_admin: string;
    harga_final?: string;
  }
) => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/admin/pesanan/${id}/status-aktif`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal mengubah status pesanan aktif"
    );
  }

  return result.data;
};

export const getRiwayatPesananAdmin = async () => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/admin/pesanan/riwayat`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal mengambil data riwayat pesanan"
    );
  }

  return result.data;
};

export type SlotBooking = {
  jam: string;
  tersedia: boolean;
  sisa_kapasitas: number;
};

export type ResponseSlotBooking = {
  slots: SlotBooking[];
  status_jadwal: "Default" | "Buka" | "Tutup";
  catatan_jadwal: string | null;
  message: string;
};

export const getSlotBooking = async (
  tanggal: string,
  idLayanan: number
): Promise<ResponseSlotBooking> => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/slot-booking?tanggal=${tanggal}&id_layanan=${idLayanan}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil slot booking");
  }

  return {
    slots: result.data || [],
    status_jadwal: result.status_jadwal || "Default",
    catatan_jadwal: result.catatan_jadwal || null,
    message: result.message,
  };
};