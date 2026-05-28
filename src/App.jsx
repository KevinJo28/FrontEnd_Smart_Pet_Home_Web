import { AuthProvider } from "./components/AuthProvider";
import AppRouter from "./routes/AppRouter";
import "./styles/variables.css";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
