import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "./LoginPage.module.css";
import Logo from "../assets/Logo_SmartPetHome.png";
import { useNavigate } from "react-router-dom";

/* Placeholder logo — swap the src for your real logo file */
const LogoPlaceholder = () => (
  
    <div className={styles.logoBox}>
      <img src={Logo} alt="Smart Pet Home" className={styles.logo} />
    </div>
  
);







export default function LoginPage() {
  const { login, error, setError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Tiny delay for UX feel
    await new Promise((r) => setTimeout(r, 500));
    const succes = login(username, password);
    if(succes) navigate("/dashboard");

    setLoading(false);
  };

  return (
    <div className={styles.root}>
      {/* Decorative background blobs */}
      <div className={styles.blobTop} />
      <div className={styles.blobBottom} />

      <div className={styles.card}>
        <LogoPlaceholder />

       

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div className={styles.errorBanner} role="alert">
              <span>🚫</span> {error}
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>Usuario</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🐶</span>
              <input
                id="username"
                type="text"
                className={styles.input}
                placeholder="Tu usuario"
                value={username}
                autoComplete="username"
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔑</span>
              <input
                id="password"
                type="password"
                className={styles.input}
                placeholder="Tu contraseña"
                value={password}
                autoComplete="current-password"
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={loading || !username || !password}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <> Log in</>
            )}
          </button>
        </form>

        <p className={styles.hint}>
          Demo: <strong>admin</strong> · <strong>1234</strong>
        </p>
      </div>

      {/* Paw prints decoration */}
      <div className={styles.paws}>
        {["🐾","🐾","🐾","🐾","🐾"].map((p, i) => (
          <span key={i} className={styles.paw} style={{ animationDelay: `${i * 0.4}s` }}>{p}</span>
        ))}
      </div>
    </div>
  );
}