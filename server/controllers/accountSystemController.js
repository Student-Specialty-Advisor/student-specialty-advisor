const User = require("../db/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const invalidPassword = { keyPattern: { password: 1 } };
const invalidEmail = { keyPattern: { email: 1 } };

var SignUp = (req, res) => {
  // Endpoint: /as-api/sign-up
  const json = req.body;
  var hashedPassword = bcrypt.hashSync(
    json.password,
    parseInt(process.env.HASH_SALT)
  ); // Hash json.password
  var userData = {
    firstName: json.firstName,
    lastName: json.lastName,
    universityYear: json.universityYear,
    email: json.email,
    password: hashedPassword,
    role: "Member",
  };
  const newUser = new User(userData);
  newUser
    .save()
    .then((newUser) => {
      res.status(200).send(newUser);
    })
    .catch((error) => {
      res.status(200).send(error);
    });
};

var LogIn = (req, res) => {
  //Endpoint: /as-api/log-in
  const json = req.body;
  var emailObj = { email: json.email };
  User.findOne(emailObj).then((user) => {
    if (user === null) {
      res.status(200).send(invalidEmail);
    } else {
      if (bcrypt.compareSync(json.password, user.password)) {
        var token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: 86400 /*24 hours*/,
        });
        var userData = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          universityYear: user.universityYear,
          email: user.email,
          role: user.role,
          accessToken: token,
        };
        res.status(200).send(userData);
      } else {
        res.status(200).send(invalidPassword);
      }
    }
  });
};

var EditAccount = (req, res) => {
  // Edit Account info
};

// Exports
exports.SignUp = SignUp;
exports.LogIn = LogIn;
exports.EditAccount = EditAccount;
