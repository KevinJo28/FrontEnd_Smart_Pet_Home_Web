
// AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PropTypes from "prop-types";
import MyPets from "../pages/MyPets";
import DashboardLayout from "../pages/DashboardLayout";




function PrivateRoute({ children }) {
  const { user } = useAuth();
  console.log(user)
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/mascotas"  element={<MyPets />} />
       </Route>
      </Routes>
    </BrowserRouter>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
