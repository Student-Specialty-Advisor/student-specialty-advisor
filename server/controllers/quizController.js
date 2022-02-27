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
  try {
    saveStats({ result: "software" });
    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.sendQuestionList = sendQuestionList;
exports.sendQuestionAnswer = sendQuestionAnswer;
