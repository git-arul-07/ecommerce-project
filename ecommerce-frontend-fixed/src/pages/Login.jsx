import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Login failed");

      // 1. SAFE DATA CHECK: Ensure data and user exist before proceeding
      if (data && data.user) {
        localStorage.setItem("token", data.token);

        // 2. SAFE DATA PASSING: Fallback for name and admin status
        login({ 
          ...data.user,
          name: data.user?.name || data.user?.email?.split('@')[0] || "User",
          isAdmin: data.user?.isAdmin || false,
          token: data.token
        }); 

        // 3. CONNECTIVITY: Redirect based on role
        if (data.user?.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Invalid server response: No user data found.");
      }
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div className="card" style={{ padding: '30px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center' }}>Sign In</h2>
        {error && <div style={{ color: 'red', background: '#fee2e2', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Email Address</label>
            <input type="email" required style={{ width: '100%', padding: '10px' }}
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password</label>
            <input type="password" required style={{ width: '100%', padding: '10px' }}
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <button style={{ width: '100%', padding: '12px', background: '#ffdb15', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Continue
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          New to E-Shop? <Link to="/signup">Create your account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;