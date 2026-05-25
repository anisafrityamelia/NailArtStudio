import API_BASE_URL from "./api";
import { getToken } from "./auth";

export function getStorageUrl(path?: string | null) {
  if (!path) return "";

  const baseUrl = API_BASE_URL.replace("/api", "");

  return `${baseUrl}/storage/${path}`;
}

export async function getBerandaAdmin() {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/beranda`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil data beranda");
  }

  return result.data;
}

export async function updateBerandaAdmin(payload: {
  deskripsi?: string;
  alamat_studio?: string;
  link_lokasi?: string;
  jam_buka?: string;
  akun_ig?: string;
  akun_tiktok?: string;
  no_wa?: string;
}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/admin/beranda`, {
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
    throw new Error(result.message || "Gagal memperbarui data beranda");
  }

  return result.data;
}

export async function uploadGaleriBeranda(file: File, urutan_tampil: number) {
  const token = getToken();

  const formData = new FormData();
  formData.append("gambar", file);
  formData.append("urutan_tampil", String(urutan_tampil));

  const response = await fetch(`${API_BASE_URL}/admin/beranda/galeri`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal upload gambar galeri");
  }

  return result.data;
}

export async function hapusGaleriBeranda(id_galeri: number) {
  const token = getToken();

  const response = await fetch(
    `${API_BASE_URL}/admin/beranda/galeri/${id_galeri}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal menghapus gambar galeri");
  }

  return result;
}

export async function getBerandaLanding() {
  const response = await fetch(`${API_BASE_URL}/beranda`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil data beranda");
  }

  return result.data;
}