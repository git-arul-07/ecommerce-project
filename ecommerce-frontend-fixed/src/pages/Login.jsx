import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API_BASE_URL from "../api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token
      localStorage.setItem("token", data.token);

      // Save user via context
      login({
        ...data.user,
        token: data.token,
      });

      // Redirect
      if (data.user?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Network error");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "4rem" }}>
      <div style={{ padding: "30px", background: "white", borderRadius: "8px" }}>
        <h2 style={{ textAlign: "center" }}>Sign In</h2>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            style={{
              width: "100%",
              padding: "12px",
              background: "#ffd814",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Sign In
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
