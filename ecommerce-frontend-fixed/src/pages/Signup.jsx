import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  // 1. Consolidated state for Name, Email, and Password
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new attempt

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 2. Send the full formData (including name)
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "4rem", padding: "0 20px" }}>
      {/* 3. Amazon-style clean card */}
      <div className="card" style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <h2 className="text-center" style={{ marginBottom: "1.5rem", fontWeight: "600" }}>Create Account</h2>
        
        {error && (
          <div style={{ color: "#c40000", background: "#fdf0f0", padding: "10px", borderRadius: "4px", marginBottom: "1rem", fontSize: "0.9rem", border: "1px solid #c40000" }}>
            ⚠️ {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* FULL NAME INPUT */}
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "0.9rem" }}>Your name</label>
            <input 
              type="text" 
              placeholder="First and last name" 
              className="input"
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* EMAIL INPUT */}
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "0.9rem" }}>Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="input"
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "0.9rem" }}>Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              className="input"
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="btn-primary" style={{ width: "100%", padding: "12px", background: "#ffd814", border: "1px solid #fcd200", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Verify Email (Sign Up)
          </button>
        </form>

        <p style={{ fontSize: "0.8rem", color: "#555", marginTop: "15px", textAlign: "center" }}>
          By creating an account, you agree to E-Shop's Conditions of Use and Privacy Notice.
        </p>

        <hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #eee" }} />

        <p className="text-center" style={{ fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login" style={{ color: "#007185", textDecoration: "none", fontWeight: "bold" }}>Sign in →</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;