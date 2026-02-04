import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const isAdmin = user?.isAdmin || user?.email.includes('admin');

  return (
    <div className="card">
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        
        {/* HIDE FOR ADMIN */}
        {!isAdmin ? (
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        ) : (
          <p style={{ color: 'gray', fontStyle: 'italic', fontSize: '0.8rem' }}>Admin View Only</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;