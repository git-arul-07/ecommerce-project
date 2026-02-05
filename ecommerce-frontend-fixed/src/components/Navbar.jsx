import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(query);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm.trim()}`);
  };

  const isAdmin =
    user?.isAdmin === true ||
    user?.email?.toLowerCase().includes("admin");

  return (
    <nav style={navStyle}>
      <div className="container" style={containerStyle}>
        <Link to="/" style={logoStyle}>E-Shop</Link>

        <form onSubmit={handleSearch} style={searchFormStyle}>
          <input
            type="text"
            placeholder="Search products..."
            style={inputStyle}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              navigate(`/?search=${e.target.value}`);
            }}
          />
          <button type="submit" style={searchBtnStyle}>🔍</button>
        </form>

        <div style={linkGroupStyle}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>

          {user ? (
            <>
              <div style={accountTrigger}>
                <span style={{ fontSize: "0.7rem", color: "#ccc" }}>
                  Hello, {user.name || "User"}
                </span>
                <Link to="/profile" style={accountLink}>
                  Account & Lists
                </Link>
              </div>

              {!isAdmin && (
                <>
                  <Link to="/orders" style={{ color: "white" }}>
                    My History
                  </Link>
                  <Link to="/cart" style={cartStyle}>
                    🛒 <span style={badgeStyle}>{cart?.length || 0}</span>
                  </Link>
                </>
              )}

              {isAdmin && (
                <Link to="/admin" style={{ color: "#febd69", fontWeight: "bold" }}>
                  Admin
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                style={logoutBtn}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={loginBtn}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// 🎨 styles unchanged
const navStyle = { backgroundColor: 'rgba(19, 25, 33, 0.95)', padding: '10px 0', position: 'sticky', top: 0, zIndex: 1000 };
const containerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' };
const logoStyle = { color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' };
const searchFormStyle = { display: 'flex', flex: 1, margin: '0 20px' };
const inputStyle = { width: '100%', padding: '10px', border: 'none' };
const searchBtnStyle = { backgroundColor: '#febd69', border: 'none', padding: '0 15px' };
const linkGroupStyle = { display: 'flex', alignItems: 'center', gap: '20px' };
const accountTrigger = { display: 'flex', flexDirection: 'column' };
const accountLink = { color: 'white', fontWeight: 'bold', textDecoration: 'none' };
const badgeStyle = { backgroundColor: '#febd69', color: '#131921', borderRadius: '50%', padding: '2px 6px' };
const cartStyle = { color: 'white', fontSize: '1.2rem', textDecoration: 'none' };
const logoutBtn = { background: 'none', border: '1px solid #555', color: 'white', cursor: 'pointer' };
const loginBtn = { backgroundColor: '#febd69', padding: '8px 15px', textDecoration: 'none', fontWeight: 'bold' };

export default Navbar;
