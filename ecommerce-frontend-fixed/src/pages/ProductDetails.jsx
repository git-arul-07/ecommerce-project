import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="container mt-4"><h2>Product not found</h2></div>;

  const handleAdd = () => {
    addToCart(product);
    showToast("Added to cart!");
  };

  return (
    <div className="container" style={{ marginTop: "3rem" }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: "20px" }}>
        ← Back
      </button>
      
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
        {/* Left: Image */}
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }} 
          />
        </div>

        {/* Right: Info */}
        <div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{product.name}</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "2rem" }}>
            {product.description}
          </p>
          
          <div style={{ borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "20px 0", marginBottom: "20px" }}>
            <h2 style={{ color: "#b12704", fontSize: "2rem" }}>₹{product.price.toLocaleString()}</h2>
            <span className="badge" style={{ background: "#166534", padding: "5px 10px", fontSize: "0.9rem" }}>In Stock</span>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <button onClick={handleAdd} className="btn btn-primary" style={{ padding: "12px 30px", fontSize: "1.1rem" }}>
              Add to Cart
            </button>
            <button className="btn btn-outline" style={{ padding: "12px 30px", fontSize: "1.1rem" }}>
              Buy Now
            </button>
          </div>
          
          <ul style={{ marginTop: "2rem", paddingLeft: "20px", color: "#475569" }}>
            <li>Free Delivery within 2 days</li>
            <li>1 Year Warranty</li>
            <li>7 Days Replacement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;