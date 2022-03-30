try {
  var advisors = require("../resources/advisor.json");
} catch (error) {
  var advisors = null;
}

var getListOfAdvisors = (req, res) => {
  if (advisors === null) {
    res.status(500).send({ error: "advisors.json file was not found." });
  } else {
    res.status(200).send(advisors);
  }
};

var requestMeeting = (req, res) => {};

exports.getListOfAdvisors = getListOfAdvisors;
exports.requestMeeting = requestMeeting;
