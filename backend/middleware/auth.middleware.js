import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.AdminToken;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.id;

    next();
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
