var questions = require("../resources/question.json");
var sendQuestionList = (req, res) => {
  res.send(questions);
};

exports.sendQuestionList = sendQuestionList;
