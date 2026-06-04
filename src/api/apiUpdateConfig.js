const API_URL = "http://127.0.0.1:8000";


export async function updateConfig(config) {
  const response = await fetch(`${API_URL}/config/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar configuración");
  }

  return response.json();
}