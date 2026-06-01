const API_URL = "http://127.0.0.1:8000";

export const createPet = async (petData) => {
  const response = await fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(petData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Error al crear mascota");
  }

  return data;
};