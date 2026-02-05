const validator = require("validator");

const validateSignup = (req) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    photoUrl,
    location,
  } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }

  if (!email) {
    throw new Error("Email is required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }

  if (!password) {
    throw new Error("Password is required");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain uppercase, lowercase, number and special character",
    );
  }

  if (age && (age < 18 || age > 60)) {
    throw new Error("Age must be between 18 and 60");
  }

  if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
    throw new Error("Invalid gender");
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
  }
  if (location && location.length > 20) {
    throw new Error("Location must be within 20 characters");
  }
};

const validateUpdateProfile = (req) => {
  const { age, gender, photoUrl, location } = req.body;

  if (age !== undefined) {
    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 60) {
      throw new Error("Age must be a number between 18 and 60");
    }
  }

  if (gender) {
    const allowedGenders = ["male", "female", "other"];
    if (!allowedGenders.includes(gender.toLowerCase())) {
      throw new Error("Invalid gender");
    }
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
  }

  if (location && location.length > 20) {
    throw new Error("Location must be within 20 characters");
  }

  return true;
};

const validatePassword = (req) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    throw new Error("Old and New Password is required");
  }
  if (password == newPassword) {
    throw new Error("The old Password and New Password could not be same");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error(
      "New Password must contain uppercase, lowercase, number and special character",
    );
  }
};

module.exports = { validateSignup, validateUpdateProfile, validatePassword };
