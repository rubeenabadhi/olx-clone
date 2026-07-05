import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/Auth/AuthModal";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <AuthModal />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;