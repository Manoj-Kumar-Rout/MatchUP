const mongoose = require("mongoose");
const ConnectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Manoj_DB:Manoj%402001@cluster0.gq6acho.mongodb.net/",
    );
    console.log("Data Base connected successfully");
  } catch (error) {
    console.log("error Encountered during connecting DB", error);
  }
};

module.exports = ConnectDB;
