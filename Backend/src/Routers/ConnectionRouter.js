const express = require("express");
const connectionRouter = express.Router();

const AuthUser = require("../Middleware/Authuser");
const User = require("../Models/User");
const ConnectionRequest = require("../Models/ConnectionRequest");

connectionRouter.post("/send/:status/:userID", AuthUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: "Please login" });
    }
    const fromUserId = loggedInUser._id;
    const toUserId = req.params.userID;
    const status = req.params.status;
    const allowedStatus = ["Interested", "Ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    if (fromUserId.equals(toUserId)) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }
    const user = await User.findById(toUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingConnection = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnection) {
      return res.status(409).json({
        message: "Connection request already exists",
      });
    }
    const newRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    await newRequest.save();
    const populatedRequest = await ConnectionRequest.findById(newRequest._id)
      .populate({
        path: "fromUserId",
        select: "firstName lastName photoUrl",
      })
      .populate({
        path: "toUserId",
        select: "firstName lastName photoUrl",
      });
    return res.status(201).json({
      message: "Connection request sent successfully",
      data: populatedRequest,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error encountered",
      error: err.message,
    });
  }
});

connectionRouter.post("/review/:status/:userID", AuthUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ message: "Please login" });
    }

    const status = req.params.status;
    const requestId = req.params.userID;
    const allowedStatus = ["Accepted", "Rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }

    const findRequest = await ConnectionRequest.findOne({
      _id: requestId,
      status: "Interested",
      toUserId: loggedInUser._id,
    }).populate("fromUserId", "firstName lastName");

    if (!findRequest) {
      return res.status(401).json({ message: "No Request Found" });
    }

    findRequest.status = status;

    await findRequest.save();

    res
      .status(201)
      .json({ message: `request ${status} successfully`, Data: findRequest });
  } catch (err) {
    return res.status(500).json({
      message: "Error encountered",
      error: err.message,
    });
  }
});

module.exports = connectionRouter;
