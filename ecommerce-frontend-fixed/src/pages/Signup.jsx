import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="container" style={{ maxWidth: "400px", marginTop: "4rem" }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "8px" }}>
        <h2>Create Account</h2>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
          />

          <button style={{ width: "100%", padding: "12px", background: "#ffd814" }}>
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
