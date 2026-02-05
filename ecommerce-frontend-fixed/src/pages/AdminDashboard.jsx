import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(
          data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "260px",
          background: "#0f172a",
          color: "white",
          padding: "30px",
          position: "fixed",
          height: "100%",
        }}
      >
        <h2 style={{ color: "#38bdf8", marginBottom: "30px", fontSize: "1.5rem" }}>
          ADMIN PORTAL
        </h2>

        <button
          onClick={fetchOrders}
          style={{
            textAlign: "left",
            background: "#334155",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            width: "100%",
          }}
        >
          🔄 Refresh Orders
        </button>

        <div style={{ marginTop: "auto", position: "absolute", bottom: "30px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            ← Back to Shop
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            style={{
              width: "100%",
              padding: "12px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        style={{
          marginLeft: "260px",
          padding: "40px",
          width: "calc(100% - 260px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          <h1>Order Management</h1>
          <div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Administrator
            </div>
            <strong>{user?.email}</strong>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6)}</td>
                    <td>
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </td>
                    <td>{order.userEmail}</td>
                    <td>₹{order.total}</td>
                    <td>{order.status || "Pending"}</td>
                    <td>
                      <select
                        defaultValue=""
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Update
                        </option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Delayed">Delayed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
