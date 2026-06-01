const API_URL = "http://127.0.0.1:8000";

export const sendCommand = async (device, action) => {
  const response = await fetch(
    `${API_URL}/device/${device}/${action}`,
    {
      method: "POST",
    }
  );

  return response.json();
};