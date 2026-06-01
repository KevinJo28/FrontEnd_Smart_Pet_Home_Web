const API_URL = "http://127.0.0.1:8000";

export const createDevice = async (deviceData) => {
  const response = await fetch(`${API_URL}/device`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deviceData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al crear dispositivo");
  }

  return data;
};