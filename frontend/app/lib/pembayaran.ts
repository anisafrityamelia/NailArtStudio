import API_BASE_URL from "./api";
import { getToken } from "./auth";

export const uploadPembayaran = async (
  formData: FormData
) => {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/pelanggan/pembayaran`,
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
    throw new Error(
      result.message || "Gagal upload pembayaran"
    );
  }

  return result;
};