const express = require("express");
const userRouter = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { validateSignup } = require("../Utils/Validation");
const JWT = require("jsonwebtoken");
const AuthUser = require("../Middleware/Authuser");
const { validateUpdateProfile } = require("../Utils/Validation");
const { validatePassword } = require("../Utils/Validation");

userRouter.post("/signup", async (req, res) => {
  try {
    validateSignup(req);
    const { firstName, lastName, email, password, age, gender, photoUrl, Bio } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      photoUrl,
      Bio,
    });
    await user.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error saving user",
      error: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await user.getJWT();
    console.log(token);
    res.cookie("token", token);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error encountered",
      error: err.message,
    });
  }
});

userRouter.get("/logout", AuthUser, async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: "Please Login" });
  }
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({ message: "Logout successful" });
});

userRouter.get("/profile", AuthUser, async (req, res) => {
  const loggedinUser = req.user;
  if (!loggedinUser) {
    res.status(400).json({ message: "Plase Login" });
  }
  res
    .status(200)
    .json({ message: "Data Fetched Successfully", Data: loggedinUser });
});

userRouter.patch("/editProfile", AuthUser, async (req, res) => {
  try {
    validateUpdateProfile(req);
    const loggedinUser = req.user;
    if (!loggedinUser) {
      return res.status(401).json({ message: "Please login" });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided" });
    }
    const allowedUpdate = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "Bio",
    ];
    const updates = Object.keys(req.body);
    const isUpdateAllowed = updates.every((key) => allowedUpdate.includes(key));
    if (!isUpdateAllowed) {
      return res.status(400).json({ message: "Invalid update fields" });
    }
    updates.forEach((key) => {
      loggedinUser[key] = req.body[key];
    });
    await loggedinUser.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: loggedinUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error encountered in edit profile",
      error: err.message,
    });
  }
});

userRouter.patch("/editPassword", AuthUser, async (req, res) => {
  try {
    const loggedinUser = req.user;
    console.log(loggedinUser);
    if (!loggedinUser) {
      return res.status(401).json({ message: "Please login" });
    }
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res.status(400).json({
        message: "Old password and new password are required",
      });
    }
    validatePassword(req);
    const isValid = await bcrypt.compare(password, loggedinUser.password);
    if (!isValid) {
      return res.status(400).json({
        message: "Incorrect current password",
      });
    }
    loggedinUser.password = await bcrypt.hash(newPassword, 10);
    await loggedinUser.save();
    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error encountered in editPassword",
      error: err.message,
    });
  }
});

userRouter.get("/:emailId", async (req, res) => {
  try {
    const { emailId } = req.params;

    if (!emailId) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({ email: emailId.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `User fetched successfully and ${user.firstName} is fetched`,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = userRouter;
