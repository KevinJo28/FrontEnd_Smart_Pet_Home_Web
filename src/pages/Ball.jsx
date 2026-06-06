import { useState } from "react";
import styles from "../styles/Ball.module.css";
import { sendCommand } from "../api/apiRewards";

export default function Ball() {
  const [estadoLanzamiento, setEstadoLanzamiento] = useState("lista");

  const lanzarPelota = async () => {
    setEstadoLanzamiento("lanzando");
    await sendCommand(
      "rewards",
      "dispense_reward",
    );
     setEstadoLanzamiento("lista");
  };


  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <p className={styles.breadcrumb}>
            Dispositivos → Lanzador de Pelotas
          </p>
          
          <h1 className={styles.title}>
            Lanzador de Pelotas
          </h1>
        </div>
      </header>
    
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          Presione el botón para lanzar una pelota
        </h2>

        <div className={styles.estadoContainer}>
          <div className={styles.estadoCaja}>
            {estadoLanzamiento === "lanzando"
              ? "Lanzando..."
              : "Lista para lanzar"}
          </div>
        </div>

        <button className={styles.btnLanzar} onClick={lanzarPelota}>
          Lanzar
        </button>

        </div>
      </div>
  );
}