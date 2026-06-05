import { useAuth } from "../hooks/useAuth";
import styles from "../styles/DashboardPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDevices } from "../api/apiGetDevices";
import { getDeviceImage } from "../utils/getDeviceImage";

// const DEVICES = [
//   {
//     name: "Alimentación",
//     breed: "Golden Retriever",
//     tipo: "3 años",
//     status: "En uso",
//     emoji: Food,
//   },
//   {
//     name: "Agua",
//     breed: "Labrador",
//     tipo: "1 año",
//     status: "En uso",
//     emoji: Water,
//   },
//   {
//     name: "Recompensas",
//     breed: "Labrador",
//     tipo: "reward_dispenser",
//     status: "En uso",
//     emoji: Rewards,
//   },
// ];

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);

  const STATS = [
    {
      icon: "🐶",
      label: "Mascotas",
      value: "2",
      color: "#2E86AB",
    },
    {
      icon: "💻",
      label: "Dispositivos",
      value: devices.length,
      color: "#4FC3F7",
    },
  ];

  useEffect(() => {
  const loadDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadDevices();
}, []);
console.log(devices)

  return (
    <div className={styles.root}>
      {/* Main content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <p className={styles.greeting}>¡Bienvenido de vuelta!</p>
            <h1 className={styles.userName}>{user?.username} </h1>
          </div>
          <div className={styles.avatar}>
            {user?.username?.[0]?.toUpperCase() ?? "U"}
          </div>
        </header>

        {/* Stats row */}
        <section className={styles.statsGrid}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className={styles.statCard}
              style={{ "--accent": s.color }}
            >
              <span className={styles.statIcon}>{s.icon}</span>
              <div>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* DEVICES section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Tus dispositivos</h2>
            <button
              className={styles.addBtn}
              onClick={() => {
                navigate("/Agregar_Dispositivo");
              }}
            >
              + Agregar
            </button>
          </div>
          {devices.length === 0 ? (
      <div className={styles.emptyDeviceBox}>
        <div className={styles.plusCircle}>+</div>

          <h3>¿Deseas agregar un dispositivo?</h3>

        <p>Agrega tu primer dispositivo para comenzar a monitorear a tu mascota.</p>

          <button
            className={styles.emptyAddBtn}
            onClick={() => {
              navigate("/Agregar_Dispositivo");
            }}
          >
            Agregar dispositivo
          </button>
        </div>
        ) : (
        <div className={styles.petsGrid}>
          {devices.map((device) => (
            <div key={device.id} className={styles.petCard}>
              <div className={styles.petEmoji}>
                <img
                  src={getDeviceImage(device.device_type)}
                  alt={device.device_name}
                />
              </div>

              <div className={styles.petInfo}>
                <h3 className={styles.petName}>
                  {device.device_name}
                </h3>

                <p className={styles.petBreed}>
                  Código: {device.device_code}
                </p>

                <p className={styles.petBreed}>
                  Tipo: {device.device_type}
                </p>

                <span className={styles.petBadge}>
                  {device.status}
                </span>
              </div>

              <button
                className={styles.petBtn}
                onClick={() => navigate(`/${device.device_type}`)}
              >
                Ver dispositivo →
              </button>
            </div>
          ))}
        </div>
      )}
        </section>

        {/* Quick actions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Acciones rápidas</h2>
          <div className={styles.actionsGrid}>
            {[
              { icon: "", label: "Registrar comida" },
              { icon: "", label: "Editar mascotas" },
              { icon: "", label: "Registrar comida" },
            ].map((a) => (
              <button key={a.label} className={styles.actionCard}>
                <span className={styles.actionIcon}>{a.icon}</span>
                <span className={styles.actionLabel}>{a.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
