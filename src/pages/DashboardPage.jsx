import { useAuth } from "../hooks/useAuth";
import styles from "./DashboardPage.module.css";




const STATS = [
  { icon: "🐶", label: "Mascotas", value: "2", color: "#2E86AB" },
  { icon: "💻", label: "Dispositivos", value: "2", color: "#4FC3F7" },
  
];

const DEVICES = [
  { name: "Alimentación", breed: "Golden Retriever", age: "3 años", status: "En uso", emoji: "🥩" },
  { name: "Agua",  breed: "Labrador",  age: "1 año",  status: "En uso", emoji: "💧" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className={styles.root}>

      {/* Main content */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <p className={styles.greeting}>¡Bienvenido de vuelta!</p>
            <h1 className={styles.userName}>{user?.name} </h1>
          </div>
          <div className={styles.avatar}>
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        </header>

        {/* Stats row */}
        <section className={styles.statsGrid}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statCard} style={{ "--accent": s.color }}>
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
            <button className={styles.addBtn}>+ Agregar</button>
          </div>
          <div className={styles.petsGrid}>
            {DEVICES.map((pet) => (
              <div key={pet.name} className={styles.petCard}>
                <div className={styles.petEmoji}>{pet.emoji}</div>
                <div className={styles.petInfo}>
                  <h3 className={styles.petName}>{pet.name}</h3>
                  <p className={styles.petBreed}>{pet.breed} · {pet.age}</p>
                  <span className={styles.petBadge}>{pet.status}</span>
                </div>
                <button className={styles.petBtn}>Ver perfil →</button>
              </div>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Acciones rápidas</h2>
          <div className={styles.actionsGrid}>
            {[
              { icon: "", label: "Registrar comida"   },
              { icon: "", label: "Editar mascotas"   },
              { icon: "", label: "Registrar comida"   },
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