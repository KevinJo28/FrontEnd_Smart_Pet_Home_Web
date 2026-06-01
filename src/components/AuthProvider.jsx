import { useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/authContext.js";
import { loginUser } from "../api/apiGetUser.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [error, setError] = useState("");

  const login = async (email, password) => {
    try {
      const user = await loginUser(email, password);

      setUser(user);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setError("");
      return true;

    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};