import { useEffect, useState } from "react";
import styles from "./Rewards.module.css";
import Button from "../components/Button";
import { dispenseFood } from "../api/apiRewards";

const PREMIOS_DEFAULT = [
  { id: 1, nombre: "Boton", emoji: <Button color={"red"}></Button>, activo: true },
{ id: 2, nombre: "Boton", emoji: <Button color={"blue"}></Button>, activo: true },
 { id: 3, nombre: "Boton", emoji: <Button color={"green"}></Button>, activo: true },
 { id: 4, nombre: "Boton", emoji: <Button color={"black"}></Button>, activo: true },
 { id: 5, nombre: "Boton", emoji: <Button color={"yellow"}></Button>, activo: true },
];

export default function PremiosPage() {
  const [premios, setPremios]         = useState(PREMIOS_DEFAULT);
  const [limiteDiario, setLimiteDiario] = useState(5);
  const [usadosHoy, setUsadosHoy]     = useState(0);
  const [azar, setAzar]               = useState(false);
  const [lanzando, setLanzando]       = useState(false);
  const [ultimoPremio, setUltimoPremio] = useState(null);
  const [editandoLimite, setEditandoLimite] = useState(false);


  const premiosActivos = premios.filter((p) => p.activo);
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

    dispenseFood();

    let elegido = true;
    


    setUltimoPremio(elegido);
    setUsadosHoy((u) => u + 1);
    setLanzando(false);
  };
  

  // ── Toggles ────────────────────────────────────────────────
  const togglePremio = (id) =>
    setPremios((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p))
    );


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

            {/* Toggle azar */}
            <div className={styles.toggleRow}>
              <div>
                <p className={styles.toggleLabel}>Premio al azar</p>
                <p className={styles.toggleSub}>
                  {azar ? "Se elige aleatoriamente entre los activos" : "Se usa el primero de la lista"}
                </p>
              </div>
              <button
                className={`${styles.toggle} ${azar ? styles.toggleOn : ""}`}
                onClick={() => setAzar((v) => !v)}
                aria-label="Toggle azar"
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
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

        {/* ── Col derecha ── */}
        <div className={styles.colRight}>

          {/* Lista de premios */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Configurar Premios</h2>
            <p className={styles.cardSub}>
              Activá o desactivá qué premios puede dispensar el dispositivo.
              {azar && " Al estar en modo azar, se elige entre los activos."}
            </p>

            <ul className={styles.premiosList}>
              {premios.map((p, i) => (
                <li
                  key={p.id}
                  className={`${styles.premioItem} ${!p.activo ? styles.premioInactivo : ""}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {azar && p.activo && (
                    <span className={styles.ordenBadge}>#</span>
                  )}
                  {!azar && p.activo && (
                    <span className={styles.ordenBadge}>{premiosActivos.indexOf(p) + 1}</span>
                  )}
                  <span className={styles.premioEmoji}>{p.emoji}</span>
                  <span className={styles.premioNombre}>{p.nombre}</span>
                  <div className={styles.premioActions}>
                    <button
                      className={`${styles.toggleSmall} ${p.activo ? styles.toggleSmallOn : ""}`}
                      onClick={() => togglePremio(p.id)}
                    >
                      {p.activo ? "Premio" : "Nada"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}