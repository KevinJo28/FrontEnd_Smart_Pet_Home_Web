const API_URL = "http://127.0.0.1:8000";

export const getDevices = async () => {
  const response = await fetch(`${API_URL}/device/`);

  if (!response.ok) {
    throw new Error("Error al obtener dispositivos");
  }

  return await response.json();
};