import { AuthProvider } from "./components/AuthProvider";
import { ConfigProvider } from "./components/ConfigProvicer";
import AppRouter from "./routes/AppRouter";
import "./styles/variables.css";

export default function App() {
  return (
    <AuthProvider>
      <ConfigProvider>
        <AppRouter />
      </ConfigProvider>
    </AuthProvider>
  );
}
