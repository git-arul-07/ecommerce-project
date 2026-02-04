const Footer = () => {
  return (
    <footer style={{ 
      background: "#1e293b", 
      color: "white", 
      marginTop: "4rem", 
      padding: "3rem 0",
      textAlign: "center" 
    }}>
      <div className="container">
        <div className="grid" style={{ marginBottom: "2rem", textAlign: "left" }}>
          <div>
            <h4>Get to Know Us</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "10px" }}>About Us</p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Careers</p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Press Releases</p>
          </div>
          <div>
            <h4>Connect with Us</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "10px" }}>Facebook</p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Twitter</p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Instagram</p>
          </div>
          <div>
            <h4>Let Us Help You</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "10px" }}>Your Account</p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Returns Centre</p>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Help</p>
          </div>
        </div>
        <hr style={{ borderColor: "#334155" }} />
        <p style={{ marginTop: "1.5rem", color: "#94a3b8" }}>© 2026 E-Shop Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;