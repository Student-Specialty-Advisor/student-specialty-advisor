const User = require("../db/User");
const Achievements = require("../db/Achievements");

var getAchievements = (req, res) => {
  Achievements.findOne({ user: req.params.userID })
    .then((achievements) => {
      if (achievements === null) {
        const newAchievements = new Achievements({ user: req.params.userID });
        newAchievements
          .save()
          .then((savedAchievements) => {
            res.status(200).send({
              success: 1,
              message:
                "User was found but no achievements document was bound to it. Created a new achievement document and linked it to the user.",
              achievements: savedAchievements,
            });
          })
          .catch((error) => {
            res.status(500).send({ error: 1, errorObject: error });
          });
      } else {
        res.status(200).send({ success: 1, achievements: achievements });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: 1,
        message: "User with this ID was not found",
        errorObject: error,
      });
    });
};

var setAchievement = (req, res) => {
  Achievements.findOneAndUpdate({ user: req.params.userID }, req.body, {
    new: true,
  })
    .then((newAchievements) => {
      res.status(200).send({
        success: 1,
        message: "Achievements updated successfully",
        achievements: newAchievements,
      });
    })
    .catch((error) => {
      res.status(500).send({ error: 1, errorObject: error });
    });
};

exports.getAchievements = getAchievements;
exports.setAchievement = setAchievement;
