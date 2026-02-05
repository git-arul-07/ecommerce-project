import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../api";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert("Please enter shipping address");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total: Number(total),
          shippingAddress: address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Order failed");
        return;
      }

      alert("Order placed successfully 🎉");
      clearCart();
      navigate("/orders");
    } catch (error) {
      alert("Network error. Backend not reachable.");
    }
  };

  if (!cart) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading Cart Data...
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: "1000px", padding: "40px 20px" }}>
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
        Finalize Your Order
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "30px" }}>
        {/* Shipping */}
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "1px solid #eee" }}>
          <h3>Shipping Details</h3>
          <label style={{ fontWeight: "600" }}>
            Deliver to:{" "}
            <span style={{ color: "#2563eb" }}>
              {user?.name || user?.email}
            </span>
          </label>

          <textarea
            rows="5"
            style={{ width: "100%", padding: "12px", marginTop: "10px" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address"
          />
        </div>

        {/* Summary */}
        <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "12px" }}>
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>
              <span>
                {item.name || item.title} x{item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr style={{ margin: "1.5rem 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
