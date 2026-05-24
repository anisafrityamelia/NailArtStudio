import API_BASE_URL from "./api";
import { getToken } from "./auth";

export const getUlasanSaya = async () => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/pelanggan/ulasan`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil data ulasan");
  }

  return result.data;
};

export const tambahUlasan = async (formData: FormData) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/pelanggan/ulasan`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal menyimpan ulasan");
  }

  return result.data;
};

export const updateUlasan = async (idUlasan: number, formData: FormData) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/pelanggan/ulasan/${idUlasan}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal memperbarui ulasan");
  }

  return result.data;
};

export const hapusUlasan = async (idUlasan: number) => {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/pelanggan/ulasan/${idUlasan}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal menghapus ulasan");
  }

  return result;
};

export const getUlasanLanding = async () => {
  const response = await fetch(
    `${API_BASE_URL}/ulasan-landing`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal mengambil ulasan landing"
    );
  }

  return result.data;
};