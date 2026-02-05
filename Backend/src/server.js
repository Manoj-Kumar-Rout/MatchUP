const express = require("express");
const connectDB = require("./config/DBconnection");
const userRouter = require("./Routers/Userrouter");
const cookieParser = require("cookie-parser");
const ConnectionRouter = require("./Routers/ConnectionRouter");
const ProfileConnection = require("./Routers/ProfileConnection");
const feedRouter = require("./Routers/Feed");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/user", userRouter);
app.use("/connection", ConnectionRouter);
app.use("/profile", ProfileConnection);
app.use("/", feedRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
