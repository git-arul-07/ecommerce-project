import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [category, setCategory] = useState("All");
  const location = useLocation();
  const navigate = useNavigate();

  // 1. IMPROVED SEARCH PARSING: Lowercase and Trim for accuracy
  const query = new URLSearchParams(location.search).get("search")?.toLowerCase().trim() || "";

  const filteredProducts = productsData.filter((product) => {
    // 2. DATA FALLBACK: Check 'name' or 'title' in case data keys vary
    const productName = (product.name || product.title || "").toLowerCase();
    const matchesSearch = productName.includes(query);
    
    const matchesCategory = category === "All" || product.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ padding: '2rem 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '5px' }}>
            {query ? `Results for "${query}"` : "Our Collection"}
          </h2>
          {query && (
            <button 
              onClick={() => navigate("/")} 
              style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}
            >
              Clear search
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: '#666' }}>Filter by:</span>
          <select 
            className="input" 
            style={{ width: '180px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home Decor">Home Decor</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: '#f9fafb', borderRadius: '12px' }}>
          <h3 style={{ color: '#374151' }}>No products found matching "{query}"</h3>
          <p style={{ color: '#6b7280' }}>Try checking your spelling or using different keywords.</p>
          <button 
            onClick={() => navigate("/")}
            style={{ marginTop: '20px', padding: '10px 20px', background: '#febd69', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;