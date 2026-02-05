const express = require("express");
const ProfileConnection = express.Router();
const AuthUser = require("../Middleware/Authuser");
const Connection = require("../Models/ConnectionRequest");
const ConnectionRequest = require("../Models/ConnectionRequest");
const mongoose = require("mongoose");

ProfileConnection.get("/connections", AuthUser, async (req, res) => {
  try {
    const loggedinUser = req.user;

    if (!loggedinUser) {
      return res.status(401).json({ message: "Unauthorized, please login" });
    }

    const profileConnection = await Connection.find({
      status: "Accepted",
      $or: [{ toUserId: loggedinUser._id }, { fromUserId: loggedinUser._id }],
    })
      .populate("fromUserId", "_id firstName age photoUrl location")
      .populate("toUserId", "_id firstName age photoUrl location");

    if (profileConnection.length === 0) {
      return res.status(200).json({
        message: "No connections found",
        Data: [],
      });
    }

    const usersToShow = profileConnection.map((connection) =>
      connection.fromUserId._id.toString() === loggedinUser._id.toString()
        ? connection.toUserId
        : connection.fromUserId,
    );

    res.status(200).json({
      message: "Connections fetched successfully",
      Data: usersToShow,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error encountered",
      error: err.message,
    });
  }
});

ProfileConnection.delete(
  "/connection/delete/:otherUserId",
  AuthUser,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const otherUserId = new mongoose.Types.ObjectId(req.params.otherUserId);

      const connection = await ConnectionRequest.findOne({
        status: "Accepted",
        $or: [
          {
            fromUserId: loggedInUserId,
            toUserId: otherUserId,
          },
          {
            fromUserId: otherUserId,
            toUserId: loggedInUserId,
          },
        ],
      });

      if (!connection) {
        return res.status(404).json({
          message: "Connection not found",
        });
      }

      const deletedConnection = await ConnectionRequest.findByIdAndDelete(
        connection._id,
      );

      return res.status(200).json({
        success: true,
        message: "Connection deleted successfully",
        data: deletedConnection,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

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
