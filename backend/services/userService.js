const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/tokenGeneration");

const createUser = async (userData) => {
  try {
    const { username, email, password } = userData;
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.isDeleted) {
        const token = generateToken(user._id);
        user.isDeleted = false;
        await user.save();
        return {
          status: 201,
          message: "Verification email is sent to your email",
          token,
        };
      } else {
        return { status: 409, message: "User already exists" };
      }
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPwd,
    });
    await newUser.save();
    const token = generateToken(newUser._id);
    return {
      status: 201,
      message: "Verification email is sent to your email",
      token,
    };
  } catch (err) {
    console.log(err, "error");
    throw err;
  }
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (user.isDeleted) {
    return { status: 401, message: "User doesnot Exist" };
  }
  return { status: 200, message: user };
};

const updateUserById = async (id, formData) => {
  try {
    const user = await User.findById(id);
    if (user.isDeleted) {
      return { status: 401, message: "User does not exist" };
    }

    if (formData.password) {
      const hashedPwd = await bcrypt.hash(formData.password, 10);
      formData.password = hashedPwd;
    }

    const updatedUser = await User.findByIdAndUpdate(id, formData, {
      new: true,
    });
    return { status: 201, message: "User updated Successfully", updatedUser };
  } catch (error) {
    console.error(error, "error");
    throw error;
  }
};

const deactivateUserById = async (id) => {
  const user = await User.findById(id);
  if (user.isDeleted) {
    return { status: 401, message: "User doesnot Exist" };
  }
  user.isActive = false;
  user.deactivationDate = new Date();
  await user.save();

  scheduleUserDeletion(id);

  return { status: 200, message: "User is deactivated successfully" };
};

const scheduleUserDeletion = (userId) => {
  const deletionDate = new Date();
  deletionDate.setDate(deletionDate.getDate() + 30);

  const timeUntilDeletion = deletionDate - new Date();

  setTimeout(async () => {
    const user = await User.findById(userId);

    if (user && !user.isDeleted && user.deactivationDate) {
      const now = new Date();

      if (now - user.deactivationDate >= timeUntilDeletion) {
        user.isDeleted = true;
        await user.save();
      }
    }
  }, timeUntilDeletion);
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deactivateUserById,
};
