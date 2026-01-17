const mongoose = require("mongoose");
const ConnectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/MatchUP");
    console.log("Data Base connected successfully");
  } catch (error) {
    console.log("error Encountered during connecting DB", error);
  }
};

module.exports = ConnectDB;
