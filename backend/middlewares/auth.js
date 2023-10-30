const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Access denied. Token missing." });
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err, "error");
  }
}

module.exports = {
  authenticateToken,
};
