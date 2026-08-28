const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, body) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export const authAPI = {
  login: (credentials) => request("/auth/login", credentials),
  register: (userData) => request("/auth/register", userData),
  forgotPassword: (email) => request("/auth/forgot-password", { email }),
};