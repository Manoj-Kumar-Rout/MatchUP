const express = require("express");
const ConnectDB = require("./utils/DBconnection");
const User = require("./utils/DBschema");

const app = express();
const port = 5000;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User saved successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error saving user",
      error: error.message,
    });
  }
});

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
