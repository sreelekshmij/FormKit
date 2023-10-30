const userService = require('../services/userService');
const authService = require('../services/authService');

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.createUser(userData);
    res.status(result.status).json({ message: result.message , token: result.token});
  } catch (err) {
    console.log(err, "error");
    res.status(500).json({ message: "Error in creating a user" });
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.body.token;
    const result = await authService.verifyUser(token);
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    console.log(err, "error");
    res.status(500).json({ message: "Error in verifying user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await authService.loginUser(userData);
    res.status(result.status).json(result);
  } catch (err) {
    console.log(err, "error");
    res.status(500).json({ message: "Error in logging in" });
  }
};

const forgetPass = async (req, res) => {
  try {
    const email = req.body.formData;
    const result = await authService.forgetPass(email);
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    console.log(err, "error");
    res.status(500).json({ message: "Error in sending password reset email" });
  }
};

const resetPass = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPass(token, newPassword);
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    console.log(err, "error");
    res.status(500).json({ message: "Error in resetting password" });
  }
};

module.exports = {
  createUser,
  verifyUser,
  loginUser,
  forgetPass,
  resetPass,
};
