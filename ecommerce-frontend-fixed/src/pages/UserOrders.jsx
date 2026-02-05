import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../api";

const UserOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setMyOrders(
          data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (error) {
        console.error("Order fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchMyOrders();
    else setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "50px" }}>
        Loading your history...
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}
    >
      <h2 style={{ marginBottom: "2rem" }}>My Order History</h2>

      {myOrders.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "white",
            borderRadius: "12px",
          }}
        >
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        myOrders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "20px",
              borderLeft: "6px solid #febd69",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <div>
                <strong>Order ID: #{order._id.slice(-8)}</strong>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: "20px",
                  background: "#e2e8f0",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {order.status || "Placed"}
              </span>
            </div>

            <div
              style={{
                background: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span>
                    {item.name} (x{item.qty})
                  </span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Total Amount Paid</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;
