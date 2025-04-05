const authMiddleware = {};
const jwt = require("jsonwebtoken");

const JWT_SERECT = process.env.JWT_SERECT;

authMiddleware.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Incoming token:", req.headers.authorization);
 // Safely extract the token

  try {
    const decoded = jwt.verify(token, JWT_SERECT);
    
    req.user = decoded; // Store user info from token in req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
