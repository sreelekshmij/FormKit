const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config();



const generateToken = (id) => {
    return jwt.sign({ user: id }, process.env.SECRET_KEY, { expiresIn: "5min" });
};

const generateAccessToken = (id) => {
    return jwt.sign(
        { userId: id},
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
}

module.exports = {
    generateToken,
    generateAccessToken
}