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