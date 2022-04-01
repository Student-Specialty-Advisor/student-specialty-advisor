const Advisor = require("../db/Advisor");

var getListOfAdvisors = (req, res) => {
  Advisor.find({})
    .then((advisors) => {
      res.status(200).send(advisors);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var postAdvisor = (req, res) => {
  const newAdvisor = new Advisor(req.body);
  newAdvisor
    .save()
    .then(() => {
      res.status(200).send({ success: 1 });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

var requestMeeting = (req, res) => {};

exports.getListOfAdvisors = getListOfAdvisors;
exports.postAdvisor = postAdvisor;
exports.requestMeeting = requestMeeting;
