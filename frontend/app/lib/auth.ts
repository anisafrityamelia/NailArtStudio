import API_BASE_URL from "./api";

export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const saveUser = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }

  const data = await response.json();

  return data.user;
};

export const logout = async () => {
  const token = getToken();

  try {
    await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // kalau error koneksi, tetap lanjut logout lokal
  }

  removeToken();
  removeUser();

  window.location.href = "/auth/login";
};