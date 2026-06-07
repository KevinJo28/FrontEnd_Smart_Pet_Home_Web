export const getConfig = async () => {
  const response = await fetch("http://127.0.0.1:8000/door_config");

  if (!response.ok) {
    throw new Error("No existe configuración");
  }

  return response.json();
};