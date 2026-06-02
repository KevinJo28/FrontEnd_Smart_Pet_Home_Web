const API_URL = "http://127.0.0.1:8000";

export const sendCommand = async (
  device,
  action,
  data = {}
) => {
  const response = await fetch(
    `${API_URL}/device/${device}/${action}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};