const userService = require('../services/userService');

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.getUserById(userId);
    res.status(result.status).json(result);
  } catch (err) {
    console.error(err,"error");
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const formData = req.body;
    const result = await userService.updateUserById(userId, formData);
    res.status(result.status).json(result);
  } catch (err) {
    console.error(err,"error");
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

const deactivateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deactivateUserById(userId);
    res.status(result.status).json(result);
  } catch (err) {
    console.error(err,"error");
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getUserById,
  updateUserById,
  deactivateUserById,
};
