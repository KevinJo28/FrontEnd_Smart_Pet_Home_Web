import { CreateConfig } from "../api/apiCreateConfig";




export const setConfigReward = async (defaultConfig) => {

  try {
    const device = await CreateConfig({
      enabled: defaultConfig.enabled,
      daily_limit: defaultConfig.daily_limit,
      daily_use: defaultConfig.daily_use,
      wait_time: defaultConfig.wait_time,
      type_time: defaultConfig.type_time,
      

    });

    console.log("Configuraciones listas", device);

  } catch (error) {
    console.error(error);
  }
  

  
};