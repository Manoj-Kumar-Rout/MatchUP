const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new error("Invalid Email");
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
    },
    gender: {
      type: String,
      validate(value) {
        Allowedoptions = ["male", "female", "others"];
        if (!Allowedoptions.includes(value)) {
          throw new error(`${value} is not a valid gender`);
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new error("invalid URL");
        }
      },
    },
    Bio: {
      type: String,
      maxlength: [300, "Bio cannot exceed 300 characters"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);
userSchema.methods.getJWT = async function () {
  return await JWT.sign({ userId: this._id }, "Likun@123");
};

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
