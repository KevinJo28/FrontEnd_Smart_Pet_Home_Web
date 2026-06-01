import { useEffect, useState } from "react";
import styles from "../styles/Rewards.module.css";
import { sendCommand } from "../api/apiRewards";


export default function PremiosPage() {
 
  const [limiteDiario, setLimiteDiario] = useState(5);
  const [usadosHoy, setUsadosHoy]     = useState(0);
  const [lanzando, setLanzando]       = useState(false);
  const [ultimoPremio, setUltimoPremio] = useState(null);
  const [editandoLimite, setEditandoLimite] = useState(false);


 
  const restantes = limiteDiario - usadosHoy;
  const sinUsos = restantes <= 0;

  useEffect(() => {
  if (!ultimoPremio) return;
  const timer = setTimeout(() => setUltimoPremio(null), 3000); // 3 segundos
  return () => clearTimeout(timer);
}, [ultimoPremio]);

  // ── Soltar premio ──────────────────────────────────────────
  const soltarPremio = async () => {
    if (sinUsos) return;
    setLanzando(true);
    setUltimoPremio(null);
    sendCommand("rewards", "dispense_reward"); //Llmada a la API
    let elegido = true;
    setUltimoPremio(elegido);
    setUsadosHoy((u) => u + 1);
    setLanzando(false);
  };
  



  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div>
          <p className={styles.breadcrumb}>Dispositivos → Premios</p>
          <h1 className={styles.title}> Dispensador de Premios</h1>
        </div>  
      </header>
      <div className={styles.grid}>
        {/* ── Col izquierda ── */}
        <div className={styles.colLeft}>
          {/* Botón soltar */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Soltar Premio</h2>
            <div className={styles.usoBar}>
              <div className={styles.usoInfo}>
                <span>Usos hoy</span>
                <strong>{usadosHoy} / {limiteDiario}</strong>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(usadosHoy / limiteDiario) * 100}%` }}
                />
              </div>
            </div>
            {ultimoPremio && !lanzando && (
              <div className={styles.resultadoBanner}>

                <div>
                  <p className={styles.resultadoLabel}>Premio soltado</p>

                </div>
              </div>
            )
            }
            <button
              className={`${styles.btnSoltar} ${sinUsos ? styles.btnDisabled : ""}`}
              onClick={soltarPremio}
              disabled={sinUsos || lanzando}
            >
              {lanzando ? (
                <span className={styles.spinner} />
              ) : sinUsos ? (
                "⛔ Límite diario alcanzado"
              ) : (
                " Soltar Premio"
              )}
            </button>
          </div>
          {/* Límite diario */}
          <div className={styles.card}>
            <div className={styles.cardTitleRow}>
              <h2 className={styles.cardTitle}>Límite Diario</h2>
              <button className={styles.editBtn} onClick={() => setEditandoLimite((v) => !v)}>
                {editandoLimite ? "✓ Guardar" : " Editar"}
              </button>
            </div>
            {editandoLimite ? (
              <div className={styles.limiteEdit}>
                <p className={styles.limiteDesc}>¿Cuántas veces puede usarse el dispensador por día?</p>
                <div className={styles.limiteControls}>
                  <button className={styles.limiteBtn} onClick={() => setLimiteDiario((v) => Math.max(1, v - 1))}>−</button>
                  <span className={styles.limiteVal}>{limiteDiario}</span>
                  <button className={styles.limiteBtn} onClick={() => setLimiteDiario((v) => v + 1)}>+</button>
                </div>
              </div>
            ) : (
              <div className={styles.limiteDisplay}>
                <span className={styles.limiteNum}>{limiteDiario}</span>
                <span className={styles.limiteText}>veces por día</span>
                <span className={styles.limiteRestante}>· {restantes} restantes hoy</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}