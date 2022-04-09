const { saveStats } = require("../middlewares/saveStatistics");

try {
  var questions = require("../resources/question.json");
} catch (error) {
  var questions = null;
}

var getQuestionList = (req, res) => {
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
    var weightSE = 0;
    var weightRE = 0;
    var weightCSE = 0;
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].type === "SE") {
        weightSE = weightSE + req.body[i] * questions[i].multi;
      } else if (questions[i].type === "CSE") {
        weightCSE = weightCSE + req.body[i] * questions[i].multi;
      } else {
        weightRE = weightRE + req.body[i] * questions[i].multi;
      }
    }
    if (weightSE === weightRE && weightRE === weightCSE) {
      res.status(200).send({ retry: "IDK" });
    } else {
      var bestResult = "";
      var secondBestResult = "";
      if (Math.max(weightSE, weightRE, weightCSE) === weightSE) {
        bestResult = "SE";
        if (weightRE > weightCSE) {
          secondBestResult = "RE";
        } else {
          secondBestResult = "CSE";
        }
      } else if (Math.max(weightSE, weightCSE, weightRE) === weightCSE) {
        bestResult = "CSE";
        if (weightSE > weightRE) {
          secondBestResult = "SE";
        } else {
          secondBestResult = "RE";
        }
      } else if (Math.max(weightSE, weightCSE, weightRE) === weightRE) {
        bestResult = "RE";
        if (weightSE > weightCSE) {
          secondBestResult = "SE";
        } else {
          secondBestResult = "CSE";
        }
      }
      try {
        saveStats({ result: bestResult });
      } catch (error) {
        console.log(error);
      }
      res.status(200).send({
        weightSE: weightSE,
        weightRE: weightRE,
        weightCSE: weightCSE,
        result: bestResult,
        secondResult: secondBestResult,
      });
    }
  }
};

exports.getQuestionList = getQuestionList;
exports.sendQuestionAnswer = sendQuestionAnswer;
