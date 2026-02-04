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

  // Sync searchTerm with URL (useful if user refreshes or hits back)
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search") || "";
    setSearchTerm(query);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm.trim()}`);
  };

  const isAdmin = user?.isAdmin === true || user?.email?.toLowerCase().includes('admin');

  return (
    <nav style={navStyle}>
      <div className="container" style={containerStyle}>
        <Link to="/" style={logoStyle}>E-Shop</Link>

        {/* --- SEARCH BAR --- */}
        <form onSubmit={handleSearch} style={searchFormStyle}>
          <input 
            type="text" 
            placeholder="Search products..." 
            style={inputStyle}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // Optional: Real-time search
              navigate(`/?search=${e.target.value}`);
            }}
          />
          <button type="submit" style={searchBtnStyle}>🔍</button>
        </form>

        <div style={linkGroupStyle}>
          <Link to="/" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>Home</Link>
          
          {user ? (
            <>
              <div style={accountTrigger}>
                <span style={{ fontSize: '0.7rem', color: '#ccc' }}>Hello, {user.name || 'User'}</span>
                <Link to="/profile" style={accountLink}>Account & Lists</Link>
              </div>

              {!isAdmin && (
                <>
                  <Link to="/orders" style={{color: 'white', textDecoration: 'none', fontSize: '0.9rem'}}>My History</Link>
                  <Link to="/cart" style={cartStyle}>
                    🛒 <span style={badgeStyle}>{cart.length}</span>
                  </Link>
                </>
              )}

              {isAdmin && <Link to="/admin" style={{color: '#febd69', fontWeight: 'bold', textDecoration: 'none'}}>Admin</Link>}

              <button onClick={() => { logout(); navigate("/login"); }} style={logoutBtn}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={loginBtn}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

// ... (Styles stay the same as your previous version)
const navStyle = { backgroundColor: 'rgba(19, 25, 33, 0.95)', backdropFilter: 'blur(10px)', padding: '10px 0', position: 'sticky', top: 0, zIndex: 1000, color: 'white' };
const containerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' };
const logoStyle = { color: 'white', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' };
const searchFormStyle = { display: 'flex', flex: 1, margin: '0 20px', maxWidth: '600px' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px 0 0 4px', border: 'none', outline: 'none', color: '#333' };
const searchBtnStyle = { backgroundColor: '#febd69', border: 'none', padding: '0 15px', borderRadius: '0 4px 4px 0', cursor: 'pointer' };
const linkGroupStyle = { display: 'flex', alignItems: 'center', gap: '20px' };
const accountTrigger = { display: 'flex', flexDirection: 'column' };
const accountLink = { color: 'white', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.9rem' };
const badgeStyle = { backgroundColor: '#febd69', color: '#131921', borderRadius: '50%', padding: '2px 6px', fontSize: '0.8rem', position: 'relative', top: '-10px', left: '-5px' };
const cartStyle = { textDecoration: 'none', color: 'white', fontSize: '1.2rem' };
const logoutBtn = { background: 'none', border: '1px solid #555', color: 'white', cursor: 'pointer', padding: '5px 10px', borderRadius: '4px' };
const loginBtn = { backgroundColor: '#febd69', color: 'black', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' };

export default Navbar;