import { useState } from "react";
import styles from "../styles/Door.module.css";
import { sendCommand } from "../api/apiRewards";

export default function Door() {
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState("cerrada");

  const abrirPuerta = async () => {
    try {
      setLoading(true);

      await sendCommand(
        "door",
        "open"
      );

      setEstado("abierta");
    } finally {
      setLoading(false);
    }
  };

  const cerrarPuerta = async () => {
    try {
      setLoading(true);

      await sendCommand(
        "door",
        "close"
      );

      setEstado("cerrada")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div>
          <p className={styles.breadcrumb}>
            Dispositivos → Puerta
          </p>

          <h1 className={styles.title}>
            Control de Puerta
          </h1>
        </div>
      </header>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          Estado Actual
        </h2>

        <div className={styles.estadoContainer}>
          <span
            className={`${styles.estado} ${
              estado === "abierta"
                ? styles.abierta
                : styles.cerrada
            }`}
          >
            {estado.toUpperCase()}
          </span>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.btnAbrir}
            onClick={abrirPuerta}
            disabled={loading}
          >
            {loading
              ? "Procesando..."
              : "Abrir Puerta"}
          </button>

          <button
            className={styles.btnCerrar}
            onClick={cerrarPuerta}
            disabled={loading}
          >
            {loading
              ? "Procesando..."
              : "Cerrar Puerta"}
          </button>
        </div>

      </div>
    </div>
  );
}