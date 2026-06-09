import { useEffect, useState } from "react";
import styles from "../styles/Agua.module.css";
import { getWater } from "../utils/getWater";
import mqtt from "mqtt";


export default function Agua() {
 const [agua, setAgua] = useState(100);
 const [distance, setDistance] = useState(0);
 const IP = import.meta.env.VITE_IP;

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getWater();

        if (!data) return;
        setAgua(data.water_level || 0);
        setDistance(data.distance || 0);

      } catch {
        console.log("No existe configuración todavía");
      }
    };

    loadConfig();
    const client = mqtt.connect(`ws://${IP}:9001`);

    client.on("connect", () => {
      console.log("MQTT conectado");
      client.subscribe("pet/water/event");
    });

    client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString());

      setAgua(data.water_level);
      setDistance(data.distance);
    });

    return () => {
      client.end();
    };

  }, []);




 return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <p className={styles.breadcrumb}>
            Dispositivos → Dispensador de Agua
          </p>
          
          <h1 className={styles.title}>
            Dispensador de Agua
          </h1>
        </div>
      </header>

      <div className={styles.card}>
        <h2>¿Cuánta agua le queda a tu mascota?</h2>

        <div className={styles.estadoContainer}>
          <div className={styles.estadoCaja}>
            Agua restante: {agua}%
          </div>
          <p>Distancia: {distance} cm</p>
        </div>

        <div className={styles.barraContainer}>
          <div
            className={styles.barraAgua}
            style={{ width: `${agua}%` }}
          ></div>
          
        </div>
        
      </div>
    </div>
  ); 
} 