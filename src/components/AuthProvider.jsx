import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/authContext.js";

// Simulated users — replace with real API calls
const USERS = [{ username: "admin", password: "1234", name: "Carlos" }];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (username, password) => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password,
    );
    if (found) {
      setUser(found);
      setError("");
      return true;
    } else {
      setError("Usuario o contraseña incorrectos.");
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
