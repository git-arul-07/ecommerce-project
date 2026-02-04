const jwt = require("jsonwebtoken");

// 1. First, define the Token Verification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; 
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user; 
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

// 2. Second, define the Admin Verification (which uses verifyToken)
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Access denied. Admin privileges required.");
    }
  });
};

// 3. THE CRITICAL EXPORT: Only one module.exports allowed!
module.exports = { verifyToken, verifyAdmin };