const User = require("../models/user");
const jwt = require("jsonwebtoken");
const authenticateUser = async (req, res, next) => {
  // Middleware logic to authenticate user
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    req.user = await User.findById(userId).select("-password");
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden access" });
  }
};
module.exports = { authenticateUser };
