const User = require("../db/User");

var SignUp = (req, res) => {
  // Endpoint: /as-api/sign-up
  const json = req.body;
  var hashedPassword = "hash"; // Bcrypt here
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
      res.status(500).send(error);
    });
};

var LogIn = (req, res) => {
  //Sign in
};

var EditAccount = (req, res) => {
  // Edit Account info
};

// Exports
exports.SignUp = SignUp;
exports.LogIn = LogIn;
exports.EditAccount = EditAccount;
