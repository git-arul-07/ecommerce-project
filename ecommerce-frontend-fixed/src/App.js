import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import UserOrders from "./pages/UserOrders"; 
import AdminDashboard from "./pages/AdminDashboard"; 
import Profile from "./pages/Profile";

function AppContent() {
  const location = useLocation();
  const isAdminMode = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminMode && <Navbar />}

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />

          {/* USER PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<UserOrders />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route> {/* <--- FIXED: You were missing this closing tag! */}

          {/* ADMIN PROTECTED ROUTES */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          
        </Routes>
      </div>

      {!isAdminMode && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}