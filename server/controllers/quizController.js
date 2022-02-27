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
    var x = 0;
    var y = 0;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].type === "SE") {
        x = x + req.body[i] * questions[i].multi;
      } else if (questions[i].type === "CSE") {
        x = x - req.body[i] * questions[i].multi;
      } else {
        y = y - req.body[i] * questions[i].multi;
      }
    }
    if (x === 0 && y > 0) {
      res.status(200).send({ retry: "CSE vs SE" });
    } else if (x === 0 && y === 0) {
      res.status(200).send({ retry: "IDK" });
    } else {
      var bestResult = "";
      var secondBestResult = "";
      if (y < 0) {
        bestResult = "RE";
        if (x > 0) {
          secondBestResult = "SE";
        } else {
          secondBestResult = "CSE";
        }
      } else {
        if (x > 0) {
          bestResult = "SE";
          if (x > y) {
            secondBestResult = "RE";
          } else {
            secondBestResult = "CSE";
          }
        } else {
          bestResult = "CSE";
          if (-x > y) {
            secondBestResult = "RE";
          } else {
            secondBestResult = "SE";
          }
        }
      }
      try {
        saveStats({ result: bestResult });
      } catch (error) {
        console.log(error);
      }
      res
        .status(200)
        .send({
          x: x,
          y: y,
          result: bestResult,
          secondResult: secondBestResult,
        });
    }
  }
};

exports.sendQuestionList = sendQuestionList;
exports.sendQuestionAnswer = sendQuestionAnswer;
