import { useEffect, useState } from "react";
import styles from "../styles/Rewards.module.css";
import { sendCommand } from "../api/apiRewards";

export default function PremiosPage() {
  const [limiteDiario, setLimiteDiario] = useState(5);
  const [usadosHoy, setUsadosHoy] = useState(0);
  const [lanzando, setLanzando] = useState(false);
  const [ultimoPremio, setUltimoPremio] = useState(null);
  const [editandoLimite, setEditandoLimite] = useState(false);

  // NUEVO
  const [limiteTiempo, setLimiteTiempo] = useState(30); // minutos
  const [unidadTiempo, setUnidadTiempo] = useState("minutos");
  const [ultimoUso, setUltimoUso] = useState(null);

  const restantes = limiteDiario - usadosHoy;
  const sinUsos = restantes <= 0;

  useEffect(() => {
    if (!ultimoPremio) return;

    const timer = setTimeout(() => setUltimoPremio(null), 3000);

    return () => clearTimeout(timer);
  }, [ultimoPremio]);

  const getTiempoMs = () => {
    switch (unidadTiempo) {
      case "segundos":
        return limiteTiempo * 1000;

      case "horas":
        return limiteTiempo * 60 * 60 * 1000;

      default:
        return limiteTiempo * 60 * 1000;
    }
  };

  const puedeUsarPorTiempo = () => {
    if (!ultimoUso) return true;

    const ahora = Date.now();
    const diferencia = ahora - ultimoUso;

    return diferencia >= getTiempoMs();
  };

  const tiempoRestante = () => {
    if (!ultimoUso) return 0;

    const ahora = Date.now();
    const diferencia = ahora - ultimoUso;

    const restante = getTiempoMs() - diferencia;

    if (restante <= 0) return 0;

    switch (unidadTiempo) {
      case "segundos":
        return Math.ceil(restante / 1000);

      case "horas":
        return Math.ceil(restante / (60 * 60 * 1000));

      default:
        return Math.ceil(restante / (60 * 1000));
    }
  };
  // NUEVO
  const bloqueadoPorTiempo = !puedeUsarPorTiempo();

  // ── Soltar premio ──────────────────────────────────────────
  const soltarPremio = async () => {
    if (sinUsos || bloqueadoPorTiempo) return;

    setLanzando(true);
    setUltimoPremio(null);

    await sendCommand(
      "rewards",
      "dispense_reward",
      {
        tiempo: limiteTiempo,
        unidad: unidadTiempo,
        dia: restantes,
      }
    );

    let elegido = true;

    setUltimoUso(Date.now()); // NUEVO
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

            {bloqueadoPorTiempo && (
              <div className={styles.resultadoBanner}>
                <div>
                  <p className={styles.resultadoLabel}>
                    Disponible en {tiempoRestante()} {unidadTiempo}
                  </p>
                </div>
              </div>
            )}

            <button
              className={`${styles.btnSoltar} ${
                sinUsos || bloqueadoPorTiempo ? styles.btnDisabled : ""
              }`}
              onClick={soltarPremio}
              disabled={sinUsos || bloqueadoPorTiempo || lanzando}
            >
              {lanzando ? (
                <span className={styles.spinner} />
              ) : sinUsos ? (
                "⛔ Límite diario alcanzado"
              ) : bloqueadoPorTiempo ? (
                `⏳ Espera ${tiempoRestante()} ${unidadTiempo}`
              ) : (
                "Soltar Premio"
              )}
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

            {bloqueadoPorTiempo && (
              <p className={styles.tiempoRestante}>
                Disponible en {tiempoRestante()} {unidadTiempo}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
