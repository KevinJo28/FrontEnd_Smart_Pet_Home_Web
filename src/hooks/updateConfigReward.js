import { updateConfig } from "../api/apiUpdateConfig";

export const setConfigReward = async ( daily_limit,daily_use, wait_time, type_time) => {

  try {
    const device = await updateConfig({
      daily_limit: daily_limit,
      daily_use: daily_use,
      wait_time: wait_time,
      type_time: type_time,
    });

    console.log("Configuraciones listas", device);

  } catch (error) {
    console.error(error);
  }
  

  
};