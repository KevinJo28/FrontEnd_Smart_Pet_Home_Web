const API_URL = "http://127.0.0.1:8000";

export const CreateConfig = async (configData) => {
  const response = await fetch(`${API_URL}/water_config`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(configData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al setter condiguraciones");
  }

  return data;
};