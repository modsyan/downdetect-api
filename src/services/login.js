const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");
const { verifyToken } = require("../middlewares/auth-middleware");
const { secretKey } = require("../configration/jwt-config");

async function login(email, password) {
  try {
    // Trim and normalize email
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log("User not found");
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      console.log("Incorrect password");
      throw new Error("Incorrect password");
    }

    const token = generateToken(existingUser);

    return token;
  } catch (error) {
    console.log("Login error:", error.message);
    throw new Error("Invalid credentials");
  }
}

async function refreshToken(oldToken) {
  try {
    const decodedToken = verifyToken(oldToken);
    const user = User.findById(decodedToken._id);
    if (!user) {
      throw new error("User not found");
    }
    const newToken = generateToken(user);
    return newToken;
  } catch (error) {
    throw new error("Invalid");
  }
}

module.exports = { login };
