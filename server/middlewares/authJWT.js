const jwt = require("jsonwebtoken");
const User = require("../db/User");

const tokenNotFound = { error: "Token was not found / not provided!" };
const invalidToken = { error: "Token is invalid!" };
const unauthorized = { error: "Unauthorized action!" };
const userNotFound = { error: "User was not found!" };

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send(tokenNotFound);
  }
  jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).send(invalidToken);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userId == null) {
    res.status(500).send(userNotFound);
    return;
  }
  User.findById(req.userId).exec((error, user) => {
    if (error) {
      res.status(500).send(userNotFound);
      return;
    }
    if (user.role === "Admin") {
      next();
      return;
    } else {
      res.status(403).send(unauthorized);
      return;
    }
  });
};

module.exports = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
