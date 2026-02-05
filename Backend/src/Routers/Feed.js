const express = require("express");
const feedRouter = express.Router();
const Connection = require("../Models/ConnectionRequest");
const User = require("../Models/User");
const AuthUser = require("../Middleware/Authuser");

feedRouter.get("/feed", AuthUser, async (req, res) => {
  const limit = parseInt(req.query.limit) || 1;
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const connections = await Connection.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    const hiddenUserSet = new Set();
    connections.forEach((conn) => {
      hiddenUserSet.add(conn.fromUserId.toString());
      hiddenUserSet.add(conn.toUserId.toString());
    });
    const hiddenUserArray = Array.from(hiddenUserSet);
    const feedUsers = await User.find({
      _id: {
        $nin: hiddenUserArray,
        $ne: loggedInUser._id,
      },
    })
      .select("_id firstName lastName age gender photoUrl Bio location")
      .limit(limit);
    res.status(200).json({
      message: "Feed fetched successfully",
      count: feedUsers.length,
      data: feedUsers,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});

module.exports = feedRouter;
