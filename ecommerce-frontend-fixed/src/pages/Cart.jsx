import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container text-center" style={{ marginTop: "4rem" }}>
        <h2>Your cart is empty 🛒</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <div className="card" style={{ marginTop: "2rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eee", textAlign: "left" }}>
              <th style={{ padding: "1.5rem" }}>Product</th>
              <th style={{ padding: "1.5rem" }}>Price</th>
              <th style={{ padding: "1.5rem" }}>Quantity</th>
              <th style={{ padding: "1.5rem" }}>Total</th>
              <th style={{ padding: "1.5rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "1.5rem" }}>
                  <strong>{item.name}</strong>
                </td>
                <td style={{ padding: "1.5rem" }}>₹{item.price}</td>
                <td style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <button className="btn btn-outline btn-sm" onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button className="btn btn-outline btn-sm" onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </td>
                <td style={{ padding: "1.5rem" }}>₹{item.price * item.qty}</td>
                <td style={{ padding: "1.5rem" }}>
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ padding: "2rem", textAlign: "right", background: "#f8fafc" }}>
          <h3>Total: ₹{total}</h3>
          <button 
            onClick={() => navigate("/checkout")} 
            className="btn btn-primary"
            style={{ marginTop: "1rem", padding: "10px 30px" }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;