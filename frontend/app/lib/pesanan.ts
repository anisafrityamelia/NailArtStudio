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