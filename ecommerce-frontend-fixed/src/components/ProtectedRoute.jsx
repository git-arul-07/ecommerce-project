import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // If there is no user and no token, send them to login
  return (user || token) ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;