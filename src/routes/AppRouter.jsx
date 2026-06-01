// AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PropTypes from "prop-types";
import MyPets from "../pages/MyPets";
import DashboardLayout from "../pages/DashboardLayout";
import Settings from "../pages/Settings";
import Reports from "../pages/Reports";
import Rewards from "../pages/Rewards";
import AddDevices from "../pages/AddDevices";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  console.log(user);
  return user ? children : <Navigate to="/" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/mascotas" element={<MyPets />} />
          <Route path="/ajustes" element={<Settings />} />
          <Route path="/reportes" element={<Reports />} />
          <Route path="/Recompensas" element={<Rewards />} />
          <Route path="/Agregar_Dispositivo" element={<AddDevices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
