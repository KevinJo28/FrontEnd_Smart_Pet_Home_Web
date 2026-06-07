import { useEffect, useState } from "react";
import styles from "../styles/Rewards.module.css";
import { sendCommand } from "../api/apiRewards";
import {useConfig} from "../hooks/useConfig"
import { setConfigReward } from "../utils/updateConfigReward";


export default function PremiosPage() {
    const {
    limiteDiario,
    usadosHoy,
    limiteTiempo,
    unidadTiempo,
    setUsadosHoy,
    setLimiteDiario,
    setLimiteTiempo,
    setUnidadTiempo,
    loaded
  } = useConfig();
  const [lanzando, setLanzando] = useState(false);
  const [ultimoPremio, setUltimoPremio] = useState(null);
  const [editandoLimite, setEditandoLimite] = useState(false);
  const restantes = limiteDiario - usadosHoy;

  useEffect(() => {
    if (loaded) {
      setConfigReward(limiteDiario, usadosHoy, limiteTiempo, unidadTiempo)
    }  
  },[loaded, limiteDiario, usadosHoy, limiteTiempo, unidadTiempo]);

  useEffect(() => {
    if (!ultimoPremio) return;

    const timer = setTimeout(() => setUltimoPremio(null), 3000);

    return () => clearTimeout(timer);
  }, [ultimoPremio]);
  // ── Soltar premio ──────────────────────────────────────────
  const soltarPremio = async () => {
    setLanzando(true);
    await sendCommand(
      "rewards",
      "dispense_reward",
    );
    setLanzando(false);
    setUsadosHoy(prev => prev + 1);
  };

  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div>
          <p className={styles.breadcrumb}>Dispositivos → Premios</p>
          <h1 className={styles.title}>Dispensador de Premios</h1>
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
                <strong>
                  {usadosHoy} / {limiteDiario}
                </strong>
              </div>

              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${(usadosHoy / limiteDiario) * 100}%`,
                  }}
                />
              </div>
            </div>

            {ultimoPremio && !lanzando && (
              <div className={styles.resultadoBanner}>
                <div>
                  <p className={styles.resultadoLabel}>Premio soltado</p>
                </div>
              </div>
            )}

            <button
              className={`${styles.btnSoltar}`}
              onClick={soltarPremio}
              disabled={restantes <= 0}
            >
              
                Soltar Premio
            </button>
          </div>

          {/* Límite diario */}
          <div className={styles.card}>
            <div className={styles.cardTitleRow}>
              <h2 className={styles.cardTitle}>Límite Diario</h2>

              <button
                className={styles.editBtn}
                onClick={() => setEditandoLimite((v) => !v)}
              >
                {editandoLimite ? "✓ Guardar" : "Editar"}
              </button>
            </div>

            {editandoLimite ? (
              <div className={styles.limiteEdit}>
                <p className={styles.limiteDesc}>
                  ¿Cuántas veces puede usarse el dispensador por día?
                </p>

                <div className={styles.limiteControls}>
                  <button
                    className={styles.limiteBtn}
                    onClick={() => setLimiteDiario((v) => Math.max(1, v - 1))}
                  >
                    −
                  </button>

                  <span className={styles.limiteVal}>{limiteDiario}</span>

                  <button
                    className={styles.limiteBtn}
                    onClick={() => setLimiteDiario((v) => v + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.limiteDisplay}>
                <span className={styles.limiteNum}>{limiteDiario}</span>

                <span className={styles.limiteText}>veces por día</span>

                <span className={styles.limiteRestante}>
                  · {restantes} restantes hoy
                </span>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Límite por Tiempo</h2>

            <p className={styles.limiteDesc}>Tiempo mínimo entre premios.</p>

            <div className={styles.limiteControls}>
              <button
                className={styles.limiteBtn}
                onClick={() => setLimiteTiempo((v) => Math.max(1, v - 5))}
              >
                −
              </button>

              <span className={styles.limiteVal}>{limiteTiempo}</span>

              <button
                className={styles.limiteBtn}
                onClick={() => setLimiteTiempo((v) => v + 5)}
              >
                +
              </button>
              <select
                className={styles.selectTiempo}
                value={unidadTiempo}
                onChange={(e) => setUnidadTiempo(e.target.value)}
              >
                <option value="segundos">Segundos</option>

                <option value="minutos">Minutos</option>

                <option value="horas">Horas</option>
              </select>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}
