const User = require("../db/User");
const Achievements = require("../db/Achievements");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const invalidPassword = { keyPattern: { password: 1 } };
const invalidEmail = { keyPattern: { email: 1 } };
const passwordChange = { success: "Successfully updated the password" };

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
      const achievements = new Achievements({ user: newUser._id });
      achievements
        .save()
        .then(() => {
          res.status(200).send({
            success: 1,
            message:
              "User was created, and an achievements document was linked to it",
          });
        })
        .catch((error) => {
          res.status(500).send({ error: 1, errorObject: error });
        });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var LogIn = (req, res) => {
  //Endpoint: /as-api/log-in
  const json = req.body;
  var emailObj = { email: json.email };
  User.findOne(emailObj).then((user) => {
    if (user === null) {
      res.status(500).send(invalidEmail);
    } else {
      if (bcrypt.compareSync(json.password, user.password)) {
        var token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: parseInt(process.env.TOKEN_DURATION),
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
        res.status(500).send(invalidPassword);
      }
    }
  });
};

var EditAccount = (req, res) => {
  // Endpoint: /as-api/:username/
  const user = req.body;
  const id = {
    _id: req.userId,
  };
  if (user.password) {
    User.findById(req.userId)
      .then((foundUser) => {
        if (bcrypt.compareSync(user.currentPassword, foundUser.password)) {
          var hashedPassword = bcrypt.hashSync(
            user.password,
            parseInt(process.env.HASH_SALT)
          );
          User.findOneAndUpdate(id, { password: hashedPassword })
            .then(() => {
              res.status(200).send(passwordChange);
            })
            .catch((error) => {
              res.status(500).send(error);
            });
        } else {
          res.status(403).send(invalidPassword);
        }
      })
      .catch((error) => res.status(500).send(error));
  } else {
    const userToSave = {
      firstName: user.firstName,
      lastName: user.lastName,
      universityYear: user.universityYear,
      email: user.email,
    };
    User.findOneAndUpdate(id, userToSave, { new: true })
      .then((userData) => {
        var token = jwt.sign({ id: userData._id }, process.env.TOKEN_KEY, {
          expiresIn: parseInt(process.env.TOKEN_DURATION),
        });
        const userToReturn = {
          id: userData._id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          universityYear: userData.universityYear,
          email: userData.email,
          role: userData.role,
          accessToken: token,
        };
        res.status(200).send(userToReturn);
      })
      .catch((error) => {
        res.status(403).send(error);
      });
  }
};
// Exports
exports.SignUp = SignUp;
exports.LogIn = LogIn;
exports.EditAccount = EditAccount;
