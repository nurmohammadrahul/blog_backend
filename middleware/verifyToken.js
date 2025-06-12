import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json("Access denied");

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json("Invalid token");

    try {
      req.user = await User.findById(user.id).select("-password");
      if (!req.user) return res.status(404).json("User not found");
      next();
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
};

export default verifyToken;
