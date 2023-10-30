const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { generateToken, generateAccessToken } = require('../utils/tokenGeneration')

dotenv.config();

const verifyUser = async (token) => {
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.user;
      const user = await User.findById(userId);
      if (!user) {
        return { status: 400, message: "Invalid Token" };
      }
      user.isVerified = true;
      await user.save();
      return { status: 200, message: "User verified successfully" };
    } catch (err) {
      return { status: 401, message: "Token expired" };
    }
  };
  
  const loginUser = async (userData) => {
    try {
      const { email, password } = userData;
      const user = await User.findOne({ email: email, isDeleted: false });
      if (!user) {
        return { status: 401, message: "User Does not exist" };
      }
  
      if (!user.isVerified) {
        return { status: 402, message: "Email not verified" };
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { status: 401, message: "Invalid password. Try again" };
      }
  
      const accessToken = generateAccessToken(user._id)
  
      return { status: 200, accessToken, user };
    } catch (error) {
      console.log(error,"error");
      throw error;
    }
  };
  
  const forgetPass = async (email) => {
    try {
      const oldUser = await User.findOne({ email: email, isDeleted: false });
      if (!oldUser) {
        return { status: 404, message: "User does not exist" };
      }
      const token = generateToken(oldUser._id);
      return { status: 200, token };
    } catch (error) {
      throw error;
    }
  };
  
  const resetPass = async (token, newPassword) => {
    try {
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      const userId = decodedToken.user;
      const user = await User.findById(userId);
  
      if (!user) {
        return { status: 400, message: "Reset Failed" };
      }
  
      const passwordMatch = await bcrypt.compare(newPassword, user.password);
  
      if (passwordMatch) {
        return { status: 401, message: "New password must be different from the old one" };
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      return { status: 200, message: "Password reset successfully" };
    } catch (err) {
      console.log(err, "error");
      throw err;
    }
  };

  module.exports = {
    verifyUser,
    loginUser,
    forgetPass,
    resetPass,
  };