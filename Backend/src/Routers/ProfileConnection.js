const express = require("express");
const ProfileConnection = express.Router();
const AuthUser = require("../Middleware/Authuser");
const Connection = require("../Models/ConnectionRequest");

ProfileConnection.get("/connections", AuthUser, async (req, res) => {
  try {
    const loggedinUser = req.user;
    if (!loggedinUser) {
      res.status(401).status("Unauthorized, please Login");
    }

    const profileConnection = await Connection.find({
      status: "Accepted",
      $or: [{ toUserId: loggedinUser }, { fromUserId: loggedinUser }],
    })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    if (profileConnection.length === 0) {
      res.status(400).json({ message: "No connection Found" });
    }
    res.status(200).json({
      message: "Coneection Fetched Successfully",
      Data: profileConnection,
    });
  } catch (err) {
    res.status(400).json({ message: "Error Encountered", Error: err.message });
  }
});

ProfileConnection.get("/request", AuthUser, async (req, res) => {
  try {
    const loggedinUserId = req.user;

    if (!loggedinUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRequest = await Connection.find({
      toUserId: loggedinUserId,
      status: "Interested",
    })
      .select("-_id")
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    if (userRequest.length === 0) {
      return res.status(200).json({
        message: "No pending requests",
        data: [],
      });
    }

    res.status(200).json({
      message: "Request fetched successfully",
      data: userRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error encountered",
      error: err.message,
    });
  }
});

module.exports = ProfileConnection;
