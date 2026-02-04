import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // 1. PROTECTION: Ensure token exists on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handlePlaceOrder = async () => {
    // 2. VALIDATION
    if (!address.trim()) return alert("Please enter shipping address");
    if (!cart || cart.length === 0) return alert("Your cart is empty");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          items: cart,
          // FIX: Strips currency symbols (₹) and ensures a clean Number for the DB
          total: Number(String(total).replace(/[^0-9.-]+/g, "")) || 0,
          shippingAddress: address
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully! 🎉");
        clearCart(); 
        navigate("/orders"); 
      } else {
        // ERROR HANDLING: Shows specific reason (like "Auth failed" or "Validation error")
        alert(`Failed: ${data.message || data.error || "Unknown Server Error"}`);
      }
    } catch (error) {
      alert("Network Error: Is your backend server running on port 5000?");
    }
  };

  // PREVENT CRASH: Wait for context data
  if (!cart) return <div style={{textAlign: "center", padding: "50px"}}>Loading Cart Data...</div>;

  return (
    <div className="container" style={{ maxWidth: "1000px", padding: "40px 20px" }}>
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>Finalize Your Order</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "30px" }}>
        
        {/* Left Section: Shipping Form (Your Original Style) */}
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "1px solid #eee" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Shipping Details</h3>
          <div className="form-group">
            <label style={{ display:"block", marginBottom:".8rem", fontWeight: "600" }}>
              Deliver to: <span style={{color: "#2563eb"}}>{user?.name || user?.email || "Guest User"}</span>
            </label>
            <textarea 
              rows="5" 
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", outline: "none" }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter full address (House No, Street, City, Pincode)..."
            ></textarea>
          </div>
        </div>

        {/* Right Section: Order Summary (Your Original Style) */}
        <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Order Summary</h3>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span>
                  {item.name || item.title || "Product"} <strong>x{item.qty}</strong>
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <hr style={{ margin: "1.5rem 0", border: "0", borderTop: "1px solid #e2e8f0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "1.2rem" }}>
            <span>Total</span>
            <span>₹{total || 0}</span>
          </div>
          <button 
            onClick={handlePlaceOrder} 
            disabled={cart.length === 0}
            style={{ 
              width: "100%", 
              marginTop: "2rem", 
              padding: "15px", 
              background: cart.length === 0 ? "#ccc" : "#2563eb", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              fontWeight: "bold", 
              cursor: cart.length === 0 ? "default" : "pointer" 
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