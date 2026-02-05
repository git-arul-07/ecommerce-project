import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  // ⏳ Wait until auth is restored
  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin =
    user?.isAdmin === true ||
    user?.email?.toLowerCase().includes("admin");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
