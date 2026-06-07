import { useEffect, useState } from "react";
import styles from "../styles/Door.module.css";
import { sendCommand } from "../api/apiRewards";
import { getDoorConfig } from "../utils/getDoorConfig";
import { CreateConfig1 } from "../utils/createDoorConfig";

export default function Door() {
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState("cerrada");
  const [open_time, setOpenTime] = useState();
  const [close_time, setCloseTime] = useState();
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await getDoorConfig();

        if (!data) return;

        setOpenTime(data.open_time || "");
        setCloseTime(data.close_time || "");

      } catch {
        console.log("No existe configuración todavía");
      }
    };

    loadConfig();
  }, []);

  const guardarHorario = async () => {
    await CreateConfig1({
      open_time,
      close_time
    });
  };

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
          Apertura y Cierre Manual
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
      {/*Card Horarios*/}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>
          Apertura y Cierre Automático 
        </h2>

        <div className={styles.estadoContainer2}>
          <section className={styles.dates}>
            <label>Apertura</label>
            <input
            value={open_time}
              type="time"
              onChange={(e) => setOpenTime(e.target.value)}
            />
          </section>
          <section className={styles.dates}>
            <label>Cierre</label>
            <input
            value={close_time}
              type="time"
              onChange={(e) => setCloseTime(e.target.value)}
            />
          </section >
        </div>
        <button
            className={styles.btnGuardar}
            onClick={guardarHorario}
          >
                        
             Guardar Horario
          </button>
        

      </div>
    </div>
  );
}