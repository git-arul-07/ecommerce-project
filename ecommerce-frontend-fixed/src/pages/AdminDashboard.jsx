import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token"); 
    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        // Sort newest orders to the top
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedData);
      } else {
        console.error("Failed to fetch orders: ", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (res.ok) {
        fetchOrders(); // Refresh table data immediately
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {/* SIDEBAR */}
      <aside style={{ width: "260px", background: "#0f172a", color: "white", padding: "30px", position: "fixed", height: "100%" }}>
        <h2 style={{ color: "#38bdf8", marginBottom: "30px", fontSize: '1.5rem' }}>ADMIN PORTAL</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <button onClick={fetchOrders} style={{ textAlign: "left", background: "#334155", color: "white", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: '600' }}>
            🔄 Refresh Orders
          </button>
          
          <div style={{ marginTop: "auto", position: 'absolute', bottom: '30px', width: '200px' }}>
            <button onClick={() => navigate("/")} style={{ background: "none", color: "#94a3b8", border: "none", cursor: "pointer", marginBottom: "20px", display: 'block' }}>← Back to Shop</button>
            <button onClick={() => { logout(); navigate("/login"); }} style={{ width: "100%", padding: "12px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 'bold' }}>Logout</button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: "260px", padding: "40px", width: "calc(100% - 260px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ color: '#1e293b' }}>Order Management</h1>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Administrator</div>
            <strong style={{ color: '#0f172a' }}>{user?.email}</strong>
          </div>
        </div>
        
        <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "18px" }}>ID</th>
                <th style={{ padding: "18px" }}>Date & Time</th>
                <th style={{ padding: "18px" }}>Customer</th>
                <th style={{ padding: "18px" }}>Total</th>
                <th style={{ padding: "18px" }}>Status</th>
                <th style={{ padding: "18px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: "40px", textAlign: "center", color: '#94a3b8' }}>No orders found in the system.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #f1f5f9", verticalAlign: 'middle' }}>
                    <td style={{ padding: "18px", fontFamily: "monospace", color: '#6366f1' }}>#{order._id.slice(-6).toUpperCase()}</td>
                    <td style={{ padding: "18px", fontSize: "0.85rem", color: "#475569" }}>
                      {order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN') : "N/A"}
                    </td>
                    <td style={{ padding: "18px", fontSize: '0.9rem' }}>{order.userEmail}</td>
                    <td style={{ padding: "18px", fontWeight: "700", color: '#0f172a' }}>₹{order.total}</td>
                    <td style={{ padding: "18px" }}>
                      <span style={{ 
                        padding: "6px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", textTransform: 'uppercase',
                        background: order.status === "Delivered" ? "#dcfce7" : 
                                    order.status === "Delayed" ? "#fee2e2" : "#fff7ed",
                        color: order.status === "Delivered" ? "#166534" : 
                               order.status === "Delayed" ? "#991b1b" : "#9a3412"
                      }}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "18px" }}>
                      <select 
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        style={{ padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", outline: 'none', fontSize: '0.85rem' }}
                        defaultValue=""
                      >
                        <option value="" disabled>Update Status</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
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