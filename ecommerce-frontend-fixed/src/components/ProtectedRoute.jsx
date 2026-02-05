import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // ⏳ CRITICAL: wait for auth check
  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
