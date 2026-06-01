import { createDevice } from "../api/apiCreateDevice";
export const handleAdd = async (e, deviceCode, deviceName, deviceType) => {
  
  e.preventDefault();

  try {
    const device = await createDevice({
      device_code: deviceCode,
      device_name: deviceName,
      device_type: deviceType,
    });

    console.log("Dispositivo creado:", device);

  } catch (error) {
    console.error(error);
  }
  

  
};