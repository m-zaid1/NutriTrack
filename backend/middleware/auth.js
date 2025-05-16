import jwt from 'jsonwebtoken';
app.use(express.json());

export const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Ensure this splits on "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not found, authentication failed." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      req.user = decoded.user; // Attach the decoded user info to req.user
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(403).json({ success: false, message: "Invalid token, please log in again." });
    }
  };
  