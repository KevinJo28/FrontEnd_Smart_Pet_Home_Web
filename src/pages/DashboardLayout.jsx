// layouts/DashboardLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/DashboardLayout.module.css";
import Logo from "../assets/Logo_SmartPetHome.png";
import { useState } from "react";


export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("Inicio");
  
  const LogoPlaceholder = () => (
    <div className={styles.logoWrap}>
      
      <div className={styles.logoBox}>
          <img src={Logo} alt="Smart Pet Home" height="168" />
      </div>
    </div>
  );

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
              <LogoPlaceholder />
      
              <nav className={styles.nav}>
                {[
                    { icon: "🏠", label: "Inicio",       path: "/dashboard" },
                    { icon: "🐾", label: "Mis mascotas", path: "/mascotas"  },
                    { icon: "📊", label: "Reportes",     path: "/reportes"  },
                    { icon: "⚙️", label: "Ajustes",      path: "/ajustes"   },
                    ].map((item) => (
                    <button
                        key={item.label}
                        className={`${styles.navItem} ${active === item.label ? styles.navItemActive : ""}`}
                        onClick={() => {
                        navigate(item.path);
                        setActive(item.label);
                        }}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>{item.label}</span>
                    </button>
                    ))}
              </nav>
      
              <button className={styles.logoutBtn} onClick={logout}>
                 Cerrar sesión
              </button>
            </aside>

      <main className={styles.main}>
        <Outlet /> 
      </main>
    </div>
  );
}

