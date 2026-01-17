const JWT = require("jsonwebtoken");
const User = require("../Models/User");

const AuthUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = JWT.verify(token, "Likun@123");
    const { userId } = decoded;
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication failed",
      error: err.message,
    });
  }
};

module.exports = AuthUser;
