const { saveStats } = require("../middlewares/saveStatistics");

try {
  var questions = require("../resources/question.json");
} catch (error) {
  var questions = null;
}

var sendQuestionList = (req, res) => {
  if (questions === null) {
    res.status(500).send({ error: "questions.json file was not found." });
  } else {
    res.status(200).send(questions);
  }
};

var sendQuestionAnswer = (req, res) => {
  if (questions === null) {
    res.status(500).send({ error: "questions.json file was not found." });
  } else if (req.body === null || req.body.length !== questions.length) {
    res.status(500).send({ error: "answers received are invalid." });
  } else {
    var x = 0; // SE
    var y = 0; // RE
    var z = 0; // CSE
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].type === "SE") {
        x = x + req.body[i] * questions[i].multi;
      } else if (questions[i].type === "CSE") {
        z = z + req.body[i] * questions[i].multi;
      } else {
        y = y + req.body[i] * questions[i].multi;
      }
    }
    if (x === y && y === z) {
      res.status(200).send({ retry: "IDK" });
    } else {
      var bestResult = "";
      var secondBestResult = "";
      if (Math.max(x, y, z) === x) {
        bestResult = "SE";
        if (y > z) {
          secondBestResult = "RE";
        } else {
          secondBestResult = "CSE";
        }
      } else if (Math.max(x, y, z) === y) {
        bestResult = "RE";
        if (x > z) {
          secondBestResult = "SE";
        } else {
          secondBestResult = "CSE";
        }
      } else if (Math.max(x, y, z) === z) {
        bestResult = "CSE";
        if (x > y) {
          secondBestResult = "SE";
        } else {
          secondBestResult = "RE";
        }
      }
      try {
        saveStats({ result: bestResult });
      } catch (error) {
        console.log(error);
      }
      res.status(200).send({
        x: x,
        y: y,
        z: z,
        result: bestResult,
        secondResult: secondBestResult,
      });
    }
  }
};

exports.sendQuestionList = sendQuestionList;
exports.sendQuestionAnswer = sendQuestionAnswer;
