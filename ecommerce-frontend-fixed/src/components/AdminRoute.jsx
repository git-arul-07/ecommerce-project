import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuth();

  // 1. Check if user exists
  // 2. Check if the isAdmin flag is true OR email contains 'admin'
  const isAdmin = user?.isAdmin || user?.email.includes("admin");

  if (!user) {
    // If not logged in at all, send to login
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    // If logged in but NOT an admin, send back to home
    return <Navigate to="/" replace />;
  }

  // If they are an admin, show the child component (the Dashboard)
  return <Outlet />;
};

export default AdminRoute;