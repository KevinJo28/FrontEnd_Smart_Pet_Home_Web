import { useEffect, useState } from "react";
import { configContext } from "../context/configContext.js";
import PropTypes from "prop-types";
import { setConfigReward } from "../utils/setConfigReward.js";
import { getConfig } from "../api/apiGetConfig.js";
import mqtt from "mqtt";

export function ConfigProvider({ children }) {
  const [enable, setEnable] = useState(true);
  const [limiteDiario, setLimiteDiario] = useState(5);
  const [limiteTiempo, setLimiteTiempo] = useState(30);
  const [unidadTiempo, setUnidadTiempo] = useState("minutos");
  const [usadosHoy, setUsadosHoy] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  useEffect(() => {
    const client = mqtt.connect("ws://10.161.255.102:9001");

    client.on("connect", () => {
      console.log("MQTT conectado");
      client.subscribe("pet/rewards/event");
    });

    client.on("message", (topic, message) => {
      try {
        const data = JSON.parse(message.toString());

        if (topic === "pet/rewards/event" && data.action === "reward_used") {
          setUsadosHoy((prev) => prev + 1);
        }
      } catch (error) {
        console.error("Error procesando MQTT:", error);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const loadConfig = async () => {
    try {
      const config = await getConfig();
      console.log(config);
      setEnable(config.enabled);
      setLimiteDiario(config.daily_limit);
      setUsadosHoy(config.daily_use);
      setLimiteTiempo(config.wait_time);
      setUnidadTiempo(config.type_time);
    } catch (error) {
      // No existe, la creamos
      const defaultConfig = {
        enabled: true,
        daily_limit: 5,
        daily_use: 0,
        wait_time: 30,
        type_time: "seconds",
      };

      const config = await setConfigReward(defaultConfig);

      setEnable(config.enabled);
      setLimiteDiario(config.daily_limit);
      setUsadosHoy(config.daily_use);
      setLimiteTiempo(config.wait_time);
      setUnidadTiempo(config.type_time);
      return error;
    }
    setLoaded(true);
  };

  return (
    <configContext.Provider
      value={{
        enable,
        limiteDiario,
        usadosHoy,
        limiteTiempo,
        unidadTiempo,
        loaded,
        setLimiteDiario,
        setLimiteTiempo,
        setUnidadTiempo,
        setEnable,
        setUsadosHoy,
      }}
    >
      {children}
    </configContext.Provider>
  );
}

ConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
