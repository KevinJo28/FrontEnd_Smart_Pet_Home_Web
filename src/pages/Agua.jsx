import { useState } from "react";
import styles from "../styles/Agua.module.css";

export default function Agua() {
 const [agua, setAgua] = useState(100);
  const [estadoAgua, setEstadoAgua] = useState("Lista");

  const beberAgua = () => {
    setEstadoAgua("Bebiendo...");

    setTimeout(() => {
      setAgua((valorActual) => Math.max(valorActual - 15, 0));
      setEstadoAgua("Lista");
    }, 1000);
  };

  const rellenarAgua = () => {
    setEstadoAgua("Llenando...");

    setTimeout(() => {
      setAgua(100);
      setEstadoAgua("Lista");
    }, 1000);
  };

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
        </div>

        <div className={styles.barraContainer}>
          <div
            className={styles.barraAgua}
            style={{ width: `${agua}%` }}
          ></div>
        </div>
        
        <div className={styles.botones}>
          <button onClick={beberAgua}>
            Simular consumo
          </button>

          <button onClick={rellenarAgua}>
            Rellenar plato
          </button>
        </div>
      </div>
    </div>
  ); 
} 